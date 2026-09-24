import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
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
    <section id="portfolio" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="text-[10px] uppercase tracking-[0.35em] text-primary/50 font-bold mb-3 block">
            {t.portfolio.label}
          </span>
          <h2 className="font-impact text-5xl sm:text-6xl md:text-7xl leading-[0.9] tracking-wide mb-3">
            <span className="text-white">{t.portfolio.title}</span>
            <span className="text-primary drop-shadow-[0_0_20px_hsl(var(--primary)/0.4)]">{t.portfolio.titleAccent}</span>
          </h2>
          <p className="text-white/35 text-sm max-w-md">
            {t.portfolio.description}
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-5"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setActiveClient("all");
              }}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-background shadow-[0_0_16px_hsl(var(--primary)/0.4)]"
                  : "bg-primary/[0.04] text-white/50 border border-primary/15 hover:text-white hover:border-primary/35 hover:bg-primary/[0.08]"
              }`}
            >
              {t.portfolio.categories[cat]}
            </button>
          ))}
        </motion.div>

        {/* Client filters - scrollable row */}
        <AnimatePresence mode="wait">
          {filteredClients.length > 0 && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="relative mb-10"
            >
              <div className="flex items-center justify-center flex-wrap gap-2">
                {clientsWithAll.map((client) => (
                  <button
                    key={client.id}
                    onClick={() => setActiveClient(client.id)}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 border whitespace-nowrap ${
                      activeClient === client.id
                        ? "border-primary/60 text-primary bg-primary/10"
                        : "border-white/10 text-white/40 bg-transparent hover:text-white hover:border-white/30"
                    }`}
                  >
                    {client.logo && (
                      <img src={client.logo} alt="" className="w-4 h-4 object-contain rounded-full" />
                    )}
                    {client.name}
                  </button>
                ))}
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("openBudgetModal"))}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 border border-dashed border-primary/40 text-primary/70 hover:text-primary hover:border-primary whitespace-nowrap"
                >
                  {t.portfolio.yourBrand}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + activeClient}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {filteredVideos.map((video, idx) => {
              const client = clientById(video.clientId);
              return (
                <motion.div
                  key={`${video.clientId}-${video.driveId}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                >
                  <button
                    onClick={() => openVideo(video)}
                    className="w-full group/card text-left"
                  >
                    {/* Thumbnail — fundo de marca aparece caso a thumb do Drive falhe */}
                    <div className="relative rounded-xl overflow-hidden aspect-[9/16] mb-3 shadow-lg shadow-black/40 bg-gradient-to-br from-[#0c0c0c] via-[#0a1418] to-primary/10">
                      <img
                        src={video.thumbnail ?? driveThumb(video.driveId)}
                        alt={client?.name ?? ""}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                        onError={(e) => { e.currentTarget.style.opacity = "0"; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute inset-0 bg-primary/0 group-hover/card:bg-primary/10 transition-colors duration-300" />

                      {/* Play button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover/card:opacity-100 transition-opacity duration-300">
                        <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shadow-[0_0_24px_hsl(var(--primary)/0.6)] scale-90 group-hover/card:scale-100 transition-transform duration-300">
                          <Play size={15} className="fill-black text-black ml-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Info below card */}
                    <div className="flex items-center gap-2">
                      {client?.logo && (
                        <img src={client.logo} alt="" className="w-4 h-4 object-contain rounded-full flex-shrink-0" />
                      )}
                      <span className="text-white/50 text-[11px] font-semibold uppercase tracking-wide truncate group-hover/card:text-white/80 transition-colors duration-200">
                        {client?.name}
                      </span>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filteredVideos.length === 0 && (
          <div className="flex items-center justify-center py-32 text-white/20 uppercase tracking-[0.4em] font-black text-xs text-center">
            {t.portfolio.empty}
          </div>
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
