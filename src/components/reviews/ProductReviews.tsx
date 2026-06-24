import Link from "next/link";
import { reviews, aggregate } from "@/lib/reviews";
import { RatingStars } from "@/components/social/SocialProof";

/**
 * Customer reviews block for a product page. Picks a stable rotating slice of
 * brand reviews (seeded by the product slug) so each product shows a different,
 * consistent set, alongside the brand aggregate.
 */
export function ProductReviews({ seed }: { seed: string }) {
  const start = (seed.charCodeAt(0) || 0) % reviews.length;
  const picks = [0, 1, 2].map((i) => reviews[(start + i) % reviews.length]);

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-semibold">
          What customers say
        </h2>
        <Link
          href="/reviews"
          className="text-sm font-semibold text-dawn-600 hover:underline"
        >
          All reviews →
        </Link>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
        <RatingStars rating={aggregate.rating} />
        <span className="font-semibold text-ink">
          {aggregate.rating.toFixed(1)}
        </span>
        <span className="text-ink-soft">
          · {aggregate.count.toLocaleString()} reviews
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {picks.map((r) => (
          <figure
            key={`${r.name}-${r.quote.slice(0, 12)}`}
            className="flex flex-col rounded-3xl bg-white p-6 ring-1 ring-ink/10"
          >
            <RatingStars rating={r.rating} />
            <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
              &ldquo;{r.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-sm">
              <span className="font-semibold text-ink">{r.name}</span>
              <span className="text-ink-soft"> · {r.location}</span>
              <span className="mt-0.5 block text-xs text-dawn-600">
                {r.service}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
