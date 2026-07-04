"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import SectionHeader from "./SectionHeader";

export interface FAQItem {
    question: string;
    answer: string;
}

export interface FAQAccordionProps {
    eyebrow?: string;
    title: string;
    accent?: string;
    items: FAQItem[];
    variant?: "white" | "cream";
    className?: string;
}

/**
 * FAQAccordion — Premium expandable FAQ block.
 *
 * - Card-style items: rounded-2xl bg-white ring-1 ring-slate-200.
 * - ChevronDown rotates 180° when item is open.
 * - Allows multiple items open at once (Set-based open state).
 * - Respects `prefers-reduced-motion`: expand/collapse is instant.
 */
export default function FAQAccordion({
    eyebrow,
    title,
    accent,
    items,
    variant = "white",
    className,
}: FAQAccordionProps) {
    const prefersReducedMotion = useReducedMotion();
    const [openIds, setOpenIds] = useState<Set<number>>(new Set());

    const toggle = (idx: number) => {
        setOpenIds((prev) => {
            const next = new Set(prev);
            if (next.has(idx)) {
                next.delete(idx);
            } else {
                next.add(idx);
            }
            return next;
        });
    };

    const bg = variant === "cream" ? "bg-cream-50" : "bg-white";

    return (
        <section className={cn("relative py-10 md:py-14 lg:py-16", bg, className)}>
            <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    eyebrow={eyebrow}
                    title={title}
                    accent={accent}
                    align="center"
                />

                <ul className="mt-10 space-y-3">
                    {items.map((item, idx) => {
                        const isOpen = openIds.has(idx);
                        const panelId = `faq-panel-${idx}`;
                        const buttonId = `faq-trigger-${idx}`;

                        return (
                            <li
                                key={`${item.question}-${idx}`}
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
                                    onClick={() => toggle(idx)}
                                    className={cn(
                                        "flex w-full min-h-[44px] items-center justify-between gap-4 p-4 sm:p-5 md:p-6 text-left",
                                        "font-display text-sm sm:text-base md:text-lg font-semibold text-slate-900",
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
                                            <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 pt-0">
                                                <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-pretty">
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
        </section>
    );
}
