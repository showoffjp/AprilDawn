# 🔌 Integrations — AprilDawn

All third-party hooks, their purpose, and how they wire in. Keys live in `.env.example`.

## Occasions (calendars & contacts)

| Provider | Purpose | OAuth scopes (read-limited) |
| :-- | :-- | :-- |
| 📧 **Google** | Birthdays from Contacts/Calendar; reminders in Gmail | `contacts.readonly`, `calendar.readonly` (+ `gmail.send` only if sending) |
| 📨 **Microsoft 365 / Outlook** | Calendar birthdays/anniversaries | `Calendars.Read`, `Contacts.Read` |
| 🍎 **Apple** | Saved iPhone birthdays | Sign in with Apple + user-shared contact export |
| 👍 **Facebook** | Friends' birthdays, tap-to-gift | `user_birthday`, friend birthdays subject to platform policy |
| 📑 **CSV** | Bulk family-list import (dates + addresses) | upload only |

**Pattern:** OAuth connect → import birthdays into our `reminders` store → scheduler
nudges with lead time → one-tap gift built from the user's vault. Users can
disconnect anytime; we store the minimum needed.

> ⚠️ Facebook's friend-birthday access is gated by their platform review and may be
> limited; treat it as best-effort and lean on Google/Outlook/Apple/CSV for coverage.

## Commerce & fulfillment

| Provider | Purpose | Notes |
| :-- | :-- | :-- |
| 💳 **Stripe** | Checkout, subscriptions, webhooks | Family Vault + card plans + one-offs |
| 🖨️ **Printful** | Apparel, wall art, home goods | Order API + product mockups + webhooks |
| 🖨️ **Printify / Gooten** | Long-tail products, redundancy | Fallback fulfillment |
| 🛒 **Amazon Associates** | Affiliate revenue on select SKUs | Link builder in `lib/products.ts` (`amazonAffiliateUrl`) using `NEXT_PUBLIC_AMAZON_ASSOCIATES_TAG`; **disclosure required site-wide** |

## Media & AI

| Provider | Purpose |
| :-- | :-- |
| 🤖 **Anthropic (Claude)** | Captions/transcript cleanup, gift suggestions, support copilots (`ANTHROPIC_MODEL` defaults to the latest, most capable model) |
| 🔬 **Replicate / restoration models** | Colorize, de-scratch, up-res, optional motion |
| 🗄️ **S3 / Cloudflare R2** | Media object storage + pre-signed uploads |

## Notifications

| Provider | Purpose |
| :-- | :-- |
| 📨 **Resend / SendGrid** | Transactional email (proofs, orders, reminders) |
| 📱 **Twilio** | SMS reminders & shipping updates |
| 🔔 Web/Mobile Push | App reminders for occasions |

## Amazon Associates — how it works here
`lib/products.ts` flags affiliate products and builds links:

```ts
amazonAffiliateUrl("custom photo tumbler")
// → https://www.amazon.com/s?k=custom%20photo%20tumbler&tag=<NEXT_PUBLIC_AMAZON_ASSOCIATES_TAG>
```

- Affiliate links open in a new tab with `rel="sponsored noopener noreferrer"`.
- The footer carries the required **"As an Amazon Associate…"** disclosure on every page.

## Webhook design (production)
- **Stripe** → order paid/failed/subscription events → update order state.
- **Printful/Printify** → production/shipment status → notify customer.
- All webhooks **idempotent** (dedupe by event id) and signature-verified.

## Security notes
- Store only the minimum tokens; encrypt at rest; rotate secrets.
- Never expose server secrets to the client — only `NEXT_PUBLIC_*` is public.
- Honor disconnect/delete promptly across all providers.
