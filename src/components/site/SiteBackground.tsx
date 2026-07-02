/**
 * The signature dawn wash — a single fixed, full-viewport field the whole site
 * rides on. It reads like the brand name: a soft sunrise, warm and slowly
 * breathing, never a distraction from the content on top.
 *
 * Pure CSS (no JS): a warm gradient wash, a few softly drifting color clouds in
 * the brand palette, a gentle light bloom, and an edge vignette that keeps
 * foreground text crisp. Motion is slow and low-contrast; it stills entirely
 * under `prefers-reduced-motion`.
 */
export function SiteBackground() {
  return (
    <div aria-hidden="true" className="adbg">
      <style
        dangerouslySetInnerHTML={{
          __html: `
.adbg{position:fixed;inset:0;z-index:-10;overflow:hidden;background:#fff8f1;}
.adbg-l{position:absolute;inset:0;}
.adbg-wash{opacity:.55;
  background-image:linear-gradient(150deg,#fff1f4 0%,#ffe6ea 22%,#ffe7d6 46%,#f6e9ff 72%,#fff3e6 100%);
  background-size:220% 220%;
  animation:adbg-pan 34s ease-in-out infinite;}
.adbg-field{position:absolute;inset:-25%;}
.adbg-blob{position:absolute;border-radius:9999px;filter:blur(96px);}
.adbg-b1{left:-4%;top:-2%;width:46vw;height:46vw;background:rgba(249,100,146,.22);animation:adbg-d1 30s ease-in-out infinite;}
.adbg-b2{right:-4%;top:8%;width:44vw;height:44vw;background:rgba(255,170,90,.20);animation:adbg-d2 36s ease-in-out infinite;}
.adbg-b3{left:20%;top:40%;width:44vw;height:44vw;background:rgba(159,123,214,.18);animation:adbg-d3 32s ease-in-out infinite;}
.adbg-b4{right:-2%;top:56%;width:42vw;height:42vw;background:rgba(255,155,184,.18);animation:adbg-d2 34s ease-in-out infinite;}
.adbg-b5{left:6%;top:74%;width:42vw;height:42vw;background:rgba(255,200,120,.16);animation:adbg-d1 38s ease-in-out infinite;}
.adbg-bloom{left:50%;top:34%;width:80vw;height:80vw;margin-left:-40vw;margin-top:-40vw;position:absolute;
  background:radial-gradient(closest-side,rgba(255,255,255,.5),rgba(255,255,255,0) 70%);
  animation:adbg-breathe 16s ease-in-out infinite;}
.adbg-vignette{background:radial-gradient(130% 130% at 50% 34%,transparent 58%,rgba(39,28,44,.08) 100%);}
@keyframes adbg-pan{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes adbg-breathe{0%,100%{transform:scale(1);opacity:.4}50%{transform:scale(1.14);opacity:.6}}
@keyframes adbg-d1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(10%,8%) scale(1.08)}}
@keyframes adbg-d2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-9%,7%) scale(1.06)}}
@keyframes adbg-d3{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(8%,-8%) scale(1.05)}}
@media (prefers-reduced-motion:reduce){.adbg-wash,.adbg-blob,.adbg-bloom{animation:none!important}}
`,
        }}
      />
      <div className="adbg-l adbg-wash" />
      <div className="adbg-field">
        <span className="adbg-blob adbg-b1" />
        <span className="adbg-blob adbg-b2" />
        <span className="adbg-blob adbg-b3" />
        <span className="adbg-blob adbg-b4" />
        <span className="adbg-blob adbg-b5" />
      </div>
      <div className="adbg-bloom" />
      <div className="adbg-l adbg-vignette" />
    </div>
  );
}
