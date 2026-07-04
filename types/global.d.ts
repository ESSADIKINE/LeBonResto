/**
 * Global type declarations shared across the marketing site.
 *
 * These augment the `Window` interface with the small analytics surface we
 * inject in `components/analytics/Analytics.tsx` — a Plausible-compatible
 * queue callable, Microsoft Clarity's queue callable, and our own
 * `window.lbrTrack` convenience helper.
 */

export {};

declare global {
    interface PlausibleOptions {
        props?: Record<string, unknown>;
        callback?: () => void;
        // Plausible also accepts `u` (URL override) and `revenue` — kept
        // loose here to avoid over-constraining call sites.
        [key: string]: unknown;
    }

    interface Window {
        /**
         * Fires a conversion event through Plausible (when consented + loaded).
         * No-op when analytics are disabled — safe to call unconditionally.
         */
        lbrTrack?: (event: string, props?: Record<string, unknown>) => void;

        /** Plausible queue / callable installed by the tracker snippet. */
        plausible?: {
            (event: string, options?: PlausibleOptions): void;
            q?: unknown[];
        };

        /** Microsoft Clarity queue / callable installed by its snippet. */
        clarity?: {
            (...args: unknown[]): void;
            q?: unknown[];
        };
    }
}
