import { motion } from "framer-motion";
import { Sparkles, Layers, TrendingUp, Megaphone, ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/lang";
import SectionHeader from "./common/SectionHeader";
import { stagger, item } from "./common/motion";

const ICONS = [Sparkles, Layers, TrendingUp, Megaphone];

const openBudget = () => window.dispatchEvent(new CustomEvent("openBudgetModal"));

// Luz que segue o mouse dentro do cartão (posição passada por variáveis CSS)
const trackSpotlight = (e: React.MouseEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
};

const Services = () => {
  const { t } = useLang();

  return (
    <section id="servicos" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container">
        <SectionHeader label={t.services.label} title={t.services.title} accent={t.services.titleAccent} />

        <motion.ul {...stagger()} className="grid gap-4 sm:grid-cols-2">
          {t.services.items.map((service, i) => {
            const Icon = ICONS[i] ?? Sparkles;
            return (
              <motion.li key={service.title} variants={item}>
                <button
                  onClick={openBudget}
                  onMouseMove={trackSpotlight}
                  className="glass group relative flex h-full w-full flex-col overflow-hidden rounded-3xl p-7 text-left transition-colors duration-500 hover:border-primary/40 sm:p-8"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "radial-gradient(420px circle at var(--x) var(--y), hsl(var(--primary) / 0.14), transparent 60%)" }}
                  />
                  <span className="relative flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary shadow-[0_0_30px_-5px_hsl(var(--primary)/0.5)]">
                      <Icon size={20} />
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-foreground/60 transition-all duration-500 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                      <ArrowUpRight size={17} />
                    </span>
                  </span>
                  <h3 className="relative mt-8 text-2xl font-semibold tracking-[-0.03em] sm:text-[1.7rem]">{service.title}</h3>
                  <p className="relative mt-3 text-[15px] leading-relaxed text-muted-foreground">{service.desc}</p>
                  <span className="relative mt-6 text-sm font-medium text-primary/90">{t.services.cta} →</span>
                </button>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
};

export default Services;
