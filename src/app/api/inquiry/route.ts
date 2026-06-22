import { NextResponse } from "next/server";

/**
 * Event inquiry intake (demo stub) for weddings & family reunions.
 *
 * Production pattern: validate, create a lead in your CRM (or send an email to
 * the events team), and optionally drop the requester into a nurture sequence.
 */
export async function POST(request: Request) {
  let body: {
    name?: string;
    email?: string;
    eventType?: string;
    region?: string;
    date?: string;
    location?: string;
    guests?: string;
    message?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.name || !body.email) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 422 },
    );
  }

  const ticketId = `INQ-${Date.now().toString(36).toUpperCase()}`;

  console.log("[inquiry] new event lead", {
    ticketId,
    eventType: body.eventType,
    email: body.email,
    date: body.date,
    location: body.location,
    guests: body.guests,
  });

  return NextResponse.json({ ok: true, ticketId });
}
