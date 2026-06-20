import { cn } from "@/lib/utils";

/** Vivid, always-moving gradient palettes (one per section "mood"). */
const PALETTES = {
  rose: ["#ff8fb1", "#ffc46b", "#ff6f91"],
  ocean: ["#5ec8e0", "#74e0c0", "#7ec8ff"],
  sunset: ["#ffb36b", "#ff7a9c", "#b07aff"],
  meadow: ["#9ed85a", "#5fd0a0", "#7ee081"],
  dusk: ["#a784f0", "#c77dff", "#ff8fc8"],
  candy: ["#ff9ae0", "#ffd24a", "#79c8ff"],
  amber: ["#ffc46b", "#ff9a6c", "#ff7e8a"],
} as const;

export type BackdropVariant = keyof typeof PALETTES;

/**
 * A genuinely-animated, complex section backdrop: a vivid gradient that pans
 * back and forth, layered with a slowly rotating conic gradient for depth.
 * Cheap (background-position + transform only) and reduced-motion friendly.
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
      {/* vivid panning gradient */}
      <div
        className="anim-pan absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(125deg, ${a}, ${b} 45%, ${c} 75%, ${a})`,
          backgroundSize: "220% 220%",
          opacity: 0.62,
        }}
      />
      {/* rotating conic adds complexity + constant motion */}
      <div className="absolute left-1/2 top-1/2 h-[170%] w-[170%] -translate-x-1/2 -translate-y-1/2">
        <div
          className="anim-spin-slow h-full w-full"
          style={{
            backgroundImage: `conic-gradient(from 0deg, ${a}, ${b}, ${c}, ${b}, ${a})`,
            opacity: 0.4,
            mixBlendMode: "soft-light",
          }}
        />
      </div>
      {/* a second, counter-rotating glow for richness */}
      <div className="absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2">
        <div
          className="anim-spin-rev h-full w-full"
          style={{
            backgroundImage: `radial-gradient(40% 40% at 30% 30%, ${c}, transparent 70%), radial-gradient(40% 40% at 70% 70%, ${a}, transparent 70%)`,
            opacity: 0.45,
            mixBlendMode: "overlay",
          }}
        />
      </div>
    </div>
  );
}
