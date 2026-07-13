import fs from "fs";
import path from "path";
import { defaultPrestations } from "@/lib/prestation-defaults";
import { heroImage, serviceImages } from "@/lib/images";

export type TarifItem = {
  title: string;
  price: string;
  desc: string;
  image: string;
};

export type ServiceCard = {
  title: string;
  desc: string;
  tag: string;
  icon: string;
  href: string;
  image: string;
  imageAlt: string;
  beforeAfter?: boolean;
};

export type BlogPostContent = {
  slug: string;
  title: string;
  excerpt: string;
  category: "travaux-realises" | "bon-a-savoir" | "actualites";
  date: string;
  location?: string;
  image: string;
  imageAlt: string;
  content: string[];
};

export type AboutValue = {
  icon: string;
  title: string;
  text: string;
};

export type AboutContent = {
  badge: string;
  title: string;
  intro: string;
  missionTitle: string;
  missionParagraphs: string[];
  commitment: string;
  valuesTitle: string;
  valuesSubtitle: string;
  values: AboutValue[];
  clientsTitle: string;
  clients: string[];
  locationTitle: string;
  locationText: string;
  zoneText: string;
  missionImage: string;
  sideImage1: string;
  sideImage2: string;
};

export type PrestationItem = {
  icon: string;
  title: string;
  text: string;
};

export type PrestationStep = {
  num: string;
  title: string;
  text: string;
};

export type PrestationFaq = {
  q: string;
  a: string;
};

export type PrestationPage = {
  slug: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
  benefits: PrestationItem[];
  steps: PrestationStep[];
  faqs: PrestationFaq[];
};

export type SectionHeading = {
  badge: string;
  title: string;
  subtitle: string;
};

export type SiteImages = {
  hero: string;
  heroAlt: string;
  chemisageBefore: string;
  chemisageBeforeAlt: string;
  chemisageAfter: string;
  chemisageAfterAlt: string;
  logo: string;
};

export type SiteContent = {
  phone: string;
  phoneDisplay: string;
  facebookUrl: string;
  address: string;
  heroTitle: string;
  heroSubtitle: string;
  tarifs: TarifItem[];
  services: ServiceCard[];
  blog: BlogPostContent[];
  about: AboutContent;
  prestations: PrestationPage[];
  images: SiteImages;
  servicesSection: SectionHeading;
  tarifsSection: SectionHeading;
};

const CONTENT_FILE = path.join(process.cwd(), "data", "site-content.json");

