const db = require('../db/database');

function getAvailableSeats(theaterId) {
  return db
    .prepare(
      `
    SELECT * FROM seats 
    WHERE theater_id = ? AND is_available = 1
    ORDER BY row_number, seat_number
  `
    )
    .all(theaterId);
}

function getAllSeatsByTheaterId(theaterId) {
  return db
    .prepare(
      `
    SELECT * FROM seats 
    WHERE theater_id = ? 
    ORDER BY row_number, seat_number
  `
    )
    .all(theaterId);
}

function getSeatById(seatId) {
  return db.prepare('SELECT * FROM seats WHERE seat_id = ?').get(seatId);
}

function updateSeatAvailability(seatId, isAvailable) {
  db.prepare('UPDATE seats SET is_available = ? WHERE seat_id = ?').run(
    isAvailable ? 1 : 0,
    seatId
  );
}

module.exports = {
  getAvailableSeats,
  getAllSeatsByTheaterId,
  getSeatById,
  updateSeatAvailability,
};
