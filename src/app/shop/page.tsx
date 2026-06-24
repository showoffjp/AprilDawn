import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ShopBrowser } from "@/components/shop/ShopBrowser";
import { CollectionCard } from "@/components/collections/CollectionCard";
import { Aurora } from "@/components/effects/Aurora";
import { products, productCategories } from "@/lib/products";
import { collections } from "@/lib/collections";

export const metadata: Metadata = {
  title: "The Shop — Print on anything",
  description:
    "Put your photos on t-shirts, canvas, mugs, blankets, cakes, vinyl, and thousands more. First-party printing plus Amazon-fulfilled favorites.",
};

export default function ShopPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-200 via-orange-200 to-amber-200">
        <Aurora />
        <div className="relative">
          <Section>
            <SectionHeading
              center
              eyebrow="The AprilDawn Shop"
              title="Your memory belongs on everything"
              intro="T-shirts are just the beginning. Pick a product, drop in a photo, preview it instantly, and we make it real."
            />
            <div className="mt-8 flex justify-center">
              <Button href="/upload" size="lg">
                Upload a photo to start
              </Button>
            </div>
          </Section>
        </div>
      </section>

      <Section className="py-12">
        <ShopBrowser products={products} categories={productCategories} />
      </Section>

      <Section className="pt-0">
        <SectionHeading
          eyebrow="Shop by collection"
          title="Gift guides for everyone on your list"
          intro="Hand-picked edits for grandparents, pet lovers, reunions, memorials, and more."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.slice(0, 3).map((collection) => (
            <CollectionCard key={collection.slug} collection={collection} />
          ))}
        </div>
        <div className="mt-8">
          <Button href="/collections" variant="ghost">
            See all gift collections →
          </Button>
        </div>
      </Section>

      <div className="bg-cream-deep">
        <Section>
          <div className="rounded-3xl bg-white p-8 ring-1 ring-ink/10 sm:p-12">
            <h2 className="font-display text-2xl font-semibold">
              Don&apos;t see what you want? Ask anyway.
            </h2>
            <p className="mt-3 max-w-2xl text-ink-soft">
              If it has a surface, we&apos;ll find a way to put your memory on it —
              edible cake prints, etched vinyl, custom puzzles, garden flags, pet
              bandanas, and the genuinely absurd. Some items ship through our maker
              network and trusted Amazon partners.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/upload">Start a custom request</Button>
              <Button href="/contact" variant="ghost">
                Ask a specialist
              </Button>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}
