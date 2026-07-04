"use client";

import { useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/cn";
import MagneticCta from "@/components/landing/MagneticCta";

interface FloatingCard {
    icon: string;
    label: string;
    value: string;
}

interface CtaLink {
    label: string;
    href: string;
}

export interface LandingHeroProps {
    kicker?: string;
    headline: string;
    accent?: string;
    subheadline?: string;
    primaryCta: CtaLink;
    secondaryCta?: CtaLink;
    image: { src?: string; alt: string };
    overlay?: "dark" | "gradient";
    floatingCards?: FloatingCard[];
    children?: ReactNode;
}

/**
 * Splits the headline into [before, accent, after] when `accent` is present and found.
 * The first occurrence is wrapped in <span className="text-primary">.
 */
function renderHeadline(headline: string, accent?: string): ReactNode {
    if (!accent) return headline;
    const idx = headline.indexOf(accent);
    if (idx < 0) return headline;
    const before = headline.slice(0, idx);
    const after = headline.slice(idx + accent.length);
    return (
        <>
            {before}
            <span className="text-primary">{accent}</span>
            {after}
        </>
    );
}

function getLucideIcon(name: string) {
    const lib = LucideIcons as unknown as Record<
        string,
        React.ComponentType<{ className?: string }>
    >;
    return lib[name] ?? LucideIcons.Sparkles;
}

/** Tiny noise SVG used as a film-grain overlay above the hero image. */
const GRAIN_DATA_URI =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>";

// Per-card float configuration (amplitude px, period s, phase delay s, position).
const CARD_CONFIG: Array<{
    pos: string;
    amplitude: number;
    period: number;
    phase: number;
}> = [
    { pos: "top-0 left-2", amplitude: 8, period: 3.8, phase: 0 },
    { pos: "top-1/3 right-0", amplitude: 14, period: 4.6, phase: 0.4 },
    { pos: "bottom-6 left-10", amplitude: 6, period: 5.4, phase: 0.8 },
    { pos: "top-1/2 left-1/4", amplitude: 11, period: 4.2, phase: 1.2 },
];

function LandingHero({
    kicker,
    headline,
    accent,
    subheadline,
    primaryCta,
    secondaryCta,
    image,
    overlay = "dark",
    floatingCards,
    children,
}: LandingHeroProps) {
    const prefersReducedMotion = useReducedMotion();
    const [imgFailed, setImgFailed] = useState(false);
    const sectionRef = useRef<HTMLElement | null>(null);
    const hasImage = Boolean(image.src) && !imgFailed;

    // Parallax: scale + fade the background as the hero scrolls out of view.
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });
    const scaleTransform = useTransform(scrollYProgress, [0, 1], [1.0, 1.18]);
    const opacityTransform = useTransform(scrollYProgress, [0, 1], [1, 0.55]);

    const overlayClasses =
        overlay === "gradient"
            ? "bg-gradient-to-br from-secondary/80 via-primary-800/55 to-primary-900/80"
            : "bg-gradient-to-b from-secondary/55 via-secondary/45 to-secondary/75";

    // Staggered reveal for the text column children.
    const textParent = prefersReducedMotion
        ? undefined
        : {
              hidden: { opacity: 0 },
              show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.1 },
              },
          };
    const textChild = prefersReducedMotion
        ? undefined
        : {
              hidden: { opacity: 0, y: 22 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
          };

    return (
        <section
            ref={sectionRef}
            className={cn(
                "relative isolate overflow-hidden",
                "min-h-[92vh]",
                "flex items-center"
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
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={image.src}
                            alt={image.alt}
                            onError={() => setImgFailed(true)}
                            className="h-full w-full object-cover"
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
                            {/* Subtle moving teal glow so the hero never feels empty */}
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
                                        : { scale: [1, 1.05, 1], opacity: [0.85, 1, 0.85] }
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

            {/* Film-grain overlay (above the image, below the legibility scrim) */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 mix-blend-overlay"
                style={{
                    backgroundImage: `url("${GRAIN_DATA_URI}")`,
                    backgroundSize: "160px 160px",
                    opacity: 0.08,
                }}
            />

            {/* Legibility overlay */}
            <div className={cn("absolute inset-0 -z-10", overlayClasses)} aria-hidden="true" />

            <div className="container-wide grid gap-8 sm:gap-10 lg:gap-8 lg:grid-cols-12 py-10 md:py-14 lg:py-16 w-full">
                {/* Text column with staggered reveal */}
                <motion.div
                    variants={textParent}
                    initial={prefersReducedMotion ? false : "hidden"}
                    animate={prefersReducedMotion ? undefined : "show"}
                    className="lg:col-span-7 text-center lg:text-left"
                >
                    {kicker && (
                        <motion.span
                            variants={textChild}
                            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cream-100 ring-1 ring-white/20"
                        >
                            {kicker}
                        </motion.span>
                    )}

                    <motion.h1
                        variants={textChild}
                        className={cn(
                            "mt-6 font-display font-bold text-white text-balance",
                            "text-3xl sm:text-4xl md:text-4xl lg:text-5xl",
                            "leading-[1.05] drop-shadow-[0_2px_18px_rgba(0,0,0,0.25)]"
                        )}
                    >
                        {renderHeadline(headline, accent)}
                    </motion.h1>

                    {subheadline && (
                        <motion.p
                            variants={textChild}
                            className="mt-6 max-w-2xl mx-auto lg:mx-0 text-lg md:text-xl text-cream-100/95 text-pretty"
                        >
                            {subheadline}
                        </motion.p>
                    )}

                    <motion.div
                        variants={textChild}
                        className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                    >
                        <MagneticCta href={primaryCta.href} variant="primary">
                            {primaryCta.label}
                        </MagneticCta>
                        {secondaryCta && (
                            <Link
                                href={secondaryCta.href}
                                className="inline-flex items-center justify-center rounded-full border-2 border-white/40 bg-white/5 backdrop-blur-sm px-6 py-3 text-sm md:text-base font-semibold text-white hover:bg-white hover:text-primary hover:border-white transition-colors"
                            >
                                {secondaryCta.label}
                            </Link>
                        )}
                    </motion.div>

                    {children && (
                        <motion.div variants={textChild} className="mt-10">
                            {children}
                        </motion.div>
                    )}
                </motion.div>

                {/* Floating cards column (lg+ only) */}
                {floatingCards && floatingCards.length > 0 && (
                    <div className="hidden lg:flex lg:col-span-5 relative items-center justify-center">
                        <div
                            className="relative w-full max-w-md h-full min-h-[440px]"
                            style={{ perspective: 1000 }}
                        >
                            {floatingCards.map((card, idx) => {
                                const Icon = getLucideIcon(card.icon);
                                const cfg = CARD_CONFIG[idx % CARD_CONFIG.length];

                                return (
                                    <motion.div
                                        key={`${card.label}-${idx}`}
                                        initial={
                                            prefersReducedMotion
                                                ? false
                                                : { opacity: 0, y: 24, scale: 0.95 }
                                        }
                                        animate={
                                            prefersReducedMotion
                                                ? undefined
                                                : {
                                                      opacity: 1,
                                                      y: [0, -cfg.amplitude, 0],
                                                      scale: 1,
                                                  }
                                        }
                                        transition={{
                                            opacity: {
                                                delay: 0.35 + idx * 0.12,
                                                duration: 0.55,
                                            },
                                            scale: {
                                                delay: 0.35 + idx * 0.12,
                                                duration: 0.55,
                                            },
                                            y: {
                                                delay: 0.8 + cfg.phase,
                                                duration: cfg.period,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            },
                                        }}
                                        whileHover={
                                            prefersReducedMotion
                                                ? undefined
                                                : { scale: 1.04, rotateY: 4 }
                                        }
                                        className={cn(
                                            "absolute w-56 rounded-2xl bg-white/85 backdrop-blur-md ring-1 ring-white/40 shadow-2xl drop-shadow-2xl p-4 transition-shadow",
                                            cfg.pos
                                        )}
                                        style={{ transformStyle: "preserve-3d" }}
                                    >
                                        <div className="flex items-start gap-3">
                                            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-800">
                                                <Icon className="h-5 w-5" />
                                            </span>
                                            <div className="min-w-0">
                                                <div className="text-xs font-medium text-slate-500 truncate">
                                                    {card.label}
                                                </div>
                                                <div className="text-lg font-bold text-slate-900 truncate">
                                                    {card.value}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Scroll cue (hidden if reduced motion) */}
            {!prefersReducedMotion && (
                <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <svg
                        width="22"
                        height="34"
                        viewBox="0 0 22 34"
                        fill="none"
                        className="text-white/80"
                    >
                        <rect
                            x="1"
                            y="1"
                            width="20"
                            height="32"
                            rx="10"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        />
                        <motion.circle
                            cx="11"
                            cy="9"
                            r="2"
                            fill="currentColor"
                            animate={{ cy: [9, 22, 9] }}
                            transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </svg>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                        Scroll
                    </span>
                </motion.div>
            )}
        </section>
    );
}

export default LandingHero;
