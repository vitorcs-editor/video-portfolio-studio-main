import { motion } from "framer-motion";
import { fadeUp } from "./motion";
import SplitReveal from "./SplitReveal";

interface SectionHeaderProps {
  label: string;
  title: string;
  accent?: string;
  description?: string;
  align?: "left" | "center";
}

const SectionHeader = ({ label, title, accent, description, align = "left" }: SectionHeaderProps) => (
  <motion.div {...fadeUp} className={`mb-12 sm:mb-16 ${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
    <span className="eyebrow">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {label}
    </span>
    <h2 className="heading mt-6">
      <SplitReveal segments={[{ text: title }, ...(accent ? [{ text: ` ` }, { text: accent, className: "text-gradient" }] : [])]} delay={0.15} />
    </h2>
    {description && (
      <p className={`mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg ${align === "center" ? "mx-auto" : ""}`}>
        {description}
      </p>
    )}
  </motion.div>
);

export default SectionHeader;
