export type ClassValue = string | number | false | null | undefined;

/** Tiny classnames helper (no external deps). */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Format a number as USD. */
export function usd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

/** Build a "from $X" price label. */
export function fromPrice(amount: number): string {
  return `from ${usd(amount)}`;
}
