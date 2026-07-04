import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export interface BlogPostCardProps {
    post: {
        slug: string;
        title: string;
        excerpt: string;
        cover: { src: string; alt: string };
        category: string;
        readingTime: number;
        publishedAt: string;
        author: { name: string; avatarSrc?: string };
    };
    className?: string;
}

/**
 * BlogPostCard — preview card for a blog post.
 *
 * - Whole card wraps in a <Link> to /blog/{slug}.
 * - Cover image at top (aspect 16/9), body below with category pill,
 *   title, excerpt and author/reading-time footer.
 * - Hover: lifts -translate-y-1, deepens shadow, title shifts to primary teal.
 * - Pure presentational + Server Component compatible (no client hooks).
 */
export default function BlogPostCard({ post, className }: BlogPostCardProps) {
    const initial = post.author.name.charAt(0).toUpperCase();

    return (
        <Link
            href={`/blog/${post.slug}`}
            aria-label={`Lire l'article : ${post.title}`}
            className={cn(
                "group block overflow-hidden rounded-2xl bg-white shadow-premium ring-1 ring-slate-100",
                "transition-all duration-300 hover:-translate-y-1 hover:shadow-glow hover:ring-slate-200",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                className,
            )}
        >
            {/* Cover */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-cream-100">
                <Image
                    src={post.cover.src}
                    alt={post.cover.alt}
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Body */}
            <div className="p-4 sm:p-5 md:p-6">
                <span className="inline-block rounded-full bg-cream-100 px-3 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-primary-700">
                    {post.category}
                </span>

                <h3 className="mt-2 sm:mt-3 font-display text-base sm:text-lg md:text-xl font-semibold text-slate-900 leading-[1.2] line-clamp-2 transition-colors duration-200 group-hover:text-primary">
                    {post.title}
                </h3>

                <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                </p>

                {/* Footer: author + reading time */}
                <div className="mt-4 sm:mt-5 flex items-center gap-2 sm:gap-3 text-xs text-slate-500">
                    {post.author.avatarSrc ? (
                        <div className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-slate-200">
                            <Image
                                src={post.author.avatarSrc}
                                alt={post.author.name}
                                fill
                                sizes="32px"
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <div
                            aria-hidden="true"
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-white"
                        >
                            {initial}
                        </div>
                    )}
                    <span className="font-medium text-slate-700">{post.author.name}</span>
                    <span aria-hidden="true" className="text-slate-300">
                        •
                    </span>
                    <span>
                        {post.readingTime} min de lecture
                    </span>
                </div>
            </div>
        </Link>
    );
}
