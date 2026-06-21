import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { StoryCard } from "@/components/cards/StoryCard";
import { Reveal } from "@/components/ui/Reveal";
import { Aurora } from "@/components/effects/Aurora";
import { Container } from "@/components/ui/Container";
import { MemoryScene, sceneVariants } from "@/components/art/MemoryScene";
import { stories } from "@/lib/stories";

export const metadata: Metadata = {
  title: "Stories",
  description:
    "Guides, craft, and ideas from AprilDawn — how to digitize a lifetime of photos, the art of restoration, and wonderfully weird ways to keep a memory.",
};

function sceneFor(slug: string) {
  return sceneVariants[
    slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % sceneVariants.length
  ];
}

export default function StoriesPage() {
  const [feature, ...rest] = stories;

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

      {/* Featured story */}
      <Section className="pb-0">
        <Reveal>
          <Link
            href={`/stories/${feature.slug}`}
            className="group grid overflow-hidden rounded-[2rem] bg-white shadow-soft ring-1 ring-ink/10 transition hover:-translate-y-1 hover:shadow-soft-lg lg:grid-cols-2"
          >
            <div className="relative min-h-[240px] overflow-hidden">
              <MemoryScene
                variant={sceneFor(feature.slug)}
                uid={`feature-${feature.slug}`}
                className="h-full transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-ink backdrop-blur-sm">
                {feature.emoji} {feature.category} · Featured
              </span>
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <h2 className="font-display text-2xl font-semibold leading-snug sm:text-3xl">
                {feature.title}
              </h2>
              <p className="mt-3 leading-relaxed text-ink-soft">
                {feature.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-3 text-sm">
                <span className="text-ink-soft">{feature.readMins} min read</span>
                <span className="font-semibold text-dawn-600 transition group-hover:translate-x-0.5">
                  Read the story →
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      </Section>

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((s, i) => (
            <Reveal key={s.slug} delay={i * 60} className="h-full">
              <StoryCard story={s} />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
