const db = require('../db/database');

function getAllShowings() {
  return db.prepare(`
    SELECT s.*, m.title as movie_title, t.name as theater_name
    FROM showings s
    JOIN movies m ON s.movie_id = m.movie_id
    JOIN theaters t ON s.theater_id = t.theater_id
  `).all();
}

function getShowingsByMovieId(movieId) {
  return db.prepare(`
    SELECT s.*, m.title as movie_title, t.name as theater_name
    FROM showings s
    JOIN movies m ON s.movie_id = m.movie_id
    JOIN theaters t ON s.theater_id = t.theater_id
    WHERE s.movie_id = ?
  `).all(movieId);
}

function getShowingById(id) {
  return db.prepare(`
    SELECT s.*, m.title as movie_title, t.name as theater_name
    FROM showings s
    JOIN movies m ON s.movie_id = m.movie_id
    JOIN theaters t ON s.theater_id = t.theater_id
    WHERE s.showing_id = ?
  `).get(id);
}

function createShowing(showingData) {
  const {
    movie_id,
    theater_id,
    showing_time,
    price_adult,
    price_child,
    price_senior,
  } = showingData;

  const result = db.prepare(`
    INSERT INTO showings (movie_id, theater_id, showing_time, price_adult, price_child, price_senior)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    movie_id,
    theater_id,
    showing_time,
    price_adult,
    price_child,
    price_senior
  );

  return result.lastInsertRowid;
}

function deleteShowing(id) {
  db.prepare('DELETE FROM showings WHERE showing_id = ?').run(id);
}

function getMovieById(id) {
  return db.prepare('SELECT * FROM movies WHERE movie_id = ?').get(id);
}

function getTheaterById(id) {
  return db.prepare('SELECT * FROM theaters WHERE theater_id = ?').get(id);
}

function hasBookings(showingId) {
  const bookings = db.prepare('SELECT * FROM bookings WHERE showing_id = ?').all(showingId);
  return bookings.length > 0;
}

module.exports = {
  getAllShowings,
  getShowingsByMovieId,
  getShowingById,
  createShowing,
  deleteShowing,
  getMovieById,
  getTheaterById,
  hasBookings
};