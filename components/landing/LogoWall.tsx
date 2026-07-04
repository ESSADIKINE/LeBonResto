"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

export interface LogoWallLogo {
    name: string;
    src?: string;
}

export interface LogoWallProps {
    title?: string;
    logos?: LogoWallLogo[];
    variant?: "marquee" | "grid";
    className?: string;
}

/* Real LeBonResto partner restaurants (seeded marketplace as of Sprint 13). */
const DEFAULT_LOGOS: LogoWallLogo[] = [
    { name: "L'Art Patio" },
    { name: "La Maison Arabe" },
    { name: "ILOLI Restaurant" },
    { name: "Vita Nova" },
    { name: "Le Vertigo" },
    { name: "Restaurant La Cuchara" },
    { name: "L'Alcazar Luxury Riad" },
    { name: "Le Bon Régal Les Palmiers" },
    { name: "Café ROMA" },
    { name: "Le Grand Alcazar" },
    { name: "Nakoul Mzian Restaurant" },
];

function LogoChip({ logo, marquee = false }: { logo: LogoWallLogo; marquee?: boolean }) {
    return (
        <div
            className={cn(
                "flex h-12 sm:h-14 items-center justify-center rounded-2xl bg-slate-50 px-4 sm:px-5",
                marquee ? "min-w-[12rem] md:min-w-[14rem]" : "min-w-0 sm:min-w-[12rem] md:min-w-[14rem]",
                "ring-1 ring-slate-100 transition-colors duration-300",
                "hover:bg-white hover:ring-slate-200",
            )}
        >
            {logo.src ? (
                <div className="relative h-7 w-24 sm:h-8 sm:w-32 opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0">
                    <Image
                        src={logo.src}
                        alt={logo.name}
                        fill
                        sizes="(min-width: 640px) 128px, 96px"
                        className="object-contain"
                    />
                </div>
            ) : (
                <span
                    className={cn(
                        "select-none whitespace-nowrap font-display uppercase tracking-wide",
                        "text-sm sm:text-base md:text-lg text-slate-500",
                        "transition-colors duration-300 group-hover:text-slate-700",
                    )}
                >
                    {logo.name}
                </span>
            )}
        </div>
    );
}

/**
 * LogoWall — Premium "trusted by" partner band.
 *
 * - Marquee variant: seamless infinite scroll (duplicated children).
 * - Grid variant: responsive grid of logo chips.
 * - Falls back to elegant serif italic name placeholders when src is missing.
 * - Respects `prefers-reduced-motion`: marquee freezes.
 */
export default function LogoWall({
    title = "Ils nous font confiance",
    logos = DEFAULT_LOGOS,
    variant = "marquee",
    className,
}: LogoWallProps) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <div
            className={cn(
                "relative rounded-3xl bg-white py-6 sm:py-8 md:py-12 ring-1 ring-slate-100 shadow-premium",
                className,
            )}
        >
            <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {title}
            </p>

            {variant === "marquee" ? (
                <div
                    className={cn(
                        "group relative overflow-hidden",
                        // soft edge fade
                        "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
                    )}
                    aria-label={title}
                >
                    <div
                        className={cn(
                            "flex w-max items-center gap-4 sm:gap-6 px-4 sm:px-6",
                            !prefersReducedMotion && "animate-marquee-left",
                            "group-hover:[animation-play-state:paused]",
                        )}
                        style={{ willChange: "transform" }}
                    >
                        {[...logos, ...logos].map((logo, idx) => (
                            <LogoChip key={`${logo.name}-${idx}`} logo={logo} marquee />
                        ))}
                    </div>
                </div>
            ) : (
                <div
                    className={cn(
                        "grid grid-cols-2 gap-3 sm:gap-4 px-4 sm:px-6",
                        "sm:grid-cols-4 lg:grid-cols-8",
                    )}
                    aria-label={title}
                >
                    {logos.map((logo) => (
                        <div key={logo.name} className="group">
                            <LogoChip logo={logo} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
