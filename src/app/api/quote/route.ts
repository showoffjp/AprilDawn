import { NextResponse } from "next/server";
import { getService } from "@/lib/services";
import { readJson } from "@/lib/validation";

/**
 * Instant quote estimate (demo stub).
 * Returns a rough estimate from a service's starting price and quantity.
 * Production: factor size, finishing, rush, shipping, and live partner pricing.
 */
export async function POST(request: Request) {
  const body = await readJson(request);
  if (!body) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const service =
    typeof body.service === "string" ? getService(body.service) : undefined;
  if (!service) {
    return NextResponse.json(
      { ok: false, error: "Unknown service" },
      { status: 422 },
    );
  }

  const quantity = Math.min(100000, Math.max(1, Math.floor(Number(body.quantity) || 1)));
  const unit = service.startingPrice ?? 0;
  const estimate = Math.round(unit * quantity * 100) / 100;

  return NextResponse.json({
    ok: true,
    service: service.slug,
    quantity,
    unit,
    estimate,
    disclaimer: "Illustrative estimate. Final quote follows a free proof.",
  });
}
