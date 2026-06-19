"use client";

import { useEffect, useRef } from "react";

/** Thin gradient progress bar pinned to the very top of the page. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      el.style.width = `${max > 0 ? (doc.scrollTop / max) * 100 : 0}%`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5">
      <div
        ref={ref}
        className="h-full w-0 bg-gradient-to-r from-amber-400 via-dawn-500 to-dusk-500"
      />
    </div>
  );
}
