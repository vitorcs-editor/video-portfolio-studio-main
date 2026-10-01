import { useEffect } from "react";

// Trava o scroll da página enquanto um modal está aberto (seguro no iOS).
// Só mexe no body quando `active` é true — com o modal fechado não faz nada,
// então não reseta a posição da página ao carregar.
export const useScrollLock = (active: boolean, { hideNavbar = false } = {}) => {
  useEffect(() => {
    if (!active) return;

    const scrollY = window.scrollY;
    const body = document.body;
    const navbar = hideNavbar ? document.querySelector<HTMLElement>("header") : null;

    Object.assign(body.style, {
      position: "fixed",
      top: `-${scrollY}px`,
      left: "0",
      right: "0",
      width: "100%",
      overflow: "hidden",
    });
    body.classList.add("modal-open");
    if (navbar) navbar.style.display = "none";

    return () => {
      Object.assign(body.style, {
        position: "",
        top: "",
        left: "",
        right: "",
        width: "",
        overflow: "",
      });
      body.classList.remove("modal-open");
      if (navbar) navbar.style.display = "";

      // Desliga o scroll-behavior:smooth global durante a restauração pra não animar ("sobe e desce")
      const docEl = document.documentElement;
      const prevScrollBehavior = docEl.style.scrollBehavior;
      docEl.style.scrollBehavior = "auto";
      window.scrollTo(0, scrollY);
      docEl.style.scrollBehavior = prevScrollBehavior;
    };
  }, [active, hideNavbar]);
};

// Fecha com a tecla Escape enquanto `active` for true.
export const useEscapeKey = (active: boolean, onEscape: () => void) => {
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onEscape();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, onEscape]);
};
