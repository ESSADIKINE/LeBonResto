import type { Metadata } from "next";
import BlogIndexHero from "@/components/landing/BlogIndexHero";
import BlogPostCard from "@/components/landing/BlogPostCard";
import BreadcrumbBar from "@/components/landing/BreadcrumbBar";
import { blogPosts, getBlogCategories } from "@/data/blog/posts";

export const metadata: Metadata = {
    title: "Blog LeBonResto — Actualités et conseils gastronomiques au Maroc",
    description:
        "Analyses, guides et coulisses de la scène gastronomique marocaine premium. Stratégie digitale pour restaurateurs, sélection éditoriale et retours d'expérience terrain.",
    alternates: {
        canonical: "https://lebonresto.ma/blog",
    },
    openGraph: {
        title: "Blog LeBonResto — Actualités et conseils gastronomiques au Maroc",
        description:
            "Analyses, guides et coulisses de la scène gastronomique marocaine premium. Stratégie digitale pour restaurateurs, sélection éditoriale et retours d'expérience terrain.",
        url: "https://lebonresto.ma/blog",
        siteName: "LeBonResto",
        locale: "fr_FR",
        type: "website",
        images: [
            {
                url: "/assets/landing/heroes/restaurateur-tablet.jpg",
                width: 1200,
                height: 630,
                alt: "Blog LeBonResto — Actualités et conseils",
            },
        ],
    },
    twitter: { card: "summary_large_image" },
};

const BASE_URL = "https://lebonresto.ma";

/**
 * /blog — index éditorial du site marketing.
 *
 * Server component. Rend :
 *  - un fil d'Ariane accessible ;
 *  - le hero avec filtres de catégories (statique pour l'instant — la
 *    version interactive viendra quand le volume d'articles justifiera
 *    un filtrage côté client) ;
 *  - la grille d'articles alimentée par `data/blog/posts.ts` ;
 *  - deux JSON-LD : BreadcrumbList + Blog/ItemList pour Google.
 *
 * Les articles marqués `draft: true` sont volontairement rendus pour
 * le soft-launch. Un futur filtre `.filter(p => !p.draft)` suffira
 * quand le contenu passera en édition officielle.
 */
export default function BlogIndexPage() {
    const categories = getBlogCategories();
    // Tri antéchronologique — les articles les plus récents en premier.
    const posts = [...blogPosts].sort(
        (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime(),
    );

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
        ],
    };

    const blogJsonLd = {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Blog LeBonResto",
        description:
            "Analyses, guides et coulisses de la scène gastronomique marocaine premium.",
        url: `${BASE_URL}/blog`,
        publisher: {
            "@type": "Organization",
            name: "LeBonResto",
            url: BASE_URL,
        },
        blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            description: p.excerpt,
            url: `${BASE_URL}/blog/${p.slug}`,
            datePublished: p.publishedAt,
            image: `${BASE_URL}${p.cover.src}`,
            author: { "@type": "Organization", name: p.author.name },
        })),
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
                    __html: JSON.stringify(blogJsonLd),
                }}
            />

            <BreadcrumbBar
                items={[
                    { label: "Accueil", href: "/notre-solution" },
                    { label: "Blog" },
                ]}
            />

            <BlogIndexHero
                eyebrow="LE JOURNAL"
                title="Le blog LeBonResto"
                subtitle="Analyses, guides et coulisses de la scène gastronomique marocaine premium. Contenus rédigés par notre équipe éditoriale."
                categories={categories}
                activeCategory="all"
            />

            <section className="bg-white py-10 md:py-14 lg:py-16">
                <div className="container-wide">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                        {posts.map((post) => (
                            <BlogPostCard
                                key={post.slug}
                                post={{
                                    slug: post.slug,
                                    title: post.title,
                                    excerpt: post.excerpt,
                                    cover: post.cover,
                                    category: post.category,
                                    readingTime: post.readingTime,
                                    publishedAt: post.publishedAt,
                                    author: post.author,
                                }}
                            />
                        ))}
                    </div>

                    {posts.length === 0 && (
                        <p className="text-center text-slate-500">
                            Aucun article publié pour le moment. Revenez très
                            bientôt.
                        </p>
                    )}
                </div>
            </section>
        </>
    );
}
