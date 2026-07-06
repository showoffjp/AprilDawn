"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { Button } from "@/components/ui/Button";
import { cropToObjectUrl, type CroppedImage } from "@/lib/cropImage";

const MIN_ZOOM = 1;
const MAX_ZOOM = 5;

const clampNum = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

type Point = { x: number; y: number };

/**
 * A zero-dependency "cover" crop editor. The photo always fills the framed
 * viewport (never letterboxed); the user drags to reposition and zooms with the
 * slider, scroll wheel, or a two-finger pinch. Applying rasterizes the exact
 * framed region to real cropped pixels — not a CSS transform.
 */
export function PhotoCropper({
  src,
  aspect,
  title = "Crop your photo",
  onApply,
  onCancel,
}: {
  src: string;
  aspect: number;
  title?: string;
  onApply: (result: CroppedImage) => void;
  onCancel: () => void;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const [vp, setVp] = useState<{ w: number; h: number } | null>(null);
  const [nat, setNat] = useState<{ w: number; h: number } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
  const [busy, setBusy] = useState(false);

  const pointers = useRef<Map<number, Point>>(new Map());
  const panStart = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const pinchStart = useRef<{ dist: number; zoom: number } | null>(null);

  // Constrain an offset so the scaled image can never reveal an edge gap.
  const clampOffset = useCallback(
    (o: Point, z: number): Point => {
      if (!vp || !nat) return o;
      const base = Math.max(vp.w / nat.w, vp.h / nat.h);
      const eff = base * z;
      const maxX = Math.max(0, (nat.w * eff - vp.w) / 2);
      const maxY = Math.max(0, (nat.h * eff - vp.h) / 2);
      return { x: clampNum(o.x, -maxX, maxX), y: clampNum(o.y, -maxY, maxY) };
    },
    [vp, nat],
  );

  const setZoomAndClamp = useCallback(
    (z: number) => {
      const next = clampNum(z, MIN_ZOOM, MAX_ZOOM);
      setZoom(next);
      setOffset((o) => clampOffset(o, next));
    },
    [clampOffset],
  );

  // Measure the framed viewport (and track resizes / orientation changes).
  useLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const measure = () => setVp({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Wheel zoom needs a non-passive listener to preventDefault the page scroll.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setZoomAndClamp(zoom * (1 - e.deltaY * 0.0015));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoom, setZoomAndClamp]);

  // Escape cancels; lock body scroll while the modal is open; focus Apply.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onCancel]);

  function twoPointerDist(): number {
    const pts = [...pointers.current.values()];
    if (pts.length < 2) return 0;
    return Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
  }

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = pointers.current;
    p.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (p.size === 2) {
      pinchStart.current = { dist: twoPointerDist(), zoom };
      panStart.current = null;
    } else if (p.size === 1) {
      panStart.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
    }
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const p = pointers.current;
    if (!p.has(e.pointerId)) return;
    p.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (p.size >= 2 && pinchStart.current) {
      const dist = twoPointerDist();
      if (dist > 0) {
        setZoomAndClamp(pinchStart.current.zoom * (dist / pinchStart.current.dist));
      }
    } else if (panStart.current) {
      const dx = e.clientX - panStart.current.x;
      const dy = e.clientY - panStart.current.y;
      setOffset(
        clampOffset({ x: panStart.current.ox + dx, y: panStart.current.oy + dy }, zoom),
      );
    }
  }

  function endPointer(e: ReactPointerEvent<HTMLDivElement>) {
    const p = pointers.current;
    p.delete(e.pointerId);
    if (p.size < 2) pinchStart.current = null;
    if (p.size === 1) {
      const [only] = [...p.values()];
      panStart.current = { x: only.x, y: only.y, ox: offset.x, oy: offset.y };
    } else if (p.size === 0) {
      panStart.current = null;
    }
  }

  // Geometry, always computed from a clamped offset so the view is never invalid.
  const clamped = clampOffset(offset, zoom);
  const geo =
    vp && nat
      ? (() => {
          const base = Math.max(vp.w / nat.w, vp.h / nat.h);
          const eff = base * zoom;
          const Rw = nat.w * eff;
          const Rh = nat.h * eff;
          const left = (vp.w - Rw) / 2 + clamped.x;
          const top = (vp.h - Rh) / 2 + clamped.y;
          return { eff, Rw, Rh, left, top };
        })()
      : null;

  async function apply() {
    const img = imgRef.current;
    if (!img || !geo || !vp || busy) return;
    setBusy(true);
    try {
      const result = await cropToObjectUrl(img, {
        sx: (0 - geo.left) / geo.eff,
        sy: (0 - geo.top) / geo.eff,
        sWidth: vp.w / geo.eff,
        sHeight: vp.h / geo.eff,
      });
      onApply(result);
    } catch {
      setBusy(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className="w-full max-w-md rounded-3xl bg-white p-5 shadow-soft-lg outline-none sm:p-6"
      >
        <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Drag to reposition · scroll or pinch to zoom. We&apos;ll print exactly
          what you frame.
        </p>

        <div
          ref={frameRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endPointer}
          onPointerCancel={endPointer}
          className="relative mt-4 w-full touch-none overflow-hidden rounded-2xl bg-ink/90 cursor-grab select-none active:cursor-grabbing"
          style={{ aspectRatio: String(aspect) }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={src}
            alt=""
            draggable={false}
            onLoad={(e) =>
              setNat({
                w: e.currentTarget.naturalWidth,
                h: e.currentTarget.naturalHeight,
              })
            }
            className="pointer-events-none absolute select-none"
            style={
              geo
                ? { left: geo.left, top: geo.top, width: geo.Rw, height: geo.Rh, maxWidth: "none" }
                : { opacity: 0 }
            }
          />
          {/* Rule-of-thirds guide */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute inset-y-0 left-1/3 w-px bg-white/40" />
            <div className="absolute inset-y-0 left-2/3 w-px bg-white/40" />
            <div className="absolute inset-x-0 top-1/3 h-px bg-white/40" />
            <div className="absolute inset-x-0 top-2/3 h-px bg-white/40" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/30" />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-xs font-medium text-ink-soft" aria-hidden="true">
            −
          </span>
          <input
            type="range"
            aria-label="Zoom"
            min={MIN_ZOOM}
            max={MAX_ZOOM}
            step={0.01}
            value={zoom}
            onChange={(e) => setZoomAndClamp(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-cream-deep accent-dawn-500"
          />
          <span className="text-lg font-medium text-ink-soft" aria-hidden="true">
            +
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              setZoomAndClamp(MIN_ZOOM);
              setOffset({ x: 0, y: 0 });
            }}
            className="text-sm font-medium text-ink-soft hover:text-ink"
          >
            Reset
          </button>
          <div className="flex gap-3">
            <Button variant="ghost" size="sm" onClick={onCancel}>
              Cancel
            </Button>
            <Button size="sm" onClick={apply} disabled={busy || !geo}>
              {busy ? "Cropping…" : "Apply crop"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
