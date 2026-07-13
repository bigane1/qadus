import type { Metadata } from "next";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import BlogSidebar from "@/components/BlogSidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  BLOG_CATEGORIES,
  getAllPosts,
  getPostsByCategory,
  POSTS_PER_PAGE,
  type BlogCategory,
} from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Conseils & réalisations assainissement | Qadus",
  description:
    "Articles, conseils et retours de chantiers Qadus : débouchage, curage, chemisage, inspection caméra et assainissement en Île-de-France.",
};

type Props = {
  searchParams: Promise<{ page?: string; categorie?: string }>;
};

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page ?? "1", 10) || 1);
  const category = params.categorie as BlogCategory | undefined;
  const validCategory =
    category && category in BLOG_CATEGORIES ? category : undefined;

  const allPosts = validCategory ? getPostsByCategory(validCategory) : getAllPosts();
  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
  const page = Math.min(currentPage, totalPages);
  const start = (page - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(start, start + POSTS_PER_PAGE);

  const pageTitle = validCategory ? BLOG_CATEGORIES[validCategory] : "Blog";

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <div className="bg-blue-900 text-white py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-sm text-blue-300 mb-4">
              <Link href="/" className="hover:text-white transition-colors">
                Qadus
              </Link>
              <span className="mx-2">›</span>
              <span className="text-white">Blog</span>
              {validCategory && (
                <>
                  <span className="mx-2">›</span>
                  <span className="text-white">{pageTitle}</span>
                </>
              )}
            </nav>
            <h1 className="text-4xl md:text-5xl font-black">{pageTitle}</h1>
            <p className="text-blue-200 mt-3 max-w-2xl">
              Conseils pratiques, retours de chantiers et actualités sur le débouchage, le curage,
              le chemisage et l&apos;assainissement en Île-de-France.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="grid sm:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>

              {posts.length === 0 && (
                <p className="text-slate-500 text-center py-12">
                  Aucun article dans cette catégorie pour le moment.
                </p>
              )}

              {totalPages > 1 && (
                <nav className="flex items-center justify-center gap-2 mt-10" aria-label="Pagination">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                    const qs = new URLSearchParams();
                    if (validCategory) qs.set("categorie", validCategory);
                    if (p > 1) qs.set("page", String(p));
                    const href = qs.toString() ? `/blog?${qs}` : "/blog";
                    return (
                      <Link
                        key={p}
                        href={href}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold text-sm transition-all ${
                          p === page
                            ? "bg-blue-700 text-white"
                            : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-700"
                        }`}
                      >
                        {p}
                      </Link>
                    );
                  })}
                </nav>
              )}
            </div>

            <div className="lg:col-span-1">
              <BlogSidebar activeCategory={validCategory} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
