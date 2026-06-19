import { NextResponse } from "next/server";

/**
 * Upload intake (demo stub).
 *
 * Production pattern: this endpoint should mint a short-lived, scoped
 * pre-signed URL (S3 / Cloudflare R2 / GCS) so the browser uploads directly
 * to object storage without proxying large files through the server. Return
 * the upload URL + an order/asset id the client can attach files to.
 */
export async function POST(request: Request) {
  let body: { filename?: string; contentType?: string; size?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.filename) {
    return NextResponse.json(
      { ok: false, error: "filename is required" },
      { status: 422 },
    );
  }

  const assetId = `asset_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 8)}`;

  // Placeholder — replace with a real signed URL from your storage provider.
  return NextResponse.json({
    ok: true,
    assetId,
    uploadUrl: `https://uploads.example/${assetId}`,
    note: "Demo stub — wire to S3/R2/GCS pre-signed URLs for production.",
  });
}
