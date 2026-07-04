"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartProvider";
import type { Product } from "@/lib/products";

/**
 * Adds every product in a bundle to the cart in one tap. Items dedupe by slug
 * in the cart store, so re-adding just bumps quantity.
 *
 * The wrapper is a persistent aria-live region (it exists from mount, so the
 * confirmation swap is actually announced), and focus moves to "View cart"
 * when the add button unmounts.
 */
export function AddBundleToCart({ products }: { products: Product[] }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const viewCartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (added) viewCartRef.current?.querySelector("a")?.focus();
  }, [added]);

  function addAll() {
    products.forEach((p) =>
      addItem({
        slug: p.slug,
        name: p.name,
        emoji: p.emoji,
        unitPrice: p.priceFrom,
        quantity: 1,
      }),
    );
    setAdded(true);
  }

  return (
    <div aria-live="polite">
      {added ? (
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-ink">
            ✓ Added {products.length} items to your cart
          </span>
          <div ref={viewCartRef} className="contents">
            <Button href="/cart" size="lg">
              View cart →
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setAdded(false)}
            className="text-sm font-semibold text-dawn-600 hover:underline"
          >
            Add again
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={addAll} size="lg">
            Add all {products.length} to cart
          </Button>
          <Link
            href="/upload"
            className="text-sm font-semibold text-dawn-600 hover:underline"
          >
            or upload a photo first →
          </Link>
        </div>
      )}
    </div>
  );
}
