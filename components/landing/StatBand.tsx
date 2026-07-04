"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
    animate,
    motion,
    useInView,
    useMotionValue,
    useReducedMotion,
    useTransform,
    type Variants,
} from "framer-motion";
import { cn } from "@/lib/cn";

interface CtaLink {
    label: string;
    href: string;
}

export interface StatBandItem {
    /** Display value. Numeric portions auto-animate (e.g. "55 000", "2 500", "98%"). */
    value: string;
    /** Optional suffix appended after the animated number (e.g. "+", "%"). */
    suffix?: string;
    /** Main label below the value. */
    label: string;
    /** Optional supporting micro-line. */
    sublabel?: string;
}

export interface StatBandProps {
    /** Eyebrow chip above the title. */
    eyebrow?: string;
    /** Section title (h2). */
    title: string;
    /** First occurrence of this substring is highlighted (primary-300 on dark, primary on cream). */
    accent?: string;
    /** Short paragraph under the title. */
    subtitle?: string;
    /** 3 to 4 KPI items. */
    items: StatBandItem[];
    /** Background variant. */
    variant?: "teal" | "dark" | "cream";
    /** Optional centered CTA below the stats. */
    cta?: CtaLink;
    /** Optional wrapper className. */
    className?: string;
}

/** Parse a display string into (prefix, numericPart, suffix). Handles French thin-space and comma decimals. */
function parseValue(raw: string): { prefix: string; numeric: number | null; suffix: string; rawNumeric: string } {
    // Match a leading non-digit prefix (e.g. "No "), then a numeric run, then trailing non-digit suffix.
    const match = raw.match(/^(\D*)([\d\s  .,]+)(\D*)$/);
    if (!match) {
        return { prefix: raw, numeric: null, suffix: "", rawNumeric: "" };
    }
    const [, prefix, numericStr, suffix] = match;
    // Strip spaces/nbsp/narrow-nbsp; treat comma as decimal sep if no period.
    const cleaned = numericStr.replace(/[\s  ]/g, "");
    const normalized = cleaned.includes(".")
        ? cleaned.replace(/,/g, "")
        : cleaned.replace(/,/g, ".");
    const numeric = Number(normalized);
    if (!Number.isFinite(numeric)) {
        return { prefix, numeric: null, suffix, rawNumeric: numericStr };
    }
    return { prefix, numeric, suffix, rawNumeric: numericStr };
}

/** Format a number in French locale, preserving decimals if the original had them. */
function formatFr(value: number, hadDecimal: boolean): string {
    if (hadDecimal) {
        return value.toLocaleString("fr-FR", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 2,
        });
    }
    return Math.round(value).toLocaleString("fr-FR");
}

interface AnimatedStatValueProps {
    raw: string;
    suffix?: string;
    inView: boolean;
    reduceMotion: boolean;
    valueColorClass: string;
}

function AnimatedStatValue({
    raw,
    suffix,
    inView,
    reduceMotion,
    valueColorClass,
}: AnimatedStatValueProps) {
    const parsed = parseValue(raw);
    const hadDecimal = parsed.rawNumeric.includes(".") || parsed.rawNumeric.includes(",");
    const target = parsed.numeric;

    const motionValue = useMotionValue(reduceMotion || target === null ? target ?? 0 : 0);
    const transformed = useTransform(motionValue, (latest) => formatFr(latest, hadDecimal));
    const [display, setDisplay] = useState<string>(() =>
        target === null ? "" : formatFr(reduceMotion ? target : 0, hadDecimal),
    );

    useEffect(() => {
        if (target === null) return;
        if (reduceMotion) {
            setDisplay(formatFr(target, hadDecimal));
            motionValue.set(target);
            return;
        }
        if (!inView) return;
        const controls = animate(motionValue, target, {
            duration: 1.8,
            ease: "easeOut",
        });
        const unsubscribe = transformed.on("change", (latest) => setDisplay(latest));
        return () => {
            controls.stop();
            unsubscribe();
        };
    }, [inView, target, reduceMotion, hadDecimal, motionValue, transformed]);

    return (
        <span
            className={cn(
                "block font-display font-bold text-balance leading-[1.02] tracking-tight",
                "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
                valueColorClass,
            )}
        >
            {target === null ? (
                raw
            ) : (
                <>
                    {parsed.prefix}
                    {display}
                    {parsed.suffix}
                </>
            )}
            {suffix && <span className="ml-0.5">{suffix}</span>}
        </span>
    );
}

/** Render an eyebrow chip — variant-aware (light chip on dark bg, primary chip on cream). */
function Eyebrow({ children, isDark }: { children: string; isDark: boolean }) {
    return (
        <span
            className={cn(
                "inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider",
                isDark
                    ? "bg-white/15 text-cream-100 ring-1 ring-white/20"
                    : "bg-primary-100 text-primary-800",
            )}
        >
            {children}
        </span>
    );
}

