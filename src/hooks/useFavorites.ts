import { useCallback, useEffect, useState } from "react";

import type { Movie } from "../types/movie";

const STORAGE_KEY = "movie-browser-favorites";

function loadFavorites(): Movie[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as Movie[];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Movie[]>(loadFavorites);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = useCallback(
    (id: number) => favorites.some((movie) => movie.id === id),
    [favorites],
  );

  const toggleFavorite = useCallback((movie: Movie) => {
    setFavorites((currentFavorites) =>
      currentFavorites.some((favorite) => favorite.id === movie.id)
        ? currentFavorites.filter((favorite) => favorite.id !== movie.id)
        : [...currentFavorites, movie],
    );
  }, []);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
  };
}
