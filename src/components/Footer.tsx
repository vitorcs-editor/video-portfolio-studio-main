import { Instagram, Linkedin, Mail, Smartphone } from "lucide-react";
import { useLang } from "@/lib/lang";
import { whatsappLink } from "@/lib/contact";

const Footer = () => {
  const { t } = useLang();
  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/vitorcarvalhods/", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/vitor-carvalho-b26a52361/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:vitorcarvalhods.edicao@gmail.com", label: "Email" },
    { icon: Smartphone, href: whatsappLink(), label: "WhatsApp" },
  ];

  return (
    <footer className="w-full py-14 border-t border-primary/10 relative overflow-hidden">
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[320px] h-[120px] bg-primary/10 blur-[110px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col gap-8">

        {/* Topo: nome + CTA */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
          <div>
            <h2 className="font-impact text-4xl sm:text-5xl tracking-wide leading-none">
              <span className="text-white">Vitor </span>
              <span className="text-primary drop-shadow-[0_0_20px_hsl(var(--primary)/0.4)]">Carvalho</span>
            </h2>
            <p className="text-white/40 text-xs sm:text-sm font-medium mt-2 uppercase tracking-[0.15em]">
              Editor de Vídeo Sênior · iGaming · VSL · Social
            </p>
          </div>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent("openBudgetModal"))}
            className="self-start md:self-auto flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-background font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all duration-300 hover:scale-105 shadow-[0_0_25px_hsl(var(--primary)/0.3)]"
          >
            Solicitar Orçamento ↗
          </button>
        </div>

        {/* Base: copyright + redes em células */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-5">
          <p className="text-[11px] text-white/35 font-medium order-2 sm:order-1">
            © {new Date().getFullYear()} {t.footer.rights}
          </p>
          <div className="flex items-center gap-2.5 order-1 sm:order-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 rounded-xl border border-primary/15 bg-primary/[0.03] flex items-center justify-center text-white/55 hover:text-primary hover:border-primary/40 hover:bg-primary/[0.07] transition-all duration-300"
              >
                <social.icon size={17} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
