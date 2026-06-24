"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { services, serviceHref } from "@/lib/services";
import { products } from "@/lib/products";
import { stories } from "@/lib/stories";
import { cn } from "@/lib/utils";

type Item = { label: string; href: string; group: string; keywords?: string };

const PAGES: Item[] = [
  { label: "Home", href: "/", group: "Pages" },
  { label: "All services", href: "/services", group: "Pages" },
  { label: "The Living Wall", href: "/living-wall", group: "Pages", keywords: "led collage grid designer" },
  { label: "Memory Mail", href: "/memory-mail", group: "Pages", keywords: "cards audio video handwriting" },
  { label: "Occasions & gifting", href: "/occasions", group: "Pages", keywords: "birthday reminder bundle troll grandma" },
  { label: "How it works", href: "/how-it-works", group: "Pages" },
  { label: "Pricing & quote calculator", href: "/pricing", group: "Pages", keywords: "cost estimate" },
  { label: "Gift Finder", href: "/gift-finder", group: "Pages", keywords: "quiz recommend" },
  { label: "The Shop", href: "/shop", group: "Pages", keywords: "print products" },
  { label: "Stories", href: "/stories", group: "Pages", keywords: "blog articles guides" },
  { label: "Reviews", href: "/reviews", group: "Pages", keywords: "testimonials ratings" },
  { label: "Partners", href: "/partners", group: "Pages" },
  { label: "Memory Vault", href: "/vault", group: "Pages", keywords: "account dashboard albums" },
  { label: "About", href: "/about", group: "Pages" },
  { label: "FAQ", href: "/faq", group: "Pages" },
  { label: "Contact", href: "/contact", group: "Pages" },
  { label: "Upload a photo", href: "/upload", group: "Actions", keywords: "start project" },
  { label: "Cart", href: "/cart", group: "Actions" },
];

const ITEMS: Item[] = [
  ...PAGES,
  ...services.map((s) => ({ label: s.name, href: serviceHref(s), group: "Services", keywords: s.tagline })),
  ...products.map((p) => ({ label: p.name, href: `/shop/${p.slug}`, group: "Products", keywords: p.category })),
  ...stories.map((s) => ({ label: s.title, href: `/stories/${s.slug}`, group: "Stories", keywords: s.category })),
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  function close() {
    setOpen(false);
    setQ("");
    setActive(0);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      // Remember what was focused so we can restore it when the palette closes.
      lastFocused.current = document.activeElement as HTMLElement | null;
      const t = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(t);
    }
    lastFocused.current?.focus?.();
  }, [open]);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return ITEMS.slice(0, 8);
    return ITEMS.filter((i) =>
      `${i.label} ${i.keywords ?? ""} ${i.group}`.toLowerCase().includes(query),
    ).slice(0, 12);
  }, [q]);

  function go(href: string) {
    close();
    router.push(href);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[150] flex items-start justify-center bg-ink/40 p-4 pt-[12vh] backdrop-blur-sm"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search AprilDawn"
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-ink/10"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          value={q}
          role="combobox"
          aria-expanded="true"
          aria-controls="cmdk-list"
          aria-activedescendant={results[active] ? `cmdk-opt-${active}` : undefined}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => Math.min(results.length - 1, a + 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(0, a - 1));
            } else if (e.key === "Enter") {
              e.preventDefault();
              const r = results[active];
              if (r) go(r.href);
            } else if (e.key === "Tab") {
              // Keep focus inside the dialog (nothing else is tabbable here).
              e.preventDefault();
            }
          }}
          placeholder="Search AprilDawn — services, products, pages…"
          className="w-full border-b border-ink/10 px-5 py-4 text-sm focus:outline-none"
        />
        <ul
          id="cmdk-list"
          role="listbox"
          aria-label="Search results"
          className="max-h-80 overflow-y-auto p-2"
        >
          {results.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-ink-soft">
              No matches
            </li>
          ) : (
            results.map((r, i) => (
              <li key={`${r.href}-${r.label}`}>
                <button
                  type="button"
                  id={`cmdk-opt-${i}`}
                  role="option"
                  aria-selected={i === active}
                  tabIndex={-1}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(r.href)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm",
                    i === active ? "bg-dawn-50 text-ink" : "text-ink hover:bg-ink/5",
                  )}
                >
                  <span>{r.label}</span>
                  <span className="text-xs text-ink-soft">{r.group}</span>
                </button>
              </li>
            ))
          )}
        </ul>
        <div className="flex items-center justify-between border-t border-ink/10 px-4 py-2 text-xs text-ink-soft">
          <span>↑↓ navigate · ↵ open · esc close</span>
          <span>🌅 AprilDawn</span>
        </div>
      </div>
    </div>
  );
}
