import { type Product } from "@/lib/products";
import { amazonAffiliateUrl } from "@/lib/products";
import { fromPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export function ProductCard({ product }: { product: Product }) {
  const href = product.affiliate
    ? amazonAffiliateUrl(`custom photo ${product.name}`)
    : "/upload";

  return (
    <a
      href={href}
      target={product.affiliate ? "_blank" : undefined}
      rel={product.affiliate ? "noopener noreferrer sponsored" : undefined}
      className="group flex flex-col rounded-2xl bg-white p-5 ring-1 ring-ink/10 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-dawn-500/10"
    >
      <div className="flex items-start justify-between">
        <span className="text-4xl" aria-hidden="true">
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
    </a>
  );
}
