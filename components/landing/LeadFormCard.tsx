"use client";

import React from "react";
import {
    ShieldCheck,
    Lock,
    Clock,
    Check,
    Sparkles,
    Mail,
    Users,
    FileText,
    Phone,
    type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

export interface TrustPoint {
    icon?: string;
    text: string;
}

export interface LeadFormCardProps {
    title: string;
    subtitle?: string;
    trustPoints?: TrustPoint[];
    reassurance?: string;
    form: React.ReactNode;
    layout?: "sidebar" | "stacked";
    className?: string;
}

const ICON_MAP: Record<string, LucideIcon> = {
    shield: ShieldCheck,
    ShieldCheck,
    lock: Lock,
    clock: Clock,
    check: Check,
    sparkle: Sparkles,
    mail: Mail,
    users: Users,
    FileText,
    Phone,
};

function resolveIcon(name?: string): LucideIcon {
    if (name && ICON_MAP[name]) return ICON_MAP[name];
    return Check;
}

/**
 * LeadFormCard — premium wrapper around a lead-capture form.
 *
 * - `sidebar` layout (desktop): left column holds the title, subtitle,
 *   trust-points list and reassurance copy; right column holds the form
 *   inside a rounded-3xl white card with premium shadow and ring.
 * - `stacked` layout: centered title above a centered form card.
 *
 * Form node is rendered verbatim — this component owns the chrome, not
 * the field markup, so it can wrap any react-hook-form/zod form.
 */
export default function LeadFormCard({
    title,
    subtitle,
    trustPoints,
    reassurance,
    form,
    layout = "sidebar",
    className,
}: LeadFormCardProps) {
    const FormCard = (
        <div className="rounded-3xl bg-white p-4 sm:p-5 md:p-6 lg:p-8 shadow-premium ring-1 ring-slate-100">
            {form}
        </div>
    );

    if (layout === "stacked") {
        return (
            <div className={cn("mx-auto max-w-2xl", className)}>
                <div className="text-center">
                    <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 text-balance leading-[1.1]">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600 text-pretty max-w-prose mx-auto">
                            {subtitle}
                        </p>
                    )}
                </div>

                <div className="mt-6 sm:mt-8 lg:mt-10">{FormCard}</div>

                {(trustPoints?.length || reassurance) && (
                    <div className="mt-8 text-center">
                        {trustPoints && trustPoints.length > 0 && (
                            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                                {trustPoints.map((tp, i) => {
                                    const Icon = resolveIcon(tp.icon);
                                    return (
                                        <li
                                            key={i}
                                            className="inline-flex items-center gap-2 text-sm text-slate-600"
                                        >
                                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 text-primary-800">
                                                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                                            </span>
                                            <span>{tp.text}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                        {reassurance && (
                            <p className="mt-4 text-xs text-slate-500">
                                {reassurance}
                            </p>
                        )}
                    </div>
                )}
            </div>
        );
    }

    // Sidebar layout (default)
    return (
        <div
            className={cn(
                "grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8",
                className,
            )}
        >
            <div className="col-span-12 lg:col-span-5 lg:pr-2">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 text-balance leading-[1.1]">
                    {title}
                </h2>
                {subtitle && (
                    <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600 text-pretty max-w-prose">
                        {subtitle}
                    </p>
                )}

                {trustPoints && trustPoints.length > 0 && (
                    <ul className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                        {trustPoints.map((tp, i) => {
                            const Icon = resolveIcon(tp.icon);
                            return (
                                <li
                                    key={i}
                                    className="flex items-start gap-3 text-slate-700"
                                >
                                    <span className="mt-0.5 inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary-100 text-primary-800 ring-1 ring-primary/15">
                                        <Icon className="h-4 w-4" aria-hidden="true" />
                                    </span>
                                    <span className="text-sm sm:text-base leading-relaxed">
                                        {tp.text}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                )}

                {reassurance && (
                    <p className="mt-6 sm:mt-8 text-xs leading-relaxed text-slate-500">
                        {reassurance}
                    </p>
                )}
            </div>

            <div className="col-span-12 lg:col-span-7">{FormCard}</div>
        </div>
    );
}
