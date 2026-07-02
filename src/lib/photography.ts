/**
 * AprilDawn Photography — our Aiken, SC portrait & event photography studio.
 * Weddings and family reunions have their own dedicated verticals; this covers
 * everyday sessions (families, seniors, couples, branding, events) and the
 * things only AprilDawn does: hand-enhance every frame and print it on anything.
 */
import type { SceneVariant } from "@/components/art/MemoryScene";

export type PhotoSession = {
  slug: string;
  name: string;
  emoji: string;
  scene: SceneVariant;
  priceFrom: number;
  blurb: string;
  includes: string[];
};

export const photoSessions: PhotoSession[] = [
  {
    slug: "family",
    name: "Family & Portraits",
    emoji: "👨‍👩‍👧",
    scene: "garden",
    priceFrom: 275,
    blurb: "Golden-hour sessions in Hitchcock Woods, Hopelands Gardens, or your own backyard.",
    includes: ["45–60 min session", "1 location", "35+ hand-edited images", "Print & Living Wall credit"],
  },
  {
    slug: "newborn-maternity",
    name: "Newborn & Maternity",
    emoji: "🤱",
    scene: "sunrise",
    priceFrom: 325,
    blurb: "Studio-soft newborn sessions and glowing maternity portraits, gently posed.",
    includes: ["In-studio or at-home", "Props & wraps provided", "Retouched gallery", "Grandparent print sets"],
  },
  {
    slug: "seniors",
    name: "Senior Portraits",
    emoji: "🎓",
    scene: "sunset",
    priceFrom: 250,
    blurb: "Class-of sessions around downtown Aiken, the Woods, and your campus of choice.",
    includes: ["Multiple outfits", "2 locations", "40+ edited images", "Grad announcement cards"],
  },
  {
    slug: "couples",
    name: "Couples & Engagement",
    emoji: "💞",
    scene: "sunset",
    priceFrom: 295,
    blurb: "Engagements, anniversaries, and just-because sessions — styled and unhurried.",
    includes: ["60 min session", "Outfit & location guidance", "40+ edited images", "Save-the-date ready"],
  },
  {
    slug: "branding",
    name: "Branding & Headshots",
    emoji: "💼",
    scene: "winter",
    priceFrom: 225,
    blurb: "Polished headshots and personal-brand sessions for Aiken professionals and teams.",
    includes: ["Studio or on-site", "Team rates available", "Retouched selects", "Web & print crops"],
  },
  {
    slug: "events",
    name: "Events & Parties",
    emoji: "🎉",
    scene: "beach",
    priceFrom: 400,
    blurb: "Birthdays, showers, and corporate gatherings — candid coverage that actually pops.",
    includes: ["Hourly coverage", "Fast sneak-peek gallery", "Full edited set", "On-site print add-ons"],
  },
];

export type PhotoPackage = {
  name: string;
  price: string;
  duration: string;
  blurb: string;
  features: string[];
  featured?: boolean;
};

export const photoPackages: PhotoPackage[] = [
  {
    name: "Mini",
    price: "$175",
    duration: "20 minutes",
    blurb: "Quick and sweet — perfect for holiday cards and updates.",
    features: ["One location", "One outfit", "10 hand-edited images", "Print store access"],
  },
  {
    name: "Signature",
    price: "$325",
    duration: "60 minutes",
    blurb: "Our most-booked session, with room to relax and play.",
    features: ["One or two locations", "Multiple outfits", "40 hand-edited images", "$50 print credit", "Sneak peeks in 48 hrs"],
    featured: true,
  },
  {
    name: "Extended",
    price: "$525",
    duration: "2 hours",
    blurb: "The full story — multiple looks, locations, and the whole crew.",
    features: ["Multiple locations", "Unlimited outfits", "80 hand-edited images", "Living Wall design consult", "Heirloom print box"],
  },
];

/** Favorite Aiken-area shooting locations (portrait photography). */
export const photoLocations = [
  "Hitchcock Woods",
  "Hopelands Gardens",
  "Downtown Aiken",
  "Aiken State Park",
  "The Willcox",
  "Your home or venue",
];

/** Towns & neighborhoods we regularly serve (CSRA + Lakelands) — local SEO. */
export const serviceAreas = [
  "Aiken",
  "North Augusta",
  "Augusta, GA",
  "Graniteville",
  "Warrenville",
  "Beech Island",
  "New Ellenton",
  "Wagener",
  "Barnwell",
  "Edgefield",
  "Batesburg-Leesville",
  "Lexington",
  "Columbia",
];

export type PhotoFaq = { q: string; a: string };

export const photoFaqs: PhotoFaq[] = [
  {
    q: "Where are you based, and do you travel?",
    a: "We're based in Aiken, SC. Travel across the greater CSRA — Augusta, North Augusta, and the Lakelands — is included with every session. Destination sessions elsewhere in the Carolinas and Georgia are welcome for a small travel fee.",
  },
  {
    q: "How soon will I see my photos?",
    a: "You'll get a sneak-peek gallery within 48 hours of most sessions, and your full hand-edited gallery within about two weeks. Weddings and large events run a little longer.",
  },
  {
    q: "What should we wear?",
    a: "Once you book, we send a simple style guide with palettes and outfit ideas for your location and season. Coordinate rather than match, and bring a second look if your package allows it.",
  },
  {
    q: "Do I get printing rights?",
    a: "Yes — every gallery includes a personal print release. But most families let us print for them, because we hand-finish each image and can put it on anything from canvas to a Living Wall.",
  },
  {
    q: "What do you actually do differently?",
    a: "Every delivered image is individually retouched and color-graded by our studio — never a batch filter. And we're the only Aiken studio that will also digitize and restore your older family photos in the same visit.",
  },
  {
    q: "How do we book, and is there a deposit?",
    a: "Send an inquiry below with your date and session type. We'll reply within one business day with availability and pricing. A 25% retainer holds your date; the balance is due the day of the session, after you've seen a proof.",
  },
];
