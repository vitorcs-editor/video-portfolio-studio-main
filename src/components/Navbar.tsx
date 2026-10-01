import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Check } from "lucide-react";
import { useLang, type Lang } from "@/lib/lang";
import { useScrollLock, useEscapeKey } from "@/hooks/use-scroll-lock";
import { EASE } from "./common/motion";

const LANGUAGES: { code: Lang; short: string; name: string }[] = [
  { code: "PT-BR", short: "PT", name: "Português (Brasil)" },
  { code: "EN-US", short: "EN", name: "English (US)" },
  { code: "EN-UK", short: "UK", name: "English (UK)" },
  { code: "ES", short: "ES", name: "Español" },
];

// Monograma VC — o V em branco e o C no ciano da marca
export const Monogram = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 120 64" className={className} aria-hidden>
    <path d="M 12 12 L 34 52 L 56 12" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 104 17 A 21 21 0 1 0 104 47" fill="none" stroke="hsl(var(--primary))" strokeWidth="9" strokeLinecap="round" />
  </svg>
);

const LanguageSwitcher = () => {
  const { lang, setLang, t } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  // Fecha ao clicar fora
  useEffect(() => {
    if (!isOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [isOpen]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t.navbar.languages}
        className="flex items-center gap-1.5 rounded-full px-3 py-2 font-mono text-xs text-foreground/70 transition-colors hover:bg-white/5 hover:text-foreground"
      >
        {current.short}
        <ChevronDown size={12} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="glass absolute right-0 top-full mt-3 w-52 overflow-hidden rounded-2xl bg-background/80 p-1.5 shadow-2xl"
          >
            {LANGUAGES.map((l) => (
              <li key={l.code}>
                <button
                  role="option"
                  aria-selected={l.code === lang}
                  onClick={() => {
                    setLang(l.code);
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-foreground/80 transition-colors hover:bg-primary/10 hover:text-foreground"
                >
                  <span className="w-6 font-mono text-[11px] text-primary">{l.short}</span>
                  <span className="flex-1">{l.name}</span>
                  {l.code === lang && <Check size={14} className="text-primary" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = ({ onOpenBudget }: { onOpenBudget?: () => void }) => {
  const { lang, setLang, t } = useLang();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useScrollLock(isMobileMenuOpen);
  useEscapeKey(isMobileMenuOpen, () => setIsMobileMenuOpen(false));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#portfolio", label: t.navbar.projects },
    { href: "#servicos", label: t.navbar.services },
    { href: "#sobre", label: t.navbar.about },
  ];

  const handleMobileNav = (href: string) => {
    setIsMobileMenuOpen(false);
    // Espera a trava de scroll do menu ser liberada antes de rolar
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
        <div
          className={`flex w-full max-w-5xl items-center justify-between gap-4 rounded-full py-2 pl-5 pr-2 transition-[background-color,box-shadow] duration-500 ${
            isScrolled || isMobileMenuOpen
              ? "glass bg-background/60 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]"
              : "border border-transparent"
          }`}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 text-foreground" aria-label={t.navbar.backToTop}>
            <Monogram className="h-6 w-auto" />
            <span className="hidden text-sm font-semibold tracking-tight lg:inline">Vitor Carvalho</span>
          </a>

          {/* Links — desktop */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm text-foreground/70 transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Ações — desktop */}
          <div className="hidden items-center gap-2 md:flex">
            <LanguageSwitcher />
            <button
              onClick={onOpenBudget}
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-primary"
            >
              {t.navbar.requestBudget}
            </button>
          </div>

          {/* Botão do menu — mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground md:hidden"
            aria-label={t.navbar.openMenu}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Menu — mobile, tela cheia. Fica fora do <header> porque o backdrop-blur da barra
          prenderia um elemento "fixed" dentro dela. */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-background/95 px-5 pb-8 pt-28 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col" aria-label="Principal">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.5, ease: EASE }}
                  onClick={() => handleMobileNav(link.href)}
                  className="flex items-baseline gap-4 border-b border-white/10 py-5 text-left"
                >
                  <span className="font-mono text-xs text-primary">0{i + 1}</span>
                  <span className="text-4xl font-semibold tracking-[-0.04em]">{link.label}</span>
                </motion.button>
              ))}
            </nav>

            <div className="mt-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{t.navbar.languages}</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    aria-pressed={l.code === lang}
                    className={`rounded-full border px-4 py-2 font-mono text-xs transition-colors ${
                      l.code === lang
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-foreground/15 text-foreground/70"
                    }`}
                  >
                    {l.short}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBudget?.();
              }}
              className="btn-primary mt-auto w-full py-4"
            >
              {t.navbar.requestBudget}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
