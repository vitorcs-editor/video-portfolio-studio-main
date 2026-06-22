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

// Monta a URL de player do Google Drive a partir do ID do arquivo.
// O arquivo precisa estar compartilhado como "Qualquer pessoa com o link".
const driveEmbed = (fileId: string) =>
  `https://drive.google.com/file/d/${fileId}/preview`;

// Monta a URL da thumbnail do Google Drive a partir do ID do arquivo.
const driveThumb = (fileId: string) =>
  `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;

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
    { id: "1pra1_motion", name: "1pra1.bet", niche: "motion", logo: "https://www.google.com/s2/favicons?domain=1pra1.bet.br&sz=128" },
    { id: "projeto_draft", name: "Projeto Draft", niche: "social", logo: "/projeto-draft-logo.png" },
    { id: "cruzeiro_basquete", name: "Cruzeiro Basquete", niche: "social", logo: "/cruzeiro-basquete-logo.png.png" },
  ];

  const videos: Video[] = [
    {
      id: "1pra1_1",
      title: "1pra1.bet",
      thumbnail: driveThumb("1gxFfZL1jyYny5WEJPxwIfQumCaDR_dbZ"),
      videoUrl: driveEmbed("1gxFfZL1jyYny5WEJPxwIfQumCaDR_dbZ"),
      category: "igaming",
      clientId: "1pra1_bet",
      views: "0",
      isVertical: true,
    },
    {
      id: "1pra1_2",
      title: "1pra1.bet",
      thumbnail: driveThumb("1T2lqpfZJtG-8BJ77NRHS-xALPwEPHVm5"),
      videoUrl: driveEmbed("1T2lqpfZJtG-8BJ77NRHS-xALPwEPHVm5"),
      category: "igaming",
      clientId: "1pra1_bet",
      views: "0",
      isVertical: true,
    },
    {
      id: "1pra1_3",
      title: "1pra1.bet",
      thumbnail: driveThumb("129Ah3ujYY2wDrBXzEAixUyGw59I0Sbiq"),
      videoUrl: driveEmbed("129Ah3ujYY2wDrBXzEAixUyGw59I0Sbiq"),
      category: "igaming",
      clientId: "1pra1_bet",
      views: "0",
      isVertical: true,
    },
    {
      id: "1pra1_motion_1",
      title: "1pra1.bet",
      thumbnail: driveThumb("1HxAy5GdGXdRGFpTlnHmfcQTJCF59yvIJ"),
      videoUrl: driveEmbed("1HxAy5GdGXdRGFpTlnHmfcQTJCF59yvIJ"),
      category: "motion",
      clientId: "1pra1_motion",
      views: "0",
      isVertical: true,
    },
    {
      id: "1pra1_motion_2",
      title: "1pra1.bet",
      thumbnail: driveThumb("1_g_Xj61kaQr2XP3FSTKclo12nNJOUBCZ"),
      videoUrl: driveEmbed("1_g_Xj61kaQr2XP3FSTKclo12nNJOUBCZ"),
      category: "motion",
      clientId: "1pra1_motion",
      views: "0",
      isVertical: true,
    },
    {
      id: "projeto_draft_1",
      title: "Projeto Draft",
      thumbnail: "/ruzeiro-basquete-thumb.jpg.png",
      videoUrl: driveEmbed("1TmmeqsfNGqqG-ICzzqHvytNQ3Vw37FSo"),
      category: "social",
      clientId: "projeto_draft",
      views: "0",
      isVertical: true,
    },
    {
      id: "cruzeiro_basquete_1",
      title: "Cruzeiro Basquete",
      thumbnail: driveThumb("1j8Gryyp0-YbtWQHUy-ZQgH6NdkfXsHyw"),
      videoUrl: driveEmbed("1j8Gryyp0-YbtWQHUy-ZQgH6NdkfXsHyw"),
      category: "social",
      clientId: "cruzeiro_basquete",
      views: "0",
      isVertical: true,
    },
    {
      id: "cruzeiro_basquete_2",
      title: "Cruzeiro Basquete",
      thumbnail: "/projeto-draft-thumb.jpg.png",
      videoUrl: driveEmbed("1uot6SjYDxBQQrOWlpOuTipBcQ_sSFS2W"),
      category: "social",
      clientId: "cruzeiro_basquete",
      views: "0",
      isVertical: true,
    },
    {
      id: "cruzeiro_basquete_3",
      title: "Cruzeiro Basquete",
      thumbnail: driveThumb("1CAo5vTb5p0OOq-9CdQGjS4wEKfnrRbns"),
      videoUrl: driveEmbed("1CAo5vTb5p0OOq-9CdQGjS4wEKfnrRbns"),
      category: "social",
      clientId: "cruzeiro_basquete",
      views: "0",
      isVertical: true,
    },
    {
      id: "fenix_ads_1",
      title: "Group Phoenix",
      thumbnail: driveThumb("16vh8lHJtgJs0orRZOwpqkBlOVxbSG5-x"),
      videoUrl: driveEmbed("16vh8lHJtgJs0orRZOwpqkBlOVxbSG5-x"),
      category: "ads",
      clientId: "fenix_ads",
      views: "0",
      isVertical: true,
    },
    {
      id: "fenix_ads_2",
      title: "Group Phoenix",
      thumbnail: driveThumb("15-7hhNBHbEHpqCSCWmfmW2_fn0tddXhm"),
      videoUrl: driveEmbed("15-7hhNBHbEHpqCSCWmfmW2_fn0tddXhm"),
      category: "ads",
      clientId: "fenix_ads",
      views: "0",
      isVertical: true,
    },
    {
      id: "fenix_ads_3",
      title: "Group Phoenix",
      thumbnail: driveThumb("1fDdJ4TaWy0zIlrBw27GNm9KwTDMSlbou"),
      videoUrl: driveEmbed("1fDdJ4TaWy0zIlrBw27GNm9KwTDMSlbou"),
      category: "ads",
      clientId: "fenix_ads",
      views: "0",
      isVertical: true,
    },
    {
      id: "fenix_ads_4",
      title: "Group Phoenix",
      thumbnail: driveThumb("1LjRKPbaBQQuEPQGDol7ZGLVcJO2EGA3g"),
      videoUrl: driveEmbed("1LjRKPbaBQQuEPQGDol7ZGLVcJO2EGA3g"),
      category: "ads",
      clientId: "fenix_ads",
      views: "0",
      isVertical: true,
    },
    {
      id: "fenix_ads_5",
      title: "Group Phoenix",
      thumbnail: driveThumb("1lJDTPrJZNzGeGjuBDKKJYKYJxuJJxDG0"),
      videoUrl: driveEmbed("1lJDTPrJZNzGeGjuBDKKJYKYJxuJJxDG0"),
      category: "ads",
      clientId: "fenix_ads",
      views: "0",
      isVertical: true,
    },
    {
      id: "fenix_ads_6",
      title: "Group Phoenix",
      thumbnail: driveThumb("1jUft6etXETQSku_nTr6DjrZt_rO9Cgl5"),
      videoUrl: driveEmbed("1jUft6etXETQSku_nTr6DjrZt_rO9Cgl5"),
      category: "ads",
      clientId: "fenix_ads",
      views: "0",
      isVertical: true,
    },
    {
      id: "fenix_ads_7",
      title: "Group Phoenix",
      thumbnail: driveThumb("1iol_L1BpbVJximPemAHX90aNQ4b5h3OY"),
      videoUrl: driveEmbed("1iol_L1BpbVJximPemAHX90aNQ4b5h3OY"),
      category: "ads",
      clientId: "fenix_ads",
      views: "0",
      isVertical: true,
    },
    {
      id: "fenix_ads_8",
      title: "Group Phoenix",
      thumbnail: driveThumb("1jVMH7gQSiYbDAcIuzmEuLg6XtTGxAXmd"),
      videoUrl: driveEmbed("1jVMH7gQSiYbDAcIuzmEuLg6XtTGxAXmd"),
      category: "ads",
      clientId: "fenix_ads",
      views: "0",
      isVertical: true,
    },
    {
      id: "fenix_ads_9",
      title: "Group Phoenix",
      thumbnail: driveThumb("1mM1GYkZUYcwi9b3K-HQqbPWnwj1E4YMW"),
      videoUrl: driveEmbed("1mM1GYkZUYcwi9b3K-HQqbPWnwj1E4YMW"),
      category: "ads",
      clientId: "fenix_ads",
      views: "0",
      isVertical: true,
    },
    {
      id: "fenix_ads_10",
      title: "Group Phoenix",
      thumbnail: driveThumb("1Ufex1neFqGHJWH3wl1_gbwkrlkhCgpa1"),
      videoUrl: driveEmbed("1Ufex1neFqGHJWH3wl1_gbwkrlkhCgpa1"),
      category: "ads",
      clientId: "fenix_ads",
      views: "0",
      isVertical: true,
    },
    {
      id: "fenix_ads_11",
      title: "Group Phoenix",
      thumbnail: driveThumb("1H4U2PaYvHvP3LV0VA3NBexM9Z-e2Hx7V"),
      videoUrl: driveEmbed("1H4U2PaYvHvP3LV0VA3NBexM9Z-e2Hx7V"),
      category: "ads",
      clientId: "fenix_ads",
      views: "0",
      isVertical: true,
    },
    {
      id: "fenix_ads_12",
      title: "Group Phoenix",
      thumbnail: driveThumb("1qdEOd1GbOqJB6oD5w1AZ1y5nEofYvGRj"),
      videoUrl: driveEmbed("1qdEOd1GbOqJB6oD5w1AZ1y5nEofYvGRj"),
      category: "ads",
      clientId: "fenix_ads",
      views: "0",
      isVertical: true,
    },
    {
      id: "fenix_ads_13",
      title: "Group Phoenix",
      thumbnail: driveThumb("1Mg3Bd7a29D6mkL6rkIBlc-i4r3XwzozT"),
      videoUrl: driveEmbed("1Mg3Bd7a29D6mkL6rkIBlc-i4r3XwzozT"),
      category: "ads",
      clientId: "fenix_ads",
      views: "0",
      isVertical: true,
    },
    {
      id: "fenix_vsl_1",
      title: "Group Phoenix",
      thumbnail: driveThumb("1hEQOG_8z83qxfNGvYDKIoBUh56IiGSVX"),
      videoUrl: driveEmbed("1hEQOG_8z83qxfNGvYDKIoBUh56IiGSVX"),
      category: "vsl",
      clientId: "fenix_vsl",
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
