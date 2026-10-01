import { motion } from "framer-motion";
import { useLang } from "@/lib/lang";
import SectionHeader from "./common/SectionHeader";
import { stagger, item } from "./common/motion";

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
        <SectionHeader align="center" label={t.hero.stack.label} title={t.hero.stack.title} />
        <motion.ul {...stagger(0, 0.04)} className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
          {stack.map((tool) => (
            <motion.li
              key={tool.name}
              variants={item}
              className="glass flex items-center gap-3 rounded-full py-2.5 pl-5 pr-2.5 transition-colors hover:border-primary/40"
            >
              <span className="font-medium">{tool.name}</span>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-primary">
                {tool.cat}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Stack;
