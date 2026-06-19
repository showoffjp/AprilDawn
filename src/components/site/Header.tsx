"use client";

import { useState } from "react";
import Link from "next/link";
import { mainNav } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CartIndicator } from "@/components/cart/CartIndicator";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-command"))}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-ink-soft ring-1 ring-inset ring-ink/15 transition hover:text-ink"
            aria-label="Search"
          >
            🔍 <span>Search</span>
            <kbd className="rounded bg-ink/5 px-1.5 py-0.5 text-[10px] font-medium">
              ⌘K
            </kbd>
          </button>
          <Link
            href="/vault"
            className="text-sm font-medium text-ink-soft hover:text-ink"
          >
            Sign in
          </Link>
          <CartIndicator />
          <Button href="/upload" size="sm">
            Start a project
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <CartIndicator />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-inset ring-ink/15"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="text-lg">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </Container>

      {open ? (
        <div className="border-t border-ink/10 bg-cream lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-base font-medium text-ink hover:bg-ink/5"
              >
                {item.label}
              </Link>
            ))}
            <Button href="/upload" className="mt-3" onClick={() => setOpen(false)}>
              Start a project
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
