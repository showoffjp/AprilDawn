/**
 * AprilDawn service catalog.
 * Each service powers the /services index and the /services/[slug] detail page.
 * Flagship experiences set `href` to a bespoke top-level page.
 */

export type ServiceCategory =
  | "digitize"
  | "restore"
  | "print"
  | "art"
  | "wall"
  | "mail"
  | "occasions";

export type Service = {
  slug: string;
  name: string;
  emoji: string;
  category: ServiceCategory;
  tagline: string;
  summary: string;
  /** Optional bespoke page; otherwise links to /services/[slug]. */
  href?: string;
  gradient: string; // tailwind gradient classes for the card art
  heroPoints: string[];
  details: { title: string; body: string }[];
  startingPrice?: number;
  turnaround?: string;
  examples?: string[];
  faqs?: { q: string; a: string }[];
  featured?: boolean;
  /** Optional gallery of art styles (e.g. famous artists / genres). */
  styles?: { name: string; emoji: string; blurb: string }[];
};

export const services: Service[] = [
  {
    slug: "digitize",
    name: "Digitize Everything",
    emoji: "📦",
    category: "digitize",
    tagline: "Upload it — or mail us the shoebox.",
    summary:
      "Photos, slides, negatives, film reels, VHS, camcorder tapes, cassettes, vinyl, and voicemails — transcribed into pristine, archival-grade digital files you own forever.",
    gradient: "from-amber-200 via-rose-200 to-fuchsia-200",
    featured: true,
    heroPoints: [
      "Drag-and-drop upload or a prepaid, trackable mail-in MemoryBox",
      "Up to 4K / 48-bit scans for prints; web copies for sharing",
      "Audio & video transcription with searchable transcripts and captions",
      "Everything returned to you — originals never thrown away",
    ],
    details: [
      {
        title: "We handle every format ever made",
        body: "Standard prints, Polaroids, panoramas, 35mm and 110 negatives, mounted slides, 8mm/Super 8/16mm film reels, VHS/VHS-C/MiniDV/Hi8/Betamax, audio cassettes, microcassettes, reel-to-reel, vinyl, and even fragile glass plates. If it holds a memory, we can read it.",
      },
      {
        title: "Two ways to send it in",
        body: "Upload digital files instantly, or order a prepaid MemoryBox. Pack your shoebox, attic crate, or a lifetime of tapes, ship it with the included label, and track every item through our lab with photo check-ins at each step.",
      },
      {
        title: "Transcription, not just scanning",
        body: "Video and audio get true transcription: clean digital masters plus AI-generated, human-reviewed transcripts and captions so Grandpa's stories become searchable text you can keep, print, and share.",
      },
      {
        title: "You own it forever",
        body: "Download archival masters, get them on a custom USB heirloom or encrypted cloud vault, and keep web-ready copies for sharing. Your AprilDawn vault means you never lose them again.",
      },
    ],
    startingPrice: 0.39,
    turnaround: "2–3 weeks for mail-in · instant for uploads",
    examples: [
      "A 1,200-photo shoebox → searchable, dated, face-tagged album",
      "12 hours of camcorder tape → captioned highlight reel",
      "Grandma's voicemails → a printed keepsake with a scannable audio chip",
    ],
    faqs: [
      {
        q: "Will you really return my originals?",
        a: "Always. Originals are inventoried, photographed, and shipped back insured. We never discard a memory.",
      },
      {
        q: "What resolution do I get?",
        a: "Prints are scanned up to 4K/48-bit color depth so they're ready for wall-sized enlargements; you also get optimized copies for phones and social.",
      },
    ],
  },
  {
    slug: "restore",
    name: "Restore & Remaster",
    emoji: "✨",
    category: "restore",
    tagline: "Bring faded, torn, and forgotten photos back to life.",
    summary:
      "AI-assisted, artist-finished restoration: repair tears and water damage, remove scratches, sharpen, colorize black-and-white, and even gently animate a portrait so a loved one blinks and smiles again.",
    gradient: "from-sky-200 via-violet-200 to-rose-200",
    featured: true,
    heroPoints: [
      "Tear, crease, mold, and water-damage repair",
      "Historically-faithful colorization of black-and-white photos",
      "Up-res & remaster blurry photos and low-res video to crisp HD/4K",
      "Optional 'Living Portrait' subtle motion — a smile, a blink, a breath",
    ],
    details: [
      {
        title: "Damage repair",
        body: "We rebuild missing corners, erase creases and tape marks, lift water stains and mold, and reduce grain and yellowing — keeping every freckle and detail that makes the photo yours.",
      },
      {
        title: "Colorization done right",
        body: "Our colorists research period-accurate uniforms, skin tones, and fabrics, then hand-finish AI passes so the result feels like it was always in color — never cartoonish.",
      },
      {
        title: "Remaster & up-res",
        body: "Turn a 640×480 camcorder clip or a thumbnail-sized scan into clean HD or 4K with denoising, stabilization, and frame interpolation for buttery motion.",
      },
      {
        title: "Living Portraits",
        body: "With your permission and a respectful, clearly-labeled approach, we can add gentle, lifelike motion to a still portrait — a treasured way to feel close to someone again.",
      },
    ],
    startingPrice: 19,
    turnaround: "3–5 business days · rush available",
    examples: [
      "A torn 1940s wedding photo → framed, colorized centerpiece",
      "A blurry VHS birthday → stabilized, sharpened 4K clip",
      "Faded baby photos → a crisp nursery gallery wall",
    ],
    faqs: [
      {
        q: "Do I approve the result first?",
        a: "Yes — you see proofs and request changes before anything is finalized, printed, or delivered.",
      },
    ],
  },
  {
    slug: "print-anything",
    name: "Print on Anything",
    emoji: "🖼️",
    category: "print",
    tagline: "If it has a surface, your memory belongs on it.",
    summary:
      "Apparel, wall art, home goods, drinkware, accessories — and the genuinely unexpected. T-shirts and sweaters are just the start: we put your photos on cakes, vinyl records, skateboards, blankets, phone cases, ornaments, and more.",
    gradient: "from-rose-200 via-orange-200 to-amber-200",
    featured: true,
    heroPoints: [
      "Apparel: tees, hoodies, sweatshirts, socks, pajamas, aprons",
      "Wall art: canvas, framed prints, metal, acrylic, wood, tapestries",
      "Home & life: mugs, blankets, pillows, puzzles, ornaments, phone cases",
      "Engraved & stamped: laser-etched metal & wood, embossed leather",
      "The unexpected: edible cake prints, custom vinyl, skateboards, magnets",
    ],
    details: [
      {
        title: "Studio-grade printing",
        body: "Color-managed, museum-quality output on every substrate. Upload a photo or pick one from your AprilDawn vault and preview it on the product before you buy.",
      },
      {
        title: "Literally everything",
        body: "Our maker network goes far beyond printing — laser-engraved metal and wood, embossed and stamped leather, edible cake toppers, etched vinyl, custom puzzles, garden flags, pet bandanas, and more. If it's not in the catalog, request it; if it exists, we'll find a way to put your memory on it.",
      },
      {
        title: "Bundles & multi-product runs",
        body: "Perfect for events and gag gifts: put the same face on a tee, a mug, a hoodie, a cake, and a vinyl record in one order. (See Occasions for the legendary 'Troll Grandma' bundle.)",
      },
      {
        title: "Smart cropping & enhancement",
        body: "We auto-suggest the best crop per product and can quietly upscale or restore your photo first so it looks flawless at any size.",
      },
    ],
    startingPrice: 12,
    turnaround: "3–7 business days production",
    examples: [
      "Matching reunion hoodies for 40 cousins",
      "An edible cake topper of the birthday kid's face",
      "A custom vinyl record sleeve with the family photo",
    ],
  },
  {
    slug: "masterpieces",
    name: "Masterpiece Portraits",
    emoji: "🎨",
    category: "art",
    tagline: "Your family, painted by the greatest artists who ever lived.",
    summary:
      "Want to see your family as a Van Gogh? A Renaissance royal court? A pop-art icon? Turn any photo into a portrait in the style of any famous artist or genre — rendered by our machine-learned painterly studio, optionally finished by a real human artist, and delivered digitally or printed on canvas, metal, acrylic, wood… or literally anything.",
    gradient: "from-emerald-200 via-teal-200 to-sky-200",
    featured: true,
    heroPoints: [
      "Any artist, any era: Van Gogh, Monet, Da Vinci, Klimt, Warhol & more",
      "ML-painted portraits, optionally hand-finished by a commissioned artist",
      "Get it digital (hi-res download) AND printed on any medium",
      "Up to wall-sized (100\"+) murals; merge people across photos & eras",
    ],
    styles: [
      { name: "Van Gogh", emoji: "🌌", blurb: "Swirling, starry post-impressionism." },
      { name: "Monet", emoji: "🌷", blurb: "Soft, dreamy impressionist light." },
      { name: "Da Vinci", emoji: "🖼️", blurb: "Renaissance master, sfumato glow." },
      { name: "Rembrandt", emoji: "🕯️", blurb: "Dramatic Baroque chiaroscuro." },
      { name: "Klimt", emoji: "✨", blurb: "Gold-leaf Art Nouveau opulence." },
      { name: "Frida Kahlo", emoji: "🌺", blurb: "Bold, symbolic, full of color." },
      { name: "Picasso", emoji: "🟦", blurb: "Cubist, daring, unmistakable." },
      { name: "Warhol", emoji: "🥫", blurb: "Pop-art, neon, repeat-print fun." },
      { name: "Hokusai", emoji: "🌊", blurb: "Japanese woodblock waves & line." },
      { name: "Rockwell", emoji: "🇺🇸", blurb: "Warm, story-telling Americana." },
      { name: "Comic / Pop", emoji: "💥", blurb: "Superhero ink & halftone dots." },
      { name: "Art Deco", emoji: "🏛️", blurb: "Gatsby-era geometry & gold." },
    ],
    details: [
      {
        title: "Any artist. Any genre. Any era.",
        body: "Pick from the legends — Van Gogh, Monet, Da Vinci, Rembrandt, Klimt, Frida Kahlo, Picasso, Warhol, Hokusai, Rockwell — or a genre like Renaissance royalty, Art Deco, comic-book, watercolor, charcoal, or stained glass. Our studio learns each style and composes your family into it, faithfully and beautifully.",
      },
      {
        title: "Machine-learned painting, human heart",
        body: "Portraits are generated by painterly models trained on each style, then — if you choose — hand-finished by a commissioned human artist with real brushwork on real canvas. Three tiers: museum-quality digital render, hand-embellished giclée, or fully hand-painted original.",
      },
      {
        title: "Digital and printed — get both",
        body: "Download a high-resolution digital file to share and treasure, and print the same masterpiece on gallery canvas, framed fine-art paper, metal, acrylic, or wood. Want it on a mug, a hoodie, or a 100-inch mural too? See Print on Anything — your masterpiece goes everywhere.",
      },
      {
        title: "Merge the whole family across time",
        body: "Have Grandpa in one photo and the newest grandbaby in another? We can lovingly combine people from different photos and eras into one timeless portrait — a whole lineage, painted as a single court of royalty.",
      },
    ],
    startingPrice: 49,
    turnaround: "Digital in 3–5 days · hand-painted 1–3 weeks",
    examples: [
      "Three generations as a Renaissance royal court, 60\"×40\" on canvas",
      "The family dog, immortalized as a Van Gogh, on a mug and a hoodie",
      "Grandparents' wedding photo reimagined as a Klimt gold portrait",
      "A pop-art Warhol set of the kids for the playroom wall",
    ],
    faqs: [
      {
        q: "Which artists and styles can I choose?",
        a: "Effectively any famous artist or art genre — from Van Gogh and Monet to Warhol and comic-book pop. If you can name the look, we can compose your portrait in it. Ask for a custom style and we'll create it.",
      },
      {
        q: "Is it AI, or a real painting?",
        a: "Your choice. The base render is created by our machine-learned painterly studio; you can keep it digital, add real hand-embellishment, or commission a fully hand-painted original by a human artist.",
      },
      {
        q: "Can I get the same artwork on other products?",
        a: "Yes! Once your masterpiece is approved, print it on canvas, metal, apparel, mugs, blankets, a Living Wall — anything in the shop.",
      },
    ],
  },
  {
    slug: "living-wall",
    name: "The Living Wall",
    emoji: "🧱",
    category: "wall",
    tagline: "A 100-photo collage that also glows and remembers.",
    href: "/living-wall",
    summary:
      "Our flagship: a giant physical photo collage installed on your wall, paired with a slim embedded LED 'Memory Mosaic' frame that cycles through all of those photos — and any new ones you add from your phone.",
    gradient: "from-fuchsia-200 via-purple-200 to-indigo-200",
    featured: true,
    heroPoints: [
      "Giant printed collage (100+ photos) custom-laid for your wall",
      "Embedded LED frame that displays the whole collection in motion",
      "Add photos and videos from your phone — the wall updates itself",
      "Looks like a hung portrait; mounts flush and disappears into the decor",
    ],
    details: [
      {
        title: "The physical mosaic",
        body: "We design a museum-grade printed collage sized exactly to your wall, arranged by our layout studio for rhythm and flow — hundreds of memories in one breathtaking installation.",
      },
      {
        title: "The living center",
        body: "Embedded into the collage is a slim, frameless LED panel that quietly cycles every photo and video in the collection. It looks like one more framed picture — until it moves.",
      },
      {
        title: "Always up to date",
        body: "Snap a photo at dinner and it appears on the wall by dessert. Family members can contribute from anywhere, so the wall keeps growing for the rest of your life.",
      },
    ],
    startingPrice: 1499,
    turnaround: "3–5 weeks · white-glove install available",
  },
  {
    slug: "memory-mail",
    name: "Memory Mail",
    emoji: "💌",
    category: "mail",
    tagline: "The greeting card, reborn — now it talks back.",
    href: "/memory-mail",
    summary:
      "Real cards and photobooks mailed to real doorsteps, with embedded audio and video. Scan it, tap it, or watch it play — a printed keepsake that carries Grandma's voice and a video hug.",
    gradient: "from-rose-200 via-pink-200 to-purple-200",
    featured: true,
    heroPoints: [
      "Custom photo cards & lay-flat photobooks, professionally printed and mailed",
      "Embedded audio/video via QR, NFC tap, and augmented-reality playback",
      "Record a message right from your phone — we press it into the card",
      "Schedule sends for birthdays, holidays, and 'just because'",
    ],
    details: [
      {
        title: "Bring back the mail card business",
        body: "We design, print, and mail beautiful cards and photobooks for you — single sends or full subscription runs for the whole family list.",
      },
      {
        title: "Cards that play",
        body: "Every card can carry a recorded message. Scan the QR, tap the NFC chip, or point a phone at the photo for an AR video that plays right on top of the printed image.",
      },
      {
        title: "Photobooks with a voice",
        body: "Turn a trip or a life into a lay-flat photobook where pages come alive — captions read aloud in your own voice, video clips embedded beside the stills.",
      },
    ],
    startingPrice: 7,
    turnaround: "Mailed within 3–5 business days",
  },
  {
    slug: "occasions",
    name: "Occasions & Auto-Gifting",
    emoji: "🎂",
    category: "occasions",
    tagline: "Never miss a birthday — and troll Grandma with 1000% love.",
    href: "/occasions",
    summary:
      "Connect your contacts and calendars and AprilDawn reminds you before every birthday and anniversary — then one tap sends the perfect gift, including legendary multi-product gag bundles.",
    gradient: "from-orange-200 via-amber-200 to-yellow-200",
    featured: true,
    heroPoints: [
      "Sync birthdays from Google, Outlook, Apple, and Facebook",
      "Smart reminders by email, SMS, and push — with lead time to ship",
      "One-tap gifting from your AprilDawn vault of photos",
      "Gag-gift bundles: one face on every shirt, mug, cake, and vinyl",
    ],
    details: [
      {
        title: "It remembers so you don't have to",
        body: "Import contacts and calendars once. We watch for upcoming birthdays and anniversaries and nudge you early enough that the gift actually arrives on time.",
      },
      {
        title: "One-tap perfect gifts",
        body: "We suggest a gift built from your best photos of that person — a restored portrait, a photobook, a Memory Mail card — and you approve it in a tap.",
      },
      {
        title: "The 'Troll Grandma' bundle",
        body: "For the 90th birthday she'll never forget: her face on every hoodie, mug, cake, vinyl, pillow, and pair of socks at the party. Maximum love, maximum chaos.",
      },
    ],
    startingPrice: 0,
    turnaround: "Reminders are free · gifts ship per product",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function serviceHref(s: Service): string {
  return s.href ?? `/services/${s.slug}`;
}

export const featuredServices = services.filter((s) => s.featured);
