"use client";

import { useEffect, useState } from "react";
import type { SiteContent, BlogPostContent, PrestationPage } from "@/lib/site-content";
import { ImageField, Field } from "@/components/admin/ImageField";

const TABS = [
  { id: "general", label: "Général" },
  { id: "images", label: "Images" },
  { id: "services", label: "Prestations accueil" },
  { id: "prestations", label: "Pages prestations" },
  { id: "tarifs", label: "Tarifs" },
  { id: "blog", label: "Blog" },
  { id: "about", label: "Qui sommes-nous" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function AdminClient() {
  const [password, setPassword] = useState("");
  const [authState, setAuthState] = useState<"checking" | "guest" | "authed">("checking");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState<TabId>("general");
  const [prestationIndex, setPrestationIndex] = useState(0);

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
    setMessage(res.ok ? "Contenu enregistré avec succès." : "Erreur lors de l'enregistrement.");
  };

  useEffect(() => {
    loadContent().then((ok) => {
      if (!ok) setAuthState("guest");
    });
  }, []);

  if (authState === "checking") return <main className="p-8">Chargement...</main>;

  if (authState === "guest") {
    return (
      <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md">
          <h1 className="text-2xl font-black text-slate-900 mb-4">Backoffice Qadus</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
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

  const updatePrestation = (index: number, patch: Partial<PrestationPage>) => {
    const prestations = [...content.prestations];
    prestations[index] = { ...prestations[index], ...patch };
    setContent({ ...content, prestations });
  };

  const p = content.prestations[prestationIndex];

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Backoffice Qadus</h1>
            <p className="text-slate-500 text-sm mt-1">Modifier textes, images, prestations, blog et tarifs</p>
          </div>
          <button onClick={save} className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-xl">
            Enregistrer tout
          </button>
        </div>

        <div className="flex flex-wrap gap-2 p-4 border-b border-slate-100 bg-slate-50">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                tab === t.id ? "bg-blue-700 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {tab === "general" && (
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Téléphone (brut)" value={content.phone} onChange={(v) => setContent({ ...content, phone: v })} />
              <Field label="Téléphone (affichage)" value={content.phoneDisplay} onChange={(v) => setContent({ ...content, phoneDisplay: v })} />
              <Field label="Adresse" value={content.address} onChange={(v) => setContent({ ...content, address: v })} />
              <Field label="Facebook URL" value={content.facebookUrl} onChange={(v) => setContent({ ...content, facebookUrl: v })} />
              <Field label="Titre hero accueil" value={content.heroTitle} onChange={(v) => setContent({ ...content, heroTitle: v })} />
              <Field label="Sous-titre hero" value={content.heroSubtitle} onChange={(v) => setContent({ ...content, heroSubtitle: v })} />
            </div>
          )}

          {tab === "images" && (
            <div className="grid md:grid-cols-2 gap-6">
              <ImageField label="Image hero accueil" value={content.images.hero} onChange={(v) => setContent({ ...content, images: { ...content.images, hero: v } })} altValue={content.images.heroAlt} onAltChange={(v) => setContent({ ...content, images: { ...content.images, heroAlt: v } })} />
              <ImageField label="Logo" value={content.images.logo} onChange={(v) => setContent({ ...content, images: { ...content.images, logo: v } })} />
              <ImageField label="Chemisage AVANT" value={content.images.chemisageBefore} onChange={(v) => setContent({ ...content, images: { ...content.images, chemisageBefore: v } })} altValue={content.images.chemisageBeforeAlt} onAltChange={(v) => setContent({ ...content, images: { ...content.images, chemisageBeforeAlt: v } })} />
              <ImageField label="Chemisage APRÈS" value={content.images.chemisageAfter} onChange={(v) => setContent({ ...content, images: { ...content.images, chemisageAfter: v } })} altValue={content.images.chemisageAfterAlt} onAltChange={(v) => setContent({ ...content, images: { ...content.images, chemisageAfterAlt: v } })} />
            </div>
          )}

          {tab === "services" && (
            <>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <Field label="Badge section" value={content.servicesSection.badge} onChange={(v) => setContent({ ...content, servicesSection: { ...content.servicesSection, badge: v } })} />
                <Field label="Titre section" value={content.servicesSection.title} onChange={(v) => setContent({ ...content, servicesSection: { ...content.servicesSection, title: v } })} />
                <Field label="Sous-titre" value={content.servicesSection.subtitle} onChange={(v) => setContent({ ...content, servicesSection: { ...content.servicesSection, subtitle: v } })} textarea />
              </div>
              {content.services.map((s, i) => (
                <div key={i} className="border rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold">{s.title || `Prestation ${i + 1}`}</h3>
                    <button type="button" className="text-red-600 text-sm" onClick={() => setContent({ ...content, services: content.services.filter((_, j) => j !== i) })}>Supprimer</button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <Field label="Titre" value={s.title} onChange={(v) => { const services = [...content.services]; services[i] = { ...s, title: v }; setContent({ ...content, services }); }} />
                    <Field label="Tag" value={s.tag} onChange={(v) => { const services = [...content.services]; services[i] = { ...s, tag: v }; setContent({ ...content, services }); }} />
                    <Field label="Lien" value={s.href} onChange={(v) => { const services = [...content.services]; services[i] = { ...s, href: v }; setContent({ ...content, services }); }} />
                    <Field label="Icône" value={s.icon} onChange={(v) => { const services = [...content.services]; services[i] = { ...s, icon: v }; setContent({ ...content, services }); }} />
                  </div>
                  <Field label="Description" value={s.desc} onChange={(v) => { const services = [...content.services]; services[i] = { ...s, desc: v }; setContent({ ...content, services }); }} textarea />
                  <ImageField label="Image" value={s.image} onChange={(v) => { const services = [...content.services]; services[i] = { ...s, image: v }; setContent({ ...content, services }); }} altValue={s.imageAlt} onAltChange={(v) => { const services = [...content.services]; services[i] = { ...s, imageAlt: v }; setContent({ ...content, services }); }} />
                </div>
              ))}
              <button type="button" className="text-blue-700 font-semibold" onClick={() => setContent({ ...content, services: [...content.services, { title: "", desc: "", tag: "", icon: "🔧", href: "/", image: "", imageAlt: "" }] })}>+ Ajouter une prestation accueil</button>
            </>
          )}

          {tab === "prestations" && p && (
            <>
              <select className="border rounded-xl px-4 py-2 mb-4" value={prestationIndex} onChange={(e) => setPrestationIndex(Number(e.target.value))}>
                {content.prestations.map((pr, i) => (
                  <option key={pr.slug} value={i}>{pr.title}</option>
                ))}
              </select>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Badge" value={p.badge} onChange={(v) => updatePrestation(prestationIndex, { badge: v })} />
                <Field label="Titre" value={p.title} onChange={(v) => updatePrestation(prestationIndex, { title: v })} />
                <Field label="Sous-titre" value={p.subtitle} onChange={(v) => updatePrestation(prestationIndex, { subtitle: v })} />
                <Field label="Description" value={p.description} onChange={(v) => updatePrestation(prestationIndex, { description: v })} textarea rows={2} />
              </div>
              <ImageField label="Image hero" value={p.heroImage} onChange={(v) => updatePrestation(prestationIndex, { heroImage: v })} altValue={p.heroImageAlt} onAltChange={(v) => updatePrestation(prestationIndex, { heroImageAlt: v })} />
              <h3 className="font-bold mt-6">Avantages</h3>
              {p.benefits.map((b, bi) => (
                <div key={bi} className="grid md:grid-cols-3 gap-2 border rounded-lg p-3">
                  <input className="border rounded px-2 py-1" value={b.icon} onChange={(e) => { const benefits = [...p.benefits]; benefits[bi] = { ...b, icon: e.target.value }; updatePrestation(prestationIndex, { benefits }); }} />
                  <input className="border rounded px-2 py-1" value={b.title} onChange={(e) => { const benefits = [...p.benefits]; benefits[bi] = { ...b, title: e.target.value }; updatePrestation(prestationIndex, { benefits }); }} />
                  <input className="border rounded px-2 py-1 md:col-span-1" value={b.text} onChange={(e) => { const benefits = [...p.benefits]; benefits[bi] = { ...b, text: e.target.value }; updatePrestation(prestationIndex, { benefits }); }} />
                </div>
              ))}
              <h3 className="font-bold mt-6">FAQ</h3>
              {p.faqs.map((f, fi) => (
                <div key={fi} className="border rounded-lg p-3 space-y-2">
                  <input className="w-full border rounded px-2 py-1 font-semibold" value={f.q} onChange={(e) => { const faqs = [...p.faqs]; faqs[fi] = { ...f, q: e.target.value }; updatePrestation(prestationIndex, { faqs }); }} />
                  <textarea className="w-full border rounded px-2 py-1" rows={2} value={f.a} onChange={(e) => { const faqs = [...p.faqs]; faqs[fi] = { ...f, a: e.target.value }; updatePrestation(prestationIndex, { faqs }); }} />
                </div>
              ))}
            </>
          )}

          {tab === "tarifs" && (
            <>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <Field label="Badge" value={content.tarifsSection.badge} onChange={(v) => setContent({ ...content, tarifsSection: { ...content.tarifsSection, badge: v } })} />
                <Field label="Titre" value={content.tarifsSection.title} onChange={(v) => setContent({ ...content, tarifsSection: { ...content.tarifsSection, title: v } })} />
                <Field label="Sous-titre" value={content.tarifsSection.subtitle} onChange={(v) => setContent({ ...content, tarifsSection: { ...content.tarifsSection, subtitle: v } })} textarea />
              </div>
              {content.tarifs.map((item, index) => (
                <div key={index} className="border rounded-xl p-4 grid md:grid-cols-2 gap-3">
                  <Field label="Prestation" value={item.title} onChange={(v) => { const tarifs = [...content.tarifs]; tarifs[index] = { ...item, title: v }; setContent({ ...content, tarifs }); }} />
                  <Field label="Prix" value={item.price} onChange={(v) => { const tarifs = [...content.tarifs]; tarifs[index] = { ...item, price: v }; setContent({ ...content, tarifs }); }} />
                  <Field label="Description" value={item.desc} onChange={(v) => { const tarifs = [...content.tarifs]; tarifs[index] = { ...item, desc: v }; setContent({ ...content, tarifs }); }} textarea />
                  <ImageField label="Image" value={item.image} onChange={(v) => { const tarifs = [...content.tarifs]; tarifs[index] = { ...item, image: v }; setContent({ ...content, tarifs }); }} />
                  <button type="button" className="text-red-600 text-sm md:col-span-2" onClick={() => setContent({ ...content, tarifs: content.tarifs.filter((_, j) => j !== index) })}>Supprimer</button>
                </div>
              ))}
              <button type="button" className="text-blue-700 font-semibold" onClick={() => setContent({ ...content, tarifs: [...content.tarifs, { title: "", price: "", desc: "", image: "" }] })}>+ Ajouter un tarif</button>
            </>
          )}

          {tab === "blog" && (
            <>
              {content.blog.length === 0 && (
                <p className="text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm">
                  Le blog utilise les articles par défaut. Cliquez « Importer les articles par défaut » puis enregistrez pour les rendre éditables.
                </p>
              )}
              <button
                type="button"
                className="text-blue-700 font-semibold mb-4"
                onClick={async () => {
                  const res = await fetch("/api/admin/content?seedBlog=1");
                  if (res.ok) {
                    const data = await res.json();
                    setContent(data);
                  }
                }}
              >
                Importer les articles blog par défaut
              </button>
              {content.blog.map((post, index) => (
                <BlogPostEditor
                  key={post.slug || index}
                  post={post}
                  onChange={(updated) => {
                    const blog = [...content.blog];
                    blog[index] = updated;
                    setContent({ ...content, blog });
                  }}
                  onDelete={() => setContent({ ...content, blog: content.blog.filter((_, j) => j !== index) })}
                />
              ))}
              <button
                type="button"
                className="text-blue-700 font-semibold"
                onClick={() => {
                  const newPost: BlogPostContent = {
                    slug: `article-${Date.now()}`,
                    title: "Nouvel article",
                    excerpt: "",
                    category: "bon-a-savoir",
                    date: new Date().toISOString().slice(0, 10),
                    image: "",
                    imageAlt: "",
                    content: [""],
                  };
                  setContent({ ...content, blog: [...content.blog, newPost] });
                }}
              >
                + Ajouter un article
              </button>
            </>
          )}

          {tab === "about" && (
            <div className="space-y-4">
              <Field label="Badge" value={content.about.badge} onChange={(v) => setContent({ ...content, about: { ...content.about, badge: v } })} />
              <Field label="Titre page" value={content.about.title} onChange={(v) => setContent({ ...content, about: { ...content.about, title: v } })} />
              <Field label="Introduction" value={content.about.intro} onChange={(v) => setContent({ ...content, about: { ...content.about, intro: v } })} textarea rows={3} />
              <Field label="Titre mission" value={content.about.missionTitle} onChange={(v) => setContent({ ...content, about: { ...content.about, missionTitle: v } })} />
              {content.about.missionParagraphs.map((para, i) => (
                <Field key={i} label={`Paragraphe mission ${i + 1}`} value={para} onChange={(v) => { const missionParagraphs = [...content.about.missionParagraphs]; missionParagraphs[i] = v; setContent({ ...content, about: { ...content.about, missionParagraphs } }); }} textarea />
              ))}
              <Field label="Engagement" value={content.about.commitment} onChange={(v) => setContent({ ...content, about: { ...content.about, commitment: v } })} textarea />
              <ImageField label="Image mission" value={content.about.missionImage} onChange={(v) => setContent({ ...content, about: { ...content.about, missionImage: v } })} />
              <ImageField label="Image latérale 1" value={content.about.sideImage1} onChange={(v) => setContent({ ...content, about: { ...content.about, sideImage1: v } })} />
              <ImageField label="Image latérale 2" value={content.about.sideImage2} onChange={(v) => setContent({ ...content, about: { ...content.about, sideImage2: v } })} />
              <h3 className="font-bold">Valeurs</h3>
              {content.about.values.map((val, i) => (
                <div key={i} className="border rounded-lg p-3 grid md:grid-cols-3 gap-2">
                  <input className="border rounded px-2 py-1" value={val.icon} onChange={(e) => { const values = [...content.about.values]; values[i] = { ...val, icon: e.target.value }; setContent({ ...content, about: { ...content.about, values } }); }} />
                  <input className="border rounded px-2 py-1" value={val.title} onChange={(e) => { const values = [...content.about.values]; values[i] = { ...val, title: e.target.value }; setContent({ ...content, about: { ...content.about, values } }); }} />
                  <input className="border rounded px-2 py-1" value={val.text} onChange={(e) => { const values = [...content.about.values]; values[i] = { ...val, text: e.target.value }; setContent({ ...content, about: { ...content.about, values } }); }} />
                </div>
              ))}
              <Field label="Titre clients" value={content.about.clientsTitle} onChange={(v) => setContent({ ...content, about: { ...content.about, clientsTitle: v } })} />
              <Field label="Liste clients (une par ligne)" value={content.about.clients.join("\n")} onChange={(v) => setContent({ ...content, about: { ...content.about, clients: v.split("\n").filter(Boolean) } })} textarea rows={6} />
              <Field label="Titre localisation" value={content.about.locationTitle} onChange={(v) => setContent({ ...content, about: { ...content.about, locationTitle: v } })} />
              <Field label="Adresse affichée" value={content.about.locationText} onChange={(v) => setContent({ ...content, about: { ...content.about, locationText: v } })} />
              <Field label="Zone d'intervention" value={content.about.zoneText} onChange={(v) => setContent({ ...content, about: { ...content.about, zoneText: v } })} textarea />
            </div>
          )}
        </div>

        {message && <p className="px-6 pb-6 text-sm text-slate-600">{message}</p>}
      </div>
    </main>
  );
}

