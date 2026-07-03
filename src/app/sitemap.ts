import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { products } from "@/lib/products";
import { stories } from "@/lib/stories";
import { collections } from "@/lib/collections";
import { bundles } from "@/lib/bundles";
import { giftGuides } from "@/lib/giftGuides";
import { photoSessions } from "@/lib/photography";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/photography",
    "/events",
    "/weddings",
    "/family-reunions",
    "/living-wall",
    "/memory-mail",
    "/occasions",
    "/how-it-works",
    "/pricing",
    "/partners",
    "/stories",
    "/reviews",
    "/gallery",
    "/gift-finder",
    "/gifts",
    "/collections",
    "/bundles",
    "/gift-guides",
    "/shop",
    "/upload",
    "/vault",
    "/about",
    "/faq",
    "/contact",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));

  const storyRoutes = stories.map((s) => ({
    url: `${site.url}/stories/${s.slug}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = services
    .filter((s) => !s.href)
    .map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      lastModified: new Date(),
    }));

  const productRoutes = products.map((p) => ({
    url: `${site.url}/shop/${p.slug}`,
    lastModified: new Date(),
  }));

  const collectionRoutes = collections.map((c) => ({
    url: `${site.url}/collections/${c.slug}`,
    lastModified: new Date(),
  }));

  const bundleRoutes = bundles.map((b) => ({
    url: `${site.url}/bundles/${b.slug}`,
    lastModified: new Date(),
  }));

  const guideRoutes = giftGuides.map((g) => ({
    url: `${site.url}/gift-guides/${g.slug}`,
    lastModified: new Date(),
  }));

  const photoSessionRoutes = photoSessions.map((s) => ({
    url: `${site.url}/photography/${s.slug}`,
    lastModified: new Date(),
  }));

  return [
    ...routes,
    ...serviceRoutes,
    ...productRoutes,
    ...collectionRoutes,
    ...bundleRoutes,
    ...guideRoutes,
    ...photoSessionRoutes,
    ...storyRoutes,
  ];
}
