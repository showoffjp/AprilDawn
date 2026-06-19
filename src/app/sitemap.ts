import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/living-wall",
    "/memory-mail",
    "/occasions",
    "/how-it-works",
    "/pricing",
    "/partners",
    "/shop",
    "/upload",
    "/about",
    "/faq",
    "/contact",
  ].map((path) => ({
    url: `${site.url}${path}`,
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

  return [...routes, ...serviceRoutes, ...productRoutes];
}
