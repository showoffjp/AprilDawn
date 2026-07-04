"use client";

/**
 * Last-resort error boundary — replaces the root layout if it crashes, so it
 * must render its own <html>/<body> and can't rely on the app's stylesheet.
 * Inline styles only.
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff8f1",
          color: "#271c2c",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div>
          <div style={{ fontSize: "3.5rem" }} aria-hidden="true">
            🌄
          </div>
          <h1 style={{ margin: "1rem 0 0", fontSize: "1.75rem" }}>
            Something went wrong
          </h1>
          <p style={{ margin: "0.75rem auto 0", maxWidth: 420, color: "#5b4f5f" }}>
            Your memories are safe. Give it another try, or come back in a
            moment.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "1.5rem",
              border: 0,
              borderRadius: 9999,
              background: "#ec3c72",
              color: "#fff",
              padding: "0.75rem 2rem",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
