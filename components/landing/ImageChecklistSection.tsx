"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/cn";
import LongImageHoverScroll from "./LongImageHoverScroll";

export interface ImageChecklistItem {
    title: string;
    description?: string;
}

export interface ImageChecklistSectionProps {
    eyebrow?: string;
    title: string;
    accent?: string;
    description?: string;
    image: {
        src?: string;
        alt: string;
        longScroll?: boolean;
    };
    items: ImageChecklistItem[];
    imagePosition?: "left" | "right";
    cta?: { label: string; href: string };
    variant?: "white" | "cream";
    className?: string;
}

function renderTitle(title: string, accent?: string) {
    if (!accent) return title;
    const idx = title.indexOf(accent);
    if (idx < 0) return title;
    return (
        <>
            {title.slice(0, idx)}
            <span className="text-primary">{accent}</span>
            {title.slice(idx + accent.length)}
        </>
    );
}

/**
 * ImageChecklistSection — alternating image + checklist block.
 *
 * - Image col on the left or right (controlled by `imagePosition`).
 * - When `image.longScroll`, renders LongImageHoverScroll; otherwise a plain
 *   <img> with object-cover inside a tall rounded frame.
 * - Stagger reveal on view, respects `prefers-reduced-motion`.
 */
export default function ImageChecklistSection({
    eyebrow,
    title,
    accent,
    description,
    image,
    items,
    imagePosition = "left",
    cta,
    variant = "white",
    className,
}: ImageChecklistSectionProps) {
    const prefersReducedMotion = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    // Server-visible-first: `initial={false}` on SSR so nothing renders at
    // opacity:0. The fade-in only becomes active once we're mounted on the
    // client AND reduced motion is off.
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    const canAnimate = mounted && !prefersReducedMotion;

    const bg = variant === "cream" ? "bg-cream-50" : "bg-white";

    return (
        <section
            ref={ref}
            className={cn("relative py-10 md:py-14 lg:py-16", bg, className)}
        >
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div
                    className={cn(
                        "grid items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-10",
                    )}
                >
                    {/* Image */}
                    <motion.div
                        initial={
                            canAnimate ? { opacity: 0, y: 24 } : false
                        }
                        animate={
                            canAnimate && inView
                                ? { opacity: 1, y: 0 }
                                : undefined
                        }
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className={cn(
                            "lg:col-span-6",
                            imagePosition === "right"
                                ? "lg:order-2"
                                : "lg:order-1",
                        )}
                    >
                        {image.longScroll ? (
                            <LongImageHoverScroll
                                imageSrc={image.src}
                                alt={image.alt}
                                scrollDuration={7}
                            />
                        ) : (
                            <div
                                className={cn(
                                    "relative w-full overflow-hidden rounded-3xl shadow-glow ring-1 ring-slate-200/70",
                                    "aspect-[4/5] lg:aspect-[4/3]",
                                )}
                            >
                                {image.src ? (
                                    // Plain <img> so source aspect is cover-filled.
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        loading="lazy"
                                        decoding="async"
                                        className="absolute inset-0 h-full w-full select-none object-cover"
                                        draggable={false}
                                    />
                                ) : (
                                    <div
                                        aria-hidden="true"
                                        className="absolute inset-0 flex items-center justify-center bg-brand-gradient"
                                    >
                                        <span className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white/10 select-none">
                                            LeBonResto
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>

                    {/* Text + checklist */}
                    <motion.div
                        initial={
                            canAnimate ? { opacity: 0, y: 24 } : false
                        }
                        animate={
                            canAnimate && inView
                                ? { opacity: 1, y: 0 }
                                : undefined
                        }
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                            delay: 0.15,
                        }}
                        className={cn(
                            "lg:col-span-6",
                            imagePosition === "right"
                                ? "lg:order-1"
                                : "lg:order-2",
                        )}
                    >
                        {eyebrow && (
                            <span className="inline-block rounded-full bg-primary-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-800">
                                {eyebrow}
                            </span>
                        )}

                        <h2
                            className={cn(
                                "font-display font-bold leading-[1.1] text-balance text-slate-900",
                                "text-2xl sm:text-3xl md:text-4xl",
                                eyebrow ? "mt-4" : "mt-0",
                            )}
                        >
                            {renderTitle(title, accent)}
                        </h2>

                        {description && (
                            <p className="mt-4 max-w-prose text-base sm:text-lg text-slate-600 text-pretty">
                                {description}
                            </p>
                        )}

                        <ul className="mt-6 space-y-4">
                            {items.map((item, idx) => (
                                <motion.li
                                    key={`${item.title}-${idx}`}
                                    initial={
                                        canAnimate
                                            ? { opacity: 0, y: 12 }
                                            : false
                                    }
                                    animate={
                                        canAnimate && inView
                                            ? { opacity: 1, y: 0 }
                                            : undefined
                                    }
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeOut",
                                        delay: 0.25 + idx * 0.08,
                                    }}
                                    className="flex gap-3"
                                >
                                    <CheckCircle2
                                        aria-hidden="true"
                                        className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                                    />
                                    <div className="min-w-0">
                                        <p className="font-display text-sm sm:text-base font-semibold text-slate-900">
                                            {item.title}
                                        </p>
                                        {item.description && (
                                            <p className="mt-0.5 text-sm text-slate-600 text-pretty">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                </motion.li>
                            ))}
                        </ul>

                        {cta && (
                            <div className="mt-7">
                                <Link
                                    href={cta.href}
                                    className={cn(
                                        "group inline-flex items-center gap-2 text-sm font-semibold text-primary",
                                        "transition-colors duration-300 hover:text-primary-700",
                                    )}
                                >
                                    {cta.label}
                                    <ArrowRight
                                        aria-hidden="true"
                                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                    />
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
