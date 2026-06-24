import { motion } from "framer-motion";
import { useLang } from "@/lib/lang";

// Stack de produção — chips com nome da ferramenta + tag de categoria (estilo "stack")
const Stack = () => {
  const { t } = useLang();
  const c = t.hero.stack.categories;
  const stack = [
    { name: "Higgsfield AI", cat: c.ia },
    { name: "ElevenLabs", cat: c.ia },
    { name: "Claude / ChatGPT", cat: c.ia },
    { name: "Premiere Pro", cat: c.edicao },
    { name: "After Effects", cat: c.motion },
    { name: "CapCut", cat: c.edicao },
    { name: "YouTube Studio", cat: c.analise },
    { name: "Meta Business Suite", cat: c.analise },
    { name: "Canva Pro", cat: c.design },
  ];

  return (
    <section id="stack" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="text-[10px] uppercase tracking-[0.35em] text-primary/60 font-bold mb-3 block">
            {t.hero.stack.label}
          </span>
          <h2 className="font-impact text-5xl sm:text-6xl md:text-7xl leading-[0.9] tracking-wide text-white">
            {t.hero.stack.title}
          </h2>
        </motion.div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {stack.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group flex items-center gap-2.5 pl-3.5 pr-2 py-2.5 rounded-xl border border-primary/15 bg-primary/[0.03] backdrop-blur-md cursor-default transition-all duration-300 hover:border-primary/40 hover:bg-primary/[0.07] hover:shadow-[0_0_18px_hsl(var(--primary)/0.15)]"
            >
              <span className="text-xs sm:text-sm font-medium text-white/85 group-hover:text-white transition-colors whitespace-nowrap">
                {item.name}
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wide text-primary bg-primary/[0.12] border border-primary/20 rounded-md px-1.5 py-0.5 group-hover:bg-primary/20 transition-colors">
                {item.cat}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Stack;
