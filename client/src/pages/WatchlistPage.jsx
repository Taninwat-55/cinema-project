import { useState, useEffect } from "react";
import "../styles/WatchlistPage.css";
import { Link } from "react-router-dom";

export default function WatchlistPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showWatchlist, setShowWatchlist] = useState(false);

  useEffect(() => {
    // Check if the watchlist button was clicked (stored in localStorage)
    const watchlistClicked = localStorage.getItem("watchlistClicked") === "true";
    setShowWatchlist(watchlistClicked);

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

    if (watchlistClicked) {
      fetchMovies();
    } else {
      setLoading(false); // No need to fetch if watchlist isn't clicked
    }
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
      <div className="movie-list">
        {showWatchlist && movies.length > 0 ? (
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
                <div className="movie-details">
                  <span className="rating">
                    IMDb {movie.imdbRating || "N/A"}
                  </span>
                  <span className="year">{movie.release_year}</span>
                  <span className="duration">{movie.length_minutes} min</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-watchlist">
            <h3>Your watchlist is empty !</h3>
            <p>Visite the main page to add movies to your watchlist</p>
          </div>
        )}
      </div>
      <Link to="/" className="back-to-home">
        Back to Home
      </Link>
    </div>
  );
}