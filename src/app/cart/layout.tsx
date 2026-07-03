import type { Metadata } from "next";

// The cart page is a Client Component and can't export metadata itself.
export const metadata: Metadata = {
  title: "Your cart",
  description: "Review your AprilDawn cart before checkout.",
  robots: { index: false },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
