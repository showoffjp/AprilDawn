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
 * Safely read a JSON object body. Returns `null` on malformed JSON so callers
 * can respond with a 400; always returns an object (never an array/primitive).
 */
export async function readJson(
  request: Request,
): Promise<Record<string, unknown> | null> {
  try {
    const data: unknown = await request.json();
    return data && typeof data === "object" && !Array.isArray(data)
      ? (data as Record<string, unknown>)
      : {};
  } catch {
    return null;
  }
}
