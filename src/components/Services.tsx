import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/lang";
import SectionHeader from "./common/SectionHeader";
import { stagger, item } from "./common/motion";

const openBudget = () => window.dispatchEvent(new CustomEvent("openBudgetModal"));

// Serviços como uma lista editorial numerada — cada linha abre o orçamento
const Services = () => {
  const { t } = useLang();

  return (
    <section id="servicos" className="relative scroll-mt-16 py-20 sm:py-28">
      <div className="container">
        <SectionHeader track="V2" label={t.services.label} title={t.services.title} accent={t.services.titleAccent} />

        <motion.ol {...stagger()} className="border-t border-line">
          {t.services.items.map((service, i) => (
            <motion.li key={service.title} variants={item} className="border-b border-line">
              <button
                onClick={openBudget}
                aria-label={`${service.title} — ${t.services.cta}`}
                className="group relative grid w-full grid-cols-[auto_1fr_auto] items-start gap-x-5 gap-y-3 overflow-hidden py-8 text-left sm:gap-x-8 sm:py-10 lg:grid-cols-[5rem_minmax(0,1.1fr)_minmax(0,1fr)_auto] lg:items-center"
              >
                {/* Varredura ciano no hover */}
                <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-primary/[0.09] to-transparent transition-transform duration-700 ease-out group-hover:scale-x-100" />

                <span className="relative pt-1 font-mono text-xs text-primary lg:pt-0">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="relative font-display text-[clamp(2rem,4vw,3.5rem)] font-black uppercase leading-[0.9] transition-transform duration-500 group-hover:translate-x-2">
                  {service.title}
                </h3>
                <p className="relative col-span-2 col-start-2 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base lg:col-span-1 lg:col-start-3">
                  {service.desc}
                </p>
                <span className="relative col-start-3 row-start-1 flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 text-foreground/70 transition-all duration-500 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground lg:col-start-4">
                  <ArrowUpRight size={18} />
                </span>
              </button>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
};

export default Services;
