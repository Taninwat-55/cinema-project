const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Create a new booking
router.post('/', bookingController.createBooking);

// Get booking by booking number
router.get('/number/:bookingNumber', bookingController.getBookingByNumber);

// Get available seats for a showing
router.get('/showing/:showingId/seats', bookingController.getShowingSeats);

module.exports = router;