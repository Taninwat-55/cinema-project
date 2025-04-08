const db = require('../db/database');

// Hämta alla salonger
const theaters = db.prepare('SELECT * FROM theaters').all();

// Starta en transaktion för att hålla databasen konsistent
db.prepare('BEGIN TRANSACTION').run();

try {
  // Först radera alla poster i booked_seats som refererar till seats
  db.prepare('DELETE FROM booked_seats').run();

  // Sen radera alla platser
  db.prepare('DELETE FROM seats').run();

  // Förbered insättningssats
  const insertSeat = db.prepare(`
    INSERT INTO seats (theater_id, row_number, seat_number, is_available)
    VALUES (?, ?, ?, 1)
  `);

  theaters.forEach((theater) => {
    console.log(`Genererar platser för ${theater.name}...`);

    // Generera alla platser för denna salong
    for (let row = 1; row <= theater.seats_rows; row++) {
      for (let seat = 1; seat <= theater.seats_columns; seat++) {
        insertSeat.run(theater.theater_id, row, seat);
        console.log(`Skapad plats: Rad ${row}, Stol ${seat} i ${theater.name}`);
      }
    }
  });

  // Commit transaktionen om allt gick bra
  db.prepare('COMMIT').run();
  console.log('✅ Platser har genererats för alla salonger');
} catch (error) {
  // Rollback transaktionen om något gick fel
  db.prepare('ROLLBACK').run();
  console.error('❌ Fel vid generering av platser:', error.message);
  throw error;
}
