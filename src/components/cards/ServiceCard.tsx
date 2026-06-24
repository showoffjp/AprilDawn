import Link from "next/link";
import { type Service, serviceHref } from "@/lib/services";
import { fromPrice } from "@/lib/utils";
import { Tilt } from "@/components/effects/Tilt";
import { MemoryScene, sceneVariants } from "@/components/art/MemoryScene";

/** Deterministic scene per service so each card has a stable, distinct visual. */
function sceneFor(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return sceneVariants[h % sceneVariants.length];
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Tilt
      containerClassName="h-full"
      className="h-full shadow-soft ring-1 ring-ink/10 transition-shadow duration-300 hover:shadow-soft-lg"
      radiusClass="rounded-3xl"
      max={5}
      glare={false}
    >
      <Link
        href={serviceHref(service)}
        className="group flex h-full flex-col bg-white"
      >
        <div className="relative h-36 overflow-hidden">
          <MemoryScene
            variant={sceneFor(service.slug)}
            uid={service.slug}
            className="transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
          <span
            aria-hidden="true"
            className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 text-2xl shadow-sm ring-1 ring-ink/10 backdrop-blur"
          >
            {service.emoji}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-xl font-semibold tracking-tight">
            {service.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-dawn-600">
            {service.tagline}
          </p>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
            {service.summary}
          </p>
          <div className="mt-5 flex items-center justify-between">
            {typeof service.startingPrice === "number" ? (
              <span className="text-sm font-semibold text-ink">
                {service.startingPrice === 0
                  ? "Free to start"
                  : fromPrice(service.startingPrice)}
              </span>
            ) : (
              <span />
            )}
            <span className="text-sm font-semibold text-dawn-600 transition group-hover:translate-x-0.5">
              Explore →
            </span>
          </div>
        </div>
      </Link>
    </Tilt>
  );
}
