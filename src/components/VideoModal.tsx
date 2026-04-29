import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
  isVertical?: boolean;
}

const VideoModal = ({ isOpen, onClose, videoUrl, title, isVertical = false }: VideoModalProps) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);



  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          {/* ── Backdrop: semi-transparent — matches Murilo ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* ── Centering wrapper ── */}
          <div className="relative min-h-full flex items-center justify-center py-4 sm:py-8 px-3 sm:px-4">

            {/* ── Wrapper that groups close button + video ── */}
            <div className={`relative z-10 flex flex-col items-end ${
              isVertical ? "h-[78svh] sm:h-[80vh] aspect-[9/16]" : "w-full max-w-[830px]"
            }`}>

              {/* ── Close (X) button — above the video, right-aligned ── */}
              <motion.button
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, delay: 0.1 }}
                onClick={onClose}
                className="mb-2 flex items-center gap-1.5 px-4 py-2.5 sm:px-3 sm:py-1.5 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white/80 hover:text-white text-sm font-medium transition-all duration-200 border border-white/10 hover:border-white/20 min-h-[44px] sm:min-h-0"
                aria-label="Fechar vídeo"
              >
                <X size={16} strokeWidth={2} />
                <span>Fechar</span>
              </motion.button>

              {/* ── Video container ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full overflow-hidden rounded-xl bg-black shadow-[0_0_60px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.06)] ${
                  isVertical ? "flex-1" : "aspect-video"
                }`}
              >
                {/* Iframe */}
                <iframe
                  src={videoUrl}
                  title={title}
                  className="w-full h-full border-0 block"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </motion.div>
            </div>

          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
