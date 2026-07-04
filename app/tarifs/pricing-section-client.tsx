"use client";

import { useState } from "react";
import PricingComparisonTable, {
    type PricingTier,
} from "@/components/landing/PricingComparisonTable";
import PricingToggle from "@/components/landing/PricingToggle";

export interface PricingSectionClientProps {
    tiers: PricingTier[];
}

/**
 * PricingSectionClient — owns the billing state (mensuel / annuel) for the
 * /tarifs page. Renders the PricingToggle above the PricingComparisonTable
 * and forwards the current billing value so the table can update its
 * "Facturation…" note and the WhatsApp CTA query string.
 *
 * The parent page stays a server component; this wrapper is the only
 * client-boundary needed for the pricing block.
 */
export default function PricingSectionClient({ tiers }: PricingSectionClientProps) {
    const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

    return (
        <>
            <div className="flex justify-center">
                <PricingToggle
                    value={billing}
                    onChange={setBilling}
                    savingsLabel="2 mois offerts"
                />
            </div>

            <div className="mt-8 sm:mt-10 lg:mt-12">
                <PricingComparisonTable tiers={tiers} billing={billing} />
            </div>
        </>
    );
}
