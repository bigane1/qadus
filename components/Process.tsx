import { TEL_DISPLAY, telHref } from "@/lib/contact";

const steps = [
  {
    num: "01",
    icon: "📞",
    title: "Appel gratuit & Diagnostic",
    desc: `Appelez-nous au ${TEL_DISPLAY}. Nous évaluons votre problème par téléphone et vous communiquons une fourchette de tarif avant toute intervention. Devis gratuit sur place après diagnostic.`,
    color: "from-blue-600 to-blue-700",
  },
  {
    num: "02",
    icon: "🔧",
    title: "Intervention rapide",
    desc: "Nos techniciens arrivent avec le matériel adapté (furet, hydrocureur, caméra). Ils interviennent proprement et efficacement, 24h/24 et 7j/7, y compris nuits et week-ends.",
    color: "from-orange-500 to-orange-600",
  },
  {
    num: "03",
    icon: "✅",
    title: "Résultat garanti",
    desc: "Canalisation débouchée, réseau nettoyé ou réhabilité — nous testons le résultat avant de partir. Pas débouché = pas facturé. Rapport d'intervention remis sur demande.",
    color: "from-green-600 to-green-700",
  },
];

export default function Process() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Comment ça marche
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            3 étapes, zéro surprise
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Un processus simple et transparent, du premier appel à l&apos;intervention terminée.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((s) => (
            <div
              key={s.num}
              className="relative bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} text-white text-2xl mb-5 shadow-md`}
              >
                {s.icon}
              </div>
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                Étape {s.num}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={telHref}
            className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/30"
          >
            📞 {TEL_DISPLAY} — Appel gratuit
          </a>
        </div>
      </div>
    </section>
  );
}
