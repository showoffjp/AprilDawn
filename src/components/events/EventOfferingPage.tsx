import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MemoryScene } from "@/components/art/MemoryScene";
import { RatingInline, SocialProofCard } from "@/components/social/SocialProof";
import { EventInquiryForm } from "@/components/events/EventInquiryForm";
import type {
  EventOffering,
  PackageTier,
  EventService,
  AddOn,
} from "@/lib/events";
import { fromPrice } from "@/lib/utils";

export function EventOfferingPage({ offering }: { offering: EventOffering }) {
  return (
    <>
      {/* Hero */}
      <section className={`bg-gradient-to-br ${offering.hero.gradient}`}>
        <Container className="py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <Badge>{offering.hero.badge}</Badge>
              <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl">
                {offering.hero.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/80">
                {offering.hero.intro}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="#inquire" size="lg">
                  {offering.hero.ctaPrimary}
                </Button>
                <Button href="#packages" size="lg" variant="ghost">
                  {offering.hero.ctaSecondary}
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                <RatingInline />
                <span className="text-sm font-medium text-ink/70">
                  📍 Based in {offering.homeBase} · serving {offering.region}
                </span>
              </div>
            </div>
            <div className="relative hidden aspect-[4/3] overflow-hidden rounded-3xl shadow-soft ring-1 ring-ink/10 lg:block">
              <MemoryScene variant={offering.hero.scene} uid={`event-${offering.slug}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
            </div>
          </div>
        </Container>
      </section>

      {/* Packages */}
      <Section id="packages">
        <SectionHeading
          eyebrow={offering.packagesHeading.eyebrow}
          title={offering.packagesHeading.title}
          intro={offering.packagesHeading.intro}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {offering.packages.map((p) => (
            <PackageCard key={p.slug} pkg={p} offeringSlug={offering.slug} />
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-ink-soft">
          Every package is fully customizable — mix in any service below, or ask
          us to build a one-of-a-kind collection.
        </p>
      </Section>

      {/* Planning & coordination */}
      <div className="bg-cream-deep">
        <Section>
          <SectionHeading
            eyebrow="We'll run the whole show"
            title={offering.labels.planning}
            intro="Hand off as much or as little as you like — our Carolina team handles the rest."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {offering.planning.map((s) => (
              <ServiceCard key={s.name} service={s} />
            ))}
          </div>
        </Section>
      </div>

      {/* Photography & film */}
      <Section>
        <SectionHeading
          eyebrow="À la carte"
          title={offering.labels.photography}
          intro="Add any of these to a package, or build a custom collection from scratch."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {offering.photography.map((s) => (
            <ServiceCard key={s.name} service={s} />
          ))}
        </div>
      </Section>

      {/* The AprilDawn difference: enhance + print on anything */}
      <Section>
        <div className="overflow-hidden rounded-[2rem] bg-ink p-8 text-cream sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <Badge tone="amber">The AprilDawn difference</Badge>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance">
                {offering.enhance.title}
              </h2>
              <p className="mt-4 max-w-xl text-cream/80">
                {offering.enhance.intro}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/shop" variant="light">
                  Print on anything →
                </Button>
                <Button href="/services/restore" variant="light">
                  Restore a photo →
                </Button>
              </div>
            </div>
            <ul className="space-y-4">
              {offering.enhance.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-dawn-300">✦</span>
                  <span className="text-sm leading-relaxed text-cream/90">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Add-ons / keepsakes */}
      <div className="bg-cream-deep">
        <Section>
          <SectionHeading
            eyebrow="Keepsakes for everyone"
            title={offering.labels.addOns}
            intro="Turn the day into things your whole family can hold — printed on whatever you like."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {offering.addOns.map((a) => (
              <AddOnCard key={a.name} addOn={a} />
            ))}
          </div>
        </Section>
      </div>

      {/* Coverage areas */}
      <Section id="areas">
        <SectionHeading
          eyebrow="Where we work"
          title="Across the greater South Carolina area"
          intro={offering.coverageIntro}
        />
        <div className="mt-8 flex flex-wrap gap-2.5">
          {offering.coverageAreas.map((area) => (
            <span
              key={area}
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink ring-1 ring-ink/10"
            >
              📍 {area}
            </span>
          ))}
        </div>
      </Section>

      {/* Inquiry + social proof */}
      <div className="bg-cream-deep">
        <Section id="inquire">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Let's talk"
                title={offering.inquiry.title}
                intro={offering.inquiry.intro}
              />
              <SocialProofCard className="mt-8" />
              <Link
                href={offering.crossLink.href}
                className="mt-4 flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-ink/10 transition hover:ring-dawn-300"
              >
                <span className="text-2xl" aria-hidden="true">
                  {offering.crossLink.emoji}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">
                    {offering.crossLink.label}
                  </span>
                  <span className="block text-xs text-ink-soft">
                    {offering.crossLink.blurb}
                  </span>
                </span>
                <span className="ml-auto text-dawn-600">→</span>
              </Link>
            </div>
            <EventInquiryForm eventType={offering.label} region={offering.region} />
          </div>
        </Section>
      </div>

      {/* FAQ */}
      <Section>
        <SectionHeading eyebrow="Good to know" title="Frequently asked" />
        <div className="mx-auto mt-8 max-w-3xl divide-y divide-ink/10">
          {offering.faqs.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink">
                {f.q}
                <span className="shrink-0 text-ink-soft transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}

function PackageCard({
  pkg,
  offeringSlug,
}: {
  pkg: PackageTier;
  offeringSlug: string;
}) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ${
        pkg.highlight ? "ring-2 ring-dawn-400 shadow-soft-lg" : "ring-ink/10"
      }`}
    >
      <div className="relative h-32 overflow-hidden">
        <MemoryScene
          variant={pkg.scene}
          uid={`pkg-${offeringSlug}-${pkg.slug}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/10 to-transparent" />
        <span className="absolute left-4 top-4 text-3xl drop-shadow" aria-hidden="true">
          {pkg.emoji}
        </span>
        {pkg.highlight ? (
          <span className="absolute right-3 top-3">
            <Badge tone="amber">Most booked</Badge>
          </span>
        ) : null}
        <h3 className="absolute inset-x-4 bottom-3 font-display text-xl font-semibold text-white drop-shadow">
          {pkg.name}
        </h3>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <p className="text-sm font-medium text-dawn-600">{pkg.tagline}</p>
        <p className="mt-3 font-display text-2xl font-semibold text-ink">
          {fromPrice(pkg.priceFrom)}
        </p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-soft">
          <span>🕒 {pkg.coverage}</span>
          <span>📷 {pkg.team}</span>
        </div>
        <p className="mt-3 text-xs font-medium text-ink-soft">
          Best for: {pkg.bestFor}
        </p>
        <ul className="mt-5 flex-1 space-y-2 text-sm text-ink-soft">
          {pkg.includes.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-0.5 text-dawn-500">✓</span>
              {item}
            </li>
          ))}
        </ul>
        <Button
          href="#inquire"
          size="sm"
          variant={pkg.highlight ? "primary" : "ghost"}
          className="mt-6"
        >
          Check availability
        </Button>
      </div>
    </div>
  );
}

function ServiceCard({ service }: { service: EventService }) {
  return (
    <div className="flex flex-col rounded-3xl bg-white p-6 ring-1 ring-ink/10">
      <div className="flex items-center gap-3">
        <span className="text-3xl" aria-hidden="true">
          {service.emoji}
        </span>
        <h3 className="font-semibold text-ink">{service.name}</h3>
      </div>
      <p className="mt-3 flex-1 text-sm text-ink-soft">{service.blurb}</p>
      {typeof service.priceFrom === "number" ? (
        <p className="mt-4 text-sm font-semibold text-ink">
          {fromPrice(service.priceFrom)}
        </p>
      ) : (
        <p className="mt-4 text-sm font-semibold text-dawn-600">Included</p>
      )}
    </div>
  );
}

function AddOnCard({ addOn }: { addOn: AddOn }) {
  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-ink/10">
      <div className="flex items-center justify-between">
        <span className="text-2xl" aria-hidden="true">
          {addOn.emoji}
        </span>
        <span className="text-xs font-semibold text-ink">
          {fromPrice(addOn.priceFrom)}
        </span>
      </div>
      <h3 className="mt-3 text-sm font-medium text-ink">{addOn.name}</h3>
      <p className="mt-1 text-xs text-ink-soft">{addOn.blurb}</p>
    </div>
  );
}
