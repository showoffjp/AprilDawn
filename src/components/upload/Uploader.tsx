"use client";

import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Item = {
  id: string;
  name: string;
  size: number;
  kind: "image" | "video" | "audio" | "other";
  preview?: string;
};

function kindOf(file: File): Item["kind"] {
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("video/")) return "video";
  if (file.type.startsWith("audio/")) return "audio";
  return "other";
}

function prettySize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function Uploader() {
  const [items, setItems] = useState<Item[]>([]);
  const [dragging, setDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const next: Item[] = Array.from(files).map((file) => {
      const kind = kindOf(file);
      return {
        id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2)}`,
        name: file.name,
        size: file.size,
        kind,
        preview: kind === "image" ? URL.createObjectURL(file) : undefined,
      };
    });
    setItems((prev) => [...prev, ...next]);
  }, []);

  const remove = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  if (submitted) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center ring-1 ring-ink/10">
        <div className="text-6xl">📨</div>
        <h2 className="mt-4 font-display text-2xl font-semibold">
          {items.length} {items.length === 1 ? "memory" : "memories"} received!
        </h2>
        <p className="mx-auto mt-3 max-w-md text-ink-soft">
          We&apos;ll review your upload and send free proofs and a quote to your
          email — no charge until you approve.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button href="/services" variant="ghost">
            Browse services
          </Button>
          <Button
            onClick={() => {
              setItems([]);
              setSubmitted(false);
            }}
          >
            Upload more
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed px-6 py-16 text-center transition focus-within:border-dawn-400 focus-within:ring-2 focus-within:ring-dawn-400 focus-within:ring-offset-2",
          dragging
            ? "border-dawn-400 bg-dawn-50"
            : "border-ink/20 bg-white hover:border-dawn-300 hover:bg-dawn-50/40",
        )}
      >
        <div className="text-5xl" aria-hidden="true">🖼️</div>
        <p className="mt-4 font-display text-xl font-semibold">
          Drag &amp; drop your photos, videos, or audio
        </p>
        <p className="mt-1 text-sm text-ink-soft">
          or click to browse — JPG, PNG, HEIC, MP4, MOV, MP3, and more
        </p>
        <span className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-dawn-500 px-8 text-base font-medium text-white">
          Choose files
        </span>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*,video/*,audio/*"
          className="sr-only"
          onChange={(e) => addFiles(e.target.files)}
        />
      </label>

      {items.length > 0 ? (
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-ink">
              {items.length} {items.length === 1 ? "file" : "files"} ready
            </h3>
            <button
              type="button"
              onClick={() => setItems([])}
              className="text-sm text-ink-soft hover:text-ink"
            >
              Clear all
            </button>
          </div>

          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-ink/10"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-cream-deep text-2xl">
                  {item.preview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.preview}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : item.kind === "video" ? (
                    "🎬"
                  ) : item.kind === "audio" ? (
                    "🎙️"
                  ) : (
                    "📄"
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">
                    {item.name}
                  </p>
                  <p className="text-xs text-ink-soft">{prettySize(item.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  className="text-ink-soft hover:text-dawn-600"
                  aria-label={`Remove ${item.name}`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-center gap-3 rounded-3xl bg-cream-deep p-6 sm:flex-row sm:justify-between">
            <p className="text-sm text-ink-soft">
              Next: we&apos;ll send free proofs and a quote. No charge until you
              approve.
            </p>
            <Button onClick={() => setSubmitted(true)}>
              Send my {items.length} {items.length === 1 ? "memory" : "memories"} →
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
