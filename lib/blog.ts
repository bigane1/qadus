import { serviceImages } from "@/lib/images";

export type BlogCategory = "travaux-realises" | "bon-a-savoir" | "actualites";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  categoryLabel: string;
  date: string;
  location?: string;
  image: { src: string; alt: string };
  content: string[];
};

export const BLOG_CATEGORIES: Record<BlogCategory, string> = {
  "travaux-realises": "Travaux réalisés",
  "bon-a-savoir": "Bon à savoir",
  actualites: "Actualités Qadus",
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "chemisage-residence-saint-germain-en-laye",
    title: "Chemisage d'un réseau d'assainissement en résidence à Saint-Germain-en-Laye",
    excerpt:
      "Réhabilitation de colonnes EU sans tranchée dans une copropriété des Yvelines. Intervention rapide avec contrôle caméra avant/après.",
    category: "travaux-realises",
    categoryLabel: "Travaux réalisés",
    date: "2026-03-28",
    location: "Saint-Germain-en-Laye (78)",
    image: serviceImages.chemisageAfter,
    content: [
      "Une résidence de Saint-Germain-en-Laye présentait des fuites récurrentes sur le réseau d'eaux usées, avec remontées d'odeurs dans plusieurs logements du R+4.",
      "Après inspection caméra, nous avons identifié des fissures et un affaissement de canalisation en fonte. La solution retenue : chemisage CIPP sur 24 mètres, sans ouverture de dalles communes.",
      "Résultat : réseau étanche, remise en service le jour même, et rapport vidéo transmis au syndic pour le dossier technique de l'immeuble.",
    ],
  },
  {
    slug: "inspection-camera-immeuble-idf",
    title: "Inspection vidéo de 6 colonnes dans un immeuble R+8 en Île-de-France",
    excerpt:
      "Diagnostic complet par caméra endoscopique pour localiser bouchons, racines et sections affaissées avant curage ciblé.",
    category: "travaux-realises",
    categoryLabel: "Travaux réalisés",
    date: "2026-03-15",
    location: "Nanterre (92)",
    image: serviceImages.inspectionCamera,
    content: [
      "Le syndic a mandaté Qadus pour comprendre les refoulements répétés aux étages inférieurs. Nous avons inspecté 6 colonnes principales avec caméra HD orientable.",
      "Le rapport a mis en évidence des dépôts graisseux, un tronçon obstrué par des racines et une jonction défectueuse au sous-sol.",
      "Le curage haute pression ciblé a été planifié sur les zones critiques uniquement, ce qui a réduit le coût global de l'intervention.",
    ],
  },
  {
    slug: "renover-canalisations-batiment-ancien-chemisage",
    title: "Rénover les canalisations d'un bâtiment ancien : la solution durable avec le chemisage",
    excerpt:
      "Fuites, corrosion, mauvaises odeurs : le chemisage permet de réhabiliter les réseaux vétustes sans casser les sols et murs.",
    category: "bon-a-savoir",
    categoryLabel: "Bon à savoir",
    date: "2026-03-08",
    image: serviceImages.chemisageBefore,
    content: [
      "Dans les bâtiments anciens d'Île-de-France, les canalisations en fonte ou fibrociment se dégradent avec le temps.",
      "La méthode traditionnelle implique de lourds travaux de tranchée. Le chemisage forme une nouvelle conduite étanche à l'intérieur de l'ancienne.",
      "Cette solution limite les nuisances pour les occupants, réduit les délais de chantier et garantit une durée de vie prolongée du réseau.",
    ],
  },
  {
    slug: "rehabilitation-canalisation-sans-tranchee",
    title: "Réhabilitation de canalisation sans tranchée : comment ça marche ?",
    excerpt:
      "Découvrez les étapes du chemisage et du cure-in-place pour réparer un réseau endommagé sans démolition.",
    category: "bon-a-savoir",
    categoryLabel: "Bon à savoir",
    date: "2026-02-22",
    image: serviceImages.chemisage,
    content: [
      "La réhabilitation sans tranchée consiste à insérer une manchon en résine dans la canalisation existante, puis à la durcir sur place.",
      "Après un curage préparatoire et une inspection caméra, la chemise épouse la forme du conduit et comble fissures et micro-fuites.",
      "Le réseau retrouve une section hydraulique optimale, avec un contrôle final filmé pour valider la qualité de la réhabilitation.",
    ],
  },
  {
    slug: "curage-haute-pression-copropriete-poissy",
    title: "Curage haute pression d'un réseau collectif en copropriété à Poissy",
    excerpt:
      "Nettoyage complet par hydrocureur d'une colonne graisseuse et des collecteurs horizontaux d'un immeuble de 42 logements.",
    category: "travaux-realises",
    categoryLabel: "Travaux réalisés",
    date: "2026-02-10",
    location: "Poissy (78)",
    image: serviceImages.curage,
    content: [
      "Des écoulements lents et des odeurs persistantes indiquaient un réseau encrassé. Nous avons réalisé un curage haute pression jusqu'à 300 bars.",
      "Les dépôts graisseux et calcaires ont été évacués en une journée, avec protection des zones de passage et nettoyage du chantier.",
      "Un contrôle caméra final a confirmé la section nette sur toute la hauteur de la colonne.",
    ],
  },
  {
    slug: "avantages-chemisage-syndics-coproprietes",
    title: "Pourquoi les syndics choisissent le chemisage pour leurs colonnes",
    excerpt:
      "Moins de nuisances, délais courts, coût maîtrisé : le chemisage est idéal pour les copropriétés en Île-de-France.",
    category: "bon-a-savoir",
    categoryLabel: "Bon à savoir",
    date: "2026-01-28",
    image: serviceImages.chemisageAfter,
    content: [
      "Les syndics doivent concilier urgence, budget et continuité de service. Le chemisage évite les gros travaux structurels.",
      "Les parties communes restent accessibles, les logements sont peu impactés et le syndic dispose d'un rapport technique clair.",
      "Qadus accompagne les syndics avec devis détaillé, planning d'intervention et garantie sur la réhabilitation réalisée.",
    ],
  },
  {
    slug: "debouchage-urgence-week-end-idf",
    title: "Débouchage d'urgence un dimanche soir en Île-de-France",
    excerpt:
      "Intervention en moins de 2 h pour un WC refoulé et une douche hors service dans un appartement des Yvelines.",
    category: "travaux-realises",
    categoryLabel: "Travaux réalisés",
    date: "2026-01-15",
    location: "Conflans-Sainte-Honorine (78)",
    image: serviceImages.urgence,
    content: [
      "Un refoulement complet du WC a nécessité une intervention d'urgence un dimanche soir. Notre équipe est arrivée sur site en moins de 2 heures.",
      "Le bouchon était situé dans la colonne de chute. Débouchage mécanique puis test d'écoulement sur l'ensemble des appartements concernés.",
      "Le client a récupéré des sanitaires fonctionnels dans la soirée, sans travaux supplémentaires.",
    ],
  },
  {
    slug: "reseau-assainissement-copropriete-yvelines",
    title: "Remise en conformité d'un réseau d'assainissement en copropriété",
    excerpt:
      "Inspection, curage et réparation localisée sur un réseau EU/EV défaillant dans les Yvelines.",
    category: "travaux-realises",
    categoryLabel: "Travaux réalisés",
    date: "2025-12-20",
    location: "Les Mureaux (78)",
    image: serviceImages.assainissement,
    content: [
      "Le réseau présentait des infiltrations et des refoulements ponctuels au sous-sol. Nous avons commencé par un diagnostic caméra complet.",
      "Le curage préventif a été complété par une réparation localisée sur une section endommagée, sans remplacement total de la canalisation.",
      "La copropriété dispose maintenant d'un plan d'entretien annuel pour éviter la récidive.",
    ],
  },
  {
    slug: "9-avantages-renovation-canalisations-chemisage",
    title: "Les 9 avantages de la rénovation de canalisations par chemisage",
    excerpt:
      "Sans tranchée, rapide, durable : les points clés de la réhabilitation CIPP pour particuliers et professionnels.",
    category: "bon-a-savoir",
    categoryLabel: "Bon à savoir",
    date: "2025-12-05",
    image: serviceImages.chemisage,
    content: [
      "1. Pas de tranchée. 2. Délais réduits. 3. Moins de nuisances. 4. Coût maîtrisé. 5. Durée de vie prolongée.",
      "6. Étanchéité retrouvée. 7. Contrôle caméra avant/après. 8. Adapté aux réseaux EU/EV/EP. 9. Solution compatible bâtiments anciens.",
      "Qadus intervient en Île-de-France pour des diagnostics gratuits et des devis clairs avant travaux.",
    ],
  },
  {
    slug: "inspection-camera-avant-travaux",
    title: "Pourquoi faire une inspection caméra avant tout travail de canalisation ?",
    excerpt:
      "Éviter les mauvaises surprises, cibler la bonne méthode et maîtriser le budget : le diagnostic vidéo est indispensable.",
    category: "bon-a-savoir",
    categoryLabel: "Bon à savoir",
    date: "2025-11-18",
    image: serviceImages.inspectionCamera,
    content: [
      "Intervenir sans diagnostic, c'est risquer de traiter le mauvais tronçon ou de choisir une méthode inadaptée.",
      "La caméra endoscopique permet de localiser précisément bouchons, fissures, racines, affaissements et jonctions défectueuses.",
      "Chez Qadus, le rapport vidéo sert de base au devis et au choix entre débouchage, curage ou chemisage.",
    ],
  },
  {
    slug: "qadus-nouveau-site-et-blog",
    title: "Qadus lance son nouveau site et son blog assainissement",
    excerpt:
      "Retrouvez nos conseils, réalisations et actualités sur le débouchage, curage, chemisage et assainissement en Île-de-France.",
    category: "actualites",
    categoryLabel: "Actualités Qadus",
    date: "2026-04-01",
    location: "Île-de-France",
    image: serviceImages.debouchage,
    content: [
      "Qadus renforce sa présence en ligne pour mieux informer particuliers, syndics et professionnels.",
      "Sur ce blog, nous partageons des retours de chantiers, des conseils pratiques et des actualités sur nos prestations en Île-de-France.",
      "Besoin d'un devis ou d'une urgence ? Contactez-nous 7j/7 au 06 67 25 08 85.",
    ],
  },
  {
    slug: "prix-debouchage-canalisation-idf",
    title: "Prix d'un débouchage de canalisation en Île-de-France : ce qu'il faut savoir",
    excerpt:
      "Les facteurs qui influencent le tarif : type de bouchon, accessibilité, horaire d'intervention et méthode utilisée.",
    category: "bon-a-savoir",
    categoryLabel: "Bon à savoir",
    date: "2026-02-01",
    image: serviceImages.debouchage,
    content: [
      "Le prix d'un débouchage dépend du type d'équipement (évier, WC, colonne), de la complexité du bouchon et de l'horaire.",
      "Un diagnostic téléphonique permet d'estimer la fourchette avant déplacement. Chez Qadus, le devis est gratuit et sans engagement.",
      "Nous privilégions la méthode la moins invasive : furet, hydrocurage ou caméra selon la situation réelle.",
    ],
  },
];

export const POSTS_PER_PAGE = 6;

export function getAllPosts() {
  return [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: BlogCategory) {
  return getAllPosts().filter((p) => p.category === category);
}

export function formatBlogDate(date: string) {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
