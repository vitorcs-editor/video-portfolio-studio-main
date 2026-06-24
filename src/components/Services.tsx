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
    desc: "VSLs que prendem do primeiro segundo ao CTA. Estrutura, ritmo e áudio pensados para manter o espectador até o final — e convencer.",
  },
  {
    icon: Tv,
    title: "Campanhas & Performance",
    desc: "Criativos que param o scroll e vendem. Feitos para rodar em tráfego pago e parecerem conteúdo, não anúncio.",
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
          className="mb-10"
        >
          <span className="text-[10px] uppercase tracking-[0.35em] text-primary/60 font-bold mb-3 block">
            Serviços de Elite
          </span>
          <h2 className="font-impact text-5xl sm:text-6xl md:text-7xl leading-[0.9] tracking-wide">
            <span className="text-white">Direção audiovisual que </span>
            <span className="text-primary drop-shadow-[0_0_20px_hsl(var(--primary)/0.4)]">gera valor.</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              className="group relative rounded-2xl border border-primary/15 bg-primary/[0.03] p-6 sm:p-7 flex flex-col transition-all duration-300 hover:border-primary/35 hover:bg-primary/[0.06]"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                  <s.icon size={19} className="text-primary" />
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-tight pt-1.5">
                  {s.title}
                </h3>
              </div>

              <p className="text-white/45 text-sm leading-relaxed mb-6 flex-1">
                {s.desc}
              </p>

              <button
                onClick={() => window.dispatchEvent(new CustomEvent("openBudgetModal"))}
                className="self-start text-xs font-semibold text-white/40 hover:text-primary transition-colors duration-200 flex items-center gap-1 group/btn uppercase tracking-wider"
              >
                Solicitar este serviço
                <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
              </button>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Services;
