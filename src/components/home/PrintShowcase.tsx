import { ProductMockup } from "@/components/cart/ProductMockup";
import { type MockupKind } from "@/lib/designer";
import { type SceneVariant } from "@/components/art/MemoryScene";
import { fromPrice } from "@/lib/utils";

type Tile = {
  kind: MockupKind;
  scene: SceneVariant;
  name: string;
  price: number;
};

/** A taste of the catalog: one memory, composited onto real product mockups. */
const TILES: Tile[] = [
  { kind: "apparel", scene: "birthday", name: "Premium Tee", price: 24 },
  { kind: "mug", scene: "beach", name: "Photo Mug", price: 16 },
  { kind: "frame", scene: "sunset", name: "Gallery Canvas", price: 39 },
  { kind: "default", scene: "garden", name: "Photo Blanket", price: 49 },
  { kind: "frame", scene: "winter", name: "Metal Print", price: 49 },
  { kind: "default", scene: "picnic", name: "Jigsaw Puzzle", price: 27 },
];

export function PrintShowcase() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-6">
      {TILES.map((t, i) => (
        <figure key={i} className="group">
          <div className="transition duration-300 group-hover:-translate-y-1.5">
            <ProductMockup kind={t.kind} photo={{ scene: t.scene }} />
          </div>
          <figcaption className="mt-3 flex items-center justify-between px-1 text-sm">
            <span className="font-medium text-ink">{t.name}</span>
            <span className="text-ink-soft">from {fromPrice(t.price)}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
