import { useEffect, useRef } from "react";

const FPS = 24;
const pad = (n: number) => String(n).padStart(2, "0");

const format = (elapsedMs: number) => {
  const totalFrames = Math.floor((elapsedMs / 1000) * FPS);
  const frames = totalFrames % FPS;
  const totalSeconds = Math.floor(totalFrames / FPS);
  return `${pad(Math.floor(totalSeconds / 3600))}:${pad(Math.floor(totalSeconds / 60) % 60)}:${pad(totalSeconds % 60)}:${pad(frames)}`;
};

// Timecode rodando a 24 fps desde que a página abriu. Atualiza o texto direto no
// DOM (sem re-render do React) e fica parado para quem prefere menos movimento.
const Timecode = ({ className }: { className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      if (ref.current) ref.current.textContent = format(now - start);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <span ref={ref} className={`font-mono tabular-nums ${className ?? ""}`}>
      00:00:00:00
    </span>
  );
};

export default Timecode;
