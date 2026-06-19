import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "From shoebox to masterpiece: how AprilDawn digitizes, restores, prints, and preserves your memories — with free proofs and a happiness guarantee.",
};

const steps = [
  {
    n: "01",
    t: "Send it in — your way",
    d: "Drag-and-drop digital files, or order a prepaid MemoryBox and mail us the originals. Every physical item is inventoried, photographed, and tracked through our lab so you always know where your memories are.",
    points: ["Instant uploads or prepaid mail-in", "Photo check-ins at each step", "Originals insured both ways"],
  },
  {
    n: "02",
    t: "We digitize & transcribe",
    d: "Archival-grade scanning up to 4K/48-bit for photos and film; clean digital masters for video and audio, plus human-reviewed transcripts and captions so spoken memories become searchable text.",
    points: ["Up to 4K archival scans", "Video & audio transcription", "Auto date & face organization"],
  },
  {
    n: "03",
    t: "We restore & reimagine",
    d: "AI-assisted, artist-finished restoration repairs damage, colorizes, and up-resses. Then turn any memory into prints, apparel, hand-painted masterpieces, a Living Wall, or a talking Memory Mail card.",
    points: ["Damage repair & colorization", "Print on 4,000+ products", "You approve every proof"],
  },
  {
    n: "04",
    t: "Keep them forever",
    d: "Download your archival vault, receive your prints and gifts, and let auto-gifting and the Living Wall keep your memories alive and growing for the rest of your life.",
    points: ["Lifetime cloud vault", "Auto-gifting & reminders", "100% happiness guarantee"],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="bg-sunrise">
        <Section>
          <SectionHeading
            center
            eyebrow="How it works"
            title="From a dusty drawer to a lifetime of keepsakes"
            intro="Four simple steps, free proofs at every turn, and your originals always come home."
          />
        </Section>
      </section>

      <Section>
        <div className="space-y-8">
          {steps.map((s) => (
            <div
              key={s.n}
              className="grid gap-6 rounded-3xl bg-white p-8 ring-1 ring-ink/10 md:grid-cols-[auto_1fr] md:gap-10 md:p-10"
            >
              <div className="font-display text-5xl font-semibold text-dawn-300">
                {s.n}
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold">{s.t}</h2>
                <p className="mt-3 leading-relaxed text-ink-soft">{s.d}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="rounded-full bg-cream-deep px-3 py-1 text-xs font-medium text-ink-soft"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/upload" size="lg">
            Start your project
          </Button>
        </div>
      </Section>
    </>
  );
}
