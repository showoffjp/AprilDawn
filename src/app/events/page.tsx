import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MemoryScene } from "@/components/art/MemoryScene";
import { RatingInline } from "@/components/social/SocialProof";
import { EventInquiryForm } from "@/components/events/EventInquiryForm";
import { EventsJsonLd } from "@/components/events/EventsJsonLd";
import { eventOfferings } from "@/lib/events";

export const metadata: Metadata = {
  title: "AprilDawn Events — Aiken, SC Weddings & Family Reunions",
  description:
    "Full-service event planning and photography based in Aiken, SC, serving the greater South Carolina area. Weddings and family reunions, with every photo hand-enhanced and printed on anything.",
};

const offerings = [eventOfferings.weddings, eventOfferings.reunions];

export default function EventsPage() {
  return (
    <>
      <EventsJsonLd
        path="/events"
        name="AprilDawn Events (Aiken, SC)"
        description="Full-service event planning and photography based in Aiken, SC, serving the greater South Carolina area — weddings and family reunions, with every photo hand-enhanced and printed on anything."
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-dawn-100 via-cream-deep to-amber-100">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Badge>📍 Based in Aiken, SC</Badge>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl">
              AprilDawn Events
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Full-service planning and photography, run out of Aiken, SC and
              serving the greater South Carolina area. We capture the day — then
              hand-enhance every photo and print your story on literally
              anything.
            </p>
            <div className="mt-6 flex justify-center">
              <RatingInline />
            </div>
          </div>
        </Container>
      </section>

      {/* Two verticals */}
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          {offerings.map((o) => (
            <Link
              key={o.slug}
              href={`/${o.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-ink/10 transition hover:-translate-y-1 hover:shadow-soft-lg"
            >
              <div className="relative h-48 overflow-hidden">
                <MemoryScene
                  variant={o.hero.scene}
                  uid={`hub-${o.slug}`}
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div className="text-3xl" aria-hidden="true">
                    {o.emoji}
                  </div>
                  <h2 className="mt-1 font-display text-2xl font-semibold">
                    {o.label}
                  </h2>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <p className="text-ink-soft">{o.hero.intro}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {o.packages.slice(0, 3).map((p) => (
                    <span
                      key={p.slug}
                      className="rounded-full bg-cream-deep px-3 py-1 text-xs font-medium text-ink-soft ring-1 ring-ink/10"
                    >
                      {p.name}
                    </span>
                  ))}
                  <span className="rounded-full px-2 py-1 text-xs font-medium text-ink-soft">
                    +more
                  </span>
                </div>
                <span className="mt-6 inline-block text-sm font-semibold text-dawn-600 transition group-hover:translate-x-0.5">
                  See {o.label.toLowerCase()} packages →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* The difference */}
      <div className="bg-cream-deep">
        <Section>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Why AprilDawn"
                title="A photographer that's also a memory lab"
                intro="No other Carolina studio finishes every frame by hand and turns it into anything you can hold."
              />
              <ul className="mt-6 space-y-2.5 text-sm text-ink-soft">
                {[
                  "Hand-enhanced, color-graded images — never a batch filter",
                  "Restore & digitize heirloom family photos for your display",
                  "Print on canvas, albums, a Living Wall, shirts, vinyl — 4,000+ things",
                  "Every guest's photos gathered into one private gallery",
                  "Your whole event archived in your AprilDawn vault, forever",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="mt-0.5 text-dawn-500">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/shop">Print on anything →</Button>
                <Button href="/services/restore" variant="ghost">
                  Restore a photo →
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-soft ring-1 ring-ink/10">
              <MemoryScene variant="sunset" uid="events-hub-art" />
            </div>
          </div>
        </Section>
      </div>

      {/* Inquiry */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Let's talk"
            title="Tell us about your event"
            intro="Wedding or reunion, we'll send availability, package pricing, and a few South Carolina venues we love. Based in Aiken, happy to travel statewide."
          />
          <EventInquiryForm eventType="Events" region="the greater South Carolina area" />
        </div>
      </Section>
    </>
  );
}
