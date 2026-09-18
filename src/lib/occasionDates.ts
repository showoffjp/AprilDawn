/**
 * Seasonal ranking for the occasion gift guides — pure date math, safe to run
 * on either side of the wire.
 *
 * Rule: dated occasions coming up within their lead window (long enough to
 * order, proof, produce and ship) lead, nearest first; evergreen guides fill
 * the remaining slots; dated occasions that are out of season trail. An
 * occasion stays "current" through GRACE_DAYS after the day itself (belated
 * gifts are still gifts).
 *
 * Lead windows are per-occasion because shopping runways differ: people buy
 * holiday photo gifts from early autumn (and December capacity fills up),
 * while nobody shops for Valentine's in November.
 */

const DAY = 86_400_000;
const DEFAULT_LEAD_DAYS = 70;
const GRACE_DAYS = 3;

/**
 * Calendar-day arithmetic via UTC day numbers: immune to DST transitions
 * (a fall-back 25-hour day would otherwise make wall-clock ms division count
 * one day too many) and gives whole-day "days until" semantics.
 */
function dayNumber(d: Date): number {
  return Math.round(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / DAY);
}

function daysBetween(from: Date, to: Date): number {
  return dayNumber(to) - dayNumber(from);
}

/** This year's occurrence, or next year's once GRACE_DAYS fully past. */
function fixedDate(from: Date, month: number, day: number): Date {
  const candidate = new Date(from.getFullYear(), month, day);
  return daysBetween(from, candidate) < -GRACE_DAYS
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
  return daysBetween(from, candidate) < -GRACE_DAYS
    ? nthWeekday(from.getFullYear() + 1, month, weekday, n)
    : candidate;
}

const DATED: { slug: string; next: (from: Date) => Date; lead?: number }[] = [
  { slug: "valentines-day", next: (d) => fixedDate(d, 1, 14) },
  // Mother's Day and graduation overlap in May; both get a little extra runway
  // so they surface before the May rush rather than during it.
  { slug: "mothers-day", next: (d) => nthWeekdayDate(d, 4, 0, 2), lead: 80 },
  { slug: "graduation", next: (d) => fixedDate(d, 4, 20), lead: 80 },
  { slug: "fathers-day", next: (d) => nthWeekdayDate(d, 5, 0, 3) },
  // Fourth Thursday of November. A shorter runway than Christmas on purpose:
  // hosting gifts and gathering plans are an October decision, and surfacing
  // it earlier would take the nudge away from the holiday that needs the lead.
  { slug: "thanksgiving", next: (d) => nthWeekdayDate(d, 10, 4, 4), lead: 50 },
  // Holiday gifting runs from early autumn — and December proofing, production
  // and shipping fill up, so this is the one people must start earliest.
  { slug: "christmas", next: (d) => fixedDate(d, 11, 25), lead: 110 },
];

function leadFor(o: { lead?: number }): number {
  return o.lead ?? DEFAULT_LEAD_DAYS;
}

/** Season-less guides, in display preference order. */
const EVERGREEN = ["wedding", "new-baby", "anniversary", "memorial"];

/** Human labels for the dated occasions (for the homepage nudge). */
const LABELS: Record<string, string> = {
  "valentines-day": "Valentine's Day",
  "mothers-day": "Mother's Day",
  graduation: "graduation season",
  "fathers-day": "Father's Day",
  thanksgiving: "Thanksgiving",
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
    days: Math.max(0, daysBetween(from, o.next(from))),
    lead: leadFor(o),
  }))
    .filter((o) => o.days <= o.lead)
    .sort((a, b) => a.days - b.days)[0];
  if (!nearest) return null;
  return { slug: nearest.slug, label: LABELS[nearest.slug] ?? nearest.slug, days: nearest.days };
}

/** All guide slugs, most seasonally relevant first. */
export function occasionsByProximity(from: Date = new Date()): string[] {
  const dated = DATED.map((o) => ({
    slug: o.slug,
    days: Math.max(0, daysBetween(from, o.next(from))),
    lead: leadFor(o),
  })).sort((a, b) => a.days - b.days);

  const inSeason = dated.filter((o) => o.days <= o.lead).map((o) => o.slug);
  const outOfSeason = dated.filter((o) => o.days > o.lead).map((o) => o.slug);
  return [...inSeason, ...EVERGREEN, ...outOfSeason];
}
