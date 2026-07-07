/**
 * Rasterize a rectangular region of a loaded image to a cropped JPEG.
 *
 * The rect is expressed in the image's natural pixel coordinates. The output is
 * downscaled so its long edge never exceeds `outputMax`, then handed back as an
 * object URL the caller owns (and must eventually revoke).
 */
export type CropRect = {
  sx: number;
  sy: number;
  sWidth: number;
  sHeight: number;
};

export type CroppedImage = {
  url: string;
  width: number;
  height: number;
};

export async function cropToObjectUrl(
  image: HTMLImageElement,
  rect: CropRect,
  outputMax = 2000,
): Promise<CroppedImage> {
  // Clamp the source rect to the image bounds so drawImage never reads outside it.
  const sx = Math.max(0, Math.round(rect.sx));
  const sy = Math.max(0, Math.round(rect.sy));
  const sWidth = Math.max(1, Math.round(Math.min(rect.sWidth, image.naturalWidth - sx)));
  const sHeight = Math.max(1, Math.round(Math.min(rect.sHeight, image.naturalHeight - sy)));

  const longEdge = Math.max(sWidth, sHeight);
  const outScale = longEdge > outputMax ? outputMax / longEdge : 1;
  const outW = Math.max(1, Math.round(sWidth * outScale));
  const outH = Math.max(1, Math.round(sHeight * outScale));

  const canvas = document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, outW, outH);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/jpeg", 0.92),
  );
  if (!blob) throw new Error("Failed to export cropped image");

  return { url: URL.createObjectURL(blob), width: outW, height: outH };
}
