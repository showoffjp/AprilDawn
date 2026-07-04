"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/cards/ProductCard";
import { type Product, products, getProduct } from "@/lib/products";
import { cn } from "@/lib/utils";

type Result = {
  emoji: string;
  title: string;
  blurb: string;
  href: string;
  cta: string;
};

const QUESTIONS = [
  {
    key: "occasion",
    q: "What's the occasion?",
    options: ["Birthday", "Anniversary", "Remembrance", "Just because", "Holiday"],
  },
  {
    key: "vibe",
    q: "What's the vibe?",
    options: ["Heartfelt", "Funny", "Fancy", "Practical"],
  },
  {
    key: "budget",
    q: "What's your budget?",
    options: ["Under $30", "$30–$100", "$100+"],
  },
] as const;

const R: Record<string, Result> = {
  restore: { emoji: "✨", title: "A restored, framed portrait", blurb: "We'll repair and gently colorize a cherished photo, then frame it — a quiet, beautiful way to honor someone.", href: "/services/restore", cta: "Restore a photo" },
  troll: { emoji: "👵", title: "The Troll Grandma Bundle", blurb: "Their face on a shirt, a mug, a cake, and a vinyl. Maximum love, maximum chaos — the gift the whole party remembers.", href: "/occasions", cta: "Build the bundle" },
  masterpiece: { emoji: "🎨", title: "A Masterpiece Portrait", blurb: "Your family reimagined in the style of any famous artist — Van Gogh, Klimt, Warhol — on gallery canvas.", href: "/services/masterpieces", cta: "Design a portrait" },
  thenNow: { emoji: "💞", title: "A Then & Now keepsake", blurb: "We restore their earliest photo and pair it with a fresh one in a matching frame set, plus an audio card.", href: "/occasions", cta: "See the set" },
  livingWall: { emoji: "🧱", title: "A Living Wall", blurb: "A breathtaking photo mosaic with an embedded LED frame that updates from everyone's phones. The showstopper.", href: "/living-wall", cta: "Design a wall" },
  mug: { emoji: "☕", title: "A photo gift under $30", blurb: "A photo mug, a set of magnets, or face socks — small, joyful, and always a hit.", href: "/shop", cta: "Browse the shop" },
  memoryMail: { emoji: "💌", title: "A talking Memory Mail card", blurb: "A real card mailed to their door that plays your voice or a video when they scan it. Print that hugs back.", href: "/memory-mail", cta: "Make a card" },
  canvas: { emoji: "🖼️", title: "A gallery canvas print", blurb: "A favorite photo on museum-grade canvas — timeless, easy, and always loved.", href: "/shop/canvas", cta: "Customize it" },
};

function recommend(occasion: string, vibe: string, budget: string): Result {
  if (occasion === "Remembrance") return R.restore;
  if (vibe === "Funny") return R.troll;
  if (occasion === "Anniversary") return vibe === "Fancy" ? R.masterpiece : R.thenNow;
  if (vibe === "Fancy" && budget === "$100+") return R.livingWall;
  if (budget === "Under $30") return R.mug;
  if (vibe === "Heartfelt") return R.memoryMail;
  if (budget === "$100+") return R.masterpiece;
  return R.canvas;
}

const VIBE_SLUGS: Record<string, string[]> = {
  Heartfelt: ["framed", "blanket", "canvas", "ornament", "metalengraving", "pillow"],
  Funny: ["socks", "caketopper", "petbandana", "wrappingpaper", "mug", "pillow"],
  Fancy: ["canvas", "acrylic", "metal", "metalengraving", "woodengraving", "triptych"],
  Practical: ["mug", "totebag", "blanket", "calendar", "coasters", "mousepad"],
};

const OCCASION_SLUGS: Record<string, string[]> = {
  Holiday: ["ornament", "pajamas", "calendar", "stickers"],
  Anniversary: ["canvas", "vinyl", "metalengraving", "framed"],
  Birthday: ["socks", "caketopper", "mug", "magnet"],
  Remembrance: ["candle", "metalengraving", "framed", "woodengraving"],
  "Just because": ["mug", "canvas", "blanket", "keychain"],
};

