const showingModel = require('../models/showingModel');

function getAllShowings(req, res) {
  try {
    const showings = showingModel.getAllShowings();
    res.json(showings);
  } catch (error) {
    console.error('Error fetching showings:', error);
    res.status(500).json({ error: 'Failed to fetch showings' });
  }
}

function getShowingsByMovie(req, res) {
  try {
    const showings = showingModel.getShowingsByMovieId(req.params.movieId);
    res.json(showings);
  } catch (error) {
    console.error('Error fetching showings for movie:', error);
    res.status(500).json({ error: 'Failed to fetch showings for movie' });
  }
}

function getShowingById(req, res) {
  try {
    const showing = showingModel.getShowingById(req.params.id);

    if (!showing) {
      return res.status(404).json({ error: 'Showing not found' });
    }

    res.json(showing);
  } catch (error) {
    console.error('Error fetching showing:', error);
    res.status(500).json({ error: 'Failed to fetch showing' });
  }
}

function createShowing(req, res) {
  try {
    const {
      movie_id,
      theater_id,
      showing_time,
      price_adult,
      price_child,
      price_senior,
    } = req.body;

    // Validate required fields
    if (
      !movie_id ||
      !theater_id ||
      !showing_time ||
      price_adult === undefined ||
      price_child === undefined ||
      price_senior === undefined
    ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if movie exists
    const movie = showingModel.getMovieById(movie_id);
    if (!movie) {
      return res.status(400).json({ error: 'Movie does not exist' });
    }

    // Check if theater exists
    const theater = showingModel.getTheaterById(theater_id);
    if (!theater) {
      return res.status(400).json({ error: 'Theater does not exist' });
    }

    const showingId = showingModel.createShowing(req.body);

    res.status(201).json({
      message: 'Showing added successfully',
      showingId: showingId,
    });
  } catch (error) {
    console.error('Error creating showing:', error);
    res.status(500).json({ error: 'Failed to create showing' });
  }
}

function deleteShowing(req, res) {
  try {
    const showing = showingModel.getShowingById(req.params.id);

    if (!showing) {
      return res.status(404).json({ error: 'Showing not found' });
    }

    // Check if there are bookings for this showing
    const hasBookings = showingModel.hasBookings(req.params.id);

    if (hasBookings) {
      return res
        .status(400)
        .json({ error: 'Cannot delete showing with existing bookings' });
    }

    showingModel.deleteShowing(req.params.id);

    res.json({ message: 'Showing deleted successfully' });
  } catch (error) {
    console.error('Error deleting showing:', error);
    res.status(500).json({ error: 'Failed to delete showing' });
  }
}

module.exports = {
  getAllShowings,
  getShowingsByMovie,
  getShowingById,
  createShowing,
  deleteShowing,
};
