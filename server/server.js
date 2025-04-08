const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

// Import routes
const moviesRoutes = require('./routes/movieRoutes');
const showingsRoutes = require('./routes//showingRoutes');
const bookingsRoutes = require('./routes/bookingRoutes');
const usersRoutes = require('./routes/userRoutes');
const theatersRoutes = require('./routes/theaterRoutes');
const seatsRoutes = require('./routes/seatRoutes');
const watchlistRoutes = require('./routes/watchlistRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/movies', moviesRoutes);
app.use('/api/showings', showingsRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/theaters', theatersRoutes);
app.use('/api/seats', seatsRoutes);
app.use('/api/watchlist', watchlistRoutes);

// Simple test
app.get('/', (req, res) => {
  res.json({ message: 'Test' });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}`);
});
