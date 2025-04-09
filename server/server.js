const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Import routes
const moviesRoutes = require('./routes/movieRoutes');
const showingsRoutes = require('./routes//showingRoutes');
const bookingsRoutes = require('./routes/bookingRoutes');
const usersRoutes = require('./routes/userRoutes');
const theatersRoutes = require('./routes/theaterRoutes');
const seatsRoutes = require('./routes/seatRoutes');
const watchlistRoutes = require('./routes/watchlistRoutes');
const authRoutes = require('./routes/authRoutes');
const { initializeDatabase } = require('./db/dbInit');

try {
  const dbInitialized = initializeDatabase();
  if (dbInitialized) {
    // If database was just created, seed with initial data
    // Optional: Only uncomment these if you want to auto-seed data
    // require('./seeds/insertMovies');
    // require('./seeds/insertSeats');
    // require('./seeds/insertUsers');
    // require('./seeds/insertShowings');
    // require('./seeds/insertBookings');
  }
} catch (error) {
  console.error('Error during database initialization:', error);
  // Don't exit - let's still try to start the server
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/movies', moviesRoutes);
app.use('/api/showings', showingsRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/theaters', theatersRoutes);
app.use('/api/seats', seatsRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/auth', authRoutes);

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
