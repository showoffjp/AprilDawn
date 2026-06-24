import { site, studio } from "@/lib/site";
import { aggregate } from "@/lib/reviews";

/**
 * LocalBusiness / Photographer structured data for the Aiken-based event
 * verticals — helps these pages rank for local "South Carolina wedding /
 * reunion photographer" searches.
 */
export function EventsJsonLd({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Photographer"],
    name,
    description,
    url: `${site.url}${path}`,
    telephone: studio.phone,
    email: studio.email,
    priceRange: "$$–$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: studio.street,
      addressLocality: studio.city,
      addressRegion: studio.state,
      postalCode: studio.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: studio.geo.lat,
      longitude: studio.geo.lng,
    },
    areaServed: { "@type": "AdministrativeArea", name: "South Carolina" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: aggregate.rating,
      reviewCount: aggregate.count,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
