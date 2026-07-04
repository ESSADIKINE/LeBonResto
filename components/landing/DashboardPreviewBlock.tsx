"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import SectionHeader from "./SectionHeader";
import ScrollReveal from "./ScrollReveal";

export interface DashboardPreviewSlide {
    image: { src: string; alt: string };
    title: string;
    description: string;
}

export interface DashboardPreviewBlockProps {
    eyebrow?: string;
    title: string;
    accent?: string;
    description?: string;
    slides: DashboardPreviewSlide[];
    className?: string;
}

const AUTO_ADVANCE_MS = 6_000;

/**
 * DashboardPreviewBlock — animated walk-through of the restaurant owner
 * dashboard.
 *
 * - Two columns on lg+: stacked stepper on the left, tablet-frame mockup
 *   on the right. Single-column stacked on mobile.
 * - Active stepper row gets bg-cream-50 + a 4px left teal border.
 * - Right column cross-fades between slide images via AnimatePresence.
 * - Auto-advances every 6s when in view. Pauses on hover/focus and
 *   respects useReducedMotion (no auto-advance, no scale animation).
 */
export default function DashboardPreviewBlock({
    eyebrow,
    title,
    accent,
    description,
    slides,
    className,
}: DashboardPreviewBlockProps) {
    const prefersReducedMotion = useReducedMotion();
    const sectionRef = useRef<HTMLDivElement>(null);
    const inView = useInView(sectionRef, { margin: "-120px" });
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const totalSlides = slides.length;

    // Auto-advance loop
    useEffect(() => {
        if (prefersReducedMotion) return;
        if (!inView || isPaused) return;
        if (totalSlides <= 1) return;

        const id = window.setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % totalSlides);
        }, AUTO_ADVANCE_MS);

        return () => window.clearInterval(id);
    }, [inView, isPaused, prefersReducedMotion, totalSlides]);

    if (totalSlides === 0) return null;

    const active = slides[activeIndex] ?? slides[0];

    return (
        <ScrollReveal>
            <section className={cn("relative bg-white py-10 md:py-14 lg:py-16", className)}>
                <div ref={sectionRef} className="container-wide">
                    <SectionHeader
                        eyebrow={eyebrow}
                        title={title}
                        accent={accent}
                        description={description}
                        align="center"
                    />

                    <div
                        className="mt-10 sm:mt-12 grid gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-12"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onFocusCapture={() => setIsPaused(true)}
                        onBlurCapture={() => setIsPaused(false)}
                    >
                        {/* Left: stepper */}
                        <div
                            role="tablist"
                            aria-label="Étapes du tableau de bord"
                            className="flex flex-col gap-2 lg:col-span-7"
                        >
                            {slides.map((slide, idx) => {
                                const isActive = idx === activeIndex;
                                return (
                                    <button
                                        key={`${slide.title}-${idx}`}
                                        type="button"
                                        role="tab"
                                        aria-selected={isActive}
                                        aria-controls={`dashboard-panel-${idx}`}
                                        id={`dashboard-tab-${idx}`}
                                        onClick={() => setActiveIndex(idx)}
                                        className={cn(
                                            "group flex items-start gap-3 sm:gap-4 rounded-2xl px-4 py-3 sm:px-5 sm:py-4 text-left transition-all duration-300",
                                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                                            isActive
                                                ? "border-l-4 border-primary bg-cream-50 pl-3 sm:pl-4 shadow-premium"
                                                : "border-l-4 border-transparent hover:bg-cream-50/60 hover:border-primary/40",
                                        )}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={cn(
                                                "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors duration-200",
                                                isActive
                                                    ? "bg-primary text-white"
                                                    : "bg-cream-100 text-primary-700 group-hover:bg-primary-100",
                                            )}
                                        >
                                            {idx + 1}
                                        </span>
                                        <div className="flex-1">
                                            <h3
                                                className={cn(
                                                    "font-display text-sm sm:text-base md:text-lg font-semibold leading-snug transition-colors duration-200",
                                                    isActive ? "text-primary" : "text-slate-900",
                                                )}
                                            >
                                                {slide.title}
                                            </h3>
                                            <p
                                                className={cn(
                                                    "mt-1.5 text-xs sm:text-sm leading-relaxed",
                                                    isActive ? "text-slate-700" : "text-slate-500",
                                                )}
                                            >
                                                {slide.description}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Right: tablet-frame mockup */}
                        <div className="lg:col-span-5">
                            <div className="sticky top-24">
                                <div
                                    id={`dashboard-panel-${activeIndex}`}
                                    role="tabpanel"
                                    aria-labelledby={`dashboard-tab-${activeIndex}`}
                                    className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md"
                                >
                                    {/* Tablet frame */}
                                    <div className="relative rounded-[2rem] bg-slate-900 p-3 shadow-glow ring-1 ring-slate-800">
                                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.25rem] bg-cream-50">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={`slide-${activeIndex}`}
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
                                                    transition={{ duration: 0.45, ease: "easeOut" }}
                                                    className="absolute inset-0"
                                                >
                                                    <Image
                                                        src={active.image.src}
                                                        alt={active.image.alt}
                                                        fill
                                                        sizes="(min-width: 1024px) 420px, 100vw"
                                                        className="object-cover object-top"
                                                    />
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                        {/* Camera notch */}
                                        <span
                                            aria-hidden="true"
                                            className="absolute left-1/2 top-1.5 h-1.5 w-12 -translate-x-1/2 rounded-full bg-slate-700"
                                        />
                                    </div>

                                    {/* Slide indicator dots */}
                                    <div
                                        className="mt-6 flex items-center justify-center gap-2"
                                        aria-hidden="true"
                                    >
                                        {slides.map((_, idx) => (
                                            <span
                                                key={`dot-${idx}`}
                                                className={cn(
                                                    "h-1.5 rounded-full transition-all duration-300",
                                                    idx === activeIndex
                                                        ? "w-8 bg-primary"
                                                        : "w-1.5 bg-slate-300",
                                                )}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </ScrollReveal>
    );
}
