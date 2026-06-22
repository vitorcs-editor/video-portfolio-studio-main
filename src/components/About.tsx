import { motion } from "framer-motion";
import { Target, Zap, Shield, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Visão Estratégica",
    desc: "Não crio só para criar. Cada peça tem uma função: prender, comunicar ou converter.",
  },
  {
    icon: Zap,
    title: "IA na Fronteira",
    desc: "Uso IA como parte do fluxo criativo, não como substituto de ideia. O resultado é mais rápido e com estética que não parece gerada.",
  },
  {
    icon: Shield,
    title: "Qualidade Absoluta",
    desc: "Cor, corte, áudio e timing. Cada detalhe é intencional. Não existe bom o suficiente.",
  },
  {
    icon: TrendingUp,
    title: "Foco em Conversão",
    desc: "O vídeo bonito que não converte não serve. Trabalho para que estética e resultado andem juntos.",
  },
];

const About = () => {
  return (
    <section id="sobre" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="container mx-auto px-6">

        {/* Header — centralizado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <span className="text-[10px] uppercase tracking-[0.35em] text-primary/60 font-bold mb-4 block">
            O Diretor Criativo
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6 text-white">
            Especializado em iGaming,{" "}
            <span className="text-primary drop-shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
              VSL e Social Media.
            </span>
          </h2>
          <p className="text-white/50 text-sm leading-relaxed">
            Edição de vídeo, motion design, color grading, direção criativa e integração com IA. Do roteiro ao arquivo final, cuido de cada etapa com atenção técnica e visão criativa. Já atuei para 1pra1.bet, Cruzeiro Basquete, Grupo Fênix e Draft — marcas que exigem padrão e recebem exatamente isso.
          </p>
        </motion.div>

        {/* Cards — grid 2x2 centralizado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto"
        >
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col gap-3 p-5 rounded-xl bg-white/[0.04] border border-white/[0.07] hover:border-primary/20 hover:bg-primary/[0.05] transition-all duration-300 backdrop-blur-sm"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <f.icon size={15} className="text-primary" />
              </div>
              <div>
                <p className="text-white text-xs font-bold mb-1.5">{f.title}</p>
                <p className="text-white/40 text-xs leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default About;
