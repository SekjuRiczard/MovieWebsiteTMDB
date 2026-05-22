import { useEffect } from "react";

import { useMovieDetails } from "../hooks/useMovieDetails";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

interface MovieModalProps {
  movieId: number | null;
  onClose: () => void;
}

export function MovieModal({ movieId, onClose }: MovieModalProps) {
  const { data, isLoading, isError, error } = useMovieDetails(movieId);

  useEffect(() => {
    if (movieId === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [movieId, onClose]);

  if (movieId === null) {
    return null;
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section
        className="movie-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close-button"
          onClick={onClose}
          aria-label="Zamknij modal"
        >
          ×
        </button>

        {isLoading && <p>Ładowanie szczegółów filmu...</p>}

        {isError && (
          <div className="modal-error" role="alert">
            <h2>Nie udało się pobrać szczegółów</h2>
            <p>{error.message}</p>
          </div>
        )}

        {data && (
          <div className="modal-content">
            {data.poster_path ? (
              <img
                src={`${IMAGE_BASE_URL}${data.poster_path}`}
                alt={`Plakat filmu ${data.title}`}
              />
            ) : (
              <div className="poster-placeholder modal-placeholder">
                Brak plakatu
              </div>
            )}

            <div>
              <h2 id="movie-modal-title">{data.title}</h2>

              {data.tagline && <p className="tagline">{data.tagline}</p>}

              <p className="movie-meta">
                {data.release_date || "brak daty"} •{" "}
                {data.runtime ? `${data.runtime} min` : "brak czasu trwania"} •
                ⭐ {data.vote_average.toFixed(1)}
              </p>

              <p>{data.overview || "Brak opisu filmu."}</p>

              <div className="genres">
                {data.genres.map((genre) => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
