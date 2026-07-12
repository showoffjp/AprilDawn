import { NextResponse } from "next/server";
import { services, serviceHref } from "@/lib/services";
import { products } from "@/lib/products";
import { stories } from "@/lib/stories";
import { giftGuides } from "@/lib/giftGuides";
import { collections } from "@/lib/collections";
import { bundles } from "@/lib/bundles";

export type SearchItem = {
  label: string;
  href: string;
  group: string;
  keywords?: string;
};

// Everything in the index is static content — prerender the JSON at build.
export const dynamic = "force-static";

/**
 * The command palette's catalog, served as a static JSON index so the client
 * bundle never carries the full data modules (story bodies alone are ~100KB
 * of text). All inputs are static, so Next prerenders this at build time.
 */
export async function GET() {
  const items: SearchItem[] = [
    ...services.map((s) => ({
      label: s.name,
      href: serviceHref(s),
      group: "Services",
      keywords: s.tagline,
    })),
    ...products.map((p) => ({
      label: p.name,
      href: `/shop/${p.slug}`,
      group: "Products",
      keywords: p.category,
    })),
    ...stories.map((s) => ({
      label: s.title,
      href: `/stories/${s.slug}`,
      group: "Stories",
      keywords: `${s.category} ${s.excerpt}`,
    })),
    ...giftGuides.map((g) => ({
      label: g.title,
      href: `/gift-guides/${g.slug}`,
      group: "Gift guides",
      keywords: `${g.tagline} occasion gifts`,
    })),
    ...collections.map((c) => ({
      label: c.title,
      href: `/collections/${c.slug}`,
      group: "Collections",
      keywords: c.tagline,
    })),
    ...bundles.map((b) => ({
      label: b.title,
      href: `/bundles/${b.slug}`,
      group: "Bundles",
      keywords: b.tagline,
    })),
  ];
  return NextResponse.json(items);
}
