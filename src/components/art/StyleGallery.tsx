import { SampleArt } from "./SampleArt";
import { presetFor } from "@/lib/artStyles";

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
            className="group overflow-hidden rounded-2xl bg-white ring-1 ring-ink/10 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-dawn-500/15"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <SampleArt
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
            <p className="p-3 text-xs leading-relaxed text-ink-soft">{s.blurb}</p>
          </figure>
        );
      })}
    </div>
  );
}
