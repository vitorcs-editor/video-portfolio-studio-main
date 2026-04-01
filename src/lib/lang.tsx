import React, { createContext, useContext, useState } from 'react';

type Lang = 'PT-BR' | 'EN-US' | 'EN-UK' | 'ES';

interface T {
  navbar: { portfolio: string; budget: string; requestBudget: string; languages: string; search: string; };
  hero: { description: string; viewPortfolio: string; tools: string; ai: string; clients: string; };
  portfolio: {
    projectsLine1: string; projectsLine2: string; description: string; exploreMore: string;
    categories: { all: string; igaming: string; vsl: string; motion: string; ads: string; social: string; };
    views: string; viewProject: string;
  };
  budget: {
    ready: string; letsCreate: string; description: string;
    name: string; namePlaceholder: string; email: string; emailPlaceholder: string;
    whatYouNeed: string; selectService: string;
    services: { vsl: string; shorts: string; longform: string; ads: string; other: string; };
    briefing: string; briefingPlaceholder: string; reference: string; referencePlaceholder: string;
    requestNow: string; toastTitle: string; toastDesc: string; response24h: string; freeBudget: string;
  };
  footer: { rights: string; };
  seo: { title: string; description: string; keywords: string; };
}

const translations: Record<string, T> = {
  'PT-BR': {
    navbar: {
      portfolio: "Portfólio",
      budget: "Orçamento",
      requestBudget: "SOLICITAR ORÇAMENTO",
      languages: "Idiomas",
      search: "Buscar..."
    },
    hero: {
      description: "Criando narrativas visuais que conectam marcas e pessoas. Editor de vídeo Sênior especializado em VSLs, Ads e conteúdo para redes sociais com impacto e conversão.",
      viewPortfolio: "Ver Portfólio",
      tools: "FERRAMENTAS",
      ai: "INTELIGÊNCIA ARTIFICIAL",
      clients: "CLIENTES"
    },
    portfolio: {
      projectsLine1: "Projetos",
      projectsLine2: "Selecionados",
      description: "Clique nos projetos abaixo para assistir e entender o impacto visual gerado para cada cliente através de edições dinâmicas.",
      exploreMore: "Explorar Mais Vídeos",
      categories: { all: "Tudo", igaming: "iGaming", vsl: "VSL", motion: "Motion & IA", ads: "Ads & Performance", social: "Social Media" },
      views: "Visualizações",
      viewProject: "Ver Projeto"
    },
    budget: {
      ready: "PRONTO PARA COMEÇAR?",
      letsCreate: "Vamos Criar Juntos",
      description: "Transforme sua visão em alta conversão. Resposta em menos de 24h.",
      name: "NOME",
      namePlaceholder: "Seu nome",
      email: "E-MAIL",
      emailPlaceholder: "seu@email.com",
      whatYouNeed: "O QUE VOCÊ PRECISA?",
      selectService: "Selecione o serviço",
      services: {
        vsl: "VSL (Video Sales Letter)",
        shorts: "Vídeo Curto (Reels/TikTok)",
        longform: "Vídeo Longo (YouTube)",
        ads: "Criativos para Anúncios (Ads)",
        other: "Outro formato"
      },
      briefing: "BRIEFING RÁPIDO",
      briefingPlaceholder: "Conte um pouco sobre o objetivo do seu vídeo...",
      reference: "REFERÊNCIA VISUAL (OPCIONAL)",
      referencePlaceholder: "Cole um link do YouTube ou Drive...",
      requestNow: "SOLICITAR AGORA",
      toastTitle: "Próximo Passo Iniciado!",
      toastDesc: "Você será redirecionado para o WhatsApp com todos os detalhes.",
      response24h: "Resposta em 24h",
      freeBudget: "Orçamento gratuito"
    },
    footer: { rights: "Todos os direitos reservados." },
    seo: {
      title: "Vitor Carvalho | Editor de Vídeo Profissional",
      description: "Editor de vídeo profissional especializado em VSLs, Ads, vídeos curtos e conteúdo para redes sociais. Transformando ideias em histórias visuais impactantes.",
      keywords: "editor de vídeo, edição de vídeo, VSL, video sales letter, ads, anúncios, reels, tiktok, youtube, premiere, after effects"
    }
  },
  'EN-US': {
    navbar: {
      portfolio: "Portfolio",
      budget: "Quote",
      requestBudget: "REQUEST QUOTE",
      languages: "Languages",
      search: "Search..."
    },
    hero: {
      description: "Crafting visual narratives that connect brands and people. Senior video editor specializing in VSLs, Ads, and social media content for impact and conversion.",
      viewPortfolio: "View Portfolio",
      tools: "TOOLS",
      ai: "ARTIFICIAL INTELLIGENCE",
      clients: "CLIENTS"
    },
    portfolio: {
      projectsLine1: "Selected",
      projectsLine2: "Projects",
      description: "Click on the projects below to watch and understand the visual impact generated for each client through dynamic editing.",
      exploreMore: "Explore More Videos",
      categories: { all: "All", igaming: "iGaming", vsl: "VSL", motion: "Motion & AI", ads: "Ads & Performance", social: "Social Media" },
      views: "Views",
      viewProject: "View Project"
    },
    budget: {
      ready: "READY TO START?",
      letsCreate: "Let's Create Together",
      description: "Turn your vision into high conversion. Response in less than 24h.",
      name: "NAME",
      namePlaceholder: "Your name",
      email: "E-MAIL",
      emailPlaceholder: "your@email.com",
      whatYouNeed: "WHAT DO YOU NEED?",
      selectService: "Select a service",
      services: {
        vsl: "VSL (Video Sales Letter)",
        shorts: "Short Videos (Reels/TikTok)",
        longform: "Long Videos (YouTube)",
        ads: "Ad Creatives",
        other: "Other format"
      },
      briefing: "QUICK BRIEFING",
      briefingPlaceholder: "Tell me a little about the goal of your video...",
      reference: "VISUAL REFERENCE (OPTIONAL)",
      referencePlaceholder: "Paste a YouTube or Drive link...",
      requestNow: "REQUEST NOW",
      toastTitle: "Next Step Initiated!",
      toastDesc: "You will be redirected to WhatsApp with all the details.",
      response24h: "Response in 24h",
      freeBudget: "Free quote"
    },
    footer: { rights: "All rights reserved." },
    seo: {
      title: "Vitor Carvalho | Professional Video Editor",
      description: "Professional video editor specializing in VSLs, Ads, short videos, and social media content. Transforming ideas into impactful visual stories.",
      keywords: "video editor, video editing, VSL, video sales letter, ads, advertisements, reels, tiktok, youtube, premiere, after effects"
    }
  },
  'ES': {
    navbar: {
      portfolio: "Portafolio",
      budget: "Presupuesto",
      requestBudget: "SOLICITAR PRESUPUESTO",
      languages: "Idiomas",
      search: "Buscar..."
    },
    hero: {
      description: "Creando narrativas visuales que conectan marcas y personas. Editor de video Senior especializado en VSLs, Ads y contenido para redes sociales con impacto y conversión.",
      viewPortfolio: "Ver Portafolio",
      tools: "HERRAMIENTAS",
      ai: "INTELIGENCIA ARTIFICIAL",
      clients: "CLIENTES"
    },
    portfolio: {
      projectsLine1: "Proyectos",
      projectsLine2: "Seleccionados",
      description: "Haz clic en los proyectos para ver el impacto visual generado para cada cliente a través de ediciones dinámicas.",
      exploreMore: "Explorar más videos",
      categories: { all: "Todo", igaming: "iGaming", vsl: "VSL", motion: "Motion & IA", ads: "Ads & Performance", social: "Social Media" },
      views: "Visualizaciones",
      viewProject: "Ver Proyecto"
    },
    budget: {
      ready: "¿LISTO PARA COMENZAR?",
      letsCreate: "Creemos Juntos",
      description: "Convierte tu visión en alta conversión. Respuesta en menos de 24h.",
      name: "NOMBRE",
      namePlaceholder: "Tu nombre",
      email: "E-MAIL",
      emailPlaceholder: "tu@email.com",
      whatYouNeed: "¿QUÉ NECESITAS?",
      selectService: "Selecciona un servicio",
      services: {
        vsl: "VSL (Video Sales Letter)",
        shorts: "Video Corto (Reels/TikTok)",
        longform: "Video Largo (YouTube)",
        ads: "Creativos para Anuncios (Ads)",
        other: "Otro formato"
      },
      briefing: "BRIEFING RÁPIDO",
      briefingPlaceholder: "Cuéntame un poco sobre el objetivo de tu video...",
      reference: "REFERENCIA VISUAL (OPCIONAL)",
      referencePlaceholder: "Pega un enlace de YouTube o Drive...",
      requestNow: "SOLICITAR AHORA",
      toastTitle: "¡Próximo paso iniciado!",
      toastDesc: "Serás redirigido a WhatsApp con todos los detalles.",
      response24h: "Respuesta en 24h",
      freeBudget: "Presupuesto gratuito"
    },
    footer: { rights: "Todos los derechos reservados." },
    seo: {
      title: "Vitor Carvalho | Editor de Video Profesional",
      description: "Editor de video profesional especializado en VSLs, Ads, videos cortos y contenido para redes sociales. Transformando ideas en historias visuales impactantes.",
      keywords: "editor de video, edición de video, VSL, video sales letter, ads, anuncios, reels, tiktok, youtube, premiere, after effects"
    }
  }
};

// Map EN-UK to EN-US (same translations)
const getTranslation = (lang: Lang): T => {
  if (lang === 'EN-UK') return translations['EN-US'];
  return translations[lang];
};

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: T;
}

const LangContext = createContext<LangContextType | null>(null);

const getSavedLang = (): Lang => {
  try {
    const saved = localStorage.getItem('app-language');
    const valid: Lang[] = ['PT-BR', 'EN-US', 'EN-UK', 'ES'];
    if (saved && valid.includes(saved as Lang)) return saved as Lang;
  } catch { /* ignore */ }
  return 'PT-BR';
};

export const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(getSavedLang);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    try { localStorage.setItem('app-language', newLang); } catch { /* ignore */ }
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: getTranslation(lang) }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
};
