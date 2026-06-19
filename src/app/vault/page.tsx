import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MemoryScene, sceneVariants } from "@/components/art/MemoryScene";

export const metadata: Metadata = {
  title: "Your Memory Vault",
  description:
    "A preview of the AprilDawn member experience — your lifetime vault of albums, restorations, and a Living Wall that syncs from everyone's phones.",
};

const albums: {
  title: string;
  count: number;
  variant: (typeof sceneVariants)[number];
  badge?: string;
}[] = [
  { title: "Grandma's 90th", count: 312, variant: "birthday", badge: "Shared" },
  { title: "Summer '24", count: 540, variant: "beach" },
  { title: "The Wedding", count: 1280, variant: "sunset", badge: "Restored" },
  { title: "Baby's First Year", count: 866, variant: "garden" },
  { title: "Attic Slides", count: 2100, variant: "sunrise", badge: "Digitized" },
  { title: "Holidays", count: 430, variant: "winter" },
];

const actions = [
  { emoji: "⬆️", title: "Upload memories", href: "/upload" },
  { emoji: "🧱", title: "Design a Living Wall", href: "/living-wall" },
  { emoji: "🖼️", title: "Order prints & gifts", href: "/shop" },
  { emoji: "🎂", title: "Set occasion reminders", href: "/occasions" },
];

export default function VaultPage() {
  return (
    <>
      <section className="bg-dusk text-white">
        <Container className="py-12">
          <Badge tone="dawn">Member preview</Badge>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-semibold sm:text-4xl">
                Welcome back, the Pharr family
              </h1>
              <p className="mt-1 text-white/70">
                12,483 memories safe · 6 albums · 1 Living Wall syncing
              </p>
            </div>
            <div className="flex gap-2">
              <Button href="/upload">Upload</Button>
              <Button href="/living-wall" variant="light">
                Design a wall
              </Button>
            </div>
          </div>
          <div className="mt-7 max-w-md">
            <div className="flex justify-between text-xs text-white/70">
              <span>Vault storage</span>
              <span>18.4 GB / 100 GB</span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/15">
              <div className="h-full w-[18%] rounded-full bg-gradient-to-r from-amber-400 to-dawn-500" />
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold">Your albums</h2>
          <Button href="/upload" variant="ghost" size="sm">
            + New album
          </Button>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {albums.map((a) => (
            <div
              key={a.title}
              className="group overflow-hidden rounded-3xl bg-white ring-1 ring-ink/10 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-dawn-500/10"
            >
              <div className="relative h-36 overflow-hidden">
                <MemoryScene variant={a.variant} uid={a.title} />
                {a.badge ? (
                  <span className="absolute right-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-xs font-semibold text-ink">
                    {a.badge}
                  </span>
                ) : null}
              </div>
              <div className="flex items-center justify-between p-5">
                <div>
                  <div className="font-medium text-ink">{a.title}</div>
                  <div className="text-xs text-ink-soft">
                    {a.count.toLocaleString()} memories
                  </div>
                </div>
                <span className="text-sm font-semibold text-dawn-600 transition group-hover:translate-x-0.5">
                  Open →
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="bg-cream-deep">
        <Section>
          <h2 className="font-display text-2xl font-semibold">Recently added</h2>
          <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {sceneVariants.slice(0, 6).map((v, i) => (
              <div
                key={v}
                className="aspect-square overflow-hidden rounded-2xl ring-1 ring-ink/10"
              >
                <MemoryScene variant={v} uid={`vault${i}`} />
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Section>
        <h2 className="font-display text-2xl font-semibold">Quick actions</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((a) => (
            <a
              key={a.title}
              href={a.href}
              className="flex items-center gap-3 rounded-2xl bg-white p-5 ring-1 ring-ink/10 transition hover:-translate-y-0.5 hover:ring-dawn-300"
            >
              <span className="text-2xl">{a.emoji}</span>
              <span className="font-medium text-ink">{a.title}</span>
            </a>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="bg-sunrise rounded-[2rem] px-8 py-12 text-center ring-1 ring-ink/10">
          <h2 className="mx-auto max-w-xl font-display text-2xl font-semibold text-balance">
            This is the AprilDawn member experience — a lifetime vault for
            everything you love.
          </h2>
          <p className="mt-2 text-sm text-ink-soft">
            Preview shown with sample data. Join the Family Vault to make it
            yours.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button href="/pricing">See Family Vault plans</Button>
            <Button href="/upload" variant="ghost">
              Start uploading
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
