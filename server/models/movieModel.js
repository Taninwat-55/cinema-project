const db = require('../db/database');

function getAllMovies() {
  return db.prepare('SELECT * FROM movies').all();
}

function getMovieById(id) {
  return db.prepare('SELECT * FROM movies WHERE movie_id = ?').get(id);
}

function addMovie(movie) {
  const {
    imdb_id,
    title,
    description,
    length_minutes,
    release_year,
    director,
    poster_url,
    trailer_url,
    genre,
  } = movie;

  const result = db.prepare(`
    INSERT INTO movies (imdb_id, title, description, length_minutes, release_year, director, poster_url, trailer_url, genre)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    imdb_id,
    title,
    description,
    length_minutes,
    release_year,
    director,
    poster_url,
    trailer_url,
    genre
  );

  return result.lastInsertRowid;
}

function updateMovie(id, movie) {
  const {
    imdb_id,
    title,
    description,
    length_minutes,
    release_year,
    director,
    poster_url,
    trailer_url,
    genre,
  } = movie;

  db.prepare(`
    UPDATE movies
    SET imdb_id = ?, title = ?, description = ?, length_minutes = ?, release_year = ?, 
        director = ?, poster_url = ?, trailer_url = ?, genre = ?
    WHERE movie_id = ?
  `).run(
    imdb_id,
    title,
    description,
    length_minutes,
    release_year,
    director,
    poster_url,
    trailer_url,
    genre,
    id
  );
}

function deleteMovie(id) {
  db.prepare('DELETE FROM movies WHERE movie_id = ?').run(id);
}

function hasShowingsForMovie(id) {
  const showings = db.prepare('SELECT * FROM showings WHERE movie_id = ?').all(id);
  return showings.length > 0;
}

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
  hasShowingsForMovie
};