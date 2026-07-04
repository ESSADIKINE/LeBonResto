import { CheckCircle2, MessageCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import PremiumCTA from "./PremiumCTA";

export interface PricingTier {
    id: string;
    name: string;
    price: string;
    tagline: string;
    features: string[];
    recommended?: boolean;
    ctaLabel: string;
    ctaHref: string;
    /** Optional pre-encoded WhatsApp deep link — renders a secondary CTA under the primary. */
    whatsappHref?: string;
}

export interface PricingComparisonTableProps {
    tiers: PricingTier[];
    /**
     * Billing period. Does NOT change the displayed price (still "Sur devis"),
     * but drives the small note under the price and is forwarded to the
     * WhatsApp CTA via a `?billing=` query string.
     */
    billing?: "monthly" | "annual";
    className?: string;
}

const billingNote: Record<NonNullable<PricingComparisonTableProps["billing"]>, string> = {
    monthly: "Facturation mensuelle",
    annual: "Facturation annuelle · Économisez 2 mois",
};

/**
 * Append `?billing=<billing>` (or `&billing=<billing>`) to a WhatsApp deep link
 * while preserving the existing `?text=...` prefill query.
 */
function withBilling(href: string, billing: "monthly" | "annual") {
    const separator = href.includes("?") ? "&" : "?";
    return `${href}${separator}billing=${billing}`;
}

/**
 * PricingComparisonTable — premium 3-tier comparison grid.
 *
 * - grid-cols-1 lg:grid-cols-3 with the recommended tier visually emphasised
 *   (ring-2 primary, scale-105 on lg, "Recommandé" badge).
 * - Each card: rounded-3xl, shadow-premium, white bg, ring-1 slate-100.
 * - Feature list uses lucide CheckCircle2 in primary teal at left.
 * - Full-width PremiumCTA at the bottom of every card.
 * - When `billing` is provided, a small note appears under the price and is
 *   forwarded to the WhatsApp CTA via `?billing=<value>`.
 * - When a tier defines `whatsappHref`, a secondary WhatsApp CTA is rendered
 *   under the primary one.
 *
 * Server component — no client interactivity required.
 */
function PricingComparisonTable({
    tiers,
    billing,
    className,
}: PricingComparisonTableProps) {
    return (
        <div
            className={cn(
                "grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 lg:gap-6 lg:items-stretch",
                className,
            )}
        >
            {tiers.map((tier) => {
                const isRecommended = Boolean(tier.recommended);
                const whatsappHref = tier.whatsappHref && billing
                    ? withBilling(tier.whatsappHref, billing)
                    : tier.whatsappHref;

                return (
                    <div
                        key={tier.id}
                        className={cn(
                            "relative flex flex-col rounded-3xl bg-white p-4 sm:p-5 md:p-6 shadow-premium ring-1 ring-slate-100",
                            "transition-transform duration-300",
                            isRecommended &&
                                "ring-2 ring-primary shadow-glow lg:-translate-y-2 xl:shadow-glow",
                        )}
                    >
                        {isRecommended && (
                            <span
                                className="absolute right-4 top-4 inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-sm"
                                aria-label="Offre recommandée"
                            >
                                Recommandé
                            </span>
                        )}

                        {/* Tier header */}
                        <div className="flex flex-col gap-2">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900">{tier.name}</h3>
                            <p className="text-sm text-slate-600 max-w-xs text-pretty">
                                {tier.tagline}
                            </p>
                        </div>

                        {/* Price */}
                        <div className="mt-4 sm:mt-5">
                            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                                {tier.price}
                            </span>
                            {billing && (
                                <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
                                    {billingNote[billing]}
                                </p>
                            )}
                        </div>

                        {/* Features */}
                        <ul className="mt-5 sm:mt-6 flex-1 space-y-3">
                            {tier.features.map((feature, idx) => (
                                <li
                                    key={`${tier.id}-feature-${idx}`}
                                    className="flex items-start gap-3 text-sm sm:text-base text-slate-700"
                                >
                                    <CheckCircle2
                                        className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                                        aria-hidden="true"
                                    />
                                    <span className="text-pretty">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {/* CTAs */}
                        <div className="mt-5 sm:mt-6 flex flex-col gap-2.5">
                            <PremiumCTA
                                href={tier.ctaHref}
                                variant={isRecommended ? "primary" : "secondary"}
                                size="md"
                                className="w-full"
                                icon="arrow"
                                aria-label={`${tier.ctaLabel} — offre ${tier.name}`}
                            >
                                {tier.ctaLabel}
                            </PremiumCTA>

                            {whatsappHref && (
                                <a
                                    href={whatsappHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Discuter de la formule ${tier.name} sur WhatsApp`}
                                    className={cn(
                                        "rounded-full ring-1 ring-slate-200 text-slate-800",
                                        "flex items-center justify-center gap-2 py-2.5 text-sm font-semibold",
                                        "transition-all duration-300",
                                        "hover:ring-primary hover:text-primary",
                                        "focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30",
                                    )}
                                >
                                    <MessageCircle
                                        className="h-4 w-4 text-green-500"
                                        aria-hidden="true"
                                    />
                                    <span>WhatsApp</span>
                                </a>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default PricingComparisonTable;
