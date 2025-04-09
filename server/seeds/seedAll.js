// server/seeds/index.js
// This file allows importing all seed files at once

const path = require('path');
const fs = require('fs');

// Function to run all seed scripts in the proper order
function seedDatabase() {
  console.log('Starting database seeding...');

  try {
    // Run seed files in specific order
    require('./insertMovies');
    require('./insertSeats');
    require('./insertUsers');
    require('./insertShowings');
    require('./insertBookings');

    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
  }
}

// Check if this file is being run directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };
