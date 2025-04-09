const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getMovieById);
router.post('/', authenticateToken, isAdmin, movieController.createMovie);
router.put('/:id', authenticateToken, isAdmin, movieController.updateMovie);
router.delete('/:id', authenticateToken, isAdmin, movieController.deleteMovie);

module.exports = router;
