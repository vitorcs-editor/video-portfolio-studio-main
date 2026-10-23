import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
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
  // Link do mesmo vídeo no Drive, onde ele toca na qualidade máxima (até 1080p)
  const hdUrl = videoUrl.includes("drive.google.com") ? videoUrl.replace(/\/preview$/, "/view") : "";
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

          <div className="pointer-events-none relative flex h-full w-full flex-col items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="pointer-events-auto flex flex-col gap-2.5"
              // O maior tamanho que cabe na tela mantendo a proporção do vídeo
              // (sobram ~64px para a barra de cima e as margens). O player do
              // Drive escolhe a qualidade pelo tamanho exibido: maior = mais nítido.
              style={{
                width: isVertical
                  ? "min(calc(100vw - 24px), calc((100svh - 64px) * 9 / 16))"
                  : "min(calc(100vw - 24px), calc((100svh - 64px) * 16 / 9), 1600px)",
              }}
            >
              {/* Barra de cima: título, abrir em HD no Drive e fechar */}
              <div className="flex items-center justify-between gap-3">
                <span className="flex min-w-0 items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="truncate">{title}</span>
                </span>
                <span className="flex shrink-0 items-center gap-2">
                  {hdUrl && (
                    <a
                      href={hdUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={t.common.openHd}
                      className="btn-glass h-9 gap-1.5 px-3.5 py-0 font-mono text-[11px] uppercase tracking-wider"
                    >
                      HD <ExternalLink size={13} />
                    </a>
                  )}
                  <button
                    onClick={onClose}
                    className="btn-glass h-9 w-9 touch-manipulation p-0"
                    aria-label={t.common.close}
                    title={`${t.common.close} (Esc)`}
                  >
                    <X size={16} strokeWidth={2.5} />
                  </button>
                </span>
              </div>

              <div
                className={`w-full overflow-hidden rounded-[18px] border border-white/10 bg-black shadow-[0_30px_120px_-20px_hsl(var(--primary)/0.35)] ${
                  isVertical ? "aspect-[9/16]" : "aspect-video"
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
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
