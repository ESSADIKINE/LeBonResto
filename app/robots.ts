import type { MetadataRoute } from "next";

const BASE = "https://lebonresto.ma";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/api/",
                    "/restaurateurs/inscription-merci",
                    "/investisseurs/dossier-merci",
                ],
            },
        ],
        sitemap: `${BASE}/sitemap.xml`,
    };
}
