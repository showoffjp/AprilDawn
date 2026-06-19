import { MemoryScene } from "@/components/art/MemoryScene";
import { presetFor } from "@/lib/artStyles";
import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

type Variant = Parameters<typeof MemoryScene>[0]["variant"];

function Tile({
  label,
  variant,
  className,
  filter,
  overlay,
  blend,
  opacity,
  delay,
}: {
  label: string;
  variant: Variant;
  className: string;
  filter?: string;
  overlay?: string;
  blend?: CSSProperties["mixBlendMode"];
  opacity?: number;
  delay: string;
}) {
  return (
    <div
      className={cn(
        "animate-float absolute overflow-hidden rounded-2xl bg-white p-1.5 shadow-soft-lg ring-1 ring-ink/10",
        className,
      )}
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
  );
}

/** Floating cluster of colorful "memory" tiles shown beside the hero copy. */
export function HeroCollage() {
  const vg = presetFor("Van Gogh");
  return (
    <div className="relative hidden h-[30rem] lg:block" aria-hidden="true">
      <Tile
        label="Gallery canvas"
        variant="beach"
        className="left-2 top-10 w-48 -rotate-6"
        delay="0s"
      />
      <Tile
        label="As a Van Gogh"
        variant="garden"
        className="right-4 top-0 w-44 rotate-6"
        filter={vg.filter}
        overlay={vg.overlay}
        blend={vg.blend}
        opacity={vg.overlayOpacity}
        delay="1.2s"
      />
      <Tile
        label="Restored 1952"
        variant="sunset"
        className="bottom-4 left-16 w-44 -rotate-3"
        filter="sepia(0.2) saturate(1.1)"
        delay="0.6s"
      />
      <Tile
        label="On a mug"
        variant="birthday"
        className="bottom-16 right-0 w-40 rotate-3"
        delay="1.8s"
      />
    </div>
  );
}
