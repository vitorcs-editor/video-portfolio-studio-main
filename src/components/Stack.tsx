import { motion } from "framer-motion";
import { useLang } from "@/lib/lang";
import SectionHeader from "./common/SectionHeader";
import { stagger, item } from "./common/motion";

// Ferramentas como uma lista de trilhas: nome à esquerda, categoria à direita
const Stack = () => {
  const { t } = useLang();
  const c = t.hero.stack.categories;
  const stack = [
    { name: "Premiere Pro", cat: c.edicao },
    { name: "After Effects", cat: c.motion },
    { name: "CapCut", cat: c.edicao },
    { name: "Higgsfield AI", cat: c.ia },
    { name: "ElevenLabs", cat: c.ia },
    { name: "Claude / ChatGPT", cat: c.ia },
    { name: "YouTube Studio", cat: c.analise },
    { name: "Meta Business Suite", cat: c.analise },
    { name: "Canva Pro", cat: c.design },
  ];

  return (
    <section id="stack" className="relative py-20 sm:py-28">
      <div className="container">
        <SectionHeader track="A2" label={t.hero.stack.label} title={t.hero.stack.title} />

        <motion.ul {...stagger(0, 0.04)} className="grid border-t border-line sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3">
          {stack.map((tool) => (
            <motion.li
              key={tool.name}
              variants={item}
              className="group flex items-center justify-between gap-4 border-b border-line py-5"
            >
              <span className="text-lg font-medium text-foreground/90 transition-colors group-hover:text-primary">{tool.name}</span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{tool.cat}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Stack;
