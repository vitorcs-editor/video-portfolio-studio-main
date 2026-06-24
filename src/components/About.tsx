import { motion } from "framer-motion";
import { Target, Zap, Shield, TrendingUp } from "lucide-react";

const features = [
  { icon: Target, title: "Visão Estratégica", desc: "Cada peça tem uma função: prender, comunicar ou converter." },
  { icon: Zap, title: "IA na Fronteira", desc: "IA como parte do fluxo criativo — não como substituto de ideia." },
  { icon: Shield, title: "Qualidade Absoluta", desc: "Cor, corte, áudio e timing. Cada detalhe é intencional." },
  { icon: TrendingUp, title: "Foco em Conversão", desc: "Estética e resultado andam juntos. O resto é só vídeo bonito." },
];

const clients = ["1pra1.bet", "Cruzeiro Basquete", "Grupo Fênix", "Projeto Draft"];

const cell = "relative rounded-2xl border border-primary/15 bg-primary/[0.03] transition-all duration-300 hover:border-primary/35";

const About = () => {
  return (
    <section id="sobre" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="text-[10px] uppercase tracking-[0.35em] text-primary/60 font-bold mb-3 block">
            O Diretor Criativo
          </span>
          <h2 className="font-impact text-5xl sm:text-6xl md:text-7xl leading-[0.9] tracking-wide">
            <span className="text-white">Especializado em iGaming, </span>
            <span className="text-primary drop-shadow-[0_0_20px_hsl(var(--primary)/0.4)]">VSL e Social.</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {/* Foto — grande à esquerda */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className={`${cell} col-span-2 lg:row-span-2 min-h-[340px] overflow-hidden`}
          >
            <img
              src="/vitor-hero.jpg"
              alt="Vitor Carvalho, editor de vídeo"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-primary/5 mix-blend-overlay pointer-events-none" />
            <span className="absolute bottom-5 left-5 font-impact text-2xl tracking-wide text-white">
              Vitor Carvalho
            </span>
          </motion.div>

          {/* Bio */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className={`${cell} col-span-2 p-6 sm:p-7 flex items-center`}
          >
            <p className="text-white/55 text-sm sm:text-base leading-relaxed">
              Edição de vídeo, motion design, color grading, direção criativa e integração com IA. Do roteiro ao arquivo final, cuido de cada etapa com atenção técnica e visão criativa. Já atuei para 1pra1.bet, Cruzeiro Basquete, Grupo Fênix e Draft — marcas que exigem padrão e recebem exatamente isso.
            </p>
          </motion.div>

          {/* Clientes */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className={`${cell} col-span-2 p-6 flex flex-col justify-center gap-3`}
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/35 font-bold">
              Marcas que confiaram no meu corte
            </span>
            <div className="flex flex-wrap gap-2">
              {clients.map((c) => (
                <span key={c} className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/55 bg-white/[0.04] border border-white/10 rounded-full px-3 py-1.5">
                  {c}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className={`${cell} col-span-1 p-5 flex flex-col gap-3 hover:bg-primary/[0.06]`}
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <f.icon size={15} className="text-primary" />
              </div>
              <div>
                <p className="text-white text-xs font-bold mb-1.5">{f.title}</p>
                <p className="text-white/40 text-xs leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default About;
