import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Digitize, restore, print, and reimagine your memories. Explore every AprilDawn service — from archival scanning to the Living Wall.",
};

export default function ServicesPage() {
  return (
    <>
      <Section>
        <SectionHeading
          as="h1"
          center
          eyebrow="Services"
          title="Everything we can do with a memory"
          intro="Start with one photo, or send us a lifetime of media. Pick a service to see how it works, pricing, and turnaround."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid items-center gap-8 rounded-[2rem] bg-dusk p-8 text-white sm:p-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-dawn-200">
              <span aria-hidden="true">📷</span> New photos, too — Aiken, SC
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-balance">
              We don&apos;t just rescue memories. We make them.
            </h2>
            <p className="mt-3 max-w-lg text-white/80">
              Our Aiken photography studio shoots families, seniors, newborns,
              couples, and events across the CSRA — then hand-enhances every
              frame and prints your favorites on anything.
            </p>
          </div>
          <div className="lg:text-right">
            <Button href="/photography" size="lg" variant="light">
              Explore photography →
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
