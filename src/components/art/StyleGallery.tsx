import { MemoryScene } from "./MemoryScene";
import { presetFor } from "@/lib/artStyles";
import { Tilt } from "@/components/effects/Tilt";

type StyleEntry = { name: string; emoji: string; blurb: string };

/** Visual examples: one sample portrait rendered in each famous style. */
export function StyleGallery({ styles }: { styles: StyleEntry[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {styles.map((s) => {
        const p = presetFor(s.name);
        return (
          <figure
            key={s.name}
            className="group rounded-2xl bg-white ring-1 ring-ink/10 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-dawn-500/15"
          >
            <Tilt max={13} radiusClass="rounded-t-2xl" className="rounded-b-none">
              <div className="relative aspect-[4/5]">
                <MemoryScene
                  variant="picnic"
                  uid={s.name}
                  className="transition-transform duration-500 group-hover:scale-105"
                  style={{ filter: p.filter }}
                />
                {p.overlay ? (
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
            </Tilt>
            <p className="p-3 text-xs leading-relaxed text-ink-soft">{s.blurb}</p>
          </figure>
        );
      })}
    </div>
  );
}
