import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/lib/lang";
import { videos, clientById, driveEmbed, driveThumb, type Video } from "@/data/portfolio";
import VideoModal from "./VideoModal";
import { EASE } from "./common/motion";

// Um clipe de cada cliente/nicho para a vitrine do hero
const HIGHLIGHTS: Video[] = Array.from(new Map(videos.map((v) => [v.clientId, v])).values());

// Posição de cada cartão conforme a distância até o central (0 = centro).
// Deslocamentos em múltiplos da largura do cartão; no mobile ficam mais próximos.
const LAYOUT = {
  desktop: { x: [0, 1, 1.78, 2.43], rotate: [0, 38, 48, 55], scale: [1, 0.88, 0.76, 0.64], opacity: [1, 1, 0.7, 0.4] },
  mobile: { x: [0, 0.82, 1.35, 1.76], rotate: [0, 38, 48, 55], scale: [1, 0.84, 0.7, 0.6], opacity: [1, 1, 0, 0] },
};

const MOBILE_QUERY = "(max-width: 767px)";

// Largura do cartão central: 170px no mobile; no desktop cresce com a altura da
// tela (até 230px) para a vitrine inteira caber na primeira dobra.
const measure = () => {
  const isMobile = window.matchMedia(MOBILE_QUERY).matches;
  const width = isMobile ? 170 : Math.round(Math.min(230, Math.max(160, ((window.innerHeight - 560) * 9) / 16)));
  return { isMobile, width };
};

