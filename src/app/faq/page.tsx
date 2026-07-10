import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Aurora } from "@/components/effects/Aurora";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about AprilDawn: formats we digitize, restoration, printing, the Living Wall, Memory Mail, privacy, copyright, and our happiness guarantee.",
};

type Faq = { q: string; a: string; cat: string };

const CATEGORIES = [
  "Sending & returns",
  "Proofs, printing & pricing",
  "Turnaround, quality & restoration",
  "Flagship experiences",
  "Privacy & rights",
] as const;

const faqs: Faq[] = [
  {
    cat: "Sending & returns",
    q: "What can I send you to digitize?",
    a: "Prints, Polaroids, panoramas, 35mm/110 negatives, slides, 8mm/Super 8/16mm film reels, VHS/VHS-C/MiniDV/Hi8/Betamax tapes, audio cassettes, microcassettes, reel-to-reel, vinyl, and even glass plate negatives. If it holds a memory, we can almost certainly read it.",
  },
  {
    cat: "Sending & returns",
    q: "Will you return my original photos and tapes?",
    a: "Always. Every physical item is inventoried, photographed, and shipped back to you insured. We never discard a memory.",
  },
  {
    cat: "Sending & returns",
    q: "How do I get my media to you?",
    a: "Two ways: upload digital files instantly on the site, or order a prepaid, trackable MemoryBox, fill it with originals, and mail it in with the included label. You can follow every item through our lab with photo check-ins.",
  },
  {
    cat: "Proofs, printing & pricing",
    q: "Do I have to pay before I see the result?",
    a: "No. For restorations and custom work you receive free proofs and approve them before anything is finalized, printed, or charged. We back every order with a 100% happiness guarantee.",
  },
  {
    cat: "Proofs, printing & pricing",
    q: "Can you really print my photo on anything?",
    a: "Just about! Apparel, canvas, metal, acrylic, mugs, blankets, puzzles, phone cases — plus the unexpected: edible cake prints, custom vinyl records, skateboards, garden flags, and pet bandanas. Some items ship through our maker network and Amazon partners.",
  },
  {
    cat: "Flagship experiences",
    q: "What is the Living Wall?",
    a: "A giant printed photo collage custom-designed for your wall, with a slim embedded LED frame that cycles through every photo and video — and updates itself when family members add new memories from their phones.",
  },
  {
    cat: "Flagship experiences",
    q: "How does Memory Mail embed audio and video?",
    a: "Every card or photobook can carry a recorded message three ways: a scannable QR code, an NFC tap chip, and augmented-reality playback that plays your video right on top of the printed photo.",
  },
  {
    cat: "Flagship experiences",
    q: "How do birthday reminders and auto-gifting work?",
    a: "Connect Google, Outlook, Apple, or Facebook (or upload a list). We import birthdays and anniversaries, remind you with enough lead time to ship, and suggest a one-tap gift built from your best photos. You approve everything.",
  },
  {
    cat: "Privacy & rights",
    q: "Who owns the rights to my photos?",
    a: "You do. You retain all rights to your uploads. We only use them to fulfill your order and, where laws like AI 'Living Portrait' features apply, we ask for explicit, informed consent. You can export or delete your vault anytime.",
  },
  {
    cat: "Privacy & rights",
    q: "Is my data private and secure?",
    a: "Yes. Files are stored encrypted, access is controlled, and we never sell your memories. Integrations are read-limited and you can disconnect them whenever you like.",
  },
  {
    cat: "Sending & returns",
    q: "Is there a minimum order?",
    a: "None. Send a single treasured photo or a whole basement of boxes — we scope every project to what you actually have, and the MemoryBox comes in sizes to match.",
  },
  {
    cat: "Sending & returns",
    q: "I have a whole estate or a lifetime archive — can you handle that?",
    a: "Yes — large family archives and estates are some of our favorite work. Big collections get a dedicated project manager, a full catalog of everything received, and a plan so nothing is lost, duplicated, or missed.",
  },
  {
    cat: "Proofs, printing & pricing",
    q: "How much does a project cost?",
    a: "It depends on what you send and what you'd like made. Digitizing is priced per item, with a lower rate per piece at volume; restorations, prints, and flagship pieces are quoted up front. Tell us what you have and we'll send a clear estimate before you commit to anything.",
  },
  {
    cat: "Proofs, printing & pricing",
    q: "Can I turn one photo into several different gifts?",
    a: "Absolutely — that's the whole idea. One good photo can become a canvas, a mug, a blanket, an ornament, and a stack of prints. Upload it once, then pick as many products as you like; you approve a proof of each before it ships.",
  },
  {
    cat: "Turnaround, quality & restoration",
    q: "How long will my project take?",
    a: "Most digitizing projects wrap in about two to three weeks from when your box arrives. Restorations and custom pieces move to production once you approve your free proof. In a hurry? Ask about rush service when you book.",
  },
  {
    cat: "Turnaround, quality & restoration",
    q: "What resolution do you scan at?",
    a: "Archival grade — up to 4K and 48-bit color for photos and film, with clean digital masters for video and audio. That's plenty of detail to reprint large or restore further down the road without losing quality.",
  },
  {
    cat: "Turnaround, quality & restoration",
    q: "Can you fix a torn, faded, or water-damaged photo?",
    a: "Usually, yes. We repair tears, cracks, water and mold damage, fading, and even missing pieces — finished by a real artist rather than a one-click filter. You'll see a free proof of exactly what's possible before you decide.",
  },
  {
    cat: "Turnaround, quality & restoration",
    q: "Can you colorize black-and-white photos?",
    a: "Yes — and you don't have to choose. We deliver both the restored black-and-white master and a researched, believable color version, so you can frame one, tuck the other away, or hang them side by side.",
  },
  {
    cat: "Turnaround, quality & restoration",
    q: "My only copy is a screenshot or a low-res phone photo. Can you still help?",
    a: "Often. We can up-res, sharpen, and enhance low-quality sources; how far we can take it depends on the original, so we'll give you an honest assessment — and a free proof — before you commit.",
  },
  {
    cat: "Flagship experiences",
    q: "Can I customize the Living Wall's size and layout?",
    a: "Completely. Set the grid to fit your exact wall — up to 12 by 12 — and arrange the tiles yourself: tap to place, drag to fill a region, or drop a specific photo right where you want it. We proof the whole design before anything is printed.",
  },
  {
    cat: "Flagship experiences",
    q: "Do you photograph weddings and events around Aiken?",
    a: "We do — AprilDawn is an Aiken, South Carolina studio shooting weddings, families, seniors, and events across the CSRA. Then we do what no other photographer can: hand-enhance every frame and print your favorites on anything, from canvas to a living LED wall.",
  },
  {
    cat: "Privacy & rights",
    q: "Do you use my photos to train AI?",
    a: "Never. We don't sell your memories and we don't train models on them. Any AI-assisted feature — like a 'Living Portrait' — is opt-in per photo, with your explicit, informed consent.",
  },
];

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="bg-sunrise bg-grain relative overflow-hidden">
        <Aurora />
        <div className="relative">
          <Section>
            <SectionHeading
              as="h1"
              center
              eyebrow="FAQ"
              title="Questions, answered"
              intro="Still curious? Reach a real person any time — no bots, no runaround."
            />
          </Section>
        </div>
      </section>

      <Section className="pt-0">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* Grouped questions */}
          <div className="space-y-10">
            {CATEGORIES.map((cat) => (
              <div key={cat}>
                <h2 className="font-display text-xl font-semibold text-ink">
                  {cat}
                </h2>
                <div className="mt-4 divide-y divide-ink/10 overflow-hidden rounded-3xl bg-white ring-1 ring-ink/10">
                  {faqs
                    .filter((f) => f.cat === cat)
                    .map((f) => (
                      <details key={f.q} className="group p-6 open:bg-cream-deep/40">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink">
                          {f.q}
                          <span className="text-dawn-500 transition group-open:rotate-45">
                            ＋
                          </span>
                        </summary>
                        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                          {f.a}
                        </p>
                      </details>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sticky help card */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-3xl bg-dusk p-8 text-white shadow-soft-lg">
              <p className="font-display text-2xl font-semibold leading-snug">
                Still have a question?
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/80">
                Talk to a real memory specialist — most replies land the same day.
                We&apos;ll help you plan a project, pick a format, or rescue
                something fragile.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Button href="/contact" variant="light">
                  Ask us anything
                </Button>
                <Button href="/contact" variant="light">
                  Book a free consultation
                </Button>
              </div>
              <p className="mt-6 text-sm text-white/70">
                Or email{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-white underline"
                >
                  {site.email}
                </a>
              </p>
            </div>
            <div className="mt-4 rounded-3xl bg-white p-6 text-center ring-1 ring-ink/10">
              <p className="text-sm font-semibold text-ink">
                💯 100% happiness guarantee
              </p>
              <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                Free proofs first. No charge until you approve. Originals always
                returned, insured.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
