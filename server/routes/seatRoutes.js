// server/routes/seatRoutes.js
const express = require('express');
const router = express.Router();
const seatController = require('../controllers/seatController');

// Get available seats for a theater
router.get('/:id/available', seatController.getAvailableSeats);

// Get all seats for a theater
router.get('/:id', seatController.getAllSeatsByTheater);

module.exports = router;
