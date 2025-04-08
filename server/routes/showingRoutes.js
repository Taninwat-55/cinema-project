const express = require('express');
const router = express.Router();
const showingController = require('../controllers/showingController');

// Get all showings
router.get('/', showingController.getAllShowings);

// Get showings for a specific movie
router.get('/movie/:movieId', showingController.getShowingsByMovie);

// Get a specific showing
router.get('/:id', showingController.getShowingById);

// Create a new showing
router.post('/', showingController.createShowing);

// Delete a showing
router.delete('/:id', showingController.deleteShowing);

module.exports = router;