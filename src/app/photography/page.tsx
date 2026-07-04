import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MemoryScene, type SceneVariant } from "@/components/art/MemoryScene";
import { EventInquiryForm } from "@/components/events/EventInquiryForm";
import { EventsJsonLd } from "@/components/events/EventsJsonLd";
import {
  photoSessions,
  photoPackages,
  photoLocations,
  serviceAreas,
  photoFaqs,
} from "@/lib/photography";
import { eventOfferings } from "@/lib/events";
import { studio } from "@/lib/site";
import { fromPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Aiken, SC Photography — Portraits, Families & Events",
  description:
    "AprilDawn is an Aiken, South Carolina photography studio — family, senior, newborn, couples, branding, and event sessions across the CSRA. Every image hand-enhanced, and printable on anything. Free proofs.",
};

const JSONLD_DESC =
  "AprilDawn Photography — an Aiken, SC studio for family, senior, newborn, couples, branding, and event portraits, serving the greater CSRA and South Carolina.";

const PORTFOLIO: { scene: SceneVariant; label: string }[] = [
  { scene: "garden", label: "Family · Hitchcock Woods" },
  { scene: "sunset", label: "Couples · Hopelands" },
  { scene: "sunrise", label: "Newborn · in-studio" },
  { scene: "beach", label: "Seniors · downtown Aiken" },
  { scene: "picnic", label: "Family · backyard" },
  { scene: "winter", label: "Branding · on-site" },
  { scene: "birthday", label: "Events · celebration" },
  { scene: "sunset", label: "Engagement · The Willcox" },
];

