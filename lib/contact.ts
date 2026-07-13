/** Numéro unique Qadus — appels et WhatsApp */
export const TEL = "0667250885";
export const TEL_DISPLAY = "06 67 25 08 85";
export const TEL_E164 = "+33667250885";
export const WHATSAPP_NUMBER = "33667250885";
export const FACEBOOK_URL = "https://www.facebook.com/share/1LAY4LR2By/?mibextid=wwXIfr";
export const ADDRESS_DISPLAY = "54 rue Sainte-Honorine, 78955 Carrières-sous-Poissy";
export const EMAIL = "contact@qadus.fr";

export const telHref = `tel:${TEL_E164}`;
export const mailtoHref = `mailto:${EMAIL}`;
export const whatsappHref = (text = "Bonjour Qadus, j'ai besoin d'un devis pour ") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
