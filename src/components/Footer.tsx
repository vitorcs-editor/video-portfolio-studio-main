import { Instagram, Youtube, Linkedin, Mail, Smartphone } from "lucide-react";
import { useLang } from "@/lib/lang";

const Footer = () => {
  const { t } = useLang();
  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/vitorcs.editor/", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/vitor-carvalho-b26a52361/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:contato@vitorcarvalho.com", label: "Email" },
    { icon: Smartphone, href: "#", label: "WhatsApp" },
  ];

  return (
    <footer className="w-full bg-[#050505] py-12 border-t border-white/5 relative overflow-hidden">
      
      {/* Subtle Glow Background */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[100px] bg-primary/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        
        {/* Left Side: Name and Copyright */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="font-display text-lg sm:text-xl font-bold tracking-wide text-white">
            Vitor <span className="text-primary">Carvalho</span>
          </h2>
          <p className="text-[11px] text-white/40 font-medium mt-1">
            © {new Date().getFullYear()} {t.footer.rights}
          </p>
        </div>

        {/* Right Side: Social Icons */}
        <div className="flex items-center gap-5 sm:gap-6">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-white/40 hover:text-primary transition-colors duration-300 hover:scale-110 transform"
            >
              <social.icon size={20} strokeWidth={1.5} />
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
};

export default Footer;
