"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

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

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-3xl bg-white p-8 text-center ring-1 ring-ink/10">
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
        <Field label="Your name" name="name" placeholder="Jamie Rivera" />
        <Field label="Email" name="email" type="email" placeholder="you@email.com" />
      </div>
      <div className="mt-4">
        <label htmlFor="topic" className="text-sm font-medium text-ink">
          What can we help with?
        </label>
        <select
          id="topic"
          name="topic"
          className="mt-1.5 h-11 w-full rounded-xl border border-ink/15 bg-cream px-3 text-sm focus:border-dawn-400 focus:outline-none"
        >
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <label htmlFor="message" className="text-sm font-medium text-ink">
          Tell us about your memories
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="I have 6 boxes of slides and a torn wedding photo from 1961…"
          className="mt-1.5 w-full rounded-xl border border-ink/15 bg-cream px-3 py-2.5 text-sm focus:border-dawn-400 focus:outline-none"
        />
      </div>
      <Button className="mt-6 w-full" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
      {status === "error" ? (
        <p className="mt-3 text-sm text-dawn-600">
          Something went wrong — please email us directly.
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
      <label htmlFor={name} className="text-sm font-medium text-ink">
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
