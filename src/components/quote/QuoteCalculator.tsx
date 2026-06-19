"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { usd } from "@/lib/utils";

type Media = {
  key: string;
  label: string;
  emoji: string;
  rate: number;
  step: number;
  hint: string;
};

const MEDIA: Media[] = [
  { key: "photos", label: "Photos & prints", emoji: "🖼️", rate: 0.39, step: 50, hint: "a shoebox ≈ 500" },
  { key: "slides", label: "Slides & negatives", emoji: "🎞️", rate: 0.45, step: 25, hint: "a carousel ≈ 80" },
  { key: "video", label: "Video tapes (VHS, camcorder)", emoji: "📼", rate: 19.99, step: 1, hint: "per tape" },
  { key: "film", label: "Film reels (8mm, Super 8)", emoji: "🎬", rate: 24.99, step: 1, hint: "per reel" },
  { key: "audio", label: "Audio cassettes", emoji: "🎙️", rate: 16.99, step: 1, hint: "per tape" },
];

export function QuoteCalculator() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  const set = (k: string, n: number) =>
    setCounts((c) => ({ ...c, [k]: Math.max(0, n) }));

  const lines = MEDIA.map((m) => ({
    m,
    qty: counts[m.key] ?? 0,
    cost: (counts[m.key] ?? 0) * m.rate,
  }));
  const subtotal = lines.reduce((s, l) => s + l.cost, 0);
  const discount = subtotal >= 200 ? subtotal * 0.1 : 0;
  const total = Math.round((subtotal - discount) * 100) / 100;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
      <div className="space-y-3">
        {MEDIA.map((m) => {
          const qty = counts[m.key] ?? 0;
          return (
            <div
              key={m.key}
              className="flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-ink/10"
            >
              <span className="text-3xl" aria-hidden="true">
                {m.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-medium text-ink">{m.label}</div>
                <div className="text-xs text-ink-soft">
                  {usd(m.rate)} each · {m.hint}
                </div>
              </div>
              <div className="inline-flex items-center rounded-full ring-1 ring-ink/15">
                <button
                  type="button"
                  onClick={() => set(m.key, qty - m.step)}
                  className="h-9 w-9 rounded-l-full text-lg hover:bg-ink/5"
                  aria-label={`Fewer ${m.label}`}
                >
                  −
                </button>
                <input
                  value={qty}
                  onChange={(e) =>
                    set(m.key, Number(e.target.value.replace(/\D/g, "")) || 0)
                  }
                  inputMode="numeric"
                  className="w-14 bg-transparent text-center text-sm font-semibold focus:outline-none"
                  aria-label={`${m.label} count`}
                />
                <button
                  type="button"
                  onClick={() => set(m.key, qty + m.step)}
                  className="h-9 w-9 rounded-r-full text-lg hover:bg-ink/5"
                  aria-label={`More ${m.label}`}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <aside className="h-fit rounded-3xl bg-ink p-7 text-cream">
        <h3 className="font-display text-xl font-semibold">Your estimate</h3>
        <dl className="mt-5 space-y-2 text-sm">
          {lines
            .filter((l) => l.qty > 0)
            .map((l) => (
              <div key={l.m.key} className="flex justify-between text-cream/80">
                <dt>
                  {l.m.emoji} {l.qty.toLocaleString()} {l.m.label.split(" ")[0]}
                </dt>
                <dd>{usd(l.cost)}</dd>
              </div>
            ))}
          {subtotal === 0 ? (
            <p className="text-cream/70">
              Add what&apos;s in your shoebox to see a live estimate.
            </p>
          ) : null}
          {discount > 0 ? (
            <div className="flex justify-between text-dawn-200">
              <dt>Volume discount (10%)</dt>
              <dd>−{usd(discount)}</dd>
            </div>
          ) : null}
        </dl>
        <div className="mt-5 flex items-end justify-between border-t border-white/15 pt-4">
          <span className="text-sm text-cream/80">Estimated total</span>
          <span className="font-display text-3xl font-semibold">{usd(total)}</span>
        </div>
        <Button href="/upload" className="mt-6 w-full">
          Order a MemoryBox
        </Button>
        <p className="mt-3 text-center text-xs text-cream/70">
          Estimate only · free proofs · originals returned insured
        </p>
      </aside>
    </div>
  );
}
