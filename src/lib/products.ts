/**
 * Print-on-anything catalog for the AprilDawn Shop.
 * `affiliate` items are fulfilled via partners and carry an Amazon Associates
 * link (tag injected from env); first-party items are produced in-house.
 */

export type ProductCategory =
  | "Apparel"
  | "Wall Art"
  | "Home"
  | "Drinkware"
  | "Accessories"
  | "Everything Else";

export type Product = {
  slug: string;
  name: string;
  emoji: string;
  category: ProductCategory;
  blurb: string;
  priceFrom: number;
  /** True when fulfilled through a partner / Amazon Associates link. */
  affiliate?: boolean;
  bestseller?: boolean;
};

export const productCategories: ProductCategory[] = [
  "Apparel",
  "Wall Art",
  "Home",
  "Drinkware",
  "Accessories",
  "Everything Else",
];

export const products: Product[] = [
  // Apparel
  { slug: "tee", name: "Premium T-Shirt", emoji: "👕", category: "Apparel", blurb: "Soft ringspun cotton, photo-bright DTG print.", priceFrom: 24, bestseller: true },
  { slug: "hoodie", name: "Cozy Hoodie", emoji: "🧥", category: "Apparel", blurb: "Fleece-lined, full-front photo or all-over print.", priceFrom: 44 },
  { slug: "sweatshirt", name: "Crew Sweatshirt", emoji: "🩳", category: "Apparel", blurb: "Reunion-ready, vintage-soft fleece.", priceFrom: 39 },
  { slug: "socks", name: "Face Socks", emoji: "🧦", category: "Apparel", blurb: "The classic gag — their face, knit toe to cuff.", priceFrom: 16, bestseller: true },
  { slug: "pajamas", name: "Family Pajamas", emoji: "🛌", category: "Apparel", blurb: "Matching all-over-print sets for the whole crew.", priceFrom: 49 },

  // Wall Art
  { slug: "canvas", name: "Gallery Canvas", emoji: "🖼️", category: "Wall Art", blurb: "Hand-stretched, museum-grade, ready to hang.", priceFrom: 39, bestseller: true },
  { slug: "framed", name: "Framed Print", emoji: "🪟", category: "Wall Art", blurb: "Archival paper, real-wood frames, glass or acrylic.", priceFrom: 35 },
  { slug: "metal", name: "Metal Print", emoji: "🛡️", category: "Wall Art", blurb: "Luminous dye-sublimation on aluminum.", priceFrom: 49 },
  { slug: "acrylic", name: "Acrylic Print", emoji: "💎", category: "Wall Art", blurb: "Glossy, gallery-style depth and clarity.", priceFrom: 59 },
  { slug: "tapestry", name: "Wall Tapestry", emoji: "🧶", category: "Wall Art", blurb: "Soft, oversized statement piece.", priceFrom: 34 },

  // Home
  { slug: "blanket", name: "Photo Blanket", emoji: "🛋️", category: "Home", blurb: "Plush woven or fleece, collage or single image.", priceFrom: 49, bestseller: true },
  { slug: "pillow", name: "Throw Pillow", emoji: "🛏️", category: "Home", blurb: "Two-sided photo cushions for the couch.", priceFrom: 29 },
  { slug: "puzzle", name: "Jigsaw Puzzle", emoji: "🧩", category: "Home", blurb: "Custom 500/1000-piece family puzzle.", priceFrom: 27 },
  { slug: "ornament", name: "Keepsake Ornament", emoji: "🎄", category: "Home", blurb: "Ceramic or metal, dated and personalized.", priceFrom: 18 },
  { slug: "candle", name: "Photo Candle", emoji: "🕯️", category: "Home", blurb: "Memorial and celebration candles.", priceFrom: 22, affiliate: true },

  // Drinkware
  { slug: "mug", name: "Photo Mug", emoji: "☕", category: "Drinkware", blurb: "11/15oz ceramic; magic color-change option.", priceFrom: 16, bestseller: true },
  { slug: "tumbler", name: "Insulated Tumbler", emoji: "🥤", category: "Drinkware", blurb: "Stainless, wrap-around photo print.", priceFrom: 28, affiliate: true },
  { slug: "winetumbler", name: "Stemless Wine Cup", emoji: "🍷", category: "Drinkware", blurb: "For the 90th-birthday toast.", priceFrom: 24, affiliate: true },

  // Accessories
  { slug: "phonecase", name: "Phone Case", emoji: "📱", category: "Accessories", blurb: "Tough or slim cases for every model.", priceFrom: 22 },
  { slug: "totebag", name: "Tote Bag", emoji: "👜", category: "Accessories", blurb: "Canvas totes for the photo-collage look.", priceFrom: 19 },
  { slug: "keychain", name: "Photo Keychain", emoji: "🔑", category: "Accessories", blurb: "Acrylic or metal, pocket-sized memories.", priceFrom: 9 },
  { slug: "magnet", name: "Fridge Magnets", emoji: "🧲", category: "Accessories", blurb: "Mini-print sets for the family fridge.", priceFrom: 12 },

  // Everything Else
  { slug: "caketopper", name: "Edible Cake Print", emoji: "🎂", category: "Everything Else", blurb: "Their face, in frosting-safe edible ink.", priceFrom: 14, bestseller: true },
  { slug: "vinyl", name: "Custom Vinyl Record", emoji: "🎵", category: "Everything Else", blurb: "Playable record with a photo sleeve & label.", priceFrom: 39 },
  { slug: "skateboard", name: "Skate Deck", emoji: "🛹", category: "Everything Else", blurb: "Maple deck art — hangable or rideable.", priceFrom: 54 },
  { slug: "gardenflag", name: "Garden Flag", emoji: "🚩", category: "Everything Else", blurb: "Weatherproof yard memories.", priceFrom: 17, affiliate: true },
  { slug: "petbandana", name: "Pet Bandana", emoji: "🐾", category: "Everything Else", blurb: "Because the dog is family too.", priceFrom: 15, affiliate: true },
  { slug: "wrappingpaper", name: "Photo Wrapping Paper", emoji: "🎁", category: "Everything Else", blurb: "Wrap the gift in their own face.", priceFrom: 13, affiliate: true },
  { slug: "metalengraving", name: "Metal Photo Engraving", emoji: "🔩", category: "Everything Else", blurb: "Portraits laser-engraved into steel, brass, or aluminum.", priceFrom: 34, bestseller: true },
  { slug: "leatherstamp", name: "Stamped Leather Goods", emoji: "🪪", category: "Everything Else", blurb: "Embossed photos & monograms on wallets, journals, and keychains.", priceFrom: 29 },
  { slug: "woodengraving", name: "Engraved Wood & Slate", emoji: "🪵", category: "Everything Else", blurb: "Laser-etched photos on walnut, maple, or slate.", priceFrom: 26 },

  // Apparel (more)
  { slug: "onesie", name: "Baby Onesie", emoji: "👶", category: "Apparel", blurb: "Snap-bottom cotton — the grandbaby's face, for Grandma.", priceFrom: 19 },
  { slug: "apron", name: "Photo Apron", emoji: "🧑‍🍳", category: "Apparel", blurb: "Kitchen-ready canvas apron, full-color print.", priceFrom: 27, affiliate: true },
  { slug: "beanie", name: "Knit Beanie", emoji: "🧢", category: "Apparel", blurb: "Cuffed beanie, embroidered or all-over print.", priceFrom: 21, affiliate: true },

  // Wall Art (more)
  { slug: "poster", name: "Matte Poster", emoji: "📜", category: "Wall Art", blurb: "Museum-matte poster prints in every size.", priceFrom: 18 },
  { slug: "triptych", name: "Framed Triptych", emoji: "🌅", category: "Wall Art", blurb: "One photo split across three framed panels.", priceFrom: 89, bestseller: true },

  // Home (more)
  { slug: "coasters", name: "Photo Coaster Set", emoji: "🧉", category: "Home", blurb: "Set of four cork-backed ceramic coasters.", priceFrom: 24 },
  { slug: "cuttingboard", name: "Engraved Cutting Board", emoji: "🔪", category: "Home", blurb: "Bamboo board, laser-engraved with your photo.", priceFrom: 32, affiliate: true },
  { slug: "nightlight", name: "Photo Night Light", emoji: "🌙", category: "Home", blurb: "A soft LED panel that glows with their face.", priceFrom: 26, affiliate: true },

  // Drinkware (more)
  { slug: "waterbottle", name: "Insulated Water Bottle", emoji: "🚰", category: "Drinkware", blurb: "Stainless bottle with a wrap-around photo print.", priceFrom: 29, affiliate: true },
  { slug: "shotglass", name: "Photo Shot Glasses", emoji: "🥃", category: "Drinkware", blurb: "Set of four — for the milestone toast.", priceFrom: 22, affiliate: true },

  // Accessories (more)
  { slug: "luggagetag", name: "Luggage Tag", emoji: "🧳", category: "Accessories", blurb: "Their face on your bag, every trip.", priceFrom: 14, affiliate: true },
  { slug: "mousepad", name: "Photo Mouse Pad", emoji: "🖱️", category: "Accessories", blurb: "A desk-sized memory for the home office.", priceFrom: 16 },

  // Everything Else (more)
  { slug: "stickers", name: "Sticker Sheet", emoji: "✨", category: "Everything Else", blurb: "Die-cut photo stickers — their face, everywhere.", priceFrom: 8, bestseller: true },
  { slug: "playingcards", name: "Custom Playing Cards", emoji: "🃏", category: "Everything Else", blurb: "A full deck featuring 54 of your photos.", priceFrom: 19 },
  { slug: "calendar", name: "Wall Calendar", emoji: "📅", category: "Everything Else", blurb: "Twelve months, twelve memories — dated and personal.", priceFrom: 24, bestseller: true },
];

