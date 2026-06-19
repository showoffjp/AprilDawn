import { type Product, type ProductCategory } from "./products";

/** Which mockup shape to render for a product category. */
export type MockupKind = "apparel" | "frame" | "mug" | "default";

export function mockupKind(category: ProductCategory): MockupKind {
  if (category === "Apparel") return "apparel";
  if (category === "Drinkware") return "mug";
  if (category === "Wall Art") return "frame";
  return "default";
}

export type SizeOption = { label: string; delta: number };

export function sizeOptionsFor(product: Product): SizeOption[] {
  if (product.category === "Apparel") {
    return [
      { label: "S", delta: 0 },
      { label: "M", delta: 0 },
      { label: "L", delta: 0 },
      { label: "XL", delta: 2 },
      { label: "2XL", delta: 4 },
    ];
  }
  if (product.category === "Wall Art") {
    return [
      { label: '12×16"', delta: 0 },
      { label: '18×24"', delta: 18 },
      { label: '24×36"', delta: 40 },
      { label: '36×48"', delta: 85 },
    ];
  }
  return [];
}

export type PremiumAddon = { key: string; label: string; price: number };

export const premiumAddons: PremiumAddon[] = [
  { key: "retouch", label: "Studio retouch & color-match", price: 7.99 },
  { key: "rush", label: "Rush production (3-day)", price: 9.99 },
  { key: "giftbox", label: "Premium gift box & handwritten note", price: 5.99 },
];
