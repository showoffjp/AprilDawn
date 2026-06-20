"use client";

import { useEffect, useRef } from "react";

/**
 * Site-wide living background: a soft, drifting gradient mesh fixed behind all
 * content. As you scroll, content glides over it (parallax depth) and the blobs
 * slowly drift, so every "empty" area is gently filled with color and motion.
 * Kept subtle so text stays crisp; solid sections/cards sit on top for rhythm.
 */
export function SiteBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY * 0.05, 260);
        if (ref.current) ref.current.style.transform = `translate3d(0, ${y}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden"
      style={{ zIndex: -10, backgroundColor: "var(--color-cream)" }}
    >
      <div ref={ref} className="absolute -inset-[25%]">
        <div className="animate-blob1 absolute left-[2%] top-[2%] h-[42vw] w-[42vw] rounded-full bg-dawn-300/30 blur-[100px]" />
        <div className="animate-blob2 absolute right-[2%] top-[8%] h-[40vw] w-[40vw] rounded-full bg-amber-300/30 blur-[100px]" />
        <div className="animate-blob3 absolute left-[28%] top-[36%] h-[38vw] w-[38vw] rounded-full bg-fuchsia-300/18 blur-[110px]" />
        <div className="animate-blob2 absolute left-[6%] top-[64%] h-[40vw] w-[40vw] rounded-full bg-dusk-400/22 blur-[100px]" />
        <div className="animate-blob1 absolute right-[8%] top-[58%] h-[40vw] w-[40vw] rounded-full bg-sky-300/22 blur-[100px]" />
        <div className="animate-blob3 absolute right-[26%] top-[88%] h-[38vw] w-[38vw] rounded-full bg-emerald-200/22 blur-[110px]" />
      </div>
    </div>
  );
}
