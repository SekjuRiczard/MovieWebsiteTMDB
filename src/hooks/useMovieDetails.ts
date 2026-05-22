import { useQuery } from "@tanstack/react-query";

import { tmdbClient } from "../api/tmdbClient";
import { QUERY_KEYS } from "../constants/queryKeys";
import type { MovieDetails } from "../types/movie";

export function useMovieDetails(id: number | null) {
  return useQuery({
    queryKey: QUERY_KEYS.movies.detail(id ?? 0),
    queryFn: async () => {
      const { data } = await tmdbClient.get<MovieDetails>(`/movie/${id}`);

      return data;
    },
    enabled: id !== null,
  });
}
