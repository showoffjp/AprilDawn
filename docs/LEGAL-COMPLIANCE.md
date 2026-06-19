# ⚖️ Legal & Compliance — AprilDawn

> **Not legal advice.** This is a founder's checklist of issues to address with a
> qualified attorney before launch. The in-app `/legal/*` pages are templates.

## 1. Copyright & ownership of uploads
- Users must **own or have rights** to what they upload. Professional/studio
  portraits are often © the photographer; school photos, stock, and licensed
  characters are common traps.
- Require a **rights attestation** at upload and in the Terms.
- Provide a **DMCA / takedown** process and a registered agent.

## 2. Likeness, biometrics & AI
- **Right of publicity / likeness:** putting a person's face on products needs the
  uploader's authority. Gag gifts of a living person should have that person's
  (or the gifter's good-faith) consent.
- **Biometric privacy (e.g., Illinois BIPA, Texas, Washington):** face detection/
  recognition for organization or tagging can trigger **written consent + retention/
  deletion policies**. Consider making face features opt-in and regionally gated.
- **AI "Living Portraits" & voice cloning:** explicit, informed **consent**, clear
  **labeling** as AI-generated, and refusal of deceptive/impersonation/deepfake use.
  Watch evolving state laws on synthetic media and voice likeness.
- **Deceased individuals:** post-mortem publicity rights vary by state; handle
  memorial content with extra care and family authorization.

## 3. Content moderation
- Prohibit unlawful, hateful, or sexually exploitative content; trademark/copyright
  infringement; and harassment.
- Combine automated screening with human review **before fulfillment**; refund and
  decline what can't be made.

## 4. Privacy (GDPR / CCPA-CPRA and friends)
- Lawful basis, clear notice, **data subject rights** (access, export, delete),
  data minimization, and breach procedures.
- Honor **"Do Not Sell/Share"**; we don't sell memories — say so and mean it.
- DPA/SCCs with processors (storage, AI, POD, email/SMS). Children's data: avoid
  knowingly collecting from under-13s (COPPA).

## 5. Integrations & platform policies
- **Google API Services User Data Policy** (incl. Limited Use) for Gmail/Calendar/
  Contacts scopes; request the **narrowest** scopes; may require a security review.
- **Microsoft, Apple, Facebook** platform terms — especially Facebook friend-data
  limits. Provide easy disconnect + token deletion.

## 6. FTC / advertising / affiliate
- **Affiliate disclosure** must be **clear and conspicuous** (we show it site-wide:
  _"As an Amazon Associate, AprilDawn earns from qualifying purchases."_).
- Comply with the **Amazon Associates Operating Agreement** (e.g., don't misuse
  marks, follow link/pricing rules).
- Honest testimonials/reviews per FTC endorsement guides; no fake reviews.

## 7. Payments & consumer protection
- **PCI** via Stripe (don't store full card data).
- Clear pricing, refunds, and the **happiness guarantee**; note that personalized/
  edible items may be non-returnable once produced.
- **Subscriptions:** clear terms, easy cancellation (FTC "click-to-cancel"/auto-renew
  and state ARL laws).

## 8. Physical originals (mail-in)
- Set handling SLAs, **insurance**, and a documented **chain of custody** (intake
  photo → return). Limitation-of-liability language for irreplaceable items, balanced
  with genuine care commitments.

## 9. Edible & specialty products
- Food-safe inks and partners for **edible cake prints**; allergen/handling notices.
- Vinyl, electronics (LED frames), and shipping comply with applicable safety/labeling.

## 10. Accessibility
- Target **WCAG 2.2 AA** (alt text, contrast, keyboard nav, captions on video).

## Launch checklist
- [ ] Terms, Privacy, Content & Rights reviewed by counsel
- [ ] Rights attestation + consent flows at upload
- [ ] DMCA agent registered; takedown flow live
- [ ] Moderation policy + human review before fulfillment
- [ ] GDPR/CCPA data rights (export/delete) implemented
- [ ] Affiliate disclosures audited site-wide
- [ ] Subscription cancellation flow compliant
- [ ] Biometric/AI consent + regional gating decided
- [ ] Processor DPAs signed; security review for Google scopes
