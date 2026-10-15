import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import { useLang } from "@/lib/lang";
import { whatsappLink } from "@/lib/contact";
import GlobalBackground from "@/components/GlobalBackground";
import BudgetModal from "@/components/BudgetModal";
import { Monogram, LanguageSwitcher } from "@/components/Navbar";
import SplitReveal from "@/components/common/SplitReveal";
import { EASE } from "@/components/common/motion";

const EMAIL = "vitorcarvalhods.edicao@gmail.com";

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/vitorcarvalhods/", label: "Instagram", handle: "@vitorcarvalhods" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/vitor-carvalho-b26a52361/", label: "LinkedIn", handle: "Vitor Carvalho" },
];

// Tela de manutenção: mesmo visual do site, com todos os canais de contato.
// Ativada por MAINTENANCE_MODE em src/config.ts.
const Maintenance = () => {
  const { t } = useLang();
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsBudgetOpen(true);
    window.addEventListener("openBudgetModal", handler);
    return () => window.removeEventListener("openBudgetModal", handler);
  }, []);

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <>
      <Helmet>
        <title>{t.seo.title}</title>
        <meta name="description" content={t.seo.description} />
      </Helmet>

      <div className="relative flex min-h-[100svh] flex-col">
        <GlobalBackground />

        {/* Topo */}
        <header className="relative z-20 flex justify-center px-4 pt-4 sm:pt-5">
          <div className="flex w-full max-w-5xl items-center justify-between rounded-full py-2 pl-5 pr-2">
            <span className="flex items-center gap-2.5 text-foreground">
              <Monogram className="h-6 w-auto" />
              <span className="text-sm font-semibold tracking-tight">Vitor Carvalho</span>
            </span>
            <LanguageSwitcher />
          </div>
        </header>

        {/* Conteúdo */}
        <main className="container relative z-10 flex flex-1 flex-col items-center justify-center py-16 text-center">
          <motion.span {...reveal(0.05)} className="eyebrow">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {t.maintenance.label}
          </motion.span>

          <h1 className="mt-7 max-w-4xl text-balance text-[clamp(2.75rem,7vw,5.5rem)] font-semibold leading-[1] tracking-[-0.05em]">
            <SplitReveal
              trigger="load"
              delay={0.15}
              segments={[{ text: t.maintenance.title }, { text: " " }, { text: t.maintenance.titleAccent, className: "text-gradient" }]}
            />
          </h1>

          <motion.p {...reveal(0.35)} className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.maintenance.description}
          </motion.p>

          {/* Contatos principais */}
          <motion.div {...reveal(0.45)} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-primary px-7 py-4 text-base">
              <MessageCircle size={18} />
              {t.maintenance.whatsapp}
            </a>
            <button onClick={() => setIsBudgetOpen(true)} className="btn-glass px-7 py-4 text-base">
              {t.navbar.requestBudget}
              <ArrowUpRight size={18} />
            </button>
          </motion.div>

          {/* Outros canais */}
          <motion.div {...reveal(0.55)} className="mt-14 w-full max-w-4xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{t.maintenance.social}</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-[1.45fr_1fr_1fr]">
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="glass flex h-full items-center gap-3 rounded-2xl px-4 py-4 text-left transition-colors hover:border-primary/40"
                >
                  <Mail size={18} className="shrink-0 text-primary" />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">{t.maintenance.email}</span>
                    <span className="block truncate text-xs text-muted-foreground">{EMAIL}</span>
                  </span>
                </a>
              </li>
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass flex h-full items-center gap-3 rounded-2xl px-4 py-4 text-left transition-colors hover:border-primary/40"
                  >
                    <s.icon size={18} className="shrink-0 text-primary" />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium">{s.label}</span>
                      <span className="block truncate text-xs text-muted-foreground">{s.handle}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </main>

        <footer className="relative z-10 border-t border-white/5 py-6 text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          © {new Date().getFullYear()} Vitor Carvalho · {t.footer.rights}
        </footer>
      </div>

      <BudgetModal isOpen={isBudgetOpen} onClose={() => setIsBudgetOpen(false)} />
    </>
  );
};

export default Maintenance;
