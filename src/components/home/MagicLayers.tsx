"use client";

import { useRef } from "react";
import { MemoryScene } from "@/components/art/MemoryScene";

/**
 * A Canva-Magic-Layers-style interactive showcase: a flat "photo" card tilts in
 * 3D as you move the cursor, while restored elements lift off it at different
 * depths (parallax) with editor-style selection boxes. Pure CSS 3D + a tiny
 * mouse handler. On-brand metaphor: we lift a flat memory back into life.
 */
export function MagicLayers() {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-py * 12).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * 16).toFixed(2)}deg`);
  }
  function reset() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "7deg");
    el.style.setProperty("--ry", "-13deg");
  }

  return (
    <div className="mx-auto w-full max-w-3xl [perspective:1200px]">
      <style
        dangerouslySetInnerHTML={{
          __html: `
@keyframes ml-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
@keyframes ml-bob2{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
@keyframes ml-bob3{0%,100%{transform:translateY(0) rotate(6deg)}50%{transform:translateY(-11px) rotate(6deg)}}
.ml-bob{animation:ml-bob 4.2s ease-in-out infinite}
.ml-bob2{animation:ml-bob2 5.4s ease-in-out infinite}
.ml-bob3{animation:ml-bob3 4.8s ease-in-out infinite}
`,
        }}
      />
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        className="relative aspect-[4/3] transition-transform duration-300 ease-out [transform-style:preserve-3d]"
        style={{ transform: "rotateX(var(--rx,7deg)) rotateY(var(--ry,-13deg))" }}
      >
        {/* base photo card */}
        <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] shadow-2xl ring-1 ring-black/10">
          <MemoryScene variant="garden" uid="magicbase" />
        </div>

        {/* grid guides to read as an editor */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[1.75rem]"
          style={{
            transform: "translateZ(20px)",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.18) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.18) 1px,transparent 1px)",
            backgroundSize: "12.5% 16.6%",
          }}
        />

        {/* selection box around the subject */}
        <div
          className="absolute left-[34%] top-[42%] h-[44%] w-[30%] rounded-md border-2 border-sky-400"
          style={{ transform: "translateZ(55px)" }}
        >
          <span className="absolute -top-6 left-0 whitespace-nowrap rounded-md bg-sky-400 px-2 py-0.5 text-[10px] font-bold text-white shadow">
            Subject ✨ restored
          </span>
          {["-left-1 -top-1", "-right-1 -top-1", "-left-1 -bottom-1", "-right-1 -bottom-1"].map(
            (p) => (
              <span
                key={p}
                className={`absolute ${p} h-2.5 w-2.5 rounded-[2px] bg-white ring-2 ring-sky-400`}
              />
            ),
          )}
        </div>

        {/* floating layers that pop off the surface */}
        <div className="absolute left-[10%] top-[14%]" style={{ transform: "translateZ(95px)" }}>
          <div className="ml-bob text-4xl drop-shadow-[0_8px_14px_rgba(0,0,0,0.35)]">🦋</div>
        </div>
        <div className="absolute right-[12%] top-[22%]" style={{ transform: "translateZ(120px)" }}>
          <div className="ml-bob2 text-3xl drop-shadow-[0_8px_14px_rgba(0,0,0,0.35)]">🌼</div>
        </div>
        <div className="absolute left-[18%] bottom-[16%]" style={{ transform: "translateZ(80px)" }}>
          <div className="ml-bob text-3xl drop-shadow-[0_8px_14px_rgba(0,0,0,0.35)]">✨</div>
        </div>

        {/* a lifted, restored photo chip */}
        <div
          className="absolute -right-4 -bottom-5 w-32 overflow-hidden rounded-xl shadow-2xl ring-4 ring-white sm:w-40"
          style={{ transform: "translateZ(140px) rotate(6deg)" }}
        >
          <div className="ml-bob3">
            <div className="aspect-[4/3]">
              <MemoryScene variant="birthday" uid="magicchip" />
            </div>
          </div>
        </div>

        {/* tool tag */}
        <div
          className="absolute -left-3 -top-3 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-ink shadow-lg ring-1 ring-ink/10"
          style={{ transform: "translateZ(160px)" }}
        >
          🪄 Magic Restore
        </div>
      </div>
    </div>
  );
}
