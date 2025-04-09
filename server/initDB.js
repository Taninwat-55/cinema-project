const fs = require('fs');
const path = require('path');
const db = require('./db/database');

const schema = fs.readFileSync(
  path.join(__dirname, 'db', 'schema.sql'),
  'utf-8'
);

// Dela upp i flera statements baserat på semikolon
const statements = schema
  .split(';')
  .map((stmt) => stmt.trim())
  .filter((stmt) => stmt.length > 0); // ta bort tomma

try {
  db.pragma('foreign_keys = ON');
  for (const stmt of statements) {
    console.log('🚀 Executing:', stmt); // för debugging
    db.exec(stmt + ';');
  }
  console.log('✅ Databasen har initierats enligt schema.sql');
} catch (err) {
  console.error('❌ Fel vid initiering av databas:', err.message);
}
