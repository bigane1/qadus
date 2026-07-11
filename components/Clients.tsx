const categories = [
  {
    icon: "🏠",
    title: "Particuliers",
    items: [
      "Appartements & pavillons",
      "Maisons individuelles",
      "Hôtels particuliers",
      "Garages, boxes, caves",
      "Greniers & combles",
    ],
  },
  {
    icon: "🏢",
    title: "Professionnels",
    items: [
      "Syndics de copropriété",
      "Agences immobilières",
      "SCI, avocats, notaires",
      "Hôtels, restaurants, bars",
      "Cliniques & hôpitaux",
    ],
  },
  {
    icon: "🏭",
    title: "Industrie & Collectivités",
    items: [
      "Administrations & mairies",
      "Centres d'épuration",
      "Parkings & espaces communs",
      "Chantiers & constructions",
      "Compagnies d'assurance",
    ],
  },
];

export default function Clients() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-900 to-blue-950 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-white/15 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Nos clients
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Nous intervenons pour tous
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Particuliers, professionnels, collectivités — Qadus adapte son
            intervention à chaque besoin et chaque type de client.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="bg-white/8 backdrop-blur-sm border border-white/12 rounded-2xl p-8 hover:bg-white/12 hover:-translate-y-1 transition-all"
            >
              <div className="text-4xl mb-4">{cat.icon}</div>
              <h3 className="text-xl font-bold text-white mb-5">{cat.title}</h3>
              <ul className="space-y-2.5">
                {cat.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-slate-300 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
