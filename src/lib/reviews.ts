export type Review = {
  name: string;
  location: string;
  rating: number; // 1–5
  service: string;
  quote: string;
};

export const aggregate = { rating: 4.9, count: 12483 };

export const reviews: Review[] = [
  { name: "Renata G.", location: "Austin, TX", rating: 5, service: "Restore & Remaster", quote: "They restored my parents' torn 1952 wedding photo and put it on canvas. My mom cried. I cried. The mail carrier probably cried." },
  { name: "The Okafor family", location: "Atlanta, GA", rating: 5, service: "Digitize · Living Wall", quote: "We mailed in nine boxes of slides from the attic. Got back a searchable album and a Living Wall the whole family adds to. Worth every penny." },
  { name: "Marcus T.", location: "Denver, CO", rating: 5, service: "Occasions · Troll Grandma", quote: "Grandma's 90th had her face on 30 hoodies, a cake, and a vinyl record. She 'hated' it and has worn the hoodie every day since." },
  { name: "Priya & Sam", location: "Seattle, WA", rating: 5, service: "Masterpiece Portraits", quote: "Our family as a Klimt painting hangs over the mantel now. Guests literally stop and stare. Unreal quality." },
  { name: "Eleanor V.", location: "Portland, ME", rating: 5, service: "Memory Mail", quote: "I sent my grandson a card that plays my voice when he scans it. His mom said he sleeps with it. I'm not crying, you're crying." },
  { name: "Dwayne H.", location: "Chicago, IL", rating: 4, service: "Print on Anything", quote: "Matching reunion hoodies for 40 cousins, all on time. One size ran small but support fixed it instantly. Will absolutely reorder." },
  { name: "Casey L.", location: "Nashville, TN", rating: 5, service: "Digitize", quote: "Forty hours of old camcorder tapes turned into clean, captioned highlight reels. I finally heard my dad's voice again. Thank you." },
  { name: "The Romano family", location: "Brooklyn, NY", rating: 5, service: "Living Wall", quote: "The embedded LED in the collage is pure magic. We add photos from Sunday dinners and they show up on the wall by dessert." },
  { name: "Aisha R.", location: "Phoenix, AZ", rating: 5, service: "Restore & Remaster", quote: "A water-damaged photo of my late sister, brought back like it was taken yesterday. They proofed it twice until it was perfect." },
  { name: "Tom & Linda", location: "Madison, WI", rating: 5, service: "Occasions", quote: "The birthday reminders alone are worth it. We haven't missed a grandkid's birthday in two years, and the gifts are always perfect." },
  { name: "Gabriela M.", location: "Miami, FL", rating: 5, service: "Masterpiece Portraits", quote: "We did the dog as a Van Gogh and put it on a mug AND a hoodie. Best gift I've ever given my husband. He's obsessed." },
  { name: "Kenji A.", location: "San Jose, CA", rating: 4, service: "Memory Mail", quote: "Lay-flat photobook of our trip with embedded video pages. Stunning. Took a few extra days but the result was flawless." },
];
