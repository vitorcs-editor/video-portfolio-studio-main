import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLang } from "@/lib/lang";
import { useScrollLock, useEscapeKey } from "@/hooks/use-scroll-lock";
import { EASE } from "./common/motion";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
  isVertical?: boolean;
}

const VideoModal = ({ isOpen, onClose, videoUrl, title, isVertical = false }: VideoModalProps) => {
  const { t } = useLang();
  useScrollLock(isOpen, { hideNavbar: true });
  useEscapeKey(isOpen, onClose);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label={title}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-background/90 backdrop-blur-md"
            onClick={onClose}
          />

          <div className="pointer-events-none relative flex h-full w-full flex-col items-center justify-center gap-4 p-5 sm:p-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ duration: 0.45, ease: EASE }}
              className={`pointer-events-auto flex flex-col items-center gap-4 ${isVertical ? "h-[78svh] sm:h-[80vh]" : "w-full max-w-[1000px]"}`}
            >
              {/* Barra de título, como um monitor de programa */}
              <div className="flex w-full items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {title}
                </span>
                <span>{isVertical ? "9:16" : "16:9"}</span>
              </div>

              <div
                className={`overflow-hidden rounded-md bg-black shadow-[0_30px_120px_-20px_hsl(var(--primary)/0.35)] ring-1 ring-line ${
                  isVertical ? "aspect-[9/16] min-h-0 w-full flex-1" : "aspect-video w-full"
                }`}
              >
                <iframe
                  src={videoUrl}
                  title={title}
                  className="block h-full w-full border-0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <button
                onClick={onClose}
                className="btn-ghost min-h-[44px] touch-manipulation px-5 py-2.5 text-sm"
                aria-label={t.common.close}
              >
                <X size={15} strokeWidth={2.5} />
                {t.common.close}
                <kbd className="ml-1 hidden font-mono text-[10px] text-muted-foreground sm:inline">ESC</kbd>
              </button>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
