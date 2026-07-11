const avis = [
  {
    name: "Fabrice D.",
    date: "Juin 2026",
    service: "Débouchage canalisation",
    note: 5,
    text: "Très bonne expérience avec ce professionnel. Contacté pour un débouchage d'urgence, très bon contact au téléphone. L'ouvrier envoyé était super sympa et professionnel. Travail net et rapide !",
  },
  {
    name: "Marie-Claude R.",
    date: "Mai 2026",
    service: "Curage hydrocurage",
    note: 5,
    text: "Super service, équipe agréable et très efficace. Très bon rapport qualité-prix. Le technicien a tout expliqué avant d'intervenir. Je recommande vivement.",
  },
  {
    name: "Thomas L.",
    date: "Avril 2026",
    service: "Fuite d'eau urgence",
    note: 5,
    text: "Intervention en pleine nuit pour une fuite importante. Arrivée en moins de 30 minutes, problème résolu en une heure. Prix transparent, aucune surprise. Merci Qadus !",
  },
  {
    name: "Sophie M.",
    date: "Mars 2026",
    service: "Inspection caméra",
    note: 5,
    text: "Inspection caméra pour localiser un bouchon récurrent. Diagnostic précis, rapport fourni pour l'assurance. Très professionnels. Je recommande à 100%.",
  },
  {
    name: "Pierre & Anne G.",
    date: "Février 2026",
    service: "Assainissement",
    note: 5,
    text: "Travaux d'assainissement pour notre maison. Équipe sérieuse, travail impeccable et dans les délais annoncés. Tarifs honnêtes et conformes au devis. Bravo !",
  },
  {
    name: "Julie K.",
    date: "Janvier 2026",
    service: "Débouchage WC",
    note: 5,
    text: "WC bouché un dimanche matin. En 20 minutes ils étaient là. Intervention propre et efficace. Prix correct par rapport aux autres devis. Je les rappellerai sans hésiter.",
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < n ? "text-yellow-400" : "text-slate-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="avis" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-yellow-100 text-yellow-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Avis clients
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            Ce que disent nos clients
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <Stars n={5} />
            <span className="text-2xl font-black text-slate-900">4.9/5</span>
            <span className="text-slate-500">· 500+ avis vérifiés</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {avis.map((a) => (
            <div
              key={a.name}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-blue-200 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-bold text-slate-900">{a.name}</div>
                  <div className="text-xs text-slate-400">{a.date}</div>
                </div>
                <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-1 rounded-full">
                  {a.service}
                </span>
              </div>
              <Stars n={a.note} />
              <p className="mt-3 text-sm text-slate-600 leading-relaxed italic">
                &ldquo;{a.text}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* Google badge */}
        <div className="mt-10 text-center">
          <span className="inline-flex items-center gap-2 text-sm text-slate-500 bg-slate-50 border border-slate-200 px-4 py-2 rounded-full">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Avis Google vérifiés
          </span>
        </div>
      </div>
    </section>
  );
}
