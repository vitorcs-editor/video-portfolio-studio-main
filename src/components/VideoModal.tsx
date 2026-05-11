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

const VideoModal = ({
  isOpen,
  onClose,
  videoUrl,
  title,
  isVertical = false,
}: VideoModalProps) => {
  const savedScrollY = useRef(0);

  /* ── iOS-safe scroll lock ────────────────────────────────────────────── */
  useEffect(() => {
    if (isOpen) {
      savedScrollY.current = window.scrollY;
      Object.assign(document.body.style, {
        position: "fixed",
        top: `-${savedScrollY.current}px`,
        left: "0",
        right: "0",
        width: "100%",
      });
    } else {
      const y = savedScrollY.current;
      Object.assign(document.body.style, {
        position: "",
        top: "",
        left: "",
        right: "",
        width: "",
      });
      window.scrollTo(0, y);
    }
    return () => {
      const y = savedScrollY.current;
      Object.assign(document.body.style, {
        position: "",
        top: "",
        left: "",
        right: "",
        width: "",
      });
      window.scrollTo(0, y);
    };
  }, [isOpen]);

  /* ── Escape key ─────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0"
          /* z-[99999] guarantees we're above Navbar (z-50) and all other elements */
          style={{ zIndex: 99999 }}
        >
          {/* ── Backdrop ─────────────────────────────────────────────────── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/90"
            onClick={onClose}
          />

          {/* ── Centered shell ───────────────────────────────────────────── */}
          <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-5 sm:p-10">

            <motion.div
              key="card"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col items-end gap-2 ${
                isVertical
                  ? /*
                     * Vertical videos (9:16):
                     * – On mobile: use up to 82% of viewport height; width is derived from aspect ratio
                     * – On desktop: cap at 75vh height
                     */
                    "h-[82svh] sm:h-[75vh]"
                  : /*
                     * Horizontal videos (16:9):
                     * – Fill most of the width, cap at 900px on large screens
                     */
                    "w-full max-w-[900px]"
              }`}
            >
              {/* ── Close button — always glued above the video ─────────── */}
              <button
                onClick={onClose}
                className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/30 text-white/80 hover:text-white text-sm font-semibold transition-colors border border-white/15 min-h-[40px] touch-manipulation"
                aria-label="Fechar vídeo"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <X size={15} strokeWidth={2.5} />
                <span>Fechar</span>
              </button>

              {/* ── Video wrapper ────────────────────────────────────────── */}
              <div
                className={`rounded-2xl overflow-hidden bg-black shadow-[0_8px_80px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.07)] ${
                  isVertical
                    ? /*
                       * Fill all remaining height, derive width from 9:16 ratio.
                       * min-h-0 is critical: lets flex child shrink below its content height.
                       */
                      "flex-1 min-h-0 aspect-[9/16]"
                    : "w-full aspect-video"
                }`}
              >
                {isOpen && (
                  <iframe
                    src={videoUrl}
                    title={title}
                    className="w-full h-full border-0 block"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </motion.div>

          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
