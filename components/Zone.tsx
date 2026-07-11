import { TEL_DISPLAY, telHref } from "@/lib/contact";

const departements = [
  {
    code: "78",
    name: "Yvelines",
    communes: [
      "Poissy", "Versailles", "Saint-Germain-en-Laye", "Conflans-Sainte-Honorine",
      "Achères", "Les Mureaux", "Meulan-en-Yvelines", "Andrésy",
      "Triel-sur-Seine", "Verneuil-sur-Seine", "Orgeval", "Aubergenville",
    ],
  },
  {
    code: "75",
    name: "Paris",
    communes: [
      "Paris 1er–10ème", "Paris 11ème–20ème",
    ],
  },
  {
    code: "92",
    name: "Hauts-de-Seine",
    communes: [
      "Nanterre", "Boulogne-Billancourt", "Rueil-Malmaison",
      "Courbevoie", "Colombes", "Asnières-sur-Seine",
    ],
  },
  {
    code: "93",
    name: "Seine-Saint-Denis",
    communes: [
      "Saint-Denis", "Montreuil", "Aubervilliers", "Bobigny",
    ],
  },
  {
    code: "94",
    name: "Val-de-Marne",
    communes: [
      "Créteil", "Vincennes", "Vitry-sur-Seine", "Champigny-sur-Marne",
    ],
  },
  {
    code: "91",
    name: "Essonne",
    communes: [
      "Évry-Courcouronnes", "Corbeil-Essonnes", "Massy", "Palaiseau",
    ],
  },
  {
    code: "95",
    name: "Val-d'Oise",
    communes: [
      "Cergy", "Argenteuil", "Sarcelles", "Pontoise",
    ],
  },
  {
    code: "77",
    name: "Seine-et-Marne",
    communes: [
      "Meaux", "Melun", "Chelles", "Pontault-Combault",
    ],
  },
];

export default function Zone() {
  return (
    <section id="zone" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Zone d&apos;intervention
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            Toute l&apos;Île-de-France
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Basés à <strong>Poissy (78)</strong>, nous intervenons dans tous les départements
            d&apos;Île-de-France. Déplacement gratuit — réponse rapide partout.
          </p>
        </div>

        {/* Départements IDF */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {departements.map((dep) => (
            <div
              key={dep.code}
              className={`rounded-2xl border p-5 transition-all hover:-translate-y-1 hover:shadow-lg ${
                dep.code === "78"
                  ? "bg-blue-700 border-blue-600 text-white"
                  : "bg-slate-50 border-slate-200 hover:border-blue-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`text-xs font-black px-2 py-1 rounded-lg ${
                    dep.code === "78"
                      ? "bg-white/20 text-white"
                      : "bg-blue-700 text-white"
                  }`}
                >
                  {dep.code}
                </span>
                <span
                  className={`font-bold text-sm ${
                    dep.code === "78" ? "text-white" : "text-slate-900"
                  }`}
                >
                  {dep.name}
                </span>
                {dep.code === "78" && (
                  <span className="text-xs bg-orange-400 text-white px-1.5 py-0.5 rounded-full font-semibold">
                    Base
                  </span>
                )}
              </div>
              <ul className="space-y-1">
                {dep.communes.map((c) => (
                  <li
                    key={c}
                    className={`text-xs flex items-center gap-1.5 ${
                      dep.code === "78" ? "text-blue-100" : "text-slate-500"
                    }`}
                  >
                    <span className="w-1 h-1 rounded-full bg-current flex-shrink-0 opacity-60" />
                    {c}
                  </li>
                ))}
                <li
                  className={`text-xs italic ${
                    dep.code === "78" ? "text-blue-200" : "text-slate-400"
                  }`}
                >
                  Et toutes communes…
                </li>
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 text-center">
          <p className="text-slate-700 font-semibold mb-1">
            Votre commune n&apos;est pas listée ?
          </p>
          <p className="text-slate-500 text-sm mb-4">
            Nous intervenons dans toute l&apos;Île-de-France. Appelez-nous pour vérifier.
          </p>
          <a
            href={telHref}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-200"
          >
            📞 {TEL_DISPLAY} — Appel gratuit
          </a>
        </div>
      </div>
    </section>
  );
}
