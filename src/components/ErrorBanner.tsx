interface ErrorBannerProps {
  message?: string;
  onRetry: () => void;
}

export function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
  return (
    <section className="error-banner" role="alert">
      <div>
        <h2>Nie udało się pobrać danych</h2>
        <p>{message ?? "Sprawdź połączenie z internetem albo klucz API."}</p>
      </div>

      <button type="button" onClick={onRetry}>
        Spróbuj ponownie
      </button>
    </section>
  );
}
