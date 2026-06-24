import Link from "next/link";
import { MemoryScene } from "@/components/art/MemoryScene";
import { Tilt } from "@/components/effects/Tilt";
import { eventOfferings } from "@/lib/events";

/** Homepage teaser surfacing the Aiken-based SC event verticals. */
export function EventsTeaser() {
  const offerings = [eventOfferings.weddings, eventOfferings.reunions];
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {offerings.map((o) => (
        <Tilt
          key={o.slug}
          containerClassName="h-full"
          className="h-full shadow-soft ring-1 ring-ink/10"
          max={7}
        >
          <Link
            href={`/${o.slug}`}
            className="group relative block min-h-[18rem] h-full"
          >
            <MemoryScene
              variant={o.hero.scene}
              uid={`teaser-${o.slug}`}
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-white">
              <div className="text-3xl" aria-hidden="true">
                {o.emoji}
              </div>
              <h3 className="mt-2 font-display text-2xl font-semibold">
                {o.label}
              </h3>
              <p className="mt-1 max-w-sm text-sm text-white/85">
                {o.hero.title}
              </p>
              <span className="mt-3 inline-block text-sm font-semibold text-dawn-200 transition group-hover:translate-x-0.5">
                Explore {o.label.toLowerCase()} →
              </span>
            </div>
          </Link>
        </Tilt>
      ))}
    </div>
  );
}
