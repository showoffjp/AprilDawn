import type { CSSProperties } from "react";

/**
 * Approximate, fun CSS-filter "art style" presets used to preview a photo in
 * the style of famous painters/genres. These are illustrative previews — the
 * real Masterpiece render is produced by our painterly studio.
 */
export type ArtStylePreset = {
  filter: string;
  overlay?: string; // CSS background for an overlay layer
  blend?: CSSProperties["mixBlendMode"];
  overlayOpacity?: number;
};

export const artStylePresets: Record<string, ArtStylePreset> = {
  "Van Gogh": {
    filter: "saturate(1.7) contrast(1.18) brightness(1.02)",
    overlay: "linear-gradient(120deg,#2b59c3,#f6c945)",
    blend: "soft-light",
    overlayOpacity: 0.45,
  },
  Monet: {
    filter: "saturate(0.82) brightness(1.12) contrast(0.92) blur(0.5px)",
    overlay: "linear-gradient(120deg,#bcd4e6,#f7d9e3)",
    blend: "soft-light",
    overlayOpacity: 0.5,
  },
  "Da Vinci": {
    filter: "sepia(0.5) contrast(1.06) brightness(0.93) saturate(0.9)",
    overlay: "radial-gradient(circle at 50% 40%, transparent, rgba(60,40,20,0.5))",
    blend: "multiply",
    overlayOpacity: 0.7,
  },
  Rembrandt: {
    filter: "brightness(0.82) contrast(1.32) sepia(0.35)",
    overlay: "radial-gradient(circle at 40% 35%, transparent 28%, rgba(8,4,0,0.72))",
    blend: "multiply",
    overlayOpacity: 0.85,
  },
  Klimt: {
    filter: "sepia(0.55) saturate(1.5) brightness(1.06) contrast(1.05)",
    overlay: "linear-gradient(135deg,#caa53d,#7a5b16)",
    blend: "overlay",
    overlayOpacity: 0.55,
  },
  "Frida Kahlo": {
    filter: "saturate(1.9) contrast(1.12) hue-rotate(-6deg)",
    overlay: "linear-gradient(120deg,#e23e57,#1f9e5a)",
    blend: "soft-light",
    overlayOpacity: 0.42,
  },
  Picasso: {
    filter: "contrast(1.4) saturate(1.5) hue-rotate(12deg)",
    overlay: "linear-gradient(60deg,#2b59c3,#e23e57,#f6c945)",
    blend: "hue",
    overlayOpacity: 0.5,
  },
  Warhol: {
    filter: "saturate(3) contrast(1.45) hue-rotate(75deg) brightness(1.05)",
    overlay: "linear-gradient(45deg,#ff2e9a,#00e5ff)",
    blend: "color",
    overlayOpacity: 0.6,
  },
  Hokusai: {
    filter: "saturate(1.15) contrast(1.12) brightness(1.02)",
    overlay: "linear-gradient(160deg,#1d4e89,#e8d9b5)",
    blend: "soft-light",
    overlayOpacity: 0.5,
  },
  Rockwell: {
    filter: "sepia(0.22) saturate(1.12) brightness(1.05) contrast(1.05)",
    overlay: "linear-gradient(120deg,#f0c27b,#e0a96d)",
    blend: "soft-light",
    overlayOpacity: 0.32,
  },
  "Comic / Pop": {
    filter: "saturate(1.8) contrast(1.6) brightness(1.05)",
    overlay: "linear-gradient(45deg,#ffde00,#ff5151)",
    blend: "overlay",
    overlayOpacity: 0.4,
  },
  "Art Deco": {
    filter: "sepia(0.4) saturate(1.2) contrast(1.15)",
    overlay: "linear-gradient(135deg,#d4af37,#1c2b4a)",
    blend: "overlay",
    overlayOpacity: 0.45,
  },
};

export function presetFor(name: string): ArtStylePreset {
  return artStylePresets[name] ?? { filter: "saturate(1.1)" };
}

/** Names that have a preview preset (used for the in-designer style chips). */
export const previewableStyles = [
  "Van Gogh",
  "Monet",
  "Klimt",
  "Warhol",
  "Rockwell",
  "Comic / Pop",
];
