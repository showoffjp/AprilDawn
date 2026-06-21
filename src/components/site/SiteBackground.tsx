"use client";

import { useEffect, useRef } from "react";

/**
 * The one living gradient — a single fixed, full-viewport color field the whole
 * site rides on. It is unmistakably ALWAYS moving, high-contrast, and blends
 * every section together vertically:
 *   - the entire field continuously cycles hue, so the color is never still;
 *   - two counter-rotating, jewel-toned conic "whirlpools" swirl at different
 *     speeds for depth and contrast;
 *   - a saturated rainbow wash pans side to side;
 *   - eight bold blobs (hot pinks, ambers, violets, deep jewel tones) drift,
 *     bloom, and shrink like color clouds;
 *   - a breathing center spotlight and a soft edge vignette add depth/contrast
 *     so foreground content reads crisply on top.
 * Everything overlaps and interferes, so it churns and ebbs and flows.
 *
 * All CSS (keyframes + classes) is inlined on purpose: Brave/Chrome cache the
 * external stylesheet hard, which froze earlier versions. Shipping it inline
 * with the component guarantees it animates, and it deliberately ignores
 * `prefers-reduced-motion` because this motion is the whole point of the page.
 */
export function SiteBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY * 0.05, 360);
        if (ref.current) ref.current.style.transform = `translate3d(0, ${y}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden="true" className="adbg">
      <style
        dangerouslySetInnerHTML={{
          __html: `
.adbg{position:fixed;inset:0;z-index:-10;overflow:hidden;background:#fff6ee;}
.adbg-color{position:absolute;inset:0;animation:adbg-hue 22s linear infinite;}
.adbg-l{position:absolute;inset:0;}
.adbg-wash{opacity:.78;
  background-image:linear-gradient(125deg,#ff5a96 0%,#ffb347 15%,#e86bff 33%,#6f8cff 50%,#3fd0ff 67%,#46e6a8 84%,#ff7eb0 100%);
  background-size:340% 340%;
  animation:adbg-pan 12s ease-in-out infinite;}
.adbg-field{position:absolute;inset:-35%;will-change:transform;}
.adbg-blob{position:absolute;border-radius:9999px;filter:blur(80px);will-change:transform;}
.adbg-b1{left:-2%;top:0;width:50vw;height:50vw;background:rgba(255,60,130,.54);animation:adbg-d1 14s ease-in-out infinite;}
.adbg-b2{right:-2%;top:6%;width:48vw;height:48vw;background:rgba(255,140,40,.50);animation:adbg-d2 17s ease-in-out infinite;}
.adbg-b3{left:24%;top:24%;width:46vw;height:46vw;background:rgba(196,80,255,.46);animation:adbg-d3 16s ease-in-out infinite;}
.adbg-b4{left:-2%;top:46%;width:48vw;height:48vw;background:rgba(110,90,245,.50);animation:adbg-d2 15s ease-in-out infinite;}
.adbg-b5{right:-2%;top:42%;width:48vw;height:48vw;background:rgba(40,170,255,.48);animation:adbg-d1 19s ease-in-out infinite;}
.adbg-b6{right:22%;top:66%;width:46vw;height:46vw;background:rgba(40,215,150,.44);animation:adbg-d3 13s ease-in-out infinite;}
.adbg-b7{left:18%;top:74%;width:46vw;height:46vw;background:rgba(225,40,140,.42);animation:adbg-d2 18s ease-in-out infinite;}
.adbg-b8{right:6%;top:88%;width:44vw;height:44vw;background:rgba(255,200,60,.44);animation:adbg-d1 16s ease-in-out infinite;}
.adbg-swirl{position:absolute;left:50%;top:50%;width:260vmax;height:260vmax;margin-left:-130vmax;margin-top:-130vmax;}
.adbg-swirl>i{display:block;width:100%;height:100%;border-radius:9999px;will-change:transform;}
.adbg-s1>i{opacity:.6;mix-blend-mode:soft-light;animation:adbg-spin 26s linear infinite;
  background:conic-gradient(from 0deg at 50% 50%,#ff3d7f,#ff9e2c,#ffe34d,#2fd49a,#2aa8ff,#8a4dff,#ff5ec4,#ff3d7f);}
.adbg-s2>i{opacity:.5;mix-blend-mode:overlay;animation:adbg-spin 40s linear infinite reverse;
  background:conic-gradient(from 200deg at 50% 50%,#2aa8ff,#2fd49a,#ffd23c,#ff3d7f,#8a4dff,#2aa8ff);}
.adbg-spot{left:50%;top:42%;width:90vw;height:90vw;margin-left:-45vw;margin-top:-45vw;position:absolute;
  background:radial-gradient(closest-side,rgba(255,255,255,.55),rgba(255,255,255,0) 70%);
  mix-blend-mode:soft-light;animation:adbg-breathe 9s ease-in-out infinite;}
.adbg-vignette{background:radial-gradient(125% 125% at 50% 38%,transparent 52%,rgba(34,18,46,.12) 100%);}
.adbg-veil{background:rgba(255,248,241,.05);}
@keyframes adbg-hue{to{filter:hue-rotate(360deg)}}
@keyframes adbg-pan{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes adbg-spin{to{transform:rotate(360deg)}}
@keyframes adbg-breathe{0%,100%{transform:scale(1);opacity:.5}50%{transform:scale(1.35);opacity:.85}}
@keyframes adbg-d1{0%,100%{transform:translate(0,0) scale(1)}25%{transform:translate(28%,20%) scale(1.28)}50%{transform:translate(-18%,30%) scale(.82)}75%{transform:translate(22%,-20%) scale(1.14)}}
@keyframes adbg-d2{0%,100%{transform:translate(0,0) scale(1)}25%{transform:translate(-28%,18%) scale(1.2)}50%{transform:translate(22%,-24%) scale(.85)}75%{transform:translate(-22%,-14%) scale(1.16)}}
@keyframes adbg-d3{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(26%,-26%) scale(1.24)}66%{transform:translate(-26%,20%) scale(.8)}}
`,
        }}
      />
      <div className="adbg-color">
        <div className="adbg-l adbg-wash" />
        <div ref={ref} className="adbg-field">
          <span className="adbg-blob adbg-b1" />
          <span className="adbg-blob adbg-b2" />
          <span className="adbg-blob adbg-b3" />
          <span className="adbg-blob adbg-b4" />
          <span className="adbg-blob adbg-b5" />
          <span className="adbg-blob adbg-b6" />
          <span className="adbg-blob adbg-b7" />
          <span className="adbg-blob adbg-b8" />
        </div>
        <div className="adbg-swirl adbg-s1">
          <i />
        </div>
        <div className="adbg-swirl adbg-s2">
          <i />
        </div>
        <div className="adbg-spot" />
      </div>
      <div className="adbg-l adbg-vignette" />
      <div className="adbg-l adbg-veil" />
    </div>
  );
}
