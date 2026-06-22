"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Honeypot, SelectField, TextareaField } from "@/components/ui/Field";
import { postJson } from "@/lib/postJson";

type Status = "idle" | "submitting" | "done" | "error";

const topics = [
  "Digitize my media",
  "Restore a photo",
  "Print on something",
  "A Living Wall",
  "Memory Mail",
  "Occasions & gifting",
  "Something else",
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const result = await postJson("/api/contact", data);
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
        <div className="text-5xl">💌</div>
        <h3 className="mt-4 font-display text-xl font-semibold">Message sent!</h3>
        <p className="mt-2 text-sm text-ink-soft">
          A memory specialist will reply within one business day.
        </p>
        <Button className="mt-5" variant="ghost" onClick={() => setStatus("idle")}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl bg-white p-8 ring-1 ring-ink/10">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" name="name" autoComplete="name" placeholder="Jamie Rivera" />
        <Field label="Email" name="email" type="email" autoComplete="email" placeholder="you@email.com" />
      </div>
      <div className="mt-4">
        <SelectField label="What can we help with?" name="topic">
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </SelectField>
      </div>
      <div className="mt-4">
        <TextareaField
          label="Tell us about your memories"
          name="message"
          required
          rows={5}
          placeholder="I have 6 boxes of slides and a torn wedding photo from 1961…"
        />
      </div>
      <Honeypot />
      <Button className="mt-6 w-full" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
      {status === "error" ? (
        <p role="alert" className="mt-3 text-sm text-dawn-600">
          {error || "Something went wrong — please email us directly."}
        </p>
      ) : null}
    </form>
  );
}
