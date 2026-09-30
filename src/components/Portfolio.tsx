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
    <section id="portfolio" className="relative scroll-mt-16 py-20 sm:py-28">
      <div className="container">
        <SectionHeader
          track="V1"
          label={t.portfolio.label}
          title={t.portfolio.title}
          accent={t.portfolio.titleAccent}
          description={t.portfolio.description}
        />

        {/* Categorias */}
        <div className="-mx-5 mb-4 overflow-x-auto px-5 scrollbar-hide sm:mx-0 sm:px-0">
          <div role="tablist" aria-label={t.portfolio.label} className="flex w-max gap-1 rounded-full border border-line bg-surface/60 p-1">
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
                  className={`relative flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300 sm:px-5 ${
                    active ? "text-primary-foreground" : "text-foreground/65 hover:text-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="category-pill"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  )}
                  <span className="relative">{t.portfolio.categories[cat]}</span>
                  <span className={`relative font-mono text-[10px] ${active ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {String(countByCategory(cat)).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Clientes da categoria */}
        <div className="mb-10 flex flex-wrap items-center gap-2">
          {clientsWithAll.map((client) => {
            const active = activeClient === client.id;
            return (
              <button
                key={client.id}
                onClick={() => setActiveClient(client.id)}
                aria-pressed={active}
                className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-300 ${
                  active
                    ? "border-primary/70 bg-primary/10 text-primary"
                    : "border-foreground/10 text-foreground/60 hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                {client.logo && <img src={client.logo} alt="" className="h-4 w-4 rounded-full object-contain" />}
                {client.name}
              </button>
            );
          })}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("openBudgetModal"))}
            className="rounded-full border border-dashed border-primary/50 px-3.5 py-1.5 text-xs font-medium text-primary/80 transition-colors hover:border-primary hover:text-primary"
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
                  className="group block w-full text-left"
                  aria-label={`${client?.name ?? ""} — ${t.portfolio.categories[activeCategory]} ${idx + 1}`}
                >
                  <div className="relative aspect-[9/16] overflow-hidden rounded-md bg-gradient-to-br from-surface via-background to-primary/10 ring-1 ring-line transition-[box-shadow] duration-500 group-hover:ring-primary/70 group-hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.5)]">
                    <img
                      src={video.thumbnail ?? driveThumb(video.driveId)}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      onError={(e) => { e.currentTarget.style.opacity = "0"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-background/40" />

                    <span className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-wider text-foreground/80">
                      Clip {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="viewfinder absolute inset-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [--vf-size:14px]" />

                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.6)] transition-all duration-500 sm:scale-75 sm:opacity-0 sm:group-hover:scale-100 sm:group-hover:opacity-100">
                        <Play size={16} className="ml-0.5 fill-current" />
                      </span>
                    </span>

                    <span className="absolute inset-x-3 bottom-3 flex items-center gap-2">
                      {client?.logo && <img src={client.logo} alt="" className="h-5 w-5 shrink-0 rounded-full object-contain" />}
                      <span className="truncate text-xs font-semibold uppercase tracking-wide text-foreground">{client?.name}</span>
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
              className="flex aspect-[9/16] w-full flex-col items-center justify-center gap-3 rounded-md border border-dashed border-line text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
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
