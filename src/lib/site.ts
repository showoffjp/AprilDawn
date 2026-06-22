/**
 * Global brand + site configuration for AprilDawn.
 * AprilDawn — the everything store for memories.
 */

export const site = {
  name: "AprilDawn",
  tagline: "The everything store for memories.",
  longTagline:
    "Why lose your reveries forever when you can keep them — beautifully, permanently — for the rest of your life?",
  description:
    "AprilDawn digitizes, restores, and reimagines your photos, film, and video — then prints them on literally anything, from t-shirts to gallery walls. Plus living LED memory walls, audio/video greeting cards, and automatic occasion gifting.",
  url: "https://aprildawn.com",
  email: "hello@aprildawn.com",
  supportEmail: "care@aprildawn.com",
  phone: "1-800-REVERIE",
  mailingAddress: "AprilDawn Memory Lab · PO Box 0419 · Send us your shoebox of photos!",
  social: {
    instagram: "https://instagram.com/aprildawn",
    facebook: "https://facebook.com/aprildawn",
    tiktok: "https://tiktok.com/@aprildawn",
    pinterest: "https://pinterest.com/aprildawn",
    youtube: "https://youtube.com/@aprildawn",
  },
} as const;

/** Physical home base for AprilDawn Events (weddings & family reunions). */
export const studio = {
  name: "AprilDawn Events",
  street: "148 Laurens St SW",
  city: "Aiken",
  state: "SC",
  zip: "29801",
  region: "Aiken & the CSRA · greater South Carolina",
  phone: "(803) 555-0419",
  phoneHref: "tel:+18035550419",
  email: "events@aprildawn.com",
  geo: { lat: 33.5604, lng: -81.7196 },
  hours: [
    { days: "Mon–Fri", time: "9am – 6pm" },
    { days: "Saturday", time: "By appointment" },
    { days: "Sunday", time: "Closed" },
  ],
} as const;

export function studioMapsUrl(): string {
  const q = `${studio.name}, ${studio.street}, ${studio.city}, ${studio.state} ${studio.zip}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Weddings", href: "/weddings" },
  { label: "Reunions", href: "/family-reunions" },
  { label: "The Living Wall", href: "/living-wall" },
  { label: "Occasions", href: "/occasions" },
  { label: "Pricing", href: "/pricing" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Make something",
    items: [
      { label: "Digitize my media", href: "/services/digitize" },
      { label: "Restore & remaster", href: "/services/restore" },
      { label: "Print on anything", href: "/services/print-anything" },
      { label: "Hand-painted masterpieces", href: "/services/masterpieces" },
    ],
  },
  {
    title: "Flagship experiences",
    items: [
      { label: "Events — Aiken, SC", href: "/events" },
      { label: "SC Weddings", href: "/weddings" },
      { label: "SC Family Reunions", href: "/family-reunions" },
      { label: "The Living Wall", href: "/living-wall" },
      { label: "Memory Mail", href: "/memory-mail" },
      { label: "Occasions & auto-gifting", href: "/occasions" },
      { label: "The AprilDawn Shop", href: "/shop" },
      { label: "Gallery", href: "/gallery" },
      { label: "Gift Finder", href: "/gift-finder" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Partners", href: "/partners" },
      { label: "Stories", href: "/stories" },
      { label: "Reviews", href: "/reviews" },
      { label: "About", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

/** Lightweight, trust-building stats used across the marketing surface. */
export const trustStats: { value: string; label: string }[] = [
  { value: "12M+", label: "memories rescued" },
  { value: "4,000+", label: "things we can print on" },
  { value: "1:1", label: "archival-grade scans" },
  { value: "100%", label: "happiness guarantee" },
];
