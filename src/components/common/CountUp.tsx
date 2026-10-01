import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

// Conta de 0 até o número do texto (ex.: "10M+" → 0…10, mantendo "M+")
// quando entra na tela. Sem número no texto, mostra o texto como está.
const CountUp = ({ value, className }: { value: string; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const match = value.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/);

  useEffect(() => {
    if (!inView || !match || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = parseFloat(match[2].replace(",", "."));
    const node = ref.current;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => { node.textContent = String(Math.round(v)); },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (!match) return <span className={className}>{value}</span>;
  return (
    <span className={className}>
      {match[1]}
      <span ref={ref} className="tabular-nums">{match[2]}</span>
      {match[3]}
    </span>
  );
};

export default CountUp;
