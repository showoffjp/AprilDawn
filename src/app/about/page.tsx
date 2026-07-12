import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Aurora } from "@/components/effects/Aurora";
import { StatsBand } from "@/components/effects/StatsBand";
import { trustStats } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "AprilDawn exists so no memory is ever lost again. Our mission, our promise, and the values behind the everything store for memories.",
};

const values = [
  { e: "🤲", t: "Memories are sacred", d: "We treat every photo, tape, and voicemail like it's the only copy — because often, it is." },
  { e: "🪞", t: "Honest by default", d: "Free proofs, clear pricing, real disclosures. You always know what you're getting and what it costs." },
  { e: "🌅", t: "Joy, not just utility", d: "We're here for the happy tears and the gag gifts alike. Preserving the past should feel wonderful." },
  { e: "🔐", t: "Your data is yours", d: "You own your files, control your integrations, and can export or delete anytime." },
];

const differences = [
  {
    t: "Everything in one place",
    d: "We scan, restore, print, and frame under one roof — so your fragile originals never bounce between three different vendors to get the job done.",
  },
  {
    t: "Real artists, not filters",
    d: "AI does the heavy lifting; a human finishes every restoration and masterpiece by hand. You approve a free proof before anything is final or charged.",
  },
  {
    t: "Your originals always come home",
    d: "Every physical item is inventoried, photographed, tracked through the lab, and shipped back insured. We never keep or discard a memory.",
  },
  {
    t: "Rooted in Aiken, remote everywhere",
    d: "A real South Carolina photography studio for local sessions, and a mail-in-or-upload lab for families in any state. Send us a lifetime; get it back better than you remembered.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-sunrise bg-grain relative overflow-hidden">
        <Aurora />
        <Container className="relative py-20 text-center sm:py-28">
          <h1 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl">
            So that no memory is ever lost again.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            AprilDawn began with a shoebox in an attic and a simple, aching
            question: why do we let our most precious moments fade in drawers and
            on dying tapes? We built the everything store for memories so you can
            rescue them, reimagine them, and keep them — beautifully, permanently —
            for the rest of your life.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button href="/upload" size="lg">
              Start with one photo
            </Button>
            <Button href="/services" size="lg" variant="ghost">
              See what we make
            </Button>
          </div>
        </Container>
      </section>

      <Section>
        <div className="rounded-3xl bg-cream-deep p-8 ring-1 ring-ink/10">
          <StatsBand stats={trustStats} />
        </div>
      </Section>

      {/* Origin story */}
      <Section className="pt-0">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Our story" title="It started with a shoebox" />
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft">
            <p>
              AprilDawn began the way these things usually do — with a box nobody
              wanted to open. After a grandparent passed, there was a shoebox in
              the attic: curling Polaroids, a wedding gone orange with age, a strip
              of negatives no one owned a machine to read anymore. A whole life,
              quietly dissolving in the dark. The question that started the company
              was simple and a little furious: why do we let this happen?
            </p>
            <p>
              The answer, it turned out, was that saving memories had become a
              chore. One shop scanned photos, another printed them, a third made
              albums — and none of them talked to each other, while the fragile
              originals had to survive the trip between all of them. So we built the
              opposite: one place for the whole journey. Digitize the shoebox,
              restore what time damaged, and turn any of it into something
              you&rsquo;ll actually live with — a canvas, a blanket, a card that
              plays a voice,
              a wall that glows and never stops updating.
            </p>
            <p>
              Today AprilDawn is a photography studio rooted in Aiken, South
              Carolina and a memory lab that works entirely by mail and upload, so
              a family in any state can send us a lifetime and get it back better
              than they remembered. Same mission as that first shoebox: so that no
              memory is ever lost again.
            </p>
          </div>
        </div>
      </Section>

      {/* What makes us different */}
      <Section className="pt-0">
        <SectionHeading
          center
          eyebrow="Why AprilDawn"
          title="One dawn, the whole story"
          intro="Plenty of places will scan a photo. Almost none will take it from a dying tape to a framed masterpiece on your wall — and treat it like the only copy the entire way."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {differences.map((d) => (
            <div
              key={d.t}
              className="flex gap-4 rounded-3xl bg-white p-7 ring-1 ring-ink/10"
            >
              <span className="mt-0.5 text-xl text-dawn-500" aria-hidden="true">
                ✦
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold">{d.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{d.d}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="bg-cream-deep">
        <Section>
          <SectionHeading eyebrow="What we believe" title="Our values" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.t} className="rounded-3xl bg-white p-7 ring-1 ring-ink/10">
                <div className="text-3xl">{v.e}</div>
                <h3 className="mt-3 font-display text-lg font-semibold">{v.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.d}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Closing CTA */}
      <Section>
        <div className="bg-sunrise rounded-[2rem] px-8 py-14 text-center ring-1 ring-ink/10 sm:px-16">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Bring us your shoebox.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">
            Start with one photo, or mail us a lifetime. Either way, nothing fades
            on our watch.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/upload" size="lg">
              Start a project
            </Button>
            <Button href="/contact" size="lg" variant="ghost">
              Prefer we handle it? Talk to us
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
