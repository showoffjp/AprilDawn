/** Small, high-margin add-ons offered as cart cross-sells to lift order value. */

export type AddOn = {
  slug: string;
  name: string;
  emoji: string;
  price: number;
  blurb: string;
};

export const CART_ADDONS: AddOn[] = [
  {
    slug: "addon-digital-backup",
    name: "Digital backup bundle",
    emoji: "☁️",
    price: 12,
    blurb: "Every photo cloud-archived in full resolution, forever.",
  },
  {
    slug: "addon-gift-wrap",
    name: "Premium gift wrap",
    emoji: "🎁",
    price: 6,
    blurb: "Hand-wrapped with a kraft bow and a handwritten note.",
  },
  {
    slug: "addon-prints-4x6",
    name: "25 matte prints (4×6)",
    emoji: "🖼️",
    price: 9,
    blurb: "Classic keepsake prints of your uploaded photo.",
  },
  {
    slug: "addon-rush-proof",
    name: "Rush proofing",
    emoji: "⚡",
    price: 15,
    blurb: "Skip the line — proofs back to you within 24 hours.",
  },
];

/** Add-on lines are virtual, so they have no /shop/[slug] page to link to. */
export function isAddon(slug: string): boolean {
  return slug.startsWith("addon-");
}
