import { useState } from "react";
import { useScrollLock, useEscapeKey } from "@/hooks/use-scroll-lock";
import { ArrowUpRight, Link2, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/lib/lang";
import { whatsappLink } from "@/lib/contact";
import { EASE } from "./common/motion";

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BudgetModal = ({ isOpen, onClose }: BudgetModalProps) => {
  const { t } = useLang();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    briefing: "",
    reference: "",
  });

  useScrollLock(isOpen);
  useEscapeKey(isOpen, onClose);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message =
      `*Novo Orçamento - Portfólio*\n\n` +
      `*Nome:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      `*Descrição:* ${formData.briefing}\n` +
      `*Link de Referência:* ${formData.reference || "Não informado"}`;

    // Abre o WhatsApp direto no clique — evita bloqueio de pop-up no mobile
    window.open(whatsappLink(message), "_blank");

    toast({ title: t.budget.toastTitle, description: t.budget.toastDesc });
    setFormData({ name: "", email: "", briefing: "", reference: "" });
    onClose();
  };

  const inputClasses =
    "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-[15px] text-foreground placeholder:text-muted-foreground/60 transition-colors duration-300 focus:border-primary/70 focus:outline-none focus:ring-1 focus:ring-primary/40";

  const field = (id: keyof typeof formData) => ({
    id: `budget-${id}`,
    value: formData[id],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData({ ...formData, [id]: e.target.value }),
    className: inputClasses,
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="budget-title">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="glass relative max-h-[92svh] w-full max-w-[600px] overflow-y-auto rounded-[28px] bg-background/80 shadow-[0_40px_120px_-30px_hsl(var(--primary)/0.45)]"
          >
            {/* Barra superior */}
            <div className="flex items-center justify-between px-6 pt-5 sm:px-8">
              <span className="eyebrow">
                <span className="h-2 w-2 rounded-full bg-live" />
                {t.budget.ready}
              </span>
              <button
                onClick={onClose}
                className="-mr-2 flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-foreground/10 hover:text-foreground"
                aria-label={t.common.close}
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-6 pb-7 pt-6 sm:px-8 sm:pb-8">
              <h2 id="budget-title" className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                {t.budget.letsCreate}
              </h2>
              <p className="mt-3 text-muted-foreground">{t.budget.description}</p>

              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="budget-name" className="text-sm font-medium text-foreground/80">{t.budget.name}</label>
                    <input type="text" required autoComplete="name" placeholder={t.budget.namePlaceholder} {...field("name")} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="budget-email" className="text-sm font-medium text-foreground/80">{t.budget.email}</label>
                    <input type="email" required autoComplete="email" placeholder={t.budget.emailPlaceholder} {...field("email")} />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="budget-briefing" className="text-sm font-medium text-foreground/80">{t.budget.briefing}</label>
                  <textarea required rows={4} placeholder={t.budget.briefingPlaceholder} {...field("briefing")} className={`${inputClasses} resize-none`} />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="budget-reference" className="text-sm font-medium text-foreground/80">{t.budget.reference}</label>
                  <div className="relative">
                    <input type="text" placeholder={t.budget.referencePlaceholder} {...field("reference")} className={`${inputClasses} pr-12`} />
                    <Link2 size={17} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>

                <button type="submit" className="btn-primary mt-2 w-full py-4 text-base">
                  {t.budget.requestNow}
                  <ArrowUpRight size={18} />
                </button>

                <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                  {[t.budget.response24h, t.budget.freeBudget].map((text) => (
                    <li key={text} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Check size={12} className="text-primary" />
                      {text}
                    </li>
                  ))}
                </ul>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BudgetModal;
