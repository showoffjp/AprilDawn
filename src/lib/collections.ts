/**
 * Curated gift collections — shoppable, cross-category guides that group the
 * catalog by who it's for / the occasion / the budget. Distinct from the shop's
 * category filter: these are hand-picked, story-driven edits.
 */
import {
  type Product,
  products,
  getProduct,
} from "@/lib/products";
import type { SceneVariant } from "@/components/art/MemoryScene";

export type Collection = {
  slug: string;
  title: string;
  emoji: string;
  scene: SceneVariant;
  /** One-liner for cards. */
  tagline: string;
  /** Longer lead for the collection page. */
  intro: string;
  /** Explicit hand-curated picks (slugs), in display order. */
  productSlugs?: string[];
  /** Or a dynamic predicate (e.g. by price). */
  filter?: (p: Product) => boolean;
};

export const collections: Collection[] = [
  {
    slug: "for-grandparents",
    title: "For Grandparents",
    emoji: "🧓",
    scene: "sunset",
    tagline: "Heartfelt keepsakes that say “I treasure you.”",
    intro:
      "The gifts that make Grandma cry the good kind of tears — their favorite faces, restored and printed on the things they'll keep forever.",
    productSlugs: [
      "framed",
      "canvas",
      "blanket",
      "metalengraving",
      "ornament",
      "mug",
      "puzzle",
      "pillow",
    ],
  },
  {
    slug: "under-25",
    title: "Gifts Under $25",
    emoji: "💸",
    scene: "birthday",
    tagline: "Big love, little price.",
    intro:
      "Stocking stuffers, desk treats, and just-because surprises — every one of these starts under twenty-five dollars.",
    filter: (p) => p.priceFrom <= 25,
  },
  {
    slug: "for-pet-lovers",
    title: "For Pet Lovers",
    emoji: "🐾",
    scene: "picnic",
    tagline: "Because the dog is family too.",
    intro:
      "Put the goodest boy (or the haughtiest cat) on everything. The photos you have a thousand of finally have somewhere to go.",
    productSlugs: [
      "petbandana",
      "blanket",
      "mug",
      "canvas",
      "pillow",
      "socks",
      "magnet",
      "ornament",
    ],
  },
  {
    slug: "reunion-crowd-pleasers",
    title: "Reunion Crowd-Pleasers",
    emoji: "🎉",
    scene: "beach",
    tagline: "Matching memories for the whole crew.",
    intro:
      "Order in bulk, hand them out at the cookout. Matching shirts, mugs, and keepsakes that turn a family reunion into a legend.",
    productSlugs: [
      "tee",
      "sweatshirt",
      "pajamas",
      "socks",
      "mug",
      "totebag",
      "caketopper",
      "magnet",
    ],
  },
  {
    slug: "memorial-and-tribute",
    title: "Memorial & Tribute",
    emoji: "🕯️",
    scene: "winter",
    tagline: "Gentle, lasting ways to honor someone you love.",
    intro:
      "Quiet, beautiful keepsakes for remembering — restored portraits and heirloom pieces made to be held close and passed down.",
    productSlugs: [
      "candle",
      "metalengraving",
      "woodengraving",
      "framed",
      "canvas",
      "ornament",
      "vinyl",
    ],
  },
  {
    slug: "gag-gifts",
    title: "Gag Gifts That Slap",
    emoji: "😂",
    scene: "garden",
    tagline: "Put their face on it. Watch them lose it.",
    intro:
      "The group-chat-breaking, ugly-laugh gifts. Their face, knit into socks and frosted onto a cake, exactly where it doesn't belong.",
    productSlugs: [
      "socks",
      "caketopper",
      "wrappingpaper",
      "pillow",
      "petbandana",
      "mug",
    ],
  },
];

/** Resolve a collection's products (curated order, or by predicate sorted by price). */
export function collectionProducts(collection: Collection): Product[] {
  if (collection.productSlugs?.length) {
    return collection.productSlugs
      .map((slug) => getProduct(slug))
      .filter((p): p is Product => Boolean(p));
  }
  if (collection.filter) {
    return products
      .filter(collection.filter)
      .sort((a, b) => a.priceFrom - b.priceFrom);
  }
  return [];
}

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
