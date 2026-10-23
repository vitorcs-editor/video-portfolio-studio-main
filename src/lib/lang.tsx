import React, { createContext, useContext, useEffect, useState } from 'react';
import type { VideoCategory } from '@/data/portfolio';

export type Lang = 'PT-BR' | 'EN-US' | 'EN-UK' | 'ES';

// Valor do atributo <html lang> para cada idioma
const HTML_LANG: Record<Lang, string> = {
  'PT-BR': 'pt-BR',
  'EN-US': 'en-US',
  'EN-UK': 'en-GB',
  'ES': 'es',
};

type Item = { title: string; desc: string };
type Service = { title: string; desc: string; formats: string };

interface T {
  navbar: { projects: string; services: string; about: string; requestBudget: string; languages: string; backToTop: string; openMenu: string; };
  hero: {
    role: string; available: string; viewWork: string; highlights: string; prev: string; next: string;
    headline: string; headlineAccent: string; pitch: string; ctaNote: string; clients: string;
    stack: { label: string; title: string; categories: { ia: string; edicao: string; motion: string; analise: string; design: string; }; };
    stats: { label: string; items: { value: string; label: string; }[]; };
  };
  portfolio: {
    label: string; title: string; titleAccent: string; description: string;
    allClients: string; yourBrand: string; empty: string;
    categories: Record<VideoCategory, string>;
  };
  services: { label: string; title: string; titleAccent: string; cta: string; items: Service[]; };
  about: { label: string; title: string; titleAccent: string; photoAlt: string; bio: string; clientsLabel: string; processLabel: string; process: Item[]; };
  budget: {
    ready: string; letsCreate: string; description: string;
    name: string; namePlaceholder: string; email: string; emailPlaceholder: string;
    briefing: string; briefingPlaceholder: string; reference: string; referencePlaceholder: string;
    requestNow: string; toastTitle: string; toastDesc: string; response24h: string; freeBudget: string;
  };
  contact: { label: string; title: string; titleAccent: string; description: string; whatsapp: string; };
  footer: { tagline: string; rights: string; };
  common: { close: string; openHd: string; };
  intro: { skip: string; loading: string; };
  notFound: { message: string; back: string; };
  maintenance: { label: string; title: string; titleAccent: string; description: string; whatsapp: string; email: string; social: string; };
  seo: { title: string; description: string; keywords: string; };
}

