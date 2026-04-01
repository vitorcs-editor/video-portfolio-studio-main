import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/lib/lang";
import VideoModal from "./VideoModal";

type VideoCategory = "tudo" | "igaming" | "vsl" | "motion" | "ads" | "social";

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
    { id: "fenix_ads", name: "Grupo Fênix", niche: "ads", logo: "https://groupphoenixmediabuyer.com/images/favicon.png" },
    { id: "fenix_vsl", name: "Grupo Fênix", niche: "vsl", logo: "https://groupphoenixmediabuyer.com/images/favicon.png" },
  ];

  const videos: Video[] = [];

  const filteredClients = clients.filter(c => c.niche === activeCategory);

  const filteredVideos = videos.filter((v) => {
    const categoryMatch = v.category === activeCategory;
    const clientMatch = activeClient === "all" || v.clientId === activeClient;
    return categoryMatch && clientMatch;
  });

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
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
    <section id="portfolio" className="py-20 sm:py-32 relative bg-background overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">

        {/* Header - Murilo Style */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl w-full"
          >
            <h2 className="font-display text-[2rem] sm:text-6xl md:text-7xl font-extrabold mb-3 sm:mb-4 uppercase tracking-tighter leading-none">
              <span className="text-white">Projetos</span>{" "}
              <span className="bg-gradient-to-b from-primary to-accent bg-clip-text text-transparent drop-shadow-[0_0_20px_hsl(var(--primary)/0.3)]">
                Selecionados
              </span>
            </h2>
            <p className="text-white/40 text-xs sm:text-base font-light tracking-wide uppercase">
              {t.portfolio.description}
            </p>
          </motion.div>
        </div>

        {/* Level 1 Filters: Niches */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setActiveClient("all");
              }}
              className={`px-4 sm:px-8 py-2 sm:py-3 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 border ${activeCategory === cat.id
                ? "bg-primary text-black border-primary shadow-[0_0_25px_hsl(var(--primary)/0.5)] scale-110"
                : "bg-white/5 text-white/40 border-white/10 hover:border-white/30 hover:text-white"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Level 2 Filters: Clients (Horizontal Scroll on Mobile) */}
        <AnimatePresence mode="wait">
          {filteredClients.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex justify-center flex-wrap gap-2 mb-12"
            >
              <button
                onClick={() => setActiveClient("all")}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-300 border ${activeClient === "all"
                  ? "bg-white/10 text-primary border-primary shadow-[0_0_15px_hsl(var(--primary)/0.2)]"
                  : "bg-white/5 text-white/30 border-white/5 hover:text-white hover:border-primary hover:shadow-[0_0_25px_hsl(var(--primary)/0.2)]"
                  }`}
              >
                Todos
              </button>
              {filteredClients.map((client) => (
                <button
                  key={client.id}
                  onClick={() => setActiveClient(client.id)}
                  className={`flex items-center gap-3 px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-300 border ${activeClient === client.id
                    ? "bg-white/10 text-primary border-primary shadow-[0_0_15px_hsl(var(--primary)/0.2)]"
                    : "bg-white/5 text-white/30 border-white/5 hover:text-white hover:border-primary hover:shadow-[0_0_25px_hsl(var(--primary)/0.2)]"
                    }`}
                >
                  {client.logo && (
                    <img src={client.logo} alt="" className="w-5 h-5 object-contain" />
                  )}
                  {client.name}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Reel - Horizontal Carousel Inspired by Murilo */}
        <div className="relative group/reel">
          {/* Controls */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 w-14 h-14 rounded-full bg-black/80 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/reel:opacity-100 group-hover/reel:translate-x-4 transition-all duration-300 hover:bg-primary hover:text-black hover:border-primary shadow-2xl"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 w-14 h-14 rounded-full bg-black/80 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/reel:opacity-100 group-hover/reel:-translate-x-4 transition-all duration-300 hover:bg-primary hover:text-black hover:border-primary shadow-2xl"
          >
            <ChevronRight size={24} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-4 pb-4 sm:pb-8 -mx-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredVideos.map((video) => (
                <motion.div
                  layout
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="flex-shrink-0"
                >
                  <button
                    onClick={() => openVideo(video)}
                    className={`relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)] bg-[#0a0a0a] group ${video.category === "igaming" || video.category === "social"
                      ? "w-[280px] sm:w-[320px] aspect-[9/16]"
                      : "w-[350px] sm:w-[450px] aspect-[4/5]"
                      }`}
                  >
                    {/* Thumbnail */}
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Minimal Overlay - inspired by Reference */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                    {/* Centered Play Button on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_0_30px_hsl(var(--primary))] scale-75 group-hover:scale-100 transition-transform">
                        <Play size={24} className="fill-black text-black ml-1" />
                      </div>
                    </div>

                    {/* Bottom Info - very subtle like reference */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
                      <div className="transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                        <h3 className="font-display text-lg font-black text-white uppercase tracking-tighter">
                          {video.title}
                        </h3>
                        <span className="text-[10px] text-primary font-bold uppercase tracking-widest">
                          {video.views} Views
                        </span>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredVideos.length === 0 && (
              <div className="w-full min-w-[280px] h-32 sm:h-48 flex items-center justify-center text-white/20 uppercase tracking-[0.3em] sm:tracking-[0.4em] font-black italic text-xs sm:text-sm text-center px-6">
                Nenhum projeto encontrado
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
      />
    </section>
  );
};

export default Portfolio;
