import { site } from "@/lib/site";
import type { Product } from "@/lib/products";

/**
 * Product + Offer structured data for a product page (helps it qualify for
 * product rich results with price + availability). We intentionally omit
 * aggregateRating here: our reviews are brand-wide, not per-product, and
 * Google expects product rating markup to reflect that specific product.
 */
export function ProductJsonLd({ product }: { product: Product }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.blurb,
    category: product.category,
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.priceFrom,
      availability: "https://schema.org/InStock",
      url: `${site.url}/shop/${product.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
