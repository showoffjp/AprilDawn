/**
 * Event offerings — full-service packages for the greater South Carolina area.
 * Two flagship verticals (weddings + family reunions) share one data shape so
 * they render through a single, consistent page component. Every offering ties
 * back to AprilDawn's core promise: enhance every photo, then print it on
 * literally anything.
 */

import type { MemoryScene } from "@/components/art/MemoryScene";

type SceneVariant = Parameters<typeof MemoryScene>[0]["variant"];

export type PackageTier = {
  slug: string;
  name: string;
  emoji: string;
  scene: SceneVariant;
  tagline: string;
  priceFrom: number;
  coverage: string;
  team: string;
  bestFor: string;
  includes: string[];
  highlight?: boolean;
};

export type EventService = {
  name: string;
  emoji: string;
  blurb: string;
  priceFrom?: number;
};

export type AddOn = {
  name: string;
  emoji: string;
  priceFrom: number;
  blurb: string;
};

export type EventFaq = { q: string; a: string };

export type EventOffering = {
  slug: string;
  label: string;
  emoji: string;
  homeBase: string;
  region: string;
  hero: {
    badge: string;
    title: string;
    intro: string;
    gradient: string;
    scene: SceneVariant;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  packagesHeading: { eyebrow: string; title: string; intro: string };
  labels: { planning: string; photography: string; addOns: string };
  packages: PackageTier[];
  planning: EventService[];
  photography: EventService[];
  addOns: AddOn[];
  enhance: { title: string; intro: string; points: string[] };
  coverageIntro: string;
  coverageAreas: string[];
  inquiry: { title: string; intro: string };
  faqs: EventFaq[];
  crossLink: { label: string; href: string; blurb: string; emoji: string };
};

// ---------------------------------------------------------------- Weddings
const weddings: EventOffering = {
  slug: "weddings",
  label: "Weddings",
  emoji: "💍",
  homeBase: "Aiken, SC",
  region: "the greater South Carolina area",
  hero: {
    badge: "💍 Aiken, SC weddings & planning",
    title: "Carolina weddings, kept forever.",
    intro:
      "Full-service wedding planning and photography, run out of Aiken, SC and serving the greater South Carolina area — from Lowcountry oaks to Blue Ridge overlooks. Then AprilDawn does what no other studio can: hand-enhance every frame and print your story on literally anything.",
    gradient: "from-rose-200 via-dawn-100 to-amber-100",
    scene: "garden",
    ctaPrimary: "Check your date",
    ctaSecondary: "See packages",
  },
  packagesHeading: {
    eyebrow: "Photography & coverage collections",
    title: "Packages for every kind of Carolina wedding",
    intro:
      "From a two-person beach elopement to a three-day estate weekend — every collection is hand-enhanced, print-released, and archived in your AprilDawn vault.",
  },
  labels: {
    planning: "Planning & coordination",
    photography: "Photography & film services",
    addOns: "Albums, keepsakes & add-ons",
  },
  packages: [
    {
      slug: "elopement",
      name: "The Elopement",
      emoji: "🌊",
      scene: "beach",
      tagline: "Just the two of you.",
      priceFrom: 1800,
      coverage: "4 hours",
      team: "1 lead photographer",
      bestFor: "Courthouse, beach & intimate ceremonies (up to ~20 guests)",
      includes: [
        "4 hours of continuous coverage",
        "One lead photographer",
        "Private online gallery + personal print release",
        "~250 hand-enhanced images",
        "Sneak-peek teaser within 48 hours",
        "One heirloom photo restored, on us",
      ],
    },
    {
      slug: "essential",
      name: "The Essential",
      emoji: "🤍",
      scene: "garden",
      tagline: "The day, beautifully covered.",
      priceFrom: 3200,
      coverage: "6 hours",
      team: "Lead photographer + assistant",
      bestFor: "Smaller weddings & weekday celebrations",
      includes: [
        "6 hours of coverage",
        "Lead photographer + assistant",
        "Engagement mini-session",
        "~450 hand-enhanced images",
        "Online gallery + print release",
        "10×10 layflat signature album (20 pages)",
      ],
    },
    {
      slug: "signature",
      name: "The Signature",
      emoji: "✨",
      scene: "sunset",
      tagline: "The classic full-day Carolina wedding.",
      priceFrom: 4900,
      coverage: "8 hours",
      team: "Two photographers",
      bestFor: "Most full-day weddings — our most-booked collection",
      includes: [
        "8 hours of coverage",
        "Two photographers",
        "Full engagement session",
        "~700 hand-enhanced images",
        "Same-week sneak peek · full gallery in 4 weeks",
        "Fine-art layflat album (30 pages)",
        "A Living Wall starter for your new home",
      ],
      highlight: true,
    },
    {
      slug: "heirloom",
      name: "The Heirloom",
      emoji: "🎞️",
      scene: "sunrise",
      tagline: "The works — photo and film.",
      priceFrom: 7500,
      coverage: "10 hours",
      team: "Two photographers + drone",
      bestFor: "Big celebrations that deserve everything",
      includes: [
        "10 hours of coverage",
        "Two photographers + drone aerials",
        "Engagement & bridal sessions",
        "Cinematic highlight film (3–5 min)",
        "~900 hand-enhanced images",
        "Heirloom fine-art album + 2 parent albums",
        "Up to 10 family heirloom photos restored for your display",
      ],
    },
    {
      slug: "luxe",
      name: "The All-Day Luxe Weekend",
      emoji: "🥂",
      scene: "birthday",
      tagline: "Rehearsal to send-off brunch.",
      priceFrom: 12000,
      coverage: "Up to 3 days",
      team: "2–3 photographers + film team",
      bestFor: "Multi-day & destination Carolina weddings",
      includes: [
        "Coverage from rehearsal through the send-off brunch",
        "Two-to-three photographers + full film team",
        "Engagement, bridal & day-after sessions",
        "Feature film + documentary edit",
        "1,200+ hand-enhanced images",
        "Museum-grade album for the couple + both families",
        "A Living Wall + a custom first-dance vinyl record",
        "White-glove planning concierge",
      ],
    },
  ],
  planning: [
    { name: "Full-Service Planning", emoji: "📋", priceFrom: 6500, blurb: "12+ months of partnership — budget, vendors, design, logistics, and a flawless day-of." },
    { name: "Partial Planning", emoji: "🗂️", priceFrom: 3500, blurb: "Already started? We jump in at 4–6 months and pull every thread together." },
    { name: "Month-Of Coordination", emoji: "📆", priceFrom: 1500, blurb: "You plan it; we run it — timeline, vendor wrangling, and day-of direction." },
    { name: "Design & Styling", emoji: "🎨", priceFrom: 2500, blurb: "Palette, florals, rentals, and tablescapes designed around your story." },
    { name: "SC Vendor Curation", emoji: "🤝", blurb: "Our vetted South Carolina network — venues, florals, catering, beauty, and music." },
    { name: "Rehearsal & Logistics", emoji: "🚐", priceFrom: 800, blurb: "Rehearsal direction, room blocks, transportation, and guest-flow planning." },
  ],
  photography: [
    { name: "Engagement Session", emoji: "📸", priceFrom: 450, blurb: "A relaxed shoot at your favorite Carolina spot — save-the-dates included." },
    { name: "Bridal / Boudoir Session", emoji: "👰", priceFrom: 550, blurb: "A dedicated portrait session before the big day." },
    { name: "Second Photographer", emoji: "👥", priceFrom: 750, blurb: "Two angles on every moment — getting-ready to last dance." },
    { name: "Drone Aerials", emoji: "🚁", priceFrom: 400, blurb: "Sweeping shots of the venue, the coast, or the mountains." },
    { name: "Wedding Film / Cinematography", emoji: "🎬", priceFrom: 2200, blurb: "A cinematic highlight film or full feature edit of your day." },
    { name: "Same-Day Teaser Edit", emoji: "⚡", priceFrom: 600, blurb: "A short edit ready to share before the reception ends." },
    { name: "Rehearsal Dinner Coverage", emoji: "🍽️", priceFrom: 700, blurb: "Capture the toasts and the night-before nerves." },
    { name: "Live Event Printing", emoji: "🖨️", priceFrom: 900, blurb: "Guests leave with a printed photo from the party — on the spot." },
  ],
  addOns: [
    { name: "Fine-Art Album", emoji: "📖", priceFrom: 450, blurb: "Layflat, archival, hand-designed." },
    { name: "Parent Albums", emoji: "👪", priceFrom: 250, blurb: "Duplicate keepsakes for both families." },
    { name: "Save-the-Dates & Invitations", emoji: "💌", priceFrom: 300, blurb: "Designed from your engagement photos." },
    { name: "First-Dance Vinyl Record", emoji: "🎵", priceFrom: 120, blurb: "A playable record with your photo label." },
    { name: "Vow Books", emoji: "📓", priceFrom: 60, blurb: "Foil-stamped his/hers/theirs." },
    { name: "Thank-You Cards", emoji: "🙏", priceFrom: 90, blurb: "Matching cards from your gallery." },
    { name: "Guest Scan-to-Gallery", emoji: "📲", priceFrom: 250, blurb: "Every guest photo lands in your gallery." },
    { name: "Living Wall for your home", emoji: "🖼️", priceFrom: 600, blurb: "An LED memory wall you keep adding to." },
  ],
  enhance: {
    title: "Every photo, made heirloom — then printed on anything",
    intro:
      "Your gallery is only the beginning. This is where AprilDawn is unlike any photographer in the state.",
    points: [
      "Hand-enhanced & color-graded: every delivered image is retouched, balanced, and finished by our studio — never a batch filter.",
      "Bring the past to the party: we restore faded family photos and digitize your parents' and grandparents' wedding albums for a then-&-now display.",
      "Print it on literally anything: gallery canvas, layflat albums, thank-you cards, a Living Wall for your first home, even a vinyl of your first-dance song.",
      "Every guest's photos, together: a scan-to-upload code drops every guest snapshot into your private gallery automatically.",
      "Forever-safe: your whole wedding is archived in your AprilDawn vault, so it's never lost to a cracked phone or dead laptop.",
    ],
  },
  coverageIntro:
    "We're based in Aiken, SC, and travel anywhere in the greater South Carolina area is included with every collection. Destination weddings across the Carolinas, Augusta, and Savannah are welcome.",
  coverageAreas: [
    "Aiken & the CSRA — home base",
    "Augusta & the Savannah River",
    "Columbia & the Midlands",
    "Charleston & the Lowcountry",
    "Hilton Head & Bluffton",
    "Myrtle Beach & the Grand Strand",
    "Greenville & the Upstate",
    "Lake Keowee & the foothills",
  ],
  inquiry: {
    title: "Check your date",
    intro:
      "Tell us when and where — we'll send availability, a full pricing guide, and a few Carolina venues we love.",
  },
  faqs: [
    { q: "Do you travel across South Carolina?", a: "Yes — every package includes travel anywhere in the greater South Carolina area: Charleston, Greenville, Columbia, Myrtle Beach, Hilton Head, and everywhere between. Destination weddings across the Carolinas, Savannah, and beyond are welcome (a small travel fee applies beyond 90 miles of Charleston, Columbia, or Greenville)." },
    { q: "How soon do we get our photos?", a: "A sneak-peek teaser lands within 48 hours. Your full hand-enhanced gallery arrives in 3–4 weeks (6–8 in peak season). Albums follow after you make your selections." },
    { q: "Can you enhance or restore our older family photos?", a: "Absolutely — it's our specialty. Send us heirloom photos and we'll restore, color-correct, and reprint them for your display, or digitize entire family albums for a then-&-now moment at the wedding." },
    { q: "Do we own our images?", a: "Yes. Every collection includes a personal print release and your archival-grade files, kept safe in your AprilDawn vault." },
    { q: "What's required to book?", a: "A signed agreement and a 30% retainer reserve your date; the balance is due two weeks before the wedding. Payment plans are available." },
    { q: "Can you print on things besides prints and albums?", a: "That's the whole point of AprilDawn — we'll put your photos on canvas, metal, blankets, mugs, a Living Wall, vinyl records, and 4,000+ other things." },
  ],
  crossLink: {
    label: "Planning a family reunion instead?",
    href: "/family-reunions",
    blurb: "Get the whole family in the frame — and the whole archive preserved.",
    emoji: "🎪",
  },
};

// ---------------------------------------------------------- Family reunions
const reunions: EventOffering = {
  slug: "family-reunions",
  label: "Family Reunions",
  emoji: "🎪",
  homeBase: "Aiken, SC",
  region: "the greater South Carolina area",
  hero: {
    badge: "🎪 Aiken, SC reunions & photography",
    title: "Get the whole family in the frame.",
    intro:
      "Reunion planning and photography, run out of Aiken, SC and serving the greater South Carolina area — parks, beaches, and lake houses. Then AprilDawn preserves the whole legacy: digitize every relative's shoebox, enhance the oldest photos, and print your family on literally anything.",
    gradient: "from-amber-200 via-dawn-100 to-emerald-100",
    scene: "picnic",
    ctaPrimary: "Plan our reunion",
    ctaSecondary: "See packages",
  },
  packagesHeading: {
    eyebrow: "Coverage & experience collections",
    title: "Packages for reunions of every size",
    intro:
      "From a 20-person cookout to a 300-strong family weekend — every collection includes a private shared gallery the whole family can download.",
  },
  labels: {
    planning: "Planning & coordination",
    photography: "Photo experiences & extras",
    addOns: "Matching merch & keepsakes",
  },
  packages: [
    {
      slug: "gathering",
      name: "The Gathering",
      emoji: "🧺",
      scene: "picnic",
      tagline: "An afternoon, captured.",
      priceFrom: 650,
      coverage: "2 hours",
      team: "1 photographer",
      bestFor: "Afternoon cookouts & park get-togethers",
      includes: [
        "2 hours of coverage",
        "One photographer",
        "Big-group portrait + candids",
        "~150 hand-enhanced images",
        "Private shared gallery the whole family can download",
        "$50 print credit",
      ],
    },
    {
      slug: "homecoming",
      name: "The Homecoming",
      emoji: "🏡",
      scene: "garden",
      tagline: "The classic all-day reunion.",
      priceFrom: 1400,
      coverage: "Half day · 4 hours",
      team: "Photographer + assistant",
      bestFor: "The full all-day family reunion",
      includes: [
        "4 hours of coverage",
        "One photographer + assistant",
        "Big group + every family-unit portrait",
        "On-site preview slideshow",
        "~350 hand-enhanced images",
        "Shared gallery + print release",
        "A reunion photo book (one copy)",
      ],
      highlight: true,
    },
    {
      slug: "legacy",
      name: "The Legacy Weekend",
      emoji: "🎉",
      scene: "beach",
      tagline: "A whole weekend together.",
      priceFrom: 2800,
      coverage: "Up to 8 hours / weekend",
      team: "Two photographers",
      bestFor: "Weekend reunions across multiple events",
      includes: [
        "Up to 8 hours across the weekend",
        "Two photographers",
        "Drone group aerial photo",
        "Open-air photo booth with props",
        "~600 hand-enhanced images",
        "Reunion photo book + a print credit for every household",
        "A matching reunion T-shirt design",
      ],
    },
    {
      slug: "dynasty",
      name: "The Dynasty Archive",
      emoji: "🌳",
      scene: "sunset",
      tagline: "Preserve the whole legacy.",
      priceFrom: 4500,
      coverage: "Multi-day",
      team: "Two photographers + videographer",
      bestFor: "Big families ready to preserve everything",
      includes: [
        "Multi-day documentary coverage",
        "Two photographers + videographer",
        "Digitize the family archive (up to 1,000 photos)",
        "A 'Then & Now' Living Wall at the reunion",
        "A reunion highlight film",
        "A photo book for every household",
        "A custom family-reunion merch line",
      ],
    },
  ],
  planning: [
    { name: "Reunion Coordination", emoji: "📋", priceFrom: 1200, blurb: "Headcount, itinerary, RSVPs, and a run-of-show so you actually get to relax." },
    { name: "Venue & Lodging Sourcing", emoji: "🏕️", priceFrom: 600, blurb: "We match your group to the right SC park, beach house, or lake retreat." },
    { name: "Custom Reunion Website & RSVP", emoji: "🌐", priceFrom: 400, blurb: "A shared site for the date, address, schedule, RSVPs, and the photo gallery." },
    { name: "Catering & Activities", emoji: "🍖", priceFrom: 500, blurb: "Caterers, games, bounce houses, and a kids' table that runs itself." },
    { name: "Welcome Kits & Name Tags", emoji: "🏷️", priceFrom: 300, blurb: "Custom name tags, family-tree color coding, and welcome bags." },
    { name: "Group Itinerary & Run-of-Show", emoji: "🗺️", blurb: "A clear schedule for meals, photos, and activities — included with coordination." },
  ],
  photography: [
    { name: "Drone Group Photo", emoji: "🚁", priceFrom: 350, blurb: "The whole family from above — the shot everyone wants." },
    { name: "Open-Air Photo Booth", emoji: "📸", priceFrom: 700, blurb: "Props, instant prints, and a digital gallery." },
    { name: "On-Site Printing", emoji: "🖨️", priceFrom: 600, blurb: "Everyone leaves with a printed group photo in hand." },
    { name: "Group Video Montage", emoji: "🎬", priceFrom: 800, blurb: "A short film of the weekend, set to your family's song." },
    { name: "Heritage 'Then & Now' Wall", emoji: "🖼️", priceFrom: 500, blurb: "Old and new photos side by side for everyone to see." },
    { name: "Extra Hour of Coverage", emoji: "⏱️", priceFrom: 250, blurb: "Add time to any package for the long days." },
  ],
  addOns: [
    { name: "Matching T-Shirts / Hoodies", emoji: "👕", priceFrom: 18, blurb: "Your family on every shirt." },
    { name: "Reunion Photo Book", emoji: "📖", priceFrom: 45, blurb: "A keepsake of the whole weekend." },
    { name: "Custom Reunion Logo", emoji: "🎨", priceFrom: 150, blurb: "A family crest for shirts & signage." },
    { name: "Family-Tree Poster", emoji: "🌳", priceFrom: 40, blurb: "Printed big, with photos at every branch." },
    { name: "Photo Mugs & Tumblers", emoji: "☕", priceFrom: 16, blurb: "For everyone's morning coffee." },
    { name: "Face Socks for the crew", emoji: "🧦", priceFrom: 16, blurb: "The reunion gag that always lands." },
    { name: "Tote Bags & Magnets", emoji: "👜", priceFrom: 12, blurb: "Take-home keepsakes for every household." },
    { name: "Custom Vinyl / Playlist Record", emoji: "🎵", priceFrom: 39, blurb: "The family playlist, on a real record." },
  ],
  enhance: {
    title: "Bring every generation's photos — we'll make them shine and print them on anything",
    intro:
      "A reunion is the one time the whole family archive is in one place. AprilDawn turns that into something permanent.",
    points: [
      "Digitize the family archive: have relatives mail in their shoeboxes ahead of time; we scan, date, and face-tag everything into one searchable album the whole family can access.",
      "Restore the oldest, most precious photos for a heritage display — faded, torn, and water-stained brought back to life.",
      "A 'Then & Now' Living Wall at the reunion that everyone can add to from their phones.",
      "Matching merch printed on anything: hoodies, mugs, tote bags, face socks, and 4,000+ other things — your family on all of it.",
      "A keepsake reunion photo book and prints for every household, with everything archived in a shared family vault.",
    ],
  },
  coverageIntro:
    "We're based in Aiken, SC, and travel anywhere in the greater South Carolina area is included. Lake houses, state parks, and beach rentals are our happy place.",
  coverageAreas: [
    "Aiken & the CSRA — home base",
    "Augusta & the Savannah River",
    "Lake Murray & Columbia",
    "Charleston parks & beaches",
    "Myrtle Beach & the Grand Strand",
    "Lake Hartwell & the Upstate",
    "Greenville & Falls Park",
    "Statewide SC parks & lake houses",
  ],
  inquiry: {
    title: "Plan our reunion",
    intro:
      "Tell us your dates and rough headcount — we'll send package pricing, SC venue ideas, and a plan to preserve your family archive.",
  },
  faqs: [
    { q: "How big a group can you handle?", a: "Any size — from a 20-person cookout to a 300-strong family weekend. Larger groups simply use the Legacy or Dynasty packages with extra coverage and a second photographer." },
    { q: "Do you travel anywhere in South Carolina?", a: "Yes. Travel anywhere in the greater South Carolina area is included; lake houses, state parks, and beach rentals are our happy place." },
    { q: "Can you digitize our old family photos before the reunion?", a: "Yes — it's one of the best things you can do. Have relatives mail their shoeboxes in advance and we'll have the whole archive scanned and ready to show as a slideshow or Living Wall." },
    { q: "Can everyone get matching shirts?", a: "Absolutely. We design and print custom reunion apparel and keepsakes — shirts, hoodies, mugs, totes, and 4,000+ other things — with your family photos or a custom reunion logo." },
    { q: "How do we share the photos with the whole family?", a: "Every package includes a private shared gallery with a print release, so every household can view, download, and order prints." },
    { q: "What does it take to book?", a: "A date, an approximate headcount, and a 25% deposit. We'll help with the rest, including venue and lodging if you need it." },
  ],
  crossLink: {
    label: "Planning a wedding instead?",
    href: "/weddings",
    blurb: "Full-service Carolina wedding planning and photography.",
    emoji: "💍",
  },
};

export const eventOfferings = { weddings, reunions } as const;

export function getEventOffering(slug: "weddings" | "family-reunions"): EventOffering {
  return slug === "weddings" ? weddings : reunions;
}
