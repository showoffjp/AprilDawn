import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/effects/Magnetic";
import { Badge } from "@/components/ui/Badge";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { StoryCard } from "@/components/cards/StoryCard";
import { stories } from "@/lib/stories";
import { reviews, aggregate } from "@/lib/reviews";
import { Reveal } from "@/components/ui/Reveal";
import { PartnerMarquee } from "@/components/site/PartnerMarquee";
import { StatsBand } from "@/components/effects/StatsBand";
import { BeforeAfterSlider } from "@/components/effects/BeforeAfterSlider";
import { Aurora } from "@/components/effects/Aurora";
import { HeroCollage } from "@/components/home/HeroCollage";
import { MemoryMarquee } from "@/components/home/MemoryMarquee";
import { Benefits } from "@/components/home/Benefits";
import { BentoFlagships } from "@/components/home/BentoFlagships";
import { EventsTeaser } from "@/components/home/EventsTeaser";
import { PrintShowcase } from "@/components/home/PrintShowcase";
import { ArtStyleTeaser } from "@/components/home/ArtStyleTeaser";
import { CreateGrid } from "@/components/home/CreateGrid";
import { HeroSearch } from "@/components/home/HeroSearch";
import { StudioBento } from "@/components/home/StudioBento";
import { MagicLayers } from "@/components/home/MagicLayers";
import { ProductMockup } from "@/components/cart/ProductMockup";
import { featuredServices } from "@/lib/services";
import { heroBundle } from "@/lib/occasions";
import { trustStats, site } from "@/lib/site";
import { fromPrice } from "@/lib/utils";

