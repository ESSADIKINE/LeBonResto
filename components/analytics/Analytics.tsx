'use client';

import { useEffect } from 'react';

/**
 * Analytics — Microsoft Clarity + Plausible.
 *
 * Consent-gated: injects the tracking snippets only if the visitor has
 * accepted the cookie banner (localStorage `lbr_consent_v1` === "accepted").
 * Listens for the `lbr-consent-changed` custom event so the state can be
 * updated live from a preference centre.
 *
 * Env:
 *   - NEXT_PUBLIC_CLARITY_ID
 *   - NEXT_PUBLIC_PLAUSIBLE_DOMAIN
 *
 * Also exposes a small helper:
 *   window.lbrTrack('EventName', { key: 'value' })
 * which forwards to Plausible when it is loaded and consented, and no-ops
 * silently otherwise so callers can fire events without guard.
 */

const CONSENT_KEY = 'lbr_consent_v1';
const CONSENT_EVENT = 'lbr-consent-changed';

const CLARITY_SCRIPT_ID = 'lbr-clarity-script';
const PLAUSIBLE_SCRIPT_ID = 'lbr-plausible-script';

function hasConsent(): boolean {
    if (typeof window === 'undefined') return false;
    try {
        return window.localStorage.getItem(CONSENT_KEY) === 'accepted';
    } catch {
        return false;
    }
}

function installLbrTrack() {
    if (typeof window === 'undefined') return;
    // Idempotent — install only once
    if (typeof window.lbrTrack === 'function') return;
    window.lbrTrack = (event: string, props?: Record<string, unknown>) => {
        try {
            if (typeof window.plausible === 'function') {
                window.plausible(event, props ? { props } : undefined);
            }
        } catch {
            /* swallow — analytics must never break a form flow */
        }
    };
}

function injectClarity(id: string) {
    if (typeof document === 'undefined') return;
    if (document.getElementById(CLARITY_SCRIPT_ID)) return;
    const script = document.createElement('script');
    script.id = CLARITY_SCRIPT_ID;
    script.type = 'text/javascript';
    script.async = true;
    // Standard Microsoft Clarity snippet, expanded to inject an async script
    // tag with the given project ID.
    script.text = `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", ${JSON.stringify(id)});`;
    document.head.appendChild(script);
}

function injectPlausible(domain: string) {
    if (typeof document === 'undefined') return;
    if (document.getElementById(PLAUSIBLE_SCRIPT_ID)) return;
    const script = document.createElement('script');
    script.id = PLAUSIBLE_SCRIPT_ID;
    script.defer = true;
    script.setAttribute('data-domain', domain);
    script.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(script);

    // Bootstrap the Plausible queue so events fired before the script has
    // finished loading are not lost.
    // https://plausible.io/docs/custom-event-goals
    const bootstrap = document.createElement('script');
    bootstrap.id = `${PLAUSIBLE_SCRIPT_ID}-bootstrap`;
    bootstrap.text =
        'window.plausible = window.plausible || function(){(window.plausible.q = window.plausible.q || []).push(arguments)};';
    document.head.appendChild(bootstrap);
}

function removeAnalytics() {
    if (typeof document === 'undefined') return;
    [
        CLARITY_SCRIPT_ID,
        PLAUSIBLE_SCRIPT_ID,
        `${PLAUSIBLE_SCRIPT_ID}-bootstrap`,
    ].forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.parentNode) el.parentNode.removeChild(el);
    });
    if (typeof window !== 'undefined') {
        // Neutralise any already-loaded globals so late-fired events go
        // nowhere until the user re-consents.
        try {
            window.clarity = () => {};
            window.plausible = () => {};
        } catch {
            /* readonly getter — ignore */
        }
    }
}

function activate() {
    const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
    const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
    if (clarityId) injectClarity(clarityId);
    if (plausibleDomain) injectPlausible(plausibleDomain);
}

export default function Analytics() {
    useEffect(() => {
        installLbrTrack();

        if (hasConsent()) {
            activate();
        }

        const onConsentChanged = () => {
            if (hasConsent()) {
                activate();
            } else {
                removeAnalytics();
            }
        };

        // Cross-tab sync — consent changes in another tab.
        const onStorage = (ev: StorageEvent) => {
            if (ev.key === CONSENT_KEY) onConsentChanged();
        };

        window.addEventListener(CONSENT_EVENT, onConsentChanged);
        window.addEventListener('storage', onStorage);
        return () => {
            window.removeEventListener(CONSENT_EVENT, onConsentChanged);
            window.removeEventListener('storage', onStorage);
        };
    }, []);

    return null;
}
