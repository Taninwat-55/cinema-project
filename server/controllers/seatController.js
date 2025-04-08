const seatModel = require('../models/seatModel');

function getAvailableSeats(req, res) {
  try {
    const theaterId = req.params.id;
    const availableSeats = seatModel.getAvailableSeats(theaterId);

    res.json(availableSeats);
  } catch (error) {
    console.error('Error fetching available seats:', error);
    res.status(500).json({ error: 'Failed to fetch available seats' });
  }
}

function getAllSeatsByTheater(req, res) {
  try {
    const theaterId = req.params.id;
    const seats = seatModel.getAllSeatsByTheaterId(theaterId);

    res.json(seats);
  } catch (error) {
    console.error('Error fetching seats:', error);
    res.status(500).json({ error: 'Failed to fetch seats' });
  }
}

module.exports = {
  getAvailableSeats,
  getAllSeatsByTheater,
};
