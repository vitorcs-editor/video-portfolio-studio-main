import { motion } from "framer-motion";
import { useLang } from "@/lib/lang";
import SectionHeader from "./common/SectionHeader";
import { fadeUp, stagger, item } from "./common/motion";

const clients = ["1pra1.bet", "Cruzeiro Basquete", "Group Phoenix", "Projeto Draft"];

const About = () => {
  const { t } = useLang();

  return (
    <section id="sobre" className="relative scroll-mt-16 py-20 sm:py-28">
      <div className="container">
        <SectionHeader track="V3" label={t.about.label} title={t.about.title} accent={t.about.titleAccent} />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Foto no visor */}
          <motion.figure {...fadeUp} className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-md ring-1 ring-line">
              <img
                src="/vitor-hero.webp"
                alt={t.about.photoAlt}
                loading="lazy"
                className="h-full w-full object-cover grayscale-[35%] transition-[filter] duration-700 hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="viewfinder absolute inset-4" />
              <div className="absolute inset-x-6 top-6 flex justify-between font-mono text-[10px] uppercase tracking-wider text-foreground/80">
                <span>ISO 800</span>
                <span>f/1.8</span>
              </div>
              <figcaption className="absolute inset-x-6 bottom-6">
                <span className="font-display text-4xl font-black uppercase leading-none">Vitor Carvalho</span>
              </figcaption>
            </div>
          </motion.figure>

          {/* Texto */}
          <div className="lg:col-span-7">
            <motion.p {...fadeUp} className="font-serif text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.25] text-foreground/90">
              {t.about.bio}
            </motion.p>

            <motion.div {...fadeUp} className="mt-10">
              <span className="label-mono">{t.about.clientsLabel}</span>
              <ul className="mt-4 flex flex-wrap gap-2">
                {clients.map((c) => (
                  <li key={c} className="rounded-full border border-foreground/10 px-3.5 py-1.5 text-sm text-foreground/80">
                    {c}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.ul {...stagger()} className="mt-12 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
              {t.about.features.map((f, i) => (
                <motion.li key={f.title} variants={item} className="bg-background p-6">
                  <span className="font-mono text-[10px] text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-base font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
