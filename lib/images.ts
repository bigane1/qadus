/**
 * Visuels Pexels (libres de droits) — une image par métier / prestation.
 * URLs vérifiées pour correspondre au type d'intervention affiché.
 */

export type ServiceImage = {
  src: string;
  alt: string;
};

const pex = (id: number, width = 600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}&fit=crop`;

/** Variante large pour les bannières de pages service */
export const heroWide = (image: ServiceImage): ServiceImage => ({
  ...image,
  src: image.src.replace(/w=\d+/, "w=1400"),
});

export const serviceImages = {
  /** Plombier réparant une canalisation — débouchage WC, évier, colonne */
  debouchage: {
    src: pex(32588548),
    alt: "Plombier professionnel réparant une canalisation avec une clé à molette",
  },
  /** Nettoyage haute pression — hydrocurage, curage préventif */
  curage: {
    src: pex(12919779),
    alt: "Technicien nettoyage haute pression au karcher — curage hydrocurage",
  },
  /** Diagnostic vidéo — inspection caméra endoscopique */
  inspectionCamera: {
    src: pex(35290678),
    alt: "Technicien analysant un diagnostic sur écran — inspection caméra canalisation",
  },
  /** Réhabilitation réseau — chemisage CIPP sans tranchée */
  chemisage: {
    src: pex(5691622),
    alt: "Canalisation réhabilitée par chemisage CIPP sans tranchée",
  },
  /** Avant chemisage — réseau dégradé (vue inspection caméra) */
  chemisageBefore: {
    src: pex(14664521),
    alt: "Intérieur de canalisation avant chemisage — corrosion, dépôts et fissures visibles à la caméra",
  },
  /** Après chemisage — conduite restaurée (contrôle caméra final) */
  chemisageAfter: {
    src: pex(2219024),
    alt: "Intérieur de canalisation après chemisage CIPP — paroi lisse et étanche",
  },
  /** Réseaux EU/EV/EP — assainissement collectif et individuel */
  assainissement: {
    src: pex(32257223),
    alt: "Technicien intervenant sur un collecteur d'assainissement en béton",
  },
  /** Intervention de nuit / week-end — urgence 24h/24 */
  urgence: {
    src: pex(36842620),
    alt: "Équipe assainissement en intervention de nuit — débouchage urgence",
  },
  /** Fuites, robinets, compteurs — dégât des eaux */
  fuite: {
    src: pex(12265849),
    alt: "Vanette industrielle sur canalisation — réparation fuite et réseau eau",
  },
  /** Rénovation sanitaire — salle de bain, douche, WC */
  salleDeBain: {
    src: pex(15062128),
    alt: "Salle de bain moderne rénovée — installation sanitaire",
  },
  /** Poste de relevage, pompes — maintenance industrielle */
  posteRelevage: {
    src: pex(372796),
    alt: "Réseau de tuyauterie avec manomètres — poste de relevage et pompes",
  },
  /** Camion hydrocureur — curage gros réseaux */
  camionHydrocureur: {
    src: pex(36842620),
    alt: "Intervention curage drainage avec engin spécialisé de nuit",
  },
} as const satisfies Record<string, ServiceImage>;

export const heroImage: ServiceImage = {
  src: pex(36842620, 1920),
  alt: "Équipe Qadus en intervention assainissement et curage — Île-de-France 24h/24",
};

export const heroHighlights = [
  { ...serviceImages.debouchage, label: "Débouchage" },
  { ...serviceImages.chemisageAfter, label: "Chemisage" },
  { ...serviceImages.inspectionCamera, label: "Inspection" },
] as const;
