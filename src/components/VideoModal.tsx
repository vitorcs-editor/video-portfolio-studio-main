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
    const navbar = document.querySelector("header") as HTMLElement | null;
    if (isOpen) {
      savedScrollY.current = window.scrollY;
      Object.assign(document.body.style, {
        position: "fixed",
        top: `-${savedScrollY.current}px`,
        left: "0",
        right: "0",
        width: "100%",
        overflow: "hidden",
      });
      if (navbar) navbar.style.display = "none";
    } else {
      const y = savedScrollY.current;
      Object.assign(document.body.style, {
        position: "",
        top: "",
        left: "",
        right: "",
        width: "",
        overflow: "",
      });
      if (navbar) navbar.style.display = "";
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
        overflow: "",
      });
      if (navbar) navbar.style.display = "";
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
          className="fixed inset-0 w-screen h-screen"
          style={{ zIndex: 999999 }}
        >
          {/* ── Backdrop ─────────────────────────────────────────────────── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* ── Centered shell ───────────────────────────────────────────── */}
          <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-5 sm:p-10 gap-4 overflow-hidden">

            <motion.div
              key="card"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col items-center gap-4 ${
                isVertical
                  ? /*
                     * Vertical videos (9:16):
                     * – On mobile: use up to 76% of viewport height (reduced to account for close button)
                     * – On desktop: cap at 75vh height
                     */
                    "h-[76svh] sm:h-[75vh]"
                  : /*
                     * Horizontal videos (16:9):
                     * – Fill most of the width, cap at 900px on large screens
                     */
                    "w-full max-w-[900px]"
              }`}
            >
              {/* ── Video wrapper ────────────────────────────────────────── */}
              <div
                className={`rounded-2xl overflow-hidden bg-black shadow-[0_8px_80px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.07)] ${
                  isVertical
                    ? /*
                       * Fill all remaining height, derive width from 9:16 ratio.
                       * min-h-0 is critical: lets flex child shrink below its content height.
                       */
                      "flex-1 min-h-0 aspect-[9/16] w-full"
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

              {/* ── Close button — below video ── */}
              <button
                onClick={onClose}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 text-white/80 hover:text-white text-sm font-semibold transition-colors border border-white/15 min-h-[44px] touch-manipulation"
                aria-label="Fechar vídeo"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <X size={15} strokeWidth={2.5} />
                <span>Fechar</span>
              </button>
            </motion.div>

          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
