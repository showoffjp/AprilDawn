import { cn } from "@/lib/utils";

/** Distinct, always-moving gradient palettes (one per section "mood"). */
const PALETTES = {
  rose: ["#ffc2d6", "#ffd9a8", "#ffb3c1"],
  ocean: ["#a7d8f5", "#bfe9ff", "#b8e6d0"],
  sunset: ["#ffd0a6", "#ff9aae", "#c9a7e8"],
  meadow: ["#d6ec9a", "#a7e0c0", "#bfe89a"],
  dusk: ["#c4b0f0", "#b39ddb", "#efaecb"],
  candy: ["#ffd6f0", "#ffe79a", "#a7e3ff"],
  amber: ["#ffe0a8", "#ffc78f", "#ffd9c0"],
} as const;

export type BackdropVariant = keyof typeof PALETTES;

/**
 * A continuously-animated gradient backdrop for a section: two soft multi-stop
 * gradients panning in opposite directions, in a distinct palette. Cheap
 * (background-position only) so it can run in every section without jank.
 * Place inside a `relative overflow-hidden` parent (Section does this for you).
 */
export function AnimatedBackdrop({
  variant,
  className,
}: {
  variant: BackdropVariant;
  className?: string;
}) {
  const [a, b, c] = PALETTES[variant];
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className="animate-gradient absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(120deg, ${a}, ${b} 45%, ${c} 72%, ${a})`,
          backgroundSize: "300% 300%",
          opacity: 0.6,
        }}
      />
      <div
        className="animate-gradient absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(110% 120% at 18% 12%, ${c}, transparent 55%), radial-gradient(120% 120% at 85% 88%, ${a}, transparent 55%)`,
          backgroundSize: "220% 220%",
          opacity: 0.5,
          animationDirection: "reverse",
          animationDuration: "22s",
        }}
      />
    </div>
  );
}
