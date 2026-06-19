import Link from "next/link";
import { type Product, type ProductCategory } from "@/lib/products";
import { amazonAffiliateUrl } from "@/lib/products";
import { fromPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

const categoryTint: Record<ProductCategory, string> = {
  Apparel: "from-rose-100 to-amber-100",
  "Wall Art": "from-sky-100 to-violet-100",
  Home: "from-emerald-100 to-teal-100",
  Drinkware: "from-amber-100 to-orange-100",
  Accessories: "from-fuchsia-100 to-pink-100",
  "Everything Else": "from-lime-100 to-emerald-100",
};

export function ProductCard({ product }: { product: Product }) {
  const inner = (
    <>
      <div className="flex items-start justify-between">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-2xl ${categoryTint[product.category]}`}
          aria-hidden="true"
        >
          {product.emoji}
        </span>
        {product.bestseller ? <Badge tone="amber">Bestseller</Badge> : null}
        {product.affiliate ? <Badge tone="ink">Amazon</Badge> : null}
      </div>
      <h3 className="mt-4 font-medium text-ink">{product.name}</h3>
      <p className="mt-1 flex-1 text-sm text-ink-soft">{product.blurb}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-ink">
          {fromPrice(product.priceFrom)}
        </span>
        <span className="text-sm font-semibold text-dawn-600 transition group-hover:translate-x-0.5">
          {product.affiliate ? "Shop →" : "Customize →"}
        </span>
      </div>
    </>
  );

  const cardClass =
    "group flex flex-col rounded-2xl bg-white p-5 shadow-soft ring-1 ring-ink/10 transition hover:-translate-y-0.5 hover:shadow-soft-lg";

  if (product.affiliate) {
    return (
      <a
        href={amazonAffiliateUrl(`custom photo ${product.name}`)}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={cardClass}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={`/shop/${product.slug}`} className={cardClass}>
      {inner}
    </Link>
  );
}
