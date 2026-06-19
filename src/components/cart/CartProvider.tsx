"use client";

import { useSyncExternalStore } from "react";
import * as store from "@/lib/cartStore";
import { type CartItem, cartCount, cartSubtotal, cartTotal } from "@/lib/cart";

/**
 * Kept as a thin wrapper so the layout can mount it once; cart state lives in
 * a localStorage-backed external store read via useSyncExternalStore.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export type UseCart = {
  items: CartItem[];
  count: number;
  subtotal: number;
  total: number;
  addItem: (item: Omit<CartItem, "id">) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

export function useCart(): UseCart {
  const items = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
  return {
    items,
    count: cartCount(items),
    subtotal: cartSubtotal(items),
    total: cartTotal(items),
    addItem: store.addItem,
    updateQuantity: store.updateQuantity,
    removeItem: store.removeItem,
    clear: store.clear,
  };
}
