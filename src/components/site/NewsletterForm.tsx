"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      // ignore — demo
    }
    setDone(true);
    setBusy(false);
  }

  if (done) {
    return (
      <p className="text-sm text-ink-soft">
        💛 You&apos;re on the list. We&apos;ll send the good stuff — memory tips,
        new ways to print, and the occasional surprise.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-sm gap-2">
      <input
        type="email"
        name="email"
        required
        placeholder="you@email.com"
        aria-label="Email address"
        className="h-11 flex-1 rounded-full border border-ink/15 bg-white px-4 text-sm focus:border-dawn-400 focus:outline-none"
      />
      <button
        type="submit"
        disabled={busy}
        className="h-11 shrink-0 rounded-full bg-dawn-500 px-5 text-sm font-medium text-white transition hover:bg-dawn-600 hover:scale-[1.02] active:scale-95 disabled:opacity-60"
      >
        {busy ? "…" : "Subscribe"}
      </button>
    </form>
  );
}