const PT_BR: T = {
  navbar: {
    projects: "Projetos",
    services: "Serviços",
    about: "Sobre",
    requestBudget: "Solicitar Orçamento",
    languages: "Idiomas",
    backToTop: "Voltar ao início",
    openMenu: "Abrir menu",
  },
  hero: {
    role: "Editor de Vídeo Sênior",
    available: "Disponível para novos projetos",
    viewWork: "Ver Trabalhos",
    highlights: "Destaques",
    prev: "Anterior",
    next: "Próximo",
    headline: "Do material bruto ",
    headlineAccent: "ao vídeo que vende.",
    pitch: "Sou o Vitor, editor de vídeo há mais de 4 anos. Edito ads, reels e VSLs para marcas como 1pra1.bet, Group Phoenix e Cruzeiro Basquete.",
    ctaNote: "Resposta em até 24h",
    clients: "Clientes",
    stack: {
      label: "Ferramentas & IA",
      title: "Stack de produção.",
      categories: { ia: "IA", edicao: "Edição", motion: "Motion", analise: "Análise", design: "Design" },
    },
    stats: {
      label: "Números",
      items: [
        { value: "10M+", label: "Views geradas" },
        { value: "4+", label: "Anos de experiência" },
        { value: "50+", label: "Projetos entregues" },
        { value: "20+", label: "Clientes atendidos" },
      ],
    },
  },
  portfolio: {
    label: "Portfólio",
    title: "O que já passou ",
    titleAccent: "pela minha timeline.",
    description: "Ads, reels, VSLs e motion feitos para clientes reais. Toque em qualquer vídeo para assistir.",
    allClients: "Todos",
    yourBrand: "Pode ser você",
    empty: "Nenhum projeto nesta categoria",
    categories: { igaming: "iGaming", vsl: "VSL", motion: "Motion & IA", ads: "Ads & Performance", social: "Social Media" },
  },
  services: {
    label: "Serviços",
    title: "O que eu ",
    titleAccent: "edito.",
    cta: "Pedir orçamento",
    items: [
      { title: "Ads para tráfego pago", desc: "Criativos com gancho nos primeiros segundos, feitos para rodar em anúncio e parecer conteúdo. Entrego em várias versões e formatos para você testar.", formats: "Meta · TikTok · YouTube" },
      { title: "Reels e social media", desc: "Cortes verticais com ritmo, legenda dinâmica e o tom da marca — do clube de basquete à casa de apostas.", formats: "Reels · TikTok · Shorts" },
      { title: "VSL", desc: "Vídeos de venda editados para segurar a atenção até a oferta: corte no ritmo do roteiro, b-roll, legenda e trilha.", formats: "Página de vendas · Lançamento" },
      { title: "Motion e IA", desc: "Vinhetas, animações e cenas geradas com IA para dar acabamento de produtora ao vídeo.", formats: "After Effects · Higgsfield · ElevenLabs" },
    ],
  },
  about: {
    label: "Sobre",
    title: "Prazer, ",
    titleAccent: "sou o Vitor.",
    photoAlt: "Vitor Carvalho, editor de vídeo",
    bio: "Há mais de 4 anos eu vivo de edição de vídeo. Nesse tempo foram mais de 50 projetos para mais de 20 marcas, de casa de apostas a clube de basquete. Penso cada corte pelo que o vídeo precisa fazer: parar o scroll, prender até o fim ou vender.",
    clientsLabel: "Marcas com quem trabalho",
    processLabel: "Como eu trabalho",
    process: [
      { title: "Briefing", desc: "Você me conta o objetivo e manda o material bruto e as referências." },
      { title: "Primeiro corte", desc: "Eu monto a primeira versão completa: ritmo, legendas, trilha e cor." },
      { title: "Ajustes", desc: "Você comenta e eu ajusto até o vídeo ficar do jeito certo." },
      { title: "Entrega", desc: "Arquivo final no formato de cada plataforma, pronto para subir." },
    ],
  },
  budget: {
    ready: "Pronto para começar?",
    letsCreate: "Me conta do seu vídeo",
    description: "Respondo em até 24h com um orçamento.",
    name: "Nome",
    namePlaceholder: "Seu nome",
    email: "E-mail",
    emailPlaceholder: "seu@email.com",
    briefing: "Briefing rápido",
    briefingPlaceholder: "Conte um pouco sobre o objetivo do seu vídeo...",
    reference: "Referência visual (opcional)",
    referencePlaceholder: "Cole um link do YouTube ou Drive...",
    requestNow: "Solicitar agora",
    toastTitle: "Próxima Etapa Iniciada!",
    toastDesc: "Você será direcionado ao WhatsApp para continuar.",
    response24h: "Resposta em 24h",
    freeBudget: "Orçamento gratuito",
  },
  contact: {
    label: "Contato",
    title: "Tem um vídeo ",
    titleAccent: "pra editar?",
    description: "Me manda o briefing ou o material bruto. Respondo em até 24h com um orçamento.",
    whatsapp: "Ou chame no WhatsApp",
  },
  footer: {
    tagline: "Editor de vídeo · Ads · Reels · VSL · Motion",
    rights: "Todos os direitos reservados.",
  },
  common: { close: "Fechar", openHd: "Abrir no Google Drive em alta qualidade" },
  intro: { skip: "Pular", loading: "Carregando" },
  notFound: { message: "Página não encontrada", back: "Voltar para o início" },
  maintenance: {
    label: "Voltamos em breve",
    title: "Site em",
    titleAccent: "manutenção.",
    description: "Para orçamentos e contato, fale comigo direto:",
    whatsapp: "Chamar no WhatsApp",
    email: "Enviar e-mail",
    social: "Também estou por aqui",
  },
  seo: {
    title: "Vitor Carvalho | Editor de Vídeo Profissional",
    description: "Editor de vídeo profissional especializado em VSLs, Ads, vídeos curtos e conteúdo para redes sociais. Transformando ideias em histórias visuais impactantes.",
    keywords: "editor de vídeo, edição de vídeo, VSL, video sales letter, ads, anúncios, reels, tiktok, youtube, premiere, after effects",
  },
};

