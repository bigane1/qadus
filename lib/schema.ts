import { FACEBOOK_URL, TEL_DISPLAY, TEL_E164 } from "./contact";

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Plumber",
  name: "Qadus",
  url: "https://www.qadus.fr",
  logo: "https://www.qadus.fr/logo.png",
  image: "https://www.qadus.fr/og-image.jpg",
  description:
    "Qadus — Spécialiste débouchage, assainissement et réhabilitation de canalisations en Île-de-France. Chemisage sans tranchée, inspection caméra, curage, hydrocurage, bacs à graisse, postes de relevage. Intervention 24h/24 7j/7.",
  telephone: TEL_E164,
  email: "qadus.paris@gmail.com",
  vatID: "FR99990840019",
  taxID: "990 840 019",
  address: {
    "@type": "PostalAddress",
    streetAddress: "54 rue Sainte-Honorine",
    addressLocality: "Carrières-sous-Poissy",
    postalCode: "78955",
    addressRegion: "Yvelines",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.9292,
    longitude: 2.0451,
  },
  founder: {
    "@type": "Person",
    name: "Zakaria Boukhari",
  },
  foundingDate: "2025-09-02",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  priceRange: "€€",
  areaServed: [
    { "@type": "State", name: "Île-de-France" },
    "Paris", "Yvelines", "Hauts-de-Seine", "Seine-Saint-Denis",
    "Val-de-Marne", "Essonne", "Val-d'Oise", "Seine-et-Marne",
    "Poissy", "Conflans-Sainte-Honorine", "Versailles", "Saint-Germain-en-Laye",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services Qadus",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Débouchage de canalisations" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dégorgement d'urgence" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Curage préventif et curatif" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Chemisage de canalisations sans tranchée" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Inspection caméra endoscopique" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Inspection robotisée" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Assainissement collectif et individuel" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bacs à graisse et séparateurs d'hydrocarbures" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Réparation et entretien postes de relevage" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Nettoyage haute pression" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fuite d'eau et dégât des eaux" } },
    ],
  },
  sameAs: [FACEBOOK_URL],
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Intervenez-vous en urgence la nuit et le week-end ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Oui, Qadus est disponible 24h/24 et 7j/7, y compris les nuits, week-ends et jours fériés. Un seul numéro : ${TEL_DISPLAY}. Appelez et nous intervenons dans les plus brefs délais.`,
      },
    },
    {
      "@type": "Question",
      name: "Est-ce que le devis est vraiment gratuit ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, le devis et le déplacement sont entièrement gratuits et sans engagement. Le tarif vous est communiqué par téléphone ou sur place après diagnostic, avant toute intervention.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle est votre zone d'intervention ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nous intervenons à Poissy et dans toutes les communes des Yvelines (78) : Conflans-Sainte-Honorine, Achères, Les Mureaux, Saint-Germain-en-Laye, Meulan, Andrésy, Triel-sur-Seine, Verneuil-sur-Seine, Orgeval et environs.",
      },
    },
    {
      "@type": "Question",
      name: "Que faire si ma canalisation est bouchée ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Appelez-nous immédiatement au ${TEL_DISPLAY}. Nos techniciens interviennent avec furet mécanique, hydrocurage haute pression ou caméra endoscopique selon la nature du bouchon.`,
      },
    },
    {
      "@type": "Question",
      name: "Intervenez-vous pour les professionnels et les syndics ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, Qadus intervient pour les particuliers ET les professionnels : syndics de copropriété, agences immobilières, hôtels, restaurants, cliniques, collectivités et administrations.",
      },
    },
    {
      "@type": "Question",
      name: "Qu'est-ce que l'hydrocurage ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'hydrocurage est une technique de débouchage et nettoyage par jet d'eau à très haute pression. Il permet de déboucher et nettoyer en profondeur toutes les canalisations, en éliminant graisses, calcaire et dépôts sans endommager les tuyaux.",
      },
    },
    {
      "@type": "Question",
      name: "Comment fonctionne l'inspection caméra ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nous introduisons une caméra endoscopique couleur dans votre canalisation pour localiser précisément bouchons, fissures, racines ou cassures. Ce diagnostic permet d'adapter l'intervention au problème exact et évite les travaux inutiles.",
      },
    },
    {
      "@type": "Question",
      name: "Quels moyens de paiement acceptez-vous ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nous acceptons les chèques, virements bancaires et espèces. Une facture détaillée est remise en fin d'intervention.",
      },
    },
  ],
};
