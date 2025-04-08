const movieModel = require('../models/movieModel');

function getAllMovies(req, res) {
  try {
    const movies = movieModel.getAllMovies();
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
}

function getMovieById(req, res) {
  try {
    const movie = movieModel.getMovieById(req.params.id);

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.json(movie);
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
}

function createMovie(req, res) {
  try {
    const { imdb_id, title } = req.body;

    if (!imdb_id || !title) {
      return res.status(400).json({ error: 'IMDB ID and title are required' });
    }

    const movieId = movieModel.addMovie(req.body);

    res.status(201).json({
      message: 'Movie added successfully',
      movieId: movieId,
    });
  } catch (error) {
    console.error('Error creating movie:', error);
    res.status(500).json({ error: 'Failed to create movie' });
  }
}

function updateMovie(req, res) {
  try {
    const { imdb_id, title } = req.body;

    if (!imdb_id || !title) {
      return res.status(400).json({ error: 'IMDB ID and title are required' });
    }

    const movie = movieModel.getMovieById(req.params.id);

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    movieModel.updateMovie(req.params.id, req.body);

    res.json({ message: 'Movie updated successfully' });
  } catch (error) {
    console.error('Error updating movie:', error);
    res.status(500).json({ error: 'Failed to update movie' });
  }
}

function deleteMovie(req, res) {
  try {
    const movie = movieModel.getMovieById(req.params.id);

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Check if there are showings for this movie
    const hasShowings = movieModel.hasShowingsForMovie(req.params.id);

    if (hasShowings) {
      return res
        .status(400)
        .json({ error: 'Cannot delete movie with existing showings' });
    }

    movieModel.deleteMovie(req.params.id);

    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).json({ error: 'Failed to delete movie' });
  }
}

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
