"use client";

import { useState } from "react";
import Link from "next/link";
import { mainNav } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/effects/Magnetic";
import { Container } from "@/components/ui/Container";
import { CartIndicator } from "@/components/cart/CartIndicator";
import { SearchIcon, MenuIcon, CloseIcon } from "@/components/ui/icons";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/95 backdrop-blur-md">
      <Container className="flex h-16 flex-nowrap items-center justify-between gap-3 lg:px-6 xl:gap-4 xl:px-8">
        <span className="shrink-0">
          <Logo />
        </span>

        <nav className="hidden items-center gap-3 lg:flex xl:gap-5">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-[13px] font-medium text-ink-soft transition-colors hover:text-ink xl:text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-1.5 lg:flex xl:gap-2.5">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-command"))}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink-soft ring-1 ring-inset ring-ink/15 transition hover:bg-ink/5 hover:text-ink"
            aria-label="Search (⌘K)"
          >
            <SearchIcon className="h-[18px] w-[18px]" />
          </button>
          <CartIndicator />
          <Link
            href="/vault"
            className="whitespace-nowrap px-1 text-[13px] font-medium text-ink-soft transition hover:text-ink xl:px-2 xl:text-sm"
          >
            Sign in
          </Link>
          <Magnetic>
            <Button href="/upload" size="sm" variant="gloss">
              Start a project
            </Button>
          </Magnetic>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <CartIndicator />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink ring-1 ring-inset ring-ink/15"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
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
                className="whitespace-nowrap rounded-xl px-3 py-2.5 text-base font-medium text-ink hover:bg-ink/5"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/vault"
              onClick={() => setOpen(false)}
              className="whitespace-nowrap rounded-xl px-3 py-2.5 text-base font-medium text-ink hover:bg-ink/5"
            >
              Sign in
            </Link>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                window.dispatchEvent(new Event("open-command"));
              }}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-base font-medium text-ink hover:bg-ink/5"
            >
              <SearchIcon className="h-5 w-5 text-ink-soft" />
              Search
            </button>
            <Button href="/upload" variant="gloss" className="mt-3" onClick={() => setOpen(false)}>
              Start a project
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
