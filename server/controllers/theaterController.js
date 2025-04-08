const theaterModel = require('../models/theaterModel');

function getAllTheaters(req, res) {
  try {
    const theaters = theaterModel.getAllTheaters();
    res.json(theaters);
  } catch (error) {
    console.error('Error fetching theaters:', error);
    res.status(500).json({ error: 'Failed to fetch theaters' });
  }
}

function getTheaterById(req, res) {
  try {
    const theater = theaterModel.getTheaterById(req.params.id);

    if (!theater) {
      return res.status(404).json({ error: 'Theater not found' });
    }

    res.json(theater);
  } catch (error) {
    console.error('Error fetching theater:', error);
    res.status(500).json({ error: 'Failed to fetch theater' });
  }
}

function createTheater(req, res) {
  try {
    const { name, seats_rows, seats_columns } = req.body;

    // Validate required fields
    if (!name || !seats_rows || !seats_columns) {
      return res
        .status(400)
        .json({ error: 'Name, rows, and columns are required' });
    }

    const theaterId = theaterModel.createTheater(req.body);

    res.status(201).json({
      message: 'Theater added successfully',
      theaterId: theaterId,
    });
  } catch (error) {
    console.error('Error creating theater:', error);
    res.status(500).json({ error: 'Failed to create theater' });
  }
}

module.exports = {
  getAllTheaters,
  getTheaterById,
  createTheater,
};
