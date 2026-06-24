import { NextResponse } from "next/server";
import { clean, readJson } from "@/lib/validation";

/**
 * Upload intake (demo stub).
 *
 * Production pattern: this endpoint should mint a short-lived, scoped
 * pre-signed URL (S3 / Cloudflare R2 / GCS) so the browser uploads directly
 * to object storage without proxying large files through the server. Return
 * the upload URL + an order/asset id the client can attach files to.
 */

// 2 GB ceiling — generous for video, still a guardrail against abuse.
const MAX_BYTES = 2 * 1024 * 1024 * 1024;
const ALLOWED_PREFIXES = ["image/", "video/", "audio/"];
const ALLOWED_EXACT = ["application/pdf"];

// Bidi/zero-width characters that can spoof a filename's apparent extension.
const SPOOF_CHARS = new Set([
  0x200e, 0x200f, 0x202a, 0x202b, 0x202c, 0x202d, 0x202e, 0x2066, 0x2067,
  0x2068, 0x2069, 0xfeff,
]);

function isPrintable(cp: number): boolean {
  if (cp < 0x20) return false; // C0 controls
  if (cp === 0x7f) return false; // DEL
  if (cp >= 0x80 && cp <= 0x9f) return false; // C1 controls
  return !SPOOF_CHARS.has(cp);
}

/** Strip path components, control characters, and bidi spoofing from a name. */
function safeName(name: string): string {
  const printable = Array.from(name)
    .filter((ch) => isPrintable(ch.codePointAt(0) ?? 0))
    .join("");
  return printable.replace(/[/\\]/g, "_").slice(0, 200);
}

export async function POST(request: Request) {
  const body = await readJson(request);
  if (!body) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const filename = safeName(clean(body.filename, 300));
  if (!filename) {
    return NextResponse.json(
      { ok: false, error: "A filename is required." },
      { status: 422 },
    );
  }

  // Content type is required and must be on the allowlist — default-deny so a
  // client can't skip the check by simply omitting the field.
  const contentType = clean(body.contentType, 120).toLowerCase();
  const typeAllowed =
    ALLOWED_PREFIXES.some((p) => contentType.startsWith(p)) ||
    ALLOWED_EXACT.includes(contentType);
  if (!typeAllowed) {
    return NextResponse.json(
      { ok: false, error: "That file type isn't supported." },
      { status: 415 },
    );
  }

  // Size is required and bounded — again default-deny on a missing/bad value.
  const size = Number(body.size);
  if (!Number.isFinite(size) || size <= 0) {
    return NextResponse.json(
      { ok: false, error: "A valid file size is required." },
      { status: 422 },
    );
  }
  if (size > MAX_BYTES) {
    return NextResponse.json(
      { ok: false, error: "That file is too large (2 GB max)." },
      { status: 413 },
    );
  }

  const assetId = `asset_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 8)}`;

  // Placeholder — replace with a real signed URL from your storage provider.
  return NextResponse.json({
    ok: true,
    assetId,
    filename,
    uploadUrl: `https://uploads.example/${assetId}`,
    note: "Demo stub — wire to S3/R2/GCS pre-signed URLs for production.",
  });
}
