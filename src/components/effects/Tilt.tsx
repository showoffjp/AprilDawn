"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Reusable interactive 3D tilt. Wrap any card/image and it leans toward the
 * cursor in perspective with an optional moving glare highlight, then eases
 * back on leave. Pure transforms — cheap and smooth.
 */
export function Tilt({
  children,
  className,
  containerClassName,
  radiusClass = "rounded-3xl",
  max = 9,
  glare = true,
  clip = true,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  radiusClass?: string;
  max?: number;
  glare?: boolean;
  clip?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={containerClassName}>
        <div className={cn("relative", clip && cn("overflow-hidden", radiusClass), className)}>
          {children}
        </div>
      </div>
    );
  }

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-py * max).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * max).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${(px * 100 + 50).toFixed(1)}%`);
    el.style.setProperty("--gy", `${(py * 100 + 50).toFixed(1)}%`);
  }
  function reset() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <div className={cn("[perspective:1000px]", containerClassName)}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        className={cn(
          "relative transition-transform duration-200 ease-out [transform-style:preserve-3d] will-change-transform",
          clip && cn("overflow-hidden", radiusClass),
          className,
        )}
        style={{ transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))" }}
      >
        {children}
        {glare ? (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,0.32), rgba(255,255,255,0) 55%)",
              mixBlendMode: "soft-light",
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