export const defaultSiteContent: SiteContent = {
  phone: "0667250885",
  phoneDisplay: "06 67 25 08 85",
  facebookUrl: "https://www.facebook.com/share/1LAY4LR2By/?mibextid=wwXIfr",
  address: "54 rue Sainte-Honorine, 78955 Carrières-sous-Poissy",
  heroTitle: "Débouchage & Assainissement en Île-de-France",
  heroSubtitle: "Intervention rapide 24h/24 — devis gratuit",
  tarifs: [
    {
      title: "Débouchage évier / lavabo",
      price: "À partir de 120 EUR",
      desc: "Débouchage mécanique ou hydrocurage léger pour cuisine et salle d'eau.",
      image: serviceImages.debouchage.src,
    },
    {
      title: "Débouchage WC",
      price: "À partir de 150 EUR",
      desc: "Intervention rapide avec diagnostic et test d'écoulement en fin d'opération.",
      image: serviceImages.debouchage.src,
    },
    {
      title: "Curage haute pression",
      price: "À partir de 290 EUR",
      desc: "Nettoyage complet des canalisations avec camion hydrocureur.",
      image: serviceImages.curage.src,
    },
    {
      title: "Inspection caméra",
      price: "À partir de 180 EUR",
      desc: "Passage caméra avec rapport et recommandations après visite.",
      image: serviceImages.inspectionCamera.src,
    },
    {
      title: "Chemisage sans tranchée",
      price: "Sur devis",
      desc: "Tarif selon diamètre, longueur et accès du réseau à réhabiliter.",
      image: serviceImages.chemisageAfter.src,
    },
    {
      title: "Assainissement / poste relevage",
      price: "Sur devis",
      desc: "Installation, entretien et dépannage pour particuliers et professionnels.",
      image: serviceImages.assainissement.src,
    },
  ],
  services: [
    {
      title: "Débouchage & Dégorgement",
      desc: "WC, évier, douche, colonne. Résultat garanti ou remboursé. Intervention en moins de 2h.",
      tag: "Garanti",
      icon: "🚽",
      href: "/debouchage",
      image: serviceImages.debouchage.src,
      imageAlt: serviceImages.debouchage.alt,
    },
    {
      title: "Curage Haute Pression",
      desc: "Nettoyage complet du réseau par hydrocurage jusqu'à 350 bars. Camion hydrocureur disponible.",
      tag: "Préventif",
      icon: "💦",
      href: "/curage",
      image: serviceImages.curage.src,
      imageAlt: serviceImages.curage.alt,
    },
    {
      title: "Inspection Caméra",
      desc: "Caméra endoscopique HD + robot d'inspection. Rapport vidéo complet agréé assurances.",
      tag: "Diagnostic",
      icon: "📷",
      href: "/inspection-camera",
      image: serviceImages.inspectionCamera.src,
      imageAlt: serviceImages.inspectionCamera.alt,
    },
    {
      title: "Chemisage Sans Tranchée",
      desc: "Réhabilitation CIPP sans démolition. Économie jusqu'à 70% vs remplacement classique. Garanti 10 ans.",
      tag: "Sans tranchée",
      icon: "🔧",
      href: "/chemisage",
      image: serviceImages.chemisageAfter.src,
      imageAlt: serviceImages.chemisageAfter.alt,
      beforeAfter: true,
    },
    {
      title: "Assainissement & Réseaux",
      desc: "Bacs à graisse, postes de relevage, réseaux EU/EV/EP. Particuliers, restaurants, collectivités.",
      tag: "Réseaux",
      icon: "♻️",
      href: "/assainissement",
      image: serviceImages.assainissement.src,
      imageAlt: serviceImages.assainissement.alt,
    },
    {
      title: "Urgence 24h/24",
      desc: "Nuit, week-end, jours fériés. Appel gratuit, déplacement gratuit. Tarif annoncé avant intervention.",
      tag: "Toujours dispo",
      icon: "⚡",
      href: "/#contact",
      image: serviceImages.urgence.src,
      imageAlt: serviceImages.urgence.alt,
    },
    {
      title: "Fuite & Dégât des eaux",
      desc: "Détection et réparation de fuites, robinets, joints, tuyaux encastrés. Agréé assurances.",
      tag: "Urgence",
      icon: "💧",
      href: "/#contact",
      image: serviceImages.fuite.src,
      imageAlt: serviceImages.fuite.alt,
    },
    {
      title: "Salle de bain & Sanitaire",
      desc: "Installation et rénovation complète : douche, baignoire, WC, lavabo. Travail soigné et garanti.",
      tag: "Rénovation",
      icon: "🚿",
      href: "/#contact",
      image: serviceImages.salleDeBain.src,
      imageAlt: serviceImages.salleDeBain.alt,
    },
  ],
  blog: [],
  about: {
    badge: "À propos de Qadus",
    title: "Qui sommes-nous ?",
    intro:
      "Qadus est une entreprise spécialisée dans le débouchage, le curage, le chemisage et l'assainissement en Île-de-France. Nous accompagnons particuliers et professionnels avec des solutions fiables, rapides et durables.",
    missionTitle: "Notre mission",
    missionParagraphs: [
      "Face à une canalisation bouchée, une fuite ou un réseau d'assainissement défaillant, chaque minute compte. Qadus a été créé pour apporter une réponse professionnelle, claire et rapide aux habitants et professionnels d'Île-de-France.",
      "Notre équipe intervient sur tous types de réseaux : éviers, WC, colonnes, collecteurs, bacs à graisse, postes de relevage. Nous privilégions toujours la méthode la moins invasive — débouchage mécanique, curage haute pression, inspection caméra ou chemisage sans tranchée.",
    ],
    commitment: "Notre engagement : pas débouché, pas facturé. Le devis et le déplacement sont gratuits.",
    valuesTitle: "Nos valeurs",
    valuesSubtitle: "Des engagements concrets au service de votre tranquillité.",
    values: [
      {
        icon: "🎯",
        title: "Proximité & réactivité",
        text: "Basés en Yvelines, nous intervenons rapidement à Poissy, Saint-Germain-en-Laye, Conflans et dans toute l'Île-de-France.",
      },
      {
        icon: "🔬",
        title: "Expertise technique",
        text: "Caméra endoscopique, hydrocureur, chemisage CIPP : nous maîtrisons les techniques modernes de réhabilitation sans tranchée.",
      },
      {
        icon: "💬",
        title: "Transparence",
        text: "Devis gratuit, tarif annoncé avant intervention, rapport d'intervention fourni aux particuliers, syndics et assurances.",
      },
      {
        icon: "⚡",
        title: "Disponibilité 7j/7",
        text: "Urgences de nuit, week-ends et jours fériés : une équipe joignable en permanence.",
      },
    ],
    clientsTitle: "Nos clients",
    clients: [
      "Particuliers",
      "Copropriétés & syndics",
      "Agences immobilières",
      "Hôtels & restaurants",
      "Collectivités",
      "Professionnels du bâtiment",
    ],
    locationTitle: "Où nous trouver ?",
    locationText: "54 rue Sainte-Honorine, 78955 Carrières-sous-Poissy",
    zoneText:
      "Zone d'intervention : Yvelines (78), Hauts-de-Seine (92), Val-d'Oise (95), Paris et toute l'Île-de-France.",
    missionImage: heroImage.src,
    sideImage1: serviceImages.chemisage.src,
    sideImage2: serviceImages.inspectionCamera.src,
  },
  prestations: defaultPrestations,
  images: {
    hero: serviceImages.urgence.src.replace(/w=\d+/, "w=1920"),
    heroAlt: serviceImages.urgence.alt,
    chemisageBefore: serviceImages.chemisageBefore.src,
    chemisageBeforeAlt: serviceImages.chemisageBefore.alt,
    chemisageAfter: serviceImages.chemisageAfter.src,
    chemisageAfterAlt: serviceImages.chemisageAfter.alt,
    logo: "/logo.png",
  },
  servicesSection: {
    badge: "Nos prestations",
    title: "Tous vos besoins,\nune seule équipe",
    subtitle:
      "Du dépannage d'urgence au chemisage sans tranchée — interventions pour particuliers, syndics, collectivités et industries en Île-de-France.",
  },
  tarifsSection: {
    badge: "Tarifs des prestations",
    title: "Prestations et prix indicatifs",
    subtitle:
      "Les tarifs ci-dessous sont des bases indicatives. Le prix exact est confirmé après diagnostic.",
  },
};

export function mergeSiteContent(raw: Partial<SiteContent>): SiteContent {
  return {
    ...defaultSiteContent,
    ...raw,
    about: { ...defaultSiteContent.about, ...raw.about },
    images: { ...defaultSiteContent.images, ...raw.images },
    servicesSection: { ...defaultSiteContent.servicesSection, ...raw.servicesSection },
    tarifsSection: { ...defaultSiteContent.tarifsSection, ...raw.tarifsSection },
    tarifs: raw.tarifs?.length ? raw.tarifs : defaultSiteContent.tarifs,
    services: raw.services?.length ? raw.services : defaultSiteContent.services,
    prestations: raw.prestations?.length ? raw.prestations : defaultSiteContent.prestations,
    blog: raw.blog ?? defaultSiteContent.blog,
  };
}

export function getSiteContent(): SiteContent {
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      const raw = JSON.parse(fs.readFileSync(CONTENT_FILE, "utf8")) as Partial<SiteContent>;
      return mergeSiteContent(raw);
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
