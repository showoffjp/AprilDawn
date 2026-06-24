"use client";

import { useCart } from "@/components/cart/CartProvider";
import { CART_ADDONS } from "@/lib/addons";
import { usd } from "@/lib/utils";

/**
 * "Complete your order" cross-sell. Surfaces a few small add-ons the shopper
 * hasn't added yet — lifting average order value and helping them reach the
 * free-shipping threshold.
 */
export function CartUpsell() {
  const { items, addItem } = useCart();
  const inCart = new Set(items.map((i) => i.slug));
  const suggestions = CART_ADDONS.filter((a) => !inCart.has(a.slug)).slice(0, 4);

  if (suggestions.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="font-display text-xl font-semibold">Complete your order</h2>
      <p className="mt-1 text-sm text-ink-soft">
        Little extras our customers love — added to this same order.
      </p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {suggestions.map((a) => (
          <li
            key={a.slug}
            className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-ink/10"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cream-deep text-2xl">
              <span aria-hidden="true">{a.emoji}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-ink">{a.name}</p>
              <p className="text-xs text-ink-soft">{a.blurb}</p>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-sm font-semibold text-ink">{usd(a.price)}</div>
              <button
                type="button"
                onClick={() =>
                  addItem({
                    slug: a.slug,
                    name: a.name,
                    emoji: a.emoji,
                    unitPrice: a.price,
                    quantity: 1,
                  })
                }
                className="mt-1 rounded-full bg-dawn-500 px-3.5 py-1 text-xs font-semibold text-white transition hover:scale-[1.03] hover:bg-dawn-600 active:scale-95"
              >
                + Add
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
