import { motion } from "framer-motion";
import { Play, Instagram, Linkedin, Mail } from "lucide-react";
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
    { type: 'logo', src: '/projeto-draft-logo.png', alt: 'Projeto Draft', link: '#portfolio', clientId: 'projeto_draft', category: 'social', imgClass: 'max-w-[70%] max-h-[70%]' },
    { type: 'logo', src: '/icons/1pra1.png', alt: '1pra1.bet', link: '#portfolio', clientId: '1pra1_bet', category: 'igaming', imgClass: 'max-w-[45%] max-h-[45%]' },
    { type: 'logo', src: '/cruzeiro-basquete-logo.png.png', alt: 'Cruzeiro Basquete', link: '#portfolio', clientId: 'cruzeiro_basquete', category: 'social', imgClass: 'max-w-[80%] max-h-[80%] mix-blend-lighten' },
    ...Array.from({ length: placeholdersCount }).map((): MarqueeItem => ({ type: 'placeholder' }))
  ];

  const scrollItems = [...items, ...items, ...items];

  return (
    <div className="w-full mt-auto relative z-10 pb-6">
      {/* Header simples no padrão das seções */}
      <div className="container mx-auto px-6 mb-4 flex items-center gap-3">
        <span className="text-[10px] uppercase tracking-[0.3em] text-primary/55 font-bold">
          {t.hero.clients}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-primary/25 to-transparent" />
      </div>

      {/* Marquee Slider — células bento */}
      <div className="w-full overflow-hidden h-[88px] sm:h-24 flex items-center relative group">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] items-center gap-3 sm:gap-4 px-3">
          {scrollItems.map((item, i) => (
            <div
              key={i}
              className={`flex items-center justify-center w-36 sm:w-48 h-16 sm:h-20 rounded-2xl border transition-all duration-300 flex-shrink-0 group/item
                ${item.type === 'logo'
                  ? "border-primary/15 bg-primary/[0.03] hover:border-primary/40 hover:bg-primary/[0.07] hover:shadow-[0_0_18px_hsl(var(--primary)/0.2)]"
                  : "border-primary/10 bg-primary/[0.01]"}`}
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
                  <div className="absolute -bottom-1 -right-2 opacity-0 group-hover/item:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/item:translate-y-0 z-20">
                    <div className="bg-[#1a1a1a] border border-white/20 rounded-md px-3 py-1 shadow-2xl">
                      <span className="text-white text-[10px] sm:text-[11px] font-medium whitespace-nowrap tracking-wide">
                        {item.alt}
                      </span>
                    </div>
                  </div>
                </a>
              ) : (
                <span className="text-primary/15 text-2xl font-thin select-none">+</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Célula base do bento
const cellBase =
  "relative rounded-2xl border border-primary/15 bg-primary/[0.03] overflow-hidden transition-all duration-300 hover:border-primary/35";

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/vitorcarvalhods/", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/vitor-carvalho-b26a52361/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:vitorcarvalhods.edicao@gmail.com", label: "Email" },
];

const Hero = () => {
  const { t } = useLang();
  const openBudget = () => window.dispatchEvent(new CustomEvent("openBudgetModal"));

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-x-hidden pt-20 sm:pt-24">
      {lineShimmerStyle}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/8 rounded-full blur-[110px] pointer-events-none opacity-50" />
      <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-accent/8 rounded-full blur-[90px] pointer-events-none opacity-40" />

      <div className="container mx-auto px-6 relative z-10 flex-1 flex items-center py-4">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:auto-rows-[150px]"
        >
          {/* Célula NOME — grande */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className={`${cellBase} col-span-2 lg:row-span-2 bg-primary/[0.05] flex flex-col justify-between p-6 sm:p-7`}
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#ff4646] shadow-[0_0_8px_#ff4646] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
                Editor de Vídeo Sênior
              </span>
              <span className="ml-auto text-[10px] font-bold uppercase tracking-[0.12em] text-primary/90 bg-primary/10 border border-primary/25 rounded-full px-2.5 py-1">
                ✦ IA
              </span>
            </div>

            <h1 className="flex-1 flex flex-col justify-center font-impact text-6xl sm:text-8xl lg:text-[6.5rem] tracking-[0.01em] leading-[0.84] text-white py-1">
              <span>Vitor</span>
              <span className="text-primary drop-shadow-[0_0_30px_hsl(var(--primary)/0.45)]">
                Carvalho
              </span>
            </h1>

            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/55 hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                >
                  <s.icon size={15} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Célula VER TRABALHOS */}
          <motion.a
            href="#portfolio"
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className={`${cellBase} col-span-2 group flex flex-col justify-between p-5 hover:bg-primary/[0.06]`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/35 font-bold">Portfólio</span>
              <span className="text-white/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-300">↗</span>
            </div>
            <div className="flex items-center gap-3">
              <Play size={15} className="fill-white text-white group-hover:fill-primary group-hover:text-primary transition-colors duration-300" />
              <span className="font-display text-base sm:text-lg font-bold uppercase tracking-[0.3em] text-white group-hover:text-primary transition-colors duration-300">
                Ver Trabalhos
              </span>
            </div>
            <span className="text-white/35 text-xs">Showreel · melhores cortes em vídeo</span>
          </motion.a>

          {/* Stats */}
          {[
            { value: "150+", label: "Vídeos entregues" },
            { value: "20+", label: "Clientes atendidos" },
          ].map((s) => (
            <motion.div
              key={s.label}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className={`${cellBase} flex flex-col justify-center p-5`}
            >
              <div className="font-display text-3xl sm:text-4xl font-bold text-primary drop-shadow-[0_0_20px_hsl(var(--primary)/0.35)]">
                {s.value}
              </div>
              <span className="text-[10px] uppercase tracking-[0.12em] text-white/40 font-semibold mt-1">
                {s.label}
              </span>
            </motion.div>
          ))}

          {/* Frase */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className={`${cellBase} col-span-2 flex flex-col justify-center gap-3 p-6`}
          >
            <p className="font-display text-xl sm:text-2xl font-bold leading-snug">
              <span className="text-white">Edição que prende. </span>
              <span className="text-primary">Resultado que converte.</span>
            </p>
            <p className="text-white/45 text-sm leading-relaxed">
              Atendo marcas de iGaming, VSL e redes sociais — vídeos com identidade, ritmo e foco em performance.
            </p>
          </motion.div>

          {/* Nichos */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className={`${cellBase} flex flex-col justify-center gap-2 p-5`}
          >
            <span className="text-[10px] uppercase tracking-[0.15em] text-white/35 font-bold">Nichos</span>
            <div className="flex flex-wrap gap-1.5">
              {["iGaming", "VSL", "Ads", "Motion"].map((tag) => (
                <span key={tag} className="text-[10px] font-bold uppercase tracking-wide text-primary/80 bg-primary/[0.08] border border-primary/20 rounded-md px-2 py-0.5">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.button
            onClick={openBudget}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="relative rounded-2xl bg-primary text-background overflow-hidden flex flex-col items-start justify-center gap-1 p-5 text-left transition-all duration-300 hover:brightness-110 hover:scale-[1.02] shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
          >
            <span className="font-display text-lg font-bold leading-tight">Solicitar<br />orçamento</span>
            <span className="text-xs font-bold opacity-70">Resposta em até 24h ↗</span>
          </motion.button>

        </motion.div>
      </div>

      <ClientMarquee />
    </section>
  );
};

export default Hero;
