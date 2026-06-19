/**
 * Partner ecosystem (illustrative). AprilDawn stitches together best-in-class
 * partners for printing, payments, shipping, gifting, and integrations.
 * Some are real services we plan to integrate; others are representative of the
 * categories of partners a launch would onboard. Shown for demonstration.
 */

export type PartnerGroup = {
  title: string;
  emoji: string;
  blurb: string;
  partners: { name: string; emoji: string; note: string }[];
};

export const partnerGroups: PartnerGroup[] = [
  {
    title: "Printing & production",
    emoji: "🖨️",
    blurb: "From t-shirts to gallery canvas — color-managed, on demand.",
    partners: [
      { name: "Printful", emoji: "👕", note: "Primary print-on-demand" },
      { name: "Printify", emoji: "🧢", note: "Fallback & cost options" },
      { name: "Gooten", emoji: "🖼️", note: "Long-tail products" },
    ],
  },
  {
    title: "Specialty makers",
    emoji: "🛠️",
    blurb: "The things nobody else will print on.",
    partners: [
      { name: "Etchwell Engraving", emoji: "🔩", note: "Laser metal & wood" },
      { name: "HideCraft Leather", emoji: "🪪", note: "Stamped leather goods" },
      { name: "CakeInk", emoji: "🎂", note: "Food-safe edible prints" },
      { name: "Vinylify", emoji: "🎵", note: "Custom playable records" },
    ],
  },
  {
    title: "Gifting & delivery",
    emoji: "🎁",
    blurb: "Auto-schedule gifts to arrive right on time.",
    partners: [
      { name: "BoxFox", emoji: "📦", note: "Curated gift boxes" },
      { name: "Knack", emoji: "🎀", note: "Build-a-gift kits" },
      { name: "USPS · UPS · FedEx", emoji: "🚚", note: "Tracked shipping" },
    ],
  },
  {
    title: "Payments & trust",
    emoji: "💳",
    blurb: "Secure checkout and subscriptions.",
    partners: [
      { name: "Stripe", emoji: "💳", note: "Payments & billing" },
      { name: "Amazon Associates", emoji: "🛒", note: "Affiliate catalog" },
    ],
  },
  {
    title: "Memories in & out",
    emoji: "🔗",
    blurb: "Bring birthdays in; send reminders out.",
    partners: [
      { name: "Google", emoji: "📧", note: "Contacts & Calendar" },
      { name: "Outlook", emoji: "📨", note: "Microsoft 365 calendar" },
      { name: "Apple", emoji: "🍎", note: "Saved contact birthdays" },
      { name: "Facebook", emoji: "👍", note: "Friends' birthdays" },
    ],
  },
  {
    title: "Cloud & intelligence",
    emoji: "🤖",
    blurb: "Restoration, captions, and a lifetime vault.",
    partners: [
      { name: "Anthropic (Claude)", emoji: "🧠", note: "AI assist & captions" },
      { name: "Cloudflare R2", emoji: "🗄️", note: "Encrypted media vault" },
      { name: "Resend · Twilio", emoji: "📨", note: "Email & SMS" },
    ],
  },
];

/** Flat list for the scrolling marquee. */
export const marqueePartners = partnerGroups.flatMap((g) =>
  g.partners.map((p) => ({ name: p.name, emoji: p.emoji })),
);
