"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
    type Variants,
} from "framer-motion";
import { cn } from "@/lib/cn";
import FloatingUICard from "@/components/landing/FloatingUICard";
import ZellijPattern from "@/components/landing/ZellijPattern";
import HeroTrustBullets from "@/components/landing/HeroTrustBullets";

interface CtaLink {
    label: string;
    href: string;
}

interface HeroFloatingCard {
    icon: string;
    label: string;
    value: string;
}

export interface VisualHeroProps {
    /** Tiny eyebrow label rendered above the kicker chip (uppercase micro caps). */
    eyebrow?: string;
    /** Pill chip rendered above the headline. */
    kicker?: string;
    /** Main headline (h1). */
    headline: string;
    /**
     * Substring of `headline` to highlight in `text-cream-100`. Cream on the
     * darkened photo overlay yields ≥ 12:1 contrast (WCAG AA/AAA), whereas
     * the previous `text-primary-300` sat around 3:1 on cinematic imagery.
     */
    accent?: string;
    /** Short paragraph under the headline. */
    subheadline?: string;
    /** Primary CTA — teal pill with animated arrow. */
    primaryCta: CtaLink;
    /** Secondary CTA — small underlined / outlined white link. */
    secondaryCta?: CtaLink;
    /** Background image. If `src` is missing, falls back to bg-brand-gradient + moving teal glow. */
    image: { src?: string; alt: string };
    /** Optional floating UI cards rendered over the right side on lg+ screens. */
    floatingCards?: HeroFloatingCard[];
    /** Optional trust bullets rendered below the CTAs (on dark background). */
    trustPoints?: Array<{ icon: string; text: string }>;
    /** Text alignment. Defaults to `left`. */
    align?: "left" | "center";
    /** Overall hero height preset. */
    height?: "tall" | "normal";
    /** Optional wrapper className. */
    className?: string;
}

/** Wraps the first occurrence of `accent` in `text-cream-100` — brand-warm and
 *  keeps ≥ 12:1 contrast against the darkened hero photo (WCAG AA). Do NOT
 *  switch to `text-primary-*` here: on the cinematic image overlay the teal
 *  variants drop below 3:1 (Playwright a11y contrast fail). */
function renderHeadline(headline: string, accent?: string) {
    if (!accent) return headline;
    const idx = headline.indexOf(accent);
    if (idx < 0) return headline;
    return (
        <>
            {headline.slice(0, idx)}
            <span className="text-cream-100">{accent}</span>
            {headline.slice(idx + accent.length)}
        </>
    );
}

/** Tiny noise SVG used as a film-grain overlay above the hero image. */
const GRAIN_DATA_URI =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>";

// Per-card position presets for the floating column. Cycles through these.
const FLOATING_POSITIONS: Array<{
    pos: string;
    amplitude: number;
    period: number;
    delay: number;
}> = [
    { pos: "absolute top-0 right-2", amplitude: 10, period: 4.2, delay: 0.2 },
    { pos: "absolute top-1/3 -left-4", amplitude: 14, period: 5.0, delay: 0.45 },
    { pos: "absolute bottom-8 right-6", amplitude: 8, period: 4.6, delay: 0.7 },
    { pos: "absolute top-1/2 left-1/3", amplitude: 12, period: 5.4, delay: 0.95 },
];

