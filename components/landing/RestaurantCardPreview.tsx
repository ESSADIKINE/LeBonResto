import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { cn } from "@/lib/cn";

export interface RestaurantCardPreviewProps {
    image: { src: string; alt: string };
    /** Optional badge shown top-left (e.g. "Premium"). */
    badge?: string;
    name: string;
    cuisine: string;
    city: string;
    /** Rating value 0-5, displayed with one decimal. */
    rating: number;
    reviewCount: number;
    /** Free-form price tier label (e.g. "€€" or "250–400 MAD"). */
    priceRange: string;
    /** When set, the whole card becomes a link to the public restaurant page. */
    href?: string;
    className?: string;
}

/**
 * RestaurantCardPreview — mini consumer card mimicking the lebonresto.ma
 * marketplace card. Used in /exemple-fiche-restaurant and /decouverte
 * showcases on the marketing site.
 *
 * Layout:
 * - rounded-2xl, shadow-premium, ring-1 slate-100, white bg, overflow-hidden.
 * - Image area aspect-[4/3], object-cover, subtle zoom-in on hover.
 * - Optional amber "Premium"-style badge top-left.
 * - Body p-4: cuisine eyebrow → name → city row → rating row → price + arrow.
 *
 * Server component — no interactive state needed.
 */
function RestaurantCardPreview({
    image,
    badge,
    name,
    cuisine,
    city,
    rating,
    reviewCount,
    priceRange,
    href,
    className,
}: RestaurantCardPreviewProps) {
    const cardClasses = cn(
        "group flex flex-col overflow-hidden rounded-2xl bg-white shadow-premium ring-1 ring-slate-100",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-glow",
        className,
    );

    const ratingLabel = rating.toFixed(1).replace(".", ",");

    const Body = (
        <>
            {/* Cover image */}
            <div className="relative w-full overflow-hidden bg-brand-gradient aspect-[4/3]">
                <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {badge && (
                    <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-amber-950 shadow-sm">
                        {badge}
                    </span>
                )}
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-4 sm:p-5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                    {cuisine}
                </span>
                <h3 className="mt-2 text-base sm:text-lg font-semibold text-slate-900 text-balance leading-[1.2]">
                    {name}
                </h3>

                <div className="mt-1.5 sm:mt-2 flex items-center gap-1.5 text-xs sm:text-sm text-slate-500">
                    <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="truncate">{city}</span>
                </div>

                <div className="mt-2 sm:mt-3 flex items-center gap-2 text-xs sm:text-sm">
                    <Star
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                        aria-hidden="true"
                    />
                    <span className="font-semibold text-slate-900">{ratingLabel}</span>
                    <span className="text-slate-500">
                        ({reviewCount.toLocaleString("fr-FR")} avis)
                    </span>
                </div>

                <div className="mt-3 sm:mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3 sm:pt-4">
                    <span className="text-xs sm:text-sm font-medium text-slate-700">{priceRange}</span>
                    <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-primary">
                        Découvrir
                        <ArrowRight
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                            aria-hidden="true"
                        />
                    </span>
                </div>
            </div>
        </>
    );

    if (href) {
        return (
            <Link href={href} className={cardClasses} aria-label={`Découvrir ${name}`}>
                {Body}
            </Link>
        );
    }

    return <div className={cardClasses}>{Body}</div>;
}

export default RestaurantCardPreview;
