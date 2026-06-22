import type { Metadata } from "next";
import { EventOfferingPage } from "@/components/events/EventOfferingPage";
import { getEventOffering } from "@/lib/events";

export const metadata: Metadata = {
  title: "South Carolina Family Reunion Packages, Planning & Photography",
  description:
    "Family reunion planning and photography across the greater South Carolina area — parks, beaches, and lake houses. We digitize the whole family archive, enhance the oldest photos, and print your family on anything: matching shirts, photo books, and a Then-&-Now Living Wall.",
};

export default function FamilyReunionsPage() {
  return <EventOfferingPage offering={getEventOffering("family-reunions")} />;
}
