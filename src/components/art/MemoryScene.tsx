/**
 * Colorful, varied "memory scene" artwork (pure SVG — renders everywhere, no
 * external images, license-clean). Used to bring warmth and color across the
 * site; real customer photos appear live in the uploaders and designers.
 */

type Variant =
  | "sunrise"
  | "beach"
  | "birthday"
  | "picnic"
  | "winter"
  | "sunset"
  | "garden";

type Palette = {
  sky: [string, string, string];
  sun: string;
  hill1: string;
  hill2: string;
  fig: string;
  speckle: string | "confetti";
};

const PALETTES: Record<Variant, Palette> = {
  sunrise: { sky: ["#ffe3b3", "#ffb3c1", "#c7a8e6"], sun: "#ffb24c", hill1: "#8a6aa6", hill2: "#5b3f74", fig: "#33233d", speckle: "none" },
  beach: { sky: ["#bfe9ff", "#86d4f5", "#5ec8e0"], sun: "#ffe07a", hill1: "#2bb3c0", hill2: "#1d8aa0", fig: "#0e3a44", speckle: "#ffffff" },
  birthday: { sky: ["#ffd9f2", "#e3d0ff", "#c3b8ff"], sun: "#ff7ab8", hill1: "#a07adf", hill2: "#6f4fc0", fig: "#3a2363", speckle: "confetti" },
  picnic: { sky: ["#eaf7c9", "#bfe89a", "#94d36f"], sun: "#ffd24a", hill1: "#5bbf6a", hill2: "#2f8f52", fig: "#1f4d2e", speckle: "#ff6b6b" },
  winter: { sky: ["#eaf4ff", "#cfe2f5", "#aecbe8"], sun: "#fff3c4", hill1: "#9fb8d6", hill2: "#6f8db0", fig: "#28384d", speckle: "#ffffff" },
  sunset: { sky: ["#ffd0a6", "#ff8fae", "#9a6bd0"], sun: "#ff6f61", hill1: "#7a4fb0", hill2: "#4a2e7a", fig: "#241036", speckle: "#ffe07a" },
  garden: { sky: ["#fff3c0", "#e6f3b8", "#c2e8b0"], sun: "#ffd24a", hill1: "#6cc24a", hill2: "#3f9e2e", fig: "#27411f", speckle: "confetti" },
};

const SPECKLES = [
  [40, 60], [80, 40], [130, 70], [180, 45], [230, 65], [270, 38],
  [60, 110], [110, 95], [160, 120], [210, 100], [255, 130], [300, 90],
  [25, 150], [290, 160],
];
const CONFETTI = ["#ff5c8a", "#ffd24a", "#5ec8e0", "#7ee081", "#b07aff"];

export function MemoryScene({
  variant = "sunrise",
  uid = "scene",
  className,
  style,
}: {
  variant?: Variant;
  uid?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const id = `${variant}-${uid}`.replace(/[^a-z0-9]/gi, "");
  const p = PALETTES[variant];
  return (
    <svg
      viewBox="0 0 320 400"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      style={{ width: "100%", height: "100%", display: "block", ...style }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.sky[0]} />
          <stop offset="50%" stopColor={p.sky[1]} />
          <stop offset="100%" stopColor={p.sky[2]} />
        </linearGradient>
        <radialGradient id={`sun-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff7d6" />
          <stop offset="65%" stopColor={p.sun} />
          <stop offset="100%" stopColor={p.sun} stopOpacity="0.6" />
        </radialGradient>
      </defs>

      <rect width="320" height="400" fill={`url(#sky-${id})`} />
      <circle cx="160" cy="148" r="58" fill={`url(#sun-${id})`} />

      {/* speckles: confetti / snow / petals / stars */}
      {p.speckle !== "none"
        ? SPECKLES.map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={p.speckle === "confetti" ? 4 : 3}
              fill={p.speckle === "confetti" ? CONFETTI[i % CONFETTI.length] : p.speckle}
              opacity="0.85"
            />
          ))
        : null}

      <path d="M0 300 Q90 255 175 292 Q250 322 320 286 L320 400 L0 400 Z" fill={p.hill1} opacity="0.9" />
      <path d="M0 330 Q110 300 210 332 Q280 352 320 330 L320 400 L0 400 Z" fill={p.hill2} />

      <g fill={p.fig}>
        <circle cx="120" cy="300" r="17" />
        <path d="M98 360 Q98 322 120 322 Q142 322 142 360 Z" />
        <circle cx="205" cy="298" r="17" />
        <path d="M183 360 Q183 320 205 320 Q227 320 227 360 Z" />
        <circle cx="162" cy="330" r="12" />
        <path d="M147 372 Q147 346 162 346 Q177 346 177 372 Z" />
      </g>
    </svg>
  );
}

export const sceneVariants: Variant[] = [
  "sunrise",
  "beach",
  "birthday",
  "picnic",
  "winter",
  "sunset",
  "garden",
];
