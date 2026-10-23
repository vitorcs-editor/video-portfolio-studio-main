import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useLang } from "@/lib/lang";
import { useScrollLock } from "@/hooks/use-scroll-lock";

// Abertura do site, em atos:
//   1. partículas de luz espalhadas pela tela se juntam no formato do VC
//   2. um "cometa" ciano percorre e desenha o V e o C
//   3. o logo ganha espessura (extrusão 3D), gira mostrando o volume e um
//      reflexo de luz passa pela frente
//   4. os anéis se fecham no logo com um flash e uma onda de luz
//   5. a câmera atravessa o logo e a tela se abre ao meio revelando o site
// Fases de estado: build (atos 1–4) → fly (5a) → open (5b).

const BUILD_MS = 4200;
const FLY_MS = 550;
const OPEN_MS = 800;
const LOCK_AT = 3.6; // s — momento do flash
const LAYERS = 22; // camadas empilhadas em Z que formam a espessura
const LAYER_GAP = 2.2; // px entre camadas
const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const SESSION_KEY = "vc-intro-seen";

// Só toca uma vez por visita (sessão) e nunca com "reduzir movimento"
export const shouldPlayIntro = () => {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return sessionStorage.getItem(SESSION_KEY) !== "1";
  } catch {
    return true;
  }
};

const VIEWBOX = { w: 120, h: 64 };
const V_PATH = "M 12 12 L 34 52 L 56 12";
const C_PATH = "M 104 17 A 21 21 0 1 0 104 47";
const STROKE = 9;

// ── Ato 1: partículas ───────────────────────────────────────────────────────

interface Particle {
  sx: number; sy: number; // início
  tx: number; ty: number; // destino (um ponto do traço do logo)
  x: number; y: number; px: number; py: number;
  delay: number; dur: number; r: number; tw: number;
}

const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);

// Amostra pontos ao longo dos traços do logo, já convertidos para a tela
const sampleLogoPoints = (box: DOMRect, count: number) => {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("style", "position:absolute;width:0;height:0;visibility:hidden");
  document.body.appendChild(svg);
  const paths = [V_PATH, C_PATH].map((d) => {
    const p = document.createElementNS(ns, "path");
    p.setAttribute("d", d);
    svg.appendChild(p);
    return p;
  });
  const lengths = paths.map((p) => p.getTotalLength());
  const total = lengths[0] + lengths[1];
  const sx = box.width / VIEWBOX.w;
  const sy = box.height / VIEWBOX.h;
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < count; i++) {
    let d = (i / count) * total;
    const idx = d < lengths[0] ? 0 : 1;
    if (idx === 1) d -= lengths[0];
    const pt = paths[idx].getPointAtLength(d);
    // espalha um pouco na largura do traço para parecer "preenchido"
    const jitter = () => (Math.random() - 0.5) * STROKE * 0.8;
    points.push({ x: box.left + (pt.x + jitter()) * sx, y: box.top + (pt.y + jitter()) * sy });
  }
  svg.remove();
  return points;
};

const ParticleField = ({ target, fadeAt }: { target: React.RefObject<HTMLDivElement>; fadeAt: number }) => {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvas.current;
    const box = target.current?.getBoundingClientRect();
    if (!cv || !box) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = window.innerWidth;
    const H = window.innerHeight;
    cv.width = W * dpr;
    cv.height = H * dpr;
    ctx.scale(dpr, dpr);

    const count = W < 768 ? 90 : 150;
    const targets = sampleLogoPoints(box, count);
    const cx = W / 2;
    const cy = H / 2;
    const parts: Particle[] = targets.map((t) => {
      // nascem num anel largo em volta do centro, fora do logo
      const a = Math.random() * Math.PI * 2;
      const rad = Math.max(W, H) * (0.35 + Math.random() * 0.45);
      const sx = cx + Math.cos(a) * rad;
      const sy = cy + Math.sin(a) * rad;
      return {
        sx, sy, tx: t.x, ty: t.y, x: sx, y: sy, px: sx, py: sy,
        delay: Math.random() * 350, dur: 800 + Math.random() * 500,
        r: 0.8 + Math.random() * 1.4, tw: Math.random() * Math.PI * 2,
      };
    });

    const start = performance.now();
    let frame = 0;
    const draw = (now: number) => {
      const t = now - start;
      // some depois que o traço de luz passou
      const fade = t < fadeAt ? 1 : Math.max(0, 1 - (t - fadeAt) / 450);
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      for (const p of parts) {
        const k = Math.min(1, Math.max(0, (t - p.delay) / p.dur));
        const e = easeOutCubic(k);
        p.px = p.x; p.py = p.y;
        // leve curva no caminho (não chega em linha reta)
        const bend = Math.sin(k * Math.PI) * 40;
        p.x = p.sx + (p.tx - p.sx) * e + bend * Math.sin(p.tw);
        p.y = p.sy + (p.ty - p.sy) * e + bend * Math.cos(p.tw);
        const twinkle = k >= 1 ? 0.65 + 0.35 * Math.sin(t / 120 + p.tw) : 1;
        const alpha = Math.min(1, k * 3) * fade * twinkle;
        if (alpha <= 0) continue;
        // rastro
        ctx.strokeStyle = `rgba(0, 200, 240, ${0.45 * alpha})`;
        ctx.lineWidth = p.r;
        ctx.beginPath(); ctx.moveTo(p.px, p.py); ctx.lineTo(p.x, p.y); ctx.stroke();
        // ponto com brilho
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, `rgba(210, 248, 255, ${alpha})`);
        g.addColorStop(0.4, `rgba(0, 200, 240, ${0.6 * alpha})`);
        g.addColorStop(1, "rgba(0, 200, 240, 0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2); ctx.fill();
      }
      if (t < fadeAt + 500) frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [target, fadeAt]);

  return <canvas ref={canvas} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
};

