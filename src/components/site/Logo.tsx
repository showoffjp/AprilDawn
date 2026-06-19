import Link from "next/link";
import { cn } from "@/lib/utils";

/** AprilDawn wordmark with a small rising-sun mark. */
export function Logo({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="AprilDawn home"
    >
      <span className="relative inline-flex h-8 w-8 items-center justify-center">
        <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
          <defs>
            <linearGradient id="adsun" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f4853c" />
              <stop offset="55%" stopColor="#ec3c72" />
              <stop offset="100%" stopColor="#7e54c0" />
            </linearGradient>
          </defs>
          {/* Rays fanning evenly above the sun (a sunburst, not horns). */}
          <g stroke="url(#adsun)" strokeWidth="1.8" strokeLinecap="round">
            <line x1="16" y1="2.5" x2="16" y2="6" />
            <line x1="9.5" y1="4.2" x2="11.3" y2="7" />
            <line x1="22.5" y1="4.2" x2="20.7" y2="7" />
            <line x1="4.6" y1="9" x2="7.2" y2="10.8" />
            <line x1="27.4" y1="9" x2="24.8" y2="10.8" />
          </g>
          {/* Half-sun cresting the horizon. */}
          <path d="M7 21 a9 9 0 0 1 18 0 Z" fill="url(#adsun)" />
          <line x1="3.5" y1="21" x2="28.5" y2="21" stroke="url(#adsun)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      <span
        className={cn(
          "font-display text-xl font-semibold tracking-tight",
          onDark ? "text-white" : "text-ink",
        )}
      >
        April<span className="text-gradient">Dawn</span>
      </span>
    </Link>
  );
}
