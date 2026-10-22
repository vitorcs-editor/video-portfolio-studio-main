import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import About from "@/components/About";
import Stack from "@/components/Stack";
import BudgetModal from "@/components/BudgetModal";
import Footer from "@/components/Footer";
import GlobalBackground from "@/components/GlobalBackground";
import KineticBand from "@/components/KineticBand";
import Intro, { shouldPlayIntro } from "@/components/Intro";
import ScrollProgress from "@/components/common/ScrollProgress";
import { useLang } from "@/lib/lang";
import { SITE_URL } from "@/lib/contact";

const Index = () => {
  const { t } = useLang();
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  // Abertura animada: `revealed` libera as animações do hero quando a tela abre;
  // `introDone` desmonta a abertura no fim.
  const [introDone, setIntroDone] = useState(() => !shouldPlayIntro());
  const [revealed, setRevealed] = useState(introDone);

  useEffect(() => {
    const handler = () => setIsBudgetOpen(true);
    window.addEventListener("openBudgetModal", handler);
    return () => window.removeEventListener("openBudgetModal", handler);
  }, []);

  // Sempre abre no topo: ignora âncora na URL (ex.: /#portfolio) e remove a hash.
  useEffect(() => {
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    const top = () => window.scrollTo(0, 0);
    const frame = requestAnimationFrame(top);
    let cancelled = false;
    document.fonts?.ready.then(() => { if (!cancelled) top(); });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{t.seo.title}</title>
        <meta name="description" content={t.seo.description} />
        <meta name="keywords" content={t.seo.keywords} />
        <meta property="og:title" content={t.seo.title} />
        <meta property="og:description" content={t.seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <link rel="canonical" href={SITE_URL} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Vitor Carvalho",
            jobTitle: "Editor de Vídeo",
            description: t.seo.description,
            url: SITE_URL,
            image: `${SITE_URL}/og-image.png`,
            email: "vitorcarvalhods.edicao@gmail.com",
            sameAs: [
              "https://www.instagram.com/vitorcarvalhods/",
              "https://www.linkedin.com/in/vitor-carvalho-b26a52361/",
            ],
            knowsAbout: ["VSL", "Video Sales Letter", "Edição de Vídeo", "iGaming", "Ads", "Motion Design"],
          })}
        </script>
      </Helmet>

      <div className="relative min-h-screen">
        <GlobalBackground />
        <ScrollProgress />
        <Navbar onOpenBudget={() => setIsBudgetOpen(true)} />
        <main className="relative z-10">
          <Hero ready={revealed} />
          <Clients />
          <Portfolio />
          <KineticBand />
          <Services />
          <About />
          <Stack />
          <Contact />
        </main>
        <div className="relative z-10">
          <Footer />
        </div>
      </div>

      {!introDone && (
        <Intro
          onReveal={() => setRevealed(true)}
          onDone={() => {
            setIntroDone(true);
            // A barra de progresso mediu a página travada durante a abertura; força nova medição
            requestAnimationFrame(() => window.dispatchEvent(new Event("scroll")));
          }}
        />
      )}

      {/* Budget modal — all screen sizes */}
      <BudgetModal isOpen={isBudgetOpen} onClose={() => setIsBudgetOpen(false)} />
    </>
  );
};

export default Index;
