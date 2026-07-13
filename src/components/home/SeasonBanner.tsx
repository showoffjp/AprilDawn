"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { upcomingOccasion, type UpcomingOccasion } from "@/lib/occasionDates";

// Cache the client-side result so the snapshot reference stays stable.
let cached: UpcomingOccasion | null | undefined = undefined;
function getClient(): UpcomingOccasion | null {
  if (cached === undefined) cached = upcomingOccasion(new Date());
  return cached;
}
const noopSubscribe = () => () => {};

/**
 * A slim "what's in season" nudge. Renders nothing on the server (and when no
 * dated occasion is in the ordering window); after hydration it computes from
 * the visitor's clock via useSyncExternalStore, so the statically-prerendered
 * homepage shows the right occasion without going stale or mismatching.
 */
export function SeasonBanner() {
  const occ = useSyncExternalStore(noopSubscribe, getClient, () => null);
  if (!occ) return null;

  const when =
    occ.days === 0
      ? `${occ.label} is here`
      : occ.days === 1
        ? `Tomorrow: ${occ.label}`
        : `${occ.days} days until ${occ.label}`;

  return (
    <div className="border-b border-ink/10 bg-dawn-50">
      <Container className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-3 text-center text-sm">
        <span className="font-medium text-ink">
          <span aria-hidden="true">🎁</span> {when} — order early so it ships in
          time.
        </span>
        <Link
          href={`/gift-guides/${occ.slug}`}
          className="font-semibold text-dawn-600 hover:underline"
        >
          Shop the guide →
        </Link>
      </Container>
    </div>
  );
}
