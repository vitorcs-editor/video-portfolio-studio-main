import { motion } from "framer-motion";
import { Play, Instagram, Linkedin, Mail, ChevronRight, ChevronLeft } from "lucide-react";
import { useLang } from "@/lib/lang";

// CSS keyframes injected once for cheap line-shimmer animations
const lineShimmerStyle = (
  <style>{`
    @keyframes shimmer-right {
      0%   { transform: translateX(-200%); opacity: 0.2; }
      50%  { opacity: 0.8; }
      100% { transform: translateX(300%);  opacity: 0.2; }
    }
    @keyframes shimmer-left {
      0%   { transform: translateX(200%);  opacity: 0.2; }
      50%  { opacity: 0.8; }
      100% { transform: translateX(-300%); opacity: 0.2; }
    }
    @keyframes chevron-bounce {
      0%, 100% { transform: translateY(0); }
      50%      { transform: translateY(4px); }
    }
    .shimmer-r { animation: shimmer-right 4s ease-in-out infinite; }
    .shimmer-l { animation: shimmer-left  4s ease-in-out infinite; }
    .chevron-anim { animation: chevron-bounce 1.5s ease-in-out infinite; }
  `}</style>
);


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
      {/* Divider for Tools — CSS animated, zero JS overhead */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <span className="shimmer-r absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-primary to-transparent drop-shadow-[0_0_12px_hsl(var(--primary))]" />
        <span className="shimmer-l absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-transparent via-primary to-transparent drop-shadow-[0_0_12px_hsl(var(--primary))]" />
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

  // 5 logos reais + 1 slot vazio para manter a estética de marca em crescimento
  const clientLogo = "/fenix-logo.png";
  const placeholdersCount = 1;

  interface MarqueeItem {
    type: 'logo' | 'placeholder';
    src?: string;
    alt?: string;
    link?: string;
    imgClass?: string;
    clientId?: string;
    category?: string;
  }

  const items: MarqueeItem[] = [
    { type: 'logo', src: clientLogo, alt: 'Group Phoenix', link: '#portfolio', clientId: 'fenix_ads', category: 'ads', imgClass: 'max-w-[70%] max-h-[70%]' },
    { type: 'logo', src: '/vera-bet-logo.png', alt: 'Vera Bet', link: '#portfolio', clientId: 'vera_bet', category: 'igaming', imgClass: 'w-[95%] max-h-[70%] -translate-y-3' },
    { type: 'logo', src: '/projeto-draft-logo.png', alt: 'Projeto Draft', link: '#portfolio', clientId: 'projeto_draft', category: 'social', imgClass: 'max-w-[70%] max-h-[70%]' },
    { type: 'logo', src: 'https://www.google.com/s2/favicons?domain=cassino.bet.br&sz=128', alt: 'Cassino.bet.br', link: '#portfolio', clientId: 'cassino_bet', category: 'igaming', imgClass: 'max-w-[45%] max-h-[45%]' },
    { type: 'logo', src: 'https://www.google.com/s2/favicons?domain=1pra1.bet.br&sz=128', alt: '1pra1.bet', link: '#portfolio', clientId: '1pra1_bet', category: 'igaming', imgClass: 'max-w-[45%] max-h-[45%]' },
    ...Array.from({ length: placeholdersCount }).map((): MarqueeItem => ({ type: 'placeholder' }))
  ];

  const scrollItems = [...items, ...items, ...items];

  return (
    <div className="w-full flex flex-col mt-auto relative z-10 pb-4">
      {/* Divider Header */}
      <div className="w-full flex flex-col items-center justify-center relative mb-2">
        {/* Single CSS animation — no double-animation conflict */}
        <div className="chevron-anim mb-3 text-primary opacity-60">▾</div>

        {/* Glowing Horizon Line — CSS animated */}
        <div className="relative w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <span className="shimmer-r absolute left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-primary to-transparent drop-shadow-[0_0_12px_hsl(var(--primary))]" />
          <span className="shimmer-l absolute right-0 w-1/3 h-full bg-gradient-to-l from-transparent via-primary to-transparent drop-shadow-[0_0_12px_hsl(var(--primary))]" />
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
                  target={item.link?.startsWith('#') ? "_self" : "_blank"}
                  rel={item.link?.startsWith('#') ? "" : "noopener noreferrer"}
                  onClick={(e) => {
                    if (item.clientId && item.category) {
                      e.preventDefault();
                      window.dispatchEvent(new CustomEvent('selectClient', { detail: { category: item.category, client: item.clientId } }));
                    }
                  }}
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
      {lineShimmerStyle}
      {/* Local Neon Glows — static opacity, still looks great, no JS loop */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/8 rounded-full blur-[100px] pointer-events-none opacity-60" />
      <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-accent/8 rounded-full blur-[90px] pointer-events-none opacity-50" />

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
                { icon: Mail, href: "mailto:vitorcarvalhods.edicao@gmail.com" },
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

              {/* WhatsApp */}
              <a
                href="https://wa.me/5516994427941"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-primary/50 hover:text-primary hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)] hover:scale-105 transition-all duration-300 backdrop-blur-md"
                title="WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
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
