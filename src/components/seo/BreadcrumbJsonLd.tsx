import { site } from "@/lib/site";

/**
 * BreadcrumbList structured data for detail pages — helps search results show
 * the page's place in the site (Home › Shop › Photo Mug) instead of a bare URL.
 * JSON-LD only; renders nothing visible.
 */
export function BreadcrumbJsonLd({
  trail,
}: {
  /** Ordered crumbs from the root, e.g. [{name:"Shop",path:"/shop"},{name:"Photo Mug",path:"/shop/mug"}] */
  trail: { name: string; path: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      ...trail.map((c, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: c.name,
        item: `${site.url}${c.path}`,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
