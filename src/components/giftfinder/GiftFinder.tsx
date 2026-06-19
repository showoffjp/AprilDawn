"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
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

export function GiftFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const result =
    answers.length === QUESTIONS.length
      ? recommend(answers[0], answers[1], answers[2])
      : null;

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
      <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center ring-1 ring-ink/10 sm:p-10">
        <div className="text-6xl">{result.emoji}</div>
        <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-dawn-600">
          Our pick for you
        </p>
        <h3 className="mt-2 font-display text-2xl font-semibold">
          {result.title}
        </h3>
        <p className="mt-3 text-ink-soft">{result.blurb}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href={result.href}>{result.cta}</Button>
          <Button variant="ghost" onClick={reset}>
            Start over
          </Button>
        </div>
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
            className="hover:text-ink"
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