function VisualHero({
    eyebrow,
    kicker,
    headline,
    accent,
    subheadline,
    primaryCta,
    secondaryCta,
    image,
    floatingCards,
    trustPoints,
    align = "left",
    height = "normal",
    className,
}: VisualHeroProps) {
    const prefersReducedMotion = useReducedMotion();
    const [imgFailed, setImgFailed] = useState(false);
    const sectionRef = useRef<HTMLElement | null>(null);
    const hasImage = Boolean(image.src) && !imgFailed;

    // Parallax: scale + fade the background as the hero scrolls out of view.
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });
    const scaleTransform = useTransform(scrollYProgress, [0, 1], [1.0, 1.12]);
    const opacityTransform = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

    /* Hero fills the full viewport minus the 8vh sticky header → 92vh.
     * The `height` prop is kept for API compatibility but both presets now
     * map to the same value (the user wants every hero to occupy the entire
     * remaining screen). Adjust if you ever need a shorter hero on a
     * specific page. */
    const heightClasses =
        height === "tall" ? "min-h-[92vh]" : "min-h-[92vh]";

    const isCenter = align === "center";

    const textColClasses = isCenter
        ? "lg:col-span-12 text-center mx-auto items-center"
        : "lg:col-span-7 text-center lg:text-left";

    // Stagger reveal for the text column.
    const textParent: Variants | undefined = prefersReducedMotion
        ? undefined
        : {
              hidden: { opacity: 0 },
              show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.1 },
              },
          };
    const textChild: Variants | undefined = prefersReducedMotion
        ? undefined
        : {
              hidden: { opacity: 0, y: 22 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
          };

    return (
        <section
            ref={sectionRef}
            className={cn(
                "relative isolate flex items-center overflow-hidden",
                heightClasses,
                className,
            )}
        >
            {/* Background layer (image or brand gradient fallback) with parallax */}
            <div className="absolute inset-0 -z-20 overflow-hidden">
                <motion.div
                    className="h-full w-full"
                    style={
                        prefersReducedMotion
                            ? undefined
                            : { scale: scaleTransform, opacity: opacityTransform }
                    }
                >
                    {hasImage ? (
                        <Image
                            src={image.src as string}
                            alt={image.alt}
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover"
                            onError={() => setImgFailed(true)}
                        />
                    ) : (
                        <div className="relative h-full w-full bg-brand-gradient">
                            <div
                                aria-hidden="true"
                                className="absolute inset-0"
                                style={{
                                    backgroundImage:
                                        "radial-gradient(circle at 20% 20%, #016B61 0%, transparent 55%), radial-gradient(circle at 80% 80%, #014038 0%, transparent 60%), linear-gradient(135deg, #016B61 0%, #014038 100%)",
                                }}
                            />
                            <motion.div
                                aria-hidden="true"
                                className="absolute -inset-10"
                                style={{
                                    backgroundImage:
                                        "radial-gradient(circle at 50% 50%, rgba(1,107,97,0.55) 0%, transparent 60%)",
                                }}
                                animate={
                                    prefersReducedMotion
                                        ? undefined
                                        : { scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }
                                }
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Legibility gradient overlay */}
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/30 to-transparent"
            />

            {/* Film-grain overlay */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 mix-blend-overlay"
                style={{
                    backgroundImage: `url("${GRAIN_DATA_URI}")`,
                    backgroundSize: "160px 160px",
                    opacity: 0.03,
                }}
            />

            {/* Moroccan zellij corner accent — seamless 8-pointed-star SVG on
                brand teal, anchored top-left, fades diagonally toward the
                bottom-right so it never fights the headline. Opacity lower than
                the legacy photo (0.18 vs 0.22) because the vector tile renders
                with crisper, more saturated color. */}
            <ZellijPattern
                anchor="top-left"
                fade="medium"
                opacity={0.18}
                className="-z-10"
            />

            <div className="container-wide grid w-full gap-8 sm:gap-10 lg:gap-8 py-10 md:py-14 lg:py-16 lg:grid-cols-12">
                {/* Text column */}
                <motion.div
                    variants={textParent}
                    initial={prefersReducedMotion ? false : "hidden"}
                    animate={prefersReducedMotion ? undefined : "show"}
                    className={cn("flex flex-col", textColClasses)}
                >
                    {eyebrow && (
                        <motion.span
                            variants={textChild}
                            className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-primary-200"
                        >
                            {eyebrow}
                        </motion.span>
                    )}

                    {kicker && (
                        <motion.span
                            variants={textChild}
                            className={cn(
                                "inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cream-100 ring-1 ring-white/20 backdrop-blur-md",
                                eyebrow ? "mt-3" : "mt-0",
                                isCenter ? "self-center" : "self-center lg:self-start",
                            )}
                        >
                            {kicker}
                        </motion.span>
                    )}

                    <motion.h1
                        variants={textChild}
                        className={cn(
                            "font-display font-bold text-white text-balance leading-[1.05] drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)]",
                            "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
                            kicker || eyebrow ? "mt-4 sm:mt-6" : "mt-0",
                        )}
                    >
                        {renderHeadline(headline, accent)}
                    </motion.h1>

                    {subheadline && (
                        <motion.p
                            variants={textChild}
                            className={cn(
                                "mt-4 sm:mt-6 max-w-prose text-base sm:text-lg text-white/85 text-pretty",
                                isCenter ? "mx-auto" : "mx-auto lg:mx-0",
                            )}
                        >
                            {subheadline}
                        </motion.p>
                    )}

                    <motion.div
                        variants={textChild}
                        className={cn(
                            "mt-6 sm:mt-8 lg:mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4",
                            isCenter ? "justify-center" : "justify-center lg:justify-start",
                            "items-stretch sm:items-center",
                        )}
                    >
                        <Link
                            href={primaryCta.href}
                            className="group inline-flex h-11 md:h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 sm:px-6 md:px-8 text-sm sm:text-base font-semibold text-white shadow-premium transition-all duration-300 hover:bg-primary-700 hover:shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300"
                        >
                            <span>{primaryCta.label}</span>
                            <ArrowRight
                                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                aria-hidden="true"
                            />
                        </Link>

                        {secondaryCta && (
                            <Link
                                href={secondaryCta.href}
                                className="group inline-flex h-11 md:h-12 items-center justify-center gap-1.5 rounded-full border border-white/40 px-5 sm:px-6 md:px-8 text-sm sm:text-base font-semibold text-white hover:bg-white/10 hover:border-white/70"
                            >
                                <span>{secondaryCta.label}</span>
                                <ArrowRight
                                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                    aria-hidden="true"
                                />
                            </Link>
                        )}
                    </motion.div>

                    {trustPoints && trustPoints.length > 0 && (
                        <motion.div variants={textChild} className="w-full">
                            <HeroTrustBullets
                                items={trustPoints}
                                variant="onDark"
                                align={isCenter ? "center" : "left"}
                                className="mt-6"
                            />
                        </motion.div>
                    )}
                </motion.div>

                {/* Floating UI cards column (lg+ only, only when align=left) */}
                {!isCenter && floatingCards && floatingCards.length > 0 && (
                    <div className="hidden lg:flex lg:col-span-5 relative items-center justify-center">
                        <div className="relative h-full lg:min-h-[400px] xl:min-h-[480px] w-full max-w-md">
                            {floatingCards.map((card, idx) => {
                                const cfg =
                                    FLOATING_POSITIONS[idx % FLOATING_POSITIONS.length];
                                return (
                                    <FloatingUICard
                                        key={`${card.label}-${idx}`}
                                        icon={card.icon}
                                        label={card.label}
                                        value={card.value}
                                        tone="light"
                                        delay={cfg.delay}
                                        amplitude={cfg.amplitude}
                                        period={cfg.period}
                                        className={cn("w-56", cfg.pos)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default VisualHero;
