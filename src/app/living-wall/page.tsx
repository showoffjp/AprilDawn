import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { LivingWallDesigner } from "@/components/livingwall/LivingWallDesigner";

export const metadata: Metadata = {
  title: "The Living Wall",
  description:
    "A giant physical photo collage with an embedded LED frame that cycles every memory — and updates itself when you add new photos from your phone.",
};

const tiers = [
  {
    name: "Mantel",
    size: 'Up to 4ft wide · ~60 photos',
    price: "$1,499",
    blurb: "A statement piece for above the fireplace or sofa.",
  },
  {
    name: "Gallery",
    size: '5–8ft wide · 100–180 photos',
    price: "$2,900",
    blurb: "Our signature size. The one that stops guests in the hallway.",
    featured: true,
  },
  {
    name: "Heirloom",
    size: '9ft+ · 200+ photos · white-glove install',
    price: "Custom",
    blurb: "Floor-to-ceiling. Multi-panel. A family legacy on the wall.",
  },
];

export default function LivingWallPage() {
  return (
    <>
      <section className="bg-dusk text-white">
        <Container className="py-20 sm:py-28">
          <div className="max-w-3xl">
            <Badge tone="dawn">🧱 Flagship experience</Badge>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
              The Living Wall
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
              A breathtaking printed collage of your family — custom-laid for your
              exact wall — with a slim embedded LED frame at its heart that cycles
              through every photo and video. It looks like one more framed
              picture, until it moves. Add a memory from your phone and the wall
              updates itself by dessert.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact" size="lg">
                Design your Living Wall
              </Button>
              <Button href="#how" size="lg" variant="light">
                How it works
              </Button>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-6 gap-2 rounded-3xl bg-white/10 p-4 ring-1 ring-white/20 sm:gap-3">
            {Array.from({ length: 30 }).map((_, i) => {
              const live = [13, 14, 15, 19, 20, 21].includes(i);
              return (
                <div
                  key={i}
                  className={
                    live
                      ? "aspect-square animate-pulse rounded-lg bg-gradient-to-br from-dawn-300 to-dusk-400 ring-2 ring-white/70"
                      : "aspect-square rounded-lg bg-white/15"
                  }
                />
              );
            })}
          </div>
          <p className="mt-3 text-center text-sm text-white/60">
            The glowing tiles are the live LED center — always changing, never the
            same wall twice.
          </p>
        </Container>
      </section>

      <Section id="design">
        <SectionHeading
          eyebrow="Design it yourself"
          title="Build your wall, tile by tile"
          intro="Set the size, drop in your photos, and arrange them however you like — tap a tile, click-drag to fill a whole region, or drag a photo right where you want it. Every tile snaps to the grid, so it always comes together."
        />
        <div className="mt-10">
          <LivingWallDesigner />
        </div>
      </Section>

      <Section id="how">
        <SectionHeading
          eyebrow="How it comes together"
          title="Designed for your wall, alive for your lifetime"
        />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              t: "1 · We design the mosaic",
              d: "Send us your photos (or your whole vault). Our layout studio arranges hundreds of them into a balanced, rhythmic composition sized to the millimeter for your wall.",
            },
            {
              t: "2 · We build & install",
              d: "Museum-grade printing on rigid panels, with a frameless LED display embedded seamlessly into the collage. White-glove installation available, or a simple DIY mount kit.",
            },
            {
              t: "3 · It keeps living",
              d: "Family members add photos and videos from the AprilDawn app. The LED center cycles the whole collection and folds in every new memory automatically.",
            },
          ].map((s) => (
            <div
              key={s.t}
              className="rounded-3xl bg-cream-deep p-8 ring-1 ring-ink/10"
            >
              <h3 className="font-display text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="bg-cream-deep">
        <Section>
          <SectionHeading center eyebrow="Sizes & pricing" title="Pick your wall" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`flex flex-col rounded-3xl bg-white p-8 ring-1 ${
                  t.featured ? "ring-2 ring-dawn-400" : "ring-ink/10"
                }`}
              >
                {t.featured ? <Badge>Most popular</Badge> : null}
                <h3 className="mt-3 font-display text-2xl font-semibold">
                  {t.name}
                </h3>
                <p className="mt-1 text-sm text-ink-soft">{t.size}</p>
                <p className="mt-4 font-display text-3xl font-semibold text-ink">
                  {t.price}
                </p>
                <p className="mt-3 flex-1 text-sm text-ink-soft">{t.blurb}</p>
                <Button href="/contact" className="mt-6" variant={t.featured ? "primary" : "ghost"}>
                  Get a quote
                </Button>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Section>
        <div className="bg-sunrise rounded-[2rem] px-8 py-14 text-center ring-1 ring-ink/10">
          <Eyebrow>Genius idea, realized</Eyebrow>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-semibold text-balance">
            100+ photos on the wall — and every one of them, glowing in the
            middle.
          </h2>
          <Button href="/contact" size="lg" className="mt-8">
            Start designing
          </Button>
        </div>
      </Section>
    </>
  );
}
