import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import BudgetForm from "@/components/BudgetForm";
import Footer from "@/components/Footer";
import { useLang } from "@/lib/lang";

const Index = () => {
  const { t } = useLang();
  return (
    <>
      <Helmet>
        <title>{t.seo.title}</title>
        <meta name="description" content={t.seo.description} />
        <meta name="keywords" content={t.seo.keywords} />
        <meta property="og:title" content={t.seo.title} />
        <meta property="og:description" content={t.seo.description} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://vitorcarvalho.com" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <Portfolio />
          <BudgetForm />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