// ── Ato 2: traço de luz ─────────────────────────────────────────────────────

// Desenha um caminho com uma "cabeça" de cometa brilhante seguindo a ponta
const LightStroke = ({ d, color, glow, delay, duration }: { d: string; color: string; glow: string; delay: number; duration: number }) => {
  const progress = useMotionValue(0);
  // Com pathLength 0 a ponta arredondada ainda desenharia um ponto; esconde até começar
  const visible = useTransform(progress, (v) => (v > 0.001 ? 1 : 0));
  const path = useRef<SVGPathElement>(null);
  const head = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const len = path.current?.getTotalLength() ?? 0;
    const place = (v: number) => {
      if (!path.current || !head.current) return;
      const pt = path.current.getPointAtLength(v * len);
      head.current.setAttribute("cx", String(pt.x));
      head.current.setAttribute("cy", String(pt.y));
      head.current.style.opacity = v > 0 && v < 1 ? "1" : "0";
    };
    const unsub = progress.on("change", place);
    const controls = animate(progress, 1, { delay, duration, ease: [0.65, 0, 0.35, 1] });
    return () => { unsub(); controls.stop(); };
  }, [delay, duration, progress]);

  return (
    <>
      <motion.path
        ref={path}
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pathLength: progress, opacity: visible, filter: `drop-shadow(0 0 6px ${glow})` }}
      />
      <circle ref={head} r="5.5" fill="#eaffff" style={{ opacity: 0, filter: `drop-shadow(0 0 6px ${glow}) drop-shadow(0 0 14px ${glow})` }} />
    </>
  );
};

// ── Ato 3: volume ───────────────────────────────────────────────────────────

// Uma camada de espessura atrás da face; anima de z=0 até a profundidade dela
// para o logo "crescer" para trás (extrusão).
const DepthLayer = ({ depth }: { depth: number }) => {
  const t = depth / (LAYERS - 1);
  // perto da face: ciano iluminado; no fundo: petróleo escuro
  const color = depth === 0 ? "hsl(190 100% 70%)" : `hsl(${191 + t * 6} ${100 - t * 35}% ${50 - t * 38}%)`;
  return (
    <motion.svg
      viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
      className="absolute inset-0 h-full w-full overflow-visible"
      initial={{ z: 0, opacity: 0 }}
      animate={{ z: -(depth + 1) * LAYER_GAP, opacity: 1 }}
      transition={{ delay: 2.0, duration: 0.7, ease: EASE_OUT }}
    >
      <path d={V_PATH} fill="none" stroke={color} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" />
      <path d={C_PATH} fill="none" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
    </motion.svg>
  );
};

