import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Aurora } from "@/components/effects/Aurora";
import { Reveal } from "@/components/ui/Reveal";
import { StyleGallery } from "@/components/art/StyleGallery";
import { PrintShowcase } from "@/components/home/PrintShowcase";
import { BeforeAfterSlider } from "@/components/effects/BeforeAfterSlider";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "See what AprilDawn makes: a single memory reimagined in the style of the masters, composited onto real products, and brought back to life with restoration.",
};

const artStyles = [
  { name: "Van Gogh", emoji: "🌻", blurb: "Swirling impasto brushwork and electric blues." },
  { name: "Monet", emoji: "🌸", blurb: "Soft impressionist light and dappled color." },
  { name: "Da Vinci", emoji: "📜", blurb: "Old-master sfumato and warm varnish." },
  { name: "Rembrandt", emoji: "🕯️", blurb: "Dramatic chiaroscuro from candlelit shadow." },
  { name: "Klimt", emoji: "✨", blurb: "Golden, ornamental Art Nouveau shimmer." },
  { name: "Frida Kahlo", emoji: "🌺", blurb: "Bold folk color, vivid and alive." },
  { name: "Picasso", emoji: "🔷", blurb: "Cubist planes and a daring palette." },
  { name: "Warhol", emoji: "🎨", blurb: "Pop-art neon and silkscreen punch." },
  { name: "Hokusai", emoji: "🌊", blurb: "Ukiyo-e line and woodblock blues." },
  { name: "Rockwell", emoji: "🖼️", blurb: "Warm, storytelling Americana." },
  { name: "Comic / Pop", emoji: "💥", blurb: "Halftone pop and comic-panel energy." },
  { name: "Art Deco", emoji: "🏛️", blurb: "Gilded geometry and 1920s glamour." },
];

export default function GalleryPage() {
  return (
    <>
      <section className="bg-sunrise bg-grain relative overflow-hidden">
        <Aurora />
        <Container className="relative">
          <Section>
            <SectionHeading
              center
              eyebrow="The Gallery"
              title="One memory, a thousand ways to keep it"
              intro="A peek at what our studio does — the same family photo, reimagined as fine art, printed on everything you own, and restored to the day it was taken."
            />
          </Section>
        </Container>
      </section>

      {/* In the style of the masters */}
      <Section className="pt-0">
        <SectionHeading
          eyebrow="Masterpiece portraits"
          title="In the style of the masters"
          intro="Pick a painter or a genre; we hand-finish the render until it looks like it hung in a museum."
        />
        <Reveal className="mt-10">
          <StyleGallery styles={artStyles} />
        </Reveal>
        <div className="mt-10">
          <Button href="/services/masterpieces">Turn your photo into art →</Button>
        </div>
      </Section>

      {/* On everything you own */}
      <Section className="pt-0">
        <SectionHeading
          eyebrow="Print on anything"
          title="On everything you own"
          intro="If it has a surface, your memory belongs on it — from gallery canvas to an edible cake print."
        />
        <Reveal className="mt-10">
          <PrintShowcase />
        </Reveal>
        <div className="mt-10">
          <Button href="/shop">Browse the full shop →</Button>
        </div>
      </Section>

      {/* Restored to life */}
      <Section className="pt-0">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Restoration</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Faded, torn, water-stained? We bring it back.
            </h2>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Drag the slider to see what our restoration studio does — repairing
              damage, lifting color, and sharpening detail until it looks like the
              day it was taken. Every restoration ships with a free proof first.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/services/restore">Restore a photo</Button>
              <Button href="/upload" variant="ghost">
                Upload to try
              </Button>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <BeforeAfterSlider />
            <p className="mt-3 text-center text-xs text-ink-soft">
              ← drag to compare →
            </p>
          </Reveal>
        </div>
      </Section>

      {/* CTA */}
      <Section className="pt-0">
        <div className="bg-sunrise rounded-[2rem] px-8 py-16 text-center ring-1 ring-ink/10 sm:px-16">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Your memory could be next.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">
            Upload one photo and watch what we can do with it — free proofs, no
            charge until you love it.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/upload" size="lg">
              Upload a photo
            </Button>
            <Button href="/services" size="lg" variant="ghost">
              Explore everything we make
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
