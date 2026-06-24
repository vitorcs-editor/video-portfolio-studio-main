import { motion } from "framer-motion";
import { useLang } from "@/lib/lang";

// Seção de Números / prova social — valores em t.hero.stats (editáveis no lang.tsx)
const Stats = () => {
  const { t } = useLang();
  const { label, title, titleAccent, items } = t.hero.stats;

  return (
    <section id="numeros" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="text-[10px] uppercase tracking-[0.35em] text-primary/60 font-bold mb-3 block">
            {label}
          </span>
          <h2 className="font-impact text-5xl sm:text-6xl md:text-7xl leading-[0.9] tracking-wide">
            <span className="text-white">{title}</span>
            <span className="text-primary drop-shadow-[0_0_20px_hsl(var(--primary)/0.4)]">{titleAccent}</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {items.map((item) => (
            <motion.div
              key={item.label}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="relative rounded-2xl border border-primary/15 bg-primary/[0.03] p-6 sm:p-7 flex flex-col justify-center transition-all duration-300 hover:border-primary/35 hover:bg-primary/[0.06]"
            >
              <div className="font-impact text-5xl sm:text-6xl md:text-7xl text-primary drop-shadow-[0_0_30px_hsl(var(--primary)/0.35)] leading-none tracking-wide">
                {item.value}
              </div>
              <div className="text-white/45 text-xs sm:text-sm font-medium mt-3 uppercase tracking-wide">
                {item.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Stats;
