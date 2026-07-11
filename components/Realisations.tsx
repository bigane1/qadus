const realisations = [
  {
    type: "Débouchage WC",
    lieu: "Poissy — Résidence",
    description: "Bouchon récurrent causé par accumulation de lingettes. Débouchage par hydrocurage haute pression.",
    resultat: "Réseau totalement dégagé en 45 min",
    icon: "🚽",
    color: "blue",
  },
  {
    type: "Inspection caméra",
    lieu: "Conflans-Sainte-Honorine — Copropriété",
    description: "Diagnostic demandé par le syndic suite à refoulement régulier. Caméra endoscopique sur 40 m de réseau.",
    resultat: "Racines localisées à 18 m — curage effectué",
    icon: "📷",
    color: "purple",
  },
  {
    type: "Chemisage sans tranchée",
    lieu: "Paris 16ème — Immeuble haussmannien",
    description: "Canalisation fonte vieillissante avec fissures multiples. Chemisage CIPP sur 22 m sans aucun travaux de terrassement.",
    resultat: "Économie de 60% vs remplacement classique",
    icon: "🧱",
    color: "orange",
  },
  {
    type: "Curage hydrocurage",
    lieu: "Versailles — Restaurant",
    description: "Bac à graisse saturé et colonnes d'évacuation encrassées. Curage complet avec camion hydrocureur.",
    resultat: "Réseau nettoyé — contrat d'entretien annuel signé",
    icon: "🔩",
    color: "green",
  },
  {
    type: "Assainissement",
    lieu: "Les Mureaux — Maison individuelle",
    description: "Installation d'un système d'assainissement individuel (fosse + filtre) conforme aux normes DTU.",
    resultat: "Mise en conformité validée par la SPANC",
    icon: "♻️",
    color: "teal",
  },
  {
    type: "Poste de relevage",
    lieu: "Nanterre — Zone industrielle",
    description: "Panne de pompe de relevage causant refoulement des eaux usées. Remplacement d'urgence de la pompe.",
    resultat: "Remis en service en 2h, zéro interruption d'activité",
    icon: "⚙️",
    color: "red",
  },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700 border-blue-200",
  purple: "bg-purple-100 text-purple-700 border-purple-200",
  orange: "bg-orange-100 text-orange-700 border-orange-200",
  green: "bg-green-100 text-green-700 border-green-200",
  teal: "bg-teal-100 text-teal-700 border-teal-200",
  red: "bg-red-100 text-red-700 border-red-200",
};

export default function Realisations() {
  return (
    <section id="realisations" className="py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Nos réalisations
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            Interventions récentes
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Des résultats concrets et garantis sur tous types d&apos;interventions
            en Île-de-France.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {realisations.map((r) => (
            <div
              key={r.type + r.lieu}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              {/* Header carte */}
              <div className={`px-6 py-4 flex items-center gap-3 border-b ${colorMap[r.color]}`}>
                <span className="text-3xl">{r.icon}</span>
                <div>
                  <div className="font-bold text-sm">{r.type}</div>
                  <div className="text-xs opacity-70 flex items-center gap-1">
                    📍 {r.lieu}
                  </div>
                </div>
              </div>

              {/* Corps */}
              <div className="px-6 py-5">
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {r.description}
                </p>
                <div className="flex items-start gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                  <span className="text-green-600 font-bold text-base mt-0.5">✓</span>
                  <p className="text-sm text-green-800 font-semibold">{r.resultat}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note galerie */}
        <div className="mt-10 text-center">
          <p className="text-slate-400 text-sm">
            📸 Photos et vidéos de nos interventions disponibles sur demande.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 mt-4 bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Demander un devis gratuit →
          </a>
        </div>
      </div>
    </section>
  );
}
