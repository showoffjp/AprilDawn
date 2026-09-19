/**
 * Serialize JSON-LD for a <script> tag. Per Next's JSON-LD guidance, "<" is
 * escaped to its unicode form so a stray "</script>" in content can never
 * break out of the tag.
 */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
