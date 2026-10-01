import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Plus } from "lucide-react";
import { useLang } from "@/lib/lang";
import {
  CATEGORIES,
  clients,
  videos,
  clientById,
  driveEmbed,
  driveThumb,
  type Video,
  type VideoCategory,
} from "@/data/portfolio";
import VideoModal from "./VideoModal";
import SectionHeader from "./common/SectionHeader";
import { EASE } from "./common/motion";
import { tiltHandlers } from "./common/useTilt";

const Portfolio = () => {
  const { t } = useLang();
  const [activeCategory, setActiveCategory] = useState<VideoCategory>("igaming");
  const [activeClient, setActiveClient] = useState<string>("all");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleSelectClient = (e: Event) => {
      const customEvent = e as CustomEvent<{ category: VideoCategory; client: string }>;
      setActiveCategory(customEvent.detail.category);
      setActiveClient(customEvent.detail.client);
      document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
    };
    window.addEventListener("selectClient", handleSelectClient);
    return () => window.removeEventListener("selectClient", handleSelectClient);
  }, []);

  const filteredClients = clients.filter((c) => c.niche === activeCategory);

  const countByCategory = (cat: VideoCategory) =>
    videos.filter((v) => clientById(v.clientId)?.niche === cat).length;

  const filteredVideos = videos.filter((v) => {
    if (activeClient !== "all") return v.clientId === activeClient;
    return clientById(v.clientId)?.niche === activeCategory;
  });

  const openVideo = (video: Video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const clientsWithAll: Array<{ id: string; name: string; logo?: string }> = [
    { id: "all", name: t.portfolio.allClients },
    ...filteredClients,
  ];

  return (
    <section id="portfolio" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container">
        <SectionHeader
          align="center"
          label={t.portfolio.label}
          title={t.portfolio.title}
          accent={t.portfolio.titleAccent}
          description={t.portfolio.description}
        />

        {/* Categorias */}
        <div className="-mx-5 mb-5 flex overflow-x-auto px-5 scrollbar-hide sm:mx-0 sm:justify-center sm:px-0">
          <div role="tablist" aria-label={t.portfolio.label} className="glass flex w-max gap-1 rounded-full p-1.5">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setActiveCategory(cat);
                    setActiveClient("all");
                  }}
                  className={`relative flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm transition-colors duration-300 sm:px-5 ${
                    active ? "font-semibold text-background" : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="category-pill"
                      className="absolute inset-0 rounded-full bg-white"
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  )}
                  <span className="relative">{t.portfolio.categories[cat]}</span>
                  <span className={`relative font-mono text-[10px] ${active ? "text-background/60" : "text-muted-foreground"}`}>
                    {countByCategory(cat)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Clientes da categoria */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {clientsWithAll.map((client) => {
            const active = activeClient === client.id;
            return (
              <button
                key={client.id}
                onClick={() => setActiveClient(client.id)}
                aria-pressed={active}
                className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium transition-colors duration-300 ${
                  active
                    ? "border-primary/60 bg-primary/10 text-primary"
                    : "border-white/10 bg-white/[0.03] text-foreground/65 hover:border-white/25 hover:text-foreground"
                }`}
              >
                {client.logo && <img src={client.logo} alt="" className="h-4 w-4 rounded-full object-contain" />}
                {client.name}
              </button>
            );
          })}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("openBudgetModal"))}
            className="rounded-full border border-dashed border-primary/50 px-3.5 py-2 text-xs font-medium text-primary/80 transition-colors hover:border-primary hover:text-primary"
          >
            ✦ {t.portfolio.yourBrand}
          </button>
        </div>

        {/* Grade de clipes */}
        <motion.ul
          key={activeCategory + activeClient}
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045 } } }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 xl:grid-cols-5"
        >
          {filteredVideos.map((video, idx) => {
            const client = clientById(video.clientId);
            return (
              <motion.li
                key={`${video.clientId}-${video.driveId}`}
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
              >
                <button
                  onClick={() => openVideo(video)}
                  data-cursor="play"
                  className="group block w-full text-left [perspective:900px]"
                  aria-label={`${client?.name ?? ""} — ${t.portfolio.categories[activeCategory]} ${idx + 1}`}
                >
                  <div
                    {...tiltHandlers}
                    style={{ transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))" }}
                    className="relative aspect-[9/16] overflow-hidden rounded-[20px] border border-white/10 bg-surface shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] transition-[border-color,box-shadow,transform] duration-300 ease-out [transform-style:preserve-3d] group-hover:border-primary/60 group-hover:shadow-[0_30px_80px_-20px_hsl(var(--primary)/0.45)]"
                  >
                    <img
                      src={video.thumbnail ?? driveThumb(video.driveId)}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      onError={(e) => { e.currentTarget.style.opacity = "0"; }}
                    />
                    {/* Reflexo de vidro no topo e escurecimento embaixo */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent via-30% to-background/85" />
                    {/* Brilho que acompanha o cursor */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{ background: "radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.22), transparent 55%)" }}
                    />

                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.7)] transition-all duration-500 sm:scale-75 sm:opacity-0 sm:group-hover:scale-100 sm:group-hover:opacity-100">
                        <Play size={16} className="ml-0.5 fill-current" />
                      </span>
                    </span>

                    <span className="absolute inset-x-3.5 bottom-3.5 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="truncate text-xs font-semibold text-white">{client?.name}</span>
                    </span>
                  </div>
                </button>
              </motion.li>
            );
          })}

          {/* Espaço reservado para o próximo cliente */}
          <motion.li variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="hidden sm:block">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("openBudgetModal"))}
              className="flex aspect-[9/16] w-full flex-col items-center justify-center gap-3 rounded-[20px] border border-dashed border-white/15 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
            >
              <Plus size={22} strokeWidth={1.5} />
              <span className="px-4 text-center text-xs font-medium">{t.portfolio.yourBrand}</span>
            </button>
          </motion.li>
        </motion.ul>

        {filteredVideos.length === 0 && (
          <p className="py-24 text-center font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">{t.portfolio.empty}</p>
        )}
      </div>

      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoUrl={selectedVideo ? driveEmbed(selectedVideo.driveId) : ""}
        title={selectedVideo ? clientById(selectedVideo.clientId)?.name ?? "" : ""}
        isVertical={!selectedVideo?.horizontal}
      />
    </section>
  );
};

export default Portfolio;
