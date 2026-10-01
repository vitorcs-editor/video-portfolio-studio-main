import { motion } from "framer-motion";
import { Target, Zap, ShieldCheck, TrendingUp } from "lucide-react";
import { useLang } from "@/lib/lang";
import SectionHeader from "./common/SectionHeader";
import { fadeUp, stagger, item } from "./common/motion";

const FEATURE_ICONS = [Target, Zap, ShieldCheck, TrendingUp];

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

            <motion.ul {...stagger()} className="mt-10 grid gap-3 sm:grid-cols-2">
              {t.about.features.map((f, i) => {
                const Icon = FEATURE_ICONS[i] ?? Target;
                return (
                  <motion.li key={f.title} variants={item} className="glass flex gap-4 rounded-2xl p-5">
                    <Icon size={18} className="mt-0.5 shrink-0 text-primary" />
                    <span>
                      <span className="block font-medium">{f.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{f.desc}</span>
                    </span>
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
