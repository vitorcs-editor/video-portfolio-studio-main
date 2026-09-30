import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { useLang } from "@/lib/lang";
import { whatsappLink } from "@/lib/contact";
import { fadeUp } from "./common/motion";

// Chamada final: o maior texto da página, antes do rodapé
const Contact = () => {
  const { t } = useLang();

  return (
    <section id="contato" className="relative scroll-mt-16 overflow-hidden py-28 sm:py-40">
      {/* Luz ciano atrás do título */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[90vw] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(closest-side, hsl(var(--primary) / 0.14), transparent)" }}
      />

      <motion.div {...fadeUp} className="container relative text-center">
        <span className="label-mono">{t.contact.label}</span>
        <h2 className="mt-6 font-display text-[clamp(4rem,13vw,12rem)] font-black uppercase leading-[0.82] tracking-[-0.02em]">
          {t.contact.title}
          <span className="block font-serif text-[0.62em] font-normal normal-case italic tracking-normal text-primary">
            {t.contact.titleAccent}
          </span>
        </h2>
        <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t.contact.description}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button onClick={() => window.dispatchEvent(new CustomEvent("openBudgetModal"))} className="btn-primary px-8 py-4 text-base">
            {t.navbar.requestBudget}
            <ArrowUpRight size={18} />
          </button>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-ghost px-7 py-4 text-base">
            <MessageCircle size={17} />
            {t.contact.whatsapp}
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
