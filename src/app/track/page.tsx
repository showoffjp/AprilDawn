import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { OrderTracker } from "@/components/track/OrderTracker";

export const metadata: Metadata = {
  title: "Track your order",
  description:
    "Check the status of your AprilDawn order — from free proofs to production to delivery.",
};

export default async function TrackPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <Container>
      <Section>
        <div className="mx-auto max-w-xl">
          <SectionHeading
            eyebrow="Order status"
            title="Track your order"
            intro="Enter your order number to see where your keepsakes are — from free proofs to your doorstep."
          />
          <div className="mt-8">
            <OrderTracker initialOrder={order ?? ""} />
          </div>
        </div>
      </Section>
    </Container>
  );
}
