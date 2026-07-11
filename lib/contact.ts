/** Numéro unique Qadus — appels et WhatsApp */
export const TEL = "0758429510";
export const TEL_DISPLAY = "07 58 42 95 10";
export const TEL_E164 = "+33758429510";
export const WHATSAPP_NUMBER = "33758429510";

export const telHref = `tel:${TEL_E164}`;
export const whatsappHref = (text = "Bonjour Qadus, j'ai besoin d'un devis pour ") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
