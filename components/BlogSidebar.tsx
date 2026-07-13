import Link from "next/link";
import { BLOG_CATEGORIES, getAllPosts, type BlogCategory } from "@/lib/blog";
import { formatBlogDate } from "@/lib/blog";

export default function BlogSidebar({ activeCategory }: { activeCategory?: BlogCategory }) {
  const recent = getAllPosts().slice(0, 5);

  return (
    <aside className="space-y-8">
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">
          Articles récents
        </h3>
        <ul className="space-y-4">
          {recent.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <p className="font-semibold text-slate-800 text-sm leading-snug group-hover:text-blue-700 transition-colors">
                  {post.title}
                </p>
                <p className="text-xs text-slate-400 mt-1">{formatBlogDate(post.date)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">
          Catégories
        </h3>
        <ul className="space-y-2">
          <li>
            <Link
              href="/blog"
              className={`text-sm font-medium transition-colors ${!activeCategory ? "text-blue-700" : "text-slate-600 hover:text-blue-700"}`}
            >
              Tous les articles
            </Link>
          </li>
          {(Object.entries(BLOG_CATEGORIES) as [BlogCategory, string][]).map(([key, label]) => (
            <li key={key}>
              <Link
                href={`/blog?categorie=${key}`}
                className={`text-sm font-medium transition-colors ${activeCategory === key ? "text-blue-700" : "text-slate-600 hover:text-blue-700"}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-blue-900 text-white rounded-2xl p-6">
        <h3 className="font-bold text-lg mb-2">Besoin d&apos;un devis ?</h3>
        <p className="text-blue-200 text-sm mb-4">
          Débouchage, curage, chemisage ou inspection caméra en Île-de-France.
        </p>
        <Link
          href="/devis"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all"
        >
          Devis gratuit →
        </Link>
      </div>
    </aside>
  );
}
