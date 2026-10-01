// Fundo fixo do site: "aurora" de luz ciano se movendo devagar + grade sutil.
// Fica oculto enquanto um modal está aberto, para o navegador não re-borrar
// a luz em movimento por baixo do backdrop-blur.

const Atmosphere = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden [body.modal-open_&]:hidden">
    <div
      className="absolute -left-[10vw] -top-[35vw] h-[60vw] w-[60vw] animate-drift rounded-full opacity-50 blur-[90px]"
      style={{ background: "radial-gradient(circle, #00a6d6, transparent 65%)" }}
    />
    <div
      className="absolute -right-[15vw] -top-[20vw] h-[50vw] w-[50vw] animate-drift rounded-full opacity-50 blur-[90px] [animation-duration:22s]"
      style={{ background: "radial-gradient(circle, #0a5b73, transparent 65%)" }}
    />
    <div
      className="absolute left-[30vw] top-[10vh] h-[40vw] w-[40vw] animate-drift rounded-full opacity-40 blur-[90px] [animation-duration:26s]"
      style={{ background: "radial-gradient(circle, rgba(0, 200, 240, 0.35), transparent 65%)" }}
    />
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse 70% 60% at 50% 15%, black, transparent)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 15%, black, transparent)",
      }}
    />
  </div>
);

export default Atmosphere;
