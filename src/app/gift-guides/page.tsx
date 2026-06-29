import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Aurora } from "@/components/effects/Aurora";
import { GuideCard } from "@/components/giftguides/GuideCard";
import { giftGuides } from "@/lib/giftGuides";

export const metadata: Metadata = {
  title: "Gift Guides for Every Occasion",
  description:
    "Photo gift ideas for Mother's Day, Father's Day, Christmas, anniversaries, new babies, and memorials — made from your own photos, with free proofs before you pay.",
};

export default function GiftGuidesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-200 via-rose-200 to-violet-200">
        <Aurora />
        <div className="relative">
          <Section>
            <SectionHeading
              center
              eyebrow="Gift Guides"
              title="The right gift for every occasion"
              intro="Stuck on what to give? Start with the moment — we'll show you the photo gifts that land for it, from one perfect photo."
            />
            <div className="mt-8 flex justify-center gap-3">
              <Button href="/gift-finder" size="lg">
                Take the Gift Finder quiz
              </Button>
              <Button href="/collections" size="lg" variant="ghost">
                Browse collections
              </Button>
            </div>
          </Section>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {giftGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="bg-sunrise rounded-[2rem] px-8 py-14 text-center ring-1 ring-ink/10 sm:px-16">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Have the photo? You&apos;re basically done.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">
            Upload it once and we&apos;ll proof it on anything in any guide — no
            charge until you love it.
          </p>
          <Button href="/upload" size="lg" className="mt-8">
            Upload a photo to start
          </Button>
        </div>
      </Section>
    </>
  );
}
