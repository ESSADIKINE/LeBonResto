// TODO: wire to backend NestJS /admin/leads/investor once endpoint exists.

import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
    notifyTo,
    renderAckHtml,
    renderInternalNotificationHtml,
    sendBrevoEmail,
} from '@/lib/brevo';

export const runtime = 'nodejs';

const investorLeadSchema = z.object({
  full_name: z.string().min(2, 'Nom complet trop court'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  company: z.string().optional(),
  investor_type: z.enum(['angel', 'vc', 'strategic', 'family-office', 'other']),
  ticket_size: z.string().optional(),
  location: z.string().optional(),
  message: z.string().max(500, 'Message trop long').optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Consentement requis' }),
  }),
  // Honeypot: must be empty. Bots tend to fill it.
  website: z.literal(''),
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

  const parsed = investorLeadSchema.safeParse(body);
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

  // Strip the honeypot before logging / forwarding.
  const sanitized = { ...parsed.data };
  delete (sanitized as Partial<typeof sanitized>).website;
  console.log('[LeadInvestor]', sanitized);

  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'lebonresto-marketing',
          type: 'investor',
          payload: sanitized,
          receivedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        console.error(
          '[LeadWebhookError] investor forward failed',
          res.status,
          res.statusText,
        );
      }
    } catch (err) {
      // Never block the lead on a webhook failure — ops replays from logs.
      console.error('[LeadWebhookError] investor forward threw', err);
    }
  }

  const firstName = sanitized.full_name.split(/\s+/)[0];
  await sendBrevoEmail({
    to: notifyTo(),
    subject: `[Investisseur] ${sanitized.investor_type} — ${sanitized.full_name}`,
    replyTo: sanitized.email,
    html: renderInternalNotificationHtml({
      title: `Nouvelle demande investisseur — ${sanitized.full_name}`,
      fields: [
        { label: 'Nom', value: sanitized.full_name },
        { label: 'Email', value: sanitized.email },
        { label: 'Téléphone', value: sanitized.phone },
        { label: 'Structure', value: sanitized.company },
        { label: 'Type', value: sanitized.investor_type },
        { label: 'Ticket', value: sanitized.ticket_size },
        { label: 'Localisation', value: sanitized.location },
        { label: 'Message', value: sanitized.message },
      ],
    }),
  });
  await sendBrevoEmail({
    to: sanitized.email,
    subject: 'Votre demande investisseur est bien reçue — Le Bon Resto',
    html: renderAckHtml({
      firstName,
      intro: "Merci de votre intérêt pour Le Bon Resto. Le fondateur revient vers vous personnellement dans les 24 heures pour organiser un premier échange.",
      followUp: 'Dossier détaillé et data-room disponibles sur demande, après l\'appel de qualification.',
    }),
  });

  return NextResponse.json({ ok: true, leadId: crypto.randomUUID() });
}
