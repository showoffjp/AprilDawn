import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PartnerMarquee } from "@/components/site/PartnerMarquee";
import { Reveal } from "@/components/ui/Reveal";
import { partnerGroups } from "@/lib/partners";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "AprilDawn stitches together best-in-class partners for printing, specialty making, gifting & delivery, payments, integrations, and AI.",
};

export default function PartnersPage() {
  return (
    <>
      <section className="bg-sunrise animate-gradient">
        <Container className="py-16 text-center sm:py-20">
          <SectionHeading
            center
            eyebrow="The AprilDawn network"
            title="It takes a village to keep a memory"
            intro="We connect the best printers, makers, shippers, and platforms so your memories become real things that arrive on time. Here's the ecosystem powering it all."
          />
        </Container>
        <PartnerMarquee />
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {partnerGroups.map((group, gi) => (
            <Reveal
              key={group.title}
              delay={gi * 70}
              className="rounded-3xl bg-white p-7 ring-1 ring-ink/10 hover-lift"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl" aria-hidden="true">
                  {group.emoji}
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold">
                    {group.title}
                  </h2>
                  <p className="text-sm text-ink-soft">{group.blurb}</p>
                </div>
              </div>
              <ul className="mt-5 space-y-2">
                {group.partners.map((p) => (
                  <li
                    key={p.name}
                    className="flex items-center justify-between rounded-xl bg-cream px-3 py-2.5 text-sm ring-1 ring-ink/10"
                  >
                    <span className="flex items-center gap-2 font-medium text-ink">
                      <span aria-hidden="true">{p.emoji}</span>
                      {p.name}
                    </span>
                    <span className="text-xs text-ink-soft">{p.note}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 rounded-2xl bg-cream-deep p-4 text-xs text-ink-soft ring-1 ring-ink/10">
          Partner names are shown to illustrate the categories of services
          AprilDawn integrates. Some are live integrations and others are
          representative of partners onboarded at launch.
        </p>

        <div className="mt-10 text-center">
          <Button href="/contact" size="lg">
            Become a partner →
          </Button>
        </div>
      </Section>
    </>
  );
}
