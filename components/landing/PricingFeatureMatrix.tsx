import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/cn";

export interface PricingMatrixRow {
    category: string;
    feature: string;
    starter: string;
    premium: string;
    pro: string;
}

export interface PricingFeatureMatrixProps {
    rows: PricingMatrixRow[];
    className?: string;
}

type TierId = "starter" | "premium" | "pro";
const TIERS: { id: TierId; label: string; recommended?: boolean }[] = [
    { id: "starter", label: "Starter" },
    { id: "premium", label: "Premium", recommended: true },
    { id: "pro", label: "Pro" },
];

/**
 * Renders a "✓", "—" or the raw value string depending on cell content.
 * "✓" and "—" get symbolic renders; anything else (e.g. "30 max") is passed through.
 */
function Cell({ value, tierId }: { value: string; tierId: string }) {
    const isCheck = value === "✓";
    const isDash = value === "—";
    const highlighted = tierId === "premium";

    if (isCheck) {
        return (
            <span
                className={cn(
                    "inline-flex h-6 w-6 items-center justify-center rounded-full",
                    highlighted
                        ? "bg-primary text-white"
                        : "bg-primary/10 text-primary",
                )}
                aria-label="Inclus"
            >
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
        );
    }

    if (isDash) {
        return (
            <span
                className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-400"
                aria-label="Non inclus"
            >
                <Minus className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
        );
    }

    return (
        <span
            className={cn(
                "text-xs sm:text-sm font-medium",
                highlighted ? "text-primary" : "text-slate-700",
            )}
        >
            {value}
        </span>
    );
}

export default function PricingFeatureMatrix({
    rows,
    className,
}: PricingFeatureMatrixProps) {
    // Group rows by category preserving order.
    const grouped: { category: string; rows: PricingMatrixRow[] }[] = [];
    for (const row of rows) {
        const last = grouped[grouped.length - 1];
        if (last && last.category === row.category) {
            last.rows.push(row);
        } else {
            grouped.push({ category: row.category, rows: [row] });
        }
    }

    return (
        <div className={cn("w-full", className)}>
            {/* Desktop / tablet: single grid table */}
            <div className="hidden md:block overflow-hidden rounded-3xl bg-white shadow-premium ring-1 ring-slate-100">
                <table className="w-full text-left">
                    <thead className="bg-cream-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 w-2/5"
                            >
                                Fonctionnalité
                            </th>
                            {TIERS.map((t) => (
                                <th
                                    key={t.id}
                                    scope="col"
                                    className={cn(
                                        "px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider",
                                        t.recommended
                                            ? "text-primary"
                                            : "text-slate-600",
                                    )}
                                >
                                    <span className="inline-flex items-center gap-2">
                                        {t.label}
                                        {t.recommended && (
                                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                                                Recommandé
                                            </span>
                                        )}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    {grouped.map((group) => (
                        <tbody key={`cat-${group.category}`}>
                            <tr>
                                <td
                                    colSpan={4}
                                    className="border-t border-b border-slate-100 bg-slate-50/60 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-700"
                                >
                                    {group.category}
                                </td>
                            </tr>
                            {group.rows.map((row, idx) => (
                                <tr
                                    key={`${group.category}-${idx}`}
                                    className="border-t border-slate-100"
                                >
                                    <td className="px-6 py-3 text-sm text-slate-700">
                                        {row.feature}
                                    </td>
                                    {TIERS.map((t) => (
                                        <td
                                            key={`${group.category}-${idx}-${t.id}`}
                                            className={cn(
                                                "px-4 py-3 text-center",
                                                t.recommended && "bg-primary/5",
                                            )}
                                        >
                                            <Cell
                                                value={row[t.id]}
                                                tierId={t.id}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    ))}
                </table>
            </div>

            {/* Mobile: category-first accordion-like stack (no JS — always expanded) */}
            <div className="md:hidden space-y-4">
                {grouped.map((group) => (
                    <div
                        key={`mobile-${group.category}`}
                        className="rounded-2xl bg-white shadow-premium ring-1 ring-slate-100 overflow-hidden"
                    >
                        <div className="bg-cream-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-700">
                            {group.category}
                        </div>
                        <ul className="divide-y divide-slate-100">
                            {group.rows.map((row, idx) => (
                                <li
                                    key={`mobile-${group.category}-${idx}`}
                                    className="px-4 py-3"
                                >
                                    <p className="text-sm text-slate-800 font-medium">
                                        {row.feature}
                                    </p>
                                    <dl className="mt-2 grid grid-cols-3 gap-2">
                                        {TIERS.map((t) => (
                                            <div
                                                key={`mobile-${group.category}-${idx}-${t.id}`}
                                                className={cn(
                                                    "flex flex-col items-start gap-1 rounded-lg p-2",
                                                    t.recommended && "bg-primary/5",
                                                )}
                                            >
                                                <dt
                                                    className={cn(
                                                        "text-[10px] font-semibold uppercase tracking-wider",
                                                        t.recommended
                                                            ? "text-primary"
                                                            : "text-slate-500",
                                                    )}
                                                >
                                                    {t.label}
                                                </dt>
                                                <dd>
                                                    <Cell
                                                        value={row[t.id]}
                                                        tierId={t.id}
                                                    />
                                                </dd>
                                            </div>
                                        ))}
                                    </dl>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
