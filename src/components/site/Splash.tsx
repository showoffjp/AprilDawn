/**
 * Cinematic intro splash. Styles are inlined in a <style> tag so they always
 * ship with the markup (never out of sync with a cached stylesheet), then it
 * fades itself out and reveals the site. Pure CSS — no JS, no layout shift.
 */
const CSS = `
.ad-splash{position:fixed;inset:0;z-index:200;display:flex;align-items:center;justify-content:center;overflow:hidden;background:radial-gradient(60% 60% at 50% 82%,rgba(236,60,114,.38),transparent 70%),radial-gradient(50% 50% at 18% 20%,rgba(244,133,60,.32),transparent 70%),linear-gradient(160deg,#241433,#3a1c43 55%,#5a1f48);animation:adsplashout 2.9s ease forwards}
.ad-splash-stage{position:relative;z-index:1;text-align:center;padding:0 24px}
.ad-splash-blob{position:absolute;border-radius:9999px;filter:blur(60px)}
.ad-splash-b1{animation:adblobA 8s ease-in-out infinite}
.ad-splash-b2{animation:adblobB 9s ease-in-out infinite}
.ad-splash-sun{margin:0 auto;height:96px;width:96px;filter:drop-shadow(0 0 28px rgba(236,60,114,.6));animation:adsunrise 1.7s cubic-bezier(.2,.8,.2,1) both}
.ad-splash-horizon{margin:14px auto 0;height:2px;width:220px;max-width:60vw;border-radius:2px;background:linear-gradient(90deg,transparent,#f4853c,#ec3c72,#7e54c0,transparent);transform:scaleX(0);animation:adhorizon 1s ease .5s forwards}
.ad-splash-word{margin:26px 0 0;font-family:var(--font-display),Georgia,serif;font-weight:600;font-size:clamp(2.5rem,9vw,5rem);line-height:1;letter-spacing:.18em;opacity:0;background:linear-gradient(100deg,#ffd0a6,#ec3c72 45%,#b07aff);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:adwordin 1s ease .85s both,adwordsheen 1.6s ease 1.7s both}
.ad-splash-tag{margin:14px 0 0;color:rgba(255,255,255,.72);font-size:.95rem;letter-spacing:.05em;opacity:0;animation:adsplashfade .9s ease 1.4s both}
@keyframes adsplashout{0%,68%{opacity:1}100%{opacity:0;visibility:hidden;pointer-events:none}}
@keyframes adsunrise{0%{transform:translateY(150px) scale(.5);opacity:0}60%{opacity:1}100%{transform:translateY(0) scale(1);opacity:1}}
@keyframes adhorizon{to{transform:scaleX(1)}}
@keyframes adwordin{from{opacity:0;transform:translateY(16px);letter-spacing:.34em}to{opacity:1;transform:none;letter-spacing:.18em}}
@keyframes adwordsheen{from{background-position:220% 0}to{background-position:0 0}}
@keyframes adsplashfade{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@keyframes adblobA{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(8%,6%) scale(1.12)}}
@keyframes adblobB{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-6%,5%) scale(1.08)}}
@media (prefers-reduced-motion:reduce){.ad-splash{display:none}}
`;

export function Splash() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="ad-splash" aria-hidden="true">
        <div
          className="ad-splash-blob ad-splash-b1"
          style={{ left: "8%", top: "18%", height: 240, width: 240, background: "rgba(244,133,60,0.5)" }}
        />
        <div
          className="ad-splash-blob ad-splash-b2"
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
    </>
  );
}
