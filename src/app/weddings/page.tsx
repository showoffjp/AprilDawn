import type { Metadata } from "next";
import { EventOfferingPage } from "@/components/events/EventOfferingPage";
import { getEventOffering } from "@/lib/events";

export const metadata: Metadata = {
  title: "South Carolina Wedding Packages, Planning & Photography",
  description:
    "Full-service wedding planning and photography across the greater South Carolina area — Charleston, Greenville, Columbia, Myrtle Beach, Hilton Head and beyond. Every photo hand-enhanced and printed on anything: albums, canvas, a Living Wall, even your first-dance vinyl.",
};

export default function WeddingsPage() {
  return <EventOfferingPage offering={getEventOffering("weddings")} />;
}
