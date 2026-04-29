import { useState, useEffect } from "react";
import { Send, Upload, CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/lib/lang";

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BudgetModal = ({ isOpen, onClose }: BudgetModalProps) => {
  const { t } = useLang();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    briefing: "",
    reference: "",
  });

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const message = encodeURIComponent(
      `*Novo Orçamento - Portfólio*\n\n` +
        `*Nome:* ${formData.name}\n` +
        `*Email:* ${formData.email}\n` +
        `*Tipo de Projeto:* ${formData.service || "Não informado"}\n` +
        `*Descrição:* ${formData.briefing}\n` +
        `*Link de Referência:* ${formData.reference || "Não informado"}`
    );

    // Abre WhatsApp antes do await — evita bloqueio no mobile
    window.open(`https://wa.me/5516994427941?text=${message}`, "_blank");

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({ title: t.budget.toastTitle, description: t.budget.toastDesc });
    setIsSubmitting(false);
    setFormData({ name: "", email: "", service: "", briefing: "", reference: "" });
    onClose();
  };

  const inputClasses =
    "w-full bg-[#1A1A1A] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-300";
  const labelClasses =
    "text-[10px] tracking-[0.15em] uppercase text-white/50 font-semibold ml-1";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-[860px] max-h-[90svh] overflow-y-auto rounded-[2rem]"
          >
            {/* Card */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-6 sm:p-8 shadow-[0_0_80px_hsl(var(--primary)/0.2)] relative overflow-hidden">
              {/* X button — always visible inside card */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-200 border border-white/10"
                aria-label="Fechar"
              >
                <X size={16} strokeWidth={2} />
              </button>

              {/* Inner glow */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 blur-[100px] pointer-events-none" />

              {/* Header */}
              <div className="text-center mb-8">
                <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-white/40">
                  {t.budget.ready}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1 mb-2 drop-shadow-[0_0_40px_hsl(var(--primary)/0.5)] tracking-tight">
                  {t.budget.letsCreate}
                </h2>
                <p className="text-white/50 text-sm">
                  {t.budget.description}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
                {/* Name & Email */}
                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className={labelClasses}>{t.budget.name}</label>
                    <input
                      type="text" required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.budget.namePlaceholder}
                      className={inputClasses}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={labelClasses}>{t.budget.email}</label>
                    <input
                      type="email" required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.budget.emailPlaceholder}
                      className={inputClasses}
                    />
                  </div>
                </div>

                {/* Service */}
                <div className="flex flex-col gap-2">
                  <label className={labelClasses}>{t.budget.whatYouNeed}</label>
                  <div className="relative">
                    <select
                      required
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className={`${inputClasses} appearance-none cursor-pointer`}
                    >
                      <option value="" disabled className="text-white/20">{t.budget.selectService}</option>
                      <option value="VSL" className="bg-[#1a1a1a] text-white">{t.budget.services.vsl}</option>
                      <option value="Vídeo Curto" className="bg-[#1a1a1a] text-white">{t.budget.services.shorts}</option>
                      <option value="Vídeo Longo" className="bg-[#1a1a1a] text-white">{t.budget.services.longform}</option>
                      <option value="Criativos" className="bg-[#1a1a1a] text-white">{t.budget.services.ads}</option>
                      <option value="Outro" className="bg-[#1a1a1a] text-white">{t.budget.services.other}</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/30 text-xs">▼</div>
                  </div>
                </div>

                {/* Briefing */}
                <div className="flex flex-col gap-2">
                  <label className={labelClasses}>{t.budget.briefing}</label>
                  <textarea
                    required rows={3}
                    value={formData.briefing}
                    onChange={(e) => setFormData({ ...formData, briefing: e.target.value })}
                    placeholder={t.budget.briefingPlaceholder}
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                {/* Reference */}
                <div className="flex flex-col gap-2">
                  <label className={labelClasses}>{t.budget.reference}</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.reference}
                      onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                      placeholder={t.budget.referencePlaceholder}
                      className={`${inputClasses} pr-12`}
                    />
                    <Upload size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30" />
                  </div>
                </div>

                {/* Submit */}
                <div className="mt-2 relative group">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl bg-primary text-background font-extrabold text-sm tracking-wide flex items-center justify-center gap-3 hover:bg-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 shadow-[0_0_40px_hsl(var(--primary)/0.3)] group-hover:shadow-[0_0_60px_hsl(var(--primary)/0.5)] relative overflow-hidden"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={18} className="fill-background -rotate-45 mb-1" />
                        {t.budget.requestNow}
                      </>
                    )}
                  </button>
                </div>

                {/* Footer badges */}
                <div className="flex justify-center items-center gap-8">
                  {[t.budget.response24h, t.budget.freeBudget].map((text, i) => (
                    <div key={i} className="flex items-center gap-2 text-white/60">
                      <CheckCircle2 size={14} className="text-primary" />
                      <span className="text-[9px] tracking-[0.2em] font-bold uppercase">{text}</span>
                    </div>
                  ))}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BudgetModal;
