import { NextResponse } from "next/server";

/**
 * Occasion reminder signup (demo stub).
 * In production: create a reminder record, schedule notifications, and
 * (if the user connected an account) sync from Google/Outlook/Apple/Facebook.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const person = String(body.person ?? "").trim();
  const date = String(body.date ?? "").trim();
  const contact = String(body.contact ?? "").trim();

  if (!person || !date || !contact) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 422 },
    );
  }

  console.log("[reminders] new reminder", {
    person,
    occasion: body.occasion,
    date,
  });

  return NextResponse.json({
    ok: true,
    reminder: { person, occasion: body.occasion ?? "birthday", date },
  });
}
