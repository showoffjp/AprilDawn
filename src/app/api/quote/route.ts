import { NextResponse } from "next/server";
import { getService } from "@/lib/services";

/**
 * Instant quote estimate (demo stub).
 * Returns a rough estimate from a service's starting price and quantity.
 * Production: factor size, finishing, rush, shipping, and live partner pricing.
 */
export async function POST(request: Request) {
  let body: { service?: string; quantity?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const service = body.service ? getService(body.service) : undefined;
  if (!service) {
    return NextResponse.json(
      { ok: false, error: "Unknown service" },
      { status: 422 },
    );
  }

  const quantity = Math.max(1, Number(body.quantity ?? 1));
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
