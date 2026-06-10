import { motion } from "framer-motion";
import { Sparkles, Layers, TrendingUp, Tv } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "Direção Criativa & IA",
    desc: "Cada vídeo começa com uma ideia forte. Uso IA como ferramenta criativa — não como atalho — para construir estéticas que ninguém vai confundir com template.",
  },
  {
    icon: Layers,
    title: "Motion Design Premium",
    desc: "Movimento, timing e tipografia que fazem o vídeo parecer caro antes de qualquer palavra aparecer na tela.",
  },
  {
    icon: TrendingUp,
    title: "VSLs de Alta Conversão",
    desc: "VSLs que prendem do primeiro segundo ao CTA. Estrutura, ritmo e áudio pensados pra manter o espectador até o final — e convencer.",
  },
  {
    icon: Tv,
    title: "Campanhas & Performance",
    desc: "Criativos que param o scroll e vendem. Feitos pra rodar em tráfego pago e parecerem conteúdo, não anúncio.",
  },
];

const Services = () => {
  return (
    <section id="servicos" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-[10px] uppercase tracking-[0.35em] text-primary/60 font-bold mb-3 block">
            Serviços de Elite
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-4">
            Direção audiovisual que{" "}
            <span className="text-primary drop-shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
              gera valor.
            </span>
          </h2>
          <p className="text-white/40 text-sm max-w-md mx-auto">
            Para marcas e criadores que querem se destacar e converter de verdade.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((s, idx) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group p-7 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-primary/25 hover:bg-primary/[0.04] transition-all duration-400"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                  <s.icon size={18} className="text-primary" />
                </div>
                <h3 className="font-display text-lg font-black text-white leading-tight pt-1">
                  {s.title}
                </h3>
              </div>

              <p className="text-white/45 text-sm leading-relaxed mb-6">
                {s.desc}
              </p>

              <button
                onClick={() => window.dispatchEvent(new CustomEvent("openBudgetModal"))}
                className="text-xs font-semibold text-white/40 hover:text-primary transition-colors duration-200 flex items-center gap-1 group/btn"
              >
                Solicitar este serviço
                <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
