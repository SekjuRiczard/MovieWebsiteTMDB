import type { Movie } from "../types/movie";
import { MovieCard } from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  isPlaceholderData: boolean;
  isFavorite: (id: number) => boolean;
  onToggleFavorite: (movie: Movie) => void;
  onOpenDetails: (id: number) => void;
}

export function MovieGrid({
  movies,
  isPlaceholderData,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
}: MovieGridProps) {
  return (
    <section
      className={
        isPlaceholderData ? "movie-grid loading-old-data" : "movie-grid"
      }
      aria-label="Lista filmów"
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={isFavorite(movie.id)}
          onToggleFavorite={onToggleFavorite}
          onOpenDetails={onOpenDetails}
        />
      ))}
    </section>
  );
}
