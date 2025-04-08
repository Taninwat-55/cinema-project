import { useState, useEffect } from "react";
//import { useParams } from "react-router-dom";
import "../styles/WatchlistPage.css";
import { Link } from "react-router-dom";

export default function WatchlistPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const { id } = useParams(); 

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("/api/watchlist/");
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();

        setMovies(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="watchlist-page">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="watchlist-page">
        <h2>Error: {error}</h2>
      </div>
    );
  }

  return (
    <div className="watchlist-page">
      {/* Header Section */}
      <header className="header">
        <div className="menu-icon">
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
        </div>
        <h1>WATCHLIST</h1>
        <div className="user-profile">
          <span className="profile-icon">👤</span>
          <span className="username">JOE76</span>
        </div>
      </header>

      {/* Movie List Section */}
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id || movie.title || Math.random()} className="movie-card">
              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                {movie.poster_url && (
                  <img
                    src={movie.poster_url}
                    alt={`Poster för ${movie.title}`}
                  />
                )}
                {movie.trailer_url && (
                  <p>
                    <a
                      href={movie.trailer_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ▶️ Se trailer
                    </a>
                  </p>
                )}
                <div className="movie-details">
                  <span className="rating">
                    IMDb {movie.imdbRating || "N/A"}
                  </span>
                  <span className="year">{movie.release_year}</span>
                  <span className="duration">{movie.length_minutes} min</span>
                </div>
                <p className="genres-text">
                  {movie.genre ? movie.genre.split(", ").join(", ") : "N/A"}
                </p>
                <button className="watchlist-btn">❤️ Watchlist</button>
              </div>
            </div>
          ))
        ) : (
          <p>No movies in your watchlist.</p>
        )}
      </div>

      {/* Pagination Dots (Dynamic based on number of movies) */}
      <div className="pagination">
        {movies.length > 0 &&
          movies.map((movie, index) => (
            <span
              key={`dot-${movie.id || index}`}
              className={`dot ${index === 0 ? "active" : ""}`}
            />
          ))}
      </div>
      <Link to="/" className="back-to-home">
        Back to Home 
      </Link>
    </div>
  );
}
