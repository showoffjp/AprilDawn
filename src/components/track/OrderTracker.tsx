"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ORDER_STAGES, lookupOrder, type OrderStatus } from "@/lib/orderStatus";

/** Look up a demo order by its AD-XXXX id and show a fulfilment timeline. */
export function OrderTracker({ initialOrder = "" }: { initialOrder?: string }) {
  const [orderId, setOrderId] = useState(initialOrder);
  const [result, setResult] = useState<OrderStatus | null>(null);

  // Auto-look-up when arriving from the confirmation screen (?order=…).
  // Status derives from Date.now(), so it must run on the client after mount
  // (server renders no result) to avoid a hydration mismatch.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (initialOrder) setResult(lookupOrder(initialOrder));
  }, [initialOrder]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setResult(lookupOrder(orderId));
  }

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="rounded-3xl bg-white p-6 ring-1 ring-ink/10 sm:p-8"
      >
        <label htmlFor="orderId" className="text-sm font-medium text-ink">
          Order number
        </label>
        <div className="mt-1.5 flex flex-col gap-3 sm:flex-row">
          <input
            id="orderId"
            name="orderId"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="AD-XXXXXX"
            className="h-11 w-full rounded-xl border border-ink/15 bg-cream px-3 font-mono text-sm uppercase focus:border-dawn-400 focus:outline-none"
          />
          <Button type="submit" className="shrink-0">
            Track order
          </Button>
        </div>
        <p className="mt-2 text-xs text-ink-soft">
          Find it in your confirmation email — it looks like{" "}
          <span className="font-mono">AD-1A2B3C</span>.
        </p>
      </form>

      {result ? (
        result.found ? (
          <div className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-ink/10 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-xl font-semibold">
                {ORDER_STAGES[result.stageIndex].label}
              </h2>
              {result.placedAt ? (
                <span className="text-xs text-ink-soft">
                  Placed{" "}
                  {new Date(result.placedAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              ) : null}
            </div>

            <ol className="mt-6 space-y-0">
              {ORDER_STAGES.map((stage, i) => {
                const done = i < result.stageIndex;
                const current = i === result.stageIndex;
                const last = i === ORDER_STAGES.length - 1;
                return (
                  <li key={stage.key} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                          done
                            ? "bg-dawn-500 text-white"
                            : current
                              ? "bg-dawn-500 text-white ring-4 ring-dawn-200"
                              : "bg-ink/10 text-ink-soft"
                        }`}
                      >
                        {done ? "✓" : i + 1}
                      </span>
                      {!last ? (
                        <span
                          className={`my-1 w-0.5 flex-1 ${
                            done ? "bg-dawn-400" : "bg-ink/10"
                          }`}
                        />
                      ) : null}
                    </div>
                    <div className={`pb-6 ${current ? "" : "opacity-80"}`}>
                      <p
                        className={`text-sm font-semibold ${
                          done || current ? "text-ink" : "text-ink-soft"
                        }`}
                      >
                        {stage.label}
                      </p>
                      <p className="mt-0.5 text-sm text-ink-soft">
                        {stage.blurb}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <p className="mt-2 rounded-2xl bg-cream-deep p-3 text-xs text-ink-soft">
              Demo tracker — status is estimated from your order date. Wire to
              your order system for live updates.
            </p>
          </div>
        ) : (
          <div className="mt-8 rounded-3xl bg-white p-6 text-center ring-1 ring-ink/10">
            <div className="text-4xl">🔍</div>
            <p className="mt-3 font-medium text-ink">
              We couldn&rsquo;t find that order
            </p>
            <p className="mx-auto mt-1 max-w-sm text-sm text-ink-soft">
              Double-check the number from your confirmation email — it looks
              like <span className="font-mono">AD-1A2B3C</span>. Still stuck?{" "}
              <a href="/contact" className="font-medium text-dawn-600 hover:underline">
                Contact us
              </a>
              .
            </p>
          </div>
        )
      ) : null}
    </div>
  );
}
