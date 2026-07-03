import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Aurora } from "@/components/effects/Aurora";
import { CollectionCard } from "@/components/collections/CollectionCard";
import { BundleCard } from "@/components/bundles/BundleCard";
import { GuideCard } from "@/components/giftguides/GuideCard";
import { collections } from "@/lib/collections";
import { bundles } from "@/lib/bundles";
import { giftGuides } from "@/lib/giftGuides";

export const metadata: Metadata = {
  title: "Gifts — Find the Perfect Photo Gift",
  description:
    "The AprilDawn gift shop, all in one place: take the Gift Finder quiz, shop curated collections and ready-made bundles, or browse gift guides for every occasion. All from your favorite photo.",
};

export default function GiftsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-200 via-amber-200 to-violet-200">
        <Aurora />
        <div className="relative">
          <Section>
            <SectionHeading
              center
              eyebrow="Gifts"
              title="The perfect gift starts with one photo"
              intro="However you like to shop — a quick quiz, a curated edit, a ready-made set, or by the occasion — the perfect gift is a favorite photo away."
            />
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/gift-finder" size="lg">
                Take the Gift Finder quiz
              </Button>
              <Button href="/shop" size="lg" variant="ghost">
                Browse the full shop
              </Button>
            </div>
          </Section>
        </div>
      </section>

      {/* Gift Finder callout */}
      <Section>
        <div className="grid items-center gap-8 rounded-[2rem] bg-dusk p-8 text-white sm:p-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-dawn-200">
              Not sure where to start?
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-balance">
              Answer three questions. Get the perfect gift.
            </h2>
            <p className="mt-3 max-w-lg text-white/80">
              Tell us the occasion, the vibe, and your budget — we&apos;ll pick
              the gift (and a few ready-to-order picks) in about ten seconds.
            </p>
          </div>
          <div className="lg:text-right">
            <Button href="/gift-finder" size="lg" variant="light">
              Start the quiz →
            </Button>
          </div>
        </div>
      </Section>

      {/* Collections */}
      <Section className="pt-0">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="By who it's for" title="Shop by collection" />
          <Link
            href="/collections"
            className="hidden shrink-0 text-sm font-semibold text-dawn-600 hover:underline sm:block"
          >
            All collections →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.slice(0, 3).map((c) => (
            <CollectionCard key={c.slug} collection={c} />
          ))}
        </div>
      </Section>

      {/* Bundles */}
      <Section className="pt-0">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="One-tap sets" title="Ready-made bundles" />
          <Link
            href="/bundles"
            className="hidden shrink-0 text-sm font-semibold text-dawn-600 hover:underline sm:block"
          >
            All bundles →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bundles.map((b) => (
            <BundleCard key={b.slug} bundle={b} />
          ))}
        </div>
      </Section>

      {/* Occasion guides */}
      <Section className="pt-0">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="By the moment" title="Gift guides by occasion" />
          <Link
            href="/gift-guides"
            className="hidden shrink-0 text-sm font-semibold text-dawn-600 hover:underline sm:block"
          >
            All guides →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {giftGuides.slice(0, 3).map((g) => (
            <GuideCard key={g.slug} guide={g} />
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="pt-0">
        <div className="bg-sunrise rounded-[2rem] px-8 py-14 text-center ring-1 ring-ink/10 sm:px-16">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Have the photo? You&apos;re basically done.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">
            Upload a favorite and we&apos;ll proof it on anything before you pay a
            cent.
          </p>
          <Button href="/upload" size="lg" className="mt-8">
            Upload a photo to start
          </Button>
        </div>
      </Section>
    </>
  );
}
