const express = require('express');
const router = express.Router();
const theaterController = require('../controllers/theaterController');

// Get all theaters
router.get('/', theaterController.getAllTheaters);

// Get theater by ID
router.get('/:id', theaterController.getTheaterById);

// Create a new theater
router.post('/', theaterController.createTheater);

module.exports = router;
