// Performance-optimised GlobalBackground
// Key changes:
//  - FloatingParticles: 40 individual Framer Motion nodes → 15 CSS-animated particles
//    using a single <style> block. Zero JS per-frame work.
//  - EnergyLines SVG: feGaussianBlur filter removed (GPU-expensive). Paths are now
//    lightweight CSS animations via stroke-dashoffset instead of Framer Motion.
//  - Glow orbs kept but without will-change (already composited via border-radius+blur).

import React from "react";

const GlobalBackground = () => {
  return (
    <div className="fixed inset-0 z-0 bg-background pointer-events-none">
      <style>{`
        @keyframes particle-float {
          0%   { transform: translate(0, 0);   opacity: 0; }
          10%  { opacity: 0.25; }
          90%  { opacity: 0.15; }
          100% { transform: translate(var(--tx), var(--ty)); opacity: 0; }
        }
        @keyframes wisp1 {
          0%   { stroke-dashoffset: 500; opacity: 0; }
          15%  { opacity: 0.3; }
          85%  { opacity: 0.25; }
          100% { stroke-dashoffset: 0;   opacity: 0; }
        }
        @keyframes wisp2 {
          0%   { stroke-dashoffset: -500; opacity: 0; }
          15%  { opacity: 0.2; }
          85%  { opacity: 0.15; }
          100% { stroke-dashoffset: 0;    opacity: 0; }
        }
        @keyframes wisp3 {
          0%   { stroke-dashoffset: 600; opacity: 0; }
          20%  { opacity: 0.15; }
          80%  { opacity: 0.1; }
          100% { stroke-dashoffset: 0;   opacity: 0; }
        }
        .gb-particle {
          position: absolute;
          border-radius: 50%;
          background: hsl(var(--primary) / 0.35);
          will-change: transform, opacity;
          animation: particle-float var(--dur) var(--delay) linear infinite;
        }
      `}</style>

      {/* Energy Lines — CSS-driven, no Framer Motion, no blur filter */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 opacity-70">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          {/* Wisp 1 */}
          <path
            d="M -100 200 Q 300 100 500 400 T 1100 200"
            fill="transparent"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
            strokeDasharray="150 250"
            style={{ animation: "wisp1 12s ease-in-out infinite" }}
          />
          {/* Wisp 2 */}
          <path
            d="M -100 800 Q 500 600 800 900 T 1100 700"
            fill="transparent"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            strokeDasharray="100 300"
            style={{ animation: "wisp2 18s ease-in-out 3s infinite" }}
          />
          {/* Vertical Flow */}
          <path
            d="M 200 -100 Q 400 500 100 900 T 300 1100"
            fill="transparent"
            stroke="hsl(var(--accent))"
            strokeWidth="1"
            strokeDasharray="80 400"
            style={{ animation: "wisp3 25s linear infinite" }}
          />
        </svg>
      </div>

      {/* Floating Particles — 15 CSS-only, no Framer Motion overhead */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {([
          { x:"5%",  y:"12%", w:2,   h:2,   dur:"22s", delay:"0s",    tx:"80px",   ty:"-120px" },
          { x:"18%", y:"55%", w:1.5, h:1.5, dur:"28s", delay:"4s",    tx:"-60px",  ty:"150px"  },
          { x:"34%", y:"28%", w:2.5, h:2.5, dur:"19s", delay:"8s",    tx:"100px",  ty:"80px"   },
          { x:"47%", y:"70%", w:1,   h:1,   dur:"24s", delay:"2s",    tx:"-40px",  ty:"-100px" },
          { x:"60%", y:"15%", w:2,   h:2,   dur:"31s", delay:"11s",   tx:"60px",   ty:"200px"  },
          { x:"73%", y:"82%", w:1.5, h:1.5, dur:"20s", delay:"6s",    tx:"-80px",  ty:"-60px"  },
          { x:"85%", y:"42%", w:3,   h:3,   dur:"26s", delay:"15s",   tx:"40px",   ty:"120px"  },
          { x:"92%", y:"8%",  w:1,   h:1,   dur:"17s", delay:"3s",    tx:"-100px", ty:"80px"   },
          { x:"10%", y:"88%", w:2,   h:2,   dur:"33s", delay:"9s",    tx:"120px",  ty:"-80px"  },
          { x:"25%", y:"45%", w:1.5, h:1.5, dur:"21s", delay:"13s",   tx:"-30px",  ty:"-140px" },
          { x:"52%", y:"35%", w:2,   h:2,   dur:"29s", delay:"7s",    tx:"90px",   ty:"60px"   },
          { x:"65%", y:"60%", w:1,   h:1,   dur:"23s", delay:"17s",   tx:"-70px",  ty:"100px"  },
          { x:"78%", y:"25%", w:2.5, h:2.5, dur:"18s", delay:"1s",    tx:"50px",   ty:"-90px"  },
          { x:"40%", y:"90%", w:1,   h:1,   dur:"27s", delay:"5s",    tx:"-90px",  ty:"-50px"  },
          { x:"88%", y:"68%", w:2,   h:2,   dur:"16s", delay:"10s",   tx:"30px",   ty:"110px"  },
        ] as const).map((p, i) => (
          <div
            key={i}
            className="gb-particle"
            style={{
              left: p.x,
              top: p.y,
              width: p.w + "px",
              height: p.h + "px",
              "--dur": p.dur,
              "--delay": p.delay,
              "--tx": p.tx,
              "--ty": p.ty,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Glow orbs — static gradients, GPU-composited naturally */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none z-0" />
    </div>
  );
};

export default GlobalBackground;
