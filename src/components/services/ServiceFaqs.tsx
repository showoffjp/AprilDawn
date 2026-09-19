import { FaqJsonLd } from "@/components/seo/FaqJsonLd";

/**
 * The "Good to know" block used by service pages — both the generic
 * /services/[slug] detail route and the bespoke flagship pages, so the answers
 * (and their FAQPage markup) don't exist on only one of them.
 */
export function ServiceFaqs({
  faqs,
  className = "",
}: {
  faqs?: { q: string; a: string }[];
  className?: string;
}) {
  if (!faqs || faqs.length === 0) return null;
  return (
    <div className={className}>
      <h2 className="font-display text-2xl font-semibold">Good to know</h2>
      <dl className="mt-6 space-y-5">
        {faqs.map((f) => (
          <div key={f.q}>
            <dt className="font-medium text-ink">{f.q}</dt>
            <dd className="mt-1 text-ink-soft">{f.a}</dd>
          </div>
        ))}
      </dl>
      <FaqJsonLd faqs={faqs} />
    </div>
  );
}
