"use client";

import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/site-content";

export default function AdminClient() {
  const [password, setPassword] = useState("");
  const [authState, setAuthState] = useState<"checking" | "guest" | "authed">("checking");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [message, setMessage] = useState("");

  const loadContent = async () => {
    const res = await fetch("/api/admin/content");
    if (!res.ok) {
      setAuthState("guest");
      return false;
    }
    setContent(await res.json());
    setAuthState("authed");
    return true;
  };

  const login = async () => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setMessage("Mot de passe incorrect.");
      return;
    }
    setMessage("");
    await loadContent();
  };

  const save = async () => {
    if (!content) return;
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setMessage(res.ok ? "Contenu enregistré." : "Erreur lors de l'enregistrement.");
  };

  useEffect(() => {
    let cancelled = false;

    fetch("/api/admin/content")
      .then(async (res) => {
        if (cancelled) return;
        if (!res.ok) {
          setAuthState("guest");
          return;
        }
        setContent(await res.json());
        setAuthState("authed");
      })
      .catch(() => {
        if (!cancelled) setAuthState("guest");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (authState === "checking") {
    return <main className="p-8">Chargement...</main>;
  }

  if (authState === "guest") {
    return (
      <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md">
          <h1 className="text-2xl font-black text-slate-900 mb-4">Backoffice Qadus</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe admin"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-4"
          />
          <button onClick={login} className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl">
            Connexion
          </button>
          {message && <p className="text-sm text-red-600 mt-3">{message}</p>}
        </div>
      </main>
    );
  }

  if (!content) return <main className="p-8">Chargement...</main>;

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-2xl p-6">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Backoffice Qadus</h1>
        <p className="text-slate-500 mb-6">Modifier téléphone, adresse, Facebook, textes et tarifs.</p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <label className="text-sm font-semibold">
            Téléphone (brut)
            <input
              className="mt-1 w-full border rounded-xl px-3 py-2"
              value={content.phone}
              onChange={(e) => setContent({ ...content, phone: e.target.value })}
            />
          </label>
          <label className="text-sm font-semibold">
            Téléphone (affichage)
            <input
              className="mt-1 w-full border rounded-xl px-3 py-2"
              value={content.phoneDisplay}
              onChange={(e) => setContent({ ...content, phoneDisplay: e.target.value })}
            />
          </label>
          <label className="text-sm font-semibold">
            Adresse
            <input
              className="mt-1 w-full border rounded-xl px-3 py-2"
              value={content.address}
              onChange={(e) => setContent({ ...content, address: e.target.value })}
            />
          </label>
          <label className="text-sm font-semibold">
            Facebook URL
            <input
              className="mt-1 w-full border rounded-xl px-3 py-2"
              value={content.facebookUrl}
              onChange={(e) => setContent({ ...content, facebookUrl: e.target.value })}
            />
          </label>
        </div>

        <div className="space-y-4 mb-6">
          <h2 className="text-xl font-bold">Tarifs</h2>
          {content.tarifs.map((item, index) => (
            <div key={index} className="border border-slate-200 rounded-xl p-4 grid md:grid-cols-2 gap-3">
              <input
                className="border rounded-lg px-3 py-2"
                value={item.title}
                onChange={(e) => {
                  const tarifs = [...content.tarifs];
                  tarifs[index] = { ...tarifs[index], title: e.target.value };
                  setContent({ ...content, tarifs });
                }}
              />
              <input
                className="border rounded-lg px-3 py-2"
                value={item.price}
                onChange={(e) => {
                  const tarifs = [...content.tarifs];
                  tarifs[index] = { ...tarifs[index], price: e.target.value };
                  setContent({ ...content, tarifs });
                }}
              />
              <input
                className="border rounded-lg px-3 py-2 md:col-span-2"
                value={item.image}
                onChange={(e) => {
                  const tarifs = [...content.tarifs];
                  tarifs[index] = { ...tarifs[index], image: e.target.value };
                  setContent({ ...content, tarifs });
                }}
              />
              <textarea
                className="border rounded-lg px-3 py-2 md:col-span-2"
                rows={2}
                value={item.desc}
                onChange={(e) => {
                  const tarifs = [...content.tarifs];
                  tarifs[index] = { ...tarifs[index], desc: e.target.value };
                  setContent({ ...content, tarifs });
                }}
              />
            </div>
          ))}
        </div>

        <button onClick={save} className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-xl">
          Enregistrer
        </button>
        {message && <p className="text-sm mt-3 text-slate-600">{message}</p>}
      </div>
    </main>
  );
}
