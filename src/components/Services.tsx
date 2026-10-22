import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/lang";
import SectionHeader from "./common/SectionHeader";
import { stagger, item } from "./common/motion";
import ServiceScene from "./ServiceScene";

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
          {t.services.items.map((service, i) => (
            <motion.li key={service.title} variants={item}>
              <button
                onClick={openBudget}
                onMouseMove={trackSpotlight}
                className="glass group relative flex h-full w-full flex-col overflow-hidden rounded-3xl p-3 text-left transition-colors duration-500 hover:border-primary/40"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(420px circle at var(--x) var(--y), hsl(var(--primary) / 0.12), transparent 60%)" }}
                />
                <ServiceScene index={i} />
                <span className="relative flex flex-1 flex-col px-4 pb-4 pt-6 sm:px-5">
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
                    <span className="truncate font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{service.formats}</span>
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-[1.7rem]">{service.title}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">{service.desc}</p>
                  <span className="mt-6 flex items-center gap-2 text-sm font-medium text-primary/90">
                    {t.services.cta}
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </span>
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Services;