const EN_US: T = {
  navbar: {
    projects: "Projects",
    services: "Services",
    about: "About",
    requestBudget: "Request a Quote",
    languages: "Languages",
    backToTop: "Back to top",
    openMenu: "Open menu",
  },
  hero: {
    role: "Senior Video Editor",
    available: "Available for new projects",
    viewWork: "View Work",
    highlights: "Highlights",
    prev: "Previous",
    next: "Next",
    headline: "From raw footage ",
    headlineAccent: "to videos that sell.",
    pitch: "I'm Vitor, a video editor for over 4 years. I edit ads, reels and VSLs for brands like 1pra1.bet, Group Phoenix and Cruzeiro Basquete.",
    ctaNote: "Reply within 24h",
    clients: "Clients",
    stack: {
      label: "Tools & AI",
      title: "Production stack.",
      categories: { ia: "AI", edicao: "Editing", motion: "Motion", analise: "Analytics", design: "Design" },
    },
    stats: {
      label: "Numbers",
      items: [
        { value: "10M+", label: "Views generated" },
        { value: "4+", label: "Years of experience" },
        { value: "50+", label: "Projects delivered" },
        { value: "20+", label: "Clients served" },
      ],
    },
  },
  portfolio: {
    label: "Portfolio",
    title: "What's been through ",
    titleAccent: "my timeline.",
    description: "Ads, reels, VSLs and motion made for real clients. Tap any video to watch it.",
    allClients: "All",
    yourBrand: "This could be you",
    empty: "No projects in this category",
    categories: { igaming: "iGaming", vsl: "VSL", motion: "Motion & AI", ads: "Ads & Performance", social: "Social Media" },
  },
  services: {
    label: "Services",
    title: "What I ",
    titleAccent: "edit.",
    cta: "Get a quote",
    items: [
      { title: "Paid traffic ads", desc: "Creatives with a hook in the first seconds, built to run as ads and feel like content. Delivered in multiple versions and formats so you can test.", formats: "Meta · TikTok · YouTube" },
      { title: "Reels and social media", desc: "Vertical cuts with rhythm, dynamic captions and the brand's voice — from a basketball club to a betting brand.", formats: "Reels · TikTok · Shorts" },
      { title: "VSL", desc: "Sales videos edited to hold attention until the offer: cuts paced to the script, b-roll, captions and music.", formats: "Sales page · Launch" },
      { title: "Motion and AI", desc: "Intros, animations and AI-generated scenes that give the video a studio finish.", formats: "After Effects · Higgsfield · ElevenLabs" },
    ],
  },
  about: {
    label: "About",
    title: "Nice to meet you, ",
    titleAccent: "I'm Vitor.",
    photoAlt: "Vitor Carvalho, video editor",
    bio: "I've been making a living from video editing for over 4 years. In that time I've done 50+ projects for 20+ brands, from betting companies to a basketball club. I think about every cut in terms of what the video needs to do: stop the scroll, hold attention to the end, or sell.",
    clientsLabel: "Brands I work with",
    processLabel: "How I work",
    process: [
      { title: "Briefing", desc: "You tell me the goal and send the raw footage and references." },
      { title: "First cut", desc: "I put together a complete first version: pacing, captions, music and color." },
      { title: "Revisions", desc: "You leave comments and I adjust until the video is right." },
      { title: "Delivery", desc: "Final file in the right format for each platform, ready to upload." },
    ],
  },
  budget: {
    ready: "Ready to start?",
    letsCreate: "Tell me about your video",
    description: "I'll reply within 24h with a quote.",
    name: "Name",
    namePlaceholder: "Your name",
    email: "E-mail",
    emailPlaceholder: "your@email.com",
    briefing: "Quick briefing",
    briefingPlaceholder: "Tell me a little about the goal of your video...",
    reference: "Visual reference (optional)",
    referencePlaceholder: "Paste a YouTube or Drive link...",
    requestNow: "Request now",
    toastTitle: "Next Step Initiated!",
    toastDesc: "You will be redirected to WhatsApp with all the details.",
    response24h: "Response in 24h",
    freeBudget: "Free quote",
  },
  contact: {
    label: "Contact",
    title: "Got a video ",
    titleAccent: "to edit?",
    description: "Send me the brief or the raw footage. I'll reply within 24h with a quote.",
    whatsapp: "Or message me on WhatsApp",
  },
  footer: {
    tagline: "Video editor · Ads · Reels · VSL · Motion",
    rights: "All rights reserved.",
  },
  common: { close: "Close", openHd: "Open in Google Drive in high quality" },
  intro: { skip: "Skip", loading: "Loading" },
  notFound: { message: "Page not found", back: "Back to home" },
  maintenance: {
    label: "Back soon",
    title: "Site under",
    titleAccent: "maintenance.",
    description: "For quotes and inquiries, contact me directly:",
    whatsapp: "Message on WhatsApp",
    email: "Send an e-mail",
    social: "You can also find me here",
  },
  seo: {
    title: "Vitor Carvalho | Professional Video Editor",
    description: "Professional video editor specializing in VSLs, Ads, short videos, and social media content. Transforming ideas into impactful visual stories.",
    keywords: "video editor, video editing, VSL, video sales letter, ads, advertisements, reels, tiktok, youtube, premiere, after effects",
  },
};

