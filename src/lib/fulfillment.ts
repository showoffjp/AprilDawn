/**
 * Fulfillment routing for AprilDawn.
 *
 * DECISION: Printful is our primary print-on-demand partner.
 *   - Best print quality and broadest first-party catalog (apparel, canvas,
 *     metal, framed prints, mugs, blankets, etc.).
 *   - Clean Order API with live product mockups + webhooks for status.
 *   - Global fulfillment centers and white-label branding (stays "AprilDawn").
 * Printify is the cost-optimizing fallback (wider provider network).
 * Amazon Associates handles affiliate accessory SKUs.
 * Bespoke items (Living Wall, hand-painted originals, edible cake prints) are
 * produced in-house or via our specialty maker network.
 */

import type { Product } from "./products";

export type FulfillmentProvider =
  | "aprildawn" // in-house lab / specialty makers
  | "printful" // primary POD
  | "printify" // fallback POD
  | "amazon"; // affiliate accessories

export const PRIMARY_POD_PROVIDER: FulfillmentProvider = "printful";
export const FALLBACK_POD_PROVIDER: FulfillmentProvider = "printify";

/** Products we make ourselves rather than via a POD partner. */
const IN_HOUSE_SLUGS = new Set<string>([
  "caketopper", // edible — food-safe specialty partner
  "vinyl", // playable custom record
  "skateboard", // maple deck
  "metalengraving", // laser engraving — specialty maker
  "leatherstamp", // leather embossing/stamping — specialty maker
  "woodengraving", // laser etching on wood/slate
]);

/** Decide which partner fulfills a given product. */
export function providerForProduct(product: Product): FulfillmentProvider {
  if (product.affiliate) return "amazon";
  if (IN_HOUSE_SLUGS.has(product.slug)) return "aprildawn";
  return PRIMARY_POD_PROVIDER;
}

export const fulfillmentProviders: {
  key: FulfillmentProvider;
  name: string;
  role: string;
}[] = [
  { key: "printful", name: "Printful", role: "Primary print-on-demand" },
  { key: "printify", name: "Printify", role: "Fallback / cost optimization" },
  { key: "aprildawn", name: "AprilDawn Lab", role: "In-house & specialty makers" },
  { key: "amazon", name: "Amazon Associates", role: "Affiliate accessories" },
];
