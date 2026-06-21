import { Button } from "@/components/ui/Button";
import { ProductMockup } from "@/components/cart/ProductMockup";

const CHIPS = [
  { e: "🪄", l: "Restore" },
  { e: "🎨", l: "Art styles" },
  { e: "🖼️", l: "Print" },
  { e: "📼", l: "Digitize" },
  { e: "🧱", l: "Living Wall" },
  { e: "💌", l: "Memory Mail" },
];

/**
 * Canva-style "bento": two big, very-rounded gradient cards, each a self-
 * contained mini-hero with a bold heading, a line of copy, a pill CTA, and a
 * rich visual. Vivid color, soft depth, friendly corners.
 */
export function StudioBento() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {/* Card A — the whole studio */}
      <div
        className="relative overflow-hidden rounded-[2rem] p-8 text-white shadow-soft-lg sm:p-10"
        style={{
          background:
            "linear-gradient(150deg,#6a3fad,#7e54c0 35%,#3aa0d6 72%,#46e6a8)",
        }}
      >
        <h3 className="font-display text-2xl font-semibold leading-tight sm:text-3xl">
          Your whole memory studio, in one place
        </h3>
        <p className="mt-3 max-w-md text-white/85">
          Digitize, restore, reimagine, and print — every tool for keeping a
          memory lives under one warm roof.
        </p>
        <Button href="/services" variant="light" className="mt-6">
          Explore the studio
        </Button>
        <div className="mt-8 grid grid-cols-3 gap-3">
          {CHIPS.map((c) => (
            <div
              key={c.l}
              className="flex flex-col items-center gap-1.5 rounded-2xl bg-white/15 py-4 ring-1 ring-white/20 backdrop-blur"
            >
              <span className="text-2xl" aria-hidden="true">
                {c.e}
              </span>
              <span className="text-xs font-semibold">{c.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card B — never miss a moment */}
      <div
        className="relative overflow-hidden rounded-[2rem] p-8 shadow-soft-lg sm:p-10"
        style={{
          background: "linear-gradient(150deg,#ffd9a8,#ffb3c1 55%,#f7a8d0)",
        }}
      >
        <h3 className="font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
          Never miss a birthday again
        </h3>
        <p className="mt-3 max-w-md text-ink/75">
          Connect your calendars and we&apos;ll remind you in time — then turn
          their best photos into the perfect gift in one tap.
        </p>
        <Button href="/occasions" className="mt-6">
          Set up auto-gifting
        </Button>
        <div className="relative mt-9">
          <div className="grid grid-cols-2 gap-3">
            <ProductMockup kind="apparel" photo={{ scene: "birthday" }} />
            <ProductMockup kind="mug" photo={{ scene: "birthday" }} />
          </div>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ink px-4 py-1.5 text-xs font-semibold text-cream shadow-lg">
            🎉 Happy 90th, Grandma!
          </div>
        </div>
      </div>
    </div>
  );
}
