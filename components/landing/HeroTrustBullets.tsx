"use client";

import * as LucideIcons from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";

export interface HeroTrustBulletItem {
    /** Lucide icon name (e.g. "ShieldCheck"). Falls back to CheckCircle2 if unknown. */
    icon: string;
    /** Short trust statement. */
    text: string;
}

export interface HeroTrustBulletsProps {
    /** Trust chips to render. Empty / missing = component renders null. */
    items: HeroTrustBulletItem[];
    /** Chip color scheme. Defaults to onLight. */
    variant?: "onDark" | "onLight";
    /** Row alignment. Defaults to left. */
    align?: "left" | "center";
    /** Optional wrapper className. */
    className?: string;
}

function resolveLucideIcon(name: string) {
    const lib = LucideIcons as unknown as Record<
        string,
        React.ComponentType<{ className?: string; strokeWidth?: number }>
    >;
    return lib[name] ?? CheckCircle2;
}

/**
 * HeroTrustBullets — small row of 3-ish trust chips designed to sit directly
 * under hero CTAs.
 *
 * - `variant="onLight"` uses slate text with the icon in brand primary.
 * - `variant="onDark"` uses white-ish text with the icon in primary-300 for
 *   contrast against the dark hero backgrounds.
 * - Chips fade up on mount with a light stagger; reduced motion collapses
 *   to a static render.
 * - Null-safe when `items` is empty or missing.
 */
export default function HeroTrustBullets({
    items,
    variant = "onLight",
    align = "left",
    className,
}: HeroTrustBulletsProps) {
    const prefersReducedMotion = useReducedMotion();

    if (!items || items.length === 0) return null;

    const isDark = variant === "onDark";
    const textColor = isDark ? "text-white/85" : "text-slate-700";
    const iconColor = isDark ? "text-primary-300" : "text-primary";

    const parentVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.08,
                delayChildren: prefersReducedMotion ? 0 : 0.05,
            },
        },
    };
    const childVariants: Variants = {
        hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: prefersReducedMotion ? 0 : 0.4,
                ease: "easeOut",
            },
        },
    };

    return (
        <motion.ul
            initial="hidden"
            animate="visible"
            variants={parentVariants}
            className={cn(
                "flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-6",
                align === "center" ? "justify-center" : "justify-start",
                className,
            )}
        >
            {items.map((item, idx) => {
                const Icon = resolveLucideIcon(item.icon);
                return (
                    <motion.li
                        key={`${item.text}-${idx}`}
                        variants={childVariants}
                        className={cn(
                            "inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium",
                            textColor,
                        )}
                    >
                        <Icon
                            className={cn("h-4 w-4 shrink-0", iconColor)}
                            strokeWidth={2.25}
                            aria-hidden="true"
                        />
                        <span>{item.text}</span>
                    </motion.li>
                );
            })}
        </motion.ul>
    );
}
