"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

export interface SectionHeaderProps {
    eyebrow?: string;
    title: string;
    accent?: string;
    description?: string;
    align?: "left" | "center";
    className?: string;
}

function renderTitle(title: string, accent?: string) {
    if (!accent) return title;
    const idx = title.indexOf(accent);
    if (idx < 0) return title;
    const before = title.slice(0, idx);
    const after = title.slice(idx + accent.length);
    return (
        <>
            {before}
            <span className="text-primary">{accent}</span>
            {after}
        </>
    );
}

export default function SectionHeader({
    eyebrow,
    title,
    accent,
    description,
    align = "center",
    className,
}: SectionHeaderProps) {
    const prefersReducedMotion = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    const alignClasses =
        align === "center" ? "text-center mx-auto items-center" : "text-left items-start";

    return (
        <motion.div
            ref={ref}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={prefersReducedMotion ? undefined : inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={cn("flex flex-col max-w-3xl", alignClasses, className)}
        >
            {eyebrow && (
                <span className="inline-block rounded-full bg-primary-100 px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-primary-800">
                    {eyebrow}
                </span>
            )}
            <h2
                className={cn(
                    "font-display font-bold text-balance leading-[1.1]",
                    "text-2xl sm:text-3xl md:text-4xl",
                    eyebrow ? "mt-3 sm:mt-4" : "mt-0",
                    "text-slate-900"
                )}
            >
                {renderTitle(title, accent)}
            </h2>
            {description && (
                <p
                    className={cn(
                        "mt-4 sm:mt-5 text-sm sm:text-base text-slate-600 text-pretty max-w-2xl",
                        align === "center" && "mx-auto"
                    )}
                >
                    {description}
                </p>
            )}
        </motion.div>
    );
}