export default function Home() {
  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="bg-sunrise bg-grain relative overflow-hidden">
        <Aurora />
        <Container className="relative grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-2 lg:py-28">
          <div className="text-center lg:text-left">
            <Badge>✨ The everything store for memories</Badge>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.03] tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Keep your reveries{" "}
              <span className="text-gradient text-gradient-animated">forever.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-soft lg:mx-0">
              Upload a photo — or mail us the whole shoebox. AprilDawn digitizes,
              restores, and reimagines your photos, film, and video, then prints
              them on <em>literally anything</em>: t-shirts, gallery walls,
              cakes, vinyl, and the living LED memory wall in your hallway.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Magnetic>
                <Button href="/upload" size="lg">
                  Upload a photo
                </Button>
              </Magnetic>
              <Magnetic>
                <Button href="/services" size="lg" variant="ghost">
                  Explore everything we make
                </Button>
              </Magnetic>
            </div>
            <HeroSearch />
            <p className="mt-5 text-sm text-ink-soft">
              100% remote · mail it in or upload · free proofs · happiness guarantee
            </p>
            <Link
              href="/reviews"
              className="mt-5 inline-flex items-center gap-2 text-sm text-ink-soft transition hover:text-ink"
            >
              <span className="text-dawn-400">★★★★★</span>
              <span>
                <strong className="text-ink">{aggregate.rating}/5</strong> · loved
                by {aggregate.count.toLocaleString()}+ families
              </span>
            </Link>
          </div>
          <HeroCollage />
        </Container>
      </section>

      {/* ------------------------------------------------ Start anywhere tiles */}
      <Section>
        <SectionHeading
          center
          eyebrow="Start anywhere"
          title="What would you like to make?"
          intro="Pick a starting point — or upload a photo and we'll guide you the rest of the way."
        />
        <Reveal className="mt-10">
          <CreateGrid />
        </Reveal>
      </Section>

      {/* --------------------------------------------------------- Trust stats */}
      <div className="border-y border-ink/10 bg-cream-deep">
        <Container className="py-8">
          <StatsBand stats={trustStats} />
        </Container>
      </div>

      {/* ----------------------------------------------- Everything, one place */}
      <Section>
        <SectionHeading
          center
          title="Everything to keep a memory — in one place"
          intro="From a single photo to a lifetime of media, every tool lives under one warm roof."
        />
        <Reveal className="mt-10">
          <StudioBento />
        </Reveal>
      </Section>

      {/* ------------------------------------------------------ Featured grid */}
      <Section backdrop="rose">
        <SectionHeading
          center
          eyebrow="Everything, under one dawn"
          title="One memory. Infinite ways to keep it."
          intro="Start with a single photo and turn it into anything — or send us a lifetime of media to rescue all at once."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.slice(0, 6).map((service, i) => (
            <Reveal key={service.slug} delay={i * 60} className="h-full">
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------ Flagship experiences */}
      <Section className="pt-0" backdrop="dusk">
        <SectionHeading
          center
          eyebrow="Flagship experiences"
          title="The things only AprilDawn makes"
          intro="Beyond prints and scans — the experiences that turn a pile of photos into something alive."
        />
        <div className="mt-10">
          <BentoFlagships />
        </div>
      </Section>

      {/* ----------------------------------------------- Aiken, SC events */}
      <Section className="pt-0">
        <SectionHeading
          eyebrow="Now booking · Aiken, SC"
          title="Weddings & family reunions, all over South Carolina"
          intro="Full-service planning and photography run out of Aiken — then every photo hand-enhanced and printed on anything you like."
        />
        <Reveal className="mt-10">
          <EventsTeaser />
        </Reveal>
        <div className="mt-8 text-center">
          <Button href="/events" variant="ghost">
            Explore AprilDawn Events →
          </Button>
        </div>
      </Section>

      {/* ------------------------------------------------- Wall of memories */}
      <Section className="pt-0" backdrop="candy">
        <SectionHeading
          center
          eyebrow="A lifetime of moments"
          title="Every memory, brought back to color"
          intro="Birthdays, beaches, weddings, snow days — whatever you send us comes home vivid, restored, and ready to live on everything."
        />
        <div className="mt-10">
          <MemoryMarquee />
        </div>
      </Section>

      {/* ----------------------------------------------------- Magic showcase */}
      <Section>
        <SectionHeading
          center
          eyebrow="The AprilDawn magic"
          title="Watch a flat photo come alive"
          intro="Hover over it: we lift your memory into layers, restore the color, and make it pop right off the page."
        />
        <div className="mt-14 pb-6">
          <MagicLayers />
        </div>
      </Section>

      {/* ----------------------------------------------- Masterpiece portraits */}
      <Section className="pt-0">
        <SectionHeading
          center
          eyebrow="Masterpiece portraits"
          title="See your family in the style of the masters"
          intro="Van Gogh, Monet, Warhol, and more — we reimagine your favorite photo as a hand-finished painting, then print it on anything you like."
        />
        <div className="mt-12">
          <ArtStyleTeaser />
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3 text-center">
          <Button href="/services/masterpieces">Turn a photo into art →</Button>
          <Button href="/gallery" variant="ghost">
            See the full gallery
          </Button>
        </div>
      </Section>

      {/* -------------------------------------------------------- How it works */}
      <Section backdrop="ocean">
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
                className="rounded-3xl bg-white p-8 shadow-soft ring-1 ring-ink/10"
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

      {/* ------------------------------------------------------- Before/After */}
      <Section backdrop="sunset">
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
      <Section backdrop="meadow">
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
      <Section backdrop="amber">
          <SectionHeading
            eyebrow="Print on anything"
            title="T-shirts are just the beginning"
            intro="If it has a surface, your memory belongs on it. Browse a few favorites — there are thousands more in the shop."
          />
          <div className="mt-12">
            <PrintShowcase />
          </div>
          <div className="mt-10">
            <Button href="/shop">Browse the full shop →</Button>
          </div>
        </Section>

      {/* ------------------------------------------------------- Troll Grandma */}
      <Section backdrop="rose">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <ProductMockup kind="apparel" photo={{ scene: "birthday" }} />
              <ProductMockup kind="mug" photo={{ scene: "birthday" }} />
              <ProductMockup kind="frame" photo={{ scene: "birthday" }} />
              <ProductMockup kind="default" photo={{ scene: "birthday" }} />
            </div>
            <p className="mt-5 text-center font-display text-xl font-semibold text-ink">
              {heroBundle.tagline}
            </p>
            <p className="mt-1 text-center text-sm text-ink-soft">
              {fromPrice(heroBundle.priceFrom)} · ships in time for the party
            </p>
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
      <Section backdrop="dusk">
          <SectionHeading
            center
            eyebrow="Loved by families"
            title="Memories, rescued and reborn"
            intro={`Rated ${aggregate.rating}/5 by ${aggregate.count.toLocaleString()}+ families across all 50 states.`}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {reviews.slice(0, 3).map((r) => (
              <figure
                key={r.name}
                className="flex flex-col rounded-3xl bg-white p-7 shadow-soft ring-1 ring-ink/10"
              >
                <div className="text-dawn-400" aria-hidden="true">
                  {"★".repeat(r.rating)}
                </div>
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink">
                  “{r.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-dawn-300 to-dusk-400 text-sm font-semibold text-white">
                    {r.name
                      .split(" ")
                      .filter((w) => w[0] === w[0]?.toUpperCase())
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">
                      {r.name}
                    </span>
                    <span className="block text-xs text-ink-soft">
                      {r.location}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button href="/reviews" variant="ghost">
              Read all reviews →
            </Button>
          </div>
        </Section>

      {/* ------------------------------------------------------------- Stories */}
      <Section backdrop="ocean">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="From the journal" title="Stories worth keeping" />
          <Link
            href="/stories"
            className="hidden shrink-0 text-sm font-semibold text-dawn-600 hover:underline sm:block"
          >
            All stories →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {stories.slice(0, 3).map((s, i) => (
            <Reveal key={s.slug} delay={i * 60} className="h-full">
              <StoryCard story={s} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* --------------------------------------------------------- Consultation */}
      <Section backdrop="sunset">
        <div className="bg-dusk relative overflow-hidden rounded-[2rem] px-8 py-14 text-center text-white sm:px-16">
          <Eyebrow>
            <span className="text-dawn-200">Fully remote, always</span>
          </Eyebrow>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-semibold text-balance sm:text-4xl">
            Want a human in your corner?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Everything is done remotely — upload or mail it in, and it ships back
            to your door. But if you&apos;d like a hand, book a free 15-minute
            consultation and we&apos;ll plan your project together.
          </p>
          <Button href="/contact" size="lg" variant="light" className="mt-7">
            Book a free consultation
          </Button>
        </div>
      </Section>

      {/* ------------------------------------------------------------ Partners */}
      <Section backdrop="meadow">
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

      {/* -------------------------------------------------------- Our promise */}
      <Section backdrop="candy">
          <SectionHeading center eyebrow="Our promise" title="The AprilDawn guarantee" />
          <div className="mt-10">
            <Benefits />
          </div>
        </Section>

      {/* ----------------------------------------------------------- Final CTA */}
      <Section backdrop="amber">
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
