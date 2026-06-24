/**
 * Gift Bundles — fixed, curated sets of first-party products you can drop into
 * the cart in one tap. Collections help you browse; bundles help you buy the
 * whole set at once. (Bundles use in-house products only, so "Add all to cart"
 * always works — no affiliate/Amazon items.)
 */
import { type Product, getProduct } from "@/lib/products";
import type { SceneVariant } from "@/components/art/MemoryScene";

export type Bundle = {
  slug: string;
  title: string;
  emoji: string;
  scene: SceneVariant;
  tagline: string;
  intro: string;
  /** In-house product slugs included in the set. */
  itemSlugs: string[];
};

export const bundles: Bundle[] = [
  {
    slug: "grandparent-box",
    title: "The Grandparent Box",
    emoji: "🧓",
    scene: "sunset",
    tagline: "Everything to make Grandma cry the good kind of tears.",
    intro:
      "A framed portrait for the mantel, a blanket for the recliner, the morning mug, and a dated ornament — the whole sentimental set, ready in one tap.",
    itemSlugs: ["framed", "blanket", "mug", "ornament"],
  },
  {
    slug: "reunion-starter-pack",
    title: "Reunion Starter Pack",
    emoji: "🎉",
    scene: "beach",
    tagline: "Hand them out at the cookout.",
    intro:
      "The crowd-pleasers that turn a family reunion into a legend — a tee, a mug, a tote, and fridge magnets, all from the same favorite photo.",
    itemSlugs: ["tee", "mug", "totebag", "magnet"],
  },
  {
    slug: "memorial-keepsake-set",
    title: "Memorial Keepsake Set",
    emoji: "🕯️",
    scene: "winter",
    tagline: "Gentle, lasting ways to keep them close.",
    intro:
      "Heirloom pieces for remembering — a portrait engraved in metal, etched in wood, framed for the wall, and a keepsake ornament to hang each year.",
    itemSlugs: ["metalengraving", "woodengraving", "framed", "ornament"],
  },
  {
    slug: "gallery-wall-trio",
    title: "Gallery Wall Trio",
    emoji: "🖼️",
    scene: "sunrise",
    tagline: "Three prints. One stunning wall.",
    intro:
      "An instant gallery wall — a hand-stretched canvas, a framed archival print, and a matte poster, balanced to hang together beautifully.",
    itemSlugs: ["canvas", "framed", "poster"],
  },
];

export function bundleProducts(bundle: Bundle): Product[] {
  return bundle.itemSlugs
    .map((slug) => getProduct(slug))
    .filter((p): p is Product => Boolean(p));
}

/** "From" price for the set: the sum of each item's starting price. */
export function bundlePrice(bundle: Bundle): number {
  return bundleProducts(bundle).reduce((sum, p) => sum + p.priceFrom, 0);
}

export function getBundle(slug: string): Bundle | undefined {
  return bundles.find((b) => b.slug === slug);
}
