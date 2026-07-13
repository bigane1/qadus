"use client";

import { useState } from "react";
import { ADDRESS_DISPLAY, FACEBOOK_URL, TEL_DISPLAY, telHref, whatsappHref } from "@/lib/contact";

const services = [
  "Débouchage / Dégorgement",
  "Curage de canalisations",
  "Inspection caméra / Robotisée",
  "Chemisage sans tranchée",
  "Assainissement / Réseaux EU-EV-EP",
  "Bac à graisse / Séparateur",
  "Poste de relevage",
  "Nettoyage haute pression",
  "Fuite d'eau / Dégât des eaux",
  "Installation salle de bain",
  "Chauffe-eau / Chaudière",
  "Autre",
];

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      prenom: (form.elements.namedItem("prenom") as HTMLInputElement).value,
      nom: (form.elements.namedItem("nom") as HTMLInputElement).value,
      tel: (form.elements.namedItem("tel") as HTMLInputElement).value,
      ville: (form.elements.namedItem("ville") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("sent");
      } else {
        const json = await res.json().catch(() => ({}));
        setErrorMsg(json.error || "Une erreur est survenue. Veuillez réessayer.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Impossible de contacter le serveur. Veuillez réessayer.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Devis gratuit
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            Contactez Qadus
          </h2>
          <p className="text-lg text-slate-500">
            Réponse sous 2h en journée. Devis 100% gratuit et sans engagement.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Info */}
          <div className="lg:col-span-2 space-y-5">
            {[
              {
                icon: "📞",
                label: "Urgence & Devis",
                value: TEL_DISPLAY,
                href: telHref,
                sub: "Disponible 24h/24 — 7j/7",
              },
              {
                icon: "💬",
                label: "WhatsApp",
                value: "WhatsApp — Réponse rapide",
                href: whatsappHref(),
                sub: "Envoyez vos photos / vidéos",
              },
              {
                icon: "📧",
                label: "Email",
                value: "qadus.paris@gmail.com",
                href: "mailto:qadus.paris@gmail.com",
                sub: "Réponse sous 2h",
              },
              {
                icon: "📍",
                label: "Adresse",
                value: ADDRESS_DISPLAY,
                href: "https://maps.google.com/?q=54+rue+Sainte-Honorine+78955+Carrieres-sous-Poissy",
                sub: "78955 Carrières-sous-Poissy",
              },
              {
                icon: "📘",
                label: "Facebook",
                value: "Suivre QADUS",
                href: FACEBOOK_URL,
                sub: "Actualités et réalisations",
              },
            ].map((c) => (
              <div
                key={c.label}
                className="flex gap-4 items-start bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-200 hover:shadow-md transition-all"
              >
                <span className="text-3xl">{c.icon}</span>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">
                    {c.label}
                  </div>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="font-bold text-blue-700 hover:text-blue-900 transition-colors"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <span className="font-bold text-slate-900">{c.value}</span>
                  )}
                  <div className="text-xs text-slate-400 mt-0.5">{c.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm"
          >
            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center gap-4">
                <span className="text-6xl">✅</span>
                <h3 className="text-2xl font-black text-slate-900">
                  Message envoyé !
                </h3>
                <p className="text-slate-500">
                  Nous vous répondons dans les 2 heures. Pour une urgence,
                  appelez directement le{" "}
                  <a
                    href={telHref}
                    className="text-orange-500 font-bold"
                  >
                    {TEL_DISPLAY}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      name="prenom"
                      required
                      placeholder="Jean"
                      className="w-full border-2 border-slate-200 focus:border-blue-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Nom *
                    </label>
                    <input
                      type="text"
                      name="nom"
                      required
                      placeholder="Dupont"
                      className="w-full border-2 border-slate-200 focus:border-blue-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      name="tel"
                      required
                      placeholder="06 12 34 56 78"
                      className="w-full border-2 border-slate-200 focus:border-blue-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Ville *
                    </label>
                    <input
                      type="text"
                      name="ville"
                      required
                      placeholder="Poissy"
                      className="w-full border-2 border-slate-200 focus:border-blue-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Type d&apos;intervention
                  </label>
                  <select
                    name="service"
                    className="w-full border-2 border-slate-200 focus:border-blue-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors bg-slate-50 focus:bg-white"
                  >
                    <option value="">Sélectionner un service</option>
                    {services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Décrivez votre problème *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Ex : Évier bouché depuis 2 jours, eau qui remonte dans la baignoire..."
                    className="w-full border-2 border-slate-200 focus:border-blue-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors bg-slate-50 focus:bg-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white font-bold py-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200 text-base"
                >
                  {status === "sending" ? "Envoi en cours..." : "Envoyer ma demande gratuite →"}
                </button>
                {status === "error" && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mt-3 text-center">
                    {errorMsg}
                  </p>
                )}
                <p className="text-xs text-slate-400 text-center mt-3">
                  * Champs obligatoires. Vos données ne sont jamais partagées.
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
