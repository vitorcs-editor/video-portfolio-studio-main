import { motion } from "framer-motion";
import { EASE } from "./motion";

interface Segment {
  text: string;
  className?: string;
}

interface SplitRevealProps {
  segments: Segment[];
  /** "load" anima ao abrir a página (hero); "view" anima ao rolar até o texto. */
  trigger?: "load" | "view";
  delay?: number;
}

const WORD = {
  hidden: { opacity: 0, y: "0.35em", filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
};

// Revela o texto palavra por palavra, saindo do desfoque. Cada palavra é um
// <span> próprio, então classes como text-gradient se aplicam por palavra.
const SplitReveal = ({ segments, trigger = "view", delay = 0 }: SplitRevealProps) => {
  const play = trigger === "load" ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <motion.span
      initial="hidden"
      {...play}
      variants={{ hidden: {}, show: { transition: { delayChildren: delay, staggerChildren: 0.06 } } }}
    >
      {segments.map((segment, s) => {
        // Trechos em degradê entram como um bloco só: dividir em palavras faria
        // o degradê recomeçar em cada palavra.
        if (segment.className?.includes("text-gradient")) {
          return (
            <motion.span key={s} className={`inline-block ${segment.className}`} variants={WORD}>
              {segment.text}
            </motion.span>
          );
        }
        return (
          <span key={s} className={segment.className}>
            {segment.text.split(/(\s+)/).map((word, w) =>
              /^\s*$/.test(word) ? word : (
                <motion.span key={w} className="inline-block" variants={WORD}>
                  {word}
                </motion.span>
              ),
            )}
          </span>
        );
      })}
    </motion.span>
  );
};

export default SplitReveal;
