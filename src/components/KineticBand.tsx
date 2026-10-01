import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "@/lib/lang";

// Faixa de texto gigante que desliza conforme a página rola: uma linha cheia
// para um lado e uma linha só com contorno para o outro.
const KineticBand = () => {
  const { t } = useLang();
  const { edicao, ia } = t.hero.stack.categories;
  const WORDS = [edicao, "Motion", "VSL", "iGaming", "Ads", "Color", "Social", ia];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const left = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const right = useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]);

  // A linha de contorno começa no meio da lista para não ficar alinhada com a de cima
  const shifted = [...WORDS.slice(4), ...WORDS.slice(0, 4)];
  const row = (outline: boolean) =>
    [...(outline ? shifted : WORDS), ...(outline ? shifted : WORDS)].map((word, i) => (
      <span key={i} className="flex items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
        <span className={outline ? "text-transparent [-webkit-text-stroke:1.5px_hsl(var(--primary)/0.6)]" : "text-foreground"}>{word}</span>
        <span className="text-[0.5em] text-primary">✦</span>
      </span>
    ));

  return (
    <div ref={ref} aria-hidden className="relative overflow-hidden py-10 sm:py-16">
      <div className="-rotate-2 select-none text-[clamp(3rem,9vw,8rem)] font-semibold leading-[1.05] tracking-[-0.05em]">
        <motion.div style={{ x: left }} className="flex w-max whitespace-nowrap">{row(false)}</motion.div>
        <motion.div style={{ x: right }} className="flex w-max whitespace-nowrap">{row(true)}</motion.div>
      </div>
    </div>
  );
};

export default KineticBand;
