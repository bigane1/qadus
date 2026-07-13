import fs from "fs";
import path from "path";

export type TarifItem = {
  title: string;
  price: string;
  desc: string;
  image: string;
};

export type SiteContent = {
  phone: string;
  phoneDisplay: string;
  facebookUrl: string;
  address: string;
  heroTitle: string;
  heroSubtitle: string;
  tarifs: TarifItem[];
};

const CONTENT_FILE = path.join(process.cwd(), "data", "site-content.json");

export const defaultSiteContent: SiteContent = {
  phone: "0667250885",
  phoneDisplay: "06 67 25 08 85",
  facebookUrl: "https://www.facebook.com/share/1LAY4LR2By/?mibextid=wwXIfr",
  address: "54 rue Sainte-Honorine, 78955 Carrières-sous-Poissy",
  heroTitle: "Débouchage & Assainissement en Île-de-France",
  heroSubtitle: "Intervention rapide 24h/24 — devis gratuit",
  tarifs: [],
};

export function getSiteContent(): SiteContent {
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      const raw = JSON.parse(fs.readFileSync(CONTENT_FILE, "utf8")) as Partial<SiteContent>;
      return { ...defaultSiteContent, ...raw };
    }
  } catch {
    // fallback to defaults
  }
  return defaultSiteContent;
}

export function saveSiteContent(content: SiteContent) {
  fs.mkdirSync(path.dirname(CONTENT_FILE), { recursive: true });
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2), "utf8");
}
