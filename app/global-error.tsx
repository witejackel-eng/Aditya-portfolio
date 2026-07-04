"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Logs the full, unminified error (message + component stack + digest)
    // to the browser console — "Minified React error #423" alone doesn't
    // say which component mismatched; this does.
    console.error("[global-error]", error, "digest:", error.digest);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          background: "#000000",
          color: "#f5f5f5",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "0.75rem", letterSpacing: "0.2em", color: "#8a8a8a", textTransform: "uppercase" }}>
          Something went wrong
        </p>
        <button
          onClick={() => reset()}
          style={{
            background: "#f5f5f5",
            color: "#000000",
            border: "none",
            borderRadius: "2px",
            padding: "0.75rem 1.5rem",
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
