import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Uploader } from "@/components/upload/Uploader";

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Upload your photos, videos, and audio to AprilDawn. Free proofs, no charge until you approve. Or order a prepaid MemoryBox to mail in your originals.",
};

export default function UploadPage() {
  return (
    <Section>
      <SectionHeading
        center
        eyebrow="Start a project"
        title="Upload a memory — we&apos;ll take it from here"
        intro="Drop in a single photo or your whole camera roll. Prefer to mail in originals? Order a prepaid MemoryBox below."
      />

      <div className="mx-auto mt-12 max-w-3xl">
        <Uploader />

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { e: "🆓", t: "Free proofs", d: "See it before you pay." },
            { e: "🔒", t: "Private & secure", d: "Your memories stay yours." },
            { e: "📦", t: "Originals returned", d: "We never discard a thing." },
          ].map((b) => (
            <div
              key={b.t}
              className="rounded-2xl bg-cream-deep p-5 text-center ring-1 ring-ink/10"
            >
              <div className="text-2xl">{b.e}</div>
              <div className="mt-2 text-sm font-semibold text-ink">{b.t}</div>
              <div className="text-xs text-ink-soft">{b.d}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-ink p-8 text-cream">
          <h3 className="font-display text-xl font-semibold">
            📦 Prefer to mail in a shoebox?
          </h3>
          <p className="mt-2 text-sm text-cream/80">
            Order a prepaid, trackable MemoryBox. Pack your photos, slides, tapes,
            and reels, ship it with the included label, and follow every item
            through our lab with photo check-ins. Everything comes home insured.
          </p>
        </div>
      </div>
    </Section>
  );
}
