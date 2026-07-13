import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { formatBlogDate } from "@/lib/blog";

const categoryColors: Record<string, string> = {
  "travaux-realises": "bg-orange-100 text-orange-700 border-orange-200",
  "bon-a-savoir": "bg-blue-100 text-blue-700 border-blue-200",
  actualites: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-200 group">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative h-52 overflow-hidden">
          <img
            src={post.image.src}
            alt={post.image.alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <span
            className={`absolute top-3 left-3 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full border ${categoryColors[post.category]}`}
          >
            {post.categoryLabel}
          </span>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-blue-700 transition-colors">
            {post.title}
          </h2>
          {post.location && (
            <p className="text-xs text-slate-400 mb-2">📍 {post.location}</p>
          )}
          <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <time className="text-xs text-slate-400">{formatBlogDate(post.date)}</time>
            <span className="text-blue-700 text-sm font-bold group-hover:translate-x-1 transition-transform">
              En savoir plus →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
