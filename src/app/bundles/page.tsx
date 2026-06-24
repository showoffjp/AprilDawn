import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Aurora } from "@/components/effects/Aurora";
import { BundleCard } from "@/components/bundles/BundleCard";
import { bundles } from "@/lib/bundles";

export const metadata: Metadata = {
  title: "Gift Bundles",
  description:
    "Curated gift sets from AprilDawn — the Grandparent Box, Reunion Starter Pack, Memorial Keepsake Set, and Gallery Wall Trio. The whole set, from your photos, in one tap.",
};

export default function BundlesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-200 via-rose-200 to-amber-200">
        <Aurora />
        <div className="relative">
          <Section>
            <SectionHeading
              center
              eyebrow="Gift Bundles"
              title="The whole set, in one tap"
              intro="We've boxed up the perfect combinations — a portrait, a keepsake, the everyday piece — so you can give the complete gift without overthinking it."
            />
            <div className="mt-8 flex justify-center gap-3">
              <Button href="/collections" size="lg" variant="ghost">
                Or browse collections
              </Button>
            </div>
          </Section>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bundles.map((bundle) => (
            <BundleCard key={bundle.slug} bundle={bundle} />
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="bg-sunrise rounded-[2rem] px-8 py-14 text-center ring-1 ring-ink/10 sm:px-16">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Want a bundle built around your photo?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">
            Upload a favorite and we&apos;ll proof every piece in the set before
            you pay a cent.
          </p>
          <Button href="/upload" size="lg" className="mt-8">
            Upload a photo to start
          </Button>
        </div>
      </Section>
    </>
  );
}
