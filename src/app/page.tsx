import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { Reveal } from "@/components/ui/Reveal";
import { PartnerMarquee } from "@/components/site/PartnerMarquee";
import { StatsBand } from "@/components/effects/StatsBand";
import { BeforeAfterSlider } from "@/components/effects/BeforeAfterSlider";
import { featuredServices } from "@/lib/services";
import { bestsellers } from "@/lib/products";
import { heroBundle } from "@/lib/occasions";
import { trustStats, site } from "@/lib/site";
import { fromPrice } from "@/lib/utils";

export default function Home() {
  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="bg-sunrise animate-gradient relative overflow-hidden">
        <div
          aria-hidden="true"
          className="animate-float pointer-events-none absolute -left-20 top-8 h-56 w-56 rounded-full bg-dawn-300/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="animate-float pointer-events-none absolute -right-16 top-28 h-64 w-64 rounded-full bg-amber-300/30 blur-3xl"
          style={{ animationDelay: "1.6s" }}
        />
        <Container className="relative py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge>✨ The everything store for memories</Badge>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
              Why lose your reveries forever when you can keep them{" "}
              <span className="text-gradient">permanently?</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Upload a photo — or mail us the whole shoebox. AprilDawn digitizes,
              restores, and reimagines your photos, film, and video, then prints
              them on <em>literally anything</em>: t-shirts, gallery walls,
              cakes, vinyl, and the living LED memory wall in your hallway.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/upload" size="lg">
                Upload a photo
              </Button>
              <Button href="/services" size="lg" variant="ghost">
                Explore everything we make
              </Button>
            </div>
            <p className="mt-5 text-sm text-ink-soft">
              No account needed to start · Free proofs · 100% happiness guarantee
            </p>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------- Trust stats */}
      <div className="border-y border-ink/10 bg-cream-deep">
        <Container className="py-8">
          <StatsBand stats={trustStats} />
        </Container>
      </div>

      {/* ------------------------------------------------------ Featured grid */}
      <Section>
        <SectionHeading
          center
          eyebrow="Everything, under one dawn"
          title="One memory. Infinite ways to keep it."
          intro="Start with a single photo and turn it into anything — or send us a lifetime of media to rescue all at once."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service, i) => (
            <Reveal key={service.slug} delay={i * 60} className="h-full">
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* -------------------------------------------------------- How it works */}
      <div className="bg-cream-deep">
        <Section>
          <SectionHeading
            eyebrow="How it works"
            title="From shoebox to masterpiece in three steps"
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "Send it in",
                d: "Drag-and-drop your photos and videos, or order a prepaid MemoryBox and mail us the originals. We track every item with photo check-ins.",
              },
              {
                n: "02",
                t: "We work our magic",
                d: "Archival scanning, AI-assisted restoration finished by real artists, transcription, and studio-grade printing — you approve every proof.",
              },
              {
                n: "03",
                t: "Keep it forever",
                d: "Download your vault, receive your prints and gifts, and let your Living Wall and auto-gifting keep the memories alive for the rest of your life.",
              },
            ].map((step) => (
              <div
                key={step.n}
                className="rounded-3xl bg-white p-8 ring-1 ring-ink/10"
              >
                <div className="font-display text-4xl font-semibold text-dawn-300">
                  {step.n}
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">
                  {step.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {step.d}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Button href="/how-it-works" variant="ghost">
              See the full process →
            </Button>
          </div>
        </Section>
      </div>

      {/* ------------------------------------------------------- Before/After */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>See the magic</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Watch a faded memory come back to life.
            </h2>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Drag the slider to reveal what our restoration studio does —
              repairing damage, lifting color, and sharpening detail until it
              looks like the day it was taken. Every restoration ships with a
              free proof first.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/services/restore">Restore a photo</Button>
              <Button href="/upload" variant="ghost">
                Upload to try
              </Button>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <BeforeAfterSlider />
            <p className="mt-3 text-center text-xs text-ink-soft">
              ← drag to compare →
            </p>
          </Reveal>
        </div>
      </Section>

      {/* --------------------------------------------------- Living Wall hero */}
      <Section>
        <div className="bg-dusk overflow-hidden rounded-[2rem] text-white">
          <div className="grid items-center gap-10 p-10 sm:p-14 lg:grid-cols-2">
            <div>
              <Eyebrow>
                <span className="text-dawn-200">Flagship experience</span>
              </Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-balance sm:text-4xl">
                The Living Wall: a 100-photo collage that glows and remembers.
              </h2>
              <p className="mt-4 max-w-lg leading-relaxed text-white/80">
                A giant printed mosaic of your family, custom-laid for your wall —
                with a slim embedded LED frame that cycles through every photo and
                video, updating itself the moment someone adds a new memory from
                their phone.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/living-wall" variant="primary">
                  Design your Living Wall
                </Button>
                <Button href="/living-wall" variant="light">
                  Watch it move
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-4 gap-2 rounded-2xl bg-white/10 p-3 ring-1 ring-white/20">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-lg ${
                      i === 5 || i === 6 || i === 9 || i === 10
                        ? "col-span-1 row-span-1 animate-pulse bg-gradient-to-br from-dawn-300 to-dusk-400 ring-2 ring-white/60"
                        : "bg-white/15"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-3 text-center text-xs text-white/60">
                The four bright tiles are the live LED center — always changing.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* --------------------------------------------------- Print on anything */}
      <div className="bg-cream-deep">
        <Section>
          <SectionHeading
            eyebrow="Print on anything"
            title="T-shirts are just the beginning"
            intro="If it has a surface, your memory belongs on it. Browse a few favorites — there are thousands more in the shop."
          />
          <div className="mt-10 flex flex-wrap gap-3">
            {bestsellers.map((p) => (
              <span
                key={p.slug}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink ring-1 ring-ink/10"
              >
                <span aria-hidden="true">{p.emoji}</span>
                {p.name}
                <span className="text-ink-soft">{fromPrice(p.priceFrom)}</span>
              </span>
            ))}
          </div>
          <div className="mt-8">
            <Button href="/shop">Browse the full shop →</Button>
          </div>
        </Section>
      </div>

      {/* ------------------------------------------------------- Troll Grandma */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="rounded-[2rem] bg-gradient-to-br from-amber-200 via-dawn-200 to-dusk-400/40 p-10 text-center">
              <div className="text-7xl">👵🎂</div>
              <p className="mt-4 font-display text-2xl font-semibold text-ink">
                {heroBundle.tagline}
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                {fromPrice(heroBundle.priceFrom)} · ships in time for the party
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <Eyebrow>Occasions &amp; auto-gifting</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Never miss a birthday — and troll Grandma with 1000% love.
            </h2>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Connect Google, Outlook, Apple, and Facebook, and AprilDawn reminds
              you before every birthday and anniversary — then sends the perfect
              gift in one tap. For her 90th? Put Grandma&apos;s face on every
              shirt, mug, cake, and vinyl at the party.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-ink-soft">
              {heroBundle.includes.slice(0, 4).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 text-dawn-500">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/occasions">Set up reminders</Button>
              <Button href="/occasions" variant="ghost">
                See the gag bundles
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* -------------------------------------------------------- Testimonials */}
      <div className="bg-cream-deep">
        <Section>
          <SectionHeading center title="Memories, rescued and reborn" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                q: "They restored my parents' torn 1952 wedding photo and put it on canvas. My mom cried. I cried. The mail carrier probably cried.",
                a: "Renata G.",
              },
              {
                q: "We mailed in 9 boxes of slides from the attic. Got back a searchable album and a Living Wall that my whole family adds to. Worth every penny.",
                a: "The Okafor family",
              },
              {
                q: "Grandma's 90th had her face on 30 hoodies, a cake, and a vinyl record. She 'hated' it and has worn the hoodie every day since.",
                a: "Marcus T.",
              },
            ].map((t) => (
              <figure
                key={t.a}
                className="flex flex-col rounded-3xl bg-white p-7 ring-1 ring-ink/10"
              >
                <div className="text-dawn-400" aria-hidden="true">
                  ★★★★★
                </div>
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink">
                  “{t.q}”
                </blockquote>
                <figcaption className="mt-5 text-sm font-semibold text-ink-soft">
                  — {t.a}
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      </div>

      {/* ------------------------------------------------------------ Partners */}
      <Section>
        <div className="text-center">
          <Eyebrow>Powered by a world of partners</Eyebrow>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            The best printers, makers &amp; platforms — under one dawn
          </h2>
        </div>
        <div className="mt-8">
          <PartnerMarquee />
        </div>
        <div className="mt-6 text-center">
          <Button href="/partners" variant="ghost">
            Meet the network →
          </Button>
        </div>
      </Section>

      {/* ----------------------------------------------------------- Final CTA */}
      <Section>
        <div className="bg-sunrise rounded-[2rem] px-8 py-16 text-center ring-1 ring-ink/10 sm:px-16">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Your memories deserve more than a dusty drawer.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">
            Start with one photo today. Keep them all forever.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/upload" size="lg">
              Start a project
            </Button>
            <Button href="/contact" size="lg" variant="ghost">
              Prefer we handle it? Talk to us
            </Button>
          </div>
          <p className="mt-6 text-sm text-ink-soft">
            Questions? Email{" "}
            <Link href={`mailto:${site.email}`} className="font-medium text-dawn-600">
              {site.email}
            </Link>
          </p>
        </div>
      </Section>
    </>
  );
}
