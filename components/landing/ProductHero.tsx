"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
    motion,
    useAnimation,
    useReducedMotion,
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

export interface ProductHeroProps {
    /** Tiny eyebrow chip rendered above the headline (primary tone). */
    eyebrow?: string;
    /** Main headline (h1). */
    headline: string;
    /** First occurrence of this substring is highlighted in `text-primary`. */
    accent?: string;
    /** Short paragraph under the headline. */
    subheadline?: string;
    /** Primary CTA — teal pill with animated arrow. */
    primaryCta: CtaLink;
    /** Secondary CTA — outlined ghost button. */
    secondaryCta?: CtaLink;
    /** Product mockup rendered inside a device frame on the right.
     * Provide either an image `src` for a screenshot mockup (with hover-scroll
     * preview) or an `iframeSrc` to embed a live interactive view (e.g. a
     * Pannellum 360° tour or any external embed). When both are present,
     * `iframeSrc` wins. */
    mockup: {
        src?: string;
        iframeSrc?: string;
        alt: string;
        aspect?: "tablet" | "laptop" | "mobile";
    };
    /** Optional ambient restaurant photo behind the mockup (very low opacity). */
    backgroundImage?: { src?: string; alt: string };
    /** Floating glass cards orbiting the device frame on lg+ screens. */
    floatingCards?: HeroFloatingCard[];
    /** Optional trust bullets rendered below the CTAs (on light background). */
    trustPoints?: Array<{ icon: string; text: string }>;
    /** Optional wrapper className. */
    className?: string;
}

/** Wraps the first occurrence of `accent` in `text-primary` to highlight it. */
function renderHeadline(headline: string, accent?: string) {
    if (!accent) return headline;
    const idx = headline.indexOf(accent);
    if (idx < 0) return headline;
    return (
        <>
            {headline.slice(0, idx)}
            <span className="text-primary">{accent}</span>
            {headline.slice(idx + accent.length)}
        </>
    );
}

// Floating card positions around the device frame (lg+ only).
const FLOATING_POSITIONS: Array<{
    pos: string;
    amplitude: number;
    period: number;
    delay: number;
}> = [
    { pos: "absolute -top-6 -left-6", amplitude: 10, period: 4.2, delay: 0.3 },
    { pos: "absolute top-1/3 -right-2", amplitude: 12, period: 5.0, delay: 0.55 },
    { pos: "absolute -bottom-6 left-6", amplitude: 8, period: 4.6, delay: 0.8 },
    { pos: "absolute bottom-1/4 -right-4", amplitude: 11, period: 5.4, delay: 1.05 },
];

interface DeviceFrameProps {
    src?: string;
    iframeSrc?: string;
    alt: string;
    aspect: "tablet" | "laptop" | "mobile";
    prefersReducedMotion: boolean;
}

/** Renders the interactive 360 / external iframe inside the device screen.
 * Used when ProductHero receives mockup.iframeSrc — e.g. a Pannellum viewer. */
function FrameIframe({ src, title }: { src: string; title: string }) {
    return (
        <iframe
            title={title}
            src={src}
            loading="lazy"
            allow="accelerometer; gyroscope; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
        />
    );
}

/**
 * HoverScrollImage — displays a tall image inside an overflow-hidden frame.
 * On parent hover (desktop), the inner image smoothly pans vertically from
 * top to bottom across ~6 seconds, then returns to top on mouse leave.
 * Uses plain <img> so the natural aspect ratio is preserved and a tall
 * screenshot overflows the frame vertically — that overflow is what we pan.
 */