const useCardSize = () => {
  const [size, setSize] = useState(measure);
  useEffect(() => {
    const onResize = () => setSize(measure());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return size;
};

// Vitrine 3D: cartões verticais em leque, o central em destaque e tocável
const Coverflow = ({ onPlay }: { onPlay: (video: Video) => void }) => {
  const { t } = useLang();
  const { isMobile, width: cardWidth } = useCardSize();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragStart = useRef<number | null>(null);
  const total = HIGHLIGHTS.length;
  const layout = isMobile ? LAYOUT.mobile : LAYOUT.desktop;

  const go = useCallback((step: number) => setIndex((i) => (i + step + total) % total), [total]);

  // Avança sozinho, exceto com o mouse em cima ou com "reduzir movimento"
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => go(1), 4000);
    return () => clearInterval(id);
  }, [paused, go]);

  // Distância circular do cartão até o central, de -3 a +3
  const offsetOf = (i: number) => {
    let d = i - index;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d;
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
    >
      <div
        className="relative mx-auto w-full touch-pan-y [perspective:1200px]"
        style={{ height: Math.round((cardWidth * 16) / 9) + 24 }}
        onPointerDown={(e) => { dragStart.current = e.clientX; }}
        onPointerUp={(e) => {
          if (dragStart.current === null) return;
          const dx = e.clientX - dragStart.current;
          dragStart.current = null;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        }}
        role="region"
        aria-roledescription="carrossel"
        aria-label={t.hero.highlights}
      >
        {HIGHLIGHTS.map((video, i) => {
          const offset = offsetOf(i);
          const distance = Math.abs(offset);
          if (distance > 3) return null;
          const side = Math.sign(offset);
          const client = clientById(video.clientId);
          const isCenter = offset === 0;

          return (
            <motion.button
              key={`${video.clientId}-${video.driveId}`}
              onClick={() => (isCenter ? onPlay(video) : setIndex(i))}
              tabIndex={isCenter ? 0 : -1}
              aria-hidden={!isCenter}
              aria-label={isCenter ? `${client?.name} — ${t.portfolio.categories[client?.niche ?? "social"]}` : undefined}
              initial={false}
              animate={{
                x: side * layout.x[distance] * cardWidth,
                rotateY: -side * layout.rotate[distance],
                scale: layout.scale[distance],
                opacity: layout.opacity[distance],
                z: isCenter ? 80 : 0,
              }}
              transition={{ duration: 0.7, ease: EASE }}
              style={{ zIndex: 10 - distance, width: cardWidth, marginLeft: -cardWidth / 2 }}
              className={`group absolute left-1/2 top-0 aspect-[9/16] overflow-hidden rounded-[22px] border sm:rounded-[26px] ${
                isCenter
                  ? "border-primary/60 shadow-[0_40px_120px_-20px_hsl(var(--primary)/0.55)]"
                  : "border-white/15 shadow-[0_40px_90px_-20px_rgba(0,0,0,0.9)]"
              }`}
            >
              <img
                src={video.thumbnail ?? driveThumb(video.driveId)}
                alt=""
                draggable={false}
                className="h-full w-full bg-surface object-cover"
                onError={(e) => { e.currentTarget.style.opacity = "0"; }}
              />
              {/* Sombra lateral nos cartões de trás; gradiente inferior no central */}
              <span
                className={`absolute inset-0 transition-opacity duration-700 ${
                  isCenter
                    ? "bg-gradient-to-b from-transparent from-55% to-background/90"
                    : "bg-gradient-to-r from-background/55 via-transparent to-background/55"
                }`}
              />
              {isCenter && (
                <span className="absolute inset-x-3.5 bottom-3.5 flex items-center justify-between gap-2 text-left sm:inset-x-4 sm:bottom-4">
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-white">{client?.name}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-primary">
                      {client && t.portfolio.categories[client.niche]}
                    </span>
                  </span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.8)] transition-transform duration-300 group-hover:scale-110">
                    <Play size={16} className="ml-0.5 fill-current" />
                  </span>
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Controles */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button onClick={() => go(-1)} aria-label={t.hero.prev} className="glass flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 transition-colors hover:text-white">
          <ChevronLeft size={18} />
        </button>
        <div className="flex items-center gap-1.5" aria-hidden>
          {HIGHLIGHTS.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-6 bg-primary" : "w-1.5 bg-white/25"}`}
            />
          ))}
        </div>
        <button onClick={() => go(1)} aria-label={t.hero.next} className="glass flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 transition-colors hover:text-white">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

const Hero = () => {
  const { t } = useLang();
  const [playing, setPlaying] = useState<Video | null>(null);
  const openBudget = () => window.dispatchEvent(new CustomEvent("openBudgetModal"));

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section className="relative overflow-hidden pt-28">
      {/* Brilho e piso em perspectiva atrás da vitrine */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[55%] h-[520px] w-[1100px] max-w-[160vw] -translate-x-1/2 blur-xl"
        style={{ background: "radial-gradient(closest-side, hsl(var(--primary) / 0.26), transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-[10%] bottom-0 h-[34%] origin-bottom [transform:perspective(600px)_rotateX(60deg)]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary) / 0.16) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.16) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
          maskImage: "linear-gradient(transparent, black 70%)",
          WebkitMaskImage: "linear-gradient(transparent, black 70%)",
        }}
      />

      <div className="container relative flex flex-col items-center text-center">
        <motion.span {...reveal(0.05)} className="eyebrow">
          <span className="h-2 w-2 rounded-full bg-live shadow-[0_0_0_4px_hsl(var(--live)/0.15)]" />
          {t.hero.available}
          <span className="hidden sm:inline">· {t.hero.ctaNote}</span>
        </motion.span>

        <motion.h1
          {...reveal(0.15)}
          className="mt-6 max-w-5xl text-balance text-[clamp(2.6rem,5.6vw,4.75rem)] font-semibold leading-[1] tracking-[-0.05em]"
        >
          {t.hero.headline}
          <span className="text-gradient block">{t.hero.headlineAccent}</span>
        </motion.h1>

        <motion.p {...reveal(0.25)} className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t.hero.pitch}
        </motion.p>

        <motion.div {...reveal(0.35)} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button onClick={openBudget} className="btn-primary">
            {t.navbar.requestBudget}
            <ArrowUpRight size={17} />
          </button>
          <a href="#portfolio" className="btn-glass">
            <Play size={14} className="fill-current" />
            {t.hero.viewWork}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.45, ease: EASE }}
          className="mt-10 w-full sm:mt-12"
        >
          <Coverflow onPlay={setPlaying} />
        </motion.div>

        {/* Números */}
        <motion.dl
          {...reveal(0.7)}
          className="mt-14 grid w-full max-w-4xl grid-cols-2 gap-y-6 border-t border-white/10 pb-16 pt-8 sm:grid-cols-4 sm:pb-20"
        >
          {t.hero.stats.items.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <dt className="order-2 text-xs text-muted-foreground sm:text-sm">{stat.label}</dt>
              <dd className="order-1 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                {stat.value.replace(/\+$/, "")}
                {stat.value.endsWith("+") && <span className="text-primary">+</span>}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <VideoModal
        isOpen={playing !== null}
        onClose={() => setPlaying(null)}
        videoUrl={playing ? driveEmbed(playing.driveId) : ""}
        title={playing ? clientById(playing.clientId)?.name ?? "" : ""}
        isVertical={!playing?.horizontal}
      />
    </section>
  );
};

export default Hero;
