import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
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

export default function AboutPage() {
  return (
    <>
      <section className="bg-sunrise">
        <Container className="py-20 text-center sm:py-28">
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
        <div className="grid grid-cols-2 gap-6 rounded-3xl bg-cream-deep p-8 ring-1 ring-ink/10 sm:grid-cols-4">
          {trustStats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-semibold text-ink">
                {s.value}
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wide text-ink-soft">
                {s.label}
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
    </>
  );
}
