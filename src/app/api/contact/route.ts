import { NextResponse } from "next/server";

/**
 * Lead capture endpoint (demo stub).
 * In production: validate, persist to your CRM/DB, and notify the team
 * (e.g. via the Gmail API or a transactional email provider).
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 422 },
    );
  }

  // TODO: persist + notify. For now we just log on the server.
  console.log("[contact] new inquiry", { name, email, topic: body.topic });

  return NextResponse.json({ ok: true, received: true });
}
