"use client";

import { useMemo, useRef, useState } from "react";
import { type Product } from "@/lib/products";
import {
  mockupKind,
  sizeOptionsFor,
  premiumAddons,
} from "@/lib/designer";
import { presetFor, previewableStyles } from "@/lib/artStyles";
import { useCart } from "./CartProvider";
import { ProductMockup } from "./ProductMockup";
import { Button } from "@/components/ui/Button";
import { usd, cn } from "@/lib/utils";

const STYLE_CHIPS = ["None", ...previewableStyles];

export function ProductDesigner({ product }: { product: Product }) {
  const kind = mockupKind(product.category);
  const sizes = sizeOptionsFor(product);

  const [imageSrc, setImageSrc] = useState<string>("");
  const [photoName, setPhotoName] = useState<string>("");
  const [styleName, setStyleName] = useState<string>("None");
  const [scale, setScale] = useState(1);
  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [saturation, setSaturation] = useState(1);
  const [warmth, setWarmth] = useState(0);
  const [grayscale, setGrayscale] = useState(false);
  const [sizeIdx, setSizeIdx] = useState(0);
  const [addons, setAddons] = useState<Set<string>>(new Set());
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { addItem } = useCart();

  const preset = styleName === "None" ? undefined : presetFor(styleName);
  const filter = useMemo(() => {
    const adjust = `brightness(${brightness}) contrast(${contrast}) saturate(${saturation}) sepia(${warmth})${
      grayscale ? " grayscale(1)" : ""
    }`;
    return preset ? `${preset.filter} ${adjust}` : adjust;
  }, [preset, brightness, contrast, saturation, warmth, grayscale]);

  const sizeDelta = sizes[sizeIdx]?.delta ?? 0;
  const addonsTotal = premiumAddons
    .filter((a) => addons.has(a.key))
    .reduce((s, a) => s + a.price, 0);
  const unitPrice = Math.round((product.priceFrom + sizeDelta + addonsTotal) * 100) / 100;

  function onPhoto(file?: File) {
    if (!file) return;
    setPhotoName(file.name);
    if (file.type.startsWith("image/")) setImageSrc(URL.createObjectURL(file));
  }

  function toggleAddon(key: string) {
    setAddons((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function add() {
    const parts: string[] = [];
    if (styleName !== "None") parts.push(`${styleName} style`);
    const edited =
      brightness !== 1 || contrast !== 1 || saturation !== 1 || warmth !== 0 || grayscale;
    if (edited) parts.push("custom color edit");
    premiumAddons
      .filter((a) => addons.has(a.key))
      .forEach((a) => parts.push(a.label));

    addItem({
      slug: product.slug,
      name: product.name,
      emoji: product.emoji,
      unitPrice,
      quantity,
      size: sizes[sizeIdx]?.label,
      photoName: photoName || undefined,
      notes: parts.join(" · ") || undefined,
    });
    setAdded(true);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr]">
      {/* Live preview */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <ProductMockup
          kind={kind}
          photo={{
            imageSrc,
            filter,
            transform: `scale(${scale})`,
            overlay: preset?.overlay,
            blend: preset?.blend,
            overlayOpacity: preset?.overlayOpacity,
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-ink/20 bg-white py-3 text-sm font-medium text-ink transition hover:border-dawn-300 hover:bg-dawn-50/50"
        >
          📷 {photoName ? `${photoName} — change` : "Upload your photo to preview it"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onPhoto(e.target.files?.[0])}
        />
        <p className="mt-2 text-center text-xs text-ink-soft">
          Live preview · we send free proofs before anything is produced
        </p>
      </div>

      {/* Controls */}
      <div className="rounded-3xl bg-white p-6 ring-1 ring-ink/10 sm:p-7">
        {/* Art styles */}
        <Label>Art style</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {STYLE_CHIPS.map((s) => (
            <Chip key={s} active={styleName === s} onClick={() => setStyleName(s)}>
              {s}
            </Chip>
          ))}
        </div>

        {/* Adjustments */}
        <Label className="mt-6">Adjust</Label>
        <div className="mt-2 space-y-3">
          <Slider label="Zoom" value={scale} min={0.6} max={1.8} step={0.02} onChange={setScale} />
          <Slider label="Brightness" value={brightness} min={0.5} max={1.6} step={0.02} onChange={setBrightness} />
          <Slider label="Contrast" value={contrast} min={0.5} max={1.8} step={0.02} onChange={setContrast} />
          <Slider label="Saturation" value={saturation} min={0} max={2.2} step={0.02} onChange={setSaturation} />
          <Slider label="Warmth" value={warmth} min={0} max={1} step={0.02} onChange={setWarmth} />
          <label className="flex items-center gap-2 pt-1 text-sm text-ink">
            <input
              type="checkbox"
              checked={grayscale}
              onChange={(e) => setGrayscale(e.target.checked)}
              className="h-4 w-4 accent-dawn-500"
            />
            Black &amp; white
          </label>
        </div>

        {/* Size */}
        {sizes.length > 0 ? (
          <>
            <Label className="mt-6">Size</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {sizes.map((s, i) => (
                <Chip key={s.label} active={sizeIdx === i} onClick={() => setSizeIdx(i)}>
                  {s.label}
                  {s.delta > 0 ? ` +$${s.delta}` : ""}
                </Chip>
              ))}
            </div>
          </>
        ) : null}

        {/* Add-ons */}
        <Label className="mt-6">Premium add-ons</Label>
        <div className="mt-2 space-y-2">
          {premiumAddons.map((a) => (
            <label
              key={a.key}
              className="flex cursor-pointer items-center justify-between rounded-xl bg-cream px-3 py-2.5 text-sm ring-1 ring-ink/10"
            >
              <span className="flex items-center gap-2 text-ink">
                <input
                  type="checkbox"
                  checked={addons.has(a.key)}
                  onChange={() => toggleAddon(a.key)}
                  className="h-4 w-4 accent-dawn-500"
                />
                {a.label}
              </span>
              <span className="font-semibold text-ink">+{usd(a.price)}</span>
            </label>
          ))}
        </div>

        {/* Quantity + add */}
        <div className="mt-6 flex items-center justify-between">
          <Label>Quantity</Label>
          <div className="inline-flex items-center rounded-full ring-1 ring-ink/15">
            <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="h-9 w-9 rounded-l-full text-lg hover:bg-ink/5" aria-label="Decrease">−</button>
            <span className="w-9 text-center text-sm font-semibold">{quantity}</span>
            <button type="button" onClick={() => setQuantity((q) => q + 1)} className="h-9 w-9 rounded-r-full text-lg hover:bg-ink/5" aria-label="Increase">+</button>
          </div>
        </div>

        {added ? (
          <div className="mt-6 rounded-2xl bg-dawn-50 p-4 text-center ring-1 ring-dawn-200">
            <p className="text-sm font-medium text-ink">✓ Added to your cart</p>
            <div className="mt-3 flex justify-center gap-2">
              <Button href="/cart" size="sm">View cart</Button>
              <Button size="sm" variant="ghost" onClick={() => setAdded(false)}>Keep designing</Button>
            </div>
          </div>
        ) : (
          <Button className="mt-6 w-full" size="lg" onClick={add}>
            Add to cart · {usd(unitPrice * quantity)}
          </Button>
        )}
      </div>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("block text-sm font-semibold text-ink", className)}>
      {children}
    </span>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-9 rounded-full px-3.5 text-sm font-medium ring-1 transition",
        active
          ? "bg-ink text-cream ring-ink"
          : "bg-white text-ink ring-ink/15 hover:ring-dawn-300",
      )}
    >
      {children}
    </button>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs text-ink-soft">
        <span>{label}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 h-2 w-full cursor-pointer appearance-none rounded-full bg-cream-deep accent-dawn-500"
      />
    </div>
  );
}
