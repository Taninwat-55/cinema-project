// server/seeds/insertBookings.js
const db = require('../db/database');
const crypto = require('crypto');

// Helper function to generate a unique booking number
function generateBookingNumber() {
  return crypto.randomBytes(5).toString('hex').toUpperCase();
}

console.log('Creating sample bookings...');

// Start transaction
db.prepare('BEGIN TRANSACTION').run();

try {
  // First check if there are already bookings in the database
  const bookingCount = db.prepare('SELECT COUNT(*) as count FROM bookings').get();
  
  if (bookingCount.count > 0) {
    console.log(`Database already has ${bookingCount.count} bookings. Skipping booking creation.`);
    db.prepare('ROLLBACK').run();
    process.exit(0);
  }
  
  // Get users
  const users = db.prepare('SELECT user_id FROM users').all();
  
  if (users.length === 0) {
    console.log('No users found. Please run insertUsers.js first.');
    db.prepare('ROLLBACK').run();
    process.exit(1);
  }
  
  // Get some upcoming showings
  const upcomingShowings = db.prepare(`
    SELECT s.*, m.title as movie_title, t.name as theater_name, t.theater_id
    FROM showings s
    JOIN movies m ON s.movie_id = m.movie_id
    JOIN theaters t ON s.theater_id = t.theater_id
    WHERE s.showing_time > datetime('now')
    ORDER BY s.showing_time
    LIMIT 10
  `).all();
  
  if (upcomingShowings.length === 0) {
    console.log('No upcoming showings found. Please run insertShowings.js first.');
    db.prepare('ROLLBACK').run();
    process.exit(1);
  }
  
  // Create some bookings (past and future)
  const bookings = [];
  
  // Make bookings for each user
  users.forEach(user => {
    // Create 2-3 bookings per user
    const numBookings = Math.floor(Math.random() * 2) + 2;
    
    for (let i = 0; i < numBookings; i++) {
      // Randomly select a showing
      const showing = upcomingShowings[Math.floor(Math.random() * upcomingShowings.length)];
      
      // Create a booking
      const bookingNumber = generateBookingNumber();
      
      // Randomly decide how many tickets
      const adultTickets = Math.floor(Math.random() * 3) + 1;  // 1-3 adult tickets
      const childTickets = Math.floor(Math.random() * 3);      // 0-2 child tickets
      const seniorTickets = Math.floor(Math.random() * 2);     // 0-1 senior tickets
      
      // Calculate total price
      const totalPrice = 
        adultTickets * showing.price_adult + 
        childTickets * showing.price_child + 
        seniorTickets * showing.price_senior;
      
      // Create the booking
      const result = db.prepare(`
        INSERT INTO bookings (booking_number, user_id, showing_id, total_price)
        VALUES (?, ?, ?, ?)
      `).run(bookingNumber, user.user_id, showing.showing_id, totalPrice);
      
      const bookingId = result.lastInsertRowid;
      
      // Add ticket details
      if (adultTickets > 0) {
        db.prepare(`
          INSERT INTO booking_details (booking_id, ticket_type, quantity, price_per_ticket)
          VALUES (?, ?, ?, ?)
        `).run(bookingId, 'adult', adultTickets, showing.price_adult);
      }
      
      if (childTickets > 0) {
        db.prepare(`
          INSERT INTO booking_details (booking_id, ticket_type, quantity, price_per_ticket)
          VALUES (?, ?, ?, ?)
        `).run(bookingId, 'child', childTickets, showing.price_child);
      }
      
      if (seniorTickets > 0) {
        db.prepare(`
          INSERT INTO booking_details (booking_id, ticket_type, quantity, price_per_ticket)
          VALUES (?, ?, ?, ?)
        `).run(bookingId, 'senior', seniorTickets, showing.price_senior);
      }
      
      // Get available seats for this theater
      const availableSeats = db.prepare(`
        SELECT seat_id FROM seats 
        WHERE theater_id = ? AND is_available = 1
        LIMIT ?
      `).all(showing.theater_id, adultTickets + childTickets + seniorTickets);
      
      // Book seats
      availableSeats.forEach(seat => {
        // Add to booked_seats table
        db.prepare(`
          INSERT INTO booked_seats (booking_id, seat_id)
          VALUES (?, ?)
        `).run(bookingId, seat.seat_id);
        
        // Mark seat as unavailable
        db.prepare(`
          UPDATE seats SET is_available = 0 WHERE seat_id = ?
        `).run(seat.seat_id);
      });
      
      console.log(`Created booking ${bookingNumber} for user ${user.user_id} - ${showing.movie_title} at ${showing.theater_name}`);
      bookings.push(bookingNumber);
    }
  });
  
  // Commit all changes
  db.prepare('COMMIT').run();
  console.log(`✅ Successfully created ${bookings.length} sample bookings`);
  
} catch (error) {
  // Rollback on error
  db.prepare('ROLLBACK').run();
  console.error('❌ Error creating bookings:', error.message);
}