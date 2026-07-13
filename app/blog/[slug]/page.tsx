import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogSidebar from "@/components/BlogSidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TEL_DISPLAY, telHref } from "@/lib/contact";
import {
  formatBlogDate,
  getAllPosts,
  getPostBySlug,
} from "@/lib/blog";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article introuvable" };
  return {
    title: `${post.title} | Blog Qadus`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image.src }],
    },
  };
}

const categoryColors: Record<string, string> = {
  "travaux-realises": "bg-orange-100 text-orange-700",
  "bon-a-savoir": "bg-blue-100 text-blue-700",
  actualites: "bg-emerald-100 text-emerald-700",
};

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img
            src={post.image.src.replace(/w=\d+/, "w=1400")}
            alt={post.image.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <nav className="text-sm text-slate-300 mb-4">
              <Link href="/" className="hover:text-white transition-colors">
                Qadus
              </Link>
              <span className="mx-2">›</span>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
              <span className="mx-2">›</span>
              <span className="text-white line-clamp-1">{post.title}</span>
            </nav>
            <span
              className={`inline-block text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-3 ${categoryColors[post.category]}`}
            >
              {post.categoryLabel}
            </span>
            <h1 className="text-2xl md:text-4xl font-black text-white leading-tight max-w-3xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-slate-300 text-sm">
              <time>{formatBlogDate(post.date)}</time>
              {post.location && <span>📍 {post.location}</span>}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-10">
            <article className="lg:col-span-2">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-10">
                <p className="text-lg text-slate-700 font-medium leading-relaxed mb-6 border-l-4 border-blue-600 pl-4">
                  {post.excerpt}
                </p>
                <div className="prose prose-slate max-w-none space-y-5">
                  {post.content.map((paragraph, i) => (
                    <p key={i} className="text-slate-600 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-10 p-6 bg-blue-50 border border-blue-100 rounded-2xl">
                  <h2 className="font-bold text-slate-900 text-lg mb-2">
                    Un projet similaire en Île-de-France ?
                  </h2>
                  <p className="text-slate-600 text-sm mb-4">
                    Qadus intervient 7j/7 pour le débouchage, le curage, le chemisage et
                    l&apos;inspection caméra. Devis gratuit et sans engagement.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={telHref}
                      className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all"
                    >
                      📞 {TEL_DISPLAY}
                    </a>
                    <Link
                      href="/devis"
                      className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all"
                    >
                      Demander un devis →
                    </Link>
                  </div>
                </div>
              </div>

              {related.length > 0 && (
                <div className="mt-8">
                  <h2 className="font-bold text-slate-900 text-lg mb-4">Articles similaires</h2>
                  <ul className="space-y-3">
                    {related.map((r) => (
                      <li key={r.slug}>
                        <Link
                          href={`/blog/${r.slug}`}
                          className="text-blue-700 hover:text-blue-900 font-medium text-sm transition-colors"
                        >
                          → {r.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>

            <div className="lg:col-span-1">
              <BlogSidebar activeCategory={post.category} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
