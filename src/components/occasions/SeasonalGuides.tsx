"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { MemoryScene, type SceneVariant } from "@/components/art/MemoryScene";
import { occasionsByProximity } from "@/lib/occasionDates";

export type SeasonalGuideData = {
  slug: string;
  title: string;
  emoji: string;
  scene: SceneVariant;
  tagline: string;
  /** Product count, computed server-side so no catalog ships to the client. */
  count: number;
};

// Cache the client-side order so the snapshot reference stays stable across
// renders (useSyncExternalStore compares by identity).
let clientOrder: string[] | null = null;
function getClientOrder(): string[] {
  if (clientOrder === null) clientOrder = occasionsByProximity(new Date());
  return clientOrder;
}
const noopSubscribe = () => () => {};

/**
 * The three most seasonally relevant gift guides. The page is statically
 * prerendered, so the server renders the build-time order; after hydration the
 * ranking is recomputed from the visitor's clock (via useSyncExternalStore, so
 * there's no hydration mismatch). The page can sit deployed across a season
 * change without going stale.
 */
export function SeasonalGuides({ guides }: { guides: SeasonalGuideData[] }) {
  const clientSlugs = useSyncExternalStore(
    noopSubscribe,
    getClientOrder,
    () => null,
  );

  const ranked = clientSlugs
    ? clientSlugs
        .map((slug) => guides.find((g) => g.slug === slug))
        .filter((g): g is SeasonalGuideData => Boolean(g))
    : guides;

  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {ranked.slice(0, 3).map((guide) => (
        <Link
          key={guide.slug}
          href={`/gift-guides/${guide.slug}`}
          className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-ink/10 transition hover:-translate-y-1 hover:shadow-soft-lg"
        >
          <div className="relative h-40 overflow-hidden">
            <MemoryScene
              variant={guide.scene}
              uid={`seasonal-${guide.slug}`}
              className="transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/5 to-transparent" />
            <span
              aria-hidden="true"
              className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-2xl shadow-sm ring-1 ring-ink/10 backdrop-blur"
            >
              {guide.emoji}
            </span>
            <span className="absolute bottom-3 right-4 rounded-full bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              {guide.count} ideas
            </span>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="font-display text-xl font-semibold tracking-tight">
              {guide.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
              {guide.tagline}
            </p>
            <span className="mt-4 text-sm font-semibold text-dawn-600 transition group-hover:translate-x-0.5">
              Shop the guide →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
