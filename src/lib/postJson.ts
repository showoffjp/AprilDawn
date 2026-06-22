/**
 * Standardized client-side JSON POST for forms. Surfaces the server's own
 * error message when present, and distinguishes network failures from
 * validation rejections so the UI never silently "succeeds".
 */

export type PostResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

const GENERIC_ERROR = "Something went wrong — please try again.";
const NETWORK_ERROR =
  "We couldn't reach the server — check your connection and try again.";

export async function postJson<T = Record<string, unknown>>(
  url: string,
  body: unknown,
): Promise<PostResult<T>> {
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return { ok: false, error: NETWORK_ERROR };
  }

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (!res.ok || data.ok === false) {
    const error =
      typeof data.error === "string" && data.error ? data.error : GENERIC_ERROR;
    return { ok: false, error };
  }

  return { ok: true, data: data as T };
}
