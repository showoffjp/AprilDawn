import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Aurora } from "@/components/effects/Aurora";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about AprilDawn: formats we digitize, restoration, printing, the Living Wall, Memory Mail, privacy, copyright, and our happiness guarantee.",
};

const faqs: { q: string; a: string }[] = [
  {
    q: "What can I send you to digitize?",
    a: "Prints, Polaroids, panoramas, 35mm/110 negatives, slides, 8mm/Super 8/16mm film reels, VHS/VHS-C/MiniDV/Hi8/Betamax tapes, audio cassettes, microcassettes, reel-to-reel, vinyl, and even glass plate negatives. If it holds a memory, we can almost certainly read it.",
  },
  {
    q: "Will you return my original photos and tapes?",
    a: "Always. Every physical item is inventoried, photographed, and shipped back to you insured. We never discard a memory.",
  },
  {
    q: "How do I get my media to you?",
    a: "Two ways: upload digital files instantly on the site, or order a prepaid, trackable MemoryBox, fill it with originals, and mail it in with the included label. You can follow every item through our lab with photo check-ins.",
  },
  {
    q: "Do I have to pay before I see the result?",
    a: "No. For restorations and custom work you receive free proofs and approve them before anything is finalized, printed, or charged. We back every order with a 100% happiness guarantee.",
  },
  {
    q: "Can you really print my photo on anything?",
    a: "Just about! Apparel, canvas, metal, acrylic, mugs, blankets, puzzles, phone cases — plus the unexpected: edible cake prints, custom vinyl records, skateboards, garden flags, and pet bandanas. Some items ship through our maker network and Amazon partners.",
  },
  {
    q: "What is the Living Wall?",
    a: "A giant printed photo collage custom-designed for your wall, with a slim embedded LED frame that cycles through every photo and video — and updates itself when family members add new memories from their phones.",
  },
  {
    q: "How does Memory Mail embed audio and video?",
    a: "Every card or photobook can carry a recorded message three ways: a scannable QR code, an NFC tap chip, and augmented-reality playback that plays your video right on top of the printed photo.",
  },
  {
    q: "How do birthday reminders and auto-gifting work?",
    a: "Connect Google, Outlook, Apple, or Facebook (or upload a list). We import birthdays and anniversaries, remind you with enough lead time to ship, and suggest a one-tap gift built from your best photos. You approve everything.",
  },
  {
    q: "Who owns the rights to my photos?",
    a: "You do. You retain all rights to your uploads. We only use them to fulfill your order and, where laws like AI 'Living Portrait' features apply, we ask for explicit, informed consent. You can export or delete your vault anytime.",
  },
  {
    q: "Is my data private and secure?",
    a: "Yes. Files are stored encrypted, access is controlled, and we never sell your memories. Integrations are read-limited and you can disconnect them whenever you like.",
  },
];

export default function FaqPage() {
  return (
    <>
      <section className="bg-sunrise bg-grain relative overflow-hidden">
        <Aurora />
        <div className="relative">
          <Section>
            <SectionHeading
              center
              eyebrow="FAQ"
              title="Questions, answered"
              intro="Still curious? Reach a real person any time — no bots, no runaround."
            />
          </Section>
        </div>
      </section>

      <Section className="pt-0">
        <div className="mx-auto max-w-3xl divide-y divide-ink/10 overflow-hidden rounded-3xl bg-white ring-1 ring-ink/10">
          {faqs.map((f) => (
            <details key={f.q} className="group p-6 open:bg-cream-deep/40">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink">
                {f.q}
                <span className="text-dawn-500 transition group-open:rotate-45">
                  ＋
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="/contact" variant="ghost">
            Ask us anything →
          </Button>
        </div>
      </Section>
    </>
  );
}
