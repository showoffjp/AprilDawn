"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/**
 * Branded error boundary — catches runtime errors below the root layout so
 * visitors see a warm recovery screen instead of Next's unstyled default.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaces in monitoring; console.error survives production stripping.
    console.error("[app] uncaught error", error);
  }, [error]);

  return (
    <section className="bg-sunrise bg-grain relative overflow-hidden">
      <Container className="relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <div className="text-6xl" aria-hidden="true">
          🌄
        </div>
        <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight">
          Well, that clouded over.
        </h1>
        <p className="mt-3 max-w-md text-ink-soft">
          Something went wrong on our end — your memories are safe. Try again,
          or head back to the sunrise.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={reset}>Try again</Button>
          <Button href="/" variant="ghost">
            Back home
          </Button>
        </div>
        {error.digest ? (
          <p className="mt-6 text-xs text-ink-soft">
            Reference code: <span className="font-mono">{error.digest}</span>
          </p>
        ) : null}
      </Container>
    </section>
  );
}
