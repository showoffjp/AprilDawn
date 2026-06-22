/**
 * Demo order-status lookup. Order IDs are minted at checkout as
 * `AD-${Date.now().toString(36).toUpperCase()}`, so we can recover the order's
 * placement time straight from the ID and map elapsed time to a fulfilment
 * stage — no database needed for the demo. Wire this to your OMS to go live.
 */

export const ORDER_STAGES = [
  { key: "received", label: "Order received", blurb: "We've got your order and your photos." },
  { key: "proofs", label: "Free proofs ready", blurb: "Check your email to approve (or tweak) your proofs." },
  { key: "production", label: "In production", blurb: "Approved! Your keepsakes are being made by hand." },
  { key: "shipped", label: "Shipped", blurb: "On the way — tracking details sent to your email." },
  { key: "delivered", label: "Delivered", blurb: "Enjoy! We'd love a review when you have a moment." },
] as const;

export type OrderStatus = {
  found: boolean;
  stageIndex: number;
  placedAt?: number;
};

export function lookupOrder(orderId: string): OrderStatus {
  const id = orderId.trim().toUpperCase();
  const m = id.match(/^AD-([0-9A-Z]+)$/);
  if (!m) return { found: false, stageIndex: 0 };

  const ts = parseInt(m[1], 36);
  if (!Number.isFinite(ts) || ts <= 0 || ts > Date.now() + 86400000) {
    return { found: false, stageIndex: 0 };
  }

  const days = (Date.now() - ts) / 86400000;
  let stageIndex = 0;
  if (days >= 10) stageIndex = 4;
  else if (days >= 7) stageIndex = 3;
  else if (days >= 3) stageIndex = 2;
  else if (days >= 1) stageIndex = 1;

  return { found: true, stageIndex, placedAt: ts };
}
