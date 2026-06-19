"use client";

import { useMemo, useRef, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/Button";
import { usd, cn } from "@/lib/utils";

type Photo = { id: string; src: string; name: string };
type Cell = { r: number; c: number };

const MAX = 12;
const MIN = 1;

function keyOf(r: number, c: number) {
  return `${r}-${c}`;
}

function rangeBetween(a: Cell, b: Cell): string[] {
  const r0 = Math.min(a.r, b.r);
  const r1 = Math.max(a.r, b.r);
  const c0 = Math.min(a.c, b.c);
  const c1 = Math.max(a.c, b.c);
  const keys: string[] = [];
  for (let r = r0; r <= r1; r++) for (let c = c0; c <= c1; c++) keys.push(keyOf(r, c));
  return keys;
}

export function LivingWallDesigner() {
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(7);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [assign, setAssign] = useState<Record<string, string>>({});
  const [erase, setErase] = useState(false);
  const [selection, setSelection] = useState<Set<string>>(new Set());
  const [added, setAdded] = useState(false);

  const dragging = useRef(false);
  const origin = useRef<Cell | null>(null);
  const selRef = useRef<Set<string>>(new Set());
  const fileRef = useRef<HTMLInputElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const { addItem } = useCart();

  const cellCount = rows * cols;
  const price = 149 + cellCount * 18;
  const filled = useMemo(
    () =>
      Object.keys(assign).filter((k) => {
        const [r, c] = k.split("-").map(Number);
        return r < rows && c < cols && assign[k];
      }).length,
    [assign, rows, cols],
  );

  const photoById = (id?: string) => photos.find((p) => p.id === id);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next: Photo[] = Array.from(list)
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => ({
        id: `${f.name}-${Math.random().toString(36).slice(2, 7)}`,
        src: URL.createObjectURL(f),
        name: f.name,
      }));
    setPhotos((prev) => {
      const merged = [...prev, ...next];
      if (!activeId && merged[0]) setActiveId(merged[0].id);
      return merged;
    });
  }

  function applyTo(keys: Iterable<string>) {
    setAssign((prev) => {
      const a = { ...prev };
      for (const k of keys) {
        if (erase) delete a[k];
        else if (activeId) a[k] = activeId;
      }
      return a;
    });
  }

  function cellFromPoint(x: number, y: number): Cell | null {
    const el = document.elementFromPoint(x, y) as HTMLElement | null;
    const cell = el?.closest?.("[data-cell]") as HTMLElement | null;
    if (!cell) return null;
    return { r: Number(cell.dataset.r), c: Number(cell.dataset.c) };
  }

  function onPointerDown(e: React.PointerEvent) {
    const cell = cellFromPoint(e.clientX, e.clientY);
    if (!cell) return;
    dragging.current = true;
    origin.current = cell;
    const s = new Set(rangeBetween(cell, cell));
    selRef.current = s;
    setSelection(s);
    gridRef.current?.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current || !origin.current) return;
    const cell = cellFromPoint(e.clientX, e.clientY);
    if (!cell) return;
    const s = new Set(rangeBetween(origin.current, cell));
    selRef.current = s;
    setSelection(s);
  }

  function endDrag() {
    if (dragging.current && selRef.current.size) applyTo(selRef.current);
    dragging.current = false;
    origin.current = null;
    selRef.current = new Set();
    setSelection(new Set());
  }

  function autoFill() {
    if (!photos.length) return;
    const a: Record<string, string> = {};
    let i = 0;
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) {
        a[keyOf(r, c)] = photos[i % photos.length].id;
        i++;
      }
    setAssign(a);
  }

  function shuffle() {
    if (!photos.length) return;
    const a: Record<string, string> = {};
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) {
        a[keyOf(r, c)] = photos[Math.floor(Math.random() * photos.length)].id;
      }
    setAssign(a);
  }

  function add() {
    addItem({
      slug: "living-wall",
      name: "Custom Living Wall",
      emoji: "🧱",
      unitPrice: price,
      quantity: 1,
      notes: `${rows}×${cols} grid · ${filled} of ${cellCount} tiles placed`,
    });
    setAdded(true);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      {/* The wall */}
      <div>
        <div
          ref={gridRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className="grid touch-none select-none gap-1.5 rounded-2xl bg-ink/90 p-3 shadow-inner"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((__, c) => {
              const k = keyOf(r, c);
              const photo = photoById(assign[k]);
              const selected = selection.has(k);
              return (
                <div
                  key={k}
                  data-cell
                  data-r={r}
                  data-c={c}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const id = e.dataTransfer.getData("text/plain");
                    if (id) setAssign((a) => ({ ...a, [k]: id }));
                  }}
                  className={cn(
                    "relative aspect-square overflow-hidden rounded-[3px] transition",
                    selected ? "ring-2 ring-amber-300" : "ring-1 ring-white/10",
                  )}
                >
                  {photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={photo.src} alt="" className="h-full w-full object-cover" draggable={false} />
                  ) : (
                    <div className="h-full w-full bg-white/5" />
                  )}
                  {selected ? <div className="absolute inset-0 bg-amber-300/25" /> : null}
                </div>
              );
            }),
          )}
        </div>
        <p className="mt-3 text-center text-xs text-ink-soft">
          Tap a tile to place your photo · click-drag to fill a whole region ·
          drag a photo from the tray onto any tile
        </p>
      </div>

      {/* Controls */}
      <div className="rounded-3xl bg-white p-6 ring-1 ring-ink/10">
        {/* Dimensions */}
        <p className="text-sm font-semibold text-ink">Wall size</p>
        <div className="mt-2 flex items-center gap-6">
          <Stepper label="Rows" value={rows} set={setRows} />
          <Stepper label="Columns" value={cols} set={setCols} />
        </div>
        <p className="mt-1 text-xs text-ink-soft">
          {rows} × {cols} = {cellCount} tiles (up to {MAX} × {MAX})
        </p>

        {/* Photos */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm font-semibold text-ink">Your photos</p>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="text-sm font-semibold text-dawn-600 hover:underline"
          >
            + Upload
          </button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
        {photos.length === 0 ? (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="mt-2 flex w-full flex-col items-center gap-1 rounded-2xl border-2 border-dashed border-ink/20 bg-cream px-4 py-6 text-center text-sm text-ink-soft transition hover:border-dawn-300"
          >
            <span className="text-2xl">🖼️</span>
            Upload a few photos to begin
          </button>
        ) : (
          <div className="mt-2 flex flex-wrap gap-2">
            {photos.map((p) => (
              <button
                key={p.id}
                type="button"
                draggable
                onDragStart={(e) => e.dataTransfer.setData("text/plain", p.id)}
                onClick={() => {
                  setActiveId(p.id);
                  setErase(false);
                }}
                className={cn(
                  "h-12 w-12 overflow-hidden rounded-lg ring-2 transition",
                  activeId === p.id && !erase ? "ring-dawn-500" : "ring-transparent hover:ring-ink/20",
                )}
                title={p.name}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.name} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Tools */}
        <p className="mt-6 text-sm font-semibold text-ink">Tools</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Tool onClick={() => setErase((v) => !v)} active={erase}>
            🧽 Erase
          </Tool>
          <Tool onClick={autoFill}>✨ Auto-fill</Tool>
          <Tool onClick={shuffle}>🔀 Shuffle</Tool>
          <Tool onClick={() => setAssign({})}>🗑️ Clear</Tool>
        </div>

        {/* Price + actions */}
        <div className="mt-6 rounded-2xl bg-cream-deep p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-ink-soft">
              {filled} of {cellCount} tiles placed
            </span>
            <span className="font-display text-2xl font-semibold text-ink">
              {usd(price)}
            </span>
          </div>
        </div>

        {added ? (
          <div className="mt-4 rounded-2xl bg-dawn-50 p-4 text-center ring-1 ring-dawn-200">
            <p className="text-sm font-medium text-ink">✓ Living Wall added to cart</p>
            <div className="mt-3 flex justify-center gap-2">
              <Button href="/cart" size="sm">View cart</Button>
              <Button size="sm" variant="ghost" onClick={() => setAdded(false)}>
                Keep designing
              </Button>
            </div>
          </div>
        ) : (
          <Button className="mt-4 w-full" size="lg" onClick={add}>
            Add my Living Wall · {usd(price)}
          </Button>
        )}

        <p className="mt-4 text-center text-xs text-ink-soft">
          Don&apos;t want to design it yourself?{" "}
          <a href="/contact" className="font-semibold text-dawn-600">
            Have a specialist build it for you →
          </a>
        </p>
      </div>
    </div>
  );
}

function Stepper({
  label,
  value,
  set,
}: {
  label: string;
  value: number;
  set: (n: number) => void;
}) {
  return (
    <div>
      <span className="text-xs text-ink-soft">{label}</span>
      <div className="mt-1 inline-flex items-center rounded-full ring-1 ring-ink/15">
        <button
          type="button"
          onClick={() => set(Math.max(MIN, value - 1))}
          className="h-9 w-9 rounded-l-full text-lg hover:bg-ink/5"
          aria-label={`Fewer ${label}`}
        >
          −
        </button>
        <span className="w-8 text-center text-sm font-semibold">{value}</span>
        <button
          type="button"
          onClick={() => set(Math.min(MAX, value + 1))}
          className="h-9 w-9 rounded-r-full text-lg hover:bg-ink/5"
          aria-label={`More ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

function Tool({
  children,
  onClick,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-9 rounded-full px-3.5 text-sm font-medium ring-1 transition",
        active
          ? "bg-dawn-500 text-white ring-dawn-500"
          : "bg-white text-ink ring-ink/15 hover:ring-dawn-300",
      )}
    >
      {children}
    </button>
  );
}
