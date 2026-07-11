const plomberie = [
  {
    icon: "💧",
    title: "Fuite & Dégât des eaux",
    desc: "Détection et réparation de fuites, robinets, joints, tuyaux encastrés. Intervention rapide pour limiter les dégâts et éviter les sinistres.",
    tag: "Urgence",
  },
  {
    icon: "🚿",
    title: "Salle de bain",
    desc: "Installation et rénovation complète : douche, baignoire, lavabo, WC. Tous styles, toutes marques, travail soigné et garanti.",
    tag: "Rénovation",
  },
  {
    icon: "🔥",
    title: "Chauffe-eau & Chaudière",
    desc: "Installation, remplacement et dépannage de chauffe-eau électrique, thermodynamique et chaudière. Toutes marques.",
    tag: "Installation",
  },
  {
    icon: "🔧",
    title: "Robinetterie & Sanitaire",
    desc: "Remplacement de robinet, mitigeur, douchette, flexible. Réparation de tout équipement sanitaire.",
    tag: "Dépannage",
  },
  {
    icon: "🏠",
    title: "Travaux neufs",
    desc: "Installation complète de réseau de plomberie pour construction neuve ou rénovation totale.",
    tag: "Travaux",
  },
];

const debouchage = [
  {
    icon: "🚽",
    title: "Débouchage de canalisations",
    desc: "Débouchage manuel, mécanique ou haute pression (hydrocurage). WC, évier, douche, baignoire, colonnes d'immeuble. Résultat garanti ou remboursé.",
    tag: "Garanti",
    highlight: true,
  },
  {
    icon: "🌊",
    title: "Dégorgement d'urgence",
    desc: "Mauvais écoulement, engorgement total, refoulement d'égouts — intervention immédiate 24h/24 pour débloquer vos installations.",
    tag: "24h/24",
  },
  {
    icon: "🔩",
    title: "Curage préventif & curatif",
    desc: "Curage par hydrocurage haute pression. Restitue le diamètre d'origine à vos tuyaux. Entretien annuel conseillé pour éviter les bouchons récurrents.",
    tag: "Préventif",
  },
  {
    icon: "📷",
    title: "Inspection caméra & Diagnostic",
    desc: "Caméra endoscopique couleur pour localiser bouchons, fissures, racines, cassures. Rapport vidéo fourni. Agréé assurances.",
    tag: "Diagnostic",
  },
  {
    icon: "🤖",
    title: "Inspection robotisée",
    desc: "Robot d'inspection motorisé pour les canalisations de grand diamètre ou inaccessibles. Cartographie précise de votre réseau. Rapport complet remis.",
    tag: "Technologie",
  },
  {
    icon: "🧱",
    title: "Chemisage de canalisations",
    desc: "Réhabilitation de canalisations sans tranchée (CIPP). Technologie innovante qui refait l'intérieur du tuyau sans travaux de terrassement. Moins cher, plus rapide.",
    tag: "Sans tranchée",
    highlight: true,
  },
  {
    icon: "♻️",
    title: "Assainissement & Travaux EU/EV/EP",
    desc: "Installation, entretien et réhabilitation de réseaux d'assainissement eaux usées (EU), eaux vannes (EV) et eaux pluviales (EP). Collectif et individuel.",
    tag: "Réseaux",
  },
  {
    icon: "🛢️",
    title: "Bacs à graisse & Séparateurs",
    desc: "Installation, entretien et vidange de bacs à graisse et séparateurs d'hydrocarbures. Indispensable pour restaurants, garages et industries.",
    tag: "Industrie",
  },
  {
    icon: "⚙️",
    title: "Postes de relevage",
    desc: "Réparation, entretien et installation de postes de relevage et pompes de relevage. Intervention rapide en cas de panne.",
    tag: "Maintenance",
  },
  {
    icon: "💦",
    title: "Nettoyage haute pression",
    desc: "Nettoyage HP professionnel : conduites, canaux, parkings, élimination de graffitis. Secteur industrie & collectivités. Camion hydrocureur disponible.",
    tag: "Industriel",
  },
  {
    icon: "🚛",
    title: "Camion hydrocureur",
    desc: "Camion déboucheur haute pression (jusqu'à 350 bars) pour gros réseaux et interventions complexes. Efficace sur tous types de canalisations.",
    tag: "Gros travaux",
  },
  {
    icon: "⚡",
    title: "Urgence 24h/24 – 7j/7",
    desc: "Nuit, week-end, jours fériés — nous intervenons à tout moment. Appel gratuit, déplacement gratuit. Tarif annoncé avant intervention.",
    tag: "Toujours disponible",
    highlight: true,
  },
];

function ServiceCard({
  icon,
  title,
  desc,
  tag,
  highlight = false,
}: {
  icon: string;
  title: string;
  desc: string;
  tag: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`group relative rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
        highlight
          ? "bg-blue-700 border-blue-600 text-white hover:shadow-blue-500/30"
          : "bg-white border-slate-200 hover:border-blue-300 hover:shadow-blue-100"
      }`}
    >
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-blue-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="text-4xl mb-4">{icon}</div>
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3
          className={`font-bold text-base ${
            highlight ? "text-white" : "text-slate-900"
          }`}
        >
          {title}
        </h3>
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${
            highlight
              ? "bg-white/20 text-white"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {tag}
        </span>
      </div>
      <p
        className={`text-sm leading-relaxed ${
          highlight ? "text-blue-100" : "text-slate-500"
        }`}
      >
        {desc}
      </p>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Nos prestations
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            Débouchage, Assainissement<br />& Réhabilitation de canalisations
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Du dépannage d&apos;urgence au chemisage sans tranchée — toutes interventions
            pour particuliers, syndics, collectivités et industries en Île-de-France.
          </p>
        </div>

        {/* Plomberie */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🔧</span>
            <h3 className="text-xl font-bold text-slate-900">Plomberie générale</h3>
            <div className="flex-1 h-px bg-slate-200" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {plomberie.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>

        {/* Débouchage & Assainissement */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🚽</span>
            <h3 className="text-xl font-bold text-slate-900">
              Débouchage, Assainissement &amp; Réhabilitation
            </h3>
            <div className="flex-1 h-px bg-slate-200" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {debouchage.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>

        {/* CTA chemisage — mise en avant */}
        <div className="mt-10 bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="text-5xl">🧱</div>
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block bg-orange-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
              Technologie sans tranchée
            </div>
            <h3 className="text-2xl font-black text-white mb-2">
              Chemisage de canalisations
            </h3>
            <p className="text-slate-300 text-sm">
              Réhabilitez vos canalisations abîmées <strong className="text-white">sans travaux de terrassement</strong>.
              Plus rapide, moins coûteux, aussi solide qu&apos;un tuyau neuf. Idéal pour copropriétés, collectivités et industries.
            </p>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg text-sm whitespace-nowrap"
          >
            Demander un devis →
          </a>
        </div>
      </div>
    </section>
  );
}
