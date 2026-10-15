import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { MotionConfig } from "framer-motion";
import { LangProvider } from "./lib/lang";
import Index from "./pages/Index";
import Maintenance from "./pages/Maintenance";
import { MAINTENANCE_MODE } from "./config";
import NotFound from "./pages/NotFound";

const App = () => (
  <LangProvider>
    <HelmetProvider>
      {/* Respeita "reduzir movimento" do sistema em todas as animações do framer-motion */}
      <MotionConfig reducedMotion="user">
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={MAINTENANCE_MODE ? <Maintenance /> : <Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MotionConfig>
    </HelmetProvider>
  </LangProvider>
);

export default App;
