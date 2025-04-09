const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Register a new user
router.post('/register', userController.registerUser);

// Login user
router.post('/login', userController.loginUser);

// Get current user's bookings
router.get('/:userId/bookings', userController.getUserBookings);

// Protected route - requires authentication
router.get(
  '/:userId/bookings',
  authenticateToken,
  userController.getUserBookings
);

module.exports = router;
