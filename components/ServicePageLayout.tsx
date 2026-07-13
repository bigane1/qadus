import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import FloatingCTA from "./FloatingCTA";
import { TEL_DISPLAY, telHref, whatsappHref } from "@/lib/contact";

interface Faq {
  q: string;
  a: string;
}

interface ServicePageLayoutProps {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
  benefits: { icon: string; title: string; text: string }[];
  steps: { num: string; title: string; text: string }[];
  faqs: Faq[];
  relatedServices: { href: string; label: string; icon: string }[];
  beforeAfter?: {
    title: string;
    before: { src: string; alt: string; label: string };
    after: { src: string; alt: string; label: string };
  };
}

export default function ServicePageLayout({
  badge,
  title,
  subtitle,
  description,
  heroImage,
  heroImageAlt,
  benefits,
  steps,
  faqs,
  relatedServices,
  beforeAfter,
}: ServicePageLayoutProps) {
  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-orange-500/20 text-orange-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 border border-orange-500/30">
              {badge}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight">
              {title}
            </h1>
            <p className="text-xl text-blue-200 mb-2 font-medium">{subtitle}</p>
            <p className="text-base text-blue-300/80 max-w-2xl mx-auto mb-10">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={telHref}
                className="flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-black px-8 py-4 rounded-2xl text-lg transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/40"
              >
                <span className="text-2xl">📞</span>
                {TEL_DISPLAY} — Appel gratuit
              </a>
              <a
                href={whatsappHref("Bonjour Qadus, j'ai besoin d'un devis pour ")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:-translate-y-1"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-blue-300">
              <span>✅ Devis gratuit</span>
              <span>✅ Intervention 24h/24 — 7j/7</span>
              <span>✅ Île-de-France</span>
              <span>✅ Techniciens certifiés</span>
            </div>
          </div>
        </section>

        {/* Photo hero service */}
        <section className="relative h-72 sm:h-96 overflow-hidden">
          <img
            src={heroImage}
            alt={heroImageAlt}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent flex items-center px-8">
            <div className="max-w-md text-white">
              <p className="text-2xl font-black mb-2">{subtitle}</p>
              <p className="text-blue-200 text-sm">{description}</p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-black text-slate-900 text-center mb-12">
              Pourquoi choisir Qadus ?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-blue-200 hover:shadow-md transition-all"
                >
                  <div className="text-4xl mb-4">{b.icon}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{b.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 px-4 bg-blue-900 text-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black text-center mb-12">
              Notre méthode d&apos;intervention
            </h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {steps.map((s) => (
                <div key={s.num} className="text-center">
                  <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center text-xl font-black mx-auto mb-4">
                    {s.num}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                  <p className="text-blue-200 text-sm leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {beforeAfter && (
          <section className="py-16 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-black text-slate-900 text-center mb-10">
                {beforeAfter.title}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
                  <img src={beforeAfter.before.src} alt={beforeAfter.before.alt} className="w-full h-72 object-cover" loading="lazy" />
                  <div className="px-5 py-4">
                    <p className="text-sm font-bold uppercase tracking-wide text-red-700">{beforeAfter.before.label}</p>
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
                  <img src={beforeAfter.after.src} alt={beforeAfter.after.alt} className="w-full h-72 object-cover" loading="lazy" />
                  <div className="px-5 py-4">
                    <p className="text-sm font-bold uppercase tracking-wide text-green-700">{beforeAfter.after.label}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-slate-900 text-center mb-10">
              Questions fréquentes
            </h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="bg-white border border-slate-200 rounded-2xl px-6 py-4 group cursor-pointer"
                >
                  <summary className="font-semibold text-slate-900 list-none flex justify-between items-center gap-4">
                    {f.q}
                    <span className="text-blue-600 text-xl group-open:rotate-45 transition-transform flex-shrink-0">+</span>
                  </summary>
                  <p className="mt-3 text-slate-500 text-sm leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-16 px-4 bg-orange-500 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-black mb-3">Besoin d&apos;une intervention ?</h2>
            <p className="text-orange-100 mb-8 text-lg">
              Appelez maintenant ou envoyez une demande de devis gratuit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={telHref}
                className="flex items-center justify-center gap-2 bg-white text-orange-600 hover:bg-orange-50 font-black px-8 py-4 rounded-2xl text-lg transition-all hover:-translate-y-0.5"
              >
                📞 {TEL_DISPLAY}
              </a>
              <Link
                href="/#contact"
                className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 border border-orange-400 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:-translate-y-0.5"
              >
                Demander un devis gratuit →
              </Link>
            </div>
          </div>
        </section>

        {/* Related services */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-slate-900 text-center mb-8">
              Nos autres services
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {relatedServices.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="flex items-center gap-2 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 hover:border-blue-200 rounded-full px-5 py-2.5 text-sm font-medium text-slate-700 transition-all"
                >
                  <span>{s.icon}</span> {s.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
