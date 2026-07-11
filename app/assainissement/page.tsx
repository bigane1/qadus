import type { Metadata } from "next";
import ServicePageLayout from "@/components/ServicePageLayout";
import { heroWide, serviceImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Assainissement Île-de-France — Réseaux EU, EP, Bacs à Graisse",
  description:
    "Assainissement et réseaux d'eaux usées en Île-de-France. Bacs à graisse, postes de relevage, séparateurs hydrocarbures, réseaux EU/EV/EP. Devis gratuit — Qadus.",
  keywords: [
    "assainissement Île-de-France",
    "bac à graisse entretien Paris",
    "poste de relevage réparation IDF",
    "réseau eaux usées Yvelines",
    "séparateur hydrocarbures Île-de-France",
  ],
  alternates: { canonical: "https://www.qadus.fr/assainissement" },
  openGraph: {
    title: "Assainissement & Réseaux EU/EP — Qadus IDF",
    description:
      "Spécialiste assainissement en Île-de-France. Bacs à graisse, postes de relevage, réseaux EU/EP. Devis gratuit.",
    url: "https://www.qadus.fr/assainissement",
  },
};

const benefits = [
  {
    icon: "🍳",
    title: "Bacs à graisse",
    text: "Installation, entretien et vidange de bacs à graisse pour restaurants, cantines, cuisines professionnelles. Conformité réglementaire garantie.",
  },
  {
    icon: "⬆️",
    title: "Postes de relevage",
    text: "Installation, dépannage et maintenance de postes de relevage et pompes de refoulement pour tous types de bâtiments.",
  },
  {
    icon: "🌊",
    title: "Réseaux EU, EV & EP",
    text: "Conception, réhabilitation et entretien des réseaux d'eaux usées (EU), eaux vannes (EV) et eaux pluviales (EP).",
  },
  {
    icon: "⛽",
    title: "Séparateurs hydrocarbures",
    text: "Installation et vidange de séparateurs hydrocarbures pour parkings, garages, stations-service. Conformité Loi sur l'Eau.",
  },
  {
    icon: "📋",
    title: "Conformité & diagnostics",
    text: "Diagnostic de conformité assainissement pour vente immobilière, permis de construire, mise aux normes.",
  },
  {
    icon: "🏭",
    title: "Industries & collectivités",
    text: "Nous intervenons pour les industriels, collectivités, établissements scolaires, centres commerciaux et copropriétés.",
  },
];

const steps = [
  {
    num: "1",
    title: "Audit & diagnostic",
    text: "Inspection complète de votre réseau d'assainissement. Identification des dysfonctionnements et non-conformités.",
  },
  {
    num: "2",
    title: "Travaux & installation",
    text: "Réalisation des travaux : installation, remplacement ou réhabilitation des équipements selon les normes en vigueur.",
  },
  {
    num: "3",
    title: "Mise en service & suivi",
    text: "Tests de fonctionnement, remise de dossier technique complet. Contrat d'entretien disponible.",
  },
];

const faqs = [
  {
    q: "Quand faut-il vidanger un bac à graisse ?",
    a: "Un bac à graisse doit être vidangé lorsque la couche de graisses atteint 50% de la capacité du bac, soit en moyenne tous les 1 à 3 mois pour un restaurant actif. La réglementation impose une fréquence minimale selon le type d'établissement.",
  },
  {
    q: "Qu'est-ce qu'un poste de relevage ?",
    a: "Un poste de relevage est un équipement qui pompe les eaux usées pour les refouler vers le réseau public lorsque la gravité ne suffit pas (sous-sol, maison basse). En cas de panne, les eaux ne peuvent plus s'évacuer.",
  },
  {
    q: "Le diagnostic assainissement est-il obligatoire pour vendre ?",
    a: "Oui, dans les communes raccordées à l'assainissement collectif, un diagnostic peut être exigé. Pour l'assainissement non collectif (fosse septique), le diagnostic est obligatoire lors de toute vente immobilière.",
  },
  {
    q: "Intervenez-vous sur les réseaux pluviaux ?",
    a: "Oui, nous intervenons sur les réseaux d'eaux pluviales (EP) : curage, réhabilitation, branchements, avaloirs et caniveaux, bassins de rétention.",
  },
  {
    q: "Proposez-vous des contrats d'entretien ?",
    a: "Oui, nous proposons des contrats d'entretien annuels pour bacs à graisse, postes de relevage et séparateurs hydrocarbures. Visite préventive, rapport d'entretien et intervention prioritaire inclus.",
  },
];

const relatedServices = [
  { href: "/debouchage", label: "Débouchage", icon: "🚿" },
  { href: "/curage", label: "Curage canalisations", icon: "🔄" },
  { href: "/inspection-camera", label: "Inspection caméra", icon: "📷" },
  { href: "/chemisage", label: "Chemisage sans tranchée", icon: "🔧" },
  { href: "/devis", label: "Devis gratuit", icon: "📋" },
];

export default function AssainissementPage() {
  return (
    <ServicePageLayout
      badge="Assainissement & Réseaux"
      title="Assainissement Île-de-France"
      subtitle="Bacs à graisse, postes de relevage, réseaux EU/EV/EP"
      description="Qadus est votre spécialiste assainissement en Île-de-France. Installation et entretien de bacs à graisse, postes de relevage, séparateurs hydrocarbures, diagnostics de conformité. Particuliers, restaurateurs, collectivités."
      heroImage={heroWide(serviceImages.assainissement).src}
      heroImageAlt={serviceImages.assainissement.alt}
      benefits={benefits}
      steps={steps}
      faqs={faqs}
      relatedServices={relatedServices}
    />
  );
}
