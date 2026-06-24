import { NextResponse } from "next/server";
import { clean, isBot, isEmail, readJson } from "@/lib/validation";

/**
 * Event inquiry intake (demo stub) for weddings & family reunions.
 *
 * Production pattern: validate, create a lead in your CRM (or send an email to
 * the events team), and optionally drop the requester into a nurture sequence.
 */
export async function POST(request: Request) {
  const body = await readJson(request);
  if (!body) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const ticketId = `INQ-${Date.now().toString(36).toUpperCase()}`;

  // Honeypot tripped — return a plausible success so bots don't retry.
  if (isBot(body)) {
    return NextResponse.json({ ok: true, ticketId });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 320);

  if (!name) {
    return NextResponse.json(
      { ok: false, error: "Please tell us your name." },
      { status: 422 },
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 422 },
    );
  }

  console.log("[inquiry] new event lead", {
    ticketId,
    eventType: clean(body.eventType, 80),
    email,
    date: clean(body.date, 80),
    location: clean(body.location, 160),
    guests: clean(body.guests, 20),
  });

  return NextResponse.json({ ok: true, ticketId });
}
