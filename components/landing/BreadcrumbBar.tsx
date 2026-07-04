import Link from "next/link";
import { Fragment } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export interface BreadcrumbItem {
    label: string;
    /** When omitted, the item renders as the current page (not a link). */
    href?: string;
}

export interface BreadcrumbBarProps {
    items: BreadcrumbItem[];
    className?: string;
}

/**
 * BreadcrumbBar — top-of-page breadcrumb for sub-pages.
 *
 * - container-wide, tight py-3, white bg, bottom border slate-100.
 * - Inline flex of <Link> items separated by lucide ChevronRight.
 * - Non-last items are links in slate-500 / hover primary.
 * - Last item is rendered as the current page (slate-900, font-medium,
 *   aria-current="page") and is not clickable.
 *
 * Pure server component — no animation, fully accessible.
 */
function BreadcrumbBar({ items, className }: BreadcrumbBarProps) {
    if (!items.length) return null;

    return (
        <nav
            aria-label="Fil d'Ariane"
            className={cn(
                "w-full border-b border-slate-100 bg-white",
                className,
            )}
        >
            <div className="container-wide py-3">
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                    {items.map((item, idx) => {
                        const isLast = idx === items.length - 1;
                        const showSeparator = idx > 0;

                        return (
                            <Fragment key={`${item.label}-${idx}`}>
                                {showSeparator && (
                                    <li
                                        aria-hidden="true"
                                        className="inline-flex items-center text-slate-300"
                                    >
                                        <ChevronRight className="h-4 w-4 shrink-0" />
                                    </li>
                                )}
                                <li className="inline-flex max-w-full items-center">
                                    {isLast || !item.href ? (
                                        <span
                                            aria-current={isLast ? "page" : undefined}
                                            className={cn(
                                                "block truncate max-w-[160px] sm:max-w-none",
                                                isLast
                                                    ? "font-medium text-slate-900"
                                                    : "text-slate-500",
                                            )}
                                            title={item.label}
                                        >
                                            {item.label}
                                        </span>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="block truncate max-w-[160px] sm:max-w-none rounded text-slate-500 transition-colors duration-200 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
                                            title={item.label}
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </li>
                            </Fragment>
                        );
                    })}
                </ol>
            </div>
        </nav>
    );
}

export default BreadcrumbBar;
