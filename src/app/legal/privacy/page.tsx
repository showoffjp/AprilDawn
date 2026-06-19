import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/Legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="June 2026">
      <p>
        Your memories are deeply personal, and we treat them that way. This
        policy explains what we collect, how we use it, and the control you have.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li><strong>Media you upload or mail in</strong> — photos, video, audio, and the metadata attached to them.</li>
        <li><strong>Account & order details</strong> — name, contact info, shipping address, and payment tokens (we never store full card numbers).</li>
        <li><strong>Connected services</strong> — with your permission, birthdays and calendar events from Google, Microsoft, Apple, or Facebook, used only to power reminders.</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To digitize, restore, print, and deliver what you ordered.</li>
        <li>To send proofs, order updates, and the occasion reminders you opt into.</li>
        <li>To improve our service — never by selling your memories.</li>
      </ul>
      <h2>Your control</h2>
      <ul>
        <li>Export or permanently delete your vault at any time.</li>
        <li>Disconnect any integration with one click.</li>
        <li>Request a copy of your data or its deletion under GDPR/CCPA.</li>
      </ul>
      <h2>Security</h2>
      <p>
        Files are encrypted in transit and at rest, access is least-privilege,
        and physical originals are tracked and returned insured.
      </p>
    </LegalPage>
  );
}
