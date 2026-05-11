import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
  isVertical?: boolean;
}

const VideoModal = ({ isOpen, onClose, videoUrl, title, isVertical = false }: VideoModalProps) => {
  const scrollYRef = useRef(0);

  // ── Lock body scroll (iOS-safe) ──────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      scrollYRef.current = window.scrollY;

      // iOS Safari needs position:fixed + top offset to truly lock scroll
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    } else {
      // Restore body scroll position exactly
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollYRef.current);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ── Escape key ───────────────────────────────────────────────────────────
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
        <>
          {/* ── Backdrop ──────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/85"
            style={{ WebkitTapHighlightColor: "transparent" }}
          />

          {/* ── Modal wrapper — uses flex centering, avoids overflow-y-auto ── */}
          <div
            className="fixed inset-0 z-[101] flex flex-col items-center justify-center px-3 sm:px-6"
            style={{ paddingTop: "env(safe-area-inset-top, 16px)", paddingBottom: "env(safe-area-inset-bottom, 16px)" }}
          >
            {/* ── Content group: Close button + Video ───────────────────── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`relative z-10 flex flex-col items-end w-full ${
                isVertical
                  ? "max-h-[85svh] max-w-[280px] sm:max-w-[360px]"
                  : "max-w-[830px]"
              }`}
            >
              {/* ── Close button ─────────────────────────────────────────── */}
              <button
                onClick={onClose}
                className="mb-2 flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-sm font-medium transition-colors duration-200 border border-white/10 hover:border-white/20 min-h-[44px] touch-manipulation"
                aria-label="Fechar vídeo"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <X size={16} strokeWidth={2} />
                <span>Fechar</span>
              </button>

              {/* ── Video container ──────────────────────────────────────── */}
              <div
                className={`w-full overflow-hidden rounded-xl bg-black shadow-[0_0_60px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.06)] ${
                  isVertical ? "aspect-[9/16]" : "aspect-video"
                }`}
              >
                <iframe
                  src={isOpen ? videoUrl : ""}
                  title={title}
                  className="w-full h-full border-0 block"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
