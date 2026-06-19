# 🧭 Product Spec — AprilDawn

## Information architecture

```
/                      Home — value prop, services, flagships, social proof
/services              Index of all 7 services
/services/[slug]       Service detail (digitize, restore, print-anything, masterpieces)
/living-wall           Flagship: physical collage + embedded LED
/memory-mail           Flagship: cards/photobooks with audio/video
/occasions             Flagship: reminders + integrations + gift bundles
/shop                  Print-on-anything catalog (first-party + affiliate)
/how-it-works          4-step process
/pricing               Plans + per-service starting prices
/upload                Drag-and-drop intake (+ MemoryBox mail-in)
/about /faq /contact   Trust & support
/legal/*               Privacy, terms, content & rights
/api/*                 upload · quote · reminders · contact
```

## Core user journeys

### A. Upload-first (digital native)
1. Lands on `/`, clicks **Upload a photo**.
2. `/upload` — drags in files, sees instant previews, submits.
3. Receives free proofs + quote by email → approves → pays → fulfilled → vaulted.

### B. Mail-in (the shoebox)
1. Orders a **MemoryBox** from `/upload` or `/services/digitize`.
2. Packs originals, ships with prepaid label.
3. Lab intake photographs every item; customer tracks progress.
4. Digital album + restorations delivered; originals returned insured.

### C. Gifting / occasions
1. `/occasions` — connects Google/Facebook or adds a reminder manually.
2. Gets nudged before the date with a one-tap gift idea built from their photos.
3. Approves → ships in time. (Or builds the **Troll Grandma** multi-product bundle.)

### D. Living Wall
1. `/living-wall` — picks a size tier, requests a quote via `/contact`.
2. Uploads/selects photos → layout studio designs the mosaic → approves proof.
3. Install (white-glove or DIY kit). Family adds photos from phones; LED center updates.

### E. Memory Mail
1. `/memory-mail` — picks card/photobook, uploads photos, records audio/video.
2. We print + embed (QR/NFC/AR) + mail. Recipient scans/taps to play.

## Key screens & components (built)
- **Header/Footer/Logo** — sticky nav, mobile menu, affiliate disclosure.
- **Hero + sections** — sunrise/dusk gradient system, trust stats, testimonials.
- **ServiceCard / ProductCard** — reusable, data-driven.
- **Uploader** — drag/drop, file-type icons, image previews, submit state.
- **ReminderForm / ContactForm** — client forms posting to API routes.
- **Pricing table, FAQ accordion, legal prose.**

## Data model (current, static)
- `lib/services.ts` — services with details, FAQs, pricing, turnaround.
- `lib/products.ts` — POD catalog + Amazon affiliate flag/link builder.
- `lib/occasions.ts` — occasion types, integrations, gift bundles.
- `lib/site.ts` — brand, nav, trust stats.

## Future screens (planned)
- Account dashboard / **Memory Vault** (albums, sharing, exports)
- Cart + checkout + order tracking
- **Product designer** (live mockups, smart crop)
- **Restoration proof** approval flow
- **Living Wall** layout designer + LED companion app
- **Memory Mail** studio (record, embed, schedule)
- Admin/lab ops console

## Acceptance criteria (MVP, met)
- ✅ Every nav link resolves to a real page (no dead ends).
- ✅ Uploader accepts images/video/audio and previews images.
- ✅ Forms submit to API routes and show success/error states.
- ✅ Responsive at mobile/tablet/desktop; passes lint, typecheck, and `next build`.
- ✅ SEO metadata + sitemap + robots present.
