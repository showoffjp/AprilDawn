import { NextResponse } from "next/server";
import { clean, isEmail, readJson } from "@/lib/validation";
import { type CartItem, cartSubtotal, shippingFor } from "@/lib/cart";
import { getProduct } from "@/lib/products";

/**
 * Checkout intake (demo stub).
 *
 * Production pattern: validate the cart + shipping, create an order record,
 * then create a Stripe Checkout Session (or PaymentIntent) and return its URL.
 * Charge at production time after the customer approves free proofs.
 */

const MAX_LINES = 200;
const MAX_QTY = 999;

/**
 * Validate and normalize the client cart. Returns `null` if anything looks
 * malformed so we never build an order from garbage.
 */
function normalizeItems(raw: unknown): CartItem[] | null {
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_LINES) {
    return null;
  }
  const items: CartItem[] = [];
  for (const r of raw as Array<Partial<CartItem>>) {
    const slug = clean(r?.slug, 100);
    const name = clean(r?.name, 200);
    const unitPrice = Number(r?.unitPrice);
    const quantity = Number(r?.quantity);
    if (!slug || !name) return null;
    if (!Number.isFinite(unitPrice) || unitPrice < 0) return null;
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QTY) {
      return null;
    }
    // Guard against price tampering: a known catalog item can never cost less
    // than its starting price (configurable options only ever add to it).
    // Unknown slugs fall through to the documented production re-price step.
    const product = getProduct(slug);
    if (product && unitPrice < product.priceFrom) return null;
    items.push({
      id: clean(r?.id, 100) || slug,
      slug,
      name,
      emoji: clean(r?.emoji, 8),
      unitPrice,
      quantity,
      size: r?.size ? clean(r.size, 40) : undefined,
    });
  }
  return items;
}

export async function POST(request: Request) {
  const body = await readJson(request);
  if (!body) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 320);
  const items = normalizeItems(body.items);

  if (!name) {
    return NextResponse.json(
      { ok: false, error: "Please enter your name." },
      { status: 422 },
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 422 },
    );
  }
  if (!items) {
    return NextResponse.json(
      { ok: false, error: "Your cart looks invalid — please review it and try again." },
      { status: 422 },
    );
  }

  // The server is the source of truth for money: recompute totals from the
  // validated line items and ignore the client-sent `total`. (Production should
  // go further and re-price each line from the catalog by slug rather than
  // trusting the client's unitPrice.)
  const subtotal = Math.round(cartSubtotal(items) * 100) / 100;
  const shipping = shippingFor(subtotal);
  const total = Math.round((subtotal + shipping) * 100) / 100;

  const clientTotal = Number(body.total);
  if (Number.isFinite(clientTotal) && Math.abs(clientTotal - total) > 0.01) {
    console.warn("[checkout] client/server total mismatch", { clientTotal, total });
  }

  const orderId = `AD-${Date.now().toString(36).toUpperCase()}`;

  console.log("[checkout] new order", {
    orderId,
    email,
    lineCount: items.length,
    subtotal,
    shipping,
    total,
    isGift: body.isGift === "on",
    giftMessage: clean(body.giftMessage, 250) || undefined,
  });

  return NextResponse.json({ ok: true, orderId, subtotal, shipping, total });
}
