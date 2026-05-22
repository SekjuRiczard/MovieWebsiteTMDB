import type { Movie } from "../types/movie";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
  onOpenDetails: (id: number) => void;
}

export function MovieCard({
  movie,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
}: MovieCardProps) {
  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "brak daty";

  return (
    <article className="movie-card">
      <button
        type="button"
        className="movie-poster-button"
        onClick={() => onOpenDetails(movie.id)}
        aria-label={`Pokaż szczegóły filmu ${movie.title}`}
      >
        {movie.poster_path ? (
          <img
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={`Plakat filmu ${movie.title}`}
            loading="lazy"
          />
        ) : (
          <div className="poster-placeholder">Brak plakatu</div>
        )}
      </button>

      <div className="movie-card-content">
        <div>
          <h2>{movie.title}</h2>
          <p className="movie-meta">
            {releaseYear} • ⭐ {movie.vote_average.toFixed(1)}
          </p>
        </div>

        <p className="movie-overview">
          {movie.overview || "Brak opisu filmu."}
        </p>

        <div className="movie-actions">
          <button type="button" onClick={() => onOpenDetails(movie.id)}>
            Szczegóły
          </button>

          <button
            type="button"
            className={
              isFavorite ? "favorite-button active" : "favorite-button"
            }
            onClick={() => onToggleFavorite(movie)}
            aria-label={
              isFavorite
                ? `Usuń film ${movie.title} z ulubionych`
                : `Dodaj film ${movie.title} do ulubionych`
            }
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </article>
  );
}
