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
          <circle cx="16" cy="18" r="8" fill="url(#adsun)" />
          <g stroke="url(#adsun)" strokeWidth="2" strokeLinecap="round">
            <line x1="16" y1="3" x2="16" y2="6.5" />
            <line x1="4.5" y1="8" x2="7" y2="10.5" />
            <line x1="27.5" y1="8" x2="25" y2="10.5" />
          </g>
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
