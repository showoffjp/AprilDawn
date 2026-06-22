"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartProvider";
import { FreeShipProgress } from "@/components/cart/FreeShipProgress";
import { SocialProofCard } from "@/components/social/SocialProof";
import { type CartItem, shippingFor } from "@/lib/cart";
import { usd } from "@/lib/utils";

type Status = "idle" | "submitting" | "done" | "error";

type PlacedOrder = {
  orderId: string;
  items: CartItem[];
  total: number;
  isGift: boolean;
  giftMessage: string;
};

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [status, setStatus] = useState<Status>("idle");
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);
  const [gift, setGift] = useState(false);
  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, items, total }),
      });
      if (!res.ok) throw new Error();
      const json = (await res.json()) as { orderId: string };
      setPlaced({
        orderId: json.orderId,
        items,
        total,
        isGift: gift,
        giftMessage:
          typeof data.giftMessage === "string" ? data.giftMessage : "",
      });
      setStatus("done");
      clear();
    } catch {
      setStatus("error");
    }
  }

  if (status === "done" && placed) {
    return (
      <Container className="py-16">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 ring-1 ring-ink/10 sm:p-10">
          <div className="text-center">
            <div className="text-6xl">🎉</div>
            <h1 className="mt-4 font-display text-2xl font-semibold">
              Order received!
            </h1>
            <p className="mt-2 text-ink-soft">
              Confirmation{" "}
              <span className="font-mono text-ink">{placed.orderId}</span> — a
              copy is on its way to your email.
            </p>
          </div>

          {/* Order recap */}
          <div className="mt-6 rounded-2xl bg-cream-deep p-5 text-left">
            <h2 className="text-sm font-semibold text-ink">Order summary</h2>
            <ul className="mt-3 space-y-2">
              {placed.items.map((i) => (
                <li key={i.id} className="flex items-center gap-2 text-sm">
                  <span aria-hidden="true">{i.emoji}</span>
                  <span className="min-w-0 flex-1 truncate text-ink-soft">
                    {i.name} × {i.quantity}
                  </span>
                  <span className="font-medium text-ink">
                    {usd(i.unitPrice * i.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex justify-between border-t border-ink/10 pt-3 text-sm">
              <span className="font-semibold text-ink">Total</span>
              <span className="font-semibold text-ink">{usd(placed.total)}</span>
            </div>
          </div>

          {/* Gift card preview */}
          {placed.isGift ? (
            <div className="mt-4 rounded-2xl border border-dashed border-dawn-300 bg-dawn-50 p-5 text-left">
              <p className="text-xs font-semibold uppercase tracking-wide text-dawn-600">
                🎁 Gift card preview
              </p>
              {placed.giftMessage ? (
                <p className="mt-2 font-display text-lg italic text-ink">
                  &ldquo;{placed.giftMessage}&rdquo;
                </p>
              ) : (
                <p className="mt-2 text-sm text-ink-soft">
                  We&rsquo;ll include a blank card you can fill in.
                </p>
              )}
              <p className="mt-2 text-xs text-ink-soft">
                Hand-lettered on a card tucked inside · prices kept off the
                packing slip.
              </p>
            </div>
          ) : null}

          {/* What happens next */}
          <ol className="mt-6 space-y-2.5 text-left text-sm text-ink-soft">
            {[
              "We review your photos and prepare free proofs.",
              "You approve (or tweak) — no charge until you love it.",
              "We produce and ship, and you track every step.",
            ].map((step, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-dawn-500 text-[11px] font-bold text-white">
                  {idx + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

          <div className="mt-7 flex justify-center gap-3">
            <Button href="/shop">Keep shopping</Button>
            <Button href="/" variant="ghost">
              Back home
            </Button>
          </div>

          <p className="mt-6 text-center text-xs text-ink-soft">
            Demo checkout — wire <code>/api/checkout</code> to Stripe to take real
            payments.
          </p>
        </div>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container className="py-20 text-center">
        <div className="text-5xl">🛍️</div>
        <h1 className="mt-4 font-display text-2xl font-semibold">
          Nothing to check out yet
        </h1>
        <p className="mt-2 text-ink-soft">Add something memorable first.</p>
        <Button href="/shop" className="mt-6">
          Browse the shop
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Checkout
      </h1>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        {/* Form */}
        <form onSubmit={onSubmit} className="rounded-3xl bg-white p-6 ring-1 ring-ink/10 sm:p-8">
          <h2 className="font-display text-xl font-semibold">Shipping details</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Full name" name="name" />
            <Field label="Email" name="email" type="email" />
            <Field label="Address" name="address" className="sm:col-span-2" />
            <Field label="City" name="city" />
            <Field label="State / Region" name="region" />
            <Field label="ZIP / Postal code" name="postal" />
            <Field label="Country" name="country" defaultValue="United States" />
          </div>

          <div className="mt-8 rounded-2xl bg-cream p-5 ring-1 ring-ink/10">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                name="isGift"
                checked={gift}
                onChange={(e) => setGift(e.target.checked)}
                className="h-5 w-5 rounded border-ink/25 text-dawn-500 focus:ring-dawn-400"
              />
              <span className="font-display text-lg font-semibold">
                🎁 This is a gift
              </span>
            </label>
            {gift ? (
              <div className="mt-4">
                <label
                  htmlFor="giftMessage"
                  className="text-sm font-medium text-ink"
                >
                  Gift message{" "}
                  <span className="font-normal text-ink-soft">(optional)</span>
                </label>
                <textarea
                  id="giftMessage"
                  name="giftMessage"
                  rows={3}
                  maxLength={250}
                  placeholder="Happy birthday, Mom — we finally found the old beach photos. ❤️"
                  className="mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm focus:border-dawn-400 focus:outline-none"
                />
                <p className="mt-1.5 text-xs text-ink-soft">
                  We&rsquo;ll hand-letter this on a card tucked inside — and leave
                  all prices off the packing slip.
                </p>
              </div>
            ) : null}
          </div>

          <h2 className="mt-8 font-display text-xl font-semibold">Payment</h2>
          <div className="mt-3 rounded-2xl border border-dashed border-ink/20 bg-cream p-5 text-sm text-ink-soft">
            💳 Payment is collected securely at production time, after you approve
            your free proofs. (Demo build — connect Stripe to charge here.)
          </div>

          <Button
            className="mt-6 w-full"
            size="lg"
            type="submit"
            disabled={status === "submitting"}
          >
            {status === "submitting"
              ? "Placing order…"
              : `Place order · ${usd(total)}`}
          </Button>
          {status === "error" ? (
            <p className="mt-3 text-sm text-dawn-600">
              Something went wrong — please try again.
            </p>
          ) : null}
          <p className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center text-xs text-ink-soft">
            <span>🔒 Secure checkout</span>
            <span>🆓 Free proofs first</span>
            <span>↩️ Happiness guarantee</span>
          </p>
        </form>

        {/* Summary */}
        <aside className="h-fit rounded-3xl bg-white p-6 ring-1 ring-ink/10">
          <h2 className="font-display text-xl font-semibold">Your order</h2>
          <div className="mt-5">
            <FreeShipProgress subtotal={subtotal} />
          </div>
          <ul className="mt-5 space-y-3">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-3 text-sm">
                <span className="text-2xl" aria-hidden="true">
                  {item.emoji}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="font-medium text-ink">{item.name}</span>
                  <span className="text-ink-soft">
                    {" "}
                    × {item.quantity}
                    {item.size ? ` · ${item.size}` : ""}
                  </span>
                </span>
                <span className="font-medium text-ink">
                  {usd(item.unitPrice * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-ink/10 pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-soft">Subtotal</dt>
              <dd className="font-medium text-ink">{usd(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">Shipping</dt>
              <dd className="font-medium text-ink">
                {shipping === 0 ? "Free" : usd(shipping)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-ink/10 pt-2 text-base">
              <dt className="font-semibold text-ink">Total</dt>
              <dd className="font-semibold text-ink">{usd(total)}</dd>
            </div>
          </dl>
          <Link
            href="/cart"
            className="mt-4 block text-center text-sm text-dawn-600 hover:underline"
          >
            ← Edit cart
          </Link>
          <SocialProofCard className="mt-5 bg-cream ring-ink/10" />
        </aside>
      </div>
    </Container>
  );
}

function Field({
  label,
  name,
  type = "text",
  className,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  className?: string;
  defaultValue?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        defaultValue={defaultValue}
        className="mt-1.5 h-11 w-full rounded-xl border border-ink/15 bg-cream px-3 text-sm focus:border-dawn-400 focus:outline-none"
      />
    </div>
  );
}
