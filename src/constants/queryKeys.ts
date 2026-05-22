export const QUERY_KEYS = {
  movies: {
    popular: (page: number) => ["movies", "popular", page] as const,
    search: (query: string, page: number) =>
      ["movies", "search", query, page] as const,
    detail: (id: number) => ["movies", "detail", id] as const,
  },
} as const;
