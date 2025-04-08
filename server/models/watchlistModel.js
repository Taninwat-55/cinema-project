const db = require('../db/database');

function getAllWatchlist() {
  return db.prepare('SELECT * FROM movies').all();
}

function getWatchlistByUserId(userId) {
  // Assuming you have a watchlist table that connects users to movies
  // If not, you'll need to create this table
  return db
    .prepare(
      `
    SELECT m.* FROM movies m
    JOIN watchlist w ON m.movie_id = w.movie_id
    WHERE w.user_id = ?
  `
    )
    .all(userId);
}

function addToWatchlist(userId, movieId) {
  // Assuming you have a watchlist table
  const result = db
    .prepare(
      `
    INSERT INTO watchlist (user_id, movie_id)
    VALUES (?, ?)
  `
    )
    .run(userId, movieId);

  return result.lastInsertRowid;
}

function removeFromWatchlist(userId, movieId) {
  // Assuming you have a watchlist table
  db.prepare(
    `
    DELETE FROM watchlist 
    WHERE user_id = ? AND movie_id = ?
  `
  ).run(userId, movieId);
}

module.exports = {
  getAllWatchlist,
  getWatchlistByUserId,
  addToWatchlist,
  removeFromWatchlist,
};
