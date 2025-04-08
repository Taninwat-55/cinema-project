const db = require('../db/database');

// Hämta alla filmer och salonger från databasen
const movies = db.prepare('SELECT movie_id, title FROM movies').all();
const theaters = db.prepare('SELECT theater_id, name FROM theaters').all();

const insertStmt = db.prepare(`
    INSERT INTO showings (movie_id, theater_id, showing_time, price_adult, price_child, price_senior)
    VALUES (?, ?, ?, ?, ?, ?)
`);

let startDate = new Date();
startDate.setHours(18, 0, 0, 0); // Alla visningar startar kl 18.00

movies.forEach((movie, movieIndex) => {
  theaters.forEach((theater, theaterIndex) => {
    // Skapa 2-3 visningstider per dag för varje film
    const showtimes = [
      new Date(startDate), // 18:00
      new Date(startDate), // 20:30
    ];

    // Sätt andra visningstiden till 20:30
    showtimes[1].setHours(20, 30, 0, 0);

    // Om filmen är kortare än 120 minuter, lägg till en tredje visning kl 15:30
    if (movie.length_minutes < 120) {
      const earlyShow = new Date(startDate);
      earlyShow.setHours(15, 30, 0, 0);
      showtimes.unshift(earlyShow);
    }

    showtimes.forEach((showtime) => {
      // Räkna fram visningstiden
      const showingDate = new Date(showtime);
      showingDate.setDate(
        showingDate.getDate() + movieIndex * 2 + theaterIndex
      );

      const timeString = showingDate
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');

      insertStmt.run(
        movie.movie_id,
        theater.theater_id,
        timeString,
        120.0, // vuxen
        90.0, // barn
        100.0 // pensionär
      );

      console.log(
        `✅ Visning tillagd: ${movie.title} i ${theater.name} - ${timeString}`
      );
    });
  });
});
