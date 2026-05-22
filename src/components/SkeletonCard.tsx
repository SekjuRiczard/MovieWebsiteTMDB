export function SkeletonCard() {
  return (
    <article className="skeleton-card" aria-hidden="true">
      <div className="skeleton skeleton-poster" />
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-text" />
    </article>
  );
}
