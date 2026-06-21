import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { StoryCard } from "@/components/cards/StoryCard";
import { MemoryScene, sceneVariants } from "@/components/art/MemoryScene";
import { stories, getStory } from "@/lib/stories";

function sceneFor(slug: string) {
  return sceneVariants[
    slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % sceneVariants.length
  ];
}

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return { title: "Story not found" };
  return { title: story.title, description: story.excerpt };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  const more = stories.filter((s) => s.slug !== story.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: story.title,
    description: story.excerpt,
    datePublished: story.date,
    author: { "@type": "Organization", name: story.author },
    publisher: { "@type": "Organization", name: "AprilDawn" },
  };

  return (
    <>
      <section className={`bg-gradient-to-br ${story.gradient}`}>
        <Container className="py-16 sm:py-20">
          <Link
            href="/stories"
            className="text-sm font-medium text-ink/70 hover:text-ink"
          >
            ← All stories
          </Link>
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold text-ink/70">
                {story.category} · {story.readMins} min read
              </p>
              <h1 className="mt-2 max-w-3xl font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                {story.title}
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/80">
                {story.excerpt}
              </p>
              <p className="mt-6 text-sm text-ink/70">
                By {story.author} ·{" "}
                {new Date(story.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-soft-lg ring-1 ring-ink/10">
              <MemoryScene variant={sceneFor(story.slug)} uid={story.slug} />
              <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-ink backdrop-blur-sm">
                {story.emoji} {story.category}
              </span>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <article className="mx-auto max-w-2xl">
          {story.body.map((b, i) => {
            if (b.type === "h2")
              return (
                <h2
                  key={i}
                  className="mt-10 font-display text-2xl font-semibold tracking-tight"
                >
                  {b.text}
                </h2>
              );
            if (b.type === "ul")
              return (
                <ul key={i} className="mt-4 space-y-2">
                  {b.items.map((it) => (
                    <li key={it} className="flex gap-2 text-ink-soft">
                      <span className="mt-1 text-dawn-500">•</span>
                      <span className="leading-relaxed">{it}</span>
                    </li>
                  ))}
                </ul>
              );
            return (
              <p key={i} className="mt-4 leading-relaxed text-ink-soft">
                {b.text}
              </p>
            );
          })}
        </article>

        <div className="mx-auto mt-12 max-w-2xl rounded-3xl bg-cream-deep p-8 text-center ring-1 ring-ink/10">
          <p className="font-display text-xl font-semibold">
            Ready to rescue your own memories?
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <Button href="/upload">Start a project</Button>
            <Button href="/services" variant="ghost">
              Explore services
            </Button>
          </div>
        </div>
      </Section>

      <div className="bg-cream-deep">
        <Section>
          <h2 className="font-display text-2xl font-semibold">More stories</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {more.map((s) => (
              <StoryCard key={s.slug} story={s} />
            ))}
          </div>
        </Section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
