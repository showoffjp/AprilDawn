import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/cards/ProductCard";
import { GuideCard } from "@/components/giftguides/GuideCard";
import { CollectionCard } from "@/components/collections/CollectionCard";
import { BundleCard } from "@/components/bundles/BundleCard";
import { MemoryScene } from "@/components/art/MemoryScene";
import {
  giftGuides,
  getGiftGuide,
  guideProducts,
  guideCollection,
  guideBundle,
} from "@/lib/giftGuides";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return giftGuides.map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGiftGuide(slug);
  if (!guide) return { title: "Gift guide not found" };
  return {
    title: guide.title,
    description: guide.lead,
  };
}

export default async function GiftGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGiftGuide(slug);
  if (!guide) notFound();

  const items = guideProducts(guide);
  const collection = guideCollection(guide);
  const bundle = guideBundle(guide);
  const others = giftGuides.filter((g) => g.slug !== guide.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: guide.title,
    description: guide.lead,
    numberOfItems: items.length,
    itemListElement: items.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `${site.url}/shop/${p.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <MemoryScene variant={guide.scene} uid={`ghero-${guide.slug}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/85 to-cream/40" />
        </div>
        <Container className="relative py-16">
          <Link
            href="/gift-guides"
            className="text-sm font-medium text-ink-soft hover:text-ink"
          >
            ← All gift guides
          </Link>
          <div className="mt-6 max-w-2xl">
            <div className="text-5xl" aria-hidden="true">
              {guide.emoji}
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              {guide.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              {guide.lead}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/upload" size="lg">
                Upload a photo to start
              </Button>
              <Button href="/shop" size="lg" variant="ghost">
                Browse the full shop
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section className="pt-10">
        <h2 className="font-display text-2xl font-semibold">Top picks</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Section>

      {collection || bundle ? (
        <div className="bg-cream-deep">
          <Section>
            <h2 className="font-display text-2xl font-semibold">
              Make it easy
            </h2>
            <p className="mt-2 text-ink-soft">
              Prefer a ready-made set? Start from a curated pick.
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {collection ? <CollectionCard collection={collection} /> : null}
              {bundle ? <BundleCard bundle={bundle} /> : null}
            </div>
          </Section>
        </div>
      ) : null}

      <Section>
        <h2 className="font-display text-2xl font-semibold">More gift guides</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((g) => (
            <GuideCard key={g.slug} guide={g} />
          ))}
        </div>
      </Section>
    </>
  );
}