/** Three real, shoppable product picks that fit the answers and the budget. */
function recommendProducts(occasion: string, vibe: string, budget: string): Product[] {
  const maxPrice = budget === "Under $30" ? 30 : budget === "$30–$100" ? 100 : Infinity;
  const pool = [...(VIBE_SLUGS[vibe] ?? []), ...(OCCASION_SLUGS[occasion] ?? [])];
  const seen = new Set<string>();
  const out: Product[] = [];
  const add = (p: Product | undefined) => {
    if (p && !seen.has(p.slug) && p.priceFrom <= maxPrice && out.length < 3) {
      seen.add(p.slug);
      out.push(p);
    }
  };
  pool.forEach((slug) => add(getProduct(slug)));
  // Top up with anything else in budget if the curated pool was thin.
  if (out.length < 3) products.forEach(add);
  return out;
}

/** The best curated edit to send them to next. */
function recommendEdit(
  occasion: string,
  vibe: string,
  budget: string,
): { href: string; label: string } {
  if (budget === "Under $30") return { href: "/collections/under-25", label: "Shop gifts under $25" };
  if (vibe === "Funny") return { href: "/collections/gag-gifts", label: "Shop the gag gifts" };
  if (occasion === "Holiday") return { href: "/gift-guides/christmas", label: "Shop the holiday guide" };
  if (occasion === "Anniversary") return { href: "/gift-guides/anniversary", label: "Shop anniversary gifts" };
  if (occasion === "Remembrance") return { href: "/gift-guides/memorial", label: "Shop memorial gifts" };
  return { href: "/collections", label: "Browse all collections" };
}

export function GiftFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const result =
    answers.length === QUESTIONS.length
      ? recommend(answers[0], answers[1], answers[2])
      : null;
  const productPicks = result
    ? recommendProducts(answers[0], answers[1], answers[2])
    : [];
  const edit = result ? recommendEdit(answers[0], answers[1], answers[2]) : null;

  // When the result replaces the quiz, the focused button unmounts — move
  // focus to the result heading so keyboard/SR users aren't dropped on <body>.
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (result) resultHeadingRef.current?.focus();
  }, [result]);

  function pick(option: string) {
    const next = [...answers.slice(0, step), option];
    setAnswers(next);
    setStep((s) => s + 1);
  }

  function reset() {
    setStep(0);
    setAnswers([]);
  }

  if (result) {
    return (
      <div
        role="status"
        className="mx-auto max-w-3xl rounded-3xl bg-white p-8 ring-1 ring-ink/10 sm:p-10"
      >
        <div className="text-center">
          <div className="text-6xl" aria-hidden="true">{result.emoji}</div>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-dawn-600">
            Our pick for you
          </p>
          <h3
            ref={resultHeadingRef}
            tabIndex={-1}
            className="mt-2 font-display text-2xl font-semibold focus:outline-none"
          >
            {result.title}
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-ink-soft">{result.blurb}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href={result.href}>{result.cta}</Button>
            <Button variant="ghost" onClick={reset}>
              Start over
            </Button>
          </div>
        </div>

        {productPicks.length > 0 ? (
          <div className="mt-8 border-t border-ink/10 pt-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="font-display text-lg font-semibold">
                Ready-to-gift picks
              </p>
              {edit ? (
                <Link
                  href={edit.href}
                  className="shrink-0 text-sm font-semibold text-dawn-600 hover:underline"
                >
                  {edit.label} →
                </Link>
              ) : null}
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {productPicks.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  const current = QUESTIONS[step];

  return (
    <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 ring-1 ring-ink/10 sm:p-10">
      <div className="flex items-center justify-between text-xs text-ink-soft">
        <span>
          Question {step + 1} of {QUESTIONS.length}
        </span>
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="-m-2 p-2 hover:text-ink"
          >
            ← Back
          </button>
        ) : null}
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-cream-deep">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 via-dawn-500 to-dusk-500 transition-all"
          style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
        />
      </div>

      <h3 className="mt-6 font-display text-2xl font-semibold">{current.q}</h3>
      <div className="mt-5 grid gap-3">
        {current.options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => pick(o)}
            className={cn(
              "rounded-2xl px-5 py-4 text-left font-medium ring-1 transition",
              "bg-cream text-ink ring-ink/10 hover:-translate-y-0.5 hover:bg-dawn-50 hover:ring-dawn-300",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
