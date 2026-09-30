import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Instagram, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/lang";
import { videos, clientById, driveThumb } from "@/data/portfolio";
import Timecode from "./common/Timecode";
import { EASE } from "./common/motion";

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/vitorcarvalhods/", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/vitor-carvalho-b26a52361/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:vitorcarvalhods.edicao@gmail.com", label: "Email" },
];

// Um clipe de cada cliente para o monitor do hero
const MONITOR_CLIPS = Array.from(new Map(videos.map((v) => [v.clientId, v])).values()).slice(0, 6);

// "Monitor de programa": um quadro 9:16 que troca entre trabalhos do portfólio,
// com HUD de câmera por cima.
const ProgramMonitor = () => {
  const { t } = useLang();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % MONITOR_CLIPS.length), 2800);
    return () => clearInterval(id);
  }, []);

  const clip = MONITOR_CLIPS[index];
  const client = clientById(clip.clientId);

  return (
    <a
      href="#portfolio"
      aria-label={t.hero.viewWork}
      className="group relative block aspect-[9/16] w-full overflow-hidden rounded-md bg-surface ring-1 ring-line"
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={clip.driveId}
          src={clip.thumbnail ?? driveThumb(clip.driveId)}
          alt=""
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => { e.currentTarget.style.opacity = "0"; }}
        />
      </AnimatePresence>

      {/* Escurecimento e guias de área segura */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/80" />
      <div className="absolute inset-[8%] rounded-sm border border-dashed border-foreground/15" />
      <div className="viewfinder absolute inset-3" />

      {/* HUD */}
      <div className="absolute inset-x-5 top-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-foreground/85">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-blink rounded-full bg-rec" /> REC
        </span>
        <span>4K · 24 FPS</span>
      </div>
      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-wider text-primary">
            CLIP {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-display text-2xl font-bold uppercase leading-none">{client?.name}</span>
        </div>
        <Timecode className="text-[10px] text-foreground/70" />
      </div>

      {/* Play no hover */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 scale-90 items-center justify-center rounded-full bg-primary/90 text-primary-foreground opacity-0 shadow-[0_0_40px_hsl(var(--primary)/0.6)] transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
          <Play size={20} className="ml-1 fill-current" />
        </span>
      </div>
    </a>
  );
};

const Hero = () => {
  const { t } = useLang();
  const openBudget = () => window.dispatchEvent(new CustomEvent("openBudgetModal"));

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease: EASE },
  });

  return (
    <section className="relative pt-24 sm:pt-28 lg:min-h-[100svh]">
      <div className="container grid items-center gap-12 pb-16 lg:grid-cols-12 lg:gap-8 lg:pb-24">
        {/* Texto */}
        <div className="lg:col-span-8">
          <motion.div {...reveal(0.1)} className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/80">
              <span className="h-2 w-2 animate-blink rounded-full bg-rec shadow-[0_0_8px_hsl(var(--rec))]" />
              {t.hero.role}
            </span>
            <span className="label-mono">iGaming · VSL · Ads · Motion</span>
          </motion.div>

          <h1 className="font-display font-black uppercase leading-[0.8] tracking-[-0.02em]">
            <motion.span {...reveal(0.2)} className="block text-[23vw] sm:text-[clamp(4.5rem,15vw,13.5rem)]">
              Vitor
            </motion.span>
            <motion.span {...reveal(0.32)} className="text-outline block text-[23vw] sm:text-[clamp(4.5rem,15vw,13.5rem)]">
              Carvalho
            </motion.span>
          </h1>

          <motion.p
            {...reveal(0.5)}
            className="mt-8 max-w-2xl font-serif text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.1] text-foreground"
          >
            {t.hero.headline}
            <em className="text-primary">{t.hero.headlineAccent}</em>
          </motion.p>

          <motion.p {...reveal(0.6)} className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.hero.pitch}
          </motion.p>

          <motion.div {...reveal(0.7)} className="mt-10 flex flex-wrap items-center gap-3">
            <button onClick={openBudget} className="btn-primary">
              {t.navbar.requestBudget}
              <ArrowUpRight size={16} />
            </button>
            <a href="#portfolio" className="btn-ghost">
              <Play size={14} className="fill-current" />
              {t.hero.viewWork}
            </a>
            <span className="ml-1 font-mono text-[11px] text-muted-foreground">{t.hero.ctaNote}</span>
          </motion.div>

          <motion.div {...reveal(0.8)} className="mt-10 flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 text-foreground/60 transition-colors hover:border-primary/60 hover:text-primary"
              >
                <s.icon size={16} strokeWidth={1.5} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Monitor */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
          className="relative mx-auto w-full max-w-[300px] sm:max-w-[340px] lg:col-span-4 lg:max-w-[min(100%,calc(68svh*9/16))]"
        >
          <div className="relative">
            {/* Quadro de trás, deslocado, para dar profundidade */}
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-md border border-primary/25" aria-hidden />
            <ProgramMonitor />
          </div>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{t.hero.showreel}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
