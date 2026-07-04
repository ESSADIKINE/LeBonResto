import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import BreadcrumbBar from "@/components/landing/BreadcrumbBar";
import CTASection from "@/components/landing/CTASection";
import BlogPostCard from "@/components/landing/BlogPostCard";
import {
    blogPosts,
    getBlogPostBySlug,
    getBlogPostSlugs,
} from "@/data/blog/posts";

interface BlogPostPageProps {
    params: { slug: string };
}

const BASE_URL = "https://lebonresto.ma";

/** Génère les routes statiques pour chaque article au build. */
export function generateStaticParams() {
    return getBlogPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
    const post = getBlogPostBySlug(params.slug);
    if (!post) {
        return {
            title: "Article introuvable",
        };
    }
    return {
        title: `${post.title} — Blog LeBonResto`,
        description: post.excerpt,
        alternates: {
            canonical: `${BASE_URL}/blog/${post.slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `${BASE_URL}/blog/${post.slug}`,
            siteName: "LeBonResto",
            locale: "fr_FR",
            type: "article",
            publishedTime: post.publishedAt,
            authors: [post.author.name],
            images: [
                {
                    url: post.cover.src,
                    width: 1200,
                    height: 630,
                    alt: post.cover.alt,
                },
            ],
        },
        twitter: { card: "summary_large_image" },
    };
}

function formatDate(iso: string): string {
    try {
        return new Intl.DateTimeFormat("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(new Date(iso));
    } catch {
        return iso;
    }
}

/**
 * /blog/[slug] — page article.
 *
 * Server component. Rend :
 *  - fil d'Ariane + méta + JSON-LD BlogPosting + BreadcrumbList ;
 *  - un header avec cover, catégorie, temps de lecture, date ;
 *  - le corps de l'article, section par section (`contentSections`) ;
 *  - une liste "à lire aussi" alimentée par les autres articles ;
 *  - une CTA finale vers /restaurateurs pour convertir la lecture.
 *
 * La rédaction reste très propre grâce au format `contentSections` :
 * chaque article expose un heading + paragraphes. Ce format n'exige
 * aucun runtime MDX et se substitue parfaitement à un CMS tant que le
 * volume d'articles reste faible.
 */
export default function BlogPostPage({ params }: BlogPostPageProps) {
    const post = getBlogPostBySlug(params.slug);
    if (!post) notFound();

    const related = blogPosts
        .filter((p) => p.slug !== post.slug)
        .slice(0, 3);

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Accueil",
                item: `${BASE_URL}/notre-solution`,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: `${BASE_URL}/blog`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: `${BASE_URL}/blog/${post.slug}`,
            },
        ],
    };

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: `${BASE_URL}${post.cover.src}`,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        author: {
            "@type": "Organization",
            name: post.author.name,
        },
        publisher: {
            "@type": "Organization",
            name: "LeBonResto",
            logo: {
                "@type": "ImageObject",
                url: `${BASE_URL}/assets/brand/lebonresto-logo.svg`,
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${BASE_URL}/blog/${post.slug}`,
        },
        articleSection: post.category,
        inLanguage: "fr-FR",
    };

    return (
        <>
            <script
                type="application/ld+json"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbJsonLd),
                }}
            />
            <script
                type="application/ld+json"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(articleJsonLd),
                }}
            />

            <BreadcrumbBar
                items={[
                    { label: "Accueil", href: "/notre-solution" },
                    { label: "Blog", href: "/blog" },
                    { label: post.title },
                ]}
            />

            {/* HEADER — méta + titre + cover */}
            <header className="bg-cream-50">
                <div className="container-narrow py-8 md:py-12 lg:py-14">
                    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-500">
                        <span className="inline-block rounded-full bg-white ring-1 ring-slate-200 px-3 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-primary-700">
                            {post.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <Calendar aria-hidden="true" className="h-4 w-4" />
                            <time dateTime={post.publishedAt}>
                                {formatDate(post.publishedAt)}
                            </time>
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <Clock aria-hidden="true" className="h-4 w-4" />
                            {post.readingTime} min de lecture
                        </span>
                    </div>

                    <h1 className="mt-4 h1-display text-slate-900">
                        {post.title}
                    </h1>

                    <p className="mt-4 lead-p text-slate-600 max-w-prose">
                        {post.excerpt}
                    </p>

                    <div className="mt-6 flex items-center gap-3">
                        <div
                            aria-hidden="true"
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white"
                        >
                            {post.author.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-sm">
                            <p className="font-semibold text-slate-900">
                                {post.author.name}
                            </p>
                            <p className="text-slate-500 text-xs">
                                Rédaction éditoriale LeBonResto
                            </p>
                        </div>
                    </div>
                </div>

                <div className="container-wide pb-8 md:pb-12">
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-premium ring-1 ring-slate-100">
                        <Image
                            src={post.cover.src}
                            alt={post.cover.alt}
                            fill
                            priority
                            sizes="(min-width: 1280px) 1200px, 100vw"
                            className="object-cover"
                        />
                    </div>
                </div>
            </header>

            {/* CORPS — sections */}
            <article className="bg-white py-10 md:py-14 lg:py-16">
                <div className="container-narrow">
                    <div className="prose-like space-y-10 md:space-y-12">
                        {post.contentSections.map((section, idx) => (
                            <section key={idx} aria-labelledby={`section-${idx}`}>
                                <h2
                                    id={`section-${idx}`}
                                    className="h3-section text-slate-900"
                                >
                                    {section.heading}
                                </h2>
                                <div className="mt-4 space-y-4">
                                    {section.paragraphs.map((p, pIdx) => (
                                        <p
                                            key={pIdx}
                                            className="body-p text-slate-700"
                                        >
                                            {p}
                                        </p>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>

                    <div className="mt-12 md:mt-16 border-t border-slate-100 pt-8">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-700"
                        >
                            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                            Retour au blog
                        </Link>
                    </div>
                </div>
            </article>

            {/* ARTICLES LIÉS */}
            {related.length > 0 && (
                <section className="bg-cream-50 py-10 md:py-14 lg:py-16">
                    <div className="container-wide">
                        <h2 className="h3-section text-slate-900 text-center">
                            À lire aussi
                        </h2>
                        <div className="mt-8 md:mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                            {related.map((p) => (
                                <BlogPostCard
                                    key={p.slug}
                                    post={{
                                        slug: p.slug,
                                        title: p.title,
                                        excerpt: p.excerpt,
                                        cover: p.cover,
                                        category: p.category,
                                        readingTime: p.readingTime,
                                        publishedAt: p.publishedAt,
                                        author: p.author,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA FINALE */}
            <CTASection
                title="Prêt à faire passer votre restaurant au niveau supérieur ?"
                description="Réservez une démonstration de trente minutes. Nous évaluons ensemble comment LeBonResto peut s'intégrer à votre stratégie digitale."
                primaryCta={{ label: "Inscrire mon restaurant", href: "/restaurateurs" }}
                secondaryCta={{ label: "Nous écrire", href: "/contact" }}
                variant="teal"
            />
        </>
    );
}
