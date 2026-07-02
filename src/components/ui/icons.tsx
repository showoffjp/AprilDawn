/**
 * Small, consistent inline-SVG line icons for UI controls (search, menu, etc.).
 * Stroke style, `currentColor`, sized via className — crisp and on-brand where
 * color emoji would look inconsistent across platforms.
 */
type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function SearchIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function MenuIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

export function CloseIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

export function ChatIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 20l1.4-4.2a8.38 8.38 0 0 1-.9-4A8.5 8.5 0 0 1 21 11.5z" />
    </svg>
  );
}
