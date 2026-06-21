/** Shared cart types & helpers (no React, safe to import anywhere). */

export type CartItem = {
  /** Unique per line (same product + different options = different lines). */
  id: string;
  slug: string;
  name: string;
  emoji: string;
  unitPrice: number;
  quantity: number;
  size?: string;
  photoName?: string;
  notes?: string;
};

export const APPAREL_SIZES = ["S", "M", "L", "XL", "2XL"] as const;

export function cartCount(items: CartItem[]): number {
  return items.reduce((n, i) => n + i.quantity, 0);
}

export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
}

/** Flat-rate demo shipping: free over $75, else $6.95. */
export const FREE_SHIP_THRESHOLD = 75;
export const FLAT_SHIP_RATE = 6.95;

export function shippingFor(subtotal: number): number {
  if (subtotal === 0) return 0;
  return subtotal >= FREE_SHIP_THRESHOLD ? 0 : FLAT_SHIP_RATE;
}

export function cartTotal(items: CartItem[]): number {
  const sub = cartSubtotal(items);
  return Math.round((sub + shippingFor(sub)) * 100) / 100;
}

export function newLineId(): string {
  return `line_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}
