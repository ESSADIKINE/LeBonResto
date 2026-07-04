"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Cookie } from "lucide-react";
import { cn } from "@/lib/cn";
import PremiumCTA from "@/components/landing/PremiumCTA";

const STORAGE_KEY = "lbr_consent_v1";
export const LBR_CONSENT_EVENT = "lbr-consent-changed";

type ConsentValue = "accepted" | "refused";

function isConsentValue(v: unknown): v is ConsentValue {
    return v === "accepted" || v === "refused";
}

/**
 * CookieConsent — GDPR/RGPD analytics-only cookie banner.
 *
 * Behavior:
 * - On mount, reads localStorage[`lbr_consent_v1`]. If it already holds
 *   `"accepted"` or `"refused"`, the banner stays hidden. Otherwise it slides
 *   up from the bottom.
 * - On accept/refuse, persists the choice to localStorage AND dispatches a
 *   `lbr-consent-changed` CustomEvent whose `detail` is the same string, so
 *   the Analytics wrapper (Microsoft Clarity, Plausible) can attach/detach
 *   its scripts without a page reload.
 * - z-40, so it sits **below** the sticky WhatsApp support button (z-50).
 * - Slides up via framer-motion; respects `prefers-reduced-motion`.
 */
export default function CookieConsent() {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    // On mount, decide whether to show the banner. We defer to a mounted flag
    // to avoid SSR/CSR hydration mismatch — the banner is client-only.
    useEffect(() => {
        setMounted(true);
        try {
            const stored = window.localStorage.getItem(STORAGE_KEY);
            if (!isConsentValue(stored)) {
                setVisible(true);
            }
        } catch {
            // localStorage unavailable (private mode / SSR guardrail) — still
            // show the banner so the user can make a choice; we just won't
            // persist it.
            setVisible(true);
        }
    }, []);

    const persist = useCallback((value: ConsentValue) => {
        try {
            window.localStorage.setItem(STORAGE_KEY, value);
        } catch {
            // ignore — persistence is best-effort.
        }
        try {
            window.dispatchEvent(
                new CustomEvent<ConsentValue>(LBR_CONSENT_EVENT, {
                    detail: value,
                }),
            );
        } catch {
            // ignore — event dispatch is best-effort.
        }
        setVisible(false);
    }, []);

    if (!mounted) return null;

    const initial = prefersReducedMotion
        ? { opacity: 1, y: 0 }
        : { opacity: 0, y: 24 };
    const exit = prefersReducedMotion
        ? { opacity: 0 }
        : { opacity: 0, y: 24 };
    const transition = prefersReducedMotion
        ? { duration: 0 }
        : { duration: 0.4, ease: "easeOut" as const };

    return (
        <AnimatePresence>
            {visible ? (
                <motion.div
                    key="cookie-consent"
                    role="dialog"
                    aria-label="Consentement aux cookies"
                    aria-live="polite"
                    initial={initial}
                    animate={{ opacity: 1, y: 0 }}
                    exit={exit}
                    transition={transition}
                    className={cn(
                        "fixed inset-x-4 bottom-4 z-40",
                        "sm:bottom-6 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:inset-x-auto sm:w-[calc(100%-3rem)] sm:max-w-3xl",
                        "rounded-2xl bg-white shadow-glow ring-1 ring-slate-200 p-5 md:p-6",
                    )}
                >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
                        <div className="flex items-start gap-3 md:flex-1">
                            <span
                                aria-hidden="true"
                                className="mt-0.5 hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream-100 text-primary sm:inline-flex"
                            >
                                <Cookie className="h-5 w-5" />
                            </span>
                            <p className="text-sm leading-relaxed text-slate-600">
                                Nous utilisons des cookies analytiques
                                (Microsoft Clarity, Plausible) pour améliorer
                                LeBonResto. Aucun cookie publicitaire. En
                                savoir plus dans notre{" "}
                                <Link
                                    href="/confidentialite"
                                    className="font-semibold text-primary underline underline-offset-2 hover:text-primary-700"
                                >
                                    Politique de confidentialité
                                </Link>
                                .
                            </p>
                        </div>
                        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:gap-3 md:shrink-0">
                            <PremiumCTA
                                variant="secondary"
                                size="sm"
                                icon="none"
                                onClick={() => persist("refused")}
                                aria-label="Refuser les cookies analytiques"
                            >
                                Refuser
                            </PremiumCTA>
                            <PremiumCTA
                                variant="primary"
                                size="sm"
                                icon="none"
                                onClick={() => persist("accepted")}
                                aria-label="Accepter les cookies analytiques"
                            >
                                Accepter
                            </PremiumCTA>
                        </div>
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
