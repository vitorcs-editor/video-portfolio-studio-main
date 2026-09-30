// Fundo fixo do site: luz ciano vazando do topo, vinheta e granulação de película.
// Tudo estático (sem animação) — barato para a GPU e sem distrair do conteúdo.

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const Atmosphere = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    {/* Luz ciano no topo */}
    <div
      className="absolute -top-[30vh] left-1/2 h-[80vh] w-[120vw] -translate-x-1/2"
      style={{ background: "radial-gradient(closest-side, hsl(var(--primary) / 0.13), transparent)" }}
    />
    {/* Grade sutil de guias, como a tela de um editor */}
    <div
      className="absolute inset-0 opacity-[0.35]"
      style={{
        backgroundImage:
          "linear-gradient(hsl(var(--line) / 0.35) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--line) / 0.35) 1px, transparent 1px)",
        backgroundSize: "96px 96px",
        maskImage: "radial-gradient(ellipse at 50% 0%, black 10%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse at 50% 0%, black 10%, transparent 70%)",
      }}
    />
    {/* Vinheta */}
    <div
      className="absolute inset-0"
      style={{ background: "radial-gradient(ellipse at center, transparent 55%, hsl(var(--background) / 0.85) 100%)" }}
    />
    {/* Granulação */}
    <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
  </div>
);

export default Atmosphere;
