import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/Legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="June 2026">
      <p>
        Welcome to AprilDawn. By using our site and services, you agree to these
        terms. Please read them alongside our Privacy Policy and Content &amp;
        Rights policy.
      </p>
      <h2>Your content & rights</h2>
      <p>
        You keep all rights to the media you provide. You grant AprilDawn a
        limited license to process, restore, print, and deliver your order. You
        confirm you have the right to use any photo, audio, or video you upload.
      </p>
      <h2>Proofs, orders & guarantee</h2>
      <ul>
        <li>Custom work includes free proofs; you approve before we finalize.</li>
        <li>We back orders with a 100% happiness guarantee — talk to us if anything is wrong.</li>
        <li>Personalized and edible items may be non-returnable once produced.</li>
      </ul>
      <h2>Affiliate links</h2>
      <p>
        Some products are fulfilled by partners. As an Amazon Associate we earn
        from qualifying purchases. These links never cost you more.
      </p>
      <h2>Acceptable use</h2>
      <p>
        Don&apos;t upload content you don&apos;t have rights to, or that is
        unlawful. We may decline or remove orders that violate these terms or our
        content policy.
      </p>
    </LegalPage>
  );
}
