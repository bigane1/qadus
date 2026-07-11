import type { Metadata } from "next";
import ServicePageLayout from "@/components/ServicePageLayout";
import { heroWide, serviceImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Inspection Caméra Canalisation Île-de-France — Diagnostic Vidéo",
  description:
    "Inspection caméra et diagnostic vidéo de canalisations en Île-de-France. Localisation de fuites, fissures, bouchons. Rapport complet. Devis gratuit — Qadus.",
  keywords: [
    "inspection caméra canalisation Île-de-France",
    "caméra endoscopique canalisation",
    "diagnostic vidéo réseau assainissement",
    "inspection robotisée canalisation Paris",
    "localisation fuite canalisation",
  ],
  alternates: { canonical: "https://www.qadus.fr/inspection-camera" },
  openGraph: {
    title: "Inspection Caméra Canalisation — Qadus IDF",
    description:
      "Diagnostic vidéo complet de vos canalisations. Localisation de fuites et fissures. Rapport technique inclus. Île-de-France.",
    url: "https://www.qadus.fr/inspection-camera",
  },
};

const benefits = [
  {
    icon: "📷",
    title: "Caméra haute définition",
    text: "Inspection vidéo HD avec enregistrement numérique. Visualisation précise de l'état interne des canalisations.",
  },
  {
    icon: "🤖",
    title: "Robot d'inspection",
    text: "Pour les grands diamètres, notre robot télécommandé inspecte les réseaux jusqu'à DN600 sur des centaines de mètres.",
  },
  {
    icon: "📍",
    title: "Localisation précise",
    text: "Sonde de localisation transmetteur intégrée pour repérer exactement la position des anomalies sans fouille.",
  },
  {
    icon: "📄",
    title: "Rapport vidéo complet",
    text: "Rapport d'inspection normalisé avec enregistrement vidéo, photos horodatées, cotes et préconisations.",
  },
  {
    icon: "🔍",
    title: "Tous réseaux inspectés",
    text: "Canalisations EU, EV, EP, réseaux collectifs, branchements particuliers. Diamètres DN50 à DN600.",
  },
  {
    icon: "⚡",
    title: "Résultat immédiat",
    text: "Diagnostic sur place en temps réel. Vous voyez l'état de vos canalisations en direct sur notre écran.",
  },
];

const steps = [
  {
    num: "1",
    title: "Introduction de la caméra",
    text: "La caméra endoscopique ou le robot est introduit dans la canalisation via un regard ou un accès existant.",
  },
  {
    num: "2",
    title: "Inspection & enregistrement",
    text: "Inspection complète avec enregistrement vidéo HD. Chaque anomalie est notée : position, nature, gravité.",
  },
  {
    num: "3",
    title: "Rapport & préconisations",
    text: "Rapport d'inspection remis sur place. Préconisations de travaux avec devis si nécessaire.",
  },
];

const faqs = [
  {
    q: "Pourquoi faire inspecter ses canalisations ?",
    a: "L'inspection caméra permet de détecter fuites, fissures, racines intruses, joints défaillants et obstructions avant qu'ils ne causent des dommages importants. C'est aussi obligatoire lors de la vente d'un bien immobilier dans certaines communes.",
  },
  {
    q: "Combien coûte une inspection caméra ?",
    a: "Le prix dépend de la longueur à inspecter et du type de réseau. Comptez en moyenne 150€ à 400€ pour un branchement particulier standard. Devis gratuit sur demande.",
  },
  {
    q: "L'inspection caméra est-elle destructive ?",
    a: "Non, l'inspection caméra est totalement non destructive. La caméra est introduite via les regards ou accès existants sans aucune démolition.",
  },
  {
    q: "Le rapport est-il utilisable pour des démarches administratives ?",
    a: "Oui, notre rapport d'inspection est normalisé et peut être utilisé pour des démarches auprès de votre mairie, assurance ou syndic de copropriété.",
  },
  {
    q: "Quels défauts peut-on détecter avec une caméra ?",
    a: "Fissures, fractures, déformations, infiltrations de racines, joints défaillants, corps étrangers, contre-pentes, bouchons partiels, corrosion et effondrements de canalisation.",
  },
];

const relatedServices = [
  { href: "/debouchage", label: "Débouchage", icon: "🚿" },
  { href: "/curage", label: "Curage canalisations", icon: "🔄" },
  { href: "/chemisage", label: "Chemisage sans tranchée", icon: "🔧" },
  { href: "/assainissement", label: "Assainissement", icon: "🌊" },
  { href: "/devis", label: "Devis gratuit", icon: "📋" },
];

export default function InspectionCameraPage() {
  return (
    <ServicePageLayout
      badge="Diagnostic Vidéo"
      title="Inspection Caméra Canalisation"
      subtitle="Diagnostic vidéo HD & robot d'inspection — Île-de-France"
      description="Qadus réalise l'inspection caméra de vos canalisations en Île-de-France. Caméra endoscopique HD, robot télécommandé, rapport normalisé. Particuliers, syndics, collectivités."
      heroImage={heroWide(serviceImages.inspectionCamera).src}
      heroImageAlt={serviceImages.inspectionCamera.alt}
      benefits={benefits}
      steps={steps}
      faqs={faqs}
      relatedServices={relatedServices}
    />
  );
}
