"use client";

import { MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

export interface StickyWhatsAppSupportProps {
    /** WhatsApp phone in E.164 format (digits only, no leading '+'). */
    phoneE164?: string;
    /** Pre-filled message that opens in the WhatsApp chat. */
    presetMessage?: string;
    /** Bold top line (desktop). */
    label?: string;
    /** Small hint line (desktop). */
    hint?: string;
    /** Optional wrapper className. */
    className?: string;
}

/**
 * StickyWhatsAppSupport — floating WhatsApp support pill pinned to the
 * bottom-right of the viewport on every page it is mounted on.
 *
 * - Mobile (<640px): compact 48px circular icon-only button.
 * - sm+: full pill with a two-line label (bold title + hint), preceded by a
 *   white MessageCircle chip that carries a small green "online" dot.
 * - Opens https://wa.me/<phoneE164>?text=<url-encoded presetMessage> in a
 *   new tab with rel="noopener".
 * - Entrance fades up after a 1.5s delay so it doesn't distract from the hero;
 *   respects `prefers-reduced-motion`.
 * - The wrapper is only the button's own footprint, so it never blocks clicks
 *   on underlying content — `pointer-events` is left at its default value.
 */
export default function StickyWhatsAppSupport({
    phoneE164 = "212644440525",
    presetMessage = "Bonjour, je souhaite en savoir plus sur LeBonResto.",
    label = "Support en ligne",
    hint = "Réponse WhatsApp — équipe FR",
    className,
}: StickyWhatsAppSupportProps) {
    const prefersReducedMotion = useReducedMotion();

    const href = `https://wa.me/${phoneE164}?text=${encodeURIComponent(presetMessage)}`;

    const initial = prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 };
    const animate = { opacity: 1, y: 0 };
    const transition = prefersReducedMotion
        ? { duration: 0 }
        : { duration: 0.6, delay: 1.5, ease: "easeOut" as const };

    return (
        <div
            className={cn(
                "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50",
                className,
            )}
        >
            <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contacter le support LeBonResto via WhatsApp"
                initial={initial}
                animate={animate}
                transition={transition}
                className={cn(
                    "group inline-flex items-center gap-3 rounded-full",
                    "bg-[#25D366] text-white shadow-premium",
                    // Icon-only on mobile, full pill on sm+
                    "h-12 w-12 justify-center sm:h-auto sm:w-auto sm:justify-start sm:py-2.5 sm:pl-2.5 sm:pr-4",
                    "transition-all duration-300 hover:scale-105 hover:shadow-glow",
                    "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40",
                )}
            >
                {/* Icon chip with live "online" dot */}
                <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#25D366]">
                    <MessageCircle
                        className="h-5 w-5"
                        strokeWidth={2.25}
                        aria-hidden="true"
                    />
                    <span
                        aria-hidden="true"
                        className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-green-300 ring-2 ring-white"
                    />
                </span>

                {/* Text stack — hidden on mobile */}
                <span className="hidden sm:flex sm:flex-col sm:items-start sm:leading-tight">
                    <span className="text-sm font-bold">{label}</span>
                    <span className="text-[11px] font-medium opacity-90">
                        {hint}
                    </span>
                </span>
            </motion.a>
        </div>
    );
}
