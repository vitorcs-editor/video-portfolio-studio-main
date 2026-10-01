import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { useLang } from "@/lib/lang";
import { whatsappLink } from "@/lib/contact";
import { fadeUp } from "./common/motion";

// Chamada final em um grande painel de vidro com luz ciano
const Contact = () => {
  const { t } = useLang();

  return (
    <section id="contato" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container">
        <motion.div {...fadeUp} className="glass relative overflow-hidden rounded-[36px] px-6 py-20 text-center sm:px-12 sm:py-28">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[900px] max-w-[180%] -translate-x-1/2 -translate-y-1/3"
            style={{ background: "radial-gradient(closest-side, hsl(var(--primary) / 0.35), transparent)" }}
          />
          <span className="eyebrow relative">
            <span className="h-2 w-2 rounded-full bg-live" />
            {t.hero.available}
          </span>
          <h2 className="relative mx-auto mt-7 max-w-3xl text-[clamp(2.75rem,7vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
            {t.contact.title} <span className="text-gradient">{t.contact.titleAccent}</span>
          </h2>
          <p className="relative mx-auto mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.contact.description}
          </p>
          <div className="relative mt-10 flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => window.dispatchEvent(new CustomEvent("openBudgetModal"))} className="btn-primary px-8 py-4 text-base">
              {t.navbar.requestBudget}
              <ArrowUpRight size={18} />
            </button>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-glass px-7 py-4 text-base">
              <MessageCircle size={17} />
              {t.contact.whatsapp}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
