import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { StoryCard } from "@/components/cards/StoryCard";
import { Reveal } from "@/components/ui/Reveal";
import { Aurora } from "@/components/effects/Aurora";
import { Container } from "@/components/ui/Container";
import { stories } from "@/lib/stories";

export const metadata: Metadata = {
  title: "Stories",
  description:
    "Guides, craft, and ideas from AprilDawn — how to digitize a lifetime of photos, the art of restoration, and wonderfully weird ways to keep a memory.",
};

export default function StoriesPage() {
  return (
    <>
      <section className="bg-sunrise bg-grain relative overflow-hidden">
        <Aurora />
        <Container className="relative">
          <Section>
            <SectionHeading
              center
              eyebrow="Stories"
              title="On memory, craft, and keeping what matters"
              intro="Guides and ideas from the AprilDawn lab — practical, heartfelt, and occasionally unhinged (looking at you, Grandma's 90th)."
            />
          </Section>
        </Container>
      </section>

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((s, i) => (
            <Reveal key={s.slug} delay={i * 60} className="h-full">
              <StoryCard story={s} />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
