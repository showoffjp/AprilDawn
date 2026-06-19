/**
 * A warm, abstract "family at sunrise" sample portrait used as demo artwork in
 * the product designer and the Masterpiece style gallery. Pure SVG so it needs
 * no external image and works offline.
 */
export function SampleArt({
  uid = "art",
  className,
  style,
}: {
  uid?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const id = uid.replace(/[^a-z0-9]/gi, "") || "art";
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
          <stop offset="0%" stopColor="#ffe3b3" />
          <stop offset="45%" stopColor="#ffb3c1" />
          <stop offset="100%" stopColor="#c7a8e6" />
        </linearGradient>
        <radialGradient id={`sun-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff3c4" />
          <stop offset="60%" stopColor="#ffb24c" />
          <stop offset="100%" stopColor="#f76d8e" />
        </radialGradient>
      </defs>
      <rect width="320" height="400" fill={`url(#sky-${id})`} />
      <circle cx="160" cy="150" r="60" fill={`url(#sun-${id})`} />
      <path
        d="M0 300 Q90 255 175 292 Q250 322 320 286 L320 400 L0 400 Z"
        fill="#8a6aa6"
        opacity="0.85"
      />
      <path
        d="M0 330 Q110 300 210 332 Q280 352 320 330 L320 400 L0 400 Z"
        fill="#5b3f74"
      />
      <g fill="#33233d">
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
