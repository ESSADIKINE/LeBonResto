'use client';

import { cn } from '@/lib/cn';

export interface FAQCategoryNavProps {
    categories: Array<{ id: string; label: string }>;
    activeId: string;
    onChange: (id: string) => void;
    className?: string;
}

/**
 * Sticky-top horizontal pill nav for filtering FAQ items by category.
 *
 * - Mobile: horizontal scroll, snap-friendly, no wrap.
 * - Desktop: pills wrap onto multiple lines.
 * - Active pill: bg-primary text-white ring-primary.
 */
export default function FAQCategoryNav({
    categories,
    activeId,
    onChange,
    className,
}: FAQCategoryNavProps) {
    return (
        <div
            className={cn(
                'sticky top-14 sm:top-16 z-30 -mx-4 md:mx-0 bg-cream-50/90 backdrop-blur supports-[backdrop-filter]:bg-cream-50/70 border-y border-slate-100',
                className,
            )}
        >
            <div
                role="tablist"
                aria-label="Catégories de questions fréquentes"
                className={cn(
                    'flex md:flex-wrap items-center gap-2 px-4 md:px-0 py-2 sm:py-3 snap-x snap-mandatory md:snap-none',
                    'overflow-x-auto md:overflow-visible whitespace-nowrap md:whitespace-normal',
                    'scrollbar-hide',
                )}
            >
                {categories.map((cat) => {
                    const isActive = cat.id === activeId;
                    return (
                        <button
                            key={cat.id}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => onChange(cat.id)}
                            className={cn(
                                'snap-start inline-flex flex-shrink-0 min-h-[44px] items-center rounded-full px-4 py-2 text-sm font-medium ring-1 transition focus:outline-none focus:ring-2 focus:ring-primary/40',
                                isActive
                                    ? 'bg-primary text-white ring-primary shadow-sm'
                                    : 'bg-white text-slate-700 ring-slate-200 hover:bg-slate-50 hover:ring-slate-300',
                            )}
                        >
                            {cat.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
