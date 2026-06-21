import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Aurora } from "@/components/effects/Aurora";
import { GiftFinder } from "@/components/giftfinder/GiftFinder";

export const metadata: Metadata = {
  title: "Gift Finder",
  description:
    "Answer three quick questions and we'll recommend the perfect personalized memory gift — from restored portraits to the legendary Troll Grandma bundle.",
};

export default function GiftFinderPage() {
  return (
    <section className="bg-sunrise bg-grain relative overflow-hidden">
      <Aurora />
      <Container className="relative">
        <Section>
          <SectionHeading
            center
            eyebrow="Gift Finder"
            title="Not sure what to make? We'll help."
            intro="Three quick questions and we'll point you to the perfect personalized gift."
          />
          <div className="mt-12">
            <GiftFinder />
          </div>
          <p className="mt-8 text-center text-sm text-ink-soft">
            In a hurry? The{" "}
            <Link
              href="/occasions"
              className="font-semibold text-dawn-600 hover:underline"
            >
              Troll Grandma bundle
            </Link>{" "}
            is our most-gifted pick — her face on everything at the party.
          </p>
        </Section>
      </Container>
    </section>
  );
}
