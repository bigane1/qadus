const TEL = "0761916222";
const TEL_DISPLAY = "07 61 91 62 22";

const stats = [
  { value: "500+", label: "Interventions réalisées" },
  { value: "4.9/5", label: "Note clients" },
  { value: "24h/24", label: "Disponibilité" },
  { value: "Gratuit", label: "Devis & déplacement" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full bg-orange-500/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-900/30 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-32 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Disponible maintenant — Île-de-France 24h/24
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] mb-6">
            Débouchage,{" "}
            <span className="gradient-text">Assainissement</span>
            <br />
            &amp; Réhabilitation
            <br />
            <span className="text-slate-300 text-3xl sm:text-4xl lg:text-5xl font-bold">
              en Île-de-France
            </span>
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
            Canalisation bouchée, curage, chemisage sans tranchée, inspection caméra —
            Qadus intervient <strong className="text-white">24h/24 et 7j/7</strong>{" "}
            pour particuliers, syndics et professionnels. Devis et déplacement{" "}
            <strong className="text-white">100% gratuits</strong>.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <a
              href={`tel:+33${TEL.substring(1)}`}
              className="group flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/40"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">📞</span>
              <div className="text-left">
                <div className="text-xs font-normal opacity-80">Appel gratuit — Urgence 24h/24</div>
                <div>{TEL_DISPLAY}</div>
              </div>
            </a>
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-semibold text-base px-8 py-4 rounded-2xl transition-all hover:bg-white/10"
            >
              Devis gratuit en ligne →
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3">
            {[
              "✅ Pas débouché = pas facturé",
              "✅ Agréé toutes assurances",
              "✅ Chemisage sans tranchée",
              "✅ Artisans certifiés",
            ].map((b) => (
              <span
                key={b}
                className="text-sm text-slate-300 bg-white/10 border border-white/15 px-3 py-1.5 rounded-full font-medium"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Right — photo + stats */}
        <div className="relative">
          {/* Photo principale */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/50">
            <img
              src="https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&q=80&auto=format&fit=crop"
              alt="Technicien Qadus en intervention débouchage canalisation"
              className="w-full h-[420px] object-cover"
              loading="eager"
            />
            {/* Badge urgence flottant */}
            <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Technicien disponible maintenant
            </div>
            {/* Overlay bas */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-black">Q</div>
                <div>
                  <div className="text-white font-bold text-sm">Qadus — Île-de-France</div>
                  <div className="text-slate-300 text-xs">Intervention en moins de 2h</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats en dessous */}
          <div className="grid grid-cols-2 gap-3 mt-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-4 text-center"
              >
                <div className="text-3xl font-black text-white mb-0.5">{s.value}</div>
                <div className="text-xs text-slate-300 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll arrow */}
      <a
        href="#urgence"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/70 transition-colors animate-bounce-down"
        aria-label="Défiler"
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