export default function PhotographyPage() {
  const testimonials = eventOfferings.weddings.testimonials.slice(0, 3);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: photoFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <EventsJsonLd
        path="/photography"
        name="AprilDawn Photography — Aiken, SC"
        description={JSONLD_DESC}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <MemoryScene variant="sunset" uid="photo-hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/85 to-cream/45" />
        </div>
        <Container className="relative py-20 sm:py-28">
          <div className="max-w-2xl">
            <Badge tone="dawn">
              <span aria-hidden="true">📷</span> Aiken, SC · portraits, families
              &amp; events
            </Badge>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
              Aiken photography, with a difference no one else offers
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              We&apos;re a photography studio right here in {studio.city},{" "}
              {studio.state}, shooting families, seniors, newborns, couples, and
              events across the CSRA. Then AprilDawn does what no other
              photographer can: hand-enhance every single frame and print your
              favorites on <em>literally anything</em> — canvas, blankets, even a
              living LED wall.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#inquire" size="lg">
                Book a session
              </Button>
              <Button href="#packages" size="lg" variant="ghost">
                See packages
              </Button>
            </div>
            <p className="mt-6 text-sm font-medium text-ink-soft">
              Based in {studio.city}, {studio.state} · serving the greater CSRA &amp;
              South Carolina · travel included
            </p>
          </div>
        </Container>
      </section>

      {/* Sessions */}
      <Section>
        <SectionHeading
          eyebrow="Sessions"
          title="What we love to shoot"
          intro="Every session is unhurried, styled with you, and delivered as a hand-finished gallery — never a batch filter."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photoSessions.map((s) => (
            <Link
              key={s.slug}
              href={`/photography/${s.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-ink/10 transition hover:-translate-y-1 hover:shadow-soft-lg"
            >
              <div className="relative h-32 overflow-hidden">
                <MemoryScene
                  variant={s.scene}
                  uid={`ps-${s.slug}`}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/35 to-transparent" />
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 text-2xl shadow-sm ring-1 ring-ink/10 backdrop-blur"
                >
                  {s.emoji}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold">{s.name}</h3>
                  <span className="text-sm font-semibold text-ink">
                    {fromPrice(s.priceFrom)}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {s.blurb}
                </p>
                <ul className="mt-4 space-y-1.5 text-sm text-ink-soft">
                  {s.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2">
                      <span className="mt-0.5 text-dawn-500" aria-hidden="true">✓</span>
                      {inc}
                    </li>
                  ))}
                </ul>
                <span className="mt-4 text-sm font-semibold text-dawn-600 transition group-hover:translate-x-0.5">
                  View {s.name} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Portfolio */}
      <Section className="pt-0">
        <SectionHeading
          eyebrow="Recent work"
          title="A look at our sessions"
          intro="A little of everything we shoot around Aiken and the CSRA."
        />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {PORTFOLIO.map((p, i) => (
            <figure
              key={`${p.label}-${i}`}
              className="group relative overflow-hidden rounded-2xl shadow-soft ring-1 ring-ink/10"
            >
              <div className="aspect-[4/5]">
                <MemoryScene
                  variant={p.scene}
                  uid={`pf-${i}`}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/45 to-transparent" />
              <figcaption className="absolute bottom-2 left-3 right-3 text-xs font-semibold text-white">
                {p.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* Weddings & reunions verticals */}
      <Section className="pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/weddings"
            className="group flex items-center justify-between gap-4 rounded-3xl bg-dusk p-8 text-white ring-1 ring-white/10"
          >
            <div>
              <p className="text-2xl" aria-hidden="true">💍</p>
              <h3 className="mt-2 font-display text-xl font-semibold">
                Weddings in South Carolina
              </h3>
              <p className="mt-1 text-sm text-white/80">
                Full planning + photography, run out of Aiken.
              </p>
            </div>
            <span className="shrink-0 text-dawn-200 transition group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="/family-reunions"
            className="group flex items-center justify-between gap-4 rounded-3xl bg-white p-8 ring-1 ring-ink/10"
          >
            <div>
              <p className="text-2xl" aria-hidden="true">🎪</p>
              <h3 className="mt-2 font-display text-xl font-semibold">
                Family reunions
              </h3>
              <p className="mt-1 text-sm text-ink-soft">
                Reunion coverage + digitizing the whole family&apos;s shoebox.
              </p>
            </div>
            <span className="shrink-0 text-dawn-600 transition group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </Section>

      {/* Packages */}
      <div id="packages" className="scroll-mt-20 bg-cream-deep">
        <Section>
          <SectionHeading
            center
            eyebrow="Session packages"
            title="Simple, honest pricing"
            intro="Every package is hand-edited and comes with access to print your gallery on anything in the shop. You approve a proof before anything ships."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {photoPackages.map((p) => (
              <div
                key={p.name}
                className={`flex flex-col rounded-3xl bg-white p-8 shadow-soft ring-1 ${
                  p.featured ? "ring-2 ring-dawn-400" : "ring-ink/10"
                }`}
              >
                {p.featured ? <Badge>Most booked</Badge> : null}
                <h3 className="mt-3 font-display text-2xl font-semibold">
                  {p.name}
                </h3>
                <p className="mt-2 font-display text-3xl font-semibold text-ink">
                  {p.price}
                </p>
                <p className="mt-1 text-sm font-medium text-dawn-600">
                  {p.duration}
                </p>
                <p className="mt-3 text-sm text-ink-soft">{p.blurb}</p>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm text-ink-soft">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-0.5 text-dawn-500" aria-hidden="true">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  href="#inquire"
                  className="mt-7 w-full"
                  variant={p.featured ? "primary" : "ghost"}
                >
                  Book {p.name}
                </Button>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* The AprilDawn difference */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Only AprilDawn</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Your gallery is just the beginning
            </h2>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Any other studio hands you a folder of files. We hand-finish every
              image, then turn your favorites into things you&apos;ll live
              with — and while we&apos;re at it, we&apos;ll restore the
              grandparents&apos; old photos for the mantel too.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink-soft">
              {[
                "Every image hand-enhanced & color-graded — never a batch filter.",
                "Print any shot on canvas, metal, blankets, ornaments, or a Living Wall.",
                "We digitize and restore your older family photos in the same visit.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-dawn-500" aria-hidden="true">✦</span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/shop">See what we print →</Button>
              <Button href="/services/restore" variant="ghost">
                Restore old photos
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {(["garden", "sunset", "beach", "sunrise"] as SceneVariant[]).map(
              (v, i) => (
                <div
                  key={v}
                  className={`overflow-hidden rounded-2xl shadow-soft ring-1 ring-ink/10 ${
                    i % 2 ? "translate-y-4" : ""
                  }`}
                >
                  <div className="aspect-[4/5]">
                    <MemoryScene variant={v} uid={`pd-${v}`} />
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </Section>

      {/* Local — where we shoot */}
      <Section className="pt-0">
        <div className="rounded-[2rem] bg-sunrise px-8 py-12 ring-1 ring-ink/10 sm:px-14">
          <Eyebrow>Aiken &amp; the CSRA</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Favorite places we&apos;ll meet you
          </h2>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {photoLocations.map((loc) => (
              <span
                key={loc}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink ring-1 ring-ink/10"
              >
                <span aria-hidden="true">📍</span> {loc}
              </span>
            ))}
          </div>
          <p className="mt-6 max-w-xl text-sm text-ink-soft">
            Based in {studio.city}, {studio.state}. Travel across the greater CSRA
            — Augusta, North Augusta, and the Lakelands — is included with every
            session; destination sessions across the Carolinas are welcome.
          </p>
          <p className="mt-8 text-sm font-semibold text-ink">Proudly serving</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {serviceAreas.map((area) => (
              <span
                key={area}
                className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-ink-soft ring-1 ring-ink/10"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="pt-0">
        <SectionHeading center eyebrow="Loved by Carolina families" title="Kind words" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-3xl bg-white p-7 shadow-soft ring-1 ring-ink/10"
            >
              <div className="text-dawn-500">
                <span className="sr-only">Rated 5 out of 5 stars</span>
                <span aria-hidden="true">★★★★★</span>
              </div>
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="block font-semibold text-ink">{t.name}</span>
                <span className="block text-xs text-ink-soft">{t.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="pt-0">
        <SectionHeading center eyebrow="Good to know" title="Photography FAQ" />
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-ink/10 overflow-hidden rounded-3xl bg-white ring-1 ring-ink/10">
          {photoFaqs.map((f) => (
            <details key={f.q} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="shrink-0 text-xl leading-none text-dawn-500 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* Inquiry */}
      <div id="inquire" className="scroll-mt-20 bg-cream-deep">
        <Section>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <Eyebrow>Book a session</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Let&apos;s make something you&apos;ll keep forever
              </h2>
              <p className="mt-4 leading-relaxed text-ink-soft">
                Tell us what you have in mind and roughly when. A {studio.city}{" "}
                photographer will reply within one business day with availability
                and a full pricing guide.
              </p>
              <p className="mt-6 text-sm text-ink-soft">
                Prefer to talk? Email{" "}
                <a
                  href={`mailto:${studio.email}`}
                  className="font-medium text-dawn-600"
                >
                  {studio.email}
                </a>
                .
              </p>
            </div>
            <EventInquiryForm eventType="Photography session" region="Aiken, SC" />
          </div>
        </Section>
      </div>
    </>
  );
}
