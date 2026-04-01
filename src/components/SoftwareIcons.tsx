import { motion } from "framer-motion";

const SoftwareIcons = () => {
  const software = [
    {
      name: "After Effects",
      abbr: "Ae",
      color: "#9999FF",
      bgColor: "rgba(153, 153, 255, 0.15)",
    },
    {
      name: "Premiere Pro",
      abbr: "Pr",
      color: "#EA77FF",
      bgColor: "rgba(234, 119, 255, 0.15)",
    },
    {
      name: "Photoshop",
      abbr: "Ps",
      color: "#31A8FF",
      bgColor: "rgba(49, 168, 255, 0.15)",
    },
    {
      name: "Illustrator",
      abbr: "Ai",
      color: "#FF9A00",
      bgColor: "rgba(255, 154, 0, 0.15)",
    },
  ];

  return (
    <div className="flex items-center gap-4">
      {software.map((item, index) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
          className="group relative"
        >
          <div
            className="w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 border border-transparent hover:border-white/10 hover:scale-110"
            style={{ backgroundColor: item.bgColor }}
          >
            <span
              className="font-display text-base font-bold"
              style={{ color: item.color }}
            >
              {item.abbr}
            </span>
          </div>
          {/* Tooltip */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-10">
            {item.name}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SoftwareIcons;
