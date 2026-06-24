import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Aurora } from "@/components/effects/Aurora";
import { CollectionCard } from "@/components/collections/CollectionCard";
import { collections } from "@/lib/collections";

export const metadata: Metadata = {
  title: "Gift Collections",
  description:
    "Curated, shoppable gift guides from AprilDawn — for grandparents, pet lovers, reunions, memorials, gag gifts, and everything under $25. Their favorite photos, on the things they'll keep.",
};

export default function CollectionsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-200 via-orange-200 to-amber-200">
        <Aurora />
        <div className="relative">
          <Section>
            <SectionHeading
              center
              eyebrow="Gift Collections"
              title="Curated for the people you love"
              intro="Not sure where to start? We've hand-picked the catalog into gift guides for every person and every occasion — each one built from your own photos."
            />
            <div className="mt-8 flex justify-center gap-3">
              <Button href="/gift-finder" size="lg">
                Try the Gift Finder
              </Button>
              <Button href="/shop" size="lg" variant="ghost">
                Browse the full shop
              </Button>
            </div>
          </Section>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <CollectionCard key={collection.slug} collection={collection} />
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="bg-sunrise rounded-[2rem] px-8 py-14 text-center ring-1 ring-ink/10 sm:px-16">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            One perfect photo. Endless ways to give it.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">
            Upload a favorite and we&apos;ll help you turn it into the gift
            they&apos;ll never stop talking about.
          </p>
          <Button href="/upload" size="lg" className="mt-8">
            Upload a photo to start
          </Button>
        </div>
      </Section>
    </>
  );
}
