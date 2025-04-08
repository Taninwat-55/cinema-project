function MovieInfo({ movie, screening, formattedDate }) {
    return (
      <div className="movie-info">
        <h2>{movie.title}</h2>
        <p>
          <strong>Tid:</strong> {formattedDate}
        </p>
        <p>
          <strong>Salong:</strong> {screening.theater_name}
        </p>
      </div>
    );
  }
  
  export default MovieInfo;