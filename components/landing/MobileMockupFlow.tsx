"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";
import SectionHeader from "./SectionHeader";

export interface MobileMockupFlowStep {
    /** Numeric badge label displayed above the phone (e.g. "1", "2", "3"). */
    badge: string;
    /** Step title displayed below the phone. */
    title: string;
    /** Short description displayed under the title. */
    description: string;
    /** Optional screenshot rendered inside the phone frame. */
    image?: { src: string; alt: string };
}

export interface MobileMockupFlowProps {
    eyebrow?: string;
    title: string;
    accent?: string;
    description?: string;
    steps: MobileMockupFlowStep[];
    className?: string;
}

/**
 * MobileMockupFlow — 3-step storytelling row with in-phone screenshots.
 *
 * Renders a SectionHeader followed by a responsive grid of vertical phone
 * mockups. On desktop, dotted connectors visually link the phones together
 * to hint at a linear flow. Framer Motion staggers the reveal.
 */
export default function MobileMockupFlow({
    eyebrow,
    title,
    accent,
    description,
    steps,
    className,
}: MobileMockupFlowProps) {
    const reduceMotion = useReducedMotion();
    const gridRef = useRef<HTMLOListElement>(null);
    const inView = useInView(gridRef, { once: true, margin: "-80px" });

    const parentVariants: Variants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: reduceMotion ? 0 : 0.15 },
        },
    };

    const childVariants: Variants = {
        hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: reduceMotion ? 0 : 0.6, ease: "easeOut" },
        },
    };

    const stepsCount = steps.length;

    return (
        <section className={cn("section-y bg-white", className)}>
            <div className="container-wide">
                <SectionHeader
                    eyebrow={eyebrow}
                    title={title}
                    accent={accent}
                    description={description}
                    align="center"
                />

                <motion.ol
                    ref={gridRef}
                    variants={parentVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="relative mt-10 sm:mt-12 lg:mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6 lg:gap-8"
                >
                    {steps.map((step, index) => {
                        const isLast = index === stepsCount - 1;
                        return (
                            <motion.li
                                key={`${step.badge}-${step.title}`}
                                variants={childVariants}
                                className="relative flex flex-col items-center"
                            >
                                {/* Dotted connector between phones on md+ */}
                                {!isLast && (
                                    <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute top-[7.5rem] left-[calc(50%+120px)] hidden h-0 w-[calc(100%-160px)] border-t-2 border-dotted border-slate-300 md:block"
                                    />
                                )}

                                {/* Number badge */}
                                <span
                                    aria-hidden="true"
                                    className="mx-auto mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-glow"
                                >
                                    {step.badge}
                                </span>

                                {/* Phone frame */}
                                <div
                                    className={cn(
                                        "relative mx-auto aspect-[9/19] w-full max-w-[220px] overflow-hidden rounded-[2rem] bg-slate-900 shadow-glow",
                                        "ring-[6px] ring-slate-900",
                                    )}
                                >
                                    {/* Notch */}
                                    <span
                                        aria-hidden="true"
                                        className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-slate-900"
                                    />

                                    {/* Screen */}
                                    <div className="absolute inset-2 overflow-hidden rounded-[1.6rem] bg-cream-50">
                                        {step.image?.src ? (
                                            <Image
                                                src={step.image.src}
                                                alt={step.image.alt}
                                                fill
                                                sizes="(min-width: 768px) 220px, 60vw"
                                                className="object-cover object-top"
                                            />
                                        ) : (
                                            <div
                                                aria-hidden="true"
                                                className="absolute inset-0 bg-brand-gradient"
                                                style={{
                                                    backgroundImage:
                                                        "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18) 0%, transparent 55%), radial-gradient(circle at 70% 70%, rgba(1,107,97,0.55) 0%, transparent 60%), linear-gradient(135deg, #016B61 0%, #014038 100%)",
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Step title */}
                                <h3 className="mt-4 text-center text-base font-semibold text-slate-900 font-display">
                                    {step.title}
                                </h3>

                                {/* Step description */}
                                <p className="mx-auto mt-2 max-w-[240px] text-center text-sm text-slate-600 text-pretty">
                                    {step.description}
                                </p>
                            </motion.li>
                        );
                    })}
                </motion.ol>
            </div>
        </section>
    );
}
