import type { Metadata } from "next";

// The checkout page is a Client Component and can't export metadata itself.
export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your AprilDawn order — free proofs before you pay.",
  robots: { index: false },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
