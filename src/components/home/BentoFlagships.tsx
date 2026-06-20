import Link from "next/link";
import { getService, serviceHref } from "@/lib/services";
import { MemoryScene } from "@/components/art/MemoryScene";

const tiles = [
  { slug: "living-wall", variant: "sunset", cls: "lg:col-span-2 lg:row-span-2 min-h-[15rem] lg:min-h-0" },
  { slug: "masterpieces", variant: "garden", cls: "lg:col-span-2 min-h-[13rem]" },
  { slug: "memory-mail", variant: "birthday", cls: "min-h-[13rem]" },
  { slug: "occasions", variant: "beach", cls: "min-h-[13rem]" },
] as const;

export function BentoFlagships() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
      {tiles.map((t) => {
        const s = getService(t.slug)!;
        return (
          <Link
            key={t.slug}
            href={serviceHref(s)}
            className={`group relative overflow-hidden rounded-3xl shadow-soft ring-1 ring-ink/10 ${t.cls}`}
          >
            <MemoryScene
              variant={t.variant}
              uid={`bento-${t.slug}`}
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <div className="text-2xl" aria-hidden="true">
                {s.emoji}
              </div>
              <h3 className="mt-1 font-display text-xl font-semibold">{s.name}</h3>
              <p className="mt-1 max-w-md text-sm text-white/80">{s.tagline}</p>
              <span className="mt-2 inline-block text-sm font-semibold text-dawn-200 transition group-hover:translate-x-0.5">
                Explore →
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
