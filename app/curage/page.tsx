import type { Metadata } from "next";
import ServicePageLayout from "@/components/ServicePageLayout";

export const metadata: Metadata = {
  title: "Curage Canalisation Île-de-France — Hydrocurage Haute Pression",
  description:
    "Curage et hydrocurage de canalisations en Île-de-France. Nettoyage haute pression réseaux EU, EP, collecteurs. Particuliers et collectivités. Devis gratuit — Qadus.",
  keywords: [
    "curage canalisation Île-de-France",
    "hydrocurage haute pression Paris",
    "nettoyage canalisation professionnel",
    "curage réseau assainissement",
    "curage collecteur Yvelines",
  ],
  alternates: { canonical: "https://www.qadus.fr/curage" },
  openGraph: {
    title: "Curage & Hydrocurage Canalisation — Qadus IDF",
    description:
      "Curage et nettoyage haute pression de canalisations en Île-de-France. Réseaux EU, EP, collecteurs. Devis gratuit.",
    url: "https://www.qadus.fr/curage",
  },
};

const benefits = [
  {
    icon: "💧",
    title: "Hydrocurage haute pression",
    text: "Nettoyage par jet d'eau haute pression (jusqu'à 300 bars) pour éliminer dépôts, graisses, calcaire et boues incrustées.",
  },
  {
    icon: "🚛",
    title: "Camion hydrocureur",
    text: "Camion hydrocureur aspirateur de dernière génération, capable de traiter les grands réseaux et collecteurs.",
  },
  {
    icon: "🔄",
    title: "Curage préventif & curatif",
    text: "Intervention en urgence sur bouchon formé ou en entretien préventif programmé pour éviter les obstructions.",
  },
  {
    icon: "🏗️",
    title: "Tous diamètres",
    text: "Curage de canalisations de DN50 (particuliers) à DN1200 (collecteurs municipaux). Tous types de réseaux.",
  },
  {
    icon: "♻️",
    title: "Évacuation des déchets",
    text: "Aspiration et évacuation des boues et résidus selon les normes environnementales en vigueur.",
  },
  {
    icon: "📅",
    title: "Contrats d'entretien",
    text: "Programmes d'entretien annuel pour syndics, restaurants, industries. Planification selon vos contraintes.",
  },
];

const steps = [
  {
    num: "1",
    title: "Évaluation du réseau",
    text: "Inspection préalable par caméra ou test d'écoulement pour identifier les zones à traiter et choisir la technique adaptée.",
  },
  {
    num: "2",
    title: "Hydrocurage haute pression",
    text: "Introduction du flexible haute pression dans la canalisation. Nettoyage complet par jet d'eau rotatif.",
  },
  {
    num: "3",
    title: "Aspiration & contrôle",
    text: "Aspiration des résidus par le camion hydrocureur. Contrôle de l'écoulement et rapport d'intervention.",
  },
];

const faqs = [
  {
    q: "Quelle est la différence entre curage et débouchage ?",
    a: "Le débouchage traite un bouchon ponctuel et urgent. Le curage est un nettoyage en profondeur de l'ensemble du réseau, souvent réalisé en préventif pour éviter les bouchons récurrents.",
  },
  {
    q: "À quelle fréquence faut-il faire curer ses canalisations ?",
    a: "Pour les particuliers : tous les 2 à 3 ans en préventif. Pour les restaurants et collectivités (bacs à graisse) : tous les 6 mois à 1 an. Pour les copropriétés : selon le plan de maintenance.",
  },
  {
    q: "Le curage haute pression abîme-t-il les canalisations ?",
    a: "Non, si réalisé par des professionnels. La pression est adaptée au diamètre et au matériau des canalisations. Nos techniciens ajustent les paramètres pour préserver l'intégrité des tuyaux.",
  },
  {
    q: "Intervenez-vous sur les réseaux collectifs ?",
    a: "Oui, nous intervenons sur les réseaux collectifs de copropriétés, syndicats de copropriétaires, communes et collectivités en Île-de-France.",
  },
  {
    q: "Que faites-vous des boues extraites ?",
    a: "Les boues et résidus aspirés sont évacués dans des centres de traitement agréés, conformément à la réglementation environnementale. Un bordereau de suivi des déchets (BSD) vous est remis.",
  },
];

const relatedServices = [
  { href: "/debouchage", label: "Débouchage urgent", icon: "🚿" },
  { href: "/inspection-camera", label: "Inspection caméra", icon: "📷" },
  { href: "/chemisage", label: "Chemisage sans tranchée", icon: "🔧" },
  { href: "/assainissement", label: "Assainissement", icon: "🌊" },
  { href: "/devis", label: "Devis gratuit", icon: "📋" },
];

export default function CuragePage() {
  return (
    <ServicePageLayout
      badge="Nettoyage Professionnel"
      title="Curage & Hydrocurage de Canalisations"
      subtitle="Nettoyage haute pression réseaux EU, EP, collecteurs — Île-de-France"
      description="Qadus réalise le curage et l'hydrocurage de tous types de canalisations en Île-de-France. Camion hydrocureur aspirateur, intervention préventive et curative. Particuliers, syndics, industries."
      benefits={benefits}
      steps={steps}
      faqs={faqs}
      relatedServices={relatedServices}
    />
  );
}
