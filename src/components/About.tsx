import { motion } from "framer-motion";
import { useLang } from "@/lib/lang";
import SectionHeader from "./common/SectionHeader";
import { fadeUp, stagger, item } from "./common/motion";

const About = () => {
  const { t } = useLang();

  return (
    <section id="sobre" className="relative scroll-mt-24 overflow-x-clip py-20 sm:py-28">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Foto */}
          <motion.figure {...fadeUp} className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[40px] opacity-70 blur-3xl"
              style={{ background: "radial-gradient(closest-side, hsl(var(--primary) / 0.3), transparent)" }}
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/10">
              <img src="/vitor-hero.webp" alt={t.about.photoAlt} loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent via-40% to-background/80" />
              <figcaption className="glass absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl px-5 py-4">
                <span>
                  <span className="block font-semibold">Vitor Carvalho</span>
                  <span className="text-xs text-muted-foreground">{t.hero.role}</span>
                </span>
                <span className="h-2.5 w-2.5 rounded-full bg-live shadow-[0_0_0_4px_hsl(var(--live)/0.15)]" />
              </figcaption>
            </div>
          </motion.figure>

          {/* Texto */}
          <div className="lg:col-span-7">
            <SectionHeader label={t.about.label} title={t.about.title} accent={t.about.titleAccent} />
            <motion.p {...fadeUp} className="-mt-4 text-lg leading-relaxed text-foreground/80">
              {t.about.bio}
            </motion.p>

            {/* Como eu trabalho: etapas numa linha do tempo, como clipes numa trilha */}
            <motion.div {...fadeUp} className="mt-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{t.about.processLabel}</p>
              <motion.ol {...stagger(0.1, 0.12)} className="relative mt-6">
                <span aria-hidden className="absolute bottom-3 left-[15px] top-3 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent" />
                {t.about.process.map((step, i) => (
                  <motion.li key={step.title} variants={item} className="relative flex gap-5 pb-7 last:pb-0">
                    <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/50 bg-background font-mono text-[11px] text-primary shadow-[0_0_20px_-4px_hsl(var(--primary)/0.7)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="pt-1">
                      <span className="block font-medium">{step.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{step.desc}</span>
                    </span>
                  </motion.li>
                ))}
              </motion.ol>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
