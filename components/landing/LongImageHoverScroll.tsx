"use client";

import React from "react";
import Link from "next/link";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import { MousePointerClick } from "lucide-react";
import { cn } from "@/lib/cn";

export interface LongImageHoverScrollProps {
    imageSrc?: string;
    alt?: string;
    title?: string;
    subtitle?: string;
    /**
     * Frame height in px. When omitted, the frame uses a responsive
     * `clamp(360px, 50vw, 620px)` so it shrinks on small phones and
     * grows on large desktops without overwhelming the mobile fold.
     */
    height?: number;
    /** Duration of the full vertical sweep in seconds. Default 6. */
    scrollDuration?: number;
    badge?: string;
    href?: string;
    overlayLabel?: string;
    className?: string;
}

/**
 * Premium "long screenshot reveal" frame.
 *
 * - Tall image sits inside a fixed-height rounded frame and pans vertically
 *   on hover (desktop) or tap (touch) to preview the full asset.
 * - Optional badge (top-left), overlay label (top-right) and bottom caption
 *   block with title/subtitle.
 * - `href` makes the entire frame a Link.
 * - Respects `prefers-reduced-motion`: image stays at top and the overlay
 *   label switches to "Voir la version complète".
 * - Without `imageSrc`, renders a brand-gradient block with a faint
 *   "LeBonResto" watermark so layouts remain intact pre-asset.
 */
export default function LongImageHoverScroll({
    imageSrc,
    alt = "",
    title,
    subtitle,
    height,
    scrollDuration = 6,
    badge,
    href,
    overlayLabel,
    className,
}: LongImageHoverScrollProps) {
    const prefersReducedMotion = useReducedMotion();
    const frameRef = React.useRef<HTMLDivElement>(null);
    const innerRef = React.useRef<HTMLDivElement>(null);
    const controls = useAnimation();
    const [isTouchPlaying, setIsTouchPlaying] = React.useState(false);
    // Fallback used by measure() and placeholder min-height when no explicit
    // height is provided (so the placeholder is still tall enough to scroll).
    const fallbackHeight = height ?? 520;

    const measure = React.useCallback(() => {
        const frameH = frameRef.current?.clientHeight ?? fallbackHeight;
        const innerH = innerRef.current?.scrollHeight ?? 0;
        return { frameH, innerH, panDistance: Math.max(0, innerH - frameH) };
    }, [fallbackHeight]);

    const handleEnter = () => {
        if (prefersReducedMotion || !imageSrc) return;
        const { panDistance } = measure();
        if (panDistance <= 0) return;
        controls.start({
            y: -panDistance,
            transition: { duration: scrollDuration, ease: [0.45, 0, 0.55, 1] },
        });
    };

    const handleLeave = () => {
        if (prefersReducedMotion) return;
        controls.start({
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        });
    };

    const handleTouchTap = () => {
        if (prefersReducedMotion || !imageSrc) return;
        // Only auto-trigger on touch devices (no hover capability).
        const isTouch =
            typeof window !== "undefined" &&
            window.matchMedia?.("(hover: none)").matches;
        if (!isTouch) return;
        if (isTouchPlaying) return;

        const { panDistance } = measure();
        if (panDistance <= 0) return;
        setIsTouchPlaying(true);
        controls
            .start({
                y: -panDistance,
                transition: { duration: scrollDuration, ease: [0.45, 0, 0.55, 1] },
            })
            .then(() => {
                controls.start({
                    y: 0,
                    transition: { duration: 0.8, ease: "easeOut" },
                });
                setIsTouchPlaying(false);
            });
    };

    const computedOverlay =
        overlayLabel ??
        (prefersReducedMotion
            ? "Voir la version complète"
            : "Voir l'expérience complète");

    const FrameInner = (
        <div
            ref={frameRef}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onClick={handleTouchTap}
            style={
                height
                    ? { height }
                    : { height: "clamp(360px, 50vw, 620px)" }
            }
            className={cn(
                "group relative w-full overflow-hidden rounded-3xl bg-cream-100",
                "ring-1 ring-slate-200/70 shadow-premium",
                "transition-shadow duration-500 hover:shadow-glow",
            )}
            role={imageSrc ? "img" : undefined}
            aria-label={imageSrc ? alt : undefined}
        >
            <motion.div
                ref={innerRef}
                animate={controls}
                initial={{ y: 0 }}
                className="absolute inset-x-0 top-0 will-change-transform"
            >
                {imageSrc ? (
                    // Plain <img> so landscape sources still cover-fill the
                    // frame (next/image with width/height would render the
                    // source aspect literally, leaving cream space when the
                    // image is shorter than the frame).
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={imageSrc}
                        alt={alt}
                        loading="lazy"
                        decoding="async"
                        className="block w-full select-none"
                        style={{
                            minHeight: fallbackHeight,
                            objectFit: "cover",
                            objectPosition: "center top",
                        }}
                        draggable={false}
                    />
                ) : (
                    <div
                        aria-hidden="true"
                        className="relative flex w-full items-center justify-center overflow-hidden bg-brand-gradient"
                        style={{ height: Math.max(fallbackHeight * 2.4, 1200) }}
                    >
                        <span className="font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white/10 select-none">
                            LeBonResto
                        </span>
                    </div>
                )}
            </motion.div>

            {/* Top-left badge */}
            {badge && (
                <div className="pointer-events-none absolute left-4 top-4 z-10">
                    <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-premium">
                        {badge}
                    </span>
                </div>
            )}

            {/* Top-right overlay label */}
            <div className="pointer-events-none absolute right-4 top-4 z-10">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-premium backdrop-blur">
                    <MousePointerClick className="h-3.5 w-3.5 text-primary" />
                    {computedOverlay}
                </span>
            </div>

            {/* Bottom caption block */}
            {(title || subtitle) && (
                <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-4 sm:px-6 pb-4 sm:pb-6 pt-12 sm:pt-16"
                    style={{
                        backgroundImage:
                            "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.45) 55%, transparent 100%)",
                    }}
                >
                    {title && (
                        <p className="font-display text-base sm:text-lg md:text-xl font-semibold text-white text-balance leading-[1.2]">
                            {title}
                        </p>
                    )}
                    {subtitle && (
                        <p className="mt-1 text-xs sm:text-sm text-white/80 text-pretty">
                            {subtitle}
                        </p>
                    )}
                </div>
            )}
        </div>
    );

    if (href) {
        return (
            <Link
                href={href}
                className={cn("block focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-3xl", className)}
                aria-label={title ?? alt ?? "Voir le détail"}
            >
                {FrameInner}
            </Link>
        );
    }

    return <div className={cn(className)}>{FrameInner}</div>;
}
