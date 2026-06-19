import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ReminderForm } from "@/components/occasions/ReminderForm";
import { integrations, giftBundles } from "@/lib/occasions";
import { fromPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Occasions & Auto-Gifting",
  description:
    "Connect Google, Outlook, Apple, and Facebook. AprilDawn reminds you before every birthday and anniversary — then sends the perfect gift in one tap.",
};

export default function OccasionsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-orange-200 via-amber-200 to-yellow-200">
        <Container className="py-20 sm:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <Badge>🎂 Occasions &amp; auto-gifting</Badge>
              <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl">
                Never miss a birthday again.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/80">
                Connect your contacts and calendars once. AprilDawn watches for
                every upcoming birthday and anniversary, nudges you with enough
                lead time to ship, and suggests the perfect gift built from your
                best photos — approved in a single tap.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="#connect" size="lg">
                  Connect an account
                </Button>
                <Button href="#bundles" size="lg" variant="ghost">
                  See gag bundles
                </Button>
              </div>
            </div>
            <ReminderForm />
          </div>
        </Container>
      </section>

      {/* Integrations */}
      <Section id="connect">
        <SectionHeading
          eyebrow="Connect once, never forget"
          title="Bring your birthdays in from everywhere"
          intro="We import dates securely and only read what you allow. You stay in control — disconnect anytime."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((i) => (
            <div
              key={i.key}
              className="flex flex-col rounded-3xl bg-white p-6 ring-1 ring-ink/10"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl" aria-hidden="true">
                  {i.emoji}
                </span>
                <h3 className="font-semibold text-ink">{i.name}</h3>
              </div>
              <p className="mt-3 flex-1 text-sm text-ink-soft">{i.what}</p>
              <p className="mt-4 text-xs text-ink-soft">🔒 {i.scope}</p>
              <Button href="/contact" variant="ghost" size="sm" className="mt-4">
                Connect
              </Button>
            </div>
          ))}
        </div>
      </Section>

      {/* Bundles */}
      <div className="bg-cream-deep">
        <Section id="bundles">
          <SectionHeading
            eyebrow="Curated bundles"
            title="One tap. Perfect gift. Maximum love."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {giftBundles.map((b) => (
              <div
                key={b.slug}
                className={`flex flex-col rounded-3xl bg-white p-8 ring-1 ${
                  b.hero ? "ring-2 ring-dawn-400" : "ring-ink/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-5xl" aria-hidden="true">
                    {b.emoji}
                  </span>
                  {b.hero ? <Badge tone="amber">Legendary</Badge> : null}
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">
                  {b.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-dawn-600">
                  {b.tagline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {b.description}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                  {b.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-0.5 text-dawn-500">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center justify-between">
                  <span className="font-semibold text-ink">
                    {fromPrice(b.priceFrom)}
                  </span>
                  <Button href="/upload" size="sm" variant={b.hero ? "primary" : "ghost"}>
                    Build this
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Auto-scheduling + gift-box partners */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Set it and forget it"
              title="Gifts that arrive right on time — automatically"
              intro="Schedule a card or gift once and AprilDawn handles the rest: we build it from your photos, print it, box it, and ship it to land on the big day. You'll get a heads-up to approve before anything sends."
            />
            <ul className="mt-6 space-y-2.5 text-sm text-ink-soft">
              {[
                "Pick a date — birthday, anniversary, holiday, or a custom day",
                "We schedule production with lead time to ship on time",
                "Approve the proof in one tap (or let it auto-send)",
                "Premium gift boxes and a handwritten note, optional",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-0.5 text-dawn-500">✓</span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <Button href="#connect">Turn on auto-gifting</Button>
            </div>
          </div>

          <div className="rounded-3xl bg-cream-deep p-7 ring-1 ring-ink/10">
            <p className="text-sm font-semibold text-ink">
              📦 Delivered with our gifting partners
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { e: "📦", n: "BoxFox", d: "Curated gift boxes" },
                { e: "🎀", n: "Knack", d: "Build-a-gift kits" },
                { e: "🚚", n: "USPS · UPS · FedEx", d: "Tracked, on-time shipping" },
                { e: "🎁", n: "AprilDawn Box", d: "Our signature keepsake box" },
              ].map((p) => (
                <div
                  key={p.n}
                  className="rounded-2xl bg-white p-4 ring-1 ring-ink/10"
                >
                  <div className="text-2xl" aria-hidden="true">
                    {p.e}
                  </div>
                  <div className="mt-1 text-sm font-medium text-ink">{p.n}</div>
                  <div className="text-xs text-ink-soft">{p.d}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-ink-soft">
              See the whole{" "}
              <a href="/partners" className="font-medium text-dawn-600">
                partner network →
              </a>
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
