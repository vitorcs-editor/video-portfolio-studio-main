import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/lib/lang";
import VideoModal from "./VideoModal";

type VideoCategory = "igaming" | "vsl" | "motion" | "ads" | "social";

interface Client {
  id: string;
  name: string;
  logo?: string;
  niche: VideoCategory;
}

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  category: VideoCategory;
  clientId: string;
  views: string;
  isVertical?: boolean;
}

const Portfolio = () => {
  const { t } = useLang();
  const [activeCategory, setActiveCategory] = useState<VideoCategory>("igaming");
  const [activeClient, setActiveClient] = useState<string>("all");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const clientScrollRef = useRef<HTMLDivElement>(null);

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

  const categories: { id: VideoCategory; label: string }[] = [
    { id: "igaming", label: t.portfolio.categories.igaming },
    { id: "vsl", label: t.portfolio.categories.vsl },
    { id: "motion", label: t.portfolio.categories.motion },
    { id: "ads", label: t.portfolio.categories.ads },
    { id: "social", label: t.portfolio.categories.social },
  ];

  const clients: Client[] = [
    { id: "fenix_ads", name: "Group Phoenix", niche: "ads", logo: "https://groupphoenixmediabuyer.com/images/favicon.png" },
    { id: "fenix_vsl", name: "Group Phoenix", niche: "vsl", logo: "https://groupphoenixmediabuyer.com/images/favicon.png" },
    { id: "1pra1_bet", name: "1pra1.bet", niche: "igaming", logo: "https://www.google.com/s2/favicons?domain=1pra1.bet.br&sz=128" },
    { id: "projeto_draft", name: "Projeto Draft", niche: "social", logo: "/projeto-draft-logo.png" },
    { id: "cruzeiro_basquete", name: "Cruzeiro Basquete", niche: "social", logo: "/cruzeiro-basquete-logo.png.png" },
  ];

  const videos: Video[] = [
    {
      id: "1pra1_1",
      title: "1pra1.bet",
      thumbnail: "https://img.youtube.com/vi/Or1IyfXaG84/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/Or1IyfXaG84?autoplay=1&rel=0&modestbranding=1&vq=hd1080&hd=1",
      category: "igaming",
      clientId: "1pra1_bet",
      views: "0",
      isVertical: true,
    },
    {
      id: "1pra1_2",
      title: "1pra1.bet",
      thumbnail: "https://img.youtube.com/vi/-h3PymgpBD0/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/-h3PymgpBD0?autoplay=1&rel=0&modestbranding=1&vq=hd1080&hd=1",
      category: "igaming",
      clientId: "1pra1_bet",
      views: "0",
      isVertical: true,
    },
    {
      id: "1pra1_3",
      title: "1pra1.bet",
      thumbnail: "https://img.youtube.com/vi/3Z-F-Mwy_Go/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/3Z-F-Mwy_Go?autoplay=1&rel=0&modestbranding=1&vq=hd1080&hd=1",
      category: "igaming",
      clientId: "1pra1_bet",
      views: "0",
      isVertical: true,
    },
    {
      id: "1pra1_4",
      title: "1pra1.bet",
      thumbnail: "https://img.youtube.com/vi/WhNxarVRM-w/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/WhNxarVRM-w?autoplay=1&rel=0&modestbranding=1&vq=hd1080&hd=1",
      category: "igaming",
      clientId: "1pra1_bet",
      views: "0",
      isVertical: true,
    },
    {
      id: "1pra1_5",
      title: "1pra1.bet",
      thumbnail: "https://img.youtube.com/vi/0dcQ6RA_blc/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/0dcQ6RA_blc?autoplay=1&rel=0&modestbranding=1&vq=hd1080&hd=1",
      category: "igaming",
      clientId: "1pra1_bet",
      views: "0",
      isVertical: true,
    },
    {
      id: "1pra1_6",
      title: "1pra1.bet",
      thumbnail: "https://img.youtube.com/vi/_1ZlsFqz8HI/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/_1ZlsFqz8HI?autoplay=1&rel=0&modestbranding=1&vq=hd1080&hd=1",
      category: "igaming",
      clientId: "1pra1_bet",
      views: "0",
      isVertical: true,
    },
    {
      id: "1pra1_7",
      title: "1pra1.bet",
      thumbnail: "https://img.youtube.com/vi/boclK_OtPQs/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/boclK_OtPQs?autoplay=1&rel=0&modestbranding=1&vq=hd1080&hd=1",
      category: "igaming",
      clientId: "1pra1_bet",
      views: "0",
      isVertical: true,
    },
    {
      id: "cruzeiro_basquete_1",
      title: "Cruzeiro Basquete",
      thumbnail: "https://img.youtube.com/vi/3IDSKdXrdoc/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/3IDSKdXrdoc?autoplay=1&rel=0&modestbranding=1&vq=hd1080&hd=1",
      category: "social",
      clientId: "cruzeiro_basquete",
      views: "0",
      isVertical: true,
    },
    {
      id: "cruzeiro_basquete_2",
      title: "Cruzeiro Basquete",
      thumbnail: "https://img.youtube.com/vi/Vjp0SXDlFRk/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/Vjp0SXDlFRk?autoplay=1&rel=0&modestbranding=1&vq=hd1080&hd=1",
      category: "social",
      clientId: "cruzeiro_basquete",
      views: "0",
      isVertical: true,
    },
    {
      id: "cruzeiro_basquete_3",
      title: "Cruzeiro Basquete",
      thumbnail: "https://img.youtube.com/vi/utj4E2h1qEA/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/utj4E2h1qEA?autoplay=1&rel=0&modestbranding=1&vq=hd1080&hd=1",
      category: "social",
      clientId: "cruzeiro_basquete",
      views: "0",
      isVertical: true,
    },
  ];

  const filteredClients = clients.filter((c) => c.niche === activeCategory);

  const filteredVideos = videos.filter((v) => {
    const categoryMatch = v.category === activeCategory;
    const clientMatch = activeClient === "all" || v.clientId === activeClient;
    return categoryMatch && clientMatch;
  });

  const openVideo = (video: Video) => {
    if (video.videoUrl !== "#") {
      setSelectedVideo(video);
      setIsModalOpen(true);
    }
  };

  const clientsWithAll: Array<{ id: string; name: string; logo?: string }> = [
    { id: "all", name: "Todos" },
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
          className="text-center mb-10"
        >
          <span className="text-[10px] uppercase tracking-[0.35em] text-primary/50 font-bold mb-3 block">
            Showcase Recente
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none mb-3">
            Trabalhos{" "}
            <span className="text-primary drop-shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
              Selecionados
            </span>
          </h2>
          <p className="text-white/35 text-sm max-w-sm mx-auto">
            Uma selecao de producoes recentes sob medida. Clique no card para assistir ao projeto.
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
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setActiveClient("all");
              }}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-primary text-black shadow-[0_0_16px_hsl(var(--primary)/0.4)]"
                  : "bg-white/5 text-white/50 border border-white/10 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat.label}
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
              <div
                ref={clientScrollRef}
                className="flex items-center justify-center flex-wrap gap-2"
              >
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
                  ✦ Pode ser voce
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
              const client = clients.find((c) => c.id === video.clientId);
              return (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                >
                  <button
                    onClick={() => openVideo(video)}
                    className="w-full group/card text-left"
                  >
                    {/* Thumbnail */}
                    <div className="relative rounded-xl overflow-hidden aspect-[9/16] mb-3 shadow-lg shadow-black/40">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
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
                        {client?.name ?? video.title}
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
            Nenhum projeto nesta categoria
          </div>
        )}

      </div>

      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoUrl={selectedVideo?.videoUrl || ""}
        title={selectedVideo?.title || ""}
        isVertical={selectedVideo?.isVertical}
      />
    </section>
  );
};

export default Portfolio;
