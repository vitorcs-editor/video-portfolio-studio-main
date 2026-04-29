import { motion } from "framer-motion";
import { Play, Instagram, Linkedin, Mail, Smartphone, ChevronRight, ChevronLeft } from "lucide-react";

import { useLang } from "@/lib/lang";

// Tech Chips for the new layout
const TechChips = () => {
  const { t } = useLang();
  const tools = [
    { name: "Pr", label: "Premiere Pro", delay: 0, icon: "https://skillicons.dev/icons?i=pr" },
    { name: "Ae", label: "After Effects", delay: 0.1, icon: "https://skillicons.dev/icons?i=ae" },
    { name: "Ps", label: "Photoshop", delay: 0.2, icon: "https://skillicons.dev/icons?i=ps" },
  ];
  const ais = [
    { name: "Rw", label: "Runway", delay: 0.4, icon: "https://www.google.com/s2/favicons?domain=runwayml.com&sz=128" },
    { name: "Kl", label: "Kling", delay: 0.5, icon: "https://www.google.com/s2/favicons?domain=klingai.com&sz=128" },
    { name: "Mx", label: "Minimax", delay: 0.6, icon: "https://www.google.com/s2/favicons?domain=minimaxi.com&sz=128" },
    { name: "Df", label: "Dreamface", delay: 0.7, icon: "https://www.google.com/s2/favicons?domain=dreamfaceapp.com&sz=128" },
  ];

  return (
    <div className="flex flex-col xl:flex-row gap-5 sm:gap-8 lg:gap-12 mt-6 sm:mt-8 pt-6 relative w-full overflow-hidden">
      {/* Divider for Tools - Absolute to Section but centered */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        {/* Left Bar */}
        <motion.div 
          animate={{ x: ["-200%", "300%"], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-primary to-transparent drop-shadow-[0_0_12px_hsl(var(--primary))]"
        />
        {/* Right Bar */}
        <motion.div 
          animate={{ x: ["200%", "-300%"], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-transparent via-primary to-transparent drop-shadow-[0_0_12px_hsl(var(--primary))]"
        />
      </div>

      {/* Ferramentas Tradicionais */}
      <div className="flex-1">
        <h3 className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/40 font-semibold mb-4 sm:mb-6">{t.hero.tools}</h3>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {tools.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + t.delay }}
              className="group relative flex items-center gap-3 bg-white/5 border border-white/10 rounded-full pr-5 p-1 backdrop-blur-md cursor-pointer hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:bg-white/10 shadow-sm hover:shadow-[0_0_15px_hsl(var(--primary)/0.2)]"
            >
              <div className="w-10 h-10 rounded-full bg-black/40 border border-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_15px_hsl(var(--primary)/0.5)] transition-all duration-300">
                <img src={t.icon} alt={t.label} className="w-5 h-5 object-contain" />
              </div>
              <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                {t.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Integração de Inteligência Artificial */}
      <div className="flex-1">
        <h3 className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/40 font-semibold mb-4 sm:mb-6">{t.hero.ai}</h3>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {ais.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + t.delay }}
              className="group relative flex items-center gap-3 bg-white/5 border border-white/10 rounded-full pr-5 p-1 backdrop-blur-md cursor-pointer hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:bg-white/10 shadow-sm hover:shadow-[0_0_15px_hsl(var(--primary)/0.2)]"
            >
              <div className="w-10 h-10 rounded-full bg-black/40 border border-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_15px_hsl(var(--primary)/0.5)] transition-all duration-300">
                <img src={t.icon} alt={t.label} className="w-5 h-5 object-contain rounded-full" />
              </div>
              <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                {t.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};


// Client Marquee - Exibindo múltiplos quadros conforme preferência do usuário
const ClientMarquee = () => {
  const { t } = useLang();

  // 3 logos reais + 3 slots vazios (total 6) para manter a estética de marca em crescimento
  const clientLogo = "/fenix-logo.png";
  const placeholdersCount = 3;
  
  interface MarqueeItem {
    type: 'logo' | 'placeholder';
    src?: string;
    alt?: string;
    link?: string;
    imgClass?: string;
  }

  const items: MarqueeItem[] = [
    { type: 'logo', src: clientLogo, alt: 'Group Phoenix', link: 'https://groupphoenixmediabuyer.com/', imgClass: 'max-w-[70%] max-h-[70%]' },
    { type: 'logo', src: '/vera-bet-logo.png', alt: 'Vera Bet', link: 'https://vera.bet.br/', imgClass: 'w-[95%] max-h-[70%] -translate-y-3' },
    { type: 'logo', src: '/projeto-draft-logo.png', alt: 'Projeto Draft', link: 'https://www.projetodraft.com/', imgClass: 'max-w-[70%] max-h-[70%]' },
    ...Array.from({ length: placeholdersCount }).map((): MarqueeItem => ({ type: 'placeholder' }))
  ];
  
  const scrollItems = [...items, ...items, ...items];

  return (
    <div className="w-full flex flex-col mt-auto relative z-10 pb-4">
      {/* Divider Header */}
      <div className="w-full flex flex-col items-center justify-center relative mb-2">
        <div className="animate-bounce mb-3">
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-primary opacity-60"
          >
            ▾
          </motion.div>
        </div>

        {/* Glowing Horizon Line */}
        <div className="relative w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <motion.div
            animate={{ x: ["-200%", "300%"], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-primary to-transparent drop-shadow-[0_0_12px_hsl(var(--primary))]"
          />
          <motion.div
            animate={{ x: ["200%", "-300%"], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-0 w-1/3 h-full bg-gradient-to-l from-transparent via-primary to-transparent drop-shadow-[0_0_12px_hsl(var(--primary))]"
          />
        </div>

        {/* CLIENTES Badge - Rotating Border Style */}
        <div className="relative p-[1px] rounded-xl overflow-hidden mt-3 z-10 w-fit group">
          {/* Rotating Beam Animation */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_0deg,hsl(var(--primary))_90deg,transparent_180deg)] opacity-40"
          />
          
          {/* Badge Content */}
          <div className="relative bg-[#0a0a0a] px-8 py-2.5 rounded-xl flex items-center justify-center z-10 w-full h-full border border-white/5 group-hover:bg-[#111111] transition-colors">
            <span className="text-primary text-[11px] font-black uppercase tracking-[0.4em] drop-shadow-[0_0_8px_hsl(var(--primary)/0.4)]">
              {t.hero.clients}
            </span>
          </div>
        </div>
      </div>

      {/* Marquee Slider */}
      <div className="w-full overflow-hidden h-28 sm:h-36 flex items-center relative group mt-2">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] items-center gap-3 sm:gap-6 px-3">
          {scrollItems.map((item, i) => (
            <div
              key={i}
              className={`flex items-center justify-center w-36 sm:w-56 h-20 sm:h-28 rounded-2xl border border-dashed transition-all duration-500 flex-shrink-0 group/item
                ${item.type === 'logo' 
                  ? "border-primary/20 bg-primary/[0.01] hover:border-solid hover:border-primary hover:bg-white/[0.05] hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)]" 
                  : "border-primary/20 bg-primary/[0.01]"}`}
            >
              {item.type === 'logo' ? (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full h-full flex items-center justify-center cursor-pointer relative"
                >
                  <img 
                    src={item.src} 
                    alt={item.alt} 
                    className={`${item.imgClass ?? 'max-w-[70%] max-h-[70%]'} object-contain transition-all duration-300 group-hover/item:scale-105`} 
                  />
                  
                  {/* Tooltip estilo "Projeto Draft" do print */}
                  <div className="absolute -bottom-1 -right-2 opacity-0 group-hover/item:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/item:translate-y-0 z-20">
                    <div className="bg-[#1a1a1a] border border-white px-3 py-1 shadow-2xl">
                      <span className="text-white text-[10px] sm:text-[11px] font-medium whitespace-nowrap tracking-wide">
                        {item.alt}
                      </span>
                    </div>
                  </div>
                </a>
              ) : (
                <span className="text-primary/10 text-2xl font-thin select-none">+</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  const { t } = useLang();
  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-x-hidden pt-20 sm:pt-24">
      {/* Local Neon Glows (Keep these for hero impact) */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none animate-glow-pulse" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none animate-glow-pulse [animation-delay:2s]" />

      {/* Main Content Container */}
      <div className="container mx-auto px-6 relative z-10 flex-1 flex flex-col justify-center pb-8 w-full gap-4">
        <div className="w-full flex flex-col justify-center gap-4">
          
          {/* Typography - Vitor Carvalho - Sleek Minimalist Scale */}
          <div className="flex flex-col sm:flex-row items-start sm:items-baseline relative z-10 pt-4 lg:pt-0 pb-2 gap-0 sm:gap-6 lg:gap-8">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-display text-[2.2rem] xs:text-[2.6rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[5.8rem] font-extrabold text-white leading-none tracking-tighter uppercase drop-shadow-md"
            >
              Vitor
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="relative z-20"
            >
              <span className="font-display text-[2.2rem] xs:text-[2.6rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[5.8rem] font-extrabold text-primary leading-none tracking-tighter uppercase drop-shadow-[0_0_20px_hsl(var(--primary)/0.4)] block">
                Carvalho
              </span>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg sm:text-xl text-white/60 max-w-2xl font-light leading-relaxed"
          >
            {t.hero.description}
          </motion.p>

          {/* Actions & Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-start sm:items-stretch gap-4 sm:gap-6 mt-4 sm:mt-6"
          >
            <a
              href="#portfolio"
              className="group flex items-center justify-center gap-3 px-7 py-4 sm:py-5 rounded-full bg-primary text-black font-bold text-base sm:text-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-[0_0_20px_hsl(var(--primary)/0.3)] w-full sm:w-auto"
            >
              <Play size={20} className="fill-black group-hover:scale-110 transition-transform" />
              {t.hero.viewPortfolio}
            </a>

            <div className="flex gap-3 items-center">
              {[
                { icon: Instagram, href: "https://www.instagram.com/vitorcs.editor/" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/vitor-carvalho-b26a52361/" },
                { icon: Mail, href: "#" },
                { icon: Smartphone, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-primary/50 hover:text-primary hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)] hover:scale-105 transition-all duration-300 backdrop-blur-md"
                  title="Link social"
                >
                  <social.icon size={24} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Tech Chips */}
          <TechChips />

        </div>
      </div>

      <ClientMarquee />
    </section>
  );
};

export default Hero;
