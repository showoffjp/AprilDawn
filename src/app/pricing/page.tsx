import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { QuoteCalculator } from "@/components/quote/QuoteCalculator";
import { Aurora } from "@/components/effects/Aurora";
import { services } from "@/lib/services";
import { fromPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent AprilDawn pricing: per-scan digitizing, restoration, print-on-anything, the Living Wall, Memory Mail, and free occasion reminders.",
};

const plans = [
  {
    name: "À la carte",
    price: "Pay per item",
    blurb: "Perfect for a single project — one photo, one gift, one box.",
    features: [
      "Digitizing from $0.39 / scan",
      "Restoration from $19 / photo",
      "Print on anything from $12",
      "Free proofs before you pay",
    ],
    cta: "Start a project",
    href: "/upload",
  },
  {
    name: "Family Vault",
    price: "$9/mo",
    blurb: "For families preserving — and gifting — all year round.",
    features: [
      "Lifetime cloud vault for all your media",
      "20% off every print & gift",
      "Auto-gifting & occasion reminders",
      "Priority lab turnaround",
      "Shared family album & Living Wall sync",
    ],
    cta: "Start free trial",
    href: "/contact",
    featured: true,
  },
  {
    name: "Legacy / Estate",
    price: "Custom",
    blurb: "Whole-collection digitizing and white-glove installations.",
    features: [
      "Bulk mail-in digitizing (10k+ items)",
      "Dedicated archivist & project manager",
      "White-glove Living Wall design & install",
      "Custom data delivery & retention",
    ],
    cta: "Talk to us",
    href: "/contact",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="bg-sunrise bg-grain relative overflow-hidden">
        <Aurora />
        <div className="relative">
          <Section>
            <SectionHeading
              center
              eyebrow="Pricing"
              title="Honest pricing. Free proofs. No surprises."
              intro="Pay per project, or join the Family Vault for discounts and auto-gifting. You never pay until you approve a proof."
            />
          </Section>
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow="Instant estimate"
          title="What will your shoebox cost?"
          intro="Add up what you've got and watch the estimate update live. A 10% volume discount kicks in automatically over $200."
        />
        <div className="mt-10">
          <QuoteCalculator />
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`flex flex-col rounded-3xl bg-white p-8 shadow-soft ring-1 ${
                p.featured ? "ring-2 ring-dawn-400" : "ring-ink/10"
              }`}
            >
              {p.featured ? <Badge>Most loved</Badge> : null}
              <h2 className="mt-3 font-display text-2xl font-semibold">
                {p.name}
              </h2>
              <p className="mt-2 font-display text-3xl font-semibold text-ink">
                {p.price}
              </p>
              <p className="mt-2 text-sm text-ink-soft">{p.blurb}</p>
              <ul className="mt-6 flex-1 space-y-2.5 text-sm text-ink-soft">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-0.5 text-dawn-500">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                href={p.href}
                className="mt-7 w-full"
                variant={p.featured ? "primary" : "ghost"}
              >
                {p.cta}
              </Button>
            </div>
          ))}
        </div>
      </Section>

      <div className="bg-cream-deep">
        <Section>
          <SectionHeading
            eyebrow="Starting prices by service"
            title="A quick reference"
          />
          <div className="mt-10 overflow-x-auto rounded-3xl ring-1 ring-ink/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-white">
                <tr className="text-ink">
                  <th className="px-4 py-3 sm:px-6 sm:py-4 font-semibold">Service</th>
                  <th className="px-4 py-3 sm:px-6 sm:py-4 font-semibold">Starting at</th>
                  <th className="hidden px-4 py-3 sm:px-6 sm:py-4 font-semibold sm:table-cell">
                    Turnaround
                  </th>
                </tr>
              </thead>
              <tbody>
                {services.map((s, i) => (
                  <tr
                    key={s.slug}
                    className={i % 2 ? "bg-white" : "bg-cream"}
                  >
                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <span className="mr-2" aria-hidden="true">
                        {s.emoji}
                      </span>
                      {s.name}
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 font-medium text-ink">
                      {typeof s.startingPrice === "number"
                        ? s.startingPrice === 0
                          ? "Free"
                          : fromPrice(s.startingPrice)
                        : "Custom"}
                    </td>
                    <td className="hidden px-4 py-3 sm:px-6 sm:py-4 text-ink-soft sm:table-cell">
                      {s.turnaround ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-ink-soft">
            Prices are illustrative launch estimates. Final quotes depend on
            volume, size, and finishing — and you always see a free proof first.
          </p>
        </Section>
      </div>
    </>
  );
}
