import { MemoryScene, sceneVariants } from "@/components/art/MemoryScene";

/** Auto-scrolling band of colorful memory tiles (place on a cream background). */
export function MemoryMarquee() {
  const set = [...sceneVariants, ...sceneVariants];
  const tiles = [...set, ...set];
  return (
    <div className="relative overflow-hidden py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-cream to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-cream to-transparent" />
      <div className="flex w-max animate-marquee gap-4">
        {tiles.map((v, i) => (
          <div
            key={`${v}-${i}`}
            className="h-44 w-36 shrink-0 overflow-hidden rounded-2xl shadow-soft ring-1 ring-ink/10"
          >
            <MemoryScene variant={v} uid={`mq${i}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
