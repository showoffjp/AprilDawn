"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { type Product, productHasSizes } from "@/lib/products";
import { APPAREL_SIZES } from "@/lib/cart";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useCart } from "./CartProvider";

export function AddToCartForm({ product }: { product: Product }) {
  const hasSizes = productHasSizes(product);
  const [size, setSize] = useState<string>(hasSizes ? "M" : "");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [photoName, setPhotoName] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const [added, setAdded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addItem } = useCart();

  function onPhoto(file?: File) {
    if (!file) return;
    setPhotoName(file.name);
    if (file.type.startsWith("image/")) setPreview(URL.createObjectURL(file));
  }

  function add() {
    addItem({
      slug: product.slug,
      name: product.name,
      emoji: product.emoji,
      unitPrice: product.priceFrom,
      quantity,
      size: hasSizes ? size : undefined,
      photoName: photoName || undefined,
      notes: notes.trim() || undefined,
    });
    setAdded(true);
  }

  return (
    <div className="rounded-3xl bg-white p-6 ring-1 ring-ink/10 sm:p-8">
      {/* Photo */}
      <div>
        <span className="text-sm font-medium text-ink">Your photo</span>
        <div
          onClick={() => inputRef.current?.click()}
          className="mt-2 flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-dashed border-ink/20 bg-cream p-4 transition hover:border-dawn-300"
        >
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-cream-deep text-2xl">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="" className="h-full w-full object-cover" />
            ) : (
              "🖼️"
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-ink">
              {photoName || "Click to add a photo"}
            </p>
            <p className="text-xs text-ink-soft">
              JPG, PNG, HEIC — or add it later from your vault
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onPhoto(e.target.files?.[0])}
          />
        </div>
      </div>

      {/* Size */}
      {hasSizes ? (
        <div className="mt-6">
          <span className="text-sm font-medium text-ink">Size</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {APPAREL_SIZES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={cn(
                  "h-10 min-w-12 rounded-full px-3 text-sm font-medium ring-1 transition",
                  size === s
                    ? "bg-ink text-cream ring-ink"
                    : "bg-white text-ink ring-ink/15 hover:ring-ink/40",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {/* Quantity */}
      <div className="mt-6">
        <span className="text-sm font-medium text-ink">Quantity</span>
        <div className="mt-2 inline-flex items-center rounded-full ring-1 ring-ink/15">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="h-10 w-10 rounded-l-full text-lg hover:bg-ink/5"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-10 text-center text-sm font-semibold">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="h-10 w-10 rounded-r-full text-lg hover:bg-ink/5"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Notes */}
      <div className="mt-6">
        <label htmlFor="notes" className="text-sm font-medium text-ink">
          Personalization notes <span className="text-ink-soft">(optional)</span>
        </label>
        <textarea
          id="notes"
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. ‘Happy 90th Grandma!’ · crop to faces · sepia tone"
          className="mt-1.5 w-full rounded-xl border border-ink/15 bg-cream px-3 py-2.5 text-sm focus:border-dawn-400 focus:outline-none"
        />
      </div>

      {/* Add */}
      {added ? (
        <div className="mt-6 rounded-2xl bg-dawn-50 p-4 text-center ring-1 ring-dawn-200">
          <p className="text-sm font-medium text-ink">✓ Added to your cart</p>
          <div className="mt-3 flex justify-center gap-2">
            <Button href="/cart" size="sm">
              View cart
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setAdded(false)}
            >
              Keep customizing
            </Button>
          </div>
        </div>
      ) : (
        <Button className="mt-6 w-full" size="lg" onClick={add}>
          Add to cart · ${(product.priceFrom * quantity).toFixed(0)}
        </Button>
      )}

      <p className="mt-3 text-center text-xs text-ink-soft">
        Free proofs before production · no charge until you approve ·{" "}
        <Link href="/upload" className="text-dawn-600">
          mail in originals
        </Link>
      </p>
    </div>
  );
}
