import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/MovieDetailPage.css';

function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [showings, setShowings] = useState([]);

  useEffect(() => {
    fetch(`/api/movies/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));

    fetch(`/api/showings/movie/${id}`)
      .then((res) => res.json())
      .then((data) => setShowings(data));
  }, [id]);

  if (!movie) return <p>Laddar film...</p>;

  return (
    <div className="movie-detail-page">
      <h1>{movie.title}</h1>

      {movie.poster_url && (
        <img src={movie.poster_url} alt={`Poster för ${movie.title}`} />
      )}
      {movie.trailer_url && (
        <p>
          <a href={movie.trailer_url} target="_blank" rel="noopener noreferrer">
            ▶️ Se trailer
          </a>
        </p>
      )}

      <p>
        <strong>Regissör:</strong> {movie.director}
      </p>
      <p>
        <strong>Genre:</strong> {movie.genre}
      </p>
      <p>
        <strong>Längd:</strong> {movie.length_minutes} min
      </p>
      <p>
        <strong>Utgivningsår:</strong> {movie.release_year}
      </p>

      <p>
        <strong>Beskrivning:</strong> {movie.description}
      </p>

      <h2>Visningar:</h2>
      {showings.length > 0 ? (
        <ul>
          {showings.map((showing) => {
            const date = new Date(showing.showing_time);
            const formattedDate = new Intl.DateTimeFormat('sv-SE', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }).format(date);

            return (
              <li key={showing.showing_id}>
                <Link to={`/booking/${showing.showing_id}`}>
                  🎥 {formattedDate} – {showing.theater_name}
                </Link>
                <br />
                🎟️ Vuxen: {showing.price_adult} kr | Barn: {showing.price_child}{' '}
                kr | Pensionär: {showing.price_senior} kr
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Inga visningar tillgängliga.</p>
      )}
    </div>
  );
}

export default MovieDetailPage;
