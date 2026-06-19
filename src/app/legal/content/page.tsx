import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/Legal";

export const metadata: Metadata = {
  title: "Content & Rights",
  robots: { index: false },
};

export default function ContentRightsPage() {
  return (
    <LegalPage title="Content & Rights" updated="June 2026">
      <p>
        AprilDawn turns your memories into physical and digital keepsakes. To keep
        everyone safe and respected, we ask you to honor a few principles.
      </p>
      <h2>You must have the rights</h2>
      <p>
        Only upload photos, audio, and video that you own or have permission to
        use. Professional studio portraits, for example, may be copyrighted by the
        photographer.
      </p>
      <h2>Consent for likeness & AI features</h2>
      <ul>
        <li>For &ldquo;Living Portrait&rdquo; animation and other AI features, we require explicit, informed consent and clearly label AI-generated motion.</li>
        <li>We decline requests intended to deceive, impersonate, or harm.</li>
      </ul>
      <h2>What we won&apos;t print</h2>
      <ul>
        <li>Content that is unlawful, hateful, or sexually exploitative.</li>
        <li>Trademarked or copyrighted material you don&apos;t have rights to.</li>
        <li>Anything that endangers or harasses a real person.</li>
      </ul>
      <h2>Moderation</h2>
      <p>
        Orders may be reviewed by automated and human moderation. We&apos;ll
        contact you if something needs clarifying, and refund orders we can&apos;t
        fulfill under this policy.
      </p>
    </LegalPage>
  );
}
