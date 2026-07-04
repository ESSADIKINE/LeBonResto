"use client";

import { useRef } from "react";
import * as LucideIcons from "lucide-react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";

export interface JourneyTimelineStep {
    step: number;
    title: string;
    description: string;
    icon: string;
}

export interface JourneyTimelineProps {
    eyebrow: string;
    steps: JourneyTimelineStep[];
    className?: string;
}

function resolveIcon(name?: string): React.ComponentType<{ size?: number; className?: string }> {
    const lookup = LucideIcons as unknown as Record<
        string,
        React.ComponentType<{ size?: number; className?: string }>
    >;
    const fallback = lookup.Sparkles;
    if (!name) return fallback;
    return lookup[name] ?? fallback;
}

/**
 * Vertical numbered journey timeline used on the Notre Solution page
 * to contrast "Pour les clients" vs. "Pour les restaurateurs".
 * Numbered circles, vertical connector line, framer-motion stagger.
 */
export default function JourneyTimeline({ eyebrow, steps, className }: JourneyTimelineProps) {
    const reduceMotion = useReducedMotion();
    const ref = useRef<HTMLOListElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    const parentVariants: Variants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: reduceMotion ? 0 : 0.12 },
        },
    };

    const childVariants: Variants = {
        hidden: reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: reduceMotion ? 0 : 0.5, ease: "easeOut" },
        },
    };

    return (
        <div className={cn("flex flex-col", className)}>
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-100 px-3 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-primary-800">
                {eyebrow}
            </span>

            <motion.ol
                ref={ref}
                variants={parentVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="relative mt-6 sm:mt-8 flex flex-col gap-6 sm:gap-8 border-l border-cream-300/80 pl-10 sm:pl-8"
            >
                {steps.map((step) => {
                    const Icon = resolveIcon(step.icon);
                    return (
                        <motion.li
                            key={step.step}
                            variants={childVariants}
                            className="relative"
                        >
                            {/* Numbered circle anchored on the vertical line */}
                            <span
                                aria-hidden="true"
                                className="absolute -left-9 sm:-left-[2.4rem] top-0 inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-primary text-white font-display font-bold text-xs sm:text-sm shadow-glow ring-4 ring-white"
                            >
                                {String(step.step).padStart(2, "0")}
                            </span>

                            <div className="flex items-start gap-3">
                                <span className="inline-flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-cream-100 text-primary">
                                    <Icon size={18} />
                                </span>
                                <div className="min-w-0">
                                    <h4 className="text-base sm:text-lg font-semibold text-slate-900 font-display">
                                        {step.title}
                                    </h4>
                                    <p className="mt-1 text-sm leading-relaxed text-slate-600 text-pretty">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </motion.li>
                    );
                })}
            </motion.ol>
        </div>
    );
}
