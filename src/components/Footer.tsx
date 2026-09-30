import { ArrowUp, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import { useLang } from "@/lib/lang";
import { whatsappLink } from "@/lib/contact";
import { Monogram } from "./Navbar";

const Footer = () => {
  const { t } = useLang();
  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/vitorcarvalhods/", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/vitor-carvalho-b26a52361/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:vitorcarvalhods.edicao@gmail.com", label: "Email" },
    { icon: MessageCircle, href: whatsappLink(), label: "WhatsApp" },
  ];

  return (
    <footer className="relative border-t border-line/70">
      <div className="container flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Monogram className="h-7 w-auto text-foreground" />
          <div>
            <p className="text-sm font-semibold text-foreground">Vitor Carvalho</p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{t.footer.tagline}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 text-foreground/60 transition-colors hover:border-primary/60 hover:text-primary"
            >
              <social.icon size={16} strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>

      <div className="container flex items-center justify-between border-t border-line/50 py-6">
        <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          © {new Date().getFullYear()} · {t.footer.rights}
        </p>
        <a
          href="#"
          className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
        >
          {t.navbar.backToTop}
          <ArrowUp size={12} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
