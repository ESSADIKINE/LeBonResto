"use client";

import Image from "next/image";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export interface FeatureVisualCardProps {
    /** Top mockup / screenshot / photo. Falls back to brand gradient if missing. */
    image?: { src: string; alt: string };
    /** Lucide icon name shown in the body when no image is provided (or in addition). */
    icon?: string;
    /** Micro caps eyebrow above the title. */
    eyebrow?: string;
    /** Card title. */
    title: string;
    /** Short 1-2 line description (line-clamped to 2). */
    description?: string;
    /** When set, the whole card becomes a link. */
    href?: string;
    /** Aspect ratio of the top image. */
    aspect?: "video" | "square" | "4/3";
    /** Optional wrapper className. */
    className?: string;
}

const aspectClassMap: Record<NonNullable<FeatureVisualCardProps["aspect"]>, string> = {
    video: "aspect-video",
    square: "aspect-square",
    "4/3": "aspect-[4/3]",
};

function getLucideIcon(name?: string) {
    if (!name) return LucideIcons.Sparkles;
    const lib = LucideIcons as unknown as Record<
        string,
        React.ComponentType<{ className?: string }>
    >;
    return lib[name] ?? LucideIcons.Sparkles;
}

/**
 * FeatureVisualCard — image-led card. Mockup / screenshot on top, minimal copy below.
 *
 * - When `href` is provided the whole card becomes a link.
 * - When `image.src` is missing, a brand gradient fills the aspect frame.
 * - Hover: subtle lift + scale + glow.
 */
function FeatureVisualCard({
    image,
    icon,
    eyebrow,
    title,
    description,
    href,
    aspect = "video",
    className,
}: FeatureVisualCardProps) {
    const Icon = getLucideIcon(icon);

    const cardClasses = cn(
        "group flex flex-col overflow-hidden rounded-3xl bg-white shadow-premium ring-1 ring-slate-100 transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-glow hover:scale-[1.01]",
        className,
    );

    const Body = (
        <>
            {/* Top image / mockup */}
            <div
                className={cn(
                    "relative w-full overflow-hidden bg-brand-gradient",
                    aspectClassMap[aspect],
                )}
            >
                {image?.src ? (
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div
                        aria-hidden="true"
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18) 0%, transparent 55%), radial-gradient(circle at 70% 70%, rgba(1,107,97,0.55) 0%, transparent 60%), linear-gradient(135deg, #016B61 0%, #014038 100%)",
                        }}
                    />
                )}
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">
                {(icon || eyebrow) && (
                    <div className="flex items-center gap-3">
                        {icon && (
                            <span
                                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-800"
                                aria-hidden="true"
                            >
                                <Icon className="h-5 w-5" />
                            </span>
                        )}
                        {eyebrow && (
                            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                                {eyebrow}
                            </span>
                        )}
                    </div>
                )}

                <h3
                    className={cn(
                        "font-display text-base sm:text-lg md:text-xl font-bold leading-snug text-slate-900 text-balance",
                        icon || eyebrow ? "mt-3 sm:mt-4" : "mt-0",
                    )}
                >
                    {title}
                </h3>

                {description && (
                    <p className="mt-2 sm:mt-3 line-clamp-2 text-sm text-slate-600 text-pretty">
                        {description}
                    </p>
                )}

                {href && (
                    <div className="mt-4 sm:mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                        <span>Découvrir</span>
                        <ArrowRight
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                            aria-hidden="true"
                        />
                    </div>
                )}
            </div>
        </>
    );

    if (href) {
        return (
            <Link href={href} className={cardClasses} aria-label={title}>
                {Body}
            </Link>
        );
    }

    return <div className={cardClasses}>{Body}</div>;
}

export default FeatureVisualCard;
