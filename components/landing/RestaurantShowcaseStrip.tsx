import React from "react";
import { cn } from "@/lib/cn";
import SectionHeader from "./SectionHeader";
import RestaurantCardPreview, {
    type RestaurantCardPreviewProps,
} from "./RestaurantCardPreview";

export interface RestaurantShowcaseStripProps {
    /** Eyebrow chip above the section title. */
    eyebrow?: string;
    /** Section title (h2). */
    title: string;
    /** Substring inside `title` to highlight in primary. */
    accent?: string;
    /** Short lead paragraph. */
    description?: string;
    /** Restaurants to render. Falls back to the seeded partners when omitted. */
    restaurants?: RestaurantCardPreviewProps[];
    /** Optional wrapper class. */
    className?: string;
}

/**
 * Default LeBonResto partner restaurants used when no `restaurants` prop is
 * passed. Mirrors the real seeded data on lebonresto.ma so the strip works as
 * social proof out of the box.
 */
const DEFAULT_RESTAURANTS: RestaurantCardPreviewProps[] = [
    {
        image: {
            src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
            alt: "ILOLI Restaurant",
        },
        badge: "Premium",
        name: "ILOLI Restaurant",
        cuisine: "Japonaise",
        city: "Casablanca",
        rating: 4.1,
        reviewCount: 21,
        priceRange: "200 – 660 MAD",
        href: "https://lebonresto.ma",
    },
    {
        image: {
            src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
            alt: "La Maison Arabe",
        },
        badge: "Premium",
        name: "La Maison Arabe",
        cuisine: "Marocaine",
        city: "Marrakech",
        rating: 4.2,
        reviewCount: 19,
        priceRange: "220 – 650 MAD",
        href: "https://lebonresto.ma",
    },
    {
        image: {
            src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
            alt: "Vita Nova",
        },
        name: "Vita Nova",
        cuisine: "Italienne",
        city: "Marrakech",
        rating: 4.0,
        reviewCount: 16,
        priceRange: "80 – 260 MAD",
        href: "https://lebonresto.ma",
    },
    {
        image: {
            src: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=800&q=80",
            alt: "L'Art Patio",
        },
        badge: "Premium",
        name: "L'Art Patio",
        cuisine: "Fusion",
        city: "Marrakech",
        rating: 3.8,
        reviewCount: 13,
        priceRange: "100 – 340 MAD",
        href: "https://lebonresto.ma",
    },
    {
        image: {
            src: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80",
            alt: "Le Vertigo",
        },
        name: "Le Vertigo",
        cuisine: "Marocaine",
        city: "Rabat",
        rating: 3.6,
        reviewCount: 18,
        priceRange: "90 – 320 MAD",
        href: "https://lebonresto.ma",
    },
    {
        image: {
            src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80",
            alt: "Restaurant La Cuchara",
        },
        name: "Restaurant La Cuchara",
        cuisine: "Espagnole",
        city: "Casablanca",
        rating: 4.25,
        reviewCount: 12,
        priceRange: "110 – 260 MAD",
        href: "https://lebonresto.ma",
    },
    {
        image: {
            src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80",
            alt: "Café ROMA",
        },
        name: "Café ROMA",
        cuisine: "Café / Brunch",
        city: "Rabat",
        rating: 3.9,
        reviewCount: 16,
        priceRange: "35 – 140 MAD",
        href: "https://lebonresto.ma",
    },
];

/**
 * RestaurantShowcaseStrip — horizontally scrolling strip of
 * RestaurantCardPreview cards used as visual proof ("des restos déjà en
 * scène") on the marketing site.
 *
 * - bg-cream-50, section-y vertical rhythm, container-wide.
 * - SectionHeader (centered) at the top.
 * - Horizontal snap-scroll strip below with bleed on mobile so the last card
 *   feels like it "wants to be scrolled" (edge fade of negative margins).
 * - Small italic hint under the strip.
 * - Reuses RestaurantCardPreview for every card — no duplicated markup.
 */
function RestaurantShowcaseStrip({
    eyebrow = "DÉJÀ SUR LEBONRESTO",
    title,
    accent,
    description,
    restaurants,
    className,
}: RestaurantShowcaseStripProps) {
    const items = restaurants && restaurants.length > 0 ? restaurants : DEFAULT_RESTAURANTS;

    return (
        <section className={cn("bg-cream-50 section-y", className)}>
            <div className="container-wide">
                <div className="flex justify-center">
                    <SectionHeader
                        eyebrow={eyebrow}
                        title={title}
                        accent={accent}
                        description={description}
                        align="center"
                    />
                </div>

                {/* Horizontal snap-scroll strip */}
                <div
                    className={cn(
                        "mt-10 sm:mt-12 md:mt-14",
                        "-mx-4 sm:mx-0 px-4 sm:px-0",
                        "flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4",
                    )}
                    role="list"
                    aria-label="Restaurants partenaires LeBonResto"
                >
                    {items.map((restaurant, idx) => (
                        <div
                            key={`${restaurant.name}-${idx}`}
                            role="listitem"
                            className="snap-start shrink-0 w-[260px] sm:w-[300px] md:w-[320px]"
                        >
                            <RestaurantCardPreview {...restaurant} />
                        </div>
                    ))}
                </div>

                <p className="mt-3 text-center text-xs italic text-slate-500">
                    Glissez pour explorer →
                </p>
            </div>
        </section>
    );
}

export default RestaurantShowcaseStrip;
