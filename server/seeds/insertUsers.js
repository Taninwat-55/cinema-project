const db = require('../db/database');
const crypto = require('crypto');

// Hjälpfunktion för att hasha lösenord
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Radera befintliga användare
db.prepare('DELETE FROM users').run();

// Skapa testanvändare
const users = [
  {
    email: 'user1@example.com',
    password: hashPassword('password123'),
    name: 'Testanvändare 1',
  },
  {
    email: 'user2@example.com',
    password: hashPassword('password123'),
    name: 'Testanvändare 2',
  },
];

// Lägg till användare i databasen
const stmt = db.prepare(
  'INSERT INTO users (email, password, name) VALUES (?, ?, ?)'
);

users.forEach((user) => {
  stmt.run(user.email, user.password, user.name);
  console.log(`✅ Användare skapad: ${user.email}`);
});

console.log('✅ Testanvändare har lagts till i databasen');
