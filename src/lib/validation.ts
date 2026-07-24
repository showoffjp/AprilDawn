/**
 * Shared server-side request validation helpers for API routes.
 * Keeps email checks, length clamping, and spam handling consistent across
 * every form endpoint.
 */

// Pragmatic email shape check — not RFC-perfect, but rejects the obvious junk
// without blocking real addresses.
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmail(value: unknown): boolean {
  return EMAIL_RE.test(String(value ?? "").trim());
}

/** Trim a value to a string and clamp it to a sane max length. */
export function clean(value: unknown, max = 2000): string {
  return String(value ?? "")
    .trim()
    .slice(0, max);
}

/**
 * Honeypot check. Forms render a hidden `company` field that humans never see;
 * bots fill every field, so a non-empty value means it's almost certainly spam.
 */
export function isBot(body: Record<string, unknown>): boolean {
  return clean(body.company, 100).length > 0;
}

/**
 * Safely read a JSON object body. Returns `null` on malformed JSON or an
 * oversized body so callers can respond with a 400; always returns an object
 * (never an array/primitive). The cap keeps form endpoints from buffering
 * unbounded request bodies.
 */
export async function readJson(
  request: Request,
  maxBytes = 100_000,
): Promise<Record<string, unknown> | null> {
  try {
    const declared = Number(request.headers.get("content-length") ?? 0);
    if (declared > maxBytes) return null;
    const text = await request.text();
    if (text.length > maxBytes) return null;
    const data: unknown = JSON.parse(text);
    return data && typeof data === "object" && !Array.isArray(data)
      ? (data as Record<string, unknown>)
      : {};
  } catch {
    return null;
  }
}
