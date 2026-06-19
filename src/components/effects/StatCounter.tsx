"use client";

import { useEffect, useRef, useState } from "react";

function parse(value: string): { target: number | null; suffix: string } {
  const m = value.match(/^([\d,]+)(.*)$/);
  if (!m) return { target: null, suffix: value };
  return { target: Number(m[1].replace(/,/g, "")), suffix: m[2] };
}

export function StatCounter({ value, label }: { value: string; label: string }) {
  const { target, suffix } = parse(value);
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(target === null ? value : `0${suffix}`);

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1300;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(target * eased).toLocaleString() + suffix);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, suffix]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-3xl font-semibold text-ink sm:text-4xl">
        {display}
      </div>
      <div className="mt-1 text-xs font-medium uppercase tracking-wide text-ink-soft">
        {label}
      </div>
    </div>
  );
}
