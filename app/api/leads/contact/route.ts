// Local + webhook endpoint. The route logs the sanitized payload for local dev
// observability, then best-effort forwards it to LEADS_WEBHOOK_URL if set.
// A webhook failure NEVER breaks the form response — the lead is still counted
// as received and ops can replay from the [LeadWebhookError] logs.

import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
    notifyTo,
    renderAckHtml,
    renderInternalNotificationHtml,
    sendBrevoEmail,
} from '@/lib/brevo';

export const runtime = 'nodejs';

async function forwardToWebhook(payload: Record<string, unknown>) {
    const webhookUrl = process.env.LEADS_WEBHOOK_URL;
    if (!webhookUrl) return;
    try {
        const res = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                source: 'lebonresto-marketing',
                type: 'contact',
                payload,
                receivedAt: new Date().toISOString(),
            }),
        });
        if (!res.ok) {
            console.error(
                '[LeadWebhookError] contact forward failed',
                res.status,
                res.statusText,
            );
        }
    } catch (err) {
        // Never block the lead on a webhook failure — ops replays from logs.
        console.error('[LeadWebhookError] contact forward threw', err);
    }
}

const subjectEnum = z.enum([
    'Question commerciale',
    'Onboarding restaurateur',
    'Investisseur',
    'Partenariat',
    'Support technique',
    'Presse',
    'Autre',
    'Newsletter',
]);

const contactLeadSchema = z.object({
    full_name: z
        .string()
        .min(2, 'Veuillez saisir votre nom complet.')
        .max(160),
    email: z
        .string()
        .min(1, 'Veuillez saisir votre email.')
        .email('Adresse email invalide.'),
    phone: z.string().optional().or(z.literal('')),
    subject: subjectEnum,
    message: z
        .string()
        .min(1, 'Veuillez écrire un message.')
        .max(1000, 'Message limité à 1000 caractères.'),
    consent: z.literal(true, {
        errorMap: () => ({ message: 'Votre accord est requis pour continuer.' }),
    }),
    // Honeypot — must be empty. Bots tend to fill it.
    website: z.literal(''),
});

// Lightweight schema for the newsletter inline form (email-only).
const newsletterSchema = z.object({
    email: z
        .string()
        .min(1, 'Veuillez saisir votre email.')
        .email('Adresse email invalide.'),
    subject: z.literal('Newsletter'),
    consent: z.literal(true).optional().default(true),
    website: z.literal('').optional().default(''),
});

export async function POST(request: Request) {
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { ok: false, error: 'JSON invalide' },
            { status: 400 },
        );
    }

    // Try the newsletter shape first (smaller, more permissive). If it matches
    // and the subject is "Newsletter", route through the lightweight branch.
    const maybeNewsletter =
        (body as { subject?: unknown })?.subject === 'Newsletter'
            ? newsletterSchema.safeParse(body)
            : null;

    if (maybeNewsletter && maybeNewsletter.success) {
        if (maybeNewsletter.data.website !== '') {
            // Honeypot tripped — return ok to avoid signalling rejection.
            return NextResponse.json({ ok: true, leadId: crypto.randomUUID() });
        }
        const sanitized = {
            email: maybeNewsletter.data.email,
            subject: 'Newsletter' as const,
        };
        console.log('[LeadContact]', sanitized);
        await forwardToWebhook(sanitized);
        await sendBrevoEmail({
            to: notifyTo(),
            subject: '[Newsletter] Nouvelle inscription — Le Bon Resto',
            replyTo: sanitized.email,
            html: renderInternalNotificationHtml({
                title: 'Nouvelle inscription newsletter',
                fields: [
                    { label: 'Email', value: sanitized.email },
                    { label: 'Type', value: 'Newsletter' },
                ],
            }),
        });
        await sendBrevoEmail({
            to: sanitized.email,
            subject: 'Bienvenue à la newsletter Le Bon Resto',
            html: renderAckHtml({
                intro: "Merci pour votre inscription à la newsletter Le Bon Resto. Vous recevrez nos meilleures adresses, ouvertures et rendez-vous gastronomiques du Maroc.",
                followUp: 'Un souci ? Répondez à cet email, nous vous lirons directement.',
            }),
        });
        return NextResponse.json({ ok: true, leadId: crypto.randomUUID() });
    }

    const parsed = contactLeadSchema.safeParse(body);
    if (!parsed.success) {
        const firstIssue = parsed.error.issues[0];
        return NextResponse.json(
            {
                ok: false,
                error: firstIssue?.message ?? 'Validation échouée',
            },
            { status: 400 },
        );
    }

    if (parsed.data.website !== '') {
        // Honeypot tripped — silently accept to avoid signalling bots.
        return NextResponse.json({ ok: true, leadId: crypto.randomUUID() });
    }

    const sanitized = { ...parsed.data };
    delete (sanitized as Partial<typeof sanitized>).website;
    console.log('[LeadContact]', sanitized);
    await forwardToWebhook(sanitized);

    const firstName = sanitized.full_name.split(/\s+/)[0];
    await sendBrevoEmail({
        to: notifyTo(),
        subject: `[Contact] ${sanitized.subject} — ${sanitized.full_name}`,
        replyTo: sanitized.email,
        html: renderInternalNotificationHtml({
            title: `Nouveau message — ${sanitized.subject}`,
            fields: [
                { label: 'Nom', value: sanitized.full_name },
                { label: 'Email', value: sanitized.email },
                { label: 'Téléphone', value: sanitized.phone || undefined },
                { label: 'Sujet', value: sanitized.subject },
                { label: 'Message', value: sanitized.message },
            ],
        }),
    });
    await sendBrevoEmail({
        to: sanitized.email,
        subject: 'Nous avons bien reçu votre message — Le Bon Resto',
        html: renderAckHtml({
            firstName,
            intro: `Merci de nous avoir contactés au sujet de "${sanitized.subject}". Notre équipe revient vers vous sous 24 heures ouvrées.`,
            followUp: 'Pour toute urgence, écrivez-nous sur WhatsApp au +212 6 44 44 05 25.',
        }),
    });

    return NextResponse.json({ ok: true, leadId: crypto.randomUUID() });
}
