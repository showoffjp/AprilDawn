import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Aurora } from "@/components/effects/Aurora";
import { reviews, aggregate } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Real reviews from families who rescued, restored, and reimagined their memories with AprilDawn. Rated 4.9 out of 5.",
};

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-dawn-400" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(rating)}
      <span className="text-ink/20">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

export default function ReviewsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AprilDawn",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: aggregate.rating,
      reviewCount: aggregate.count,
      bestRating: 5,
    },
    review: reviews.slice(0, 6).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
      },
      reviewBody: r.quote,
    })),
  };

  return (
    <>
      <section className="bg-sunrise bg-grain relative overflow-hidden">
        <Aurora />
        <Container className="relative py-16 text-center sm:py-20">
          <div className="font-display text-6xl font-semibold text-ink">
            {aggregate.rating}
            <span className="text-3xl text-ink-soft">/5</span>
          </div>
          <div className="mt-2 text-2xl text-dawn-400">★★★★★</div>
          <p className="mt-3 text-ink-soft">
            Loved by {aggregate.count.toLocaleString()}+ families
          </p>
          <h1 className="mx-auto mt-6 max-w-2xl font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Memories rescued, reborn, and adored
          </h1>
        </Container>
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name + i} delay={(i % 3) * 60} className="h-full">
              <figure className="flex h-full flex-col rounded-3xl bg-white p-7 ring-1 ring-ink/10">
                <Stars rating={r.rating} />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink">
                  “{r.quote}”
                </blockquote>
                <figcaption className="mt-5">
                  <div className="font-semibold text-ink">{r.name}</div>
                  <div className="text-xs text-ink-soft">
                    {r.location} · {r.service}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <SectionHeading
            center
            title="Your memory could be the next one they cry over"
          />
          <div className="mt-6 flex justify-center gap-3">
            <Button href="/upload" size="lg">
              Start a project
            </Button>
            <Button href="/gift-finder" size="lg" variant="ghost">
              Find the perfect gift
            </Button>
          </div>
        </div>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
