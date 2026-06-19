"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export function CartIndicator({ className }: { className?: string }) {
  const { count } = useCart();
  return (
    <Link
      href="/cart"
      className={className}
      aria-label={`Cart with ${count} item${count === 1 ? "" : "s"}`}
    >
      <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-inset ring-ink/15 transition hover:bg-ink/5">
        <span aria-hidden="true" className="text-lg">
          🛍️
        </span>
        {count > 0 ? (
          <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-dawn-500 px-1 text-[11px] font-bold text-white">
            {count}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
