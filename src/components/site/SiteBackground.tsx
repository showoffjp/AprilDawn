"use client";

import { useEffect, useRef } from "react";

/**
 * The one living gradient — a single fixed, full-viewport color field the whole
 * site rides on. It is unmistakably ALWAYS moving and blends every section
 * together vertically:
 *   - the entire field continuously cycles hue, so the color is never still;
 *   - two counter-rotating conic "whirlpools" swirl over it at different speeds;
 *   - a rainbow wash pans side to side;
 *   - six big saturated blobs drift, bloom, and shrink like color clouds.
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
        const y = Math.min(window.scrollY * 0.05, 340);
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
.adbg{position:fixed;inset:0;z-index:-10;overflow:hidden;background:#fff8f1;}
.adbg-color{position:absolute;inset:0;animation:adbg-hue 20s linear infinite;}
.adbg-l{position:absolute;inset:0;}
.adbg-wash{opacity:.72;
  background-image:linear-gradient(125deg,#ff9ec4 0%,#ffd29a 17%,#f6a8ff 37%,#a9c0ff 55%,#9fe2ff 74%,#a9f3cf 100%);
  background-size:320% 320%;
  animation:adbg-pan 13s ease-in-out infinite;}
.adbg-field{position:absolute;inset:-35%;will-change:transform;}
.adbg-blob{position:absolute;border-radius:9999px;filter:blur(85px);will-change:transform;}
.adbg-b1{left:0;top:2%;width:50vw;height:50vw;background:rgba(255,90,150,.50);animation:adbg-d1 15s ease-in-out infinite;}
.adbg-b2{right:0;top:8%;width:48vw;height:48vw;background:rgba(255,150,60,.48);animation:adbg-d2 18s ease-in-out infinite;}
.adbg-b3{left:26%;top:30%;width:46vw;height:46vw;background:rgba(220,100,255,.40);animation:adbg-d3 17s ease-in-out infinite;}
.adbg-b4{left:0;top:56%;width:48vw;height:48vw;background:rgba(150,110,235,.46);animation:adbg-d2 16s ease-in-out infinite;}
.adbg-b5{right:2%;top:50%;width:48vw;height:48vw;background:rgba(60,180,255,.42);animation:adbg-d1 19s ease-in-out infinite;}
.adbg-b6{right:24%;top:82%;width:46vw;height:46vw;background:rgba(70,220,160,.40);animation:adbg-d3 14s ease-in-out infinite;}
.adbg-swirl{position:absolute;left:50%;top:50%;width:250vmax;height:250vmax;margin-left:-125vmax;margin-top:-125vmax;}
.adbg-swirl>i{display:block;width:100%;height:100%;border-radius:9999px;will-change:transform;}
.adbg-s1>i{opacity:.55;mix-blend-mode:soft-light;animation:adbg-spin 30s linear infinite;
  background:conic-gradient(from 0deg at 50% 50%,#ff5a8a,#ffae42,#fff070,#46e0a0,#3cb4ff,#9b6cff,#ff6fd0,#ff5a8a);}
.adbg-s2>i{opacity:.45;mix-blend-mode:soft-light;animation:adbg-spin 44s linear infinite reverse;
  background:conic-gradient(from 140deg at 50% 50%,#3cb4ff,#46e0a0,#ffd23c,#ff5a8a,#9b6cff,#3cb4ff);}
.adbg-veil{background:rgba(255,248,241,.08);}
@keyframes adbg-hue{to{filter:hue-rotate(360deg)}}
@keyframes adbg-pan{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes adbg-spin{to{transform:rotate(360deg)}}
@keyframes adbg-d1{0%,100%{transform:translate(0,0) scale(1)}25%{transform:translate(26%,18%) scale(1.25)}50%{transform:translate(-16%,28%) scale(.85)}75%{transform:translate(20%,-18%) scale(1.12)}}
@keyframes adbg-d2{0%,100%{transform:translate(0,0) scale(1)}25%{transform:translate(-26%,16%) scale(1.18)}50%{transform:translate(20%,-22%) scale(.88)}75%{transform:translate(-20%,-12%) scale(1.15)}}
@keyframes adbg-d3{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(24%,-24%) scale(1.22)}66%{transform:translate(-24%,18%) scale(.82)}}
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
        </div>
        <div className="adbg-swirl adbg-s1">
          <i />
        </div>
        <div className="adbg-swirl adbg-s2">
          <i />
        </div>
      </div>
      <div className="adbg-l adbg-veil" />
    </div>
  );
}
