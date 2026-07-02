import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MemoryScene } from "@/components/art/MemoryScene";
import { EventInquiryForm } from "@/components/events/EventInquiryForm";
import { photoSessions, getPhotoSession } from "@/lib/photography";
import { studio, site } from "@/lib/site";
import { fromPrice } from "@/lib/utils";

export function generateStaticParams() {
  return photoSessions.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const session = getPhotoSession(slug);
  if (!session) return { title: "Session not found" };
  return {
    title: session.searchTitle,
    description: session.lead,
  };
}

export default async function PhotoSessionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = getPhotoSession(slug);
  if (!session) notFound();

  const others = photoSessions.filter((s) => s.slug !== session.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: session.searchTitle,
    name: session.searchTitle,
    description: session.lead,
    url: `${site.url}/photography/${session.slug}`,
    provider: {
      "@type": "LocalBusiness",
      name: "AprilDawn Photography",
      address: {
        "@type": "PostalAddress",
        addressLocality: studio.city,
        addressRegion: studio.state,
        addressCountry: "US",
      },
    },
    areaServed: { "@type": "AdministrativeArea", name: "Aiken, SC & the CSRA" },
    offers: {
      "@type": "Offer",
      price: session.priceFrom,
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <MemoryScene variant={session.scene} uid={`shero-${session.slug}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/85 to-cream/45" />
        </div>
        <Container className="relative py-16 sm:py-20">
          <Link
            href="/photography"
            className="text-sm font-medium text-ink-soft hover:text-ink"
          >
            ← All photography
          </Link>
          <div className="mt-6 max-w-2xl">
            <Badge tone="dawn">
              {session.emoji} Aiken, SC · {session.name}
            </Badge>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.06] tracking-tight text-balance sm:text-5xl">
              {session.searchTitle}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              {session.lead}
            </p>
            <p className="mt-5 font-display text-2xl font-semibold text-ink">
              {fromPrice(session.priceFrom)}{" "}
              <span className="font-sans text-sm font-medium text-ink-soft">
                per session
              </span>
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="#inquire" size="lg">
                Check availability
              </Button>
              <Button href="/photography#packages" size="lg" variant="ghost">
                See packages
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Included + difference */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold">
              What&apos;s included
            </h2>
            <ul className="mt-5 space-y-2.5 text-sm text-ink-soft">
              {session.includes.map((inc) => (
                <li key={inc} className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-dawn-500">✓</span>
                  {inc}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <Button href="#inquire">Book this session →</Button>
            </div>
          </div>
          <div className="rounded-3xl bg-cream-deep p-8 ring-1 ring-ink/10">
            <h2 className="font-display text-xl font-semibold">
              Only with AprilDawn
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-ink-soft">
              {[
                "Every image hand-enhanced & color-graded — never a batch filter.",
                "Print any shot on canvas, metal, blankets, or a Living Wall.",
                "We digitize & restore your older family photos in the same visit.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-dawn-500">✦</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Other sessions */}
      <Section className="pt-0">
        <h2 className="font-display text-2xl font-semibold">Other sessions</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {others.map((s) => (
            <Link
              key={s.slug}
              href={`/photography/${s.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink shadow-soft ring-1 ring-ink/10 transition hover:-translate-y-0.5"
            >
              <span aria-hidden="true">{s.emoji}</span>
              {s.name}
            </Link>
          ))}
        </div>
      </Section>

      {/* Inquiry */}
      <div id="inquire" className="scroll-mt-20 bg-cream-deep">
        <Section>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Book your {session.name.toLowerCase()} session
              </h2>
              <p className="mt-4 leading-relaxed text-ink-soft">
                Tell us your date and a few details. A {studio.city} photographer
                will reply within one business day with availability and a full
                pricing guide.
              </p>
            </div>
            <EventInquiryForm
              eventType={`Photography — ${session.name}`}
              region="Aiken, SC"
            />
          </div>
        </Section>
      </div>
    </>
  );
}
