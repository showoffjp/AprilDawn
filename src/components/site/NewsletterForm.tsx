"use client";

import { useState } from "react";
import { Honeypot } from "@/components/ui/Field";
import { postJson } from "@/lib/postJson";

export function NewsletterForm() {
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const result = await postJson("/api/subscribe", data);
    setBusy(false);
    if (result.ok) {
      setDone(true);
    } else {
      setError(result.error);
    }
  }

  if (done) {
    return (
      <p role="status" className="text-sm text-ink-soft">
        💛 You&apos;re on the list. We&apos;ll send the good stuff — memory tips,
        new ways to print, and the occasional surprise.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm">
      <div className="flex gap-2">
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@email.com"
          aria-label="Email address"
          aria-invalid={error ? true : undefined}
          className="h-11 flex-1 rounded-full border border-ink/15 bg-white px-4 text-sm focus:border-dawn-400 focus:outline-none"
        />
        <Honeypot />
        <button
          type="submit"
          disabled={busy}
          className="h-11 shrink-0 rounded-full bg-dawn-500 px-5 text-sm font-medium text-white transition hover:scale-[1.02] hover:bg-dawn-600 active:scale-95 disabled:opacity-60"
        >
          {busy ? "…" : "Subscribe"}
        </button>
      </div>
      {error ? (
        <p role="alert" className="mt-2 text-sm text-dawn-600">
          {error}
        </p>
      ) : null}
    </form>
  );
}
