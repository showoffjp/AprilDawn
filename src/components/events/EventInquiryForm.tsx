"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "done" | "error";

/**
 * Lead-capture form for an event offering (weddings / reunions). Demo build:
 * posts to /api/inquiry, which returns a ticket id. Wire it to your CRM or
 * email to go live.
 */
export function EventInquiryForm({
  eventType,
  region,
}: {
  eventType: string;
  region: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [ticket, setTicket] = useState("");
  const noun =
    eventType === "Weddings"
      ? "wedding"
      : eventType === "Family Reunions"
        ? "reunion"
        : "event";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, eventType, region }),
      });
      if (!res.ok) throw new Error();
      const json = (await res.json()) as { ticketId: string };
      setTicket(json.ticketId);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-3xl bg-white p-8 text-center ring-1 ring-ink/10">
        <div className="text-5xl">🎉</div>
        <h3 className="mt-3 font-display text-xl font-semibold">
          Request received!
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ink-soft">
          Reference <span className="font-mono text-ink">{ticket}</span>. A
          Carolina event specialist will reply within one business day with
          availability and a full pricing guide.
        </p>
        <p className="mx-auto mt-4 max-w-sm rounded-2xl bg-cream-deep p-3 text-xs text-ink-soft">
          Demo form — wire <code>/api/inquiry</code> to your CRM or email to go
          live.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl bg-white p-6 ring-1 ring-ink/10 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" name="name" />
        <Field label="Email" name="email" type="email" />
        <Field label="Phone" name="phone" type="tel" required={false} />
        <Field label="Event date (or season)" name="date" required={false} />
        <Field
          label="Where in SC?"
          name="location"
          required={false}
          placeholder="Charleston, Greenville, a lake house…"
        />
        <Field
          label={eventType === "Weddings" ? "Guest count" : "Approx. headcount"}
          name="guests"
          type="number"
          required={false}
        />
      </div>
      <div className="mt-4">
        <label htmlFor="message" className="text-sm font-medium text-ink">
          Tell us about your {noun}{" "}
          <span className="font-normal text-ink-soft">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="mt-1.5 w-full rounded-xl border border-ink/15 bg-cream px-3 py-2 text-sm focus:border-dawn-400 focus:outline-none"
          placeholder="Venue, vibe, must-have shots, family photos you'd love restored…"
        />
      </div>
      <Button className="mt-5 w-full" size="lg" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Request availability & pricing"}
      </Button>
      {status === "error" ? (
        <p className="mt-3 text-sm text-dawn-600">
          Something went wrong — please try again.
        </p>
      ) : null}
      <p className="mt-4 text-center text-xs text-ink-soft">
        🔒 No spam, ever · we reply within one business day
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = true,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 h-11 w-full rounded-xl border border-ink/15 bg-cream px-3 text-sm focus:border-dawn-400 focus:outline-none"
      />
    </div>
  );
}
