/** Cinematic intro splash — pure CSS, fades itself out and reveals the site. */
export function Splash() {
  return (
    <div className="ad-splash" aria-hidden="true">
      <div
        className="ad-splash-blob animate-blob1"
        style={{ left: "8%", top: "18%", height: 240, width: 240, background: "rgba(244,133,60,0.5)" }}
      />
      <div
        className="ad-splash-blob animate-blob2"
        style={{ right: "10%", bottom: "16%", height: 260, width: 260, background: "rgba(126,84,192,0.55)" }}
      />
      <div className="ad-splash-stage">
        <div className="ad-splash-sun">
          <svg viewBox="0 0 96 96" width="96" height="96">
            <defs>
              <linearGradient id="splashsun" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffd0a6" />
                <stop offset="55%" stopColor="#ec3c72" />
                <stop offset="100%" stopColor="#7e54c0" />
              </linearGradient>
            </defs>
            <g stroke="url(#splashsun)" strokeWidth="3" strokeLinecap="round">
              <line x1="48" y1="6" x2="48" y2="16" />
              <line x1="22" y1="16" x2="29" y2="24" />
              <line x1="74" y1="16" x2="67" y2="24" />
              <line x1="9" y1="42" x2="19" y2="44" />
              <line x1="87" y1="42" x2="77" y2="44" />
            </g>
            <circle cx="48" cy="54" r="24" fill="url(#splashsun)" />
          </svg>
        </div>
        <div className="ad-splash-horizon" />
        <div className="ad-splash-word">AprilDawn</div>
        <div className="ad-splash-tag">the everything store for memories</div>
      </div>
    </div>
  );
}
