"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

interface CtaLink {
    label: string;
    href: string;
}

export interface CTASectionProps {
    title: string;
    description?: string;
    primaryCta: CtaLink;
    secondaryCta?: CtaLink;
    variant?: "teal" | "dark" | "soft";
    image?: { src: string; alt: string };
    className?: string;
}

export default function CTASection({
    title,
    description,
    primaryCta,
    secondaryCta,
    variant = "teal",
    image,
    className,
}: CTASectionProps) {
    const prefersReducedMotion = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const [imgFailed, setImgFailed] = useState(false);
    const hasImage = Boolean(image?.src) && !imgFailed;

    const variantStyles = {
        teal: {
            wrap: "bg-primary text-white",
            title: "text-white",
            desc: "text-cream-100/90",
            primaryBtn: "bg-white text-primary hover:bg-cream-50",
            secondaryBtn:
                "border-2 border-white/40 text-white hover:bg-white hover:text-primary",
            overlay: "bg-primary/60",
        },
        dark: {
            wrap: "bg-secondary text-white",
            title: "text-white",
            desc: "text-slate-300",
            primaryBtn: "bg-primary text-white hover:bg-primary-700",
            secondaryBtn:
                "border-2 border-white/30 text-white hover:bg-white hover:text-secondary",
            overlay: "bg-secondary/70",
        },
        soft: {
            wrap: "bg-cream-50 text-slate-900",
            title: "text-slate-900",
            desc: "text-slate-600",
            primaryBtn: "bg-primary text-white hover:bg-primary-700",
            secondaryBtn:
                "border-2 border-slate-300 text-slate-800 hover:border-primary hover:text-primary",
            overlay: "bg-cream-50/70",
        },
    }[variant];

    return (
        <section className={cn("py-10 md:py-14 lg:py-16", className)}>
            <div className="container-wide">
                <motion.div
                    ref={ref}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
                    animate={
                        prefersReducedMotion ? undefined : inView ? { opacity: 1, y: 0 } : undefined
                    }
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={cn(
                        "relative overflow-hidden rounded-3xl shadow-premium",
                        "px-6 py-10 sm:px-8 sm:py-12 md:px-12 md:py-16 lg:px-16 lg:py-20",
                        variantStyles.wrap
                    )}
                >
                    {hasImage && (
                        <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={image!.src}
                                alt={image!.alt}
                                onError={() => setImgFailed(true)}
                                className="absolute inset-0 -z-10 h-full w-full object-cover"
                            />
                            <div
                                aria-hidden="true"
                                className={cn("absolute inset-0 -z-10", variantStyles.overlay)}
                            />
                        </>
                    )}

                    <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
                        <h2
                            className={cn(
                                "font-display font-bold text-balance leading-[1.1]",
                                "text-2xl sm:text-3xl md:text-4xl",
                                variantStyles.title
                            )}
                        >
                            {title}
                        </h2>
                        {description && (
                            <p
                                className={cn(
                                    "mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-pretty",
                                    variantStyles.desc
                                )}
                            >
                                {description}
                            </p>
                        )}
                        <div className="mt-6 sm:mt-8 lg:mt-10 flex w-full flex-col sm:w-auto sm:flex-row gap-3 justify-center">
                            <Link
                                href={primaryCta.href}
                                className={cn(
                                    "inline-flex h-10 sm:h-11 md:h-12 items-center justify-center rounded-full px-5 sm:px-6 md:px-8 text-sm sm:text-base font-semibold shadow-premium transition-colors",
                                    variantStyles.primaryBtn
                                )}
                            >
                                {primaryCta.label}
                            </Link>
                            {secondaryCta && (
                                <Link
                                    href={secondaryCta.href}
                                    className={cn(
                                        "inline-flex h-10 sm:h-11 md:h-12 items-center justify-center rounded-full px-5 sm:px-6 md:px-8 text-sm sm:text-base font-semibold transition-colors",
                                        variantStyles.secondaryBtn
                                    )}
                                >
                                    {secondaryCta.label}
                                </Link>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
