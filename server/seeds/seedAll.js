const { exec } = require('child_process');
const Database = require('better-sqlite3');

// 🧹 Funktion för att rensa alla tabeller
function clearAllTables() {
  const db = new Database('db/cinema.db');

  db.exec(`
    PRAGMA foreign_keys = OFF;

    DELETE FROM bookings;
    DELETE FROM seats;
    DELETE FROM screenings;
    DELETE FROM users;
    DELETE FROM movies;

    PRAGMA foreign_keys = ON;
  `);

  db.close();
  console.log('🧹 Cleared all tables before seeding.');
}

// ✅ Endast rensa databasen i utvecklingsmiljö
if (process.env.NODE_ENV !== 'production') {
  clearAllTables();
} else {
  console.warn('⚠️ Not allowed to run in production!');
}

console.log('Starting database seeding...');

// Funktion för att köra varje seed script
function runSeed(scriptName) {
  return new Promise((resolve, reject) => {
    console.log(`Running ${scriptName}...`);

    exec(`node ${__dirname}/${scriptName}.js`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing ${scriptName}: ${error.message}`);
        return reject(error);
      }

      console.log(stdout);
      resolve();
    });
  });
}

// Kör alla seeds i ordning
async function seedAll() {
  try {
    await runSeed('insertMovies');
    await runSeed('insertSeats');
    await runSeed('insertShowings');
    await runSeed('insertUsers');
    await runSeed('insertBookings');

    console.log('✅ All seed scripts completed successfully!');
  } catch (error) {
    console.error('❌ Seeding process failed');
  }
}

seedAll();
