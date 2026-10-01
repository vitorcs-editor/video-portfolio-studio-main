import { useLang } from "@/lib/lang";
import type { VideoCategory } from "@/data/portfolio";

interface ClientLogo {
  name: string;
  logo: string;
  clientId: string;
  category: VideoCategory;
}

const LOGOS: ClientLogo[] = [
  { name: "Group Phoenix", logo: "/fenix-logo.png", clientId: "fenix_ads", category: "ads" },
  { name: "Projeto Draft", logo: "/icons/projeto-draft.webp", clientId: "projeto_draft", category: "social" },
  { name: "1pra1.bet", logo: "/icons/1pra1.png", clientId: "1pra1_bet", category: "igaming" },
  { name: "Cruzeiro Basquete", logo: "/icons/cruzeiro-basquete.webp", clientId: "cruzeiro_basquete", category: "social" },
];

const selectClient = (logo: ClientLogo) =>
  window.dispatchEvent(new CustomEvent("selectClient", { detail: { category: logo.category, client: logo.clientId } }));

// Faixa de logos de clientes rolando sem parar; clicar leva ao portfólio filtrado
const Clients = () => {
  const { t } = useLang();
  const track = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <section aria-label={t.hero.clients} className="relative py-12 sm:py-16">
      <p className="mb-8 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {t.about.clientsLabel}
      </p>
      <div className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <ul className="flex w-max animate-marquee items-center gap-4 group-hover:[animation-play-state:paused]">
          {track.map((logo, i) => (
            <li key={i} aria-hidden={i >= LOGOS.length}>
              <button
                onClick={() => selectClient(logo)}
                tabIndex={i >= LOGOS.length ? -1 : 0}
                className="glass group/logo flex h-16 items-center gap-3 rounded-2xl px-6 text-sm font-medium text-foreground/60 transition-colors hover:border-primary/40 hover:text-foreground sm:h-[72px]"
              >
                <img src={logo.logo} alt="" className="h-8 w-8 object-contain opacity-80 grayscale transition-all duration-300 group-hover/logo:opacity-100 group-hover/logo:grayscale-0" />
                {logo.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Clients;
