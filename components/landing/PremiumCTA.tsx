"use client";

import React from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import { cn } from "@/lib/cn";
import MagneticCta from "./MagneticCta";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";
type IconName = "arrow" | "sparkle" | "check" | "none";

export interface PremiumCTAProps {
    href?: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    variant?: Variant;
    size?: Size;
    magnetic?: boolean;
    icon?: IconName;
    children: React.ReactNode;
    className?: string;
    type?: "button" | "submit" | "reset";
    "aria-label"?: string;
}

const sizeClasses: Record<Size, string> = {
    sm: "h-9 min-h-[40px] px-4 text-xs sm:text-sm",
    md: "h-10 md:h-11 min-h-[44px] px-5 sm:px-6 text-sm",
    lg: "h-11 md:h-12 min-h-[44px] px-6 md:px-7 text-sm md:text-base",
};

const variantClasses: Record<Variant, string> = {
    primary:
        "bg-primary text-white shadow-premium hover:bg-primary-700 hover:shadow-glow focus-visible:ring-primary/40",
    secondary:
        "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50 hover:ring-slate-300 focus-visible:ring-slate-300",
    ghost:
        "bg-transparent text-primary hover:underline underline-offset-4 focus-visible:ring-primary/30",
};

const iconSize: Record<Size, string> = {
    sm: "h-4 w-4",
    md: "h-[1.125rem] w-[1.125rem]",
    lg: "h-5 w-5",
};

function renderIcon(icon: IconName, size: Size) {
    const cls = cn(iconSize[size], "transition-transform duration-300 group-hover:translate-x-1");
    if (icon === "arrow") return <ArrowRight className={cls} aria-hidden="true" />;
    if (icon === "sparkle") return <Sparkles className={cls} aria-hidden="true" />;
    if (icon === "check") return <Check className={cls} aria-hidden="true" />;
    return null;
}

/**
 * PremiumCTA — the canonical brand CTA used across marketing pages.
 *
 * - 3 variants (primary teal pill / secondary white / ghost link)
 * - 3 sizes (sm / md / lg)
 * - Icon (arrow default, sparkle, check, none) translates 4px on hover
 * - Renders as `<a>` (Next Link) when `href` is provided, else `<button>`
 * - `magnetic` wraps the visual in MagneticCta with strength 8.
 *   Respects `prefers-reduced-motion`: falls back to plain render.
 */
export default function PremiumCTA({
    href,
    onClick,
    variant = "primary",
    size = "md",
    magnetic = false,
    icon = "arrow",
    children,
    className,
    type = "button",
    ...rest
}: PremiumCTAProps) {
    const prefersReducedMotion = useReducedMotion();

    const base = cn(
        "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold",
        "transition-all duration-300 will-change-transform",
        "focus:outline-none focus-visible:ring-4",
        sizeClasses[size],
        variantClasses[variant],
        className,
    );

    const inner = (
        <>
            <span>{children}</span>
            {icon !== "none" && renderIcon(icon, size)}
        </>
    );

    // Magnetic path: delegate the visual element to MagneticCta.
    if (magnetic && !prefersReducedMotion) {
        if (href) {
            return (
                <MagneticCta
                    href={href}
                    strength={8}
                    variant={variant}
                    className={base}
                    onClick={onClick as React.AnchorHTMLAttributes<HTMLAnchorElement>["onClick"]}
                    aria-label={rest["aria-label"]}
                >
                    {inner}
                </MagneticCta>
            );
        }
        return (
            <MagneticCta
                strength={8}
                variant={variant}
                className={base}
                type={type}
                onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
                aria-label={rest["aria-label"]}
            >
                {inner}
            </MagneticCta>
        );
    }

    // Plain (non-magnetic) render.
    if (href) {
        return (
            <Link
                href={href}
                onClick={onClick as React.AnchorHTMLAttributes<HTMLAnchorElement>["onClick"]}
                className={base}
                aria-label={rest["aria-label"]}
            >
                {inner}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
            className={base}
            aria-label={rest["aria-label"]}
        >
            {inner}
        </button>
    );
}
