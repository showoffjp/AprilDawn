"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { occasions } from "@/lib/occasions";

type Status = "idle" | "submitting" | "done" | "error";

export function ReminderForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/reminders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-3xl bg-white p-8 text-center ring-1 ring-ink/10">
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
          <div>
            <label className="text-sm font-medium text-ink" htmlFor="occasion">
              Occasion
            </label>
            <select
              id="occasion"
              name="occasion"
              className="mt-1.5 h-11 w-full rounded-xl border border-ink/15 bg-cream px-3 text-sm focus:border-dawn-400 focus:outline-none"
            >
              {occasions.map((o) => (
                <option key={o.slug} value={o.slug}>
                  {o.emoji} {o.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-ink" htmlFor="date">
              Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
              className="mt-1.5 h-11 w-full rounded-xl border border-ink/15 bg-cream px-3 text-sm focus:border-dawn-400 focus:outline-none"
            />
          </div>
        </div>
        <Field
          label="Where should we reach you?"
          name="contact"
          type="email"
          placeholder="you@email.com"
        />
      </div>

      <Button className="mt-6 w-full" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Saving…" : "Remind me 🎁"}
      </Button>
      {status === "error" ? (
        <p className="mt-3 text-sm text-dawn-600">
          Something went wrong — please try again.
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-ink" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="mt-1.5 h-11 w-full rounded-xl border border-ink/15 bg-cream px-3 text-sm focus:border-dawn-400 focus:outline-none"
      />
    </div>
  );
}
