interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({
  title = "Brak wyników",
  description = "Nie znaleziono filmów pasujących do podanych kryteriów.",
}: EmptyStateProps) {
  return (
    <section className="empty-state">
      <span aria-hidden="true">🎬</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
}
