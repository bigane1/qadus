import type { Metadata } from "next";
import ServicePageLayout from "@/components/ServicePageLayout";
import { heroWide, serviceImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Chemisage Canalisation Sans Tranchée Île-de-France — Qadus",
  description:
    "Réhabilitation de canalisations par chemisage sans tranchée en Île-de-France. Technique CIPP, réseau EU/EP, collectivités et particuliers. Devis gratuit — Qadus.",
  keywords: [
    "chemisage canalisation sans tranchée",
    "chemisage CIPP Île-de-France",
    "réhabilitation canalisation Paris",
    "réparation tuyau sans travaux",
    "gainage canalisation Yvelines",
  ],
  alternates: { canonical: "https://www.qadus.fr/chemisage" },
  openGraph: {
    title: "Chemisage Canalisation Sans Tranchée — Qadus IDF",
    description:
      "Réhabilitation de canalisations par chemisage sans tranchée. Technique CIPP. Île-de-France. Devis gratuit.",
    url: "https://www.qadus.fr/chemisage",
  },
};

const benefits = [
  {
    icon: "🚫",
    title: "Zéro tranchée",
    text: "Pas de démolition, pas de travaux de terrassement. La canalisation est réhabilitée de l'intérieur, sans ouvrir le sol.",
  },
  {
    icon: "⏱️",
    title: "Durée de vie +50 ans",
    text: "La chemise en résine durcit pour former un nouveau tuyau rigide et étanche, garantissant une durabilité exceptionnelle.",
  },
  {
    icon: "💰",
    title: "Économie jusqu'à 70%",
    text: "Comparé à une réfection classique avec tranchée, le chemisage divise le coût jusqu'à 70% et réduit les délais de 80%.",
  },
  {
    icon: "🏗️",
    title: "Tous types de réseaux",
    text: "Canalisations EU (eaux usées), EP (eaux pluviales), EV (eaux vannes). Diamètres de DN80 à DN600.",
  },
  {
    icon: "🔬",
    title: "Contrôle caméra inclus",
    text: "Inspection vidéo avant et après l'intervention pour garantir la qualité du résultat.",
  },
  {
    icon: "📋",
    title: "Rapport technique complet",
    text: "Dossier de réhabilitation remis : rapport caméra, fiche technique résine, attestation de conformité.",
  },
];

const steps = [
  {
    num: "1",
    title: "Inspection caméra",
    text: "Diagnostic vidéo complet de la canalisation pour évaluer l'état, les fissures, les infiltrations et définir la longueur à traiter.",
  },
  {
    num: "2",
    title: "Préparation & chemisage",
    text: "Curage haute pression, puis introduction de la chemise en résine thermodurcissable dans la canalisation.",
  },
  {
    num: "3",
    title: "Durcissement & contrôle",
    text: "Durcissement de la résine (UV ou vapeur), contrôle caméra final. Remise en service immédiate.",
  },
];

const faqs = [
  {
    q: "Qu'est-ce que le chemisage de canalisation ?",
    a: "Le chemisage (ou CIPP — Cured In Place Pipe) consiste à introduire une chemise souple imprégnée de résine dans la canalisation existante, puis à la durcir pour former un nouveau tuyau rigide et étanche à l'intérieur de l'ancien.",
  },
  {
    q: "Pour quels types de canalisations le chemisage est-il adapté ?",
    a: "Le chemisage convient aux canalisations en béton, grès, fonte, PVC, amiante-ciment. Il est idéal pour les réseaux d'eaux usées (EU), eaux pluviales (EP) et eaux vannes (EV), en diamètre DN80 à DN600.",
  },
  {
    q: "Combien de temps dure une intervention de chemisage ?",
    a: "Pour une longueur standard (20 à 50 mètres), l'intervention dure généralement 1 à 2 jours. La remise en service est immédiate après durcissement complet de la résine.",
  },
  {
    q: "Le chemisage est-il garanti ?",
    a: "Oui. Nos chemisages sont garantis 10 ans avec possibilité d'extension. Nous remettons un dossier technique complet incluant les rapports caméra avant/après.",
  },
  {
    q: "Quels signes indiquent qu'une canalisation nécessite un chemisage ?",
    a: "Infiltrations d'eau, odeurs persistantes, canalisations fissurées ou corrodées, joints défaillants, racines d'arbres pénétrantes. Une inspection caméra permet de confirmer le diagnostic.",
  },
];

const relatedServices = [
  { href: "/inspection-camera", label: "Inspection caméra", icon: "📷" },
  { href: "/curage", label: "Curage canalisations", icon: "🔄" },
  { href: "/debouchage", label: "Débouchage", icon: "🚿" },
  { href: "/assainissement", label: "Assainissement", icon: "🌊" },
  { href: "/devis", label: "Devis gratuit", icon: "📋" },
];

export default function ChemisagePage() {
  return (
    <ServicePageLayout
      badge="Réhabilitation Sans Tranchée"
      title="Chemisage de Canalisations"
      subtitle="Technique CIPP — Réhabilitation sans démolition en Île-de-France"
      description="Qadus réhabilite vos canalisations dégradées par chemisage sans tranchée. Technique CIPP (Cured In Place Pipe). Particuliers, syndics, collectivités. Île-de-France."
      heroImage={heroWide(serviceImages.chemisageAfter).src}
      heroImageAlt={serviceImages.chemisageAfter.alt}
      beforeAfter={{
        title: "Avant / Après chemisage",
        before: {
          src: serviceImages.chemisageBefore.src,
          alt: serviceImages.chemisageBefore.alt,
          label: "Avant intervention",
        },
        after: {
          src: serviceImages.chemisageAfter.src,
          alt: serviceImages.chemisageAfter.alt,
          label: "Après intervention",
        },
      }}
      benefits={benefits}
      steps={steps}
      faqs={faqs}
      relatedServices={relatedServices}
    />
  );
}
