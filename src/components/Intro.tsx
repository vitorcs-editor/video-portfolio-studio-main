import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/lang";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { TIMELINE as T, OPEN_MS, logoOnScreen, markIntroSeen } from "./intro/timeline";
import type { IntroScene } from "./intro/scene";

export { shouldPlayIntro } from "./intro/timeline";

// Abertura do site com cara de câmera de cinema:
//   - cena 3D (three.js, carregada sob demanda): o VC em metal cromado é
//     desenhado por um traço de luz, gira com reflexos de estúdio e brilho;
//   - por cima, a interface da câmera: cantos do visor, REC, timecode,
//     dados de exposição, medidor de áudio e a mira de foco que trava no logo;
//   - efeitos de vídeo: foco puxando (desfocado → nítido), glitch no
//     travamento e a câmera atravessando o logo antes de a tela abrir.

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;
const LOAD_TIMEOUT_MS = 2500; // se a cena 3D demorar, pula a abertura
const FPS = 24;

const pad = (n: number) => String(n).padStart(2, "0");
const timecode = (s: number) => {
  const frames = Math.floor(s * FPS);
  return `00:00:${pad(Math.floor(frames / FPS))}:${pad(frames % FPS)}`;
};

// Canto em L do visor
const Corner = ({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) => {
  const v = pos[0] === "t" ? "top-0 border-t-2" : "bottom-0 border-b-2";
  const h = pos[1] === "l" ? "left-0 border-l-2" : "right-0 border-r-2";
  return <span className={`absolute h-5 w-5 border-white/70 sm:h-7 sm:w-7 ${v} ${h}`} />;
};

const Intro = ({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) => {
  const { t } = useLang();
  const [ready, setReady] = useState(false);
  const [phase, setPhase] = useState<"build" | "fly" | "open">("build");
  const [glitch, setGlitch] = useState(false);
  const [locked, setLocked] = useState(false);
  const [showName, setShowName] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const [logo] = useState(() => logoOnScreen(window.innerWidth, window.innerHeight));

  useScrollLock(phase !== "open");

  // Carrega a cena 3D e roda a linha do tempo
  useEffect(() => {
    markIntroSeen();
    let scene: IntroScene | null = null;
    let frame = 0;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const giveUp = setTimeout(() => { if (!scene) setPhase("open"); }, LOAD_TIMEOUT_MS);

    import("./intro/scene")
      .then(({ createScene }) => {
        if (cancelled || !canvas.current) return;
        scene = createScene(canvas.current);
        clearTimeout(giveUp);
        setReady(true);
        const start = performance.now();
        const loop = (now: number) => {
          const s = (now - start) / 1000;
          scene?.render(s);
          if (tcRef.current) tcRef.current.textContent = timecode(s);
          if (pctRef.current) pctRef.current.textContent = String(Math.round(Math.min(1, s / T.lock) * 100)).padStart(3, "0");
          if (s < T.flyEnd + OPEN_MS / 1000) frame = requestAnimationFrame(loop);
        };
        frame = requestAnimationFrame(loop);
        const at = (sec: number, fn: () => void) => timers.push(setTimeout(fn, sec * 1000));
        at(T.name, () => setShowName(true));
        at(T.lock, () => { setLocked(true); setGlitch(true); });
        at(T.lock + 0.16, () => setGlitch(false));
        at(T.fly, () => setPhase("fly"));
        at(T.flyEnd, () => setPhase("open"));
      })
      .catch(() => setPhase("open"));

    const onResize = () => scene?.resize();
    window.addEventListener("resize", onResize);
    return () => {
      cancelled = true;
      clearTimeout(giveUp);
      timers.forEach(clearTimeout);
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      scene?.dispose();
    };
  }, []);

  useEffect(() => {
    if (phase !== "open") return;
    onReveal();
    const done = setTimeout(onDone, OPEN_MS + 50);
    return () => clearTimeout(done);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const opening = phase === "open";
  const show = (delay: number, extra: object = {}) => ({
    initial: { opacity: 0, ...extra },
    animate: ready && phase === "build" ? { opacity: 1, x: 0, y: 0 } : { opacity: 0 },
    transition: { delay: phase === "build" ? delay : 0, duration: phase === "build" ? 0.6 : 0.25, ease: EASE_OUT },
  });

  return (
    <div className="fixed inset-0 z-[300] overflow-hidden" role="presentation">
      {/* Persianas que se abrem no final */}
      {(["top", "bottom"] as const).map((half) => (
        <motion.div
          key={half}
          className={`absolute inset-x-0 h-1/2 bg-background ${half === "top" ? "top-0" : "bottom-0"}`}
          animate={{ y: opening ? (half === "top" ? "-100%" : "100%") : 0 }}
          transition={{ duration: OPEN_MS / 1000, ease: EASE_IN_OUT }}
        />
      ))}

      {/* Cena 3D: começa desfocada e o foco "puxa"; reajusta antes de travar.
          O glitch (separação RGB) fica num wrapper para não brigar com o foco. */}
      <div
        className="absolute inset-0"
        style={glitch ? { transform: "translateX(6px)", filter: "drop-shadow(5px 0 0 rgba(255,0,90,.75)) drop-shadow(-5px 0 0 rgba(0,240,255,.75))" } : undefined}
      >
      <motion.canvas
        ref={canvas}
        aria-hidden
        className="absolute inset-0 h-full w-full"
        initial={{ filter: "blur(16px)", opacity: 0 }}
        animate={
          opening
            ? { opacity: 0, filter: "blur(0px)" }
            : ready
              ? { opacity: 1, filter: ["blur(16px)", "blur(0px)", "blur(0px)", "blur(5px)", "blur(0px)"] }
              : { opacity: 0 }
        }
        transition={
          opening
            ? { duration: 0.3 }
            : { opacity: { duration: 0.4 }, filter: { duration: T.lock, times: [0, 0.3, T.refocus / T.lock, (T.refocus + 0.3) / T.lock, 1], ease: "easeInOut" } }
        }
      />
      </div>

      {/* Linhas de varredura (textura de monitor) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 3px)" }}
      />

      {/* Linha de varredura descendo ao ligar */}
      {ready && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-primary/25 to-transparent"
          initial={{ top: "-10%" }}
          animate={{ top: "110%" }}
          transition={{ duration: 1.3, ease: "easeInOut" }}
        />
      )}

      {/* Grade de terços */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" {...show(0.2)}>
        {[33.33, 66.66].map((p) => (
          <span key={`v${p}`} className="absolute inset-y-0 w-px bg-white/[0.06]" style={{ left: `${p}%` }} />
        ))}
        {[33.33, 66.66].map((p) => (
          <span key={`h${p}`} className="absolute inset-x-0 h-px bg-white/[0.06]" style={{ top: `${p}%` }} />
        ))}
      </motion.div>

      {/* Visor: cantos + dados da câmera */}
      <motion.div className="pointer-events-none absolute inset-4 sm:inset-8" {...show(0.1, { scale: 1.06 })} animate={ready && phase === "build" ? { opacity: 1, scale: 1 } : { opacity: 0 }}>
        <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />

        <div className="absolute left-7 top-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/85 sm:left-10 sm:top-6 sm:text-[11px]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-rec shadow-[0_0_10px_hsl(var(--rec))]" /> REC
        </div>
        <div className="absolute left-1/2 top-5 hidden -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60 sm:top-6 sm:block">
          4K · 24 FPS · RAW
        </div>

        <div className="absolute bottom-5 left-7 font-mono text-foreground/85 sm:bottom-6 sm:left-10">
          <span ref={tcRef} className="block text-lg tabular-nums tracking-wider sm:text-2xl">00:00:00:00</span>
          <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {t.intro.loading} <span ref={pctRef} className="tabular-nums text-primary">000</span>%
          </span>
        </div>

        <div className="absolute bottom-5 right-7 flex items-end gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:bottom-6 sm:right-10">
          <span className="hidden sm:block">ISO 800 · f/1.8 · 1/48</span>
          {/* medidor de áudio L/R */}
          <span className="flex h-6 items-end gap-[3px]">
            {[0, 1].map((ch) => (
              <span key={ch} className="flex h-full w-1.5 flex-col justify-end overflow-hidden bg-white/10">
                <span
                  className="w-full animate-[intro-meter_0.5s_ease-in-out_infinite_alternate] bg-gradient-to-t from-primary via-primary to-rec"
                  style={{ animationDelay: `${ch * -0.23}s` }}
                />
              </span>
            ))}
          </span>
        </div>
      </motion.div>

      {/* Mira de foco: começa grande e procura; trava no logo e fica ciano */}
      {ready && phase === "build" && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2"
          initial={{ width: logo.width * 2.1, height: logo.height * 2.6, opacity: 0 }}
          animate={{
            width: [logo.width * 2.1, logo.width * 1.45, logo.width * 1.3, logo.width * 1.38, logo.width * 1.22],
            height: [logo.height * 2.6, logo.height * 1.75, logo.height * 1.55, logo.height * 1.65, logo.height * 1.45],
            opacity: 1,
          }}
          transition={{ duration: T.lock, times: [0, 0.35, 0.6, T.refocus / T.lock, 1], ease: "easeInOut" }}
          style={{ x: "-50%", y: "-50%" }}
        >
          {(["tl", "tr", "bl", "br"] as const).map((pos) => (
            <span
              key={pos}
              className={`absolute h-7 w-7 transition-colors duration-200 ${locked ? "border-primary" : "border-white/60"} ${
                pos[0] === "t" ? "top-0 border-t-2" : "bottom-0 border-b-2"
              } ${pos[1] === "l" ? "left-0 border-l-2" : "right-0 border-r-2"}`}
            />
          ))}
          <span
            className={`absolute -top-6 left-0 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-200 ${
              locked ? "text-primary" : "text-foreground/50"
            }`}
          >
            {locked ? "● AF Lock" : "AF ···"}
          </span>
        </motion.div>
      )}

      {/* Nome e função embaixo do logo */}
      <motion.div
        className="pointer-events-none absolute left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
        // os traços ocupam ~77% da altura da caixa do logo
        style={{ top: `calc(50% + ${logo.height * 0.385 + 60}px)` }}
        initial={{ opacity: 0 }}
        animate={showName && phase === "build" ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.p
          className="whitespace-nowrap text-sm font-medium uppercase text-foreground sm:text-base"
          initial={{ letterSpacing: "1em", filter: "blur(6px)" }}
          animate={showName ? { letterSpacing: "0.42em", filter: "blur(0px)" } : {}}
          transition={{ duration: 1.1, ease: EASE_OUT }}
        >
          Vitor Carvalho
        </motion.p>
        <motion.span
          className="h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ width: 0 }}
          animate={showName ? { width: 160 } : {}}
          transition={{ delay: 0.3, duration: 0.9, ease: EASE_OUT }}
        />
        <motion.span
          className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={showName ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          {t.hero.role}
        </motion.span>
      </motion.div>

      {/* Flash branco no travamento */}
      {locked && phase === "build" && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-white mix-blend-overlay"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
      )}

      {/* Linha ciano na emenda das persianas quando a tela abre */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-px -translate-x-1/2 bg-primary shadow-[0_0_20px_2px_hsl(var(--primary))]"
        initial={{ width: 0, opacity: 0 }}
        animate={phase !== "build" ? { width: "100%", opacity: opening ? 0 : 1 } : { width: 0, opacity: 0 }}
        transition={{ duration: opening ? 0.5 : 0.5, ease: EASE_IN_OUT }}
      />

      {/* Pular */}
      {phase === "build" && (
        <button
          onClick={() => setPhase("open")}
          className="absolute right-7 top-4 z-10 rounded-full px-3 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground sm:right-10 sm:top-5"
        >
          {t.intro.skip} →
        </button>
      )}
    </div>
  );
};

export default Intro;
