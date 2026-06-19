const BENEFITS = [
  { e: "🌎", t: "100% remote", d: "Mail it in or upload — we ship it back." },
  { e: "🆓", t: "Free proofs", d: "See it before you ever pay." },
  { e: "📦", t: "Originals returned", d: "Insured, tracked, never discarded." },
  { e: "🔒", t: "Lifetime vault", d: "Your memories, safe forever." },
  { e: "💛", t: "Happiness guarantee", d: "We make it right, always." },
];

export function Benefits() {
  return (
    <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {BENEFITS.map((b) => (
        <div
          key={b.t}
          className="rounded-2xl bg-white p-5 text-center shadow-soft ring-1 ring-ink/10"
        >
          <div className="text-3xl">{b.e}</div>
          <div className="mt-2 font-semibold text-ink">{b.t}</div>
          <div className="mt-0.5 text-xs text-ink-soft">{b.d}</div>
        </div>
      ))}
    </div>
  );
}
