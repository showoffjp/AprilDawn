import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Memory Mail",
  description:
    "The greeting card and photobook, reborn. Real cards mailed to real doorsteps — with embedded audio and video you scan, tap, or watch in AR.",
};

const formats = [
  {
    emoji: "💌",
    name: "Talking Cards",
    blurb:
      "Beautiful photo cards mailed for you, each carrying a recorded voice or video message via QR, NFC tap, or AR playback.",
    price: "from $7",
  },
  {
    emoji: "📖",
    name: "Living Photobooks",
    blurb:
      "Lay-flat books where pages come alive — narration in your own voice and embedded video clips beside the stills.",
    price: "from $39",
  },
  {
    emoji: "🗓️",
    name: "Family Card Plans",
    blurb:
      "Set your whole family list once; we design, print, and mail cards for every birthday and holiday automatically.",
    price: "from $12/mo",
  },
];

export default function MemoryMailPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-rose-200 via-pink-200 to-purple-200">
        <Container className="py-20 sm:py-28">
          <div className="max-w-3xl">
            <Badge>💌 The mail card, reborn</Badge>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
              Memory Mail
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
              We&apos;re bringing back the mail card business — and giving it a
              voice. Custom photo cards and photobooks, professionally printed and
              mailed to real doorsteps, each one carrying embedded audio and video.
              Scan the QR, tap the NFC chip, or point a phone at the photo and watch
              a video hug play right on top of the print.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/upload" size="lg">
                Make a card
              </Button>
              <Button href="#formats" size="lg" variant="ghost">
                See the formats
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section id="formats">
        <SectionHeading
          eyebrow="Formats"
          title="Printed keepsakes that play"
          intro="Every Memory Mail piece can carry a recorded message — pressed into the card itself, ready the moment it lands in the mailbox."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {formats.map((f) => (
            <div
              key={f.name}
              className="flex flex-col rounded-3xl bg-white p-8 ring-1 ring-ink/10"
            >
              <span className="text-5xl" aria-hidden="true">
                {f.emoji}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold">
                {f.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                {f.blurb}
              </p>
              <p className="mt-4 font-semibold text-ink">{f.price}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="bg-cream-deep">
        <Section>
          <SectionHeading
            eyebrow="How the magic gets in the card"
            title="Three ways every card comes alive"
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { t: "📷 Scan", d: "A discreet QR code opens your video or audio message instantly — works on any phone, no app required." },
              { t: "👆 Tap", d: "An embedded NFC chip plays the message the moment a phone touches the card. Pure magic for kids and grandparents." },
              { t: "🪄 AR", d: "Point the AprilDawn app at the printed photo and the video plays right on top of it, like the picture came to life." },
            ].map((s) => (
              <div key={s.t} className="rounded-3xl bg-white p-8 ring-1 ring-ink/10">
                <h3 className="font-display text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.d}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Section>
        <div className="bg-dusk rounded-[2rem] px-8 py-14 text-center text-white">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold text-balance">
            Send Grandma a card that hugs back.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Record from your phone. We print, embed, and mail. She scans — and
            hears your voice.
          </p>
          <Button href="/upload" size="lg" className="mt-8">
            Create a talking card
          </Button>
        </div>
      </Section>
    </>
  );
}
