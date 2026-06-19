import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Digitize, restore, print, and reimagine your memories. Explore every AprilDawn service — from archival scanning to the Living Wall.",
};

export default function ServicesPage() {
  return (
    <Section>
      <SectionHeading
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
  );
}
