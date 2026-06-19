import { NextResponse } from "next/server";

/**
 * Newsletter signup (demo stub).
 * Production: add to your email platform (Resend audience, Mailchimp, etc.)
 * with double opt-in.
 */
export async function POST(request: Request) {
  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  const email = String(body.email ?? "").trim();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 422 });
  }
  console.log("[subscribe] new subscriber", { email });
  return NextResponse.json({ ok: true });
}
