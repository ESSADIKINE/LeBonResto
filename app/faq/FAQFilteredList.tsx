"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import FAQCategoryNav from "@/components/landing/FAQCategoryNav";
import { cn } from "@/lib/cn";

export interface FAQQuestion {
    question: string;
    answer: string;
}

export interface FAQCategory {
    id: string;
    label: string;
    items: FAQQuestion[];
}

export interface FAQFilteredListProps {
    categories: FAQCategory[];
    /**
     * Initial active category id. Defaults to the first one.
     * Use `"all"` to render every category at once (used when the user has not
     * selected a specific filter).
     */
    initialId?: string;
}

/**
 * FAQFilteredList — Client orchestrator that combines the sticky
 * FAQCategoryNav pill bar with grouped Q&A accordions.
 *
 * - Mobile: pills scroll horizontally, accordions stack full-width.
 * - Each Q&A card uses the same visual language as FAQAccordion (white card,
 *   rounded-2xl, ring-1 ring-slate-200, ChevronDown rotate-180 when open).
 * - Multiple items can be open at once.
 * - Respects `prefers-reduced-motion`.
 */
export default function FAQFilteredList({
    categories,
    initialId,
}: FAQFilteredListProps) {
    const prefersReducedMotion = useReducedMotion();

    const navCategories = useMemo(
        () => [
            { id: "all", label: "Toutes" },
            ...categories.map((c) => ({ id: c.id, label: c.label })),
        ],
        [categories],
    );

    const [activeId, setActiveId] = useState<string>(initialId ?? "all");
    const [openIds, setOpenIds] = useState<Set<string>>(new Set());

    const visibleCategories = useMemo(() => {
        if (activeId === "all") return categories;
        return categories.filter((c) => c.id === activeId);
    }, [activeId, categories]);

    const toggle = (key: string) => {
        setOpenIds((prev) => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key);
            else next.add(key);
            return next;
        });
    };

    return (
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
            <FAQCategoryNav
                categories={navCategories}
                activeId={activeId}
                onChange={(id) => setActiveId(id)}
            />

            <div className="mt-10 space-y-12">
                {visibleCategories.map((cat) => (
                    <div key={cat.id}>
                        <h3 className="font-display text-xl md:text-2xl font-semibold text-slate-900">
                            {cat.label}
                        </h3>
                        <ul className="mt-5 space-y-3">
                            {cat.items.map((item, idx) => {
                                const key = `${cat.id}-${idx}`;
                                const isOpen = openIds.has(key);
                                const panelId = `faq-panel-${key}`;
                                const buttonId = `faq-trigger-${key}`;

                                return (
                                    <li
                                        key={key}
                                        className={cn(
                                            "overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200",
                                            "transition-shadow duration-300",
                                            isOpen && "shadow-premium ring-slate-300",
                                        )}
                                    >
                                        <button
                                            type="button"
                                            id={buttonId}
                                            aria-expanded={isOpen}
                                            aria-controls={panelId}
                                            onClick={() => toggle(key)}
                                            className={cn(
                                                "flex w-full items-center justify-between gap-4 p-5 text-left",
                                                "font-display text-base md:text-lg font-semibold text-slate-900",
                                                "transition-colors duration-200 hover:text-primary",
                                                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                                            )}
                                        >
                                            <span>{item.question}</span>
                                            <ChevronDown
                                                aria-hidden="true"
                                                className={cn(
                                                    "h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300",
                                                    isOpen && "rotate-180 text-primary",
                                                )}
                                            />
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    key="content"
                                                    id={panelId}
                                                    role="region"
                                                    aria-labelledby={buttonId}
                                                    initial={
                                                        prefersReducedMotion
                                                            ? { height: "auto", opacity: 1 }
                                                            : { height: 0, opacity: 0 }
                                                    }
                                                    animate={{
                                                        height: "auto",
                                                        opacity: 1,
                                                    }}
                                                    exit={
                                                        prefersReducedMotion
                                                            ? { height: "auto", opacity: 1 }
                                                            : { height: 0, opacity: 0 }
                                                    }
                                                    transition={
                                                        prefersReducedMotion
                                                            ? { duration: 0 }
                                                            : {
                                                                  duration: 0.32,
                                                                  ease: "easeInOut",
                                                              }
                                                    }
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-5 pb-5 pt-0">
                                                        <p className="text-sm md:text-base text-slate-600 leading-relaxed text-pretty">
                                                            {item.answer}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
