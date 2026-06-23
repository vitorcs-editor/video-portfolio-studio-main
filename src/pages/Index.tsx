import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import About from "@/components/About";
import BudgetModal from "@/components/BudgetModal";
import Footer from "@/components/Footer";
import GlobalBackground from "@/components/GlobalBackground";
import { useLang } from "@/lib/lang";
import { SITE_URL } from "@/lib/contact";

const Index = () => {
  const { t } = useLang();
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsBudgetOpen(true);
    window.addEventListener("openBudgetModal", handler);
    return () => window.removeEventListener("openBudgetModal", handler);
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

      <div className="min-h-screen bg-grain relative">
        <GlobalBackground />
        <Navbar onOpenBudget={() => setIsBudgetOpen(true)} />
        <main className="relative z-10 w-full">
          <Hero />
          <Services />
          <About />
          <Portfolio />
        </main>
        <Footer />
      </div>

      {/* Budget modal — all screen sizes */}
      <BudgetModal isOpen={isBudgetOpen} onClose={() => setIsBudgetOpen(false)} />
    </>
  );
};

export default Index;
