import { heroHighlights, heroImage } from "@/lib/images";
import { TEL_DISPLAY, telHref, whatsappHref } from "@/lib/contact";

const stats = [

  { value: "500+", label: "Interventions" },

  { value: "4.9/5", label: "Note Google" },

  { value: "< 2h", label: "Délai moyen" },

  { value: "100%", label: "Devis gratuit" },

];



export default function Hero() {

  return (

    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">

      {/* Fond photo assainissement avec overlay */}

      <div className="absolute inset-0">

        <img

          src={heroImage.src}

          alt={heroImage.alt}

          className="w-full h-full object-cover"

          loading="eager"

        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-blue-950/85 to-slate-900/60" />

      </div>



      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">

        {/* Gauche */}

        <div>

          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/40 text-green-300 text-sm font-semibold px-4 py-2 rounded-full mb-6">

            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

            Techniciens disponibles — Île-de-France 24h/24

          </div>



          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] mb-6">

            Débouchage &amp;{" "}

            <span className="gradient-text">Assainissement</span>

            <br />

            <span className="text-slate-200 text-3xl sm:text-4xl lg:text-5xl font-bold">

              en Île-de-France

            </span>

          </h1>



          <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">

            Curage, chemisage sans tranchée, inspection caméra, bacs à graisse —

            Qadus intervient <strong className="text-white">24h/24 et 7j/7</strong>{" "}

            pour particuliers, syndics et professionnels.

            Devis et déplacement <strong className="text-white">100% gratuits</strong>.

          </p>



          {/* CTA */}

          <div className="flex flex-col sm:flex-row gap-4 mb-8">

            <a

              href={telHref}

              className="group flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/40"

            >

              <span className="text-2xl group-hover:scale-110 transition-transform">📞</span>

              <div className="text-left">

                <div className="text-xs font-normal opacity-80">Appel gratuit — Urgence 24h/24</div>

                <div>{TEL_DISPLAY}</div>

              </div>

            </a>

            <a

              href={whatsappHref()}

              target="_blank"

              rel="noopener noreferrer"

              className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:-translate-y-1"

            >

              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">

                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />

              </svg>

              WhatsApp

            </a>

            <a
              href="/devis"
              className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:-translate-y-1"
            >
              <span className="text-xl">📋</span>
              Devis
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



        {/* Droite — stats + vignettes photos */}

        <div className="flex flex-col gap-4">

          {/* Stats */}

          <div className="grid grid-cols-4 gap-3">

            {stats.map((s) => (

              <div

                key={s.label}

                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center hover:bg-white/15 transition-all"

              >

                <div className="text-2xl font-black text-white mb-0.5">{s.value}</div>

                <div className="text-[10px] text-slate-300 font-medium leading-tight">{s.label}</div>

              </div>

            ))}

          </div>



          {/* Vignettes services avec photos */}

          <div className="grid grid-cols-3 gap-3">

            {heroHighlights.map((h) => (

              <div key={h.label} className="relative rounded-2xl overflow-hidden h-36 group">

                <img

                  src={h.src}

                  alt={h.alt}

                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"

                  loading="eager"

                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />

                <div className="absolute bottom-2 left-0 right-0 text-center text-white text-xs font-bold">

                  {h.label}

                </div>

              </div>

            ))}

          </div>



          {/* Carte urgence */}

          <div className="bg-orange-500/20 border border-orange-500/40 rounded-2xl p-5 flex items-center gap-4 backdrop-blur-sm">

            <div className="text-4xl flex-shrink-0">🚨</div>

            <div>

              <div className="text-white font-black text-base">Urgence ? Appelez maintenant</div>

              <div className="text-orange-300 text-sm mb-1">Intervention en moins de 2 heures</div>

              <a

                href={telHref}

                className="text-orange-300 hover:text-white font-bold text-lg transition-colors underline underline-offset-2"

              >

                {TEL_DISPLAY}

              </a>

            </div>

          </div>

        </div>

      </div>



      {/* Scroll */}

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

