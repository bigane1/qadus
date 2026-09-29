import { serviceImages } from "@/lib/images";

export type RealisationColor = "blue" | "purple" | "orange" | "green" | "teal" | "red";

export type RealisationItem = {
  type: string;
  lieu: string;
  description: string;
  resultat: string;
  icon: string;
  color: RealisationColor;
  image: string;
  imageAlt: string;
  beforeImage?: string;
  afterImage?: string;
};

export type RealisationsSectionHeading = {
  badge: string;
  title: string;
  subtitle: string;
};

export const defaultRealisationsSection: RealisationsSectionHeading = {
  badge: "Nos réalisations",
  title: "Interventions récentes",
  subtitle:
    "Des résultats concrets et garantis sur tous types d'interventions en Île-de-France.",
};

export const defaultRealisationsFooterNote =
  "📸 Photos et vidéos de nos interventions disponibles sur demande.";

export const defaultRealisations: RealisationItem[] = [
  {
    type: "Débouchage WC",
    lieu: "Poissy — Résidence",
    description:
      "Bouchon récurrent causé par accumulation de lingettes. Débouchage par hydrocurage haute pression.",
    resultat: "Réseau totalement dégagé en 45 min",
    icon: "🚽",
    color: "blue",
    image: serviceImages.debouchage.src,
    imageAlt: serviceImages.debouchage.alt,
  },
  {
    type: "Inspection caméra",
    lieu: "Conflans-Sainte-Honorine — Copropriété",
    description:
      "Diagnostic demandé par le syndic suite à refoulement régulier. Caméra endoscopique sur 40 m de réseau.",
    resultat: "Racines localisées à 18 m — curage effectué",
    icon: "📷",
    color: "purple",
    image: serviceImages.inspectionCamera.src,
    imageAlt: serviceImages.inspectionCamera.alt,
  },
  {
    type: "Chemisage sans tranchée",
    lieu: "Paris 16ème — Immeuble haussmannien",
    description:
      "Canalisation fonte vieillissante avec fissures multiples. Chemisage CIPP sur 22 m sans aucun travaux de terrassement.",
    resultat: "Économie de 60% vs remplacement classique",
    icon: "🧱",
    color: "orange",
    image: serviceImages.chemisageAfter.src,
    imageAlt: serviceImages.chemisageAfter.alt,
    beforeImage: serviceImages.chemisageBefore.src,
    afterImage: serviceImages.chemisageAfter.src,
  },
  {
    type: "Curage hydrocurage",
    lieu: "Versailles — Restaurant",
    description:
      "Bac à graisse saturé et colonnes d'évacuation encrassées. Curage complet avec camion hydrocureur.",
    resultat: "Réseau nettoyé — contrat d'entretien annuel signé",
    icon: "🔩",
    color: "green",
    image: serviceImages.camionHydrocureur.src,
    imageAlt: serviceImages.camionHydrocureur.alt,
  },
  {
    type: "Assainissement",
    lieu: "Les Mureaux — Maison individuelle",
    description:
      "Installation d'un système d'assainissement individuel (fosse + filtre) conforme aux normes DTU.",
    resultat: "Mise en conformité validée par la SPANC",
    icon: "♻️",
    color: "teal",
    image: serviceImages.assainissement.src,
    imageAlt: serviceImages.assainissement.alt,
  },
  {
    type: "Poste de relevage",
    lieu: "Nanterre — Zone industrielle",
    description:
      "Panne de pompe de relevage causant refoulement des eaux usées. Remplacement d'urgence de la pompe.",
    resultat: "Remis en service en 2h, zéro interruption d'activité",
    icon: "⚙️",
    color: "red",
    image: serviceImages.posteRelevage.src,
    imageAlt: serviceImages.posteRelevage.alt,
  },
];