const ES: T = {
  navbar: {
    projects: "Proyectos",
    services: "Servicios",
    about: "Sobre mí",
    requestBudget: "Solicitar Presupuesto",
    languages: "Idiomas",
    backToTop: "Volver al inicio",
    openMenu: "Abrir menú",
  },
  hero: {
    role: "Editor de Video Senior",
    available: "Disponible para nuevos proyectos",
    viewWork: "Ver Trabajos",
    highlights: "Destacados",
    prev: "Anterior",
    next: "Siguiente",
    headline: "Del material en bruto ",
    headlineAccent: "al video que vende.",
    pitch: "Soy Vitor, editor de video desde hace más de 4 años. Edito ads, reels y VSLs para marcas como 1pra1.bet, Group Phoenix y Cruzeiro Basquete.",
    ctaNote: "Respuesta en menos de 24h",
    clients: "Clientes",
    stack: {
      label: "Herramientas e IA",
      title: "Stack de producción.",
      categories: { ia: "IA", edicao: "Edición", motion: "Motion", analise: "Análisis", design: "Diseño" },
    },
    stats: {
      label: "Números",
      items: [
        { value: "10M+", label: "Views generadas" },
        { value: "4+", label: "Años de experiencia" },
        { value: "50+", label: "Proyectos entregados" },
        { value: "20+", label: "Clientes atendidos" },
      ],
    },
  },
  portfolio: {
    label: "Portafolio",
    title: "Lo que ya pasó ",
    titleAccent: "por mi timeline.",
    description: "Ads, reels, VSLs y motion hechos para clientes reales. Toca cualquier video para verlo.",
    allClients: "Todos",
    yourBrand: "Puedes ser tú",
    empty: "No hay proyectos en esta categoría",
    categories: { igaming: "iGaming", vsl: "VSL", motion: "Motion & IA", ads: "Ads & Performance", social: "Social Media" },
  },
  services: {
    label: "Servicios",
    title: "Lo que ",
    titleAccent: "edito.",
    cta: "Pedir presupuesto",
    items: [
      { title: "Ads para tráfico pago", desc: "Creativos con gancho en los primeros segundos, hechos para correr como anuncio y parecer contenido. Entrego varias versiones y formatos para que puedas testear.", formats: "Meta · TikTok · YouTube" },
      { title: "Reels y redes sociales", desc: "Cortes verticales con ritmo, subtítulos dinámicos y el tono de la marca — del club de básquet a la casa de apuestas.", formats: "Reels · TikTok · Shorts" },
      { title: "VSL", desc: "Videos de venta editados para mantener la atención hasta la oferta: cortes al ritmo del guion, b-roll, subtítulos y música.", formats: "Página de ventas · Lanzamiento" },
      { title: "Motion e IA", desc: "Cortinillas, animaciones y escenas generadas con IA para darle al video un acabado de productora.", formats: "After Effects · Higgsfield · ElevenLabs" },
    ],
  },
  about: {
    label: "Sobre mí",
    title: "Un gusto, ",
    titleAccent: "soy Vitor.",
    photoAlt: "Vitor Carvalho, editor de video",
    bio: "Hace más de 4 años que vivo de la edición de video. En ese tiempo hice más de 50 proyectos para más de 20 marcas, de casas de apuestas a un club de básquet. Pienso cada corte según lo que el video necesita lograr: frenar el scroll, retener hasta el final o vender.",
    clientsLabel: "Marcas con las que trabajo",
    processLabel: "Cómo trabajo",
    process: [
      { title: "Briefing", desc: "Me cuentas el objetivo y me envías el material en bruto y las referencias." },
      { title: "Primer corte", desc: "Armo la primera versión completa: ritmo, subtítulos, música y color." },
      { title: "Ajustes", desc: "Comentas y ajusto hasta que el video quede como debe." },
      { title: "Entrega", desc: "Archivo final en el formato de cada plataforma, listo para subir." },
    ],
  },
  budget: {
    ready: "¿Listo para comenzar?",
    letsCreate: "Cuéntame de tu video",
    description: "Respondo en menos de 24h con un presupuesto.",
    name: "Nombre",
    namePlaceholder: "Tu nombre",
    email: "E-mail",
    emailPlaceholder: "tu@email.com",
    briefing: "Briefing rápido",
    briefingPlaceholder: "Cuéntame un poco sobre el objetivo de tu video...",
    reference: "Referencia visual (opcional)",
    referencePlaceholder: "Pega un enlace de YouTube o Drive...",
    requestNow: "Solicitar ahora",
    toastTitle: "¡Próximo paso iniciado!",
    toastDesc: "Serás redirigido a WhatsApp con todos los detalles.",
    response24h: "Respuesta en 24h",
    freeBudget: "Presupuesto gratuito",
  },
  contact: {
    label: "Contacto",
    title: "¿Tienes un video ",
    titleAccent: "para editar?",
    description: "Envíame el briefing o el material en bruto. Respondo en menos de 24h con un presupuesto.",
    whatsapp: "O escríbeme por WhatsApp",
  },
  footer: {
    tagline: "Editor de video · Ads · Reels · VSL · Motion",
    rights: "Todos los derechos reservados.",
  },
  common: { close: "Cerrar", openHd: "Abrir en Google Drive en alta calidad" },
  intro: { skip: "Saltar", loading: "Cargando" },
  notFound: { message: "Página no encontrada", back: "Volver al inicio" },
  maintenance: {
    label: "Volvemos pronto",
    title: "Sitio en",
    titleAccent: "mantenimiento.",
    description: "Para presupuestos y contacto, escríbeme directamente:",
    whatsapp: "Escribir por WhatsApp",
    email: "Enviar e-mail",
    social: "También estoy aquí",
  },
  seo: {
    title: "Vitor Carvalho | Editor de Video Profesional",
    description: "Editor de video profesional especializado en VSLs, Ads, videos cortos y contenido para redes sociales. Transformando ideas en historias visuales impactantes.",
    keywords: "editor de video, edición de video, VSL, video sales letter, ads, anuncios, reels, tiktok, youtube, premiere, after effects",
  },
};

// EN-UK usa os mesmos textos do EN-US
const translations: Record<Lang, T> = { 'PT-BR': PT_BR, 'EN-US': EN_US, 'EN-UK': EN_US, 'ES': ES };

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: T;
}

const LangContext = createContext<LangContextType | null>(null);

const getSavedLang = (): Lang => {
  try {
    const saved = localStorage.getItem('app-language');
    if (saved && saved in translations) return saved as Lang;
  } catch { /* ignore */ }
  return 'PT-BR';
};

export const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(getSavedLang);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    try { localStorage.setItem('app-language', newLang); } catch { /* ignore */ }
  };

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
};