function BlogPostEditor({
  post,
  onChange,
  onDelete,
}: {
  post: BlogPostContent;
  onChange: (p: BlogPostContent) => void;
  onDelete: () => void;
}) {
  return (
    <div className="border rounded-xl p-4 space-y-3 mb-4">
      <div className="flex justify-between">
        <h3 className="font-bold">{post.title}</h3>
        <button type="button" className="text-red-600 text-sm" onClick={onDelete}>Supprimer</button>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <Field label="Slug (URL)" value={post.slug} onChange={(v) => onChange({ ...post, slug: v })} />
        <Field label="Date" value={post.date} onChange={(v) => onChange({ ...post, date: v })} />
        <Field label="Titre" value={post.title} onChange={(v) => onChange({ ...post, title: v })} />
        <label className="text-sm font-semibold">
          Catégorie
          <select className="mt-1 w-full border rounded-xl px-3 py-2 font-normal" value={post.category} onChange={(e) => onChange({ ...post, category: e.target.value as BlogPostContent["category"] })}>
            <option value="travaux-realises">Travaux réalisés</option>
            <option value="bon-a-savoir">Bon à savoir</option>
            <option value="actualites">Actualités</option>
          </select>
        </label>
      </div>
      <Field label="Extrait" value={post.excerpt} onChange={(v) => onChange({ ...post, excerpt: v })} textarea />
      <Field label="Lieu (optionnel)" value={post.location ?? ""} onChange={(v) => onChange({ ...post, location: v })} />
      <ImageField label="Image" value={post.image} onChange={(v) => onChange({ ...post, image: v })} altValue={post.imageAlt} onAltChange={(v) => onChange({ ...post, imageAlt: v })} />
      <Field label="Contenu (paragraphes séparés par une ligne vide)" value={post.content.join("\n\n")} onChange={(v) => onChange({ ...post, content: v.split("\n\n").filter(Boolean) })} textarea rows={8} />
    </div>
  );
}
