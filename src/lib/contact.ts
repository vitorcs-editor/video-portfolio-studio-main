// Dados de contato centralizados — evita números/links duplicados pelo código.
export const SITE_URL = "https://www.vitorcs.com.br";
export const WHATSAPP_NUMBER = "5516994427941";

// Monta o link do WhatsApp, opcionalmente com mensagem pré-preenchida.
export const whatsappLink = (message?: string) =>
  message
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${WHATSAPP_NUMBER}`;
