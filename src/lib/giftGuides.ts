/**
 * Occasion gift guides — shoppable, SEO-friendly landing pages for the moments
 * people actually search ("Mother's Day gifts", "memorial gift ideas"). Each
 * guide pulls together real products plus the most relevant collection and
 * bundle. Distinct from /occasions, which is about auto-gifting reminders.
 */
import { type Product, getProduct } from "@/lib/products";
import { getCollection } from "@/lib/collections";
import { getBundle } from "@/lib/bundles";
import type { SceneVariant } from "@/components/art/MemoryScene";

export type GiftGuide = {
  slug: string;
  title: string;
  emoji: string;
  scene: SceneVariant;
  /** Short tagline for cards. */
  tagline: string;
  /** SEO + on-page lead paragraph. */
  lead: string;
  productSlugs: string[];
  collectionSlug?: string;
  bundleSlug?: string;
};

export const giftGuides: GiftGuide[] = [
  {
    slug: "mothers-day",
    title: "Mother's Day Gifts",
    emoji: "💐",
    scene: "garden",
    tagline: "For the woman who kept every photo.",
    lead: "The best Mother's Day gifts are the ones that say 'I was paying attention.' Turn the photos she treasures into things she'll use and display every day — restored, beautiful, and ready before the second Sunday in May.",
    productSlugs: ["framed", "blanket", "calendar", "mug", "pillow", "canvas", "totebag", "ornament"],
    collectionSlug: "for-grandparents",
    bundleSlug: "grandparent-box",
  },
  {
    slug: "fathers-day",
    title: "Father's Day Gifts",
    emoji: "🎣",
    scene: "sunset",
    tagline: "Beyond another tie.",
    lead: "Dads are hard to shop for — until you put the people he loves on the things he actually keeps. Engraved metal, etched wood, and stamped leather make Father's Day gifts that live on his desk and last for decades.",
    productSlugs: ["metalengraving", "woodengraving", "leatherstamp", "skateboard", "mug", "framed", "playingcards", "calendar"],
    bundleSlug: "gallery-wall-trio",
  },
  {
    slug: "christmas",
    title: "Christmas & Holiday Gifts",
    emoji: "🎄",
    scene: "winter",
    tagline: "Under the tree, on the tree, all of it.",
    lead: "From the dated keepsake ornament to matching family pajamas and stocking-stuffer photo magnets, AprilDawn turns this year's favorite photos into the holiday gifts everyone actually keeps. Order early — proofs and shipping fill up fast in December.",
    productSlugs: ["ornament", "blanket", "pajamas", "stickers", "calendar", "framed", "mug", "puzzle"],
    collectionSlug: "under-25",
    bundleSlug: "grandparent-box",
  },
  {
    slug: "anniversary",
    title: "Anniversary Gifts",
    emoji: "💞",
    scene: "sunset",
    tagline: "Then and now, side by side.",
    lead: "Restore the photo from the day it all started and reprint it on something worthy of the years since — a gallery canvas, a playable record of 'your song,' an engraving that outlasts the milestone itself.",
    productSlugs: ["canvas", "acrylic", "vinyl", "framed", "metalengraving", "leatherstamp"],
    bundleSlug: "gallery-wall-trio",
  },
  {
    slug: "new-baby",
    title: "New Baby Gifts",
    emoji: "👶",
    scene: "sunrise",
    tagline: "Welcome the newest face on the wall.",
    lead: "From the grandbaby's face on a onesie to a nursery print and a first-Christmas ornament, these are the new-baby gifts that grandparents and new parents hold onto long after the tiny clothes are outgrown.",
    productSlugs: ["onesie", "blanket", "framed", "ornament", "pillow", "calendar"],
    collectionSlug: "for-grandparents",
  },
  {
    slug: "memorial",
    title: "Memorial & Sympathy Gifts",
    emoji: "🕯️",
    scene: "winter",
    tagline: "Gentle, lasting ways to honor someone.",
    lead: "When words are hard, a beautifully restored portrait says it. These sympathy and memorial gifts — engraved, framed, and kept close — help families remember someone they love, and are made to be passed down.",
    productSlugs: ["metalengraving", "woodengraving", "framed", "ornament", "vinyl", "canvas"],
    collectionSlug: "memorial-and-tribute",
    bundleSlug: "memorial-keepsake-set",
  },
];

export function guideProducts(guide: GiftGuide): Product[] {
  return guide.productSlugs
    .map((slug) => getProduct(slug))
    .filter((p): p is Product => Boolean(p));
}

export function getGiftGuide(slug: string): GiftGuide | undefined {
  return giftGuides.find((g) => g.slug === slug);
}

export function guideCollection(guide: GiftGuide) {
  return guide.collectionSlug ? getCollection(guide.collectionSlug) : undefined;
}

export function guideBundle(guide: GiftGuide) {
  return guide.bundleSlug ? getBundle(guide.bundleSlug) : undefined;
}
