"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

type Use = "signature" | "note" | "emblem";

const uses: { key: Use; label: string; emoji: string }[] = [
  { key: "signature", label: "My signature", emoji: "✍️" },
  { key: "note", label: "A handwritten note", emoji: "📝" },
  { key: "emblem", label: "A monogram / emblem", emoji: "🏷️" },
];

export function HandwritingUpload() {
  const [src, setSrc] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [use, setUse] = useState<Use>("signature");
  const inputRef = useRef<HTMLInputElement>(null);

  function onFile(file?: File) {
    if (!file) return;
    setName(file.name);
    if (file.type.startsWith("image/")) setSrc(URL.createObjectURL(file));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Upload + options */}
      <div className="rounded-3xl bg-white p-6 ring-1 ring-ink/10 sm:p-7">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-ink/20 bg-cream px-6 py-10 text-center transition hover:border-dawn-300 hover:bg-dawn-50/50"
        >
          <span className="text-4xl">✍️</span>
          <span className="font-medium text-ink">
            {name || "Upload a photo of your handwriting"}
          </span>
          <span className="text-xs text-ink-soft">
            Snap your signature on paper — we vectorize it crisp and clean
          </span>
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onFile(e.target.files?.[0])}
        />

        <p className="mt-5 text-sm font-semibold text-ink">Use it as…</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {uses.map((u) => (
            <button
              key={u.key}
              type="button"
              onClick={() => setUse(u.key)}
              className={`h-9 rounded-full px-3.5 text-sm font-medium ring-1 transition ${
                use === u.key
                  ? "bg-ink text-cream ring-ink"
                  : "bg-white text-ink ring-ink/15 hover:ring-dawn-300"
              }`}
            >
              {u.emoji} {u.label}
            </button>
          ))}
        </div>

        <Button href="/upload" className="mt-6 w-full">
          Immortalize it on a card
        </Button>
      </div>

      {/* Preview */}
      <div className="flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-cream-deep via-cream to-dawn-100 p-6 ring-1 ring-ink/10">
        <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
          <p className="font-display text-lg text-ink">With all my love,</p>
          <div className="mt-3 flex h-24 items-center justify-center rounded-xl bg-cream-deep/60">
            {src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt="Your handwriting"
                className="max-h-20 max-w-[80%] object-contain mix-blend-multiply"
              />
            ) : (
              <span className="text-sm text-ink-soft">
                Your signature appears here ✨
              </span>
            )}
          </div>
          <p className="mt-3 text-right text-xs text-ink-soft">
            — pressed onto your AprilDawn card
          </p>
        </div>
      </div>
    </div>
  );
}
