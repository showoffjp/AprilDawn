"use client";

import { useMemo, useState } from "react";
import { StoryCard, type StoryCardData } from "@/components/cards/StoryCard";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** Category-filterable grid for the stories index. */
export function StoriesBrowser({ stories }: { stories: StoryCardData[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(stories.map((s) => s.category)))],
    [stories],
  );
  const [active, setActive] = useState("All");
  const shown =
    active === "All" ? stories : stories.filter((s) => s.category === active);

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter stories by category"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={active === cat}
            onClick={() => setActive(cat)}
            className={cn(
              "h-9 rounded-full px-3.5 text-sm font-medium ring-1 transition",
              active === cat
                ? "bg-ink text-cream ring-ink"
                : "bg-white text-ink ring-ink/15 hover:ring-dawn-300",
            )}
          >
            {cat}
            <span
              className={cn(
                "ml-1.5 text-xs",
                active === cat ? "text-cream/70" : "text-ink-soft",
              )}
            >
              {cat === "All"
                ? stories.length
                : stories.filter((s) => s.category === cat).length}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((s, i) => (
          <Reveal key={s.slug} delay={Math.min(i, 5) * 60} className="h-full">
            <StoryCard story={s} />
          </Reveal>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="mt-8 text-center text-sm text-ink-soft">
          Nothing here yet — check back soon.
        </p>
      ) : null}
    </div>
  );
}
