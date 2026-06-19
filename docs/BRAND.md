# 🎨 Brand — AprilDawn

## Essence
Warm, nostalgic, premium, and a little playful. Equal parts **museum archivist** and **the cousin who makes everyone laugh at the reunion**.

## Voice & tone
- **Warm, not saccharine.** We honor grief and joy without being cloying.
- **Plain-spoken.** "We never throw away a memory." Not "leveraging archival workflows."
- **Playful where it fits.** The Troll Grandma bundle is allowed to be unhinged (with love).
- **Trust-building.** Free proofs, originals returned, happiness guarantee — say it often.

## Color palette ("April Dawn" sunrise)
Defined as design tokens in [`src/app/globals.css`](../src/app/globals.css).

| Token | Hex | Use |
| :-- | :-- | :-- |
| `cream` | `#fff8f1` | Page background |
| `cream-deep` | `#fdeede` | Section backgrounds |
| `ink` | `#271c2c` | Primary text |
| `ink-soft` | `#5b4f5f` | Secondary text |
| `dawn-500` | `#ec3c72` | Primary brand / CTAs (rose) |
| `dawn-300` | `#ff9bb8` | Accents, numerals |
| `amber` (Tailwind) | — | Warmth, "sunrise" gradients |
| `dusk-500` | `#7e54c0` | Depth, flagship sections (plum) |

**Signature gradient:** rose → amber → plum (`--text-gradient`, `.bg-sunrise`, `.bg-dusk`).

## Typography
- **Display:** Fraunces — editorial, soft serif, optical sizing. Headlines & hero.
- **Body:** Geist Sans — clean, modern, legible.
- **Mono:** Geist Mono — code & technical bits.

## Logo
A rising-sun glyph (gradient circle + three rays) beside the wordmark **April**·_Dawn_ (with `Dawn` in the brand gradient). See [`src/components/site/Logo.tsx`](../src/components/site/Logo.tsx).

## Iconography
Friendly, universally-understood emoji as product/service markers (📦 ✨ 🖼️ 🎨 🧱 💌 🎂). They render everywhere, need no asset pipeline, and keep the brand approachable. A bespoke icon set can replace them at scale.

## Tagline system
- **Primary:** _The everything store for memories._
- **Hero:** _Why lose your reveries forever when you can keep them permanently?_
- **Closer:** _Your memories deserve more than a dusty drawer._

## Do / Don't
- ✅ Do show real, specific transformations ("a torn 1952 wedding photo → framed canvas").
- ✅ Do lead with the feeling, then the feature.
- ❌ Don't use cold stock-photo corporate language.
- ❌ Don't over-promise on AI; always note consent and proofs.
