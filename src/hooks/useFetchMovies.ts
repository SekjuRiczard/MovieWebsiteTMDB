import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { tmdbClient } from "../api/tmdbClient";
import { QUERY_KEYS } from "../constants/queryKeys";
import type { MoviesResponse } from "../types/movie";

export function useFetchMovies(page: number, query: string) {
  const trimmedQuery = query.trim();
  const isSearch = trimmedQuery.length >= 2;

  return useQuery({
    queryKey: isSearch
      ? QUERY_KEYS.movies.search(trimmedQuery, page)
      : QUERY_KEYS.movies.popular(page),
    queryFn: async () => {
      const endpoint = isSearch ? "/search/movie" : "/movie/popular";

      const { data } = await tmdbClient.get<MoviesResponse>(endpoint, {
        params: isSearch
          ? {
              query: trimmedQuery,
              page,
            }
          : {
              page,
            },
      });

      return data;
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 3,
  });
}
