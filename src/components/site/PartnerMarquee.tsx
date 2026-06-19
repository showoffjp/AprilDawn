import { marqueePartners } from "@/lib/partners";

/** Infinite horizontal scroller of partner chips (pure CSS animation). */
export function PartnerMarquee() {
  const items = [...marqueePartners, ...marqueePartners];
  return (
    <div className="group relative overflow-hidden py-2">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cream to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-cream to-transparent" />
      <div className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused]">
        {items.map((p, i) => (
          <span
            key={`${p.name}-${i}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink ring-1 ring-ink/10"
          >
            <span aria-hidden="true">{p.emoji}</span>
            {p.name}
          </span>
        ))}
      </div>
    </div>
  );
}
