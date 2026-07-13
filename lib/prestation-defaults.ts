import type { PrestationPage } from "@/lib/site-content";

export const defaultPrestations: PrestationPage[] = [
  {
    slug: "debouchage",
    badge: "Débouchage & Dégorgement",
    title: "Débouchage Canalisation Île-de-France",
    subtitle: "Évier, WC, douche, réseau — Intervention en moins de 2h",
    description:
      "Qadus intervient sur tous types de canalisations bouchées en Île-de-France. Particuliers et professionnels. Hydrocurage haute pression, inspection caméra, garantie résultat.",
    heroImage:
      "https://images.pexels.com/photos/32588548/pexels-photo-32588548.jpeg?auto=compress&cs=tinysrgb&w=1400&fit=crop",
    heroImageAlt: "Plombier professionnel réparant une canalisation avec une clé à molette",
    benefits: [
      { icon: "⚡", title: "Intervention ultra-rapide", text: "Technicien disponible en moins de 2h, 24h/24 et 7j/7, même le dimanche et les jours fériés." },
      { icon: "🔬", title: "Diagnostic précis", text: "Inspection caméra endoscopique pour identifier la cause exacte du bouchon avant toute intervention." },
      { icon: "💧", title: "Hydrocurage haute pression", text: "Nettoyage par jet haute pression pour déboucher les canalisations les plus résistantes sans abîmer les tuyaux." },
      { icon: "🏠", title: "Tous types de canalisations", text: "Évier, WC, douche, baignoire, fosse septique, réseau EU et EP. Particuliers et professionnels." },
      { icon: "💰", title: "Devis gratuit et transparent", text: "Prix communiqué avant intervention. Aucune surprise sur la facture. Paiement après travaux." },
      { icon: "✅", title: "Garantie satisfaction", text: "Nos interventions sont garanties. Si le problème persiste, nous revenons sans frais supplémentaires." },
    ],
    steps: [
      { num: "1", title: "Appel & diagnostic", text: "Vous nous décrivez le problème. Nous évaluons l'urgence et vous donnons un créneau d'intervention immédiat." },
      { num: "2", title: "Intervention sur site", text: "Notre technicien arrive équipé : caméra, machine à déboucher, hydrocureur haute pression." },
      { num: "3", title: "Résultat garanti", text: "Débouchage réalisé, test d'écoulement effectué. Facture remise sur place. Canalisation propre." },
    ],
    faqs: [
      { q: "Combien coûte un débouchage de canalisation ?", a: "Le prix dépend de la nature du bouchon et de l'accessibilité. Comptez entre 80€ et 250€ pour un débouchage standard. Nous fournissons toujours un devis avant intervention. Appel diagnostic gratuit." },
      { q: "Intervenez-vous la nuit et le week-end ?", a: "Oui, nous sommes disponibles 24h/24, 7j/7, y compris les nuits, week-ends et jours fériés. Une majoration urgence peut s'appliquer en dehors des heures ouvrables." },
      { q: "Quelle est la différence entre débouchage et curage ?", a: "Le débouchage traite un bouchon ponctuel (évier, WC). Le curage consiste à nettoyer en profondeur l'ensemble d'un réseau de canalisations pour éviter les obstructions futures." },
      { q: "Mon WC est bouché, que faire en attendant ?", a: "N'utilisez plus la chasse d'eau pour éviter un débordement. N'essayez pas de verser des produits chimiques agressifs. Appelez-nous, nous intervenons rapidement." },
      { q: "Couvrez-vous toute l'Île-de-France ?", a: "Oui, nous intervenons dans tous les départements d'Île-de-France : Paris (75), Seine-et-Marne (77), Yvelines (78), Essonne (91), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94), Val-d'Oise (95)." },
    ],
  },
  {
    slug: "curage",
    badge: "Nettoyage Professionnel",
    title: "Curage & Hydrocurage de Canalisations",
    subtitle: "Nettoyage haute pression réseaux EU, EP, collecteurs — Île-de-France",
    description:
      "Qadus réalise le curage et l'hydrocurage de tous types de canalisations en Île-de-France. Camion hydrocureur aspirateur, intervention préventive et curative. Particuliers, syndics, industries.",
    heroImage:
      "https://images.pexels.com/photos/36842620/pexels-photo-36842620.jpeg?auto=compress&cs=tinysrgb&w=1400&fit=crop",
    heroImageAlt: "Intervention curage drainage avec engin spécialisé de nuit",
    benefits: [
      { icon: "💧", title: "Hydrocurage haute pression", text: "Nettoyage par jet d'eau haute pression (jusqu'à 300 bars) pour éliminer dépôts, graisses, calcaire et boues incrustées." },
      { icon: "🚛", title: "Camion hydrocureur", text: "Camion hydrocureur aspirateur de dernière génération, capable de traiter les grands réseaux et collecteurs." },
      { icon: "🔄", title: "Curage préventif & curatif", text: "Intervention en urgence sur bouchon formé ou en entretien préventif programmé pour éviter les obstructions." },
      { icon: "🏗️", title: "Tous diamètres", text: "Curage de canalisations de DN50 (particuliers) à DN1200 (collecteurs municipaux). Tous types de réseaux." },
      { icon: "♻️", title: "Évacuation des déchets", text: "Aspiration et évacuation des boues et résidus selon les normes environnementales en vigueur." },
      { icon: "📅", title: "Contrats d'entretien", text: "Programmes d'entretien annuel pour syndics, restaurants, industries. Planification selon vos contraintes." },
    ],
    steps: [
      { num: "1", title: "Évaluation du réseau", text: "Inspection préalable par caméra ou test d'écoulement pour identifier les zones à traiter et choisir la technique adaptée." },
      { num: "2", title: "Hydrocurage haute pression", text: "Introduction du flexible haute pression dans la canalisation. Nettoyage complet par jet d'eau rotatif." },
      { num: "3", title: "Aspiration & contrôle", text: "Aspiration des résidus par le camion hydrocureur. Contrôle de l'écoulement et rapport d'intervention." },
    ],
    faqs: [
      { q: "Quelle est la différence entre curage et débouchage ?", a: "Le débouchage traite un bouchon ponctuel et urgent. Le curage est un nettoyage en profondeur de l'ensemble du réseau, souvent réalisé en préventif pour éviter les bouchons récurrents." },
      { q: "À quelle fréquence faut-il faire curer ses canalisations ?", a: "Pour les particuliers : tous les 2 à 3 ans en préventif. Pour les restaurants et collectivités (bacs à graisse) : tous les 6 mois à 1 an. Pour les copropriétés : selon le plan de maintenance." },
      { q: "Le curage haute pression abîme-t-il les canalisations ?", a: "Non, si réalisé par des professionnels. La pression est adaptée au diamètre et au matériau des canalisations. Nos techniciens ajustent les paramètres pour préserver l'intégrité des tuyaux." },
      { q: "Intervenez-vous sur les réseaux collectifs ?", a: "Oui, nous intervenons sur les réseaux collectifs de copropriétés, syndicats de copropriétaires, communes et collectivités en Île-de-France." },
      { q: "Que faites-vous des boues extraites ?", a: "Les boues et résidus aspirés sont évacués dans des centres de traitement agréés, conformément à la réglementation environnementale. Un bordereau de suivi des déchets (BSD) vous est remis." },
    ],
  },
  {
    slug: "chemisage",
    badge: "Réhabilitation Sans Tranchée",
    title: "Chemisage de Canalisations",
    subtitle: "Technique CIPP — Réhabilitation sans démolition en Île-de-France",
    description:
      "Qadus réhabilite vos canalisations dégradées par chemisage sans tranchée. Technique CIPP (Cured In Place Pipe). Particuliers, syndics, collectivités. Île-de-France.",
    heroImage:
      "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1400&fit=crop",
    heroImageAlt: "Intérieur de canalisation après chemisage CIPP — paroi lisse et étanche",
    benefits: [
      { icon: "🚫", title: "Zéro tranchée", text: "Pas de démolition, pas de travaux de terrassement. La canalisation est réhabilitée de l'intérieur, sans ouvrir le sol." },
      { icon: "⏱️", title: "Durée de vie +50 ans", text: "La chemise en résine durcit pour former un nouveau tuyau rigide et étanche, garantissant une durabilité exceptionnelle." },
      { icon: "💰", title: "Économie jusqu'à 70%", text: "Comparé à une réfection classique avec tranchée, le chemisage divise le coût jusqu'à 70% et réduit les délais de 80%." },
      { icon: "🏗️", title: "Tous types de réseaux", text: "Canalisations EU (eaux usées), EP (eaux pluviales), EV (eaux vannes). Diamètres de DN80 à DN600." },
      { icon: "🔬", title: "Contrôle caméra inclus", text: "Inspection vidéo avant et après l'intervention pour garantir la qualité du résultat." },
      { icon: "📋", title: "Rapport technique complet", text: "Dossier de réhabilitation remis : rapport caméra, fiche technique résine, attestation de conformité." },
    ],
    steps: [
      { num: "1", title: "Inspection caméra", text: "Diagnostic vidéo complet de la canalisation pour évaluer l'état, les fissures, les infiltrations et définir la longueur à traiter." },
      { num: "2", title: "Préparation & chemisage", text: "Curage haute pression, puis introduction de la chemise en résine thermodurcissable dans la canalisation." },
      { num: "3", title: "Durcissement & contrôle", text: "Durcissement de la résine (UV ou vapeur), contrôle caméra final. Remise en service immédiate." },
    ],
    faqs: [
      { q: "Qu'est-ce que le chemisage de canalisation ?", a: "Le chemisage (ou CIPP — Cured In Place Pipe) consiste à introduire une chemise souple imprégnée de résine dans la canalisation existante, puis à la durcir pour former un nouveau tuyau rigide et étanche à l'intérieur de l'ancien." },
      { q: "Pour quels types de canalisations le chemisage est-il adapté ?", a: "Le chemisage convient aux canalisations en béton, grès, fonte, PVC, amiante-ciment. Il est idéal pour les réseaux d'eaux usées (EU), eaux pluviales (EP) et eaux vannes (EV), en diamètre DN80 à DN600." },
      { q: "Combien de temps dure une intervention de chemisage ?", a: "Pour une longueur standard (20 à 50 mètres), l'intervention dure généralement 1 à 2 jours. La remise en service est immédiate après durcissement complet de la résine." },
      { q: "Le chemisage est-il garanti ?", a: "Oui. Nos chemisages sont garantis 10 ans avec possibilité d'extension. Nous remettons un dossier technique complet incluant les rapports caméra avant/après." },
      { q: "Quels signes indiquent qu'une canalisation nécessite un chemisage ?", a: "Infiltrations d'eau, odeurs persistantes, canalisations fissurées ou corrodées, joints défaillants, racines d'arbres pénétrantes. Une inspection caméra permet de confirmer le diagnostic." },
    ],
  },
  {
    slug: "inspection-camera",
    badge: "Diagnostic Vidéo",
    title: "Inspection Caméra Canalisation",
    subtitle: "Diagnostic vidéo HD & robot d'inspection — Île-de-France",
    description:
      "Qadus réalise l'inspection caméra de vos canalisations en Île-de-France. Caméra endoscopique HD, robot télécommandé, rapport normalisé. Particuliers, syndics, collectivités.",
    heroImage:
      "https://images.pexels.com/photos/35290678/pexels-photo-35290678.jpeg?auto=compress&cs=tinysrgb&w=1400&fit=crop",
    heroImageAlt: "Technicien analysant un diagnostic sur écran — inspection caméra canalisation",
    benefits: [
      { icon: "📷", title: "Caméra haute définition", text: "Inspection vidéo HD avec enregistrement numérique. Visualisation précise de l'état interne des canalisations." },
      { icon: "🤖", title: "Robot d'inspection", text: "Pour les grands diamètres, notre robot télécommandé inspecte les réseaux jusqu'à DN600 sur des centaines de mètres." },
      { icon: "📍", title: "Localisation précise", text: "Sonde de localisation transmetteur intégrée pour repérer exactement la position des anomalies sans fouille." },
      { icon: "📄", title: "Rapport vidéo complet", text: "Rapport d'inspection normalisé avec enregistrement vidéo, photos horodatées, cotes et préconisations." },
      { icon: "🔍", title: "Tous réseaux inspectés", text: "Canalisations EU, EV, EP, réseaux collectifs, branchements particuliers. Diamètres DN50 à DN600." },
      { icon: "⚡", title: "Résultat immédiat", text: "Diagnostic sur place en temps réel. Vous voyez l'état de vos canalisations en direct sur notre écran." },
    ],
    steps: [
      { num: "1", title: "Introduction de la caméra", text: "La caméra endoscopique ou le robot est introduit dans la canalisation via un regard ou un accès existant." },
      { num: "2", title: "Inspection & enregistrement", text: "Inspection complète avec enregistrement vidéo HD. Chaque anomalie est notée : position, nature, gravité." },
      { num: "3", title: "Rapport & préconisations", text: "Rapport d'inspection remis sur place. Préconisations de travaux avec devis si nécessaire." },
    ],
    faqs: [
      { q: "Pourquoi faire inspecter ses canalisations ?", a: "L'inspection caméra permet de détecter fuites, fissures, racines intruses, joints défaillants et obstructions avant qu'ils ne causent des dommages importants. C'est aussi obligatoire lors de la vente d'un bien immobilier dans certaines communes." },
      { q: "Combien coûte une inspection caméra ?", a: "Le prix dépend de la longueur à inspecter et du type de réseau. Comptez en moyenne 150€ à 400€ pour un branchement particulier standard. Devis gratuit sur demande." },
      { q: "L'inspection caméra est-elle destructive ?", a: "Non, l'inspection caméra est totalement non destructive. La caméra est introduite via les regards ou accès existants sans aucune démolition." },
      { q: "Le rapport est-il utilisable pour des démarches administratives ?", a: "Oui, notre rapport d'inspection est normalisé et peut être utilisé pour des démarches auprès de votre mairie, assurance ou syndic de copropriété." },
      { q: "Quels défauts peut-on détecter avec une caméra ?", a: "Fissures, fractures, déformations, infiltrations de racines, joints défaillants, corps étrangers, contre-pentes, bouchons partiels, corrosion et effondrements de canalisation." },
    ],
  },
  {
    slug: "assainissement",
    badge: "Assainissement & Réseaux",
    title: "Assainissement Île-de-France",
    subtitle: "Bacs à graisse, postes de relevage, réseaux EU/EV/EP",
    description:
      "Qadus est votre spécialiste assainissement en Île-de-France. Installation et entretien de bacs à graisse, postes de relevage, séparateurs hydrocarbures, diagnostics de conformité. Particuliers, restaurateurs, collectivités.",
    heroImage:
      "https://images.pexels.com/photos/32257223/pexels-photo-32257223.jpeg?auto=compress&cs=tinysrgb&w=1400&fit=crop",
    heroImageAlt: "Technicien intervenant sur un collecteur d'assainissement en béton",
    benefits: [
      { icon: "🍳", title: "Bacs à graisse", text: "Installation, entretien et vidange de bacs à graisse pour restaurants, cantines, cuisines professionnelles. Conformité réglementaire garantie." },
      { icon: "⬆️", title: "Postes de relevage", text: "Installation, dépannage et maintenance de postes de relevage et pompes de refoulement pour tous types de bâtiments." },
      { icon: "🌊", title: "Réseaux EU, EV & EP", text: "Conception, réhabilitation et entretien des réseaux d'eaux usées (EU), eaux vannes (EV) et eaux pluviales (EP)." },
      { icon: "⛽", title: "Séparateurs hydrocarbures", text: "Installation et vidange de séparateurs hydrocarbures pour parkings, garages, stations-service. Conformité Loi sur l'Eau." },
      { icon: "📋", title: "Conformité & diagnostics", text: "Diagnostic de conformité assainissement pour vente immobilière, permis de construire, mise aux normes." },
      { icon: "🏭", title: "Industries & collectivités", text: "Nous intervenons pour les industriels, collectivités, établissements scolaires, centres commerciaux et copropriétés." },
    ],
    steps: [
      { num: "1", title: "Audit & diagnostic", text: "Inspection complète de votre réseau d'assainissement. Identification des dysfonctionnements et non-conformités." },
      { num: "2", title: "Travaux & installation", text: "Réalisation des travaux : installation, remplacement ou réhabilitation des équipements selon les normes en vigueur." },
      { num: "3", title: "Mise en service & suivi", text: "Tests de fonctionnement, remise de dossier technique complet. Contrat d'entretien disponible." },
    ],
    faqs: [
      { q: "Quand faut-il vidanger un bac à graisse ?", a: "Un bac à graisse doit être vidangé lorsque la couche de graisses atteint 50% de la capacité du bac, soit en moyenne tous les 1 à 3 mois pour un restaurant actif. La réglementation impose une fréquence minimale selon le type d'établissement." },
      { q: "Qu'est-ce qu'un poste de relevage ?", a: "Un poste de relevage est un équipement qui pompe les eaux usées pour les refouler vers le réseau public lorsque la gravité ne suffit pas (sous-sol, maison basse). En cas de panne, les eaux ne peuvent plus s'évacuer." },
      { q: "Le diagnostic assainissement est-il obligatoire pour vendre ?", a: "Oui, dans les communes raccordées à l'assainissement collectif, un diagnostic peut être exigé. Pour l'assainissement non collectif (fosse septique), le diagnostic est obligatoire lors de toute vente immobilière." },
      { q: "Intervenez-vous sur les réseaux pluviaux ?", a: "Oui, nous intervenons sur les réseaux d'eaux pluviales (EP) : curage, réhabilitation, branchements, avaloirs et caniveaux, bassins de rétention." },
      { q: "Proposez-vous des contrats d'entretien ?", a: "Oui, nous proposons des contrats d'entretien annuels pour bacs à graisse, postes de relevage et séparateurs hydrocarbures. Visite préventive, rapport d'entretien et intervention prioritaire inclus." },
    ],
  },
];
