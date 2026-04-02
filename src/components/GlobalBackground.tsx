import { motion } from "framer-motion";

const FloatingParticles = () => {
  const particles = Array.from({ length: 40 }); // Aumentado para 40 para cobrir o site todo
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%" 
          }}
          animate={{ 
            opacity: [0, 0.3, 0],
            y: [null, (Math.random() - 0.5) * 400 + "px"],
            x: [null, (Math.random() - 0.5) * 200 + "px"],
          }}
          transition={{ 
            duration: Math.random() * 15 + 15, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute w-1 h-1 bg-primary/30 rounded-full blur-[1px]"
          style={{
            width: Math.random() * 3 + 1 + "px",
            height: Math.random() * 3 + 1 + "px",
          }}
        />
      ))}
    </div>
  );
};

const EnergyLines = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 opacity-80">
      <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <defs>
          <filter id="neon-glow-global" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="20" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Animated Wisp 1 */}
        <motion.path
          d="M -100 200 Q 300 100 500 400 T 1100 200"
          fill="transparent"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          strokeDasharray="150 250"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1], 
            opacity: [0, 0.3, 0],
            pathOffset: [0, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          filter="url(#neon-glow-global)"
        />

        {/* Animated Wisp 2 */}
        <motion.path
          d="M -100 800 Q 500 600 800 900 T 1100 700"
          fill="transparent"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          strokeDasharray="100 300"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1], 
            opacity: [0, 0.25, 0],
            pathOffset: [1, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          filter="url(#neon-glow-global)"
        />

        {/* Vertical Flow Global */}
        <motion.path
          d="M 200 -100 Q 400 500 100 900 T 300 1100"
          fill="transparent"
          stroke="hsl(var(--accent))"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1], 
            opacity: [0, 0.15, 0],
            pathOffset: [0, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          filter="url(#neon-glow-global)"
        />
      </svg>
    </div>
  );
};

const GlobalBackground = () => {
  return (
    <div className="fixed inset-0 z-0 bg-background pointer-events-none">
      <EnergyLines />
      <FloatingParticles />
      {/* Centralized Glowing Orbs for consistent depth */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none z-0" />
    </div>
  );
};

export default GlobalBackground;
