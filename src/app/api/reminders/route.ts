import { NextResponse } from "next/server";
import { clean, isBot, isEmail, readJson } from "@/lib/validation";

/**
 * Occasion reminder signup (demo stub).
 * In production: create a reminder record, schedule notifications, and
 * (if the user connected an account) sync from Google/Outlook/Apple/Facebook.
 */
export async function POST(request: Request) {
  const body = await readJson(request);
  if (!body) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const occasion = clean(body.occasion, 80) || "birthday";

  // Honeypot tripped — pretend success so bots don't retry.
  if (isBot(body)) {
    return NextResponse.json({ ok: true, reminder: { person: "", occasion, date: "" } });
  }

  const person = clean(body.person, 120);
  const date = clean(body.date, 40);
  const contact = clean(body.contact, 320);

  if (!person || !date) {
    return NextResponse.json(
      { ok: false, error: "Please add who it's for and the date." },
      { status: 422 },
    );
  }
  if (!isEmail(contact)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 422 },
    );
  }

  console.log("[reminders] new reminder", { person, occasion, date });

  return NextResponse.json({ ok: true, reminder: { person, occasion, date } });
}
