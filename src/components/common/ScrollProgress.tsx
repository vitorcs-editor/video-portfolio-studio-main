import { motion, useScroll, useSpring } from "framer-motion";

// Linha ciano no topo que mostra quanto da página já foi lido
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-primary/40 via-primary to-[hsl(var(--primary-soft))] shadow-[0_0_12px_hsl(var(--primary))]"
    />
  );
};

export default ScrollProgress;
