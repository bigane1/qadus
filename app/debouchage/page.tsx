import type { Metadata } from "next";
import ServicePageLayout from "@/components/ServicePageLayout";

export const metadata: Metadata = {
  title: "Débouchage Canalisation Île-de-France — Intervention 24h/24",
  description:
    "Débouchage et dégorgement de canalisations en Île-de-France. Évier, WC, douche, fosse septique. Intervention rapide 24h/24 7j/7. Devis gratuit — Qadus.",
  keywords: [
    "débouchage canalisation Île-de-France",
    "débouchage WC Poissy",
    "dégorgement urgence Paris",
    "plombier débouchage 78",
    "débouchage évier nuit",
  ],
  alternates: { canonical: "https://www.qadus.fr/debouchage" },
  openGraph: {
    title: "Débouchage Canalisation Île-de-France — Qadus 24h/24",
    description:
      "Spécialiste débouchage et dégorgement en Île-de-France. Intervention rapide 24h/24. Devis gratuit.",
    url: "https://www.qadus.fr/debouchage",
  },
};

const benefits = [
  {
    icon: "⚡",
    title: "Intervention ultra-rapide",
    text: "Technicien disponible en moins de 2h, 24h/24 et 7j/7, même le dimanche et les jours fériés.",
  },
  {
    icon: "🔬",
    title: "Diagnostic précis",
    text: "Inspection caméra endoscopique pour identifier la cause exacte du bouchon avant toute intervention.",
  },
  {
    icon: "💧",
    title: "Hydrocurage haute pression",
    text: "Nettoyage par jet haute pression pour déboucher les canalisations les plus résistantes sans abîmer les tuyaux.",
  },
  {
    icon: "🏠",
    title: "Tous types de canalisations",
    text: "Évier, WC, douche, baignoire, fosse septique, réseau EU et EP. Particuliers et professionnels.",
  },
  {
    icon: "💰",
    title: "Devis gratuit et transparent",
    text: "Prix communiqué avant intervention. Aucune surprise sur la facture. Paiement après travaux.",
  },
  {
    icon: "✅",
    title: "Garantie satisfaction",
    text: "Nos interventions sont garanties. Si le problème persiste, nous revenons sans frais supplémentaires.",
  },
];

const steps = [
  {
    num: "1",
    title: "Appel & diagnostic",
    text: "Vous nous décrivez le problème. Nous évaluons l'urgence et vous donnons un créneau d'intervention immédiat.",
  },
  {
    num: "2",
    title: "Intervention sur site",
    text: "Notre technicien arrive équipé : caméra, machine à déboucher, hydrocureur haute pression.",
  },
  {
    num: "3",
    title: "Résultat garanti",
    text: "Débouchage réalisé, test d'écoulement effectué. Facture remise sur place. Canalisation propre.",
  },
];

const faqs = [
  {
    q: "Combien coûte un débouchage de canalisation ?",
    a: "Le prix dépend de la nature du bouchon et de l'accessibilité. Comptez entre 80€ et 250€ pour un débouchage standard. Nous fournissons toujours un devis avant intervention. Appel diagnostic gratuit.",
  },
  {
    q: "Intervenez-vous la nuit et le week-end ?",
    a: "Oui, nous sommes disponibles 24h/24, 7j/7, y compris les nuits, week-ends et jours fériés. Une majoration urgence peut s'appliquer en dehors des heures ouvrables.",
  },
  {
    q: "Quelle est la différence entre débouchage et curage ?",
    a: "Le débouchage traite un bouchon ponctuel (évier, WC). Le curage consiste à nettoyer en profondeur l'ensemble d'un réseau de canalisations pour éviter les obstructions futures.",
  },
  {
    q: "Mon WC est bouché, que faire en attendant ?",
    a: "N'utilisez plus la chasse d'eau pour éviter un débordement. N'essayez pas de verser des produits chimiques agressifs. Appelez-nous, nous intervenons rapidement.",
  },
  {
    q: "Couvrez-vous toute l'Île-de-France ?",
    a: "Oui, nous intervenons dans tous les départements d'Île-de-France : Paris (75), Seine-et-Marne (77), Yvelines (78), Essonne (91), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94), Val-d'Oise (95).",
  },
];

const relatedServices = [
  { href: "/curage", label: "Curage canalisations", icon: "🔄" },
  { href: "/inspection-camera", label: "Inspection caméra", icon: "📷" },
  { href: "/chemisage", label: "Chemisage sans tranchée", icon: "🔧" },
  { href: "/assainissement", label: "Assainissement", icon: "🌊" },
  { href: "/devis", label: "Devis gratuit", icon: "📋" },
];

export default function DebouchagePage() {
  return (
    <ServicePageLayout
      badge="Débouchage & Dégorgement"
      title="Débouchage Canalisation Île-de-France"
      subtitle="Évier, WC, douche, réseau — Intervention en moins de 2h"
      description="Qadus intervient sur tous types de canalisations bouchées en Île-de-France. Particuliers et professionnels. Hydrocurage haute pression, inspection caméra, garantie résultat."
      benefits={benefits}
      steps={steps}
      faqs={faqs}
      relatedServices={relatedServices}
    />
  );
}
