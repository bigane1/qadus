const engagements = [
  {
    icon: "🚫💰",
    title: "Pas débouché = Pas facturé",
    desc: "Si nous ne résolvons pas votre problème, vous ne payez rien. C'est notre engagement de satisfaction totale.",
    highlight: true,
  },
  {
    icon: "🎯",
    title: "Devis & déplacement gratuits",
    desc: "Le tarif est communiqué avant toute intervention. Aucun frais de déplacement ni de diagnostic.",
    highlight: true,
  },
  {
    icon: "🏅",
    title: "Agréé toutes assurances",
    desc: "Nos interventions sont conformes aux exigences des compagnies d'assurance. Rapport d'intervention fourni.",
  },
  {
    icon: "⚡",
    title: "Disponible 24h/24 – 7j/7",
    desc: "365 jours par an, nuits et jours fériés inclus. Nous répondons toujours à vos urgences.",
  },
  {
    icon: "🔬",
    title: "Matériel de dernière génération",
    desc: "Caméra endoscopique, hydrocureur 350 bars, furet électrique professionnel — diagnostic fiable et intervention efficace.",
  },
  {
    icon: "👷",
    title: "Particuliers & Professionnels",
    desc: "Syndics, agences immobilières, hôtels, cliniques, collectivités — nous adaptons notre intervention à chaque client.",
  },
  {
    icon: "📄",
    title: "Prix transparent",
    desc: "Tarif annoncé par téléphone avant déplacement. Devis écrit sur place. Aucune mauvaise surprise sur la facture.",
  },
  {
    icon: "🌍",
    title: "Yvelines – Paris – Île-de-France",
    desc: "Basés à Poissy (78), nous intervenons dans tout le département des Yvelines et en Île-de-France.",
  },
];

export default function Engagements() {
  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Nos engagements
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            Pourquoi choisir Qadus ?
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Des engagements concrets, pas des promesses — votre satisfaction est notre priorité absolue.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {engagements.map((e) => (
            <div
              key={e.title}
              className={`rounded-2xl p-6 border transition-all hover:-translate-y-1 hover:shadow-lg ${
                e.highlight
                  ? "bg-blue-700 border-blue-600 text-white hover:shadow-blue-500/30"
                  : "bg-white border-slate-200 hover:border-blue-200 hover:shadow-blue-50"
              }`}
            >
              <div className="text-3xl mb-3">{e.icon}</div>
              <h3
                className={`font-bold mb-2 ${
                  e.highlight ? "text-white" : "text-slate-900"
                }`}
              >
                {e.title}
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  e.highlight ? "text-blue-100" : "text-slate-500"
                }`}
              >
                {e.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
