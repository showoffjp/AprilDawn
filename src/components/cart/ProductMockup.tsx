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
            <path
              d="M110 40 L78 58 L36 92 L70 134 L98 116 L98 300 L222 300 L222 116 L250 134 L284 92 L242 58 L210 40 C198 72 122 72 110 40 Z"
              fill="#ece6dd"
              stroke="#d8cfc2"
              strokeWidth="2"
            />
          </svg>
          <div className="absolute left-[34%] top-[33%] h-[40%] w-[32%] overflow-hidden rounded-sm shadow-inner">
            <PhotoLayer {...photo} />
          </div>
        </>
      ) : kind === "mug" ? (
        <>
          <div className="absolute right-[19%] top-[35%] h-[30%] w-[16%] rounded-full border-[10px] border-[#e7e1d8]" />
          <div className="absolute left-[26%] top-[29%] h-[46%] w-[44%] overflow-hidden rounded-2xl bg-[#f1ece4] shadow-lg">
            <div className="absolute inset-[10%] overflow-hidden rounded-md">
              <PhotoLayer {...photo} />
            </div>
          </div>
        </>
      ) : kind === "frame" ? (
        <div
          className="absolute inset-[12%] shadow-2xl"
          style={{ border: "13px solid #3a2f28", background: "#fbf8f2", padding: 12 }}
        >
          <div className="relative h-full w-full overflow-hidden">
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
