const { exec } = require('child_process');

console.log('Starting database seeding...');

// Function to run a seed script
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

// Run seed scripts in sequence
async function seedAll() {
  try {
    // Order matters here - some seeds depend on others
    await runSeed('insertMovies');
    await runSeed('insertSeats');
    await runSeed('insertScreenings');
    await runSeed('insertUsers');
    await runSeed('insertBookings');

    console.log('✅ All seed scripts completed successfully!');
  } catch (error) {
    console.error('❌ Seeding process failed');
  }
}

seedAll();
