import { useLang } from "@/lib/lang";
import type { VideoCategory } from "@/data/portfolio";

interface ClientClip {
  name: string;
  logo: string;
  clientId: string;
  category: VideoCategory;
  logoClass?: string;
}

const CLIPS: ClientClip[] = [
  { name: "Group Phoenix", logo: "/fenix-logo.png", clientId: "fenix_ads", category: "ads" },
  { name: "Projeto Draft", logo: "/icons/projeto-draft.webp", clientId: "projeto_draft", category: "social" },
  { name: "1pra1.bet", logo: "/icons/1pra1.png", clientId: "1pra1_bet", category: "igaming", logoClass: "max-h-[55%]" },
  { name: "Cruzeiro Basquete", logo: "/icons/cruzeiro-basquete.webp", clientId: "cruzeiro_basquete", category: "social", logoClass: "mix-blend-lighten" },
];

const selectClient = (clip: ClientClip) =>
  window.dispatchEvent(new CustomEvent("selectClient", { detail: { category: clip.category, client: clip.clientId } }));

// Clientes como clipes numa trilha da timeline, rolando sem parar
const Clients = () => {
  const { t } = useLang();
  // Repetido 4x para a faixa nunca ficar vazia em telas largas; a animação anda 50%.
  const track = [...CLIPS, ...CLIPS, ...CLIPS, ...CLIPS];

  return (
    <section aria-label={t.hero.clients} className="relative py-10 sm:py-14">
      <div className="container mb-4 flex items-center gap-4">
        <span className="rounded-sm border border-primary/40 px-1.5 py-0.5 font-mono text-[10px] font-medium text-primary">A1</span>
        <span className="label-mono">{t.hero.clients}</span>
      </div>

      <div className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <ul className="flex w-max animate-marquee gap-2 group-hover:[animation-play-state:paused]">
          {track.map((clip, i) => (
            <li key={i} aria-hidden={i >= CLIPS.length}>
              <button
                onClick={() => selectClient(clip)}
                tabIndex={i >= CLIPS.length ? -1 : 0}
                className="relative flex h-20 w-56 items-center gap-4 overflow-hidden rounded-sm border border-line bg-surface/70 pl-4 pr-5 text-left transition-colors hover:border-primary/60 hover:bg-primary/[0.06] sm:h-24 sm:w-64"
              >
                {/* Borda esquerda do "clipe" */}
                <span className="absolute inset-y-0 left-0 w-1 bg-primary/70" />
                <span className="flex h-12 w-12 shrink-0 items-center justify-center">
                  <img src={clip.logo} alt="" className={`max-h-full max-w-full object-contain ${clip.logoClass ?? ""}`} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-foreground">{clip.name}</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{t.portfolio.categories[clip.category]}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Clients;
