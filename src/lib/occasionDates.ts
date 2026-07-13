/**
 * Seasonal ranking for the occasion gift guides — pure date math, safe to run
 * on either side of the wire.
 *
 * Rule: dated occasions coming up within LEAD_DAYS (long enough to order and
 * ship) lead, nearest first; evergreen guides fill the remaining slots; dated
 * occasions that are out of season trail. An occasion stays "current" through
 * GRACE_DAYS after the day itself (belated gifts are still gifts).
 */

const DAY = 86_400_000;
const LEAD_DAYS = 70;
const GRACE_DAYS = 3;

/** This year's occurrence, or next year's once GRACE_DAYS past. */
function fixedDate(from: Date, month: number, day: number): Date {
  const candidate = new Date(from.getFullYear(), month, day);
  return candidate.getTime() < from.getTime() - GRACE_DAYS * DAY
    ? new Date(from.getFullYear() + 1, month, day)
    : candidate;
}

/** The nth given weekday of a month (weekday 0 = Sunday, n is 1-based). */
function nthWeekday(year: number, month: number, weekday: number, n: number): Date {
  const firstDay = new Date(year, month, 1).getDay();
  return new Date(year, month, 1 + ((weekday - firstDay + 7) % 7) + (n - 1) * 7);
}

function nthWeekdayDate(from: Date, month: number, weekday: number, n: number): Date {
  const candidate = nthWeekday(from.getFullYear(), month, weekday, n);
  return candidate.getTime() < from.getTime() - GRACE_DAYS * DAY
    ? nthWeekday(from.getFullYear() + 1, month, weekday, n)
    : candidate;
}

const DATED: { slug: string; next: (from: Date) => Date }[] = [
  { slug: "valentines-day", next: (d) => fixedDate(d, 1, 14) },
  { slug: "mothers-day", next: (d) => nthWeekdayDate(d, 4, 0, 2) },
  { slug: "graduation", next: (d) => fixedDate(d, 4, 20) },
  { slug: "fathers-day", next: (d) => nthWeekdayDate(d, 5, 0, 3) },
  { slug: "christmas", next: (d) => fixedDate(d, 11, 25) },
];

/** Season-less guides, in display preference order. */
const EVERGREEN = ["wedding", "new-baby", "anniversary", "memorial"];

/** Human labels for the dated occasions (for the homepage nudge). */
const LABELS: Record<string, string> = {
  "valentines-day": "Valentine's Day",
  "mothers-day": "Mother's Day",
  graduation: "graduation season",
  "fathers-day": "Father's Day",
  christmas: "the holidays",
};

export type UpcomingOccasion = { slug: string; label: string; days: number };

/**
 * The nearest dated occasion that's within the ordering window, with days-until
 * and a display label — or null if nothing dated is currently in season.
 */
export function upcomingOccasion(from: Date = new Date()): UpcomingOccasion | null {
  const nearest = DATED.map((o) => ({
    slug: o.slug,
    days: Math.max(0, Math.ceil((o.next(from).getTime() - from.getTime()) / DAY)),
  }))
    .filter((o) => o.days <= LEAD_DAYS)
    .sort((a, b) => a.days - b.days)[0];
  if (!nearest) return null;
  return { slug: nearest.slug, label: LABELS[nearest.slug] ?? nearest.slug, days: nearest.days };
}

/** All guide slugs, most seasonally relevant first. */
export function occasionsByProximity(from: Date = new Date()): string[] {
  const dated = DATED.map((o) => ({
    slug: o.slug,
    days: Math.max(0, Math.ceil((o.next(from).getTime() - from.getTime()) / DAY)),
  })).sort((a, b) => a.days - b.days);

  const inSeason = dated.filter((o) => o.days <= LEAD_DAYS).map((o) => o.slug);
  const outOfSeason = dated.filter((o) => o.days > LEAD_DAYS).map((o) => o.slug);
  return [...inSeason, ...EVERGREEN, ...outOfSeason];
}
