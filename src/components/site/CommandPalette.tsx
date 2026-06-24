"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";

// The palette body (and the catalog data it imports) only downloads the first
// time the user opens search — keeping it out of every page's initial bundle.
const CommandPaletteBody = dynamic(
  () => import("./CommandPaletteBody").then((m) => m.CommandPaletteBody),
  { ssr: false },
);

/**
 * Tiny always-mounted shim: listens for ⌘K / the "open-command" event and only
 * then mounts (and downloads) the heavy palette body.
 */
export function CommandPalette() {
  const [armed, setArmed] = useState(false);
  const close = useCallback(() => setArmed(false), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setArmed(true);
      }
    }
    function onOpen() {
      setArmed(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command", onOpen);
    };
  }, []);

  if (!armed) return null;
  return <CommandPaletteBody onClose={close} />;
}
