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
    email: 'admin@cinema.com',
    password: hashPassword('admin123'),
    name: 'Admin User',
    role: 'admin',
  },
  {
    email: 'user1@example.com',
    password: hashPassword('password123'),
    name: 'Testanvändare 1',
    role: 'user',
  },
];

// Lägg till användare i databasen
const stmt = db.prepare(
  'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)'
);

users.forEach((user) => {
  stmt.run(user.email, user.password, user.name, user.role);
  console.log(`✅ Användare skapad: ${user.email} (${user.role})`);
});

console.log('✅ Testanvändare har lagts till i databasen');
