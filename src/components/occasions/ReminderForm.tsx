"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Honeypot, SelectField } from "@/components/ui/Field";
import { postJson } from "@/lib/postJson";
import { occasions } from "@/lib/occasions";

type Status = "idle" | "submitting" | "done" | "error";

export function ReminderForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const result = await postJson("/api/reminders", data);
    if (result.ok) {
      setStatus("done");
      form.reset();
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
        <h3 className="mt-4 font-display text-xl font-semibold">
          You&apos;re all set!
        </h3>
        <p className="mt-2 text-sm text-ink-soft">
          We&apos;ll nudge you with plenty of lead time — and a one-tap gift idea
          built from your best photos.
        </p>
        <Button
          className="mt-5"
          variant="ghost"
          onClick={() => setStatus("idle")}
        >
          Add another reminder
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl bg-white p-8 ring-1 ring-ink/10"
    >
      <h3 className="font-display text-xl font-semibold">Add a reminder</h3>
      <p className="mt-1 text-sm text-ink-soft">
        Free forever. No card required to get nudges.
      </p>

      <div className="mt-6 space-y-4">
        <Field label="Who is it for?" name="person" placeholder="Grandma Rose" />
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField label="Occasion" name="occasion">
            {occasions.map((o) => (
              <option key={o.slug} value={o.slug}>
                {o.emoji} {o.name}
              </option>
            ))}
          </SelectField>
          <Field label="Date" name="date" type="date" />
        </div>
        <Field
          label="Where should we reach you?"
          name="contact"
          type="email"
          autoComplete="email"
          placeholder="you@email.com"
        />
      </div>

      <Honeypot />
      <Button className="mt-6 w-full" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Saving…" : "Remind me 🎁"}
      </Button>
      {status === "error" ? (
        <p role="alert" className="mt-3 text-sm text-dawn-600">
          {error || "Something went wrong — please try again."}
        </p>
      ) : null}
    </form>
  );
}
