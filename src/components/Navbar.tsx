import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ChevronDown, Search } from "lucide-react";
import { useLang } from "@/lib/lang";

const LanguageSwitcher = ({ inline = false }: { inline?: boolean }) => {
  const { lang: currentLangCode, setLang, t } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const languages = [
    { code: "PT-BR", name: "Portuguese", nativeName: "Português", region: "Brasil" },
    { code: "ES",    name: "Spanish",    nativeName: "Español",   region: "—" },
    { code: "EN-US", name: "English",    nativeName: "English",   region: "United States" },
    { code: "EN-UK", name: "English",    nativeName: "English",   region: "United Kingdom" },
  ];

  const currentLang = languages.find(l => l.code === currentLangCode) || languages[0];

  const filteredLanguages = languages.filter(l =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (code: string) => {
    setLang(code as Parameters<typeof setLang>[0]);
    setIsOpen(false);
    setSearchQuery("");
  };

  // ── INLINE mode (mobile menu) ──────────────────────────────────────────────
  if (inline) {
    return (
      <div className="w-full flex flex-col gap-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold flex items-center gap-2">
          <Globe size={12} /> {t.navbar.languages}
        </span>
        <div className="flex flex-wrap gap-2">
          {languages.map((l) => {
            const isActive = currentLangCode === l.code;
            return (
              <button
                key={l.code}
                onClick={() => handleSelect(l.code)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-black border-primary"
                    : "bg-white/5 text-white/60 border-white/10 hover:border-primary/40 hover:text-white"
                }`}
              >
                <span>{l.nativeName}</span>
                <span className={`text-[10px] ${isActive ? "text-black/60" : "text-white/30"}`}>{l.region}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── DROPDOWN mode (desktop navbar) ─────────────────────────────────────────
  return (
    <div className="relative mx-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#09090b]/80 border border-white/10 hover:bg-white/10 transition-colors"
      >
        <Globe size={16} className="text-white/70" />
        <span className="text-sm font-semibold text-white">{currentLang.nativeName}</span>
        <span className="text-sm text-white/50">{currentLang.region}</span>
        <ChevronDown size={14} className="text-white/50 ml-1" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 w-64 bg-[#09090b] border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden z-50 p-2"
          >
            {/* Search */}
            <div className="flex items-center gap-2 px-3 py-2 bg-transparent border-b border-white/5 mb-2">
              <Search size={14} className="text-white/40" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-white placeholder:text-white/30 w-full"
              />
            </div>

            <div className="px-2 pb-2">
              <span className="text-xs text-white/40 mb-2 block px-1">{t.navbar.languages}</span>
              <div className="flex flex-col gap-1">
                {filteredLanguages.map((l) => {
                  const isActive = currentLangCode === l.code;
                  return (
                    <button
                      key={l.code}
                      onClick={() => handleSelect(l.code)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl w-full text-left transition-colors duration-200 ${
                        isActive
                          ? "bg-primary text-black"
                          : "hover:bg-white/5 cursor-pointer text-white"
                      }`}
                    >
                      <span className={isActive ? "font-bold" : "text-white font-medium"}>{l.name}</span>
                      <span className={isActive ? "text-black/60 font-medium" : "text-white/40"}>{l.region}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const { t } = useLang();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#portfolio", label: t.navbar.portfolio },
    { href: "#orcamento", label: t.navbar.budget },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-white/10 py-4 shadow-lg"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="group flex items-center gap-3">
          <div className="relative">
            <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
              VC
            </span>
            <div className="absolute -inset-2 bg-primary/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}

          <LanguageSwitcher />

          <a
            href="#orcamento"
            className="px-6 py-2.5 rounded-full bg-primary text-black text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:brightness-125 hover:scale-105"
          >
            {t.navbar.requestBudget}
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-foreground"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card mt-2 mx-4 rounded-2xl"
          >
            <nav className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="border-t border-white/10 pt-4 mt-2">
                <LanguageSwitcher inline />
              </div>
              <a
                href="#orcamento"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 px-5 py-3 rounded-full bg-primary text-black text-xs font-bold uppercase tracking-[0.2em] text-center"
              >
                {t.navbar.requestBudget}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
