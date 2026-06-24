import { NextResponse } from "next/server";
import { clean, isBot, isEmail, readJson } from "@/lib/validation";

/**
 * Newsletter signup (demo stub).
 * Production: add to your email platform (Resend audience, Mailchimp, etc.)
 * with double opt-in.
 */
export async function POST(request: Request) {
  const body = await readJson(request);
  if (!body) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot tripped — pretend success so bots don't retry.
  if (isBot(body)) {
    return NextResponse.json({ ok: true });
  }

  const email = clean(body.email, 320);
  if (!isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 422 },
    );
  }

  console.log("[subscribe] new subscriber", { email });
  return NextResponse.json({ ok: true });
}
