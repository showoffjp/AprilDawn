import { MemoryScene } from "@/components/art/MemoryScene";
import { presetFor } from "@/lib/artStyles";

/** One sample portrait, reimagined in the style of the masters. */
const STYLES = [
  { name: "Original", emoji: "📷" },
  { name: "Van Gogh", emoji: "🌻" },
  { name: "Monet", emoji: "🌸" },
  { name: "Warhol", emoji: "🎨" },
  { name: "Klimt", emoji: "✨" },
  { name: "Rockwell", emoji: "🖼️" },
];

export function ArtStyleTeaser() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
      {STYLES.map((s) => {
        const p = s.name === "Original" ? null : presetFor(s.name);
        return (
          <figure
            key={s.name}
            className="group overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-ink/10 transition hover:-translate-y-1 hover:shadow-soft-lg"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <MemoryScene
                variant="sunset"
                uid={`art-${s.name}`}
                className="transition-transform duration-500 group-hover:scale-105"
                style={{ filter: p?.filter }}
              />
              {p?.overlay ? (
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: p.overlay,
                    mixBlendMode: p.blend,
                    opacity: p.overlayOpacity,
                  }}
                />
              ) : null}
              <figcaption className="absolute bottom-2 left-2 rounded-full bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                {s.emoji} {s.name}
              </figcaption>
            </div>
          </figure>
        );
      })}
    </div>
  );
}
