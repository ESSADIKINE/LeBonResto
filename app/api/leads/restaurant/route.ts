// TODO: wire to backend NestJS /admin/leads/restaurant once endpoint exists.

import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
    notifyTo,
    renderAckHtml,
    renderInternalNotificationHtml,
    sendBrevoEmail,
} from '@/lib/brevo';

export const runtime = 'nodejs';

const restaurantLeadSchema = z.object({
  restaurant_name: z.string().min(2, 'Nom du restaurant trop court'),
  owner_name: z.string().min(2, 'Nom du gérant trop court'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(6, 'Téléphone invalide'),
  city: z.string().min(2, 'Ville requise'),
  address: z.string().optional(),
  cuisine: z.string().optional(),
  locations: z.enum(['1', '2-5', '6-10', '10+']),
  reservation_method: z.array(z.string()),
  interests: z.array(z.string()),
  message: z.string().max(500, 'Message trop long').optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Consentement requis' }),
  }),
  // Honeypot: must be empty.
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

  const parsed = restaurantLeadSchema.safeParse(body);
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
  console.log('[LeadRestaurant]', sanitized);

  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'lebonresto-marketing',
          type: 'restaurant',
          payload: sanitized,
          receivedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        console.error(
          '[LeadWebhookError] restaurant forward failed',
          res.status,
          res.statusText,
        );
      }
    } catch (err) {
      // Never block the lead on a webhook failure — ops replays from logs.
      console.error('[LeadWebhookError] restaurant forward threw', err);
    }
  }

  const firstName = sanitized.owner_name.split(/\s+/)[0];
  await sendBrevoEmail({
    to: notifyTo(),
    subject: `[Restaurateur] ${sanitized.restaurant_name} — ${sanitized.city}`,
    replyTo: sanitized.email,
    html: renderInternalNotificationHtml({
      title: `Nouvelle demande restaurateur — ${sanitized.restaurant_name}`,
      fields: [
        { label: 'Restaurant', value: sanitized.restaurant_name },
        { label: 'Gérant', value: sanitized.owner_name },
        { label: 'Email', value: sanitized.email },
        { label: 'Téléphone', value: sanitized.phone },
        { label: 'Ville', value: sanitized.city },
        { label: 'Adresse', value: sanitized.address },
        { label: 'Cuisine', value: sanitized.cuisine },
        { label: 'Nb établissements', value: sanitized.locations },
        { label: 'Prise de réservation', value: sanitized.reservation_method.join(', ') },
        { label: 'Intérêts', value: sanitized.interests.join(', ') },
        { label: 'Message', value: sanitized.message },
      ],
    }),
  });
  await sendBrevoEmail({
    to: sanitized.email,
    subject: 'Votre demande Le Bon Resto est bien reçue',
    html: renderAckHtml({
      firstName,
      intro: `Merci pour votre demande pour ${sanitized.restaurant_name}. Notre équipe étudie votre profil et vous recontacte sous 24 à 48 heures ouvrées pour l'appel découverte.`,
      followUp: "En attendant, vous pouvez nous joindre sur WhatsApp au +212 6 44 44 05 25.",
    }),
  });

  return NextResponse.json({ ok: true, leadId: crypto.randomUUID() });
}
