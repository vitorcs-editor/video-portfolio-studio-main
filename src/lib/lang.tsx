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

interface T {
  navbar: { projects: string; services: string; about: string; requestBudget: string; languages: string; backToTop: string; openMenu: string; };
  hero: {
    role: string; viewWork: string; showreel: string;
    headline: string; headlineAccent: string; pitch: string; ctaNote: string; clients: string;
    stack: { label: string; title: string; categories: { ia: string; edicao: string; motion: string; analise: string; design: string; }; };
    stats: { label: string; items: { value: string; label: string; }[]; };
  };
  portfolio: {
    label: string; title: string; titleAccent: string; description: string;
    allClients: string; yourBrand: string; empty: string;
    categories: Record<VideoCategory, string>;
  };
  services: { label: string; title: string; titleAccent: string; cta: string; items: Item[]; };
  about: { label: string; title: string; titleAccent: string; photoAlt: string; bio: string; clientsLabel: string; features: Item[]; };
  budget: {
    ready: string; letsCreate: string; description: string;
    name: string; namePlaceholder: string; email: string; emailPlaceholder: string;
    briefing: string; briefingPlaceholder: string; reference: string; referencePlaceholder: string;
    requestNow: string; toastTitle: string; toastDesc: string; response24h: string; freeBudget: string;
  };
  contact: { label: string; title: string; titleAccent: string; description: string; whatsapp: string; };
  footer: { tagline: string; rights: string; };
  common: { close: string; };
  notFound: { message: string; back: string; };
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
    viewWork: "Ver Trabalhos",
    showreel: "Showreel · melhores cortes em vídeo",
    headline: "Edição que prende. ",
    headlineAccent: "Resultado que converte.",
    pitch: "Atendo marcas de iGaming, VSL e redes sociais — vídeos com identidade, ritmo e foco em performance.",
    ctaNote: "Resposta em até 24h",
    clients: "CLIENTES",
    stack: {
      label: "FERRAMENTAS & IA",
      title: "Stack de produção.",
      categories: { ia: "IA", edicao: "Edição", motion: "Motion", analise: "Análise", design: "Design" },
    },
    stats: {
      label: "NÚMEROS",
      items: [
        { value: "10M+", label: "Views geradas" },
        { value: "4+", label: "Anos de experiência" },
        { value: "50+", label: "Projetos entregues" },
        { value: "20+", label: "Clientes atendidos" },
      ],
    },
  },
  portfolio: {
    label: "Showcase Recente",
    title: "Trabalhos ",
    titleAccent: "Selecionados",
    description: "Uma seleção de produções recentes sob medida. Clique no card para assistir ao projeto.",
    allClients: "Todos",
    yourBrand: "Pode ser você",
    empty: "Nenhum projeto nesta categoria",
    categories: { igaming: "iGaming", vsl: "VSL", motion: "Motion & IA", ads: "Ads & Performance", social: "Social Media" },
  },
  services: {
    label: "Serviços de Elite",
    title: "Direção audiovisual que ",
    titleAccent: "gera valor.",
    cta: "Solicitar este serviço",
    items: [
      { title: "Direção Criativa & IA", desc: "Cada vídeo começa com uma ideia forte. Uso IA como ferramenta criativa — não como atalho — para construir estéticas que ninguém vai confundir com template." },
      { title: "Motion Design Premium", desc: "Movimento, timing e tipografia que fazem o vídeo parecer caro antes de qualquer palavra aparecer na tela." },
      { title: "VSLs de Alta Conversão", desc: "VSLs que prendem do primeiro segundo ao CTA. Estrutura, ritmo e áudio pensados para manter o espectador até o final — e convencer." },
      { title: "Campanhas & Performance", desc: "Criativos que param o scroll e vendem. Feitos para rodar em tráfego pago e parecerem conteúdo, não anúncio." },
    ],
  },
  about: {
    label: "O Diretor Criativo",
    title: "Especializado em iGaming, ",
    titleAccent: "VSL e Social.",
    photoAlt: "Vitor Carvalho, editor de vídeo",
    bio: "Edição de vídeo, motion design, color grading, direção criativa e integração com IA. Do roteiro ao arquivo final, cuido de cada etapa com atenção técnica e visão criativa. Já atuei para 1pra1.bet, Cruzeiro Basquete, Group Phoenix e Projeto Draft — marcas que exigem padrão e recebem exatamente isso.",
    clientsLabel: "Marcas que confiaram no meu corte",
    features: [
      { title: "Visão Estratégica", desc: "Cada peça tem uma função: prender, comunicar ou converter." },
      { title: "IA na Fronteira", desc: "IA como parte do fluxo criativo — não como substituto de ideia." },
      { title: "Qualidade Absoluta", desc: "Cor, corte, áudio e timing. Cada detalhe é intencional." },
      { title: "Foco em Conversão", desc: "Estética e resultado andam juntos. O resto é só vídeo bonito." },
    ],
  },
  budget: {
    ready: "PRONTO PARA COMEÇAR?",
    letsCreate: "Vamos Criar Juntos",
    description: "Transforme sua visão em alta conversão. Resposta em menos de 24h.",
    name: "NOME",
    namePlaceholder: "Seu nome",
    email: "E-MAIL",
    emailPlaceholder: "seu@email.com",
    briefing: "BRIEFING RÁPIDO",
    briefingPlaceholder: "Conte um pouco sobre o objetivo do seu vídeo...",
    reference: "REFERÊNCIA VISUAL (OPCIONAL)",
    referencePlaceholder: "Cole um link do YouTube ou Drive...",
    requestNow: "SOLICITAR AGORA",
    toastTitle: "Próxima Etapa Iniciada!",
    toastDesc: "Você será direcionado ao WhatsApp para continuar.",
    response24h: "Resposta em 24h",
    freeBudget: "Orçamento gratuito",
  },
  contact: {
    label: "Contato",
    title: "Vamos criar",
    titleAccent: "juntos.",
    description: "Conte a ideia do seu vídeo e receba um orçamento gratuito em até 24h.",
    whatsapp: "Ou chame no WhatsApp",
  },
  footer: {
    tagline: "Editor de Vídeo Sênior · iGaming · VSL · Social",
    rights: "Todos os direitos reservados.",
  },
  common: { close: "Fechar" },
  notFound: { message: "Página não encontrada", back: "Voltar para o início" },
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
    viewWork: "View Work",
    showreel: "Showreel · best cuts on video",
    headline: "Editing that hooks. ",
    headlineAccent: "Results that convert.",
    pitch: "I work with iGaming, VSL and social media brands — videos with identity, rhythm and a focus on performance.",
    ctaNote: "Reply within 24h",
    clients: "CLIENTS",
    stack: {
      label: "TOOLS & AI",
      title: "Production stack.",
      categories: { ia: "AI", edicao: "Editing", motion: "Motion", analise: "Analytics", design: "Design" },
    },
    stats: {
      label: "NUMBERS",
      items: [
        { value: "10M+", label: "Views generated" },
        { value: "4+", label: "Years of experience" },
        { value: "50+", label: "Projects delivered" },
        { value: "20+", label: "Clients served" },
      ],
    },
  },
  portfolio: {
    label: "Recent Showcase",
    title: "Selected ",
    titleAccent: "Work",
    description: "A selection of recent tailor-made productions. Click a card to watch the project.",
    allClients: "All",
    yourBrand: "This could be you",
    empty: "No projects in this category",
    categories: { igaming: "iGaming", vsl: "VSL", motion: "Motion & AI", ads: "Ads & Performance", social: "Social Media" },
  },
  services: {
    label: "Elite Services",
    title: "Audiovisual direction that ",
    titleAccent: "creates value.",
    cta: "Request this service",
    items: [
      { title: "Creative Direction & AI", desc: "Every video starts with a strong idea. I use AI as a creative tool — not a shortcut — to build aesthetics nobody will mistake for a template." },
      { title: "Premium Motion Design", desc: "Movement, timing and typography that make the video look expensive before a single word appears on screen." },
      { title: "High-Converting VSLs", desc: "VSLs that hold attention from the first second to the CTA. Structure, pacing and audio designed to keep viewers until the end — and convince them." },
      { title: "Campaigns & Performance", desc: "Creatives that stop the scroll and sell. Built to run on paid traffic and feel like content, not ads." },
    ],
  },
  about: {
    label: "The Creative Director",
    title: "Specialized in iGaming, ",
    titleAccent: "VSL and Social.",
    photoAlt: "Vitor Carvalho, video editor",
    bio: "Video editing, motion design, color grading, creative direction and AI integration. From script to final file, I handle every step with technical care and creative vision. I've worked with 1pra1.bet, Cruzeiro Basquete, Group Phoenix and Projeto Draft — brands that demand high standards and get exactly that.",
    clientsLabel: "Brands that trusted my cut",
    features: [
      { title: "Strategic Vision", desc: "Every piece has a job: hook, communicate or convert." },
      { title: "Cutting-Edge AI", desc: "AI as part of the creative flow — not a substitute for ideas." },
      { title: "Uncompromising Quality", desc: "Color, cut, audio and timing. Every detail is intentional." },
      { title: "Conversion-Focused", desc: "Aesthetics and results go together. Everything else is just a pretty video." },
    ],
  },
  budget: {
    ready: "READY TO START?",
    letsCreate: "Let's Create Together",
    description: "Turn your vision into high conversion. Response in less than 24h.",
    name: "NAME",
    namePlaceholder: "Your name",
    email: "E-MAIL",
    emailPlaceholder: "your@email.com",
    briefing: "QUICK BRIEFING",
    briefingPlaceholder: "Tell me a little about the goal of your video...",
    reference: "VISUAL REFERENCE (OPTIONAL)",
    referencePlaceholder: "Paste a YouTube or Drive link...",
    requestNow: "REQUEST NOW",
    toastTitle: "Next Step Initiated!",
    toastDesc: "You will be redirected to WhatsApp with all the details.",
    response24h: "Response in 24h",
    freeBudget: "Free quote",
  },
  contact: {
    label: "Contact",
    title: "Let's create",
    titleAccent: "together.",
    description: "Tell me about your video idea and get a free quote within 24h.",
    whatsapp: "Or message me on WhatsApp",
  },
  footer: {
    tagline: "Senior Video Editor · iGaming · VSL · Social",
    rights: "All rights reserved.",
  },
  common: { close: "Close" },
  notFound: { message: "Page not found", back: "Back to home" },
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
    viewWork: "Ver Trabajos",
    showreel: "Showreel · mejores cortes en video",
    headline: "Edición que atrapa. ",
    headlineAccent: "Resultados que convierten.",
    pitch: "Trabajo con marcas de iGaming, VSL y redes sociales — videos con identidad, ritmo y foco en rendimiento.",
    ctaNote: "Respuesta en menos de 24h",
    clients: "CLIENTES",
    stack: {
      label: "HERRAMIENTAS E IA",
      title: "Stack de producción.",
      categories: { ia: "IA", edicao: "Edición", motion: "Motion", analise: "Análisis", design: "Diseño" },
    },
    stats: {
      label: "NÚMEROS",
      items: [
        { value: "10M+", label: "Views generadas" },
        { value: "4+", label: "Años de experiencia" },
        { value: "50+", label: "Proyectos entregados" },
        { value: "20+", label: "Clientes atendidos" },
      ],
    },
  },
  portfolio: {
    label: "Showcase Reciente",
    title: "Trabajos ",
    titleAccent: "Seleccionados",
    description: "Una selección de producciones recientes a medida. Haz clic en una tarjeta para ver el proyecto.",
    allClients: "Todos",
    yourBrand: "Puedes ser tú",
    empty: "No hay proyectos en esta categoría",
    categories: { igaming: "iGaming", vsl: "VSL", motion: "Motion & IA", ads: "Ads & Performance", social: "Social Media" },
  },
  services: {
    label: "Servicios de Élite",
    title: "Dirección audiovisual que ",
    titleAccent: "genera valor.",
    cta: "Solicitar este servicio",
    items: [
      { title: "Dirección Creativa & IA", desc: "Cada video empieza con una idea fuerte. Uso la IA como herramienta creativa — no como atajo — para construir estéticas que nadie confundirá con una plantilla." },
      { title: "Motion Design Premium", desc: "Movimiento, timing y tipografía que hacen que el video parezca caro antes de que aparezca cualquier palabra en pantalla." },
      { title: "VSLs de Alta Conversión", desc: "VSLs que atrapan del primer segundo al CTA. Estructura, ritmo y audio pensados para mantener al espectador hasta el final — y convencerlo." },
      { title: "Campañas & Performance", desc: "Creativos que detienen el scroll y venden. Hechos para correr en tráfico pago y parecer contenido, no anuncio." },
    ],
  },
  about: {
    label: "El Director Creativo",
    title: "Especializado en iGaming, ",
    titleAccent: "VSL y Social.",
    photoAlt: "Vitor Carvalho, editor de video",
    bio: "Edición de video, motion design, color grading, dirección creativa e integración con IA. Del guion al archivo final, cuido cada etapa con atención técnica y visión creativa. He trabajado para 1pra1.bet, Cruzeiro Basquete, Group Phoenix y Projeto Draft — marcas que exigen estándar y reciben exactamente eso.",
    clientsLabel: "Marcas que confiaron en mi corte",
    features: [
      { title: "Visión Estratégica", desc: "Cada pieza tiene una función: atrapar, comunicar o convertir." },
      { title: "IA de Vanguardia", desc: "La IA como parte del flujo creativo — no como sustituto de ideas." },
      { title: "Calidad Absoluta", desc: "Color, corte, audio y timing. Cada detalle es intencional." },
      { title: "Foco en Conversión", desc: "Estética y resultado van juntos. Lo demás es solo un video bonito." },
    ],
  },
  budget: {
    ready: "¿LISTO PARA COMENZAR?",
    letsCreate: "Creemos Juntos",
    description: "Convierte tu visión en alta conversión. Respuesta en menos de 24h.",
    name: "NOMBRE",
    namePlaceholder: "Tu nombre",
    email: "E-MAIL",
    emailPlaceholder: "tu@email.com",
    briefing: "BRIEFING RÁPIDO",
    briefingPlaceholder: "Cuéntame un poco sobre el objetivo de tu video...",
    reference: "REFERENCIA VISUAL (OPCIONAL)",
    referencePlaceholder: "Pega un enlace de YouTube o Drive...",
    requestNow: "SOLICITAR AHORA",
    toastTitle: "¡Próximo paso iniciado!",
    toastDesc: "Serás redirigido a WhatsApp con todos los detalles.",
    response24h: "Respuesta en 24h",
    freeBudget: "Presupuesto gratuito",
  },
  contact: {
    label: "Contacto",
    title: "Creemos",
    titleAccent: "juntos.",
    description: "Cuéntame la idea de tu video y recibe un presupuesto gratuito en menos de 24h.",
    whatsapp: "O escríbeme por WhatsApp",
  },
  footer: {
    tagline: "Editor de Video Senior · iGaming · VSL · Social",
    rights: "Todos los derechos reservados.",
  },
  common: { close: "Cerrar" },
  notFound: { message: "Página no encontrada", back: "Volver al inicio" },
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
