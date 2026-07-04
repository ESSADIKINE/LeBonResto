"use client";

import { cn } from "@/lib/cn";
import SectionHeader from "./SectionHeader";

export interface BlogIndexHeroCategory {
    id: string;
    label: string;
    count?: number;
}

export interface BlogIndexHeroProps {
    title: string;
    eyebrow?: string;
    subtitle?: string;
    categories: BlogIndexHeroCategory[];
    activeCategory?: string;
    onCategoryChange?: (id: string) => void;
    className?: string;
}

/**
 * BlogIndexHero — top section for the /blog index page.
 *
 * - Cream-50 backdrop, tight py-12 md:py-16 padding.
 * - SectionHeader (eyebrow + title + subtitle, centred).
 * - Horizontal scrollable category pill row underneath. Active pill is
 *   bg-primary/text-white, inactive pills are bg-white/text-slate-700 with
 *   ring + hover. Pills are real <button>s when an onChange handler is
 *   provided so the component works as a controlled filter.
 * - Respects reduced-motion implicitly (no animation triggered here —
 *   SectionHeader handles its own motion gating).
 */
export default function BlogIndexHero({
    title,
    eyebrow,
    subtitle,
    categories,
    activeCategory,
    onCategoryChange,
    className,
}: BlogIndexHeroProps) {
    return (
        <section
            className={cn(
                "relative bg-cream-50 py-10 md:py-14 lg:py-16",
                className,
            )}
        >
            <div className="container-narrow">
                <SectionHeader
                    eyebrow={eyebrow}
                    title={title}
                    description={subtitle}
                    align="center"
                />

                {categories.length > 0 && (
                    <div
                        role="tablist"
                        aria-label="Catégories d'articles"
                        className="mt-8 sm:mt-10 -mx-4 overflow-x-auto px-4 snap-x snap-mandatory sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        <div className="flex w-max items-center gap-2 sm:gap-3 pb-1 sm:flex-wrap sm:w-full sm:justify-center">
                            {categories.map((cat) => {
                                const isActive = cat.id === activeCategory;
                                return (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        role="tab"
                                        aria-selected={isActive}
                                        onClick={() => onCategoryChange?.(cat.id)}
                                        className={cn(
                                            "snap-start inline-flex shrink-0 min-h-[44px] items-center gap-2 rounded-full px-4 sm:px-5 py-2.5 text-sm font-semibold transition-all duration-200",
                                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                                            isActive
                                                ? "bg-primary text-white shadow-premium"
                                                : "bg-white text-slate-700 ring-1 ring-slate-200 hover:text-primary hover:ring-primary/40",
                                        )}
                                    >
                                        <span>{cat.label}</span>
                                        {typeof cat.count === "number" && (
                                            <span
                                                className={cn(
                                                    "rounded-full px-2 py-0.5 text-[0.6875rem] font-bold",
                                                    isActive
                                                        ? "bg-white/20 text-white"
                                                        : "bg-cream-100 text-primary-700",
                                                )}
                                            >
                                                {cat.count}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
