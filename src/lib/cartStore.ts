/**
 * Framework-agnostic cart store backed by localStorage.
 * Read in React via `useSyncExternalStore` (see CartProvider) so it is
 * SSR-safe and never causes hydration mismatches.
 */
import { type CartItem, newLineId } from "@/lib/cart";

const KEY = "aprildawn.cart.v1";
const EMPTY: CartItem[] = [];

let items: CartItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load(): void {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) items = JSON.parse(raw) as CartItem[];
  } catch {
    // ignore malformed storage
  }
}

function commit(next: CartItem[]): void {
  items = next;
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(KEY, JSON.stringify(items));
    }
  } catch {
    // ignore quota errors
  }
  listeners.forEach((l) => l());
}

export function subscribe(cb: () => void): () => void {
  load();
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

/** Stable reference between mutations (required by useSyncExternalStore). */
export function getSnapshot(): CartItem[] {
  return items;
}

export function getServerSnapshot(): CartItem[] {
  return EMPTY;
}

export function addItem(item: Omit<CartItem, "id">): void {
  const match = items.find(
    (i) =>
      i.slug === item.slug &&
      i.size === item.size &&
      i.notes === item.notes &&
      i.photoName === item.photoName,
  );
  if (match) {
    commit(
      items.map((i) =>
        i.id === match.id ? { ...i, quantity: i.quantity + item.quantity } : i,
      ),
    );
  } else {
    commit([...items, { ...item, id: newLineId() }]);
  }
}

export function updateQuantity(id: string, quantity: number): void {
  commit(
    items
      .map((i) => (i.id === id ? { ...i, quantity } : i))
      .filter((i) => i.quantity > 0),
  );
}

export function removeItem(id: string): void {
  commit(items.filter((i) => i.id !== id));
}

export function clear(): void {
  commit([]);
}
