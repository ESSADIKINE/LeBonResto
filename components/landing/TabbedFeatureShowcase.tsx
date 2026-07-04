"use client";

import { useState } from "react";
import Link from "next/link";
import HoverScrollImage from "@/components/landing/HoverScrollImage";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import SectionHeader from "@/components/landing/SectionHeader";
import ScrollReveal from "@/components/landing/ScrollReveal";

interface CtaLink {
    label: string;
    href: string;
}

export interface ShowcaseTab {
    id: string;
    label: string;
    image?: { src: string; alt: string };
    description?: string;
    bullets?: string[];
    cta?: CtaLink;
}

export interface TabbedFeatureShowcaseProps {
    /** Eyebrow chip rendered above the section title. */
    eyebrow?: string;
    /** Section title (h2). */
    title: string;
    /** Substring of `title` to highlight in primary teal. */
    accent?: string;
    /** Short paragraph under the title. */
    description?: string;
    /** Tab definitions. Each tab has its own screenshot, bullets, and CTA. */
    tabs: ShowcaseTab[];
    /** Background variant. `cream` = soft cream, `white` = plain white. */
    variant?: "cream" | "white";
    /** Optional wrapper className. */
    className?: string;
}

/**
 * TabbedFeatureShowcase — TheFork "Découvrez notre logiciel" pattern.
 *
 * - Horizontal pill row of tabs on md+, native `<select>` on mobile.
 * - Two-column grid below: device frame (left, 7/12) + description + checklist + CTA (right, 5/12).
 * - Image cross-fades between tabs via AnimatePresence (`mode="wait"`).
 * - Respects `useReducedMotion`.
 */
function TabbedFeatureShowcase({
    eyebrow,
    title,
    accent,
    description,
    tabs,
    variant = "cream",
    className,
}: TabbedFeatureShowcaseProps) {
    const prefersReducedMotion = useReducedMotion();
    const [activeId, setActiveId] = useState<string>(tabs[0]?.id ?? "");

    const active = tabs.find((t) => t.id === activeId) ?? tabs[0];

    if (!active) return null;

    const bgClass = variant === "cream" ? "bg-cream-50" : "bg-white";

    return (
        <ScrollReveal>
            <section className={cn("relative py-10 md:py-14 lg:py-16", bgClass, className)}>
                <div className="container-wide">
                    <SectionHeader
                        eyebrow={eyebrow}
                        title={title}
                        accent={accent}
                        description={description}
                        align="center"
                    />

                    {/* Tab control — pill row on md+, select on mobile */}
                    <div className="mt-8 sm:mt-10">
                        {/* Mobile select */}
                        <div className="sm:hidden">
                            <label htmlFor="showcase-tab" className="sr-only">
                                Sélectionner une catégorie
                            </label>
                            <select
                                id="showcase-tab"
                                value={activeId}
                                onChange={(e) => setActiveId(e.target.value)}
                                className="w-full min-h-[44px] appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-semibold text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                            >
                                {tabs.map((tab) => (
                                    <option key={tab.id} value={tab.id}>
                                        {tab.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Tablet/desktop pill tabs: horizontal scroll up to lg, wrap at lg+ */}
                        <div
                            className="hidden sm:block"
                            role="tablist"
                            aria-label="Catégories"
                        >
                            <div
                                className={cn(
                                    "-mx-4 overflow-x-auto px-4 snap-x snap-mandatory",
                                    "lg:mx-0 lg:overflow-visible lg:px-0 lg:flex lg:items-center lg:justify-center",
                                    "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                                )}
                            >
                                <div className="inline-flex w-max items-center gap-2 rounded-full bg-slate-100/70 p-1.5 ring-1 ring-slate-200 lg:w-auto lg:flex-wrap lg:justify-center">
                                    {tabs.map((tab) => {
                                        const isActive = tab.id === activeId;
                                        return (
                                            <button
                                                key={tab.id}
                                                type="button"
                                                role="tab"
                                                aria-selected={isActive}
                                                aria-controls={`panel-${tab.id}`}
                                                id={`tab-${tab.id}`}
                                                onClick={() => setActiveId(tab.id)}
                                                className={cn(
                                                    "snap-start shrink-0 min-h-[44px] rounded-full px-4 sm:px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                                                    isActive
                                                        ? "bg-white text-primary shadow-premium"
                                                        : "text-slate-600 hover:text-slate-900",
                                                )}
                                            >
                                                {tab.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Panel */}
                    <div
                        id={`panel-${active.id}`}
                        role="tabpanel"
                        aria-labelledby={`tab-${active.id}`}
                        className="mt-8 sm:mt-10 grid gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-12"
                    >
                        {/* Device frame */}
                        <div className="lg:col-span-7">
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-cream-50 ring-1 ring-slate-200 shadow-glow">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={active.id}
                                        initial={
                                            prefersReducedMotion
                                                ? false
                                                : { opacity: 0, scale: 1.02 }
                                        }
                                        animate={
                                            prefersReducedMotion
                                                ? undefined
                                                : { opacity: 1, scale: 1 }
                                        }
                                        exit={
                                            prefersReducedMotion
                                                ? undefined
                                                : { opacity: 0, scale: 0.99 }
                                        }
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="absolute inset-0"
                                    >
                                        {active.image?.src ? (
                                            <HoverScrollImage
                                                src={active.image.src}
                                                alt={active.image.alt}
                                            />
                                        ) : (
                                            <div className="h-full w-full bg-brand-gradient" />
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Description + bullets + CTA */}
                        <div className="flex flex-col justify-center lg:col-span-5">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={active.id}
                                    initial={
                                        prefersReducedMotion
                                            ? false
                                            : { opacity: 0, y: 12 }
                                    }
                                    animate={
                                        prefersReducedMotion
                                            ? undefined
                                            : { opacity: 1, y: 0 }
                                    }
                                    exit={
                                        prefersReducedMotion
                                            ? undefined
                                            : { opacity: 0, y: -8 }
                                    }
                                    transition={{ duration: 0.35, ease: "easeOut" }}
                                >
                                    <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-slate-900 leading-[1.1] text-balance">
                                        {active.label}
                                    </h3>
                                    {active.description && (
                                        <p className="mt-3 text-sm sm:text-base text-slate-600 text-pretty">
                                            {active.description}
                                        </p>
                                    )}

                                    {active.bullets && active.bullets.length > 0 && (
                                        <ul className="mt-6 space-y-3">
                                            {active.bullets.map((bullet, idx) => (
                                                <li
                                                    key={`${active.id}-bullet-${idx}`}
                                                    className="flex items-start gap-3"
                                                >
                                                    <CheckCircle2
                                                        className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                                                        aria-hidden="true"
                                                    />
                                                    <span className="text-sm md:text-base text-slate-700 leading-relaxed">
                                                        {bullet}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {active.cta && (
                                        <div className="mt-7">
                                            <Link
                                                href={active.cta.href}
                                                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary h-10 sm:h-11 md:h-12 px-5 sm:px-6 md:px-8 text-sm sm:text-base font-semibold text-white shadow-premium transition-all duration-300 hover:bg-primary-700 hover:shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                            >
                                                <span>{active.cta.label}</span>
                                                <ArrowRight
                                                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                                    aria-hidden="true"
                                                />
                                            </Link>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>
        </ScrollReveal>
    );
}

export default TabbedFeatureShowcase;
