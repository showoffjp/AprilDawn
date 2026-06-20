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
 * A translucent, always-moving tint that leans each section toward its own
 * "mood" color while letting the site-wide living gradient flow through behind
 * it. Two soft panning layers drift in opposite directions, so the section is
 * never still — it ebbs and flows as part of one continuous gradient.
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
      style={{ mixBlendMode: "soft-light" }}
    >
      {/* Panning mood wash — leans the section toward its hue, always sliding. */}
      <div
        className="anim-pan absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(120deg, ${a}, ${b} 45%, ${c} 78%, ${a})`,
          backgroundSize: "260% 260%",
          opacity: 0.5,
        }}
      />
      {/* Counter-panning glow adds depth and a second rhythm of motion. */}
      <div
        className="anim-pan absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(55% 70% at 25% 30%, ${c}, transparent 70%), radial-gradient(55% 70% at 78% 75%, ${a}, transparent 72%)`,
          backgroundSize: "200% 200%",
          opacity: 0.4,
          animationDirection: "reverse",
          animationDuration: "13s",
        }}
      />
    </div>
  );
}
