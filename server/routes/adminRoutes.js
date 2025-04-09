const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const showingController = require('../controllers/showingController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');

// All admin routes require authentication and admin privileges
router.use(authenticateToken, isAdmin);

// Admin Movie Routes
router.post('/movies', movieController.createMovie);
router.put('/movies/:id', movieController.updateMovie);
router.delete('/movies/:id', movieController.deleteMovie);

// Admin Showing Routes
router.post('/showings', showingController.createShowing);
router.put('/showings/:id', showingController.updateShowing);
router.delete('/showings/:id', showingController.deleteShowing);

module.exports = router;
