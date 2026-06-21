"use client";

import { useRef } from "react";
import { MemoryScene } from "@/components/art/MemoryScene";
import { presetFor } from "@/lib/artStyles";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/useReducedMotion";
import type { CSSProperties } from "react";

type Variant = Parameters<typeof MemoryScene>[0]["variant"];

function Tile({
  label,
  variant,
  pos,
  rotate,
  depth,
  filter,
  overlay,
  blend,
  opacity,
  delay,
}: {
  label: string;
  variant: Variant;
  pos: string;
  rotate: number;
  depth: number;
  filter?: string;
  overlay?: string;
  blend?: CSSProperties["mixBlendMode"];
  opacity?: number;
  delay: string;
}) {
  return (
    <div
      className={cn("absolute", pos)}
      style={{ transform: `rotate(${rotate}deg) translateZ(${depth}px)` }}
    >
      <div
        className="animate-float overflow-hidden rounded-2xl bg-white p-1.5 shadow-soft-lg ring-1 ring-ink/10"
        style={{ animationDelay: delay }}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
          <MemoryScene variant={variant} uid={label} style={{ filter }} />
          {overlay ? (
            <div
              className="absolute inset-0"
              style={{ background: overlay, mixBlendMode: blend, opacity }}
            />
          ) : null}
        </div>
        <div className="px-1 py-1 text-center text-[11px] font-semibold text-ink-soft">
          {label}
        </div>
      </div>
    </div>
  );
}

/** Floating cluster of "memory" tiles that tilts into 3D depth toward the cursor. */
export function HeroCollage() {
  const vg = presetFor("Van Gogh");
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = stage.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-py * 9).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * 12).toFixed(2)}deg`);
  }
  function reset() {
    const el = stage.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <div
      className={cn("relative hidden h-[30rem] lg:block", !reduced && "[perspective:1200px]")}
      aria-hidden="true"
      onMouseMove={reduced ? undefined : onMove}
      onMouseLeave={reduced ? undefined : reset}
    >
      <div
        ref={stage}
        className={cn(
          "relative h-full w-full",
          !reduced && "transition-transform duration-300 ease-out [transform-style:preserve-3d]",
        )}
        style={reduced ? undefined : { transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))" }}
      >
        <Tile
          label="Gallery canvas"
          variant="beach"
          pos="left-2 top-10 w-48"
          rotate={-6}
          depth={30}
          delay="0s"
        />
        <Tile
          label="As a Van Gogh"
          variant="garden"
          pos="right-4 top-0 w-44"
          rotate={6}
          depth={90}
          filter={vg.filter}
          overlay={vg.overlay}
          blend={vg.blend}
          opacity={vg.overlayOpacity}
          delay="1.2s"
        />
        <Tile
          label="Restored 1952"
          variant="sunset"
          pos="bottom-4 left-16 w-44"
          rotate={-3}
          depth={55}
          filter="sepia(0.2) saturate(1.1)"
          delay="0.6s"
        />
        <Tile
          label="On a mug"
          variant="birthday"
          pos="bottom-16 right-0 w-40"
          rotate={3}
          depth={120}
          delay="1.8s"
        />
      </div>
    </div>
  );
}
