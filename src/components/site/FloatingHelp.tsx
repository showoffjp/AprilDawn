"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

export function FloatingHelp() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 print:hidden">
      {open ? (
        <div className="mb-3 w-72 rounded-2xl bg-white p-5 shadow-soft-lg ring-1 ring-ink/10">
          <p className="font-display text-lg font-semibold">Need a hand?</p>
          <p className="mt-1 text-sm text-ink-soft">
            We&apos;re 100% remote and happy to help you plan any project.
          </p>
          <div className="mt-4 grid gap-2">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="rounded-xl bg-dawn-500 px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-dawn-600"
            >
              📅 Book a free consultation
            </Link>
            <Link
              href="/gift-finder"
              onClick={() => setOpen(false)}
              className="rounded-xl bg-cream-deep px-4 py-2.5 text-center text-sm font-medium text-ink transition hover:bg-cream"
            >
              🎁 Find the perfect gift
            </Link>
            <Link
              href="/faq"
              onClick={() => setOpen(false)}
              className="rounded-xl bg-cream-deep px-4 py-2.5 text-center text-sm font-medium text-ink transition hover:bg-cream"
            >
              ❓ Browse the FAQ
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="rounded-xl px-4 py-2 text-center text-sm text-ink-soft transition hover:text-ink"
            >
              ✉️ {site.email}
            </a>
          </div>
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-ink text-2xl text-cream shadow-soft-lg transition hover:scale-105"
        aria-label={open ? "Close help" : "Open help"}
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
}
