import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

// Cursor personalizado: ponto ciano preciso + anel que segue com atraso.
// O anel cresce sobre links/botões e vira um botão "Play" sobre elementos com
// data-cursor="play". Só aparece com mouse (não em toque) e sem "reduzir movimento".
const CustomCursor = () => {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<"default" | "hover" | "play">("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("custom-cursor");

    const pos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      setVisible(true);
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element | null;
      if (el?.closest('[data-cursor="play"]')) setMode("play");
      else if (el?.closest("a, button, [role='tab'], label, input, textarea")) setMode("hover");
      else setMode("default");
    };

    const onLeave = () => setVisible(false);

    // O anel persegue o ponto com suavização (lerp) a cada quadro
    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18;
      ringPos.y += (pos.y - ringPos.y) * 0.18;
      if (ring.current) ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    frame = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  const ringSize = mode === "play" ? 84 : mode === "hover" ? 52 : 34;

  return (
    <div aria-hidden className={`custom-cursor-layer pointer-events-none fixed inset-0 z-[200] transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}>
      <div ref={ring} className="absolute left-0 top-0 will-change-transform">
        <div
          className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-300 ease-out ${
            mode === "play"
              ? "border-primary bg-primary text-primary-foreground shadow-[0_0_40px_hsl(var(--primary)/0.6)]"
              : mode === "hover"
                ? "border-primary/80 bg-primary/10"
                : "border-white/40"
          }`}
          style={{ width: ringSize, height: ringSize }}
        >
          {mode === "play" && (
            <span className="flex items-center gap-1 text-xs font-semibold">
              <Play size={12} className="fill-current" /> Play
            </span>
          )}
        </div>
      </div>
      <div ref={dot} className="absolute left-0 top-0 will-change-transform">
        <div className={`h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-opacity ${mode === "play" ? "opacity-0" : ""}`} />
      </div>
    </div>
  );
};

export default CustomCursor;
