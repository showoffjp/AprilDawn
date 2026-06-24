import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/cards/ProductCard";
import { CollectionCard } from "@/components/collections/CollectionCard";
import { MemoryScene } from "@/components/art/MemoryScene";
import {
  collections,
  getCollection,
  collectionProducts,
} from "@/lib/collections";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

// Unknown slugs 404 rather than rendering on-demand.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: "Collection not found" };
  return {
    title: `${collection.title} — Gift Collection`,
    description: collection.intro,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const items = collectionProducts(collection);
  const others = collections.filter((c) => c.slug !== collection.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: collection.title,
    description: collection.intro,
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
          <MemoryScene
            variant={collection.scene}
            uid={`hero-${collection.slug}`}
            style={{ filter: "saturate(1.05)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/85 to-cream/40" />
        </div>
        <Container className="relative py-16">
          <Link
            href="/collections"
            className="text-sm font-medium text-ink-soft hover:text-ink"
          >
            ← All collections
          </Link>
          <div className="mt-6 max-w-2xl">
            <div className="text-5xl" aria-hidden="true">
              {collection.emoji}
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              {collection.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              {collection.intro}
            </p>
            <p className="mt-5 text-sm font-medium text-ink-soft">
              {items.length} hand-picked gifts · free proofs · ships nationwide
            </p>
          </div>
        </Container>
      </section>

      <Section className="pt-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Section>

      <div className="bg-cream-deep">
        <Section>
          <h2 className="font-display text-2xl font-semibold">
            More collections
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((c) => (
              <CollectionCard key={c.slug} collection={c} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/upload" size="lg">
              Upload a photo to start
            </Button>
          </div>
        </Section>
      </div>
    </>
  );
}
