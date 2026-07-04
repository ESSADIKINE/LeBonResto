"use client";

import * as LucideIcons from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

export interface FloatingUICardProps {
    /** Lucide icon name (e.g. "Star", "Users", "TrendingUp"). */
    icon: string;
    /** Small caption above the value. */
    label: string;
    /** Headline value (the bold number / label). */
    value: string;
    /** Visual tone. `light` = white glass, `dark` = navy glass. */
    tone?: "light" | "dark";
    /** Animation start delay in seconds. */
    delay?: number;
    /** Vertical float amplitude in px (default 8). */
    amplitude?: number;
    /** Float cycle period in seconds (default 4). */
    period?: number;
    /** Optional wrapper className for absolute positioning, sizing, etc. */
    className?: string;
}

function getLucideIcon(name: string) {
    const lib = LucideIcons as unknown as Record<
        string,
        React.ComponentType<{ className?: string }>
    >;
    return lib[name] ?? LucideIcons.Sparkles;
}

/**
 * FloatingUICard — premium glass card overlay used on top of hero imagery.
 *
 * - `light` tone: white glass with backdrop blur, slate text.
 * - `dark` tone: navy glass with white text.
 * - Subtle infinite vertical float (respects `useReducedMotion`).
 */
function FloatingUICard({
    icon,
    label,
    value,
    tone = "light",
    delay = 0,
    amplitude = 8,
    period = 4,
    className,
}: FloatingUICardProps) {
    const prefersReducedMotion = useReducedMotion();
    const Icon = getLucideIcon(icon);

    const toneClasses =
        tone === "dark"
            ? "bg-slate-900/85 text-white ring-white/10"
            : "bg-white/90 text-slate-900 ring-white/40";

    const labelClasses =
        tone === "dark" ? "text-white/70" : "text-slate-500";
    const valueClasses =
        tone === "dark" ? "text-white" : "text-slate-900";
    const iconChipClasses =
        tone === "dark"
            ? "bg-primary/20 text-primary-200"
            : "bg-primary-100 text-primary-800";

    const floatAnimation = prefersReducedMotion
        ? undefined
        : { y: [-amplitude, amplitude, -amplitude] };

    return (
        <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
            animate={
                prefersReducedMotion
                    ? undefined
                    : { opacity: 1, scale: 1, ...floatAnimation }
            }
            transition={{
                opacity: { delay, duration: 0.55, ease: "easeOut" },
                scale: { delay, duration: 0.55, ease: "easeOut" },
                y: {
                    delay: delay + 0.4,
                    duration: period,
                    repeat: Infinity,
                    ease: "easeInOut",
                },
            }}
            className={cn(
                "inline-flex max-w-[280px] items-center gap-2 sm:gap-3 rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 backdrop-blur-md ring-1 shadow-2xl",
                toneClasses,
                className,
            )}
        >
            <span
                className={cn(
                    "inline-flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl",
                    iconChipClasses,
                )}
                aria-hidden="true"
            >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
            <div className="min-w-0">
                <div className={cn("text-[10px] sm:text-xs font-medium uppercase tracking-wide truncate", labelClasses)}>
                    {label}
                </div>
                <div className={cn("text-sm sm:text-base font-bold leading-tight truncate", valueClasses)}>
                    {value}
                </div>
            </div>
        </motion.div>
    );
}

export default FloatingUICard;
