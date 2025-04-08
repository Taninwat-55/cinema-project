const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register a new user
router.post('/register', userController.registerUser);

// Login user
router.post('/login', userController.loginUser);

// Get current user's bookings
router.get('/:userId/bookings', userController.getUserBookings);

module.exports = router;
