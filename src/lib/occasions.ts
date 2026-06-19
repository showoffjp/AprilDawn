/**
 * Occasions: reminder types, connectable integrations, and curated gift bundles
 * (including the legendary "Troll Grandma" gag bundle).
 */

export type Occasion = {
  slug: string;
  name: string;
  emoji: string;
  blurb: string;
  recommendedLead: string; // how far ahead we nudge you
};

export const occasions: Occasion[] = [
  { slug: "birthday", name: "Birthdays", emoji: "🎂", blurb: "Milestones and every year in between.", recommendedLead: "2 weeks" },
  { slug: "anniversary", name: "Anniversaries", emoji: "💍", blurb: "Weddings, first dates, and 'we made it' days.", recommendedLead: "3 weeks" },
  { slug: "memorial", name: "Remembrance", emoji: "🕊️", blurb: "Gentle nudges to honor and remember.", recommendedLead: "1 week" },
  { slug: "holiday", name: "Holidays", emoji: "🎄", blurb: "Seasonal sends for the whole family list.", recommendedLead: "4 weeks" },
  { slug: "newbaby", name: "New Baby", emoji: "👶", blurb: "Welcome the newest face on the wall.", recommendedLead: "ASAP" },
  { slug: "graduation", name: "Graduations", emoji: "🎓", blurb: "Then-and-now keepsakes that land.", recommendedLead: "3 weeks" },
];

export type Integration = {
  key: string;
  name: string;
  emoji: string;
  what: string;
  scope: string;
};

export const integrations: Integration[] = [
  { key: "google", name: "Google", emoji: "📧", what: "Import birthdays from Contacts & Calendar; receive reminders in Gmail.", scope: "Read contacts & calendar (you stay in control)" },
  { key: "outlook", name: "Outlook / Microsoft 365", emoji: "📨", what: "Sync calendar birthdays and anniversaries.", scope: "Read calendar events" },
  { key: "apple", name: "Apple Contacts", emoji: "🍎", what: "Pull birthdays you've saved on your iPhone.", scope: "Read contact birthdays" },
  { key: "facebook", name: "Facebook", emoji: "👍", what: "Surface friends' birthdays and let you gift in a tap.", scope: "Read your friends' birthdays" },
  { key: "csv", name: "Spreadsheet / CSV", emoji: "📑", what: "Bulk-import a family list with dates and addresses.", scope: "Upload only — nothing leaves your account" },
];

export type GiftBundle = {
  slug: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  includes: string[];
  priceFrom: number;
  hero?: boolean;
};

export const giftBundles: GiftBundle[] = [
  {
    slug: "troll-grandma",
    name: "The Troll Grandma Bundle",
    emoji: "👵",
    tagline: "Her face. On everything. At the party.",
    description:
      "For the 90th she'll never forget: take one glorious (or gloriously goofy) photo of Grandma and put it on everything the family will wear and use at the celebration. 1000% love, 100% chaos.",
    includes: [
      "10 face-printed t-shirts for the grandkids",
      "A hoodie 'for the ringleader'",
      "An edible cake topper of her face",
      "A playable custom vinyl record with her photo",
      "Face socks, mugs, and a throw pillow",
      "A giant 'happy 90th' Living-Wall-style collage",
    ],
    priceFrom: 249,
    hero: true,
  },
  {
    slug: "then-and-now",
    name: "Then & Now Anniversary Set",
    emoji: "💞",
    tagline: "Their first photo, beautifully restored.",
    description:
      "We restore and remaster a couple's earliest photo, then pair it with a fresh portrait in a matching frame set — plus a Memory Mail card in their own voices.",
    includes: ["Restored vintage portrait", "Matching framed 'now' print", "Audio Memory Mail card"],
    priceFrom: 129,
  },
  {
    slug: "first-year",
    name: "Baby's First Year Book",
    emoji: "🍼",
    tagline: "Twelve months, one talking photobook.",
    description:
      "A lay-flat photobook of the first year with embedded video clips and the parents' narration — the keepsake grandparents cry over.",
    includes: ["Lay-flat photobook", "Embedded video pages", "Two extra copies for grandparents"],
    priceFrom: 89,
  },
];

export const heroBundle = giftBundles.find((b) => b.hero) ?? giftBundles[0];
