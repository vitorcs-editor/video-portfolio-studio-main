// Linha do tempo e enquadramento da abertura, compartilhados entre a cena 3D
// (carregada sob demanda) e a interface por cima dela. Fica num arquivo próprio
// para a página não precisar carregar o three.js só para ler estes números.

export const TIMELINE = {
  vStart: 0.45, vEnd: 1.25, // V sendo desenhado
  cStart: 0.95, cEnd: 1.95, // C sendo desenhado
  refocus: 2.35, // foco "procurando" antes de travar
  name: 2.0, // nome entra embaixo do logo (logo depois do C terminar)
  lock: 3.3, // foco trava: flash e glitch
  handoff: 4.6, // logo voa até o menu e o site aparece (nome fica ~2s legível)
};

// Duração da passagem para o site (logo voando até o menu + fundo sumindo)
export const HANDOFF_MS = 950;

// Logo tem 3.2 unidades de largura na cena; câmera com FOV vertical de 35°
export const LOGO_W = 3.2;
export const LOGO_H = (3.2 * 64) / 120;
const TAN_HALF_FOV = Math.tan((35 / 2) * (Math.PI / 180));

// Distância da câmera para o logo ocupar no máximo ~52% da largura da tela
// (e nunca ficar perto demais em telas largas)
export const cameraDistance = (w: number, h: number) => {
  const aspect = w / h;
  return Math.max(6.2, LOGO_W / (0.52 * 2 * TAN_HALF_FOV * aspect));
};

// Tamanho do logo na tela (px), para posicionar a mira de foco e o nome
export const logoOnScreen = (w: number, h: number) => {
  const visibleH = 2 * cameraDistance(w, h) * TAN_HALF_FOV;
  const pxPerUnit = h / visibleH;
  return { width: LOGO_W * pxPerUnit, height: LOGO_H * pxPerUnit };
};

const SESSION_KEY = "vc-intro-seen";

const hasWebGL = () => {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
};

// Só toca uma vez por visita, com WebGL e sem "reduzir movimento"
export const shouldPlayIntro = () => {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    if (sessionStorage.getItem(SESSION_KEY) === "1") return false;
  } catch { /* ignore */ }
  return hasWebGL();
};

export const markIntroSeen = () => {
  try { sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* ignore */ }
};
