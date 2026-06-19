"use client";

import { useState } from "react";
import { getProduct, type Product } from "@/lib/products";
import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/Button";
import { usd, cn } from "@/lib/utils";

const SLUGS = [
  "tee",
  "hoodie",
  "socks",
  "mug",
  "caketopper",
  "vinyl",
  "pillow",
  "blanket",
  "phonecase",
];

const ITEMS: Product[] = SLUGS.map(getProduct).filter(
  (p): p is Product => Boolean(p),
);

export function BundleBuilder() {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState<Set<string>>(
    new Set(["tee", "mug", "caketopper"]),
  );
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const chosen = ITEMS.filter((p) => selected.has(p.slug));
  const total = chosen.reduce((s, p) => s + p.priceFrom, 0);

  function toggle(slug: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
    setAdded(false);
  }

  function addBundle() {
    const note = name.trim() ? `${name.trim()}'s bundle` : "Custom bundle";
    chosen.forEach((p) =>
      addItem({
        slug: p.slug,
        name: p.name,
        emoji: p.emoji,
        unitPrice: p.priceFrom,
        quantity: 1,
        notes: note,
      }),
    );
    setAdded(true);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
      <div>
        <label htmlFor="bundle-name" className="text-sm font-medium text-ink">
          Who&apos;s it for?
        </label>
        <input
          id="bundle-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Grandma Rose"
          className="mt-1.5 h-11 w-full max-w-xs rounded-xl border border-ink/15 bg-white px-3 text-sm focus:border-dawn-400 focus:outline-none"
        />

        <p className="mt-6 text-sm font-medium text-ink">Pick your pieces</p>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {ITEMS.map((p) => {
            const on = selected.has(p.slug);
            return (
              <button
                key={p.slug}
                type="button"
                onClick={() => toggle(p.slug)}
                className={cn(
                  "flex items-center gap-3 rounded-2xl bg-white p-4 text-left ring-1 transition",
                  on
                    ? "ring-2 ring-dawn-400"
                    : "ring-ink/10 hover:ring-dawn-300",
                )}
              >
                <span className="text-2xl" aria-hidden="true">
                  {p.emoji}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-ink">
                    {p.name}
                  </span>
                  <span className="text-xs text-ink-soft">
                    {usd(p.priceFrom)}
                  </span>
                </span>
                <span
                  className={cn(
                    "ml-auto flex h-5 w-5 items-center justify-center rounded-full text-xs",
                    on ? "bg-dawn-500 text-white" : "bg-ink/5 text-ink-soft",
                  )}
                >
                  {on ? "✓" : "+"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <aside className="h-fit rounded-3xl bg-ink p-7 text-cream">
        <h3 className="font-display text-xl font-semibold">
          {name.trim() ? `${name.trim()}'s bundle` : "Your bundle"}
        </h3>
        <p className="mt-1 text-sm text-cream/70">
          {chosen.length} {chosen.length === 1 ? "item" : "items"} · their face
          on all of it
        </p>
        <ul className="mt-5 space-y-1.5 text-sm text-cream/85">
          {chosen.map((p) => (
            <li key={p.slug} className="flex justify-between">
              <span>
                {p.emoji} {p.name}
              </span>
              <span>{usd(p.priceFrom)}</span>
            </li>
          ))}
          {chosen.length === 0 ? (
            <li className="text-cream/60">Pick at least one piece to begin.</li>
          ) : null}
        </ul>
        <div className="mt-5 flex items-end justify-between border-t border-white/15 pt-4">
          <span className="text-sm text-cream/80">Bundle total</span>
          <span className="font-display text-3xl font-semibold">{usd(total)}</span>
        </div>
        {added ? (
          <div className="mt-5 rounded-2xl bg-white/10 p-4 text-center">
            <p className="text-sm font-medium">✓ Bundle added to cart</p>
            <Button href="/cart" size="sm" variant="light" className="mt-3">
              View cart
            </Button>
          </div>
        ) : (
          <Button
            onClick={addBundle}
            className="mt-5 w-full"
            disabled={chosen.length === 0}
          >
            Add bundle to cart
          </Button>
        )}
      </aside>
    </div>
  );
}