// Face da frente: traço de luz + preenchimento final + reflexo passando
const FrontFace = () => (
  <svg viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`} className="absolute inset-0 h-full w-full overflow-visible">
    <defs>
      <linearGradient id="intro-v" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#bfefff" />
      </linearGradient>
      <linearGradient id="intro-c" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="hsl(var(--primary-soft))" />
        <stop offset="1" stopColor="hsl(var(--primary))" />
      </linearGradient>
      <linearGradient id="intro-shine" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#fff" stopOpacity="0" />
        <stop offset="0.5" stopColor="#fff" stopOpacity="0.95" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <mask id="intro-mark">
        <path d={V_PATH} fill="none" stroke="#fff" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" />
        <path d={C_PATH} fill="none" stroke="#fff" strokeWidth={STROKE} strokeLinecap="round" />
      </mask>
    </defs>

    <LightStroke d={V_PATH} color="url(#intro-v)" glow="rgba(255,255,255,.8)" delay={1.0} duration={0.6} />
    <LightStroke d={C_PATH} color="url(#intro-c)" glow="hsl(var(--primary))" delay={1.45} duration={0.65} />

    {/* Reflexo: faixa de luz recortada no formato do logo, passando duas vezes */}
    <g mask="url(#intro-mark)">
      <motion.rect
        y="-10" width="36" height="84" fill="url(#intro-shine)"
        initial={{ x: -50 }}
        animate={{ x: [-50, 140, 140, -50, 140] }}
        transition={{ delay: 2.6, duration: 1.4, times: [0, 0.45, 0.5, 0.5, 1], ease: "easeInOut" }}
        style={{ skewX: -20 }}
      />
    </g>
  </svg>
);

// ── Anéis ───────────────────────────────────────────────────────────────────

const Orbit = ({ tiltX, tiltY, duration, size, delay }: { tiltX: number; tiltY: number; duration: number; size: string; delay: number }) => (
  <motion.div
    className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]"
    style={{ width: size, height: size, marginLeft: `calc(${size} / -2)`, marginTop: `calc(${size} / -2)`, rotateX: tiltX, rotateY: tiltY }}
    initial={{ scale: 0.2, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 1.6, delay, ease: EASE_OUT }}
  >
    <div
      className="relative h-full w-full animate-[intro-spin_linear_infinite] rounded-full border border-primary/55 shadow-[0_0_24px_-6px_hsl(var(--primary)/0.8),inset_0_0_24px_-6px_hsl(var(--primary)/0.6)]"
      style={{ animationDuration: `${duration}s` }}
    >
      <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_14px_3px_hsl(var(--primary))]" />
    </div>
  </motion.div>
);

// ── Abertura ────────────────────────────────────────────────────────────────

const Intro = ({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) => {
  const { t } = useLang();
  const [phase, setPhase] = useState<"build" | "fly" | "open">("build");
  const counter = useRef<HTMLSpanElement>(null);
  const logo = useRef<HTMLDivElement>(null);

  useScrollLock(phase !== "open");

  useEffect(() => {
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* ignore */ }

    // Contador 000 → 100 durante a montagem
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / (LOCK_AT * 1000));
      const eased = 1 - Math.pow(1 - p, 2.2);
      if (counter.current) counter.current.textContent = String(Math.round(eased * 100)).padStart(3, "0");
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const toFly = setTimeout(() => setPhase("fly"), BUILD_MS);
    const toOpen = setTimeout(() => setPhase("open"), BUILD_MS + FLY_MS);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(toFly);
      clearTimeout(toOpen);
    };
  }, []);

  useEffect(() => {
    if (phase !== "open") return;
    onReveal();
    const done = setTimeout(onDone, OPEN_MS + 50);
    return () => clearTimeout(done);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const flying = phase !== "build";

  return (
    <div className="fixed inset-0 z-[300]" role="presentation">
      {/* Persianas: metades de cima e de baixo que se abrem no final */}
      {(["top", "bottom"] as const).map((half) => (
        <motion.div
          key={half}
          className={`absolute inset-x-0 h-1/2 bg-background ${half === "top" ? "top-0" : "bottom-0"}`}
          animate={{ y: phase === "open" ? (half === "top" ? "-100%" : "100%") : 0 }}
          transition={{ duration: OPEN_MS / 1000, ease: EASE_IN_OUT }}
        />
      ))}

      {/* Linha ciano na emenda das persianas */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-px -translate-x-1/2 bg-primary shadow-[0_0_20px_2px_hsl(var(--primary))]"
        initial={{ width: 0, opacity: 0 }}
        animate={flying ? { width: "100%", opacity: phase === "open" ? 0 : 1 } : { width: 0, opacity: 0 }}
        transition={{ duration: phase === "open" ? 0.5 : FLY_MS / 1000, ease: EASE_IN_OUT }}
      />

      {/* Palco 3D */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center [perspective:1100px]"
        animate={flying ? { scale: 3.6, opacity: 0, filter: "blur(10px)" } : { scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: FLY_MS / 1000, ease: [0.7, 0, 0.84, 0] }}
      >
        {/* Brilho de fundo, mais forte no flash */}
        <motion.div
          aria-hidden
          className="absolute h-[80vmin] w-[80vmin] rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, hsl(var(--primary) / 0.22), transparent)" }}
          animate={{ scale: [1, 1, 1.25, 1.05], opacity: [0.6, 1, 1, 0.85] }}
          transition={{ duration: LOCK_AT + 0.6, times: [0, LOCK_AT / (LOCK_AT + 0.6) - 0.05, LOCK_AT / (LOCK_AT + 0.6), 1] }}
        />

        <div className="relative h-[min(86vmin,520px)] w-[min(86vmin,520px)] [transform-style:preserve-3d]">
          {/* Anéis girando como giroscópio; no flash se fecham no logo */}
          <motion.div
            className="absolute inset-0 [transform-style:preserve-3d]"
            animate={{ scale: [1, 1, 0.3], opacity: [1, 1, 0] }}
            transition={{ duration: LOCK_AT + 0.05, times: [0, (LOCK_AT - 0.4) / (LOCK_AT + 0.05), 1], ease: "easeIn" }}
          >
            <div className="absolute inset-0 animate-[intro-orbit_9s_linear_infinite] [transform-style:preserve-3d]">
              <Orbit tiltX={72} tiltY={0} duration={4} size="100%" delay={0.2} />
              <Orbit tiltX={64} tiltY={60} duration={5.5} size="84%" delay={0.4} />
              <Orbit tiltX={64} tiltY={-60} duration={7} size="68%" delay={0.6} />
            </div>
          </motion.div>

          {/* Monograma */}
          <motion.div
            ref={logo}
            className="absolute left-1/2 top-1/2 h-[min(23vmin,141px)] w-[min(44vmin,264px)] [transform-style:preserve-3d]"
            style={{ x: "-50%", y: "-50%" }}
            initial={{ rotateY: 0, rotateX: 0, scale: 1 }}
            animate={{
              rotateY: [0, 0, -50, 36, -14, 0],
              rotateX: [0, 0, 18, -12, 5, 0],
              scale: [1, 1, 0.92, 1.02, 1, 1.06, 1],
            }}
            transition={{
              rotateY: { duration: LOCK_AT, times: [0, 0.56, 0.71, 0.85, 0.94, 1], ease: "easeInOut" },
              rotateX: { duration: LOCK_AT, times: [0, 0.56, 0.71, 0.85, 0.94, 1], ease: "easeInOut" },
              scale: { duration: LOCK_AT + 0.35, times: [0, 0.56, 0.7, 0.84, 0.9, 0.95, 1], ease: "easeInOut" },
            }}
          >
            {Array.from({ length: LAYERS }, (_, i) => LAYERS - 1 - i).map((depth) => (
              <DepthLayer key={depth} depth={depth} />
            ))}
            <FrontFace />
          </motion.div>

          {/* Flash e onda de choque no momento em que o logo trava de frente */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 rounded-full mix-blend-screen"
            style={{ x: "-50%", y: "-50%", background: "radial-gradient(closest-side, rgba(255,255,255,1), rgba(200,248,255,0.9) 25%, hsl(var(--primary) / 0.55) 55%, transparent)" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0.2, 1.6, 3.4], opacity: [0, 1, 0] }}
            transition={{ delay: LOCK_AT - 0.08, duration: 0.7, times: [0, 0.25, 1], ease: "easeOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 rounded-full border-2 border-primary shadow-[0_0_30px_hsl(var(--primary))]"
            style={{ x: "-50%", y: "-50%" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0.2, 5], opacity: [0, 0.9, 0] }}
            transition={{ delay: LOCK_AT, duration: 0.8, ease: EASE_OUT }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 rounded-full border border-white/70"
            style={{ x: "-50%", y: "-50%" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0.2, 7], opacity: [0, 0.6, 0] }}
            transition={{ delay: LOCK_AT + 0.12, duration: 1, ease: EASE_OUT }}
          />
        </div>

        {/* Partículas que montam o logo */}
        <ParticleField target={logo} fadeAt={2100} />

        {/* Nome e função */}
        <div className="absolute left-1/2 top-[calc(50%+min(16vmin,98px))] flex -translate-x-1/2 flex-col items-center gap-3">
          <motion.p
            className="whitespace-nowrap text-sm font-medium uppercase text-foreground sm:text-base"
            initial={{ opacity: 0, letterSpacing: "1em", filter: "blur(6px)" }}
            animate={{ opacity: 1, letterSpacing: "0.42em", filter: "blur(0px)" }}
            transition={{ delay: 2.8, duration: 1.1, ease: EASE_OUT }}
          >
            Vitor Carvalho
          </motion.p>
          <motion.span
            className="h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 160, opacity: 1 }}
            transition={{ delay: 3.1, duration: 0.9, ease: EASE_OUT }}
          />
          <motion.span
            className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.3, duration: 0.7, ease: EASE_OUT }}
          >
            {t.hero.role}
          </motion.span>
        </div>
      </motion.div>

      {/* Contador */}
      <motion.div
        className="absolute bottom-0 left-0 flex items-baseline gap-2 px-5 pb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:px-10 sm:pb-8"
        animate={{ opacity: flying ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <span ref={counter} className="text-3xl font-medium tabular-nums tracking-normal text-foreground sm:text-4xl">000</span>
        {t.intro.loading}
      </motion.div>

      {/* Pular */}
      {phase === "build" && (
        <button
          onClick={() => setPhase("open")}
          className="absolute right-5 top-5 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground sm:right-8 sm:top-7"
        >
          {t.intro.skip} →
        </button>
      )}
    </div>
  );
};

export default Intro;
