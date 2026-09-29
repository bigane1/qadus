import { getSiteContent } from "@/lib/site-content";
import type { RealisationColor } from "@/lib/realisations-defaults";

const colorMap: Record<RealisationColor, string> = {
  blue: "bg-blue-100 text-blue-700 border-blue-200",
  purple: "bg-purple-100 text-purple-700 border-purple-200",
  orange: "bg-orange-100 text-orange-700 border-orange-200",
  green: "bg-green-100 text-green-700 border-green-200",
  teal: "bg-teal-100 text-teal-700 border-teal-200",
  red: "bg-red-100 text-red-700 border-red-200",
};

export default function Realisations() {
  const { realisationsSection, realisationsFooterNote, realisations } = getSiteContent();

  return (
    <section id="realisations" className="py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            {realisationsSection.badge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            {realisationsSection.title}
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">{realisationsSection.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {realisations.map((r) => (
            <div
              key={r.type + r.lieu}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="relative h-44 overflow-hidden">
                {r.beforeImage && r.afterImage ? (
                  <div className="grid grid-cols-2 h-full">
                    <div className="relative">
                      <img
                        src={r.beforeImage}
                        alt="Avant intervention"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute bottom-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        Avant
                      </span>
                    </div>
                    <div className="relative">
                      <img
                        src={r.afterImage}
                        alt="Après intervention"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute bottom-2 left-2 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        Après
                      </span>
                    </div>
                  </div>
                ) : (
                  <img
                    src={r.image}
                    alt={r.imageAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
                <div
                  className={`absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${colorMap[r.color] ?? colorMap.blue}`}
                >
                  <span>{r.icon}</span> {r.type}
                </div>
              </div>

              <div className="px-5 py-4">
                <div className="text-xs text-slate-400 mb-2 flex items-center gap-1">📍 {r.lieu}</div>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">{r.description}</p>
                <div className="flex items-start gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2.5">
                  <span className="text-green-600 font-bold text-base mt-0.5">✓</span>
                  <p className="text-sm text-green-800 font-semibold">{r.resultat}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-slate-400 text-sm">{realisationsFooterNote}</p>
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
