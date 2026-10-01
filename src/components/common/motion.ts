// Presets de animação compartilhados. `once` evita re-animar ao rolar de volta.
export const EASE = [0.16, 1, 0.3, 1] as const;

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -10% 0px" },
  transition: { duration: 0.8, ease: EASE },
};

export const stagger = (delayChildren = 0, staggerChildren = 0.07) => ({
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, margin: "0px 0px -10% 0px" },
  variants: { hidden: {}, show: { transition: { delayChildren, staggerChildren } } },
});

export const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
