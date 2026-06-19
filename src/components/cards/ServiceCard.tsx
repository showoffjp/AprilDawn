import Link from "next/link";
import { type Service, serviceHref } from "@/lib/services";
import { fromPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={serviceHref(service)}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-ink/10 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-dawn-500/10"
    >
      <div
        className={cn(
          "relative flex h-36 items-center justify-center bg-gradient-to-br text-5xl",
          service.gradient,
        )}
      >
        <span aria-hidden="true" className="drop-shadow-sm">
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
  );
}
