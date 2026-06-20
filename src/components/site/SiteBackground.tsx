"use client";

import { useEffect, useRef } from "react";

/**
 * The one living gradient — a single fixed, full-viewport color field that the
 * entire site sits on. It is ALWAYS in motion and blends every section together
 * vertically: two huge counter-rotating conic "whirlpools" swirl over a panning
 * rainbow wash, with big drifting blobs blooming through like color clouds. The
 * layers interfere as they move, so the color is never the same twice — it ebbs,
 * flows, and churns.
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
.adbg-l{position:absolute;inset:0;}
.adbg-wash{opacity:.62;
  background-image:linear-gradient(125deg,#ffd6c0 0%,#ffbcd6 18%,#f3b6ff 38%,#c4bcff 56%,#bfe6ff 74%,#c6f3dd 100%);
  background-size:300% 300%;
  animation:adbg-pan 17s ease-in-out infinite;}
.adbg-field{position:absolute;inset:-30%;will-change:transform;}
.adbg-blob{position:absolute;border-radius:9999px;filter:blur(100px);will-change:transform;}
.adbg-b1{left:0;top:0;width:48vw;height:48vw;background:rgba(249,100,146,.46);animation:adbg-d1 19s ease-in-out infinite;}
.adbg-b2{right:2%;top:8%;width:46vw;height:46vw;background:rgba(255,168,84,.44);animation:adbg-d2 23s ease-in-out infinite;}
.adbg-b3{left:28%;top:32%;width:44vw;height:44vw;background:rgba(232,121,249,.32);animation:adbg-d3 27s ease-in-out infinite;}
.adbg-b4{left:0;top:58%;width:46vw;height:46vw;background:rgba(159,123,214,.42);animation:adbg-d2 21s ease-in-out infinite;}
.adbg-b5{right:4%;top:52%;width:46vw;height:46vw;background:rgba(56,189,248,.36);animation:adbg-d1 25s ease-in-out infinite;}
.adbg-b6{right:26%;top:84%;width:44vw;height:44vw;background:rgba(94,216,160,.34);animation:adbg-d3 22s ease-in-out infinite;}
.adbg-swirl{position:absolute;left:50%;top:50%;width:240vmax;height:240vmax;margin-left:-120vmax;margin-top:-120vmax;}
.adbg-swirl>i{display:block;width:100%;height:100%;border-radius:9999px;will-change:transform;}
.adbg-s1>i{opacity:.5;mix-blend-mode:soft-light;animation:adbg-spin 48s linear infinite;
  background:conic-gradient(from 0deg at 50% 50%,#ff7eb3,#ffb56b,#fff0a0,#8ee6c8,#7ec8ff,#b48cff,#ff8fd0,#ff7eb3);}
.adbg-s2>i{opacity:.42;mix-blend-mode:overlay;animation:adbg-spin 70s linear infinite reverse;
  background:conic-gradient(from 140deg at 50% 50%,#7ec8ff,#8ee6c8,#ffd66b,#ff7eb3,#b48cff,#7ec8ff);}
.adbg-veil{background:rgba(255,248,241,.12);}
@keyframes adbg-pan{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes adbg-spin{to{transform:rotate(360deg)}}
@keyframes adbg-d1{0%,100%{transform:translate(0,0) scale(1)}25%{transform:translate(16%,12%) scale(1.22)}50%{transform:translate(-10%,18%) scale(.9)}75%{transform:translate(12%,-12%) scale(1.1)}}
@keyframes adbg-d2{0%,100%{transform:translate(0,0) scale(1)}25%{transform:translate(-16%,10%) scale(1.14)}50%{transform:translate(12%,-14%) scale(.92)}75%{transform:translate(-12%,-8%) scale(1.12)}}
@keyframes adbg-d3{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(14%,-16%) scale(1.18)}66%{transform:translate(-14%,12%) scale(.88)}}
`,
        }}
      />
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
      <div className="adbg-l adbg-veil" />
    </div>
  );
}