function HoverScrollImage({
    src,
    alt,
    onError,
    prefersReducedMotion,
}: {
    src: string;
    alt: string;
    onError: () => void;
    prefersReducedMotion: boolean;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLImageElement>(null);
    const controls = useAnimation();

    const handleEnter = () => {
        if (prefersReducedMotion) return;
        const cH = containerRef.current?.clientHeight ?? 0;
        const cW = containerRef.current?.clientWidth ?? 0;
        const nW = innerRef.current?.naturalWidth ?? 0;
        const nH = innerRef.current?.naturalHeight ?? 0;
        if (!cH || !cW || !nW || !nH) return;
        const renderedH = (nH * cW) / nW;
        const distance = Math.max(0, renderedH - cH);
        if (distance <= 0) return;
        controls.start({
            y: -distance,
            transition: { duration: 14, ease: [0.45, 0, 0.55, 1] },
        });
    };
    const handleLeave = () => {
        if (prefersReducedMotion) return;
        controls.start({ y: 0, transition: { duration: 1.6, ease: "easeOut" } });
    };

    return (
        <div
            ref={containerRef}
            className="relative h-full w-full"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            <motion.div
                animate={controls}
                initial={{ y: 0 }}
                className="absolute inset-x-0 top-0 will-change-transform"
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    ref={innerRef}
                    src={src}
                    alt={alt}
                    onError={onError}
                    draggable={false}
                    className="block w-full h-full object-cover object-top select-none"
                />
            </motion.div>
        </div>
    );
}

function DeviceFrame({ src, iframeSrc, alt, aspect, prefersReducedMotion }: DeviceFrameProps) {
    const [imgFailed, setImgFailed] = useState(false);
    const useIframe = Boolean(iframeSrc);

    const floatProps = prefersReducedMotion || useIframe
        ? undefined
        : {
              animate: { y: [-3, 3, -3] },
              transition: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
              },
          };

    const renderScreen = () => {
        if (useIframe) return <FrameIframe src={iframeSrc as string} title={alt} />;
        if (!src || imgFailed) return <div className="h-full w-full bg-brand-gradient" />;
        return (
            <HoverScrollImage
                src={src}
                alt={alt}
                onError={() => setImgFailed(true)}
                prefersReducedMotion={prefersReducedMotion}
            />
        );
    };

    if (aspect === "laptop") {
        return (
            <motion.div
                {...floatProps}
                whileHover={prefersReducedMotion || useIframe ? undefined : { rotateY: 2, rotateX: -1 }}
                className="relative mx-auto w-full max-w-[20rem] sm:max-w-[28rem] md:max-w-[32rem] lg:max-w-[40rem]"
                style={{ transformStyle: "preserve-3d", perspective: 1200 }}
            >
                {/* Laptop screen */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-slate-900 ring-[6px] ring-slate-900 shadow-glow">
                    <div className="absolute inset-[6px] overflow-hidden rounded-t-xl bg-cream-50">
                        {renderScreen()}
                    </div>
                </div>
                {/* Laptop base */}
                <div className="relative mx-auto h-3 w-[108%] -translate-x-[3.7%] rounded-b-2xl bg-gradient-to-b from-slate-700 to-slate-900 shadow-premium">
                    <div className="mx-auto h-1 w-24 rounded-b-md bg-slate-800" />
                </div>
            </motion.div>
        );
    }

    if (aspect === "mobile") {
        return (
            <motion.div
                {...floatProps}
                whileHover={prefersReducedMotion || useIframe ? undefined : { rotateY: 2 }}
                className="relative mx-auto w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px]"
                style={{ transformStyle: "preserve-3d", perspective: 1200 }}
            >
                <div className="relative aspect-[9/19] overflow-hidden rounded-[2.4rem] bg-slate-900 ring-[8px] ring-slate-900 shadow-glow">
                    <div className="absolute inset-2 overflow-hidden rounded-[1.9rem] bg-cream-50">
                        {renderScreen()}
                    </div>
                    {/* Notch */}
                    <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-slate-900" />
                </div>
            </motion.div>
        );
    }

    // Default: tablet
    return (
        <motion.div
            {...floatProps}
            whileHover={prefersReducedMotion || useIframe ? undefined : { rotateY: 2, rotateX: -1 }}
            className="relative mx-auto w-full max-w-[20rem] sm:max-w-[28rem] md:max-w-[32rem] lg:max-w-[40rem]"
            style={{ transformStyle: "preserve-3d", perspective: 1200 }}
        >
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-slate-900 ring-8 ring-slate-900 shadow-glow">
                <div className="absolute inset-[6px] overflow-hidden rounded-[1.25rem] bg-cream-50">
                    {renderScreen()}
                </div>
            </div>
        </motion.div>
    );
}

/**
 * ProductHero — TheFork-style hero where the product mockup IS the visual.
 *
 * - Text + CTAs on the left, large device frame mockup on the right.
 * - Optional ambient restaurant photo at very low opacity behind the mockup.
 * - Floating glass cards orbit the device on lg+ screens (hidden on mobile).
 * - Headline reveals with framer-motion stagger; mockup floats subtly.
 * - Respects `useReducedMotion`.
 */
function ProductHero({
    eyebrow,
    headline,
    accent,
    subheadline,
    primaryCta,
    secondaryCta,
    mockup,
    backgroundImage,
    floatingCards,
    trustPoints,
    className,
}: ProductHeroProps) {
    const prefersReducedMotion = useReducedMotion();
    const sectionRef = useRef<HTMLElement | null>(null);
    const [bgFailed, setBgFailed] = useState(false);
    const hasBg = Boolean(backgroundImage?.src) && !bgFailed;
    const aspect = mockup.aspect ?? "tablet";

    // Stagger reveal for the text column.
    const textParent: Variants | undefined = prefersReducedMotion
        ? undefined
        : {
              hidden: { opacity: 0 },
              show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.05 },
              },
          };
    const textChild: Variants | undefined = prefersReducedMotion
        ? undefined
        : {
              hidden: { opacity: 0, y: 22 },
              show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
          };

    const mockupInitial = prefersReducedMotion
        ? false
        : { opacity: 0, y: 32, scale: 0.96 };
    const mockupAnimate = prefersReducedMotion
        ? undefined
        : { opacity: 1, y: 0, scale: 1 };

    return (
        <section
            ref={sectionRef}
            className={cn(
                "relative isolate flex items-center overflow-hidden",
                "min-h-[92vh]",
                "bg-cream-gradient",
                className,
            )}
        >
            {/* Ambient restaurant photo — very low opacity, blurred. The mockup carries the visual weight. */}
            {hasBg && (
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-20 overflow-hidden"
                >
                    <Image
                        src={backgroundImage!.src as string}
                        alt={backgroundImage!.alt}
                        aria-hidden="true"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover opacity-[0.18] blur-[2px]"
                        onError={() => setBgFailed(true)}
                    />
                </div>
            )}

            {/* Soft brand-gradient overlay for warmth */}
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 85% 30%, rgba(1, 107, 97, 0.10) 0%, transparent 55%), radial-gradient(circle at 15% 80%, rgba(245, 226, 168, 0.25) 0%, transparent 55%)",
                }}
            />

            {/* Moroccan zellij corner accent — seamless 8-pointed-star SVG on
                brand teal, anchored top-left so the device mockup on the right
                stays uncluttered. Opacity is lower than VisualHero (0.14 vs
                0.18) because ProductHero sits on a bright cream gradient and a
                punchier vector tile would otherwise read muddy. */}
            <ZellijPattern
                anchor="top-left"
                fade="medium"
                opacity={0.14}
                className="-z-10"
            />

            <div className="container-wide grid w-full gap-6 sm:gap-8 lg:gap-8 py-10 md:py-14 lg:py-16 md:grid-cols-12">
                {/* Text column */}
                <motion.div
                    variants={textParent}
                    initial={prefersReducedMotion ? false : "hidden"}
                    animate={prefersReducedMotion ? undefined : "show"}
                    className="flex flex-col items-center text-center lg:items-start lg:text-left md:col-span-5 lg:col-span-5 lg:pt-8"
                >
                    {eyebrow && (
                        <motion.span
                            variants={textChild}
                            className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-primary ring-1 ring-primary/30"
                        >
                            {eyebrow}
                        </motion.span>
                    )}

                    <motion.h1
                        variants={textChild}
                        className={cn(
                            "font-display font-bold text-balance text-slate-900 leading-[1.05]",
                            "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
                            eyebrow ? "mt-4 sm:mt-5" : "mt-0",
                        )}
                    >
                        {renderHeadline(headline, accent)}
                    </motion.h1>

                    {subheadline && (
                        <motion.p
                            variants={textChild}
                            className="mt-4 sm:mt-5 max-w-prose text-base sm:text-lg text-slate-600 text-pretty"
                        >
                            {subheadline}
                        </motion.p>
                    )}

                    <motion.div
                        variants={textChild}
                        className="mt-6 sm:mt-8 flex w-full max-w-xs mx-auto flex-col items-stretch gap-3 sm:max-w-none sm:w-auto sm:mx-0 sm:flex-row sm:items-center"
                    >
                        <Link
                            href={primaryCta.href}
                            className="group inline-flex h-11 md:h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 sm:px-6 md:px-8 text-sm sm:text-base font-semibold text-white shadow-premium transition-all duration-300 hover:bg-primary-700 hover:shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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
                                className="group inline-flex h-11 md:h-12 items-center justify-center gap-1.5 rounded-full border border-slate-300 bg-white px-5 sm:px-6 md:px-8 text-sm sm:text-base font-semibold text-slate-900 transition-colors duration-300 hover:border-primary hover:text-primary"
                            >
                                <span>{secondaryCta.label}</span>
                                <ArrowRight
                                    className="h-4 w-4 hidden sm:inline-block transition-transform duration-300 group-hover:translate-x-1"
                                    aria-hidden="true"
                                />
                            </Link>
                        )}
                    </motion.div>

                    {trustPoints && trustPoints.length > 0 && (
                        <motion.div variants={textChild} className="w-full">
                            <HeroTrustBullets
                                items={trustPoints}
                                variant="onLight"
                                align="left"
                                className="mt-6"
                            />
                        </motion.div>
                    )}
                </motion.div>

                {/* Mockup column */}
                <motion.div
                    initial={mockupInitial}
                    animate={mockupAnimate}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="relative flex items-center justify-center md:col-span-7 lg:col-span-7"
                >
                    <div className="relative w-full">
                        <DeviceFrame
                            src={mockup.src}
                            iframeSrc={mockup.iframeSrc}
                            alt={mockup.alt}
                            aspect={aspect}
                            prefersReducedMotion={prefersReducedMotion ?? false}
                        />

                        {/* Floating UI cards — lg+ only */}
                        {floatingCards && floatingCards.length > 0 && (
                            <div className="pointer-events-none absolute inset-0 hidden lg:block">
                                {floatingCards.map((card, idx) => {
                                    const cfg =
                                        FLOATING_POSITIONS[idx % FLOATING_POSITIONS.length];
                                    return (
                                        <div
                                            key={`${card.label}-${idx}`}
                                            className={cn("pointer-events-auto", cfg.pos)}
                                        >
                                            <FloatingUICard
                                                icon={card.icon}
                                                label={card.label}
                                                value={card.value}
                                                tone="light"
                                                delay={cfg.delay}
                                                amplitude={cfg.amplitude}
                                                period={cfg.period}
                                                className="w-48"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default ProductHero;
