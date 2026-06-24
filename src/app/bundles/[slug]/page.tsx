import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ProductCard } from "@/components/cards/ProductCard";
import { BundleCard } from "@/components/bundles/BundleCard";
import { AddBundleToCart } from "@/components/bundles/AddBundleToCart";
import { MemoryScene } from "@/components/art/MemoryScene";
import {
  bundles,
  getBundle,
  bundleProducts,
  bundlePrice,
} from "@/lib/bundles";
import { fromPrice } from "@/lib/utils";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return bundles.map((b) => ({ slug: b.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bundle = getBundle(slug);
  if (!bundle) return { title: "Bundle not found" };
  return {
    title: `${bundle.title} — Gift Bundle`,
    description: bundle.intro,
  };
}

export default async function BundlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bundle = getBundle(slug);
  if (!bundle) notFound();

  const items = bundleProducts(bundle);
  const price = bundlePrice(bundle);
  const others = bundles.filter((b) => b.slug !== bundle.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: bundle.title,
    description: bundle.intro,
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
          <MemoryScene variant={bundle.scene} uid={`bhero-${bundle.slug}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/85 to-cream/40" />
        </div>
        <Container className="relative py-16">
          <Link
            href="/bundles"
            className="text-sm font-medium text-ink-soft hover:text-ink"
          >
            ← All bundles
          </Link>
          <div className="mt-6 max-w-2xl">
            <div className="text-5xl" aria-hidden="true">
              {bundle.emoji}
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              {bundle.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              {bundle.intro}
            </p>
            <p className="mt-5 font-display text-2xl font-semibold text-ink">
              {fromPrice(price)}{" "}
              <span className="font-sans text-sm font-medium text-ink-soft">
                for all {items.length} pieces
              </span>
            </p>
            <div className="mt-6">
              <AddBundleToCart products={items} />
            </div>
            <p className="mt-4 text-xs text-ink-soft">
              🆓 Free proofs on every piece · no charge until you approve
            </p>
          </div>
        </Container>
      </section>

      <Section className="pt-10">
        <h2 className="font-display text-2xl font-semibold">
          What&apos;s in the set
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Section>

      <div className="bg-cream-deep">
        <Section>
          <h2 className="font-display text-2xl font-semibold">More bundles</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((b) => (
              <BundleCard key={b.slug} bundle={b} />
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}
