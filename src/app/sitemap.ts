import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/living-wall",
    "/memory-mail",
    "/occasions",
    "/how-it-works",
    "/pricing",
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

  return [...routes, ...serviceRoutes];
}
