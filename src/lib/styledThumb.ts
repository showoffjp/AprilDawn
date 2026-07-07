/**
 * Render a small, styled thumbnail of an already-cropped photo — baking in the
 * live colour adjustments and art-style overlay so the cart/checkout show the
 * look the customer actually designed, not just the raw crop.
 *
 * Canvas `ctx.filter` mirrors the same CSS filter functions used in the live
 * preview, and the art-style overlay is reproduced as a blended gradient fill
 * (the designer's selectable styles all use linear-gradient overlays).
 */
import type { CSSProperties } from "react";

export type ThumbOverlay = {
  css: string;
  blend?: CSSProperties["mixBlendMode"];
  opacity?: number;
};

const MAX = 160;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("image load failed"));
    img.src = src;
  });
}

/** Parse `linear-gradient(120deg,#aaa,#bbb)` → angle + colour stops. */
function parseLinearGradient(css: string): { angle: number; colors: string[] } | null {
  const m = /^linear-gradient\(([\s\S]+)\)$/i.exec(css.trim());
  if (!m) return null;
  const parts = m[1]
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  let angle = 180; // CSS default direction is "to bottom" = 180deg
  if (/deg$/i.test(parts[0])) {
    angle = parseFloat(parts[0]);
    parts.shift();
  } else if (/^to\s/i.test(parts[0])) {
    parts.shift(); // keyword directions unused by our presets; keep default angle
  }
  const colors = parts.map((p) => p.split(/\s+/)[0]).filter(Boolean);
  return colors.length >= 2 ? { angle, colors } : null;
}

/** CSS gradient angle → canvas start/end points covering a w×h box. */
function gradientLine(angle: number, w: number, h: number) {
  const rad = (angle * Math.PI) / 180;
  const dx = Math.sin(rad);
  const dy = -Math.cos(rad);
  const half = (Math.abs(w * dx) + Math.abs(h * dy)) / 2;
  const cx = w / 2;
  const cy = h / 2;
  return { x0: cx - dx * half, y0: cy - dy * half, x1: cx + dx * half, y1: cy + dy * half };
}

export async function renderStyledThumb(
  src: string,
  filter: string,
  overlay?: ThumbOverlay,
): Promise<string> {
  const img = await loadImage(src);
  const nw = img.naturalWidth || img.width;
  const nh = img.naturalHeight || img.height;
  const scale = Math.min(1, MAX / Math.max(nw, nh));
  const w = Math.max(1, Math.round(nw * scale));
  const h = Math.max(1, Math.round(nh * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  ctx.imageSmoothingQuality = "high";
  ctx.filter = filter && filter.trim() ? filter : "none";
  ctx.drawImage(img, 0, 0, w, h);
  ctx.filter = "none";

  if (overlay?.css) {
    const g = parseLinearGradient(overlay.css);
    if (g) {
      const { x0, y0, x1, y1 } = gradientLine(g.angle, w, h);
      const grad = ctx.createLinearGradient(x0, y0, x1, y1);
      g.colors.forEach((c, i) =>
        grad.addColorStop(g.colors.length === 1 ? 0 : i / (g.colors.length - 1), c),
      );
      ctx.globalCompositeOperation = (overlay.blend ?? "source-over") as GlobalCompositeOperation;
      ctx.globalAlpha = overlay.opacity ?? 1;
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    }
  }

  return canvas.toDataURL("image/jpeg", 0.62);
}