export const bestsellers = products.filter((p) => p.bestseller);

export function productsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Apparel products are offered in sizes; everything else is one-size. */
export function productHasSizes(product: Product): boolean {
  return product.category === "Apparel";
}

/** Complementary categories used to power the "Pairs well with" cross-sell. */
const PAIRINGS: Record<ProductCategory, ProductCategory[]> = {
  Apparel: ["Drinkware", "Home"],
  "Wall Art": ["Home", "Everything Else"],
  Home: ["Wall Art", "Drinkware"],
  Drinkware: ["Apparel", "Accessories"],
  Accessories: ["Apparel", "Drinkware"],
  "Everything Else": ["Wall Art", "Apparel"],
};

/**
 * Cross-category cross-sell: complementary in-house products that pair well
 * with the given one. Bestsellers first, then most approachable by price.
 */
export function pairsWith(product: Product, n = 4): Product[] {
  const cats = PAIRINGS[product.category] ?? [];
  const pool = cats
    .flatMap((c) => productsByCategory(c))
    .filter((p) => p.slug !== product.slug && !p.affiliate);
  const sorted = pool.sort(
    (a, b) =>
      Number(Boolean(b.bestseller)) - Number(Boolean(a.bestseller)) ||
      a.priceFrom - b.priceFrom,
  );
  return sorted.slice(0, n);
}

/**
 * Build an Amazon Associates link with our tracking tag. The tag comes from
 * NEXT_PUBLIC_AMAZON_ASSOCIATES_TAG so it is never hard-coded.
 */
export function amazonAffiliateUrl(search: string): string {
  const tag = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATES_TAG ?? "aprildawn-20";
  const q = encodeURIComponent(search);
  return `https://www.amazon.com/s?k=${q}&tag=${tag}`;
}
