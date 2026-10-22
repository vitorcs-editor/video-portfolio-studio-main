import { useEffect, useState } from "react";

// Mini-cenas animadas que ilustram cada serviço (no lugar de ícones genéricos).
// Todas em CSS/SVG puros; "reduzir movimento" congela as animações (regra global).

const frame = "rounded-[10px] border border-white/15 bg-gradient-to-b from-white/[0.07] to-white/[0.02]";

// 0 · Ads: três versões do mesmo anúncio (A/B/C) rodando lado a lado
const AdsScene = () => (
  <div className="flex h-full items-end justify-center gap-3 pb-5">
    {["A", "B", "C"].map((v, i) => (
      <div
        key={v}
        className={`${frame} relative flex aspect-[9/16] flex-col justify-between p-2 ${i === 1 ? "h-[88%] border-primary/60 shadow-[0_0_30px_-6px_hsl(var(--primary)/0.7)]" : "h-[72%] opacity-70"}`}
      >
        <span className={`w-fit rounded px-1.5 py-0.5 font-mono text-[9px] ${i === 1 ? "bg-primary text-primary-foreground" : "bg-white/10 text-foreground/70"}`}>{v}</span>
        <span className="space-y-1">
          <span className="block h-1 w-3/4 rounded-full bg-white/25" />
          <span className="block h-1 w-1/2 rounded-full bg-white/15" />
          <span className="mt-2 block h-[3px] overflow-hidden rounded-full bg-white/10">
            <span className="block h-full origin-left animate-[scene-progress_3.2s_linear_infinite] rounded-full bg-primary" style={{ animationDelay: `${-i * 0.9}s` }} />
          </span>
        </span>
      </div>
    ))}
  </div>
);

// 1 · Reels: quadro vertical com legenda dinâmica trocando palavra a palavra
const CAPTION = ["PARA", "O", "SCROLL"];
const ReelsScene = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % CAPTION.length), 650);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex h-full items-center justify-center">
      <div className={`${frame} relative flex aspect-[9/16] h-[86%] flex-col items-center justify-end overflow-hidden pb-6`}>
        <span className="absolute left-2 top-2 flex items-center gap-1 font-mono text-[9px] text-foreground/70">
          <span className="h-1.5 w-1.5 rounded-full bg-rec" /> REELS
        </span>
        <span key={i} className={`animate-[scene-pop_0.35s_cubic-bezier(.2,1.4,.4,1)] text-lg font-bold tracking-tight ${i === 2 ? "text-primary" : "text-white"}`}>
          {CAPTION[i]}
        </span>
        <span className="absolute right-2 top-1/2 flex flex-col items-center gap-2 text-[9px] text-foreground/60">
          <span className="h-3 w-3 rounded-full border border-white/40" />
          <span className="h-3 w-3 rounded-full border border-white/40" />
        </span>
      </div>
    </div>
  );
};

// 2 · VSL: player horizontal com capítulos e a agulha andando até a oferta
const VslScene = () => (
  <div className="flex h-full items-center justify-center px-6">
    <div className={`${frame} relative aspect-video w-full max-w-[260px] p-3`}>
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
          <span className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-white/80" />
        </span>
      </span>
      <span className="absolute inset-x-3 bottom-3">
        <span className="relative block h-[3px] rounded-full bg-white/15">
          {[22, 48, 71].map((x) => (
            <span key={x} className="absolute top-1/2 h-2 w-px -translate-y-1/2 bg-white/40" style={{ left: `${x}%` }} />
          ))}
          <span className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
          <span className="absolute left-0 top-0 block h-full animate-[scene-vsl_5s_cubic-bezier(.4,0,.2,1)_infinite] rounded-full bg-primary" />
        </span>
        <span className="mt-1.5 flex justify-end font-mono text-[8px] text-primary">OFERTA</span>
      </span>
    </div>
  </div>
);

// 3 · Motion: curva de animação com keyframes e um ponto percorrendo
const MotionScene = () => (
  <div className="flex h-full items-center justify-center px-6">
    <svg viewBox="0 0 240 120" className="h-full max-h-[130px] w-full max-w-[260px] overflow-visible">
      <defs>
        <linearGradient id="scene-curve" x1="0" x2="1">
          <stop offset="0" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
          <stop offset="1" stopColor="hsl(var(--primary))" />
        </linearGradient>
      </defs>
      {[30, 60, 90].map((y) => (
        <line key={y} x1="0" x2="240" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" />
      ))}
      <path id="scene-motion-path" d="M 10 100 C 80 100, 90 20, 230 18" fill="none" stroke="url(#scene-curve)" strokeWidth="2.5" />
      <line x1="10" y1="100" x2="80" y2="100" stroke="rgba(255,255,255,0.3)" strokeDasharray="3 3" />
      <line x1="230" y1="18" x2="90" y2="20" stroke="rgba(255,255,255,0.3)" strokeDasharray="3 3" />
      {[[10, 100], [230, 18]].map(([x, y]) => (
        <rect key={x} x={x - 5} y={y - 5} width="10" height="10" transform={`rotate(45 ${x} ${y})`} fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="2" />
      ))}
      {[[80, 100], [90, 20]].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="3" fill="white" opacity="0.7" />
      ))}
      <circle r="6" fill="hsl(var(--primary))" style={{ filter: "drop-shadow(0 0 6px hsl(var(--primary)))" }}>
        <animateMotion dur="2.4s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.8;1" calcMode="spline" keySplines="0.4 0 0.2 1;0 0 1 1">
          <mpath href="#scene-motion-path" />
        </animateMotion>
      </circle>
    </svg>
  </div>
);

const SCENES = [AdsScene, ReelsScene, VslScene, MotionScene];

const ServiceScene = ({ index }: { index: number }) => {
  const Scene = SCENES[index] ?? AdsScene;
  return (
    <div aria-hidden className="relative h-44 overflow-hidden rounded-2xl border border-white/[0.06] bg-background/50">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{ background: "radial-gradient(ellipse at 50% 100%, hsl(var(--primary) / 0.14), transparent 70%)" }}
      />
      <div className="relative h-full">
        <Scene />
      </div>
    </div>
  );
};

export default ServiceScene;
