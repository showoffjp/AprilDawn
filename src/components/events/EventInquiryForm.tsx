"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Honeypot, TextareaField } from "@/components/ui/Field";
import { postJson } from "@/lib/postJson";

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
  const [error, setError] = useState("");
  const noun =
    eventType === "Weddings"
      ? "wedding"
      : eventType === "Family Reunions"
        ? "reunion"
        : "event";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const result = await postJson<{ ticketId: string }>("/api/inquiry", {
      ...data,
      eventType,
      region,
    });
    if (result.ok) {
      setTicket(result.data.ticketId);
      setStatus("done");
    } else {
      setError(result.error);
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div
        role="status"
        className="rounded-3xl bg-white p-8 text-center ring-1 ring-ink/10"
      >
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
        <Field label="Your name" name="name" autoComplete="name" />
        <Field label="Email" name="email" type="email" autoComplete="email" />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" required={false} />
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
          inputMode="numeric"
          min={1}
          required={false}
        />
      </div>
      <div className="mt-4">
        <TextareaField
          label={`Tell us about your ${noun}`}
          name="message"
          rows={3}
          placeholder="Venue, vibe, must-have shots, family photos you'd love restored…"
        />
      </div>
      <Honeypot />
      <Button className="mt-5 w-full" size="lg" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Request availability & pricing"}
      </Button>
      {status === "error" ? (
        <p role="alert" className="mt-3 text-sm text-dawn-600">
          {error || "Something went wrong — please try again."}
        </p>
      ) : null}
      <p className="mt-4 text-center text-xs text-ink-soft">
        🔒 No spam, ever · we reply within one business day
      </p>
    </form>
  );
}
