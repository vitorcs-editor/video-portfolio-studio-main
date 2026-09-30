import { motion } from "framer-motion";
import { fadeUp } from "./motion";

interface SectionHeaderProps {
  /** Nome da trilha, como numa timeline: V1, V2, A1... */
  track: string;
  label: string;
  title: string;
  accent?: string;
  description?: string;
}

const SectionHeader = ({ track, label, title, accent, description }: SectionHeaderProps) => (
  <motion.div {...fadeUp} className="mb-12 sm:mb-16">
    <div className="mb-6 flex items-center gap-4">
      <span className="rounded-sm border border-primary/40 px-1.5 py-0.5 font-mono text-[10px] font-medium text-primary">
        {track}
      </span>
      <span className="label-mono">{label}</span>
      <span className="ruler flex-1 opacity-70" />
    </div>
    <h2 className="heading-display text-balance">
      {title}
      {accent && <span className="accent-serif"> {accent}</span>}
    </h2>
    {description && (
      <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">{description}</p>
    )}
  </motion.div>
);

export default SectionHeader;
