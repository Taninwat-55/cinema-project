const fs = require('fs');
const path = require('path');
const db = require('./database');

// Function to initialize the database
function initializeDatabase() {
  try {
    // Check if any tables exist
    const tableExists = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='movies'").get();
    
    if (!tableExists) {
      console.log('Database tables not found. Creating schema...');
      
      // Read schema file
      const schemaPath = path.join(__dirname, 'schema.sql');
      const schema = fs.readFileSync(schemaPath, 'utf-8');
      
      // Execute schema
      db.exec(schema);
      
      // Add trigger manually
      db.exec(`
        CREATE TRIGGER IF NOT EXISTS update_movies_timestamp
        AFTER UPDATE ON movies
        BEGIN
            UPDATE movies SET updated_at = CURRENT_TIMESTAMP WHERE movie_id = NEW.movie_id;
        END;
      `);
      
      console.log('Database initialized successfully.');
      return true;
    } else {
      console.log('Database schema already exists.');
      return false;
    }
  } catch (error) {
    console.error('Error initializing database:', error.message);
    throw error;
  }
}

module.exports = { initializeDatabase };