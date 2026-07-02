/** Editorial "Stories" content for AprilDawn. */

export type StoryBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Story = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readMins: number;
  emoji: string;
  gradient: string;
  body: StoryBlock[];
};

export const stories: Story[] = [
  {
    slug: "prepare-for-your-aiken-photo-session",
    title: "How to Prepare for Your Family Photo Session in Aiken",
    excerpt:
      "What to wear, where to meet, and the little tricks that make a golden-hour session in Aiken feel easy — and look effortless.",
    category: "Photography",
    author: "AprilDawn Photography",
    date: "2026-06-20",
    readMins: 5,
    emoji: "📷",
    gradient: "from-rose-200 via-amber-200 to-emerald-200",
    body: [
      { type: "p", text: "The best family photos don't look posed — they look like your family on a good day. Getting there is mostly about a little planning and a lot of permission to relax. Here's how we set our Aiken sessions up to feel that way." },
      { type: "h2", text: "Chase the light, not the clock" },
      { type: "p", text: "We shoot the hour after sunrise or before sunset for a reason: the light is soft, warm, and forgiving. Around Aiken that means the dappled trails of Hitchcock Woods, the lawns at Hopelands Gardens, or your own backyard glowing gold. Midday sun is harsh; golden hour makes everyone look like the best version of themselves." },
      { type: "h2", text: "What to wear" },
      { type: "ul", items: ["Coordinate, don't match — a shared palette of two or three soft colors", "Skip tiny patterns and big logos; they fight the photo", "Dress for the season and the place (Hitchcock Woods gets cool and buggy at dusk)", "Bring one 'hero' outfit and, if your session allows, a relaxed second look"] },
      { type: "p", text: "Once you book, we send a simple style guide with palettes that suit your location — so nobody's stressing about outfits the night before." },
      { type: "h2", text: "If there are little ones" },
      { type: "p", text: "Feed them first, bring a snack that doesn't stain, and let us do the silly work. We build in time to play; the giggles we get chasing bubbles are almost always the frames you'll print. Tired toddlers are the only thing golden hour can't fix, so we schedule around naps." },
      { type: "h2", text: "Bring the heirlooms" },
      { type: "p", text: "Here's the thing no other studio will tell you: bring Grandma's old photo, too. While we're together, we can digitize and restore the family pictures you've been meaning to save for years — and put your new portrait and that restored one on the same wall." },
      { type: "h2", text: "After the session" },
      { type: "p", text: "You'll see sneak peeks within a couple of days and a full hand-finished gallery in about two weeks. Then the fun part: your favorite frame can become a canvas, a blanket, an ornament, or the centerpiece of a Living Wall. The gallery is only the beginning." },
    ],
  },
  {
    slug: "best-photo-spots-in-aiken-sc",
    title: "The Best Photo Spots in Aiken, SC",
    excerpt:
      "From the dappled trails of Hitchcock Woods to the gardens at Hopelands, here are our favorite places to make portraits around Aiken.",
    category: "Local",
    author: "AprilDawn Photography",
    date: "2026-06-10",
    readMins: 4,
    emoji: "📍",
    gradient: "from-emerald-200 via-teal-200 to-sky-200",
    body: [
      { type: "p", text: "One of the quiet perks of being an Aiken photography studio is the backdrop. Within fifteen minutes of downtown you can shoot deep woods, formal gardens, historic streets, and open water. Here are the spots we return to again and again." },
      { type: "h2", text: "Hitchcock Woods" },
      { type: "p", text: "One of the largest urban forests in the country, right in town. Sandy trails, tall pines, and shafts of late light make it our go-to for families and seniors who want something natural and unhurried. Come early or late — and bring bug spray in summer." },
      { type: "h2", text: "Hopelands Gardens" },
      { type: "p", text: "Live oaks, reflecting pools, and winding brick paths. It's romantic without trying, which makes it perfect for engagements, maternity, and multi-generation family sessions. The dripping Spanish moss does half the work for us." },
      { type: "h2", text: "Downtown Aiken" },
      { type: "p", text: "The wide, tree-lined parkways and storefronts give senior and branding sessions an editorial, of-this-place feel. Great texture, great color, and a dozen looks within a block or two." },
      { type: "h2", text: "Aiken State Park & the lakes" },
      { type: "p", text: "When a family wants water, open sky, and room for the kids to just be kids, we head out to the park. Golden hour over the water is hard to beat." },
      { type: "h2", text: "Your own front porch" },
      { type: "p", text: "Never underestimate home. The porch you raised them on, the kitchen everyone crowds into — those places carry a weight no park can. Some of our favorite sessions never leave the driveway." },
      { type: "p", text: "Not sure which fits your family? Tell us the vibe you're after and we'll match you to the right spot and the right light." },
    ],
  },
  {
    slug: "gift-ideas-from-a-single-photo",
    title: "One Photo, a Dozen Gifts: Ideas from a Single Favorite",
    excerpt:
      "You don't need a perfect photo library — just one great shot. Here's how far a single favorite can go.",
    category: "Ideas",
    author: "The AprilDawn Lab",
    date: "2026-05-28",
    readMins: 4,
    emoji: "🎁",
    gradient: "from-fuchsia-200 via-pink-200 to-amber-200",
    body: [
      { type: "p", text: "People freeze up over gifts because they think they need the perfect idea. You don't. You need one photo you love — and a willingness to put it somewhere unexpected. Here's how a single favorite becomes an entire year of thoughtful gifts." },
      { type: "h2", text: "For the wall" },
      { type: "p", text: "A hand-stretched canvas or a framed archival print turns a phone photo into the thing guests stop and ask about. Three prints of the same day make an instant gallery wall." },
      { type: "h2", text: "For the everyday" },
      { type: "ul", items: ["A morning mug with their favorite face on it", "A blanket for the reading chair", "A dated keepsake ornament for the tree", "Fridge magnets that make the school-pickup crowd smile"] },
      { type: "h2", text: "For the laugh" },
      { type: "p", text: "Some photos are begging to be socks. Or a cake topper. Or wrapping paper printed with the guest of honor's own face. The best gag gifts come from the goofiest photo on your phone — and they get the biggest reactions." },
      { type: "h2", text: "For the ones who have everything" },
      { type: "p", text: "When someone truly needs nothing, give them something only you could: a restored version of a photo they thought was lost, reprinted on something they'll use. That's not a gift you buy — it's one you make." },
      { type: "p", text: "Start with the photo. We'll help you find the rest — browse the gift collections, or let the Gift Finder point the way." },
    ],
  },
  {
    slug: "digitize-a-lifetime-of-photos",
    title: "How to Digitize a Lifetime of Photos Without Losing Your Mind",
    excerpt:
      "Staring down a closet full of shoeboxes? Here's the calm, step-by-step way to rescue decades of memories — and what to do once they're safe.",
    category: "Guides",
    author: "The AprilDawn Lab",
    date: "2026-05-02",
    readMins: 6,
    emoji: "📦",
    gradient: "from-amber-200 via-rose-200 to-fuchsia-200",
    body: [
      { type: "p", text: "Almost every family has it: the closet, the attic crate, the drawer that won't quite close. Decades of photographs, slides, and tapes, all quietly fading. The task feels enormous — so it never gets done. Let's fix that, gently." },
      { type: "h2", text: "1. Gather, don't sort (yet)" },
      { type: "p", text: "The biggest mistake is trying to organize everything first. Don't. Pull every photo, album, slide carousel, and tape into one place. Sorting comes after digitizing, when it's a joy instead of a chore — you'll have a searchable, dated library to work with." },
      { type: "h2", text: "2. Decide: DIY or mail-in" },
      { type: "p", text: "A home scanner works for a few hundred prints. For thousands of photos, slides, and especially film and video, a lab is faster, safer, and far higher quality. AprilDawn's prepaid MemoryBox lets you pack everything, ship it with a label, and track each item through the lab with photo check-ins. Your originals always come home." },
      { type: "h2", text: "3. Capture once, at archival quality" },
      { type: "p", text: "Scan at the highest quality you can afford up front — up to 4K and 48-bit color for prints. You only want to handle fragile originals once, and high-resolution masters mean you can make wall-sized enlargements years from now." },
      { type: "h2", text: "4. Back it up in three places" },
      { type: "ul", items: ["A copy on your computer or a drive at home", "A copy in the cloud (your AprilDawn vault counts)", "A copy somewhere physically elsewhere — a relative's house or a second cloud"] },
      { type: "p", text: "Memories are only as safe as their least-safe copy. Three places is the quiet rule the pros live by." },
      { type: "p", text: "Once they're digital, the fun begins: restore the faded ones, print the favorites, and finally share that box with everyone who's in it." },
    ],
  },
  {
    slug: "the-quiet-art-of-photo-restoration",
    title: "The Quiet Art of Photo Restoration",
    excerpt:
      "What actually happens when a torn, water-stained photo becomes whole again — and why a human still finishes every one.",
    category: "Craft",
    author: "The AprilDawn Studio",
    date: "2026-04-18",
    readMins: 5,
    emoji: "✨",
    gradient: "from-sky-200 via-violet-200 to-rose-200",
    body: [
      { type: "p", text: "Restoration is part science, part empathy. A photograph is never just pixels — it's the only image of a grandmother as a girl, the last picture before someone shipped out, the wedding nobody else photographed. We treat each one like the single copy it usually is." },
      { type: "h2", text: "Reading the damage" },
      { type: "p", text: "Every photo tells us how it was hurt. Water blooms in soft clouds; sun fades the reds first; folds crack along a hard line; tape leaves amber ghosts. Before we touch anything, we read the story of the damage so we can undo it without erasing what makes the photo real." },
      { type: "h2", text: "Where AI helps — and where it shouldn't" },
      { type: "p", text: "Machine learning is astonishing at the heavy lifting: removing scratches, reducing grain, reconstructing missing corners, and proposing period-accurate color for black-and-white. But left alone, it can invent a face that never existed or scrub away the freckle someone loved. So a human colorist finishes every restoration, checking it against history and against the heart." },
      { type: "h2", text: "You always see it first" },
      { type: "p", text: "Nothing is finalized, printed, or charged until you approve a proof. If the smile isn't quite Mom's smile, we keep going. That's the whole job: not a perfect photo, but the right one." },
    ],
  },
  {
    slug: "unexpected-things-to-print-your-photos-on",
    title: "10 Unexpected Things to Print Your Photos On",
    excerpt:
      "T-shirts and mugs are just the beginning. Here are ten wonderfully weird ways to put a memory into the real world.",
    category: "Ideas",
    author: "The AprilDawn Shop",
    date: "2026-03-29",
    readMins: 4,
    emoji: "🖼️",
    gradient: "from-rose-200 via-orange-200 to-amber-200",
    body: [
      { type: "p", text: "If it has a surface, your memory belongs on it. Some of our favorite orders never started as a t-shirt. A few ideas to steal:" },
      { type: "ul", items: ["An edible cake topper of the birthday kid's actual face", "A playable vinyl record with the family photo on the label", "Laser-engraved metal of a couple's first dance", "Stamped leather journals carrying a loved one's handwriting", "A 1,000-piece puzzle of a chaotic holiday morning", "Socks. Always socks. Specifically, someone's face on socks", "A skate deck of a grandparent in their wild youth", "A throw blanket woven from a 100-photo collage", "Garden flags so the neighbors meet the whole family", "A pet bandana, because the dog is family too"] },
      { type: "p", text: "The trick with any of them is a good crop and a clean, high-resolution source. Upload a photo in our designer and you'll see it on the product before you buy — and we can quietly restore or up-res it first so it looks flawless at any size." },
    ],
  },
  {
    slug: "a-card-that-talks-back",
    title: "Bringing Back the Mail: Why a Card That Talks Hits Different",
    excerpt:
      "Texts disappear. A card on the fridge that plays Grandpa's voice when you scan it? That stays for years.",
    category: "Memory Mail",
    author: "The AprilDawn Team",
    date: "2026-03-10",
    readMins: 4,
    emoji: "💌",
    gradient: "from-rose-200 via-pink-200 to-purple-200",
    body: [
      { type: "p", text: "There's a reason a physical card outlasts a thousand texts. It has weight. It lives on the fridge, the mantel, the bedside table. You walk past it and remember you're loved. We wanted to keep that — and give it a voice." },
      { type: "h2", text: "Scan, tap, or watch" },
      { type: "p", text: "Every AprilDawn card can carry a recorded message three ways: a discreet QR code anyone can scan, an NFC chip that plays the moment a phone touches it, and augmented reality that plays your video right on top of the printed photo. No app gymnastics, no dead links a year later." },
      { type: "h2", text: "The ones that wreck people (in a good way)" },
      { type: "p", text: "A new grandparent opening a card that plays the baby's first laugh. A birthday card in the voice of someone who's passed, recorded years ago. A photobook where every page reads itself aloud in your own voice. Print remembers things the cloud forgets." },
    ],
  },
  {
    slug: "design-a-living-wall",
    title: "Designing a Living Wall Your Whole Family Adds To",
    excerpt:
      "A hundred photos, one glowing centerpiece, and a wall that keeps growing for the rest of your life. Here's how to plan one.",
    category: "Living Wall",
    author: "The AprilDawn Studio",
    date: "2026-02-21",
    readMins: 5,
    emoji: "🧱",
    gradient: "from-fuchsia-200 via-purple-200 to-indigo-200",
    body: [
      { type: "p", text: "The Living Wall is our favorite thing we make: a giant printed mosaic of your family, custom-laid for your exact wall, with a slim embedded LED frame at its heart that cycles through every photo and video — and updates itself when someone adds a new memory from their phone." },
      { type: "h2", text: "Start with the wall, not the photos" },
      { type: "p", text: "Measure the space first. A mantel wants a horizontal piece around four feet wide; a stairwell loves a tall vertical run. Our designer lets you set the grid to any size up to 12 by 12 and arrange tiles yourself — tap to place, drag to fill a whole region, or drop a photo right where you want it." },
      { type: "h2", text: "Mix eras on purpose" },
      { type: "p", text: "The walls that stop people aren't chronological. Put the 1950s next to last summer. A black-and-white wedding beside a blurry phone snap of the same couple at eighty. The contrast is the magic." },
      { type: "h2", text: "Let it keep living" },
      { type: "p", text: "The embedded LED center means the wall is never finished. Family members add photos from anywhere, and new memories quietly fold into the rotation. It's a portrait that grows with you." },
    ],
  },
  {
    slug: "troll-grandma-with-love",
    title: "The Gift That Trolls Grandma With 1000% Love",
    excerpt:
      "How to put one glorious photo of Grandma on everything at her 90th — and why she'll secretly treasure it forever.",
    category: "Occasions",
    author: "The AprilDawn Team",
    date: "2026-01-30",
    readMins: 3,
    emoji: "👵",
    gradient: "from-orange-200 via-amber-200 to-yellow-200",
    body: [
      { type: "p", text: "The brief was simple: make Grandma's 90th unforgettable. The method was unhinged: put her face on everything the family would wear and use at the party. The result was a room full of grandkids in matching face-tees, a cake with her portrait in frosting, a playable vinyl with her photo on the label, and a hoodie 'for the ringleader.'" },
      { type: "h2", text: "How to pull it off" },
      { type: "ul", items: ["Pick one glorious (or gloriously goofy) photo", "Choose the spread: tees, mugs, socks, a cake topper, a vinyl, a pillow", "Order the Troll Grandma bundle and we proof everything before it ships", "Hand out the merch right before the cake comes out"] },
      { type: "p", text: "She'll roll her eyes. She'll say you shouldn't have. And she will wear that hoodie every single day for the rest of the year. Maximum love, maximum chaos." },
    ],
  },
];

export function getStory(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}
