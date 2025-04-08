const db = require('../db/database');
const crypto = require('crypto');

function generateBookingNumber() {
  // Generate a random alphanumeric string (10 characters)
  return crypto.randomBytes(5).toString('hex').toUpperCase();
}

function createBooking(bookingData) {
  const { 
    user_id, 
    showing_id, 
    total_price,
    tickets, 
    selected_seats 
  } = bookingData;
  
  // Generate a unique booking number
  const bookingNumber = generateBookingNumber();
  
  // Start transaction
  db.prepare('BEGIN TRANSACTION').run();
  
  try {
    // Insert booking
    const bookingResult = db.prepare(`
      INSERT INTO bookings (booking_number, user_id, showing_id, total_price)
      VALUES (?, ?, ?, ?)
    `).run(bookingNumber, user_id || null, showing_id, total_price);
    
    const bookingId = bookingResult.lastInsertRowid;
    
    // Insert booking details (tickets)
    const insertBookingDetail = db.prepare(`
      INSERT INTO booking_details (booking_id, ticket_type, quantity, price_per_ticket)
      VALUES (?, ?, ?, ?)
    `);
    
    // Get showing for pricing
    const showing = getShowingById(showing_id);
    
    tickets.forEach(ticket => {
      let pricePerTicket = 0;
      
      // Set price based on ticket type
      if (ticket.ticket_type === 'adult') {
        pricePerTicket = showing.price_adult;
      } else if (ticket.ticket_type === 'child') {
        pricePerTicket = showing.price_child;
      } else if (ticket.ticket_type === 'senior') {
        pricePerTicket = showing.price_senior;
      }
      
      insertBookingDetail.run(
        bookingId, 
        ticket.ticket_type, 
        ticket.quantity, 
        pricePerTicket
      );
    });
    
    // Book seats
    const insertBookedSeat = db.prepare(`
      INSERT INTO booked_seats (booking_id, seat_id)
      VALUES (?, ?)
    `);
    
    const updateSeatAvailability = db.prepare(`
      UPDATE seats SET is_available = 0 WHERE seat_id = ?
    `);
    
    for (const seatId of selected_seats) {
      insertBookedSeat.run(bookingId, seatId);
      updateSeatAvailability.run(seatId);
    }
    
    // Commit transaction
    db.prepare('COMMIT').run();
    
    return {
      bookingId,
      bookingNumber
    };
  } catch (error) {
    // Rollback on error
    db.prepare('ROLLBACK').run();
    throw error;
  }
}

function getBookingByNumber(bookingNumber) {
  const booking = db.prepare(`
    SELECT b.*, s.showing_time, m.title as movie_title, t.name as theater_name
    FROM bookings b
    JOIN showings s ON b.showing_id = s.showing_id
    JOIN movies m ON s.movie_id = m.movie_id
    JOIN theaters t ON s.theater_id = t.theater_id
    WHERE b.booking_number = ?
  `).get(bookingNumber);
  
  if (!booking) {
    return null;
  }
  
  // Get booking details (tickets)
  const bookingDetails = db.prepare(`
    SELECT * FROM booking_details WHERE booking_id = ?
  `).all(booking.booking_id);
  
  // Get booked seats
  const bookedSeats = db.prepare(`
    SELECT bs.*, s.row_number, s.seat_number
    FROM booked_seats bs
    JOIN seats s ON bs.seat_id = s.seat_id
    WHERE bs.booking_id = ?
  `).all(booking.booking_id);
  
  // Add details to the booking
  booking.tickets = bookingDetails;
  booking.seats = bookedSeats;
  
  return booking;
}

function getShowingById(showingId) {
  return db.prepare('SELECT * FROM showings WHERE showing_id = ?').get(showingId);
}

function getShowingSeats(showingId) {
  // Get showing information
  const showing = db.prepare(`
    SELECT s.*, t.theater_id, t.seats_rows, t.seats_columns
    FROM showings s
    JOIN theaters t ON s.theater_id = t.theater_id
    WHERE s.showing_id = ?
  `).get(showingId);
  
  if (!showing) {
    return null;
  }
  
  // Get all seats for the theater
  const allSeats = db.prepare(`
    SELECT * FROM seats
    WHERE theater_id = ?
    ORDER BY row_number, seat_number
  `).all(showing.theater_id);
  
  // Get booked seats for the showing
  const bookedSeatIds = db.prepare(`
    SELECT bs.seat_id
    FROM booked_seats bs
    JOIN bookings b ON bs.booking_id = b.booking_id
    WHERE b.showing_id = ?
  `).all(showingId).map(row => row.seat_id);
  
  // Mark seats as booked or available
  const seatMap = allSeats.map(seat => ({
    ...seat,
    is_booked: bookedSeatIds.includes(seat.seat_id)
  }));
  
  // Group seats by row for easier frontend rendering
  const seatsByRow = {};
  seatMap.forEach(seat => {
    if (!seatsByRow[seat.row_number]) {
      seatsByRow[seat.row_number] = [];
    }
    seatsByRow[seat.row_number].push(seat);
  });
  
  return {
    showing,
    seatsByRow
  };
}

function isSeatAvailable(seatId) {
  const seat = db.prepare(`
    SELECT * FROM seats WHERE seat_id = ? AND is_available = 1
  `).get(seatId);
  
  return !!seat;
}

module.exports = {
  createBooking,
  getBookingByNumber,
  getShowingSeats,
  isSeatAvailable,
  getShowingById
};