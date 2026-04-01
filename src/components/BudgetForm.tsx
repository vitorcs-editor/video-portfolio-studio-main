import { useState } from "react";
import { Send, Upload, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/lib/lang";

const BudgetForm = () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Create WhatsApp message
    const message = encodeURIComponent(
      `*Novo Orçamento Elite*\n\n` +
        `*Nome:* ${formData.name}\n` +
        `*Email:* ${formData.email}\n` +
        `*Serviço:* ${formData.service || "Não informado"}\n` +
        `*Briefing:* ${formData.briefing}\n` +
        `*Referências:* ${formData.reference || "Não informado"}`
    );

    window.open(`https://wa.me/5500000000000?text=${message}`, "_blank");

    toast({ title: t.budget.toastTitle, description: t.budget.toastDesc });

    setIsSubmitting(false);
    setFormData({ name: "", email: "", service: "", briefing: "", reference: "" });
  };

  const inputContainerClasses = "flex flex-col gap-2";
  const labelClasses = "text-[10px] tracking-[0.15em] uppercase text-white/50 font-semibold ml-1";
  const inputClasses = "w-full bg-[#1A1A1A] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-300";

  return (
    <section id="orcamento" className="py-20 sm:py-32 relative bg-background">
      <div className="container mx-auto px-6">

        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center mb-8 sm:mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-white/40 mb-3">
            {t.budget.ready}
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 drop-shadow-[0_0_40px_hsl(var(--primary)/0.5)] tracking-tight">
            {t.budget.letsCreate}
          </h2>
          <p className="text-white/50 text-sm sm:text-base max-w-md">
            {t.budget.description}
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-[800px] mx-auto bg-[#0a0a0a] border border-white/5 rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-12 shadow-[0_0_80px_hsl(var(--primary)/0.15)] relative overflow-hidden group">
          
          {/* Subtle Form Inner Glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 blur-[100px] pointer-events-none group-hover:bg-primary/10 transition-colors duration-700" />
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8 relative z-10">
            
            {/* 2 Columns: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className={inputContainerClasses}>
                <label className={labelClasses}>{t.budget.name}</label>
                <input
                  type="text" required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.budget.namePlaceholder}
                  className={inputClasses}
                />
              </div>
              <div className={inputContainerClasses}>
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

            {/* Service Selection */}
            <div className={inputContainerClasses}>
              <label className={labelClasses}>{t.budget.whatYouNeed}</label>
              <div className="relative">
                <select required title={t.budget.whatYouNeed}
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
                {/* Custom select arrow */}
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/30 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Briefing */}
            <div className={inputContainerClasses}>
              <label className={labelClasses}>{t.budget.briefing}</label>
              <textarea required rows={4}
                value={formData.briefing}
                onChange={(e) => setFormData({ ...formData, briefing: e.target.value })}
                placeholder={t.budget.briefingPlaceholder}
                className={`${inputClasses} resize-none`}
              />
            </div>

            {/* Reference */}
            <div className={inputContainerClasses}>
              <label className={labelClasses}>{t.budget.reference}</label>
              <div className="relative">
                <input type="text"
                  value={formData.reference}
                  onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                  placeholder={t.budget.referencePlaceholder}
                  className={`${inputClasses} pr-12`}
                />
                <Upload size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30" />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-4 relative group">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 rounded-2xl bg-primary text-background font-extrabold text-sm sm:text-base tracking-wide flex items-center justify-center gap-3 hover:bg-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 shadow-[0_0_40px_hsl(var(--primary)/0.3)] group-hover:shadow-[0_0_60px_hsl(var(--primary)/0.5)] relative overflow-hidden"
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

            {/* Footer Features */}
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 mt-4">
              {[
                t.budget.response24h,
                t.budget.freeBudget
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2 text-white/60">
                  <CheckCircle2 size={14} className="text-primary" />
                  <span className="text-[9px] sm:text-[10px] tracking-[0.2em] font-bold uppercase">
                    {text}
                  </span>
                </div>
              ))}
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

export default BudgetForm;
