"use client";

import { FREE_SHIP_THRESHOLD } from "@/lib/cart";
import { usd } from "@/lib/utils";

/**
 * Free-shipping progress nudge. Shows how much more a shopper needs to spend to
 * unlock free shipping (a proven average-order-value lever), or celebrates once
 * they've crossed the threshold.
 */
export function FreeShipProgress({ subtotal }: { subtotal: number }) {
  if (subtotal <= 0) return null;

  const unlocked = subtotal >= FREE_SHIP_THRESHOLD;
  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - subtotal);
  const pct = Math.min(100, Math.round((subtotal / FREE_SHIP_THRESHOLD) * 100));

  return (
    <div className="rounded-2xl bg-cream-deep p-3.5 ring-1 ring-ink/10">
      <p className="text-xs font-medium text-ink">
        {unlocked ? (
          <>
            🎉 You&rsquo;ve unlocked{" "}
            <span className="font-semibold">free shipping</span>!
          </>
        ) : (
          <>
            You&rsquo;re{" "}
            <span className="font-semibold text-dawn-600">{usd(remaining)}</span>{" "}
            away from free shipping
          </>
        )}
      </p>
      <div
        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-ink/10"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-label="Progress toward free shipping"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-dawn-400 to-dawn-600 transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
