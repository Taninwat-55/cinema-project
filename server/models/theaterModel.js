const db = require('../db/database');

function getAllTheaters() {
  return db.prepare('SELECT * FROM theaters').all();
}

function getTheaterById(id) {
  const theater = db
    .prepare('SELECT * FROM theaters WHERE theater_id = ?')
    .get(id);

  if (!theater) {
    return null;
  }

  // Get all seats for this theater
  const seats = db
    .prepare(
      'SELECT * FROM seats WHERE theater_id = ? ORDER BY row_number, seat_number'
    )
    .all(id);

  // Include seats in the response
  theater.seats = seats;

  return theater;
}

function createTheater(theaterData) {
  const { name, seats_rows, seats_columns } = theaterData;

  // Calculate total seats
  const total_seats = seats_rows * seats_columns;

  // Begin transaction
  db.prepare('BEGIN TRANSACTION').run();

  try {
    // Insert theater
    const result = db
      .prepare(
        `
      INSERT INTO theaters (name, seats_rows, seats_columns, total_seats)
      VALUES (?, ?, ?, ?)
    `
      )
      .run(name, seats_rows, seats_columns, total_seats);

    const theaterId = result.lastInsertRowid;

    // Create seats for the theater
    const insertSeat = db.prepare(`
      INSERT INTO seats (theater_id, row_number, seat_number, is_available)
      VALUES (?, ?, ?, 1)
    `);

    for (let row = 1; row <= seats_rows; row++) {
      for (let seat = 1; seat <= seats_columns; seat++) {
        insertSeat.run(theaterId, row, seat);
      }
    }

    // Commit transaction
    db.prepare('COMMIT').run();

    return theaterId;
  } catch (error) {
    // Rollback on error
    db.prepare('ROLLBACK').run();
    throw error;
  }
}

module.exports = {
  getAllTheaters,
  getTheaterById,
  createTheater,
};
