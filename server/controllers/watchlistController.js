const watchlistModel = require('../models/watchlistModel');

function getAllWatchlist(req, res) {
  try {
    const watchlist = watchlistModel.getAllWatchlist();
    res.json(watchlist);
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    res.status(500).json({ error: 'Failed to fetch watchlist' });
  }
}

function getWatchlistByUser(req, res) {
  try {
    const userId = req.params.userId;
    const watchlist = watchlistModel.getWatchlistByUserId(userId);

    res.json(watchlist);
  } catch (error) {
    console.error('Error fetching user watchlist:', error);
    res.status(500).json({ error: 'Failed to fetch user watchlist' });
  }
}

function addToWatchlist(req, res) {
  try {
    const { userId, movieId } = req.body;

    if (!userId || !movieId) {
      return res
        .status(400)
        .json({ error: 'User ID and Movie ID are required' });
    }

    const id = watchlistModel.addToWatchlist(userId, movieId);

    res.status(201).json({
      message: 'Movie added to watchlist',
      id: id,
    });
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    res.status(500).json({ error: 'Failed to add to watchlist' });
  }
}

function removeFromWatchlist(req, res) {
  try {
    const { userId, movieId } = req.params;

    watchlistModel.removeFromWatchlist(userId, movieId);

    res.json({ message: 'Movie removed from watchlist' });
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    res.status(500).json({ error: 'Failed to remove from watchlist' });
  }
}

module.exports = {
  getAllWatchlist,
  getWatchlistByUser,
  addToWatchlist,
  removeFromWatchlist,
};
