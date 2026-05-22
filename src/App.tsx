import { useEffect, useState } from "react";

import { EmptyState } from "./components/EmptyState";
import { ErrorBanner } from "./components/ErrorBanner";
import { MovieGrid } from "./components/MovieGrid";
import { MovieModal } from "./components/MovieModal";
import { MoviePagination } from "./components/MoviePagination";
import { SkeletonCard } from "./components/SkeletonCard";
import { useDebounce } from "./hooks/useDebounce";
import { useFavorites } from "./hooks/useFavorites";
import { useFetchMovies } from "./hooks/useFetchMovies";

export default function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const debouncedQuery = useDebounce(query, 300);
  const moviesQuery = useFetchMovies(page, debouncedQuery);
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  const movies = moviesQuery.data?.results ?? [];
  const totalPages = moviesQuery.data?.total_pages ?? 1;

  return (
    <main className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Laboratorium 9</p>
          <h1>Movie Browser</h1>
        </div>

        <div className="favorites-counter">
          <span>{favorites.length}</span>
          <p>ulubione</p>
        </div>
      </header>

      <section className="toolbar" aria-label="Wyszukiwarka filmów">
        <label htmlFor="movie-search">Szukaj filmu</label>
        <input
          id="movie-search"
          type="search"
          value={query}
          placeholder="np. Matrix, Batman, Shrek..."
          onChange={(event) => setQuery(event.target.value)}
        />
        <p>
          Wyszukiwanie uruchamia się po minimum 2 znakach i z opóźnieniem 300
          ms.
        </p>
      </section>

      {moviesQuery.isLoading && (
        <section className="movie-grid" aria-label="Ładowanie filmów">
          {Array.from({ length: 12 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </section>
      )}

      {moviesQuery.isError && (
        <ErrorBanner
          message={moviesQuery.error.message}
          onRetry={() => moviesQuery.refetch()}
        />
      )}

      {moviesQuery.isSuccess && movies.length === 0 && <EmptyState />}

      {moviesQuery.isSuccess && movies.length > 0 && (
        <>
          <MovieGrid
            movies={movies}
            isPlaceholderData={moviesQuery.isPlaceholderData}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            onOpenDetails={setSelectedMovieId}
          />

          <MoviePagination
            page={page}
            totalPages={totalPages}
            isPlaceholderData={moviesQuery.isPlaceholderData}
            onPageChange={setPage}
          />
        </>
      )}

      <MovieModal
        movieId={selectedMovieId}
        onClose={() => setSelectedMovieId(null)}
      />
    </main>
  );
}
