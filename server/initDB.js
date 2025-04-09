// const fs = require('fs');
// const path = require('path');
// const db = require('./db/database');

// const schema = fs.readFileSync(
//   path.join(__dirname, 'db', 'schema.sql'),
//   'utf-8'
// );

// // Dela upp i flera statements baserat på semikolon
// const statements = schema
//   .split(';')
//   .map((stmt) => stmt.trim())
//   .filter((stmt) => stmt.length > 0); // ta bort tomma

// try {
//   db.pragma('foreign_keys = ON');

//   // Execute each statement
//   for (const stmt of statements) {
//     console.log('🚀 Executing:', stmt); // för debugging
//     db.exec(stmt + ';');
//   }
//   console.log('✅ Databasen har initierats enligt schema.sql');
// } catch (err) {
//   console.error('❌ Fel vid initiering av databas:', err.message);
// }

// // Special case for the trigger - add it manually at the end
// db.exec(`
//     CREATE TRIGGER IF NOT EXISTS update_movies_timestamp
//     AFTER UPDATE ON movies
//     BEGIN
//         UPDATE movies SET updated_at = CURRENT_TIMESTAMP WHERE movie_id = NEW.movie_id;
//     END;
// `);
