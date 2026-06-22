"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";

const KEY = "aprildawn.cart.lastSeen";
/** A gap longer than this since the last visit counts as a "return". */
const GAP_MS = 30 * 60 * 1000;

/**
 * Gentle "welcome back, your cart is saved" nudge for returning shoppers.
 * The cart already persists in localStorage; this surfaces it so an abandoned
 * cart isn't silently forgotten. Shows only after a real time gap, never on the
 * cart/checkout pages, and is dismissible.
 */
export function CartSaveBanner() {
  const { count } = useCart();
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const lastSeenRef = useRef<number | null>(null);
  const decidedRef = useRef(false);

  // Read the previous "last seen" timestamp once, before we touch it.
  useEffect(() => {
    try {
      lastSeenRef.current = Number(window.localStorage.getItem(KEY)) || 0;
    } catch {
      lastSeenRef.current = 0;
    }
  }, []);

  // Decide once the cart count has hydrated from storage.
  useEffect(() => {
    if (decidedRef.current || lastSeenRef.current === null) return;
    if (count > 0) {
      decidedRef.current = true;
      const now = Date.now();
      if (lastSeenRef.current > 0 && now - lastSeenRef.current > GAP_MS) {
        setShow(true);
      }
      try {
        window.localStorage.setItem(KEY, String(now));
      } catch {
        // ignore storage errors
      }
    }
  }, [count]);

  // Keep the timestamp fresh while the shopper is active.
  useEffect(() => {
    const touch = () => {
      try {
        window.localStorage.setItem(KEY, String(Date.now()));
      } catch {
        // ignore storage errors
      }
    };
    document.addEventListener("visibilitychange", touch);
    window.addEventListener("beforeunload", touch);
    return () => {
      document.removeEventListener("visibilitychange", touch);
      window.removeEventListener("beforeunload", touch);
    };
  }, []);

  if (dismissed || !show || count === 0) return null;
  if (pathname === "/cart" || pathname === "/checkout") return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-xs rounded-2xl bg-white p-4 shadow-soft-lg ring-1 ring-ink/10">
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="absolute right-2.5 top-2.5 text-ink-soft transition hover:text-ink"
      >
        ✕
      </button>
      <p className="text-sm font-semibold text-ink">👋 Welcome back</p>
      <p className="mt-1 text-xs text-ink-soft">
        Your cart is right where you left it — {count}{" "}
        {count === 1 ? "item" : "items"} saved.
      </p>
      <Link
        href="/cart"
        onClick={() => setDismissed(true)}
        className="mt-3 inline-block rounded-full bg-dawn-500 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-dawn-600"
      >
        View cart →
      </Link>
    </div>
  );
}
