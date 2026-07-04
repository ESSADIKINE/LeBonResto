"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

export interface CityTileProps {
    id: string;
    name: string;
    image: { src: string; alt: string };
    /** Optional count rendered as "X restaurants". */
    restaurantCount?: number;
    /** When set, the tile becomes a link. */
    href?: string;
    className?: string;
}

/**
 * CityTile — premium city photo card.
 *
 * - aspect-[4/5] portrait tile with cover-filled image.
 * - Gradient overlay (from-black/80 via-black/30 to-transparent) hosts
 *   the small "Maroc" eyebrow, city name and restaurant count pill.
 * - Hover: image scales to 105% and overlay intensifies.
 * - Respects `useReducedMotion` — falls back to static frame.
 */
function CityTile({
    id,
    name,
    image,
    restaurantCount,
    href,
    className,
}: CityTileProps) {
    const prefersReducedMotion = useReducedMotion();
    const enableMotion = !prefersReducedMotion;

    const wrapperClasses = cn(
        "group relative block overflow-hidden rounded-2xl aspect-[4/5] shadow-premium ring-1 ring-black/5",
        href && "cursor-pointer",
        className,
    );

    const Inner = (
        <>
            {/* Cover image */}
            <div className="absolute inset-0">
                {enableMotion ? (
                    <motion.div
                        className="absolute inset-0"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover"
                        />
                    </motion.div>
                ) : (
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                    />
                )}
            </div>

            {/* Gradient overlay */}
            <div
                aria-hidden="true"
                className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent",
                    enableMotion &&
                        "transition-opacity duration-300 group-hover:from-black/90",
                )}
            />

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5 md:p-6">
                <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-white/80">
                    Maroc
                </span>
                <h3
                    id={`city-tile-${id}`}
                    className="mt-1 sm:mt-1.5 text-base sm:text-xl md:text-2xl font-semibold text-white text-balance leading-[1.1]"
                >
                    {name}
                </h3>
                {typeof restaurantCount === "number" && (
                    <span className="mt-2 sm:mt-3 inline-flex items-center rounded-full bg-white/15 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold text-white backdrop-blur-sm ring-1 ring-white/20">
                        {restaurantCount.toLocaleString("fr-FR")} restaurants
                    </span>
                )}
            </div>
        </>
    );

    if (href) {
        return (
            <Link
                href={href}
                className={wrapperClasses}
                aria-labelledby={`city-tile-${id}`}
            >
                {Inner}
            </Link>
        );
    }

    return (
        <div className={wrapperClasses} aria-labelledby={`city-tile-${id}`}>
            {Inner}
        </div>
    );
}

export default CityTile;
