const TEL = "0761916222";
const TEL_DISPLAY = "07 61 91 62 22";

const steps = [
  {
    num: "01",
    icon: "📞",
    title: "Appel gratuit & Diagnostic",
    desc: "Appelez-nous au 07 61 91 62 22. Nous évaluons votre problème par téléphone et vous communiquons une fourchette de tarif avant toute intervention. Devis gratuit sur place après diagnostic.",
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
    desc: "Pas débouché = pas facturé. Si l'intervention ne donne pas satisfaction, nous revenons gratuitement. Une facture détaillée vous est remise en fin d'intervention.",
    color: "from-green-500 to-green-600",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Comment ça marche
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            3 étapes simples
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            De votre appel à la résolution du problème — rapide, transparent, garanti.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector lines */}
          <div className="hidden md:block absolute top-16 left-[33%] right-[33%] h-0.5 bg-gradient-to-r from-blue-600 via-orange-500 to-green-500 opacity-30" />

          {steps.map((step, i) => (
            <div key={step.num} className="relative text-center">
              {/* Number badge */}
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} text-white text-2xl font-black mb-6 shadow-lg`}
              >
                {step.icon}
              </div>
              <div
                className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-6 h-6 rounded-full bg-gradient-to-br ${step.color} text-white text-xs font-black flex items-center justify-center`}
              >
                {i + 1}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 to-blue-950 rounded-3xl p-8 sm:p-10 text-center">
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Prêt à intervenir maintenant
          </h3>
          <p className="text-slate-400 mb-6">
            Un seul appel suffit. Devis gratuit — pas de surprise sur la facture.
          </p>
          <a
            href={`tel:+33${TEL.substring(1)}`}
            className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/40"
          >
            <span className="text-2xl">📞</span>
            {TEL_DISPLAY} — Appel gratuit
          </a>
        </div>
      </div>
    </section>
  );
}
