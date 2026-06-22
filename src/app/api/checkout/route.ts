import { NextResponse } from "next/server";

/**
 * Checkout intake (demo stub).
 *
 * Production pattern: validate the cart + shipping, create an order record,
 * then create a Stripe Checkout Session (or PaymentIntent) and return its URL.
 * Charge at production time after the customer approves free proofs.
 */
export async function POST(request: Request) {
  let body: {
    name?: string;
    email?: string;
    items?: unknown[];
    total?: number;
    isGift?: string;
    giftMessage?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.name || !body.email || !Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 422 },
    );
  }

  const orderId = `AD-${Date.now().toString(36).toUpperCase()}`;

  console.log("[checkout] new order", {
    orderId,
    email: body.email,
    lineCount: body.items.length,
    total: body.total,
    isGift: body.isGift === "on",
    giftMessage: body.giftMessage || undefined,
  });

  return NextResponse.json({ ok: true, orderId });
}
