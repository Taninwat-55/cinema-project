// const Database = require('better-sqlite3');
// const path = require('path');
// const fs = require('fs');

// // Make sure the directory exists
// const dbDir = path.dirname(path.join(__dirname, 'cinema.db'));
// if (!fs.existsSync(dbDir)) {
//   fs.mkdirSync(dbDir, { recursive: true });
// }

// // Create database connection
// const db = new Database(path.join(__dirname, 'cinema.db'));

// // Enable foreign keys
// db.pragma('foreign_keys = ON');

// module.exports = db;

const Database = require('better-sqlite3');
// const db = new Database('cinema.db');
const path = require('path');

const db = new Database(path.join(__dirname, '../../cinema.db'));

// // Enable foreign keys
db.pragma('foreign_keys = ON');

module.exports = db;
