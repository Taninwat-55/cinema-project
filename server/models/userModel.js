const db = require('../db/database');
const crypto = require('crypto');

function getUserByEmail(email) {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
}

function getUserById(id) {
  return db.prepare('SELECT * FROM users WHERE user_id = ?').get(id);
}

function registerUser(userData) {
  const { email, password, name } = userData;

  // Hash the password
  const hashedPassword = crypto
    .createHash('sha256')
    .update(password)
    .digest('hex');

  const result = db
    .prepare(
      `
    INSERT INTO users (email, password, name)
    VALUES (?, ?, ?)
  `
    )
    .run(email, hashedPassword, name);

  return result.lastInsertRowid;
}

function loginUser(email, password) {
  // Hash the provided password
  const hashedPassword = crypto
    .createHash('sha256')
    .update(password)
    .digest('hex');

  // Check if user exists and password matches
  return db
    .prepare(
      'SELECT user_id, email, name FROM users WHERE email = ? AND password = ?'
    )
    .get(email, hashedPassword);
}

function getUserBookings(userId) {
  // Get upcoming bookings (showings in the future)
  const upcomingBookings = db
    .prepare(
      `
    SELECT b.*, s.showing_time, m.title as movie_title, t.name as theater_name
    FROM bookings b
    JOIN showings s ON b.showing_id = s.showing_id
    JOIN movies m ON s.movie_id = m.movie_id
    JOIN theaters t ON s.theater_id = t.theater_id
    WHERE b.user_id = ? AND s.showing_time > datetime('now')
    ORDER BY s.showing_time
  `
    )
    .all(userId);

  // Get past bookings (showings in the past)
  const pastBookings = db
    .prepare(
      `
    SELECT b.*, s.showing_time, m.title as movie_title, t.name as theater_name
    FROM bookings b
    JOIN showings s ON b.showing_id = s.showing_id
    JOIN movies m ON s.movie_id = m.movie_id
    JOIN theaters t ON s.theater_id = t.theater_id
    WHERE b.user_id = ? AND s.showing_time <= datetime('now')
    ORDER BY s.showing_time DESC
  `
    )
    .all(userId);

  return {
    upcoming: upcomingBookings,
    past: pastBookings,
  };
}

module.exports = {
  getUserByEmail,
  getUserById,
  registerUser,
  loginUser,
  getUserBookings,
};
