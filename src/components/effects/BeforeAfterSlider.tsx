"use client";

import { useCallback, useRef, useState } from "react";
import { MemoryScene } from "@/components/art/MemoryScene";
import { cn } from "@/lib/utils";

/** Drag to compare a "damaged" original with the restored version. */
export function BeforeAfterSlider({ className }: { className?: string }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  return (
    <div
      ref={ref}
      role="slider"
      aria-label="Before and after restoration comparison"
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={`${Math.round(pos)}% restored`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
        if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
        if (e.key === "Home") setPos(0);
        if (e.key === "End") setPos(100);
      }}
      className={cn(
        "relative aspect-[3/2] w-full cursor-ew-resize select-none overflow-hidden rounded-3xl ring-1 ring-ink/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-dawn-400 focus-visible:ring-offset-2",
        className,
      )}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
    >
      {/* After (restored) */}
      <div className="absolute inset-0">
        <MemoryScene
          variant="picnic"
          uid="after"
          style={{ filter: "saturate(1.2) contrast(1.06) brightness(1.03)" }}
        />
      </div>

      {/* Before (damaged), revealed on the left */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)` }}
      >
        <MemoryScene
          variant="picnic"
          uid="before"
          style={{ filter: "sepia(0.7) saturate(0.4) contrast(0.82) brightness(0.9)" }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(115deg, rgba(0,0,0,0.06) 0 1.5px, transparent 1.5px 28px), radial-gradient(circle at 28% 18%, rgba(120,90,40,0.28), transparent 62%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_90px_rgba(60,40,20,0.55)]" />
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-dawn-500 px-2.5 py-1 text-xs font-semibold text-white">
        After ✨
      </span>

      {/* Handle */}
      <div
        className="pointer-events-none absolute inset-y-0"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="mx-auto h-full w-0.5 bg-white/90" />
        <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-sm text-ink shadow-lg ring-1 ring-ink/10">
          ↔
        </div>
      </div>
    </div>
  );
}
