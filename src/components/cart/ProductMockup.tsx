import type { CSSProperties } from "react";
import { MemoryScene } from "@/components/art/MemoryScene";
import { type MockupKind } from "@/lib/designer";

export type PhotoStyle = {
  imageSrc?: string;
  filter?: string;
  transform?: string;
  overlay?: string;
  blend?: CSSProperties["mixBlendMode"];
  overlayOpacity?: number;
};

function PhotoLayer({
  imageSrc,
  filter,
  transform,
  overlay,
  blend,
  overlayOpacity,
}: PhotoStyle) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt=""
          className="h-full w-full object-cover"
          style={{ filter, transform }}
        />
      ) : (
        <MemoryScene variant="birthday" uid="preview" style={{ filter, transform }} />
      )}
      {overlay ? (
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: overlay, mixBlendMode: blend, opacity: overlayOpacity }}
        />
      ) : null}
    </div>
  );
}

/** Renders the uploaded photo composited onto a stylized product mockup. */
export function ProductMockup({
  kind,
  photo,
}: {
  kind: MockupKind;
  photo: PhotoStyle;
}) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-gradient-to-br from-cream-deep via-cream to-dawn-100 ring-1 ring-ink/10">
      {kind === "apparel" ? (
        <>
          <svg
            viewBox="0 0 320 320"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="teefill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f3eee7" />
                <stop offset="100%" stopColor="#e1dacf" />
              </linearGradient>
              <filter id="teeshadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#271c2c" floodOpacity="0.16" />
              </filter>
            </defs>
            <path
              d="M110 40 L78 58 L36 92 L70 134 L98 116 L98 300 L222 300 L222 116 L250 134 L284 92 L242 58 L210 40 C198 72 122 72 110 40 Z"
              fill="url(#teefill)"
              stroke="#d8cfc2"
              strokeWidth="2"
              filter="url(#teeshadow)"
            />
            <path d="M110 40 C122 72 198 72 210 40" fill="none" stroke="#cdc4b6" strokeWidth="3" />
          </svg>
          <div className="absolute left-[34%] top-[33%] h-[40%] w-[32%] overflow-hidden rounded-sm shadow-inner ring-1 ring-black/5">
            <PhotoLayer {...photo} />
          </div>
        </>
      ) : kind === "mug" ? (
        <>
          <div className="absolute bottom-[22%] left-[31%] h-[3%] w-[34%] rounded-full bg-ink/15 blur-md" />
          <div className="absolute right-[18%] top-[35%] h-[30%] w-[17%] rounded-full border-[11px] border-[#eae4db]" />
          <div className="absolute left-[26%] top-[29%] h-[46%] w-[44%] overflow-hidden rounded-2xl bg-[#f3eee6] shadow-lg">
            <div className="absolute inset-[10%] overflow-hidden rounded-md">
              <PhotoLayer {...photo} />
            </div>
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(105deg, rgba(255,255,255,0.5), transparent 42%)" }}
            />
          </div>
        </>
      ) : kind === "frame" ? (
        <div
          className="absolute inset-[12%] shadow-2xl"
          style={{ border: "13px solid #3a2f28", background: "#fbf8f2", padding: 12 }}
        >
          <div className="relative h-full w-full overflow-hidden shadow-[inset_0_0_14px_rgba(0,0,0,0.28)] ring-1 ring-black/10">
            <PhotoLayer {...photo} />
          </div>
        </div>
      ) : (
        <div className="absolute inset-[14%] overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-ink/10">
          <PhotoLayer {...photo} />
        </div>
      )}
    </div>
  );
}
