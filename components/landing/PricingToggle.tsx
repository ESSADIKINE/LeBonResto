"use client";

import { cn } from "@/lib/cn";

export interface PricingToggleProps {
    value: "monthly" | "annual";
    onChange: (v: "monthly" | "annual") => void;
    /** Optional chip displayed next to the "Annuel" label — e.g. "2 mois offerts". */
    savingsLabel?: string;
    className?: string;
}

/**
 * PricingToggle — mensuel / annuel segmented control.
 *
 * - Layout : inline-flex rounded-full bg-slate-100 p-1 wrapping two buttons.
 * - Active button: bg-white shadow-premium text-slate-900.
 * - Inactive button: text-slate-600 hover:text-slate-900.
 * - Optional savingsLabel chip is rendered next to the "Annuel" label:
 *   rounded-full bg-primary text-white text-xs px-2 py-0.5.
 *
 * Controlled component — parent owns state.
 * Accessible: role="group" wrapper + aria-pressed on each button.
 */
export default function PricingToggle({
    value,
    onChange,
    savingsLabel,
    className,
}: PricingToggleProps) {
    const isMonthly = value === "monthly";
    const isAnnual = value === "annual";

    return (
        <div
            role="group"
            aria-label="Choix de la fréquence de facturation"
            className={cn(
                "inline-flex items-center rounded-full bg-slate-100 p-1",
                className,
            )}
        >
            <button
                type="button"
                onClick={() => onChange("monthly")}
                aria-pressed={isMonthly}
                className={cn(
                    "inline-flex items-center justify-center rounded-full px-4 sm:px-5 py-2 text-sm font-semibold",
                    "transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30",
                    isMonthly
                        ? "bg-white shadow-premium text-slate-900"
                        : "text-slate-600 hover:text-slate-900",
                )}
            >
                Mensuel
            </button>

            <button
                type="button"
                onClick={() => onChange("annual")}
                aria-pressed={isAnnual}
                className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-full px-4 sm:px-5 py-2 text-sm font-semibold",
                    "transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30",
                    isAnnual
                        ? "bg-white shadow-premium text-slate-900"
                        : "text-slate-600 hover:text-slate-900",
                )}
            >
                <span>Annuel</span>
                {savingsLabel && (
                    <span className="inline-flex items-center rounded-full bg-primary text-white text-xs font-semibold px-2 py-0.5">
                        {savingsLabel}
                    </span>
                )}
            </button>
        </div>
    );
}
