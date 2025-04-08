const bookingModel = require('../models/bookingModel');

function createBooking(req, res) {
  try {
    const { 
      user_id, 
      showing_id, 
      total_price,
      tickets, 
      selected_seats 
    } = req.body;
    
    // Validate required fields
    if (!showing_id || !total_price || !tickets || !selected_seats || !selected_seats.length) {
      return res.status(400).json({ error: 'Missing required booking information' });
    }
    
    // Check if showing exists
    const showing = bookingModel.getShowingById(showing_id);
    if (!showing) {
      return res.status(400).json({ error: 'Showing does not exist' });
    }
    
    // Check if all seats are available
    for (const seatId of selected_seats) {
      if (!bookingModel.isSeatAvailable(seatId)) {
        return res.status(400).json({ error: `Seat ${seatId} is not available` });
      }
    }
    
    // Create booking
    const result = bookingModel.createBooking(req.body);
    
    res.status(201).json({
      message: 'Booking created successfully',
      bookingId: result.bookingId,
      bookingNumber: result.bookingNumber
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: `Failed to create booking: ${error.message}` });
  }
}

function getBookingByNumber(req, res) {
  try {
    const booking = bookingModel.getBookingByNumber(req.params.bookingNumber);
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
}

function getShowingSeats(req, res) {
  try {
    const showingId = req.params.showingId;
    const result = bookingModel.getShowingSeats(showingId);
    
    if (!result) {
      return res.status(404).json({ error: 'Showing not found' });
    }
    
    res.json(result);
  } catch (error) {
    console.error('Error fetching available seats:', error);
    res.status(500).json({ error: 'Failed to fetch available seats' });
  }
}

module.exports = {
  createBooking,
  getBookingByNumber,
  getShowingSeats
};