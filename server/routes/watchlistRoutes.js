const express = require('express');
const router = express.Router();
const watchlistController = require('../controllers/watchlistController');

// Get all watchlist items (this would be for admin purposes)
router.get('/', watchlistController.getAllWatchlist);

// Get watchlist for a specific user
router.get('/user/:userId', watchlistController.getWatchlistByUser);

// Add a movie to a user's watchlist
router.post('/', watchlistController.addToWatchlist);

// Remove a movie from a user's watchlist
router.delete('/:userId/:movieId', watchlistController.removeFromWatchlist);

module.exports = router;
