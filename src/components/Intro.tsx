import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/lang";
import { useScrollLock } from "@/hooks/use-scroll-lock";

// Abertura do site: o monograma VC montado em camadas (efeito 3D/extrusão)
// gira no espaço com anéis de luz orbitando; depois a "câmera" atravessa o
// logo e a tela se abre ao meio revelando o site.
//
// Fases: build (monta e gira) → fly (atravessa o logo) → open (abre a tela).

const BUILD_MS = 2100;
const FLY_MS = 550;
const OPEN_MS = 800;
const LAYERS = 14; // camadas do logo empilhadas em Z para dar volume
const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;
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

const V_PATH = "M 12 12 L 34 52 L 56 12";
const C_PATH = "M 104 17 A 21 21 0 1 0 104 47";

// Uma camada do monograma. A da frente desenha o traço; as de trás formam a "espessura".
const MarkLayer = ({ depth }: { depth: number }) => {
  const front = depth === 0;
  // Camadas de trás vão escurecendo em tons de petróleo
  const shade = `hsl(193 ${70 - depth * 2}% ${Math.max(8, 26 - depth * 1.3)}%)`;
  const draw = front
    ? { initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: 1.1, delay: 0.25, ease: EASE_IN_OUT } }
    : {};
  return (
    <motion.svg
      viewBox="0 0 120 64"
      className="absolute inset-0 h-full w-full overflow-visible"
      style={{ transform: `translateZ(${-depth * 2.6}px)` }}
      initial={front ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.55 + depth * 0.03, duration: 0.4 }}
    >
      <motion.path
        d={V_PATH}
        fill="none"
        stroke={front ? "#ffffff" : shade}
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...draw}
        style={front ? { filter: "drop-shadow(0 0 10px rgba(255,255,255,.55))" } : undefined}
      />
      <motion.path
        d={C_PATH}
        fill="none"
        stroke={front ? "hsl(var(--primary))" : shade}
        strokeWidth="9"
        strokeLinecap="round"
        {...draw}
        style={front ? { filter: "drop-shadow(0 0 14px hsl(var(--primary)))" } : undefined}
      />
    </motion.svg>
  );
};

// Anel de luz inclinado no espaço, girando, com um ponto brilhante no contorno
const Orbit = ({ tiltX, tiltY, duration, size, delay }: { tiltX: number; tiltY: number; duration: number; size: string; delay: number }) => (
  <motion.div
    className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]"
    style={{ width: size, height: size, marginLeft: `calc(${size} / -2)`, marginTop: `calc(${size} / -2)`, rotateX: tiltX, rotateY: tiltY }}
    initial={{ scale: 0.2, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    <div className="relative h-full w-full animate-[intro-spin_linear_infinite] rounded-full border border-primary/55 shadow-[0_0_24px_-6px_hsl(var(--primary)/0.8),inset_0_0_24px_-6px_hsl(var(--primary)/0.6)]" style={{ animationDuration: `${duration}s` }}>
      <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_14px_3px_hsl(var(--primary))]" />
    </div>
  </motion.div>
);

const Intro = ({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) => {
  const { t } = useLang();
  const [phase, setPhase] = useState<"build" | "fly" | "open">("build");
  const counter = useRef<HTMLSpanElement>(null);

  useScrollLock(phase !== "open");

  useEffect(() => {
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* ignore */ }

    // Contador 000 → 100 durante a montagem
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / BUILD_MS);
      const eased = 1 - Math.pow(1 - p, 3);
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
      {/* Persianas: metade de cima e de baixo que se abrem no final */}
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
        animate={flying ? { width: phase === "open" ? "100%" : "100%", opacity: phase === "open" ? 0 : 1 } : { width: 0, opacity: 0 }}
        transition={{ duration: phase === "open" ? 0.5 : FLY_MS / 1000, ease: EASE_IN_OUT }}
      />

      {/* Palco 3D */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center [perspective:1100px]"
        animate={flying ? { scale: 3.4, opacity: 0, filter: "blur(10px)" } : { scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: FLY_MS / 1000, ease: [0.7, 0, 0.84, 0] }}
      >
        <div
          aria-hidden
          className="absolute h-[70vmin] w-[70vmin] rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, hsl(var(--primary) / 0.22), transparent)" }}
        />

        <div className="relative h-[min(78vmin,460px)] w-[min(78vmin,460px)] [transform-style:preserve-3d]">
          <div className="absolute inset-0 animate-[intro-orbit_9s_linear_infinite] [transform-style:preserve-3d]">
            <Orbit tiltX={72} tiltY={0} duration={4} size="100%" delay={0.1} />
            <Orbit tiltX={64} tiltY={60} duration={5.5} size="84%" delay={0.25} />
            <Orbit tiltX={64} tiltY={-60} duration={7} size="68%" delay={0.4} />
          </div>

          {/* Monograma em camadas, girando até ficar de frente */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-[min(17vmin,100px)] w-[min(32vmin,188px)] [transform-style:preserve-3d]"
            style={{ x: "-50%", y: "-50%" }}
            initial={{ rotateY: -80, rotateX: 28, scale: 0.55 }}
            animate={{ rotateY: [-80, 32, -24, 14, 0], rotateX: [28, -10, 8, -4, 0], scale: [0.55, 1.05, 1, 1, 1] }}
            transition={{ duration: BUILD_MS / 1000, times: [0, 0.32, 0.58, 0.82, 1], ease: "easeInOut" }}
          >
            {Array.from({ length: LAYERS }, (_, d) => LAYERS - 1 - d).map((depth) => (
              <MarkLayer key={depth} depth={depth} />
            ))}
          </motion.div>
        </div>

        {/* Nome abaixo do logo */}
        <motion.p
          className="absolute left-1/2 top-[calc(50%+min(13vmin,80px))] -translate-x-1/2 whitespace-nowrap text-xs font-medium uppercase text-foreground/80 sm:text-sm"
          initial={{ opacity: 0, letterSpacing: "0.9em" }}
          animate={{ opacity: 1, letterSpacing: "0.38em" }}
          transition={{ delay: 1.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Vitor Carvalho
        </motion.p>
      </motion.div>

      {/* HUD: contador e assinatura */}
      <motion.div
        className="absolute inset-x-0 bottom-0 flex items-end justify-between px-5 pb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:px-10 sm:pb-8"
        animate={{ opacity: flying ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="flex items-baseline gap-2">
          <span ref={counter} className="text-3xl font-medium tabular-nums tracking-normal text-foreground sm:text-4xl">000</span>
          {t.intro.loading}
        </span>
        <span className="hidden sm:block">{t.hero.role}</span>
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
