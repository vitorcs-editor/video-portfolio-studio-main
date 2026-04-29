import { useState, useRef } from "react";
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
  const scrollRef = useRef<HTMLDivElement>(null);

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
    { id: "vera_bet", name: "Vera Bet", niche: "igaming", logo: "/vera-bet-logo2.png" },
    { id: "projeto_draft", name: "Projeto Draft", niche: "social", logo: "/projeto-draft-logo.png" },
  ];

  const videos: Video[] = [
    {
      id: "phoenix_ad_1",
      title: "Ads & Performance",
      thumbnail: "/phoenix_ad.png",
      videoUrl: "https://drive.google.com/file/d/1LjRKPbaBQQuEPQGDol7ZGLVcJO2EGA3g/preview",
      category: "ads",
      clientId: "fenix_ads",
      views: "15.4K",
      isVertical: true
    },
    {
      id: "phoenix_ad_2",
      title: "Ads & Performance",
      thumbnail: "/phoenix_ad_2.png",
      videoUrl: "https://drive.google.com/file/d/1iol_L1BpbVJximPemAHX90aNQ4b5h3OY/preview",
      category: "ads",
      clientId: "fenix_ads",
      views: "9.8K",
      isVertical: true
    },
    {
      id: "vera_bet_igaming_1",
      title: "iGaming Ad",
      thumbnail: "/betvera_ad.jpg",
      videoUrl: "https://drive.google.com/file/d/1vGsmjb5Fj1J8Z9Fbxe1kezkPvZvyMc1b/preview",
      category: "igaming",
      clientId: "vera_bet",
      views: "12.1K",
      isVertical: true
    },
    {
      id: "vera_bet_igaming_2",
      title: "iGaming Ad",
      thumbnail: "/betvera_ad2.png",
      videoUrl: "https://drive.google.com/file/d/1aR_KEtY2P3akwvgrmzberU6ME0mKBigU/preview",
      category: "igaming",
      clientId: "vera_bet",
      views: "8.7K",
      isVertical: true
    },
    {
      id: "vera_bet_igaming_3",
      title: "iGaming Ad",
      thumbnail: "/betvera_ad3.png",
      videoUrl: "https://drive.google.com/file/d/1fH4ZDdyhPwFlKekmkiqZrV78ftAw4H4b/preview",
      category: "igaming",
      clientId: "vera_bet",
      views: "6.3K",
      isVertical: true
    },
    {
      id: "phoenix_vsl_1",
      title: "VSL",
      thumbnail: "/phoenix_vsl.png",
      videoUrl: "https://drive.google.com/file/d/1hEQOG_8z83qxfNGvYDKIoBUh56IiGSVX/preview",
      category: "vsl",
      clientId: "fenix_vsl",
      views: "11.2K",
      isVertical: true
    },
    {
      id: "projeto_draft_social_1",
      title: "Social Media",
      thumbnail: "/draft_ad.png",
      videoUrl: "https://drive.google.com/file/d/1Lcm3ViOtqirmBidi4EbgLOm0cThwxhGr/preview",
      category: "social",
      clientId: "projeto_draft",
      views: "9.5K",
      isVertical: true
    },
    {
      id: "projeto_draft_social_2",
      title: "Social Media",
      thumbnail: "/draft_ad2.jpg",
      videoUrl: "https://drive.google.com/file/d/1TmmeqsfNGqqG-ICzzqHvytNQ3Vw37FSo/preview",
      category: "social",
      clientId: "projeto_draft",
      views: "7.2K",
      isVertical: true
    },
    {
      id: "phoenix_ad_3",
      title: "Ads & Performance",
      thumbnail: "/phoenix_ad_3.png",
      videoUrl: "https://drive.google.com/file/d/1Ufex1neFqGHJWH3wl1_gbwkrlkhCgpa1/preview",
      category: "ads",
      clientId: "fenix_ads",
      views: "13.7K",
      isVertical: true
    },
    {
      id: "phoenix_vsl_2",
      title: "VSL",
      thumbnail: "/phoenix_vsl2.png",
      videoUrl: "https://drive.google.com/file/d/1BDHURurOkrWC0EiMQH4u2YXooj3-0R04/preview",
      category: "vsl",
      clientId: "fenix_vsl",
      views: "14.8K",
      isVertical: true
    }
  ];

  const filteredClients = clients.filter(c => c.niche === activeCategory);

  const filteredVideos = videos.filter((v) => {
    const categoryMatch = v.category === activeCategory;
    const clientMatch = activeClient === "all" || v.clientId === activeClient;
    return categoryMatch && clientMatch;
  });

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth * 0.7 : scrollLeft + clientWidth * 0.7;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const openVideo = (video: Video) => {
    if (video.videoUrl !== "#") {
      setSelectedVideo(video);
      setIsModalOpen(true);
    }
  };

  return (
    <section id="portfolio" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="relative z-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black mb-4 tracking-tight leading-none">
              Meus{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Trabalhos
              </span>
            </h2>
            <p className="text-white/50 text-sm sm:text-base font-normal">
              Selecione uma categoria para ver os projetos.
            </p>
          </motion.div>
        </div>

        {/* Level 1 Filters: Niches — Murilo exact style */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 px-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setActiveClient("all");
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === cat.id
                  ? "bg-primary text-black shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
                  : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Level 2 Filters: Clients — Murilo exact style */}
        <AnimatePresence mode="wait">
          {filteredClients.length > 0 && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex justify-center flex-wrap gap-3 mb-10 px-6"
            >
              <button
                onClick={() => setActiveClient("all")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border-2 ${activeClient === "all"
                    ? "border-primary/70 text-primary bg-primary/10"
                    : "border-white/10 text-white/50 bg-white/5 hover:text-white hover:border-white/30"
                  }`}
              >
                Todos
              </button>
              {filteredClients.map((client) => (
                <button
                  key={client.id}
                  onClick={() => setActiveClient(client.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border-2 ${activeClient === client.id
                      ? "border-primary/70 text-primary bg-primary/10"
                      : "border-white/10 text-white/50 bg-white/5 hover:text-white hover:border-white/30"
                    }`}
                >
                  {client.logo && (
                    <img src={client.logo} alt="" className="w-6 h-6 object-contain" />
                  )}
                  {client.name}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Reel — Exact Murilo horizontal scroll structure */}
        <div className="relative group/reel">

          {/* Left scroll button — always visible on mobile, hover-only on desktop */}
          <button
            onClick={() => scroll("left")}
            aria-label="Anterior"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/70 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-100 sm:opacity-0 group-hover/reel:opacity-100 transition-all duration-300 hover:bg-primary hover:text-black hover:border-primary hover:scale-110 shadow-xl"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Right scroll button — always visible on mobile, hover-only on desktop */}
          <button
            onClick={() => scroll("right")}
            aria-label="Próximo"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/70 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-100 sm:opacity-0 group-hover/reel:opacity-100 transition-all duration-300 hover:bg-primary hover:text-black hover:border-primary hover:scale-110 shadow-xl"
          >
            <ChevronRight size={20} />
          </button>

          {/* Scroll track — centered on desktop, scrollable on mobile */}
          <div
            ref={scrollRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-6 sm:px-10 pb-6 snap-x snap-mandatory"
            style={{ justifyContent: 'safe center' }}
          >
            <AnimatePresence mode="wait">
              {filteredVideos.map((video, idx) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className="flex-shrink-0 snap-center"
                >
                  {/* Card — responsive width: smaller on mobile */}
                  <button
                    onClick={() => openVideo(video)}
                    className="relative group/card rounded-2xl overflow-hidden w-[170px] sm:w-[290px] aspect-[9/16] block cursor-pointer transition-transform duration-300 hover:scale-[1.03] shadow-xl shadow-black/50"
                  >
                    {/* Thumbnail */}
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />

                    {/* Always-visible gradient from bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Play overlay — always visible on mobile, hover-only on desktop */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover/card:opacity-100 transition-opacity duration-250">
                      <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-primary/80 sm:bg-primary/90 flex items-center justify-center shadow-[0_0_30px_hsl(var(--primary)/0.7)]">
                        <Play size={18} className="fill-black text-black ml-0.5 sm:ml-1" />
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Empty state */}
            {filteredVideos.length === 0 && (
              <div className="w-full flex items-center justify-center py-24 text-white/20 uppercase tracking-[0.4em] font-black text-xs text-center">
                Nenhum projeto nesta categoria
              </div>
            )}
          </div>
        </div>

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
