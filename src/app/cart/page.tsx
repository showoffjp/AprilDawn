"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MemoryScene } from "@/components/art/MemoryScene";
import { useCart } from "@/components/cart/CartProvider";
import { FreeShipProgress } from "@/components/cart/FreeShipProgress";
import { CartUpsell } from "@/components/cart/CartUpsell";
import { shippingFor } from "@/lib/cart";
import { isAddon } from "@/lib/addons";
import { usd } from "@/lib/utils";

export default function CartPage() {
  const { items, subtotal, removeItem, updateQuantity } = useCart();
  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Your cart
      </h1>

      {items.length === 0 ? (
        <div className="mt-10 overflow-hidden rounded-3xl bg-white ring-1 ring-ink/10 shadow-soft">
          <div className="relative h-40 sm:h-52">
            <MemoryScene variant="sunrise" uid="cart-empty" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
          </div>
          <div className="px-8 pb-10 pt-2 text-center">
            <p className="font-display text-2xl font-semibold">
              Your cart is empty
            </p>
            <p className="mx-auto mt-2 max-w-md text-ink-soft">
              Turn a memory into something you can hold — a print, a mug, a
              blanket, or a Living Wall that never stops updating.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href="/shop">Browse the shop</Button>
              <Button href="/upload" variant="ghost">
                Upload a photo
              </Button>
            </div>
            <div className="mt-7 flex flex-wrap justify-center gap-2 text-sm">
              {[
                { h: "/living-wall", l: "Living Wall" },
                { h: "/memory-mail", l: "Memory Mail" },
                { h: "/occasions", l: "Occasions" },
                { h: "/services/masterpieces", l: "Masterpiece Portraits" },
              ].map((x) => (
                <Link
                  key={x.h}
                  href={x.h}
                  className="rounded-full bg-cream-deep px-3 py-1.5 font-medium text-ink-soft ring-1 ring-ink/10 transition hover:text-ink"
                >
                  {x.l}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* Items */}
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex gap-4 rounded-3xl bg-white p-5 ring-1 ring-ink/10"
              >
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-cream-deep text-4xl">
                  <span aria-hidden="true">{item.emoji}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      {isAddon(item.slug) ? (
                        <span className="font-medium text-ink">{item.name}</span>
                      ) : (
                        <Link
                          href={`/shop/${item.slug}`}
                          className="font-medium text-ink hover:text-dawn-600"
                        >
                          {item.name}
                        </Link>
                      )}
                      {!isAddon(item.slug) ? (
                        <p className="mt-0.5 text-xs text-ink-soft">
                          {item.size ? `Size ${item.size} · ` : ""}
                          {item.photoName
                            ? `📷 ${item.photoName}`
                            : "Photo added later"}
                        </p>
                      ) : null}
                      {item.notes ? (
                        <p className="mt-1 text-xs italic text-ink-soft">
                          “{item.notes}”
                        </p>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-ink-soft hover:text-dawn-600"
                      aria-label={`Remove ${item.name}`}
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full ring-1 ring-ink/15">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="h-9 w-9 rounded-l-full text-lg hover:bg-ink/5"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-9 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="h-9 w-9 rounded-r-full text-lg hover:bg-ink/5"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-semibold text-ink">
                      {usd(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Summary */}
          <aside className="h-fit rounded-3xl bg-white p-6 ring-1 ring-ink/10">
            <h2 className="font-display text-xl font-semibold">Order summary</h2>
            <div className="mt-5">
              <FreeShipProgress subtotal={subtotal} />
            </div>
            <dl className="mt-5 space-y-3 text-sm">
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
              <div className="flex justify-between border-t border-ink/10 pt-3 text-base">
                <dt className="font-semibold text-ink">Total</dt>
                <dd className="font-semibold text-ink">{usd(total)}</dd>
              </div>
            </dl>
            <Button href="/checkout" className="mt-6 w-full" size="lg">
              Proceed to checkout
            </Button>
            <p className="mt-3 text-center text-xs text-ink-soft">
              🆓 Free proofs · no charge until you approve
            </p>
          </aside>

          <div className="lg:col-span-2">
            <CartUpsell />
          </div>
        </div>
      )}
    </Container>
  );
}
