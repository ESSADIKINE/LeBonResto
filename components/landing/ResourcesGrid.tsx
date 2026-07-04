import Image from "next/image";
import { cn } from "@/lib/cn";
import PremiumCTA from "./PremiumCTA";

export type ResourceType = "ebook" | "guide" | "calculator" | "webinar";

export interface ResourceItem {
    id: string;
    title: string;
    type: ResourceType;
    description: string;
    cover?: { src: string; alt: string };
    href: string;
    cta?: string;
    tag?: string;
}

export interface ResourcesGridProps {
    items: ResourceItem[];
    columns?: 2 | 3;
    className?: string;
}

const columnsClassMap: Record<2 | 3, string> = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
};

const typeLabel: Record<ResourceType, string> = {
    ebook: "E-book",
    guide: "Guide",
    calculator: "Calculateur",
    webinar: "Webinaire",
};

const defaultCta: Record<ResourceType, string> = {
    ebook: "Télécharger",
    guide: "Télécharger",
    calculator: "Essayer",
    webinar: "S'inscrire",
};

/**
 * ResourcesGrid — premium grid of downloadable resources.
 *
 * - Each card has an aspect-[4/5] cover (or brand-gradient fallback),
 *   a type chip, title, description (max 2 lines), and a PremiumCTA.
 * - 2 or 3 columns. Cards lift on hover.
 * - Default CTA labels per type: e-book/guide → "Télécharger",
 *   calculator → "Essayer", webinar → "S'inscrire".
 */
export default function ResourcesGrid({
    items,
    columns = 3,
    className,
}: ResourcesGridProps) {
    return (
        <div className={cn("grid gap-4 sm:gap-5 lg:gap-6", columnsClassMap[columns], className)}>
            {items.map((item) => {
                const ctaLabel = item.cta ?? defaultCta[item.type];

                return (
                    <article
                        key={item.id}
                        className={cn(
                            "group flex flex-col overflow-hidden rounded-2xl bg-white shadow-premium ring-1 ring-slate-100",
                            "transition-all duration-300 hover:-translate-y-1 hover:shadow-glow hover:ring-slate-200",
                        )}
                    >
                        {/* Cover */}
                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-gradient">
                            {item.cover ? (
                                <Image
                                    src={item.cover.src}
                                    alt={item.cover.alt}
                                    fill
                                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-0 bg-brand-gradient"
                                />
                            )}
                            {item.tag && (
                                <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700 shadow-sm backdrop-blur">
                                    {item.tag}
                                </span>
                            )}
                        </div>

                        {/* Body */}
                        <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">
                            <span className="inline-flex w-fit items-center rounded-full bg-cream-100 px-3 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-primary">
                                {typeLabel[item.type]}
                            </span>

                            <h3 className="mt-2 sm:mt-3 font-display text-base sm:text-lg md:text-xl font-semibold text-slate-900 leading-[1.2]">
                                {item.title}
                            </h3>

                            <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">
                                {item.description}
                            </p>

                            <div className="mt-auto pt-4 sm:pt-5">
                                <PremiumCTA
                                    href={item.href}
                                    variant="primary"
                                    size="sm"
                                    icon="arrow"
                                    aria-label={`${ctaLabel} : ${item.title}`}
                                >
                                    {ctaLabel}
                                </PremiumCTA>
                            </div>
                        </div>
                    </article>
                );
            })}
        </div>
    );
}
