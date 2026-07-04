"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as LucideIcons from "lucide-react";
import { Check, X } from "lucide-react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";

export interface BeforeAfterItem {
    /** Optional override lucide icon name. Defaults to X (left) / Check (right). */
    icon?: string;
    text: string;
}

export interface BeforeAfterVisualProps {
    leftTitle: string;
    leftItems: BeforeAfterItem[];
    rightTitle: string;
    rightItems: BeforeAfterItem[];
    leftImage?: { src: string; alt: string };
    rightImage?: { src: string; alt: string };
    className?: string;
}

function getLucideIcon(name?: string, fallback: React.ComponentType<{ className?: string }> = LucideIcons.Sparkles) {
    if (!name) return fallback;
    const lib = LucideIcons as unknown as Record<
        string,
        React.ComponentType<{ className?: string }>
    >;
    return lib[name] ?? fallback;
}

interface PanelProps {
    side: "before" | "after";
    title: string;
    items: BeforeAfterItem[];
    image?: { src: string; alt: string };
    variants?: Variants;
}

function Panel({ side, title, items, image, variants }: PanelProps) {
    const isAfter = side === "after";

    const cardClasses = isAfter
        ? "bg-cream-50 ring-cream-300"
        : "bg-slate-50 ring-slate-200";

    const eyebrowClasses = isAfter ? "text-primary" : "text-slate-500";
    const titleClasses = isAfter ? "text-slate-900" : "text-slate-800";
    const eyebrow = isAfter ? "Après" : "Avant";
    const FallbackIcon = isAfter ? Check : X;
    const iconChipClasses = isAfter
        ? "bg-primary/15 text-primary"
        : "bg-red-100 text-red-400";

    return (
        <motion.div
            variants={variants}
            className={cn(
                "flex flex-col overflow-hidden rounded-3xl p-4 sm:p-5 md:p-6 ring-1",
                cardClasses,
            )}
        >
            {/* Optional top image */}
            <div className="relative w-full overflow-hidden rounded-2xl bg-brand-gradient aspect-video">
                {image?.src ? (
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        className="object-cover"
                    />
                ) : (
                    <div
                        aria-hidden="true"
                        className="absolute inset-0"
                        style={{
                            backgroundImage: isAfter
                                ? "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 55%), linear-gradient(135deg, #016B61 0%, #014038 100%)"
                                : "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 55%), linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                        }}
                    />
                )}
            </div>

            <span
                className={cn(
                    "mt-5 sm:mt-6 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em]",
                    eyebrowClasses,
                )}
            >
                {eyebrow}
            </span>

            <h3
                className={cn(
                    "mt-2 font-display text-lg sm:text-xl md:text-2xl font-semibold leading-[1.1] text-balance",
                    titleClasses,
                )}
            >
                {title}
            </h3>

            <ul className="mt-5 sm:mt-6 space-y-3">
                {items.map((item, idx) => {
                    const Icon = getLucideIcon(item.icon, FallbackIcon);
                    return (
                        <li key={idx} className="flex items-start gap-3">
                            <span
                                className={cn(
                                    "mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                                    iconChipClasses,
                                )}
                                aria-hidden="true"
                            >
                                <Icon className="h-3.5 w-3.5" />
                            </span>
                            <span
                                className={cn(
                                    "text-sm sm:text-base leading-relaxed",
                                    isAfter ? "text-slate-700" : "text-slate-600",
                                )}
                            >
                                {item.text}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </motion.div>
    );
}

/**
 * BeforeAfterVisual — premium split-panel comparison.
 *
 * - Left card = "Avant" (slate, red X icons).
 * - Right card = "Après" (cream, teal Check icons).
 * - Each side optionally shows a top image; otherwise a tonal gradient placeholder is used.
 * - Animates in with a stagger when scrolled into view. Respects `useReducedMotion`.
 */
function BeforeAfterVisual({
    leftTitle,
    leftItems,
    rightTitle,
    rightItems,
    leftImage,
    rightImage,
    className,
}: BeforeAfterVisualProps) {
    const prefersReducedMotion = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    // Server-visible-first: don't apply the `hidden` variant (which sets
    // opacity:0) until the component has mounted on the client.
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    const canAnimate = mounted && !prefersReducedMotion;

    const parent: Variants | undefined = prefersReducedMotion
        ? undefined
        : {
              hidden: { opacity: 0 },
              show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.18, delayChildren: 0.05 },
              },
          };
    const child: Variants | undefined = prefersReducedMotion
        ? undefined
        : {
              hidden: { opacity: 0, y: 28 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
          };

    return (
        <motion.div
            ref={ref}
            variants={parent}
            initial={canAnimate ? "hidden" : false}
            animate={canAnimate ? (inView ? "show" : "hidden") : undefined}
            className={cn(
                "grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6",
                className,
            )}
        >
            <Panel
                side="before"
                title={leftTitle}
                items={leftItems}
                image={leftImage}
                variants={child}
            />
            <Panel
                side="after"
                title={rightTitle}
                items={rightItems}
                image={rightImage}
                variants={child}
            />
        </motion.div>
    );
}

export default BeforeAfterVisual;
