import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog/posts";

const BASE = "https://lebonresto.ma";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    // Entrées dynamiques du blog — index + un enregistrement par
    // article. Priorité 0.6 (index) et 0.5 (article) pour ne pas
    // reléguer les pages produit à un rang inférieur.
    const blogEntries: MetadataRoute.Sitemap = [
        {
            url: `${BASE}/blog`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.6,
        },
        ...blogPosts.map((post) => ({
            url: `${BASE}/blog/${post.slug}`,
            lastModified: new Date(post.publishedAt),
            changeFrequency: "monthly" as const,
            priority: 0.5,
        })),
    ];

    return [
        /* La racine `/` redirige vers `/notre-solution`, qui devient la
         * homepage canonique du site marketing. On la liste donc en
         * priorité 1.0 et on n'inclut plus `/` dans le sitemap. */
        {
            url: `${BASE}/notre-solution`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${BASE}/restaurateurs`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${BASE}/investisseurs`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${BASE}/tarifs`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${BASE}/solution`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE}/a-propos`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE}/visite-360`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE}/contact`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE}/faq`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE}/comment-ca-marche`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE}/decouverte`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE}/exemple-fiche-restaurant`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE}/partenaires`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE}/restaurateurs/inscription-merci`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${BASE}/investisseurs/dossier-merci`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.3,
        },
        ...blogEntries,
    ];
}
