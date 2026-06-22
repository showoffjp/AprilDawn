import { NextResponse } from "next/server";
import { clean, isBot, isEmail, readJson } from "@/lib/validation";

/**
 * Lead capture endpoint (demo stub).
 * In production: validate, persist to your CRM/DB, and notify the team
 * (e.g. via the Gmail API or a transactional email provider).
 */
export async function POST(request: Request) {
  const body = await readJson(request);
  if (!body) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot tripped — pretend success so bots don't retry.
  if (isBot(body)) {
    return NextResponse.json({ ok: true, received: true });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 320);
  const message = clean(body.message, 5000);

  if (!name || !message) {
    return NextResponse.json(
      { ok: false, error: "Please add your name and a short message." },
      { status: 422 },
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 422 },
    );
  }

  // TODO: persist + notify. For now we just log on the server.
  console.log("[contact] new inquiry", { name, email, topic: clean(body.topic, 80) });

  return NextResponse.json({ ok: true, received: true });
}