function renderTitle(title: string, accent: string | undefined, accentClass: string) {
    if (!accent) return title;
    const idx = title.indexOf(accent);
    if (idx < 0) return title;
    return (
        <>
            {title.slice(0, idx)}
            <span className={accentClass}>{accent}</span>
            {title.slice(idx + accent.length)}
        </>
    );
}

/**
 * StatBand — TheFork-style headline KPI strip.
 *
 * - py-14 md:py-20. variant=teal: bg-primary text-white; dark: bg-secondary text-white; cream: bg-cream-100 text-slate-900.
 * - Centered header, then 3-4 huge animated numbers.
 * - Optional centered CTA at the bottom.
 * - Count-up animation on view enter via framer-motion; respects useReducedMotion.
 */
function StatBand({
    eyebrow,
    title,
    accent,
    subtitle,
    items,
    variant = "teal",
    cta,
    className,
}: StatBandProps) {
    const prefersReducedMotion = useReducedMotion();
    const reduceMotion = prefersReducedMotion ?? false;
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    // Server-visible-first: keep the initial fade off until the component
    // has mounted on the client. On SSR / no-JS / crawlers, `initial={false}`
    // means Framer Motion never applies opacity:0 to the KPI items.
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = variant === "teal" || variant === "dark";

    const bgClass =
        variant === "teal"
            ? "bg-primary"
            : variant === "dark"
                ? "bg-secondary"
                : "bg-cream-100";

    const titleColor = isDark ? "text-white" : "text-slate-900";
    const subtitleColor = isDark ? "text-white/80" : "text-slate-600";
    const accentClass = isDark ? "text-cream-200" : "text-primary";
    const valueColor = isDark ? "text-white" : "text-primary";
    const labelColor = isDark ? "text-cream-100" : "text-slate-900";
    const sublabelColor = isDark ? "text-white/80" : "text-slate-600";

    // Grid cols based on item count (clamped to 3 or 4).
    const cols =
        items.length >= 4
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            : "grid-cols-1 sm:grid-cols-3 lg:grid-cols-3";

    // Stagger reveal for the item grid.
    const parentVariants: Variants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: reduceMotion ? 0 : 0.12 },
        },
    };
    const childVariants: Variants = {
        hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: reduceMotion ? 0 : 0.55, ease: "easeOut" },
        },
    };

    return (
        <section className={cn("relative isolate overflow-hidden py-10 md:py-14 lg:py-16", bgClass, className)}>
            {/* Subtle radial glow on dark variants for depth */}
            {isDark && (
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 opacity-60"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06) 0%, transparent 55%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.05) 0%, transparent 55%)",
                    }}
                />
            )}

            <div className="container-wide">
                <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                    {eyebrow && <Eyebrow isDark={isDark}>{eyebrow}</Eyebrow>}

                    <h2
                        className={cn(
                            "font-display font-bold text-balance leading-[1.1]",
                            "text-2xl sm:text-3xl md:text-4xl",
                            eyebrow ? "mt-4" : "mt-0",
                            titleColor,
                        )}
                    >
                        {renderTitle(title, accent, accentClass)}
                    </h2>

                    {subtitle && (
                        <p className={cn("mt-4 sm:mt-5 text-base sm:text-lg text-pretty max-w-2xl", subtitleColor)}>
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* KPI grid */}
                <motion.div
                    ref={ref}
                    variants={parentVariants}
                    initial={mounted && !reduceMotion ? "hidden" : false}
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className={cn("mt-10 sm:mt-12 md:mt-14 grid gap-6 sm:gap-8", cols)}
                >
                    {items.map((item, idx) => (
                        <motion.div
                            key={`${item.label}-${idx}`}
                            variants={childVariants}
                            className="flex flex-col items-center text-center"
                        >
                            <AnimatedStatValue
                                raw={item.value}
                                suffix={item.suffix}
                                inView={inView}
                                reduceMotion={reduceMotion}
                                valueColorClass={valueColor}
                            />
                            <div
                                className={cn(
                                    "mt-2 sm:mt-3 text-xs sm:text-sm font-semibold uppercase tracking-wide",
                                    labelColor,
                                )}
                            >
                                {item.label}
                            </div>
                            {item.sublabel && (
                                <div className={cn("mt-2 text-xs leading-relaxed max-w-[28ch]", sublabelColor)}>
                                    {item.sublabel}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                {cta && (
                    <div className="mt-10 sm:mt-12 flex justify-center">
                        <Link
                            href={cta.href}
                            className={cn(
                                "group inline-flex items-center justify-center gap-2 rounded-full h-11 md:h-12 px-5 sm:px-6 md:px-8 text-sm sm:text-base font-semibold shadow-premium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                                isDark
                                    ? "bg-white text-primary hover:bg-cream-100 focus-visible:outline-white"
                                    : "bg-primary text-white hover:bg-primary-700 hover:shadow-glow focus-visible:outline-primary",
                            )}
                        >
                            <span>{cta.label}</span>
                            <ArrowRight
                                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                aria-hidden="true"
                            />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}

export default StatBand;
