"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

interface CtaLink {
    label: string;
    href: string;
}

export interface LandingFooterCTAProps {
    title: string;
    primaryCta: CtaLink;
    secondaryCta?: CtaLink;
    className?: string;
}

export default function LandingFooterCTA({
    title,
    primaryCta,
    secondaryCta,
    className,
}: LandingFooterCTAProps) {
    const prefersReducedMotion = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    // Server-visible-first mount gate — see ScrollReveal.tsx for rationale.
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    const canAnimate = mounted && !prefersReducedMotion;

    return (
        <section className={cn("py-10 md:py-14 lg:py-16", className)}>
            <div className="container-narrow">
                <motion.div
                    ref={ref}
                    initial={canAnimate ? { opacity: 0, y: 30 } : false}
                    animate={
                        canAnimate && inView ? { opacity: 1, y: 0 } : undefined
                    }
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={cn(
                        "relative overflow-hidden rounded-3xl bg-brand-gradient",
                        "px-5 py-10 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:px-16 lg:py-20 text-center",
                        "shadow-glow"
                    )}
                >
                    {/* Decorative slow-spinning halo */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/5 blur-3xl animate-slow-spin"
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-cream-200/10 blur-3xl"
                    />

                    <h2
                        className={cn(
                            "relative font-display font-bold text-white text-balance",
                            "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
                            "leading-[1.05]"
                        )}
                    >
                        {title}
                    </h2>

                    <div className="relative mt-6 sm:mt-8 lg:mt-10 flex w-full flex-col sm:w-auto sm:flex-row gap-3 justify-center">
                        <Link
                            href={primaryCta.href}
                            className="inline-flex h-11 md:h-12 items-center justify-center rounded-full bg-white text-primary px-5 sm:px-6 md:px-8 text-sm sm:text-base font-semibold shadow-premium hover:bg-cream-50 transition-colors"
                        >
                            {primaryCta.label}
                        </Link>
                        {secondaryCta && (
                            <Link
                                href={secondaryCta.href}
                                className="inline-flex h-11 md:h-12 items-center justify-center rounded-full border-2 border-white/50 text-white px-5 sm:px-6 md:px-8 text-sm sm:text-base font-semibold hover:bg-white hover:text-primary hover:border-white transition-colors"
                            >
                                {secondaryCta.label}
                            </Link>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
