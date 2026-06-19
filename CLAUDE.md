@AGENTS.md

# AprilDawn — project notes for AI assistants

AprilDawn is "the everything store for memories": digitize, restore, print on
anything, plus flagship experiences (Living Wall, Memory Mail, Occasions).

## Stack
- Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4
- Fonts: Fraunces (display) + Geist (sans/mono) via `next/font`
- No heavy UI deps — hand-built components in `src/components`

## Where things live
- Pages & API routes: `src/app/**`
- Reusable UI: `src/components/ui/**` · site chrome: `src/components/site/**`
- Data/content: `src/lib/{site,services,products,occasions}.ts`
- Design tokens: `src/app/globals.css` (`@theme` block, `.bg-sunrise`, `.text-gradient`)
- Strategy & specs: `docs/**`

## Conventions
- Server Components by default; add `"use client"` only when needed (forms, uploader).
- Next 16: dynamic route `params` is a **Promise** — always `await params`.
- Keep components small, typed, and on-brand (warm, nostalgic, premium).
- Money path before magic path (see `docs/ROADMAP.md`).

## Verify before committing
```bash
npm run lint && npm run typecheck && npm run build
```
