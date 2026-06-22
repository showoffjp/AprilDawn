import Link from "next/link";
import { aggregate, reviews } from "@/lib/reviews";
import { cn } from "@/lib/utils";

/** Five stars with a proportional fill for the given rating (0–5). */
export function RatingStars({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  return (
    <span
      className={cn("relative inline-block leading-none", className)}
      aria-hidden="true"
    >
      <span className="text-ink/15">★★★★★</span>
      <span
        className="absolute inset-0 overflow-hidden whitespace-nowrap text-amber-400"
        style={{ width: `${pct}%` }}
      >
        ★★★★★
      </span>
    </span>
  );
}

/** Compact stars + aggregate, linking to the reviews page. */
export function RatingInline({ className }: { className?: string }) {
  return (
    <Link
      href="/reviews"
      className={cn(
        "inline-flex items-center gap-2 text-sm transition hover:opacity-80",
        className,
      )}
      aria-label={`Rated ${aggregate.rating} out of 5 from ${aggregate.count.toLocaleString()} reviews`}
    >
      <RatingStars rating={aggregate.rating} />
      <span className="font-semibold text-ink">{aggregate.rating.toFixed(1)}</span>
      <span className="text-ink-soft">
        · {aggregate.count.toLocaleString()} reviews
      </span>
    </Link>
  );
}

/** A small trust card: aggregate rating + one strong featured testimonial. */
export function SocialProofCard({ className }: { className?: string }) {
  const featured = reviews.find((r) => r.rating === 5) ?? reviews[0];
  return (
    <figure className={cn("rounded-2xl bg-white p-5 ring-1 ring-ink/10", className)}>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <RatingStars rating={aggregate.rating} />
        <span className="text-sm font-semibold text-ink">
          {aggregate.rating.toFixed(1)}
        </span>
        <span className="text-sm text-ink-soft">
          from {aggregate.count.toLocaleString()} memories made
        </span>
      </div>
      <blockquote className="mt-3 text-sm leading-relaxed text-ink-soft">
        &ldquo;{featured.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-2 text-xs font-medium text-ink">
        — {featured.name}, {featured.location}
      </figcaption>
    </figure>
  );
}
