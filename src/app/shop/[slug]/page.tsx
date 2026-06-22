import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProductCard } from "@/components/cards/ProductCard";
import { ProductDesigner } from "@/components/cart/ProductDesigner";
import { RatingInline } from "@/components/social/SocialProof";
import {
  products,
  getProduct,
  productsByCategory,
  pairsWith,
  amazonAffiliateUrl,
} from "@/lib/products";
import { fromPrice } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} — custom photo ${product.category.toLowerCase()}`,
    description: product.blurb,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = productsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);
  const pairs = pairsWith(product, 4);

  return (
    <>
      <Container className="py-10">
        <Link href="/shop" className="text-sm font-medium text-ink-soft hover:text-ink">
          ← Back to the shop
        </Link>

        <div className="mt-6 max-w-2xl">
          <div className="flex flex-wrap gap-2">
            {product.bestseller ? <Badge tone="amber">Bestseller</Badge> : null}
            <Badge tone="ink">{product.category}</Badge>
            <Badge>🆓 Free proofs</Badge>
          </div>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 font-display text-2xl font-semibold text-ink">
            {fromPrice(product.priceFrom)}
          </p>
          <RatingInline className="mt-3" />
          <p className="mt-3 leading-relaxed text-ink-soft">{product.blurb}</p>
        </div>
      </Container>

      <Container className="pb-12">
        {product.affiliate ? (
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="flex aspect-square items-center justify-center rounded-3xl bg-gradient-to-br from-dawn-100 via-cream-deep to-amber-100 text-[8rem] ring-1 ring-ink/10">
              <span aria-hidden="true">{product.emoji}</span>
            </div>
            <div className="rounded-3xl bg-white p-6 ring-1 ring-ink/10">
              <p className="text-sm text-ink-soft">
                This item is fulfilled through our partner network. Shop it on
                Amazon — and as an Amazon Associate, AprilDawn earns from
                qualifying purchases at no extra cost to you.
              </p>
              <Button
                href={amazonAffiliateUrl(`custom photo ${product.name}`)}
                className="mt-4 w-full"
                size="lg"
              >
                Shop on Amazon 🛒
              </Button>
            </div>
          </div>
        ) : (
          <ProductDesigner product={product} />
        )}
      </Container>

      {pairs.length > 0 ? (
        <Section className="pt-0">
          <h2 className="font-display text-2xl font-semibold">Pairs well with</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Customers often turn one memory into a matching set.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pairs.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </Section>
      ) : null}

      {related.length > 0 ? (
        <div className="bg-cream-deep">
          <Section>
            <h2 className="font-display text-2xl font-semibold">
              More {product.category.toLowerCase()}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </Section>
        </div>
      ) : null}
    </>
  );
}
