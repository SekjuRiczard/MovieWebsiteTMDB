interface MoviePaginationProps {
  page: number;
  totalPages: number;
  isPlaceholderData: boolean;
  onPageChange: (page: number) => void;
}

export function MoviePagination({
  page,
  totalPages,
  isPlaceholderData,
  onPageChange,
}: MoviePaginationProps) {
  const safeTotalPages = Math.min(totalPages, 500);

  return (
    <nav className="pagination" aria-label="Paginacja filmów">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Poprzednia
      </button>

      <span>
        Strona {page} z {safeTotalPages || 1}
      </span>

      <button
        type="button"
        disabled={isPlaceholderData || page >= safeTotalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Następna
      </button>
    </nav>
  );
}
