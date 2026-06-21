import Link from "next/link";

type Tile = { label: string; emoji: string; href: string; grad: string };

/**
 * Canva-style "start anywhere" launcher: a colorful grid of rounded tiles that
 * drop you straight into the most popular things to make. Friendly, vibrant,
 * and tappable — the fastest on-ramp on the page.
 */
const TILES: Tile[] = [
  { label: "Restore a photo", emoji: "🪄", href: "/services/restore", grad: "from-rose-100 to-amber-100" },
  { label: "Print on anything", emoji: "🖼️", href: "/services/print-anything", grad: "from-sky-100 to-violet-100" },
  { label: "Masterpiece portrait", emoji: "🎨", href: "/services/masterpieces", grad: "from-fuchsia-100 to-pink-100" },
  { label: "Digitize tapes & film", emoji: "📼", href: "/services/digitize", grad: "from-amber-100 to-orange-100" },
  { label: "The Living Wall", emoji: "🧱", href: "/living-wall", grad: "from-emerald-100 to-teal-100" },
  { label: "Memory Mail", emoji: "💌", href: "/memory-mail", grad: "from-pink-100 to-rose-100" },
  { label: "Occasions & gifts", emoji: "🎁", href: "/occasions", grad: "from-violet-100 to-indigo-100" },
  { label: "The Gallery", emoji: "🌈", href: "/gallery", grad: "from-cyan-100 to-sky-100" },
  { label: "Gift Finder", emoji: "🧭", href: "/gift-finder", grad: "from-lime-100 to-emerald-100" },
  { label: "Upload now", emoji: "⬆️", href: "/upload", grad: "from-dawn-200 to-dusk-400/40" },
];

export function CreateGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
      {TILES.map((t) => (
        <Link
          key={t.label}
          href={t.href}
          className={`group flex aspect-[5/4] flex-col items-center justify-center gap-2.5 rounded-3xl bg-gradient-to-br ${t.grad} p-4 text-center shadow-soft ring-1 ring-ink/5 transition hover:-translate-y-1 hover:shadow-soft-lg`}
        >
          <span
            className="text-3xl transition-transform duration-300 group-hover:scale-110"
            aria-hidden="true"
          >
            {t.emoji}
          </span>
          <span className="text-sm font-semibold leading-tight text-ink">
            {t.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
