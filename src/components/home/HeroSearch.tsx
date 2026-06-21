"use client";

/**
 * Canva-style search-forward entry point: a big friendly rounded "search" pill
 * in the hero that opens the command palette (same one ⌘K opens). Invites
 * exploration without making the visitor choose a nav item first.
 */
export function HeroSearch() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-command"))}
      className="group mx-auto mt-7 flex w-full max-w-xl items-center gap-3 rounded-full bg-white/90 px-5 py-4 text-left shadow-soft ring-1 ring-ink/10 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-soft-lg lg:mx-0"
    >
      <span className="text-lg" aria-hidden="true">
        🔍
      </span>
      <span className="flex-1 truncate text-sm text-ink-soft">
        Search 4,000+ things to make — or “restore a photo”…
      </span>
      <span className="hidden shrink-0 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-cream sm:inline">
        ⌘K
      </span>
    </button>
  );
}
