import React from "react";
import { cn } from "@/lib/cn";
import ScrollReveal from "./ScrollReveal";
import PremiumCTA from "./PremiumCTA";

type Variant = "cream" | "primary" | "dark";

export interface ProblemStatementBandProps {
    /** Optional short chip above the headline, e.g. "LE PROBLÈME". */
    eyebrow?: string;
    /** Main punchy problem statement (h2). */
    headline: string;
    /** First occurrence of this substring is wrapped in a variant-aware accent color. */
    accent?: string;
    /** 1-2 line supporting description. */
    description?: string;
    /** Optional CTA rendered below the description. */
    cta?: { label: string; href: string };
    /** Visual variant. Defaults to "cream". */
    variant?: Variant;
    /** Optional wrapper class. */
    className?: string;
}

function renderHeadline(headline: string, accent: string | undefined, accentClass: string) {
    if (!accent) return headline;
    const idx = headline.indexOf(accent);
    if (idx < 0) return headline;
    return (
        <>
            {headline.slice(0, idx)}
            <span className={accentClass}>{accent}</span>
            {headline.slice(idx + accent.length)}
        </>
    );
}

/**
 * ProblemStatementBand — full-width emotional problem-statement banner meant to
 * live between the hero and the product-showcase sections. Punchy, brand-first,
 * with a soft radial glow behind the headline for depth.
 *
 * Variants:
 * - "cream"   → bg-cream-100, slate-900 text, primary accent
 * - "primary" → bg-primary,   white text,  primary-200 accent
 * - "dark"    → bg-secondary, white text,  primary-300 accent
 *
 * The CTA style adapts to the background so it always reads clearly.
 * Inner content is wrapped in ScrollReveal for a subtle enter animation.
 */
function ProblemStatementBand({
    eyebrow,
    headline,
    accent,
    description,
    cta,
    variant = "cream",
    className,
}: ProblemStatementBandProps) {
    const bgClass =
        variant === "cream"
            ? "bg-cream-100 text-slate-900"
            : variant === "primary"
                ? "bg-primary text-white"
                : "bg-secondary text-white";

    const accentClass =
        variant === "cream"
            ? "text-primary"
            : variant === "primary"
                ? "text-primary-200"
                : "text-primary-300";

    const descriptionClass =
        variant === "cream" ? "text-slate-600" : "text-white/85";

    // On the primary variant use a light "secondary" CTA so it reads on teal.
    const ctaVariant: "primary" | "secondary" =
        variant === "primary" ? "secondary" : "primary";

    // Radial glow tone — softly lighter than the surface so it lifts the type.
    const glowStyle =
        variant === "cream"
            ? "radial-gradient(circle, rgba(1,107,97,0.10) 0%, rgba(1,107,97,0) 70%)"
            : variant === "primary"
                ? "radial-gradient(circle, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 70%)"
                : "radial-gradient(circle, rgba(1,107,97,0.28) 0%, rgba(1,107,97,0) 70%)";

    return (
        <section
            className={cn(
                "relative isolate overflow-hidden section-y",
                bgClass,
                className,
            )}
        >
            {/* Decorative radial glow behind the headline */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                style={{ backgroundImage: glowStyle }}
            />

            <div className="container-narrow">
                <ScrollReveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
                    {eyebrow && (
                        <span
                            className={cn(
                                "inline-block rounded-full px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em]",
                                variant === "cream"
                                    ? "bg-primary-100 text-primary-800"
                                    : "bg-white/15 text-cream-100 ring-1 ring-white/20",
                            )}
                        >
                            {eyebrow}
                        </span>
                    )}

                    <h2
                        className={cn(
                            "h2-display font-display",
                            eyebrow ? "mt-3 sm:mt-4" : "mt-0",
                        )}
                    >
                        {renderHeadline(headline, accent, accentClass)}
                    </h2>

                    {description && (
                        <p
                            className={cn(
                                "mt-4 text-base sm:text-lg max-w-2xl mx-auto text-pretty",
                                descriptionClass,
                            )}
                        >
                            {description}
                        </p>
                    )}

                    {cta && (
                        <div className="mt-6">
                            <PremiumCTA
                                href={cta.href}
                                size="md"
                                variant={ctaVariant}
                                icon="arrow"
                            >
                                {cta.label}
                            </PremiumCTA>
                        </div>
                    )}
                </ScrollReveal>
            </div>
        </section>
    );
}

export default ProblemStatementBand;
