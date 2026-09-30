import { motion } from "framer-motion";
import { useLang } from "@/lib/lang";
import { stagger, item } from "./common/motion";

// Faixa de números sobre uma régua de timeline — valores em t.hero.stats (lang.tsx)
const Numbers = () => {
  const { t } = useLang();
  const { label, items } = t.hero.stats;

  return (
    <section aria-label={label} className="relative">
      <div className="container">
        <div className="ruler opacity-80" />
        <motion.dl {...stagger()} className="grid grid-cols-2 border-b border-line/70 lg:grid-cols-4">
          {items.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={item}
              className={[
                "flex flex-col gap-3 border-line/70 py-8 sm:py-10",
                i % 2 === 1 && "border-l pl-5 sm:pl-8", // 2ª coluna no mobile
                i > 1 && "border-t lg:border-t-0", // 2ª linha no mobile
                i > 0 && "lg:border-l lg:pl-8", // divisórias no desktop
              ].filter(Boolean).join(" ")}
            >
              <dt className="order-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{stat.label}</dt>
              <dd className="order-1 font-display text-[clamp(3.5rem,7vw,6rem)] font-black leading-none text-primary">
                {stat.value}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
};

export default Numbers;
