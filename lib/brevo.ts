const BREVO_ENDPOINT = 'https://api.brevo.com/v3/smtp/email';

const DEFAULT_SENDER_EMAIL = 'le.bon.restau@gmail.com';
const DEFAULT_SENDER_NAME = 'Le Bon Resto';
const DEFAULT_NOTIFY_TO = 'anass.essadikine2@gmail.com';

type SendArgs = {
    to: string;
    subject: string;
    html: string;
    text?: string;
    replyTo?: string;
    senderName?: string;
};

export type BrevoResult = { ok: true } | { ok: false; error: string };

export async function sendBrevoEmail({
    to,
    subject,
    html,
    text,
    replyTo,
    senderName,
}: SendArgs): Promise<BrevoResult> {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
        console.warn('[Brevo] BREVO_API_KEY not set — email not sent', { to, subject });
        return { ok: false, error: 'BREVO_API_KEY not configured' };
    }

    const senderEmail = process.env.BREVO_SENDER_EMAIL || DEFAULT_SENDER_EMAIL;
    const defaultName = process.env.BREVO_SENDER_NAME || DEFAULT_SENDER_NAME;

    try {
        const res = await fetch(BREVO_ENDPOINT, {
            method: 'POST',
            headers: {
                'api-key': apiKey,
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': 'lebonresto-marketing/1.0',
            },
            body: JSON.stringify({
                sender: { email: senderEmail, name: senderName || defaultName },
                to: [{ email: to }],
                subject,
                htmlContent: html,
                textContent: text,
                replyTo: replyTo ? { email: replyTo } : undefined,
            }),
        });

        if (!res.ok) {
            const errorBody = await res.text();
            console.error(`[Brevo] API error (${res.status})`, errorBody);
            return { ok: false, error: `Brevo ${res.status}: ${errorBody}` };
        }

        return { ok: true };
    } catch (err) {
        console.error('[Brevo] fetch threw', err);
        return { ok: false, error: err instanceof Error ? err.message : 'unknown' };
    }
}

export function notifyTo(): string {
    return process.env.LEADS_EMAIL_TO || DEFAULT_NOTIFY_TO;
}

export function escapeHtml(input: string): string {
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

export function renderInternalNotificationHtml(params: {
    title: string;
    fields: Array<{ label: string; value: string | undefined | null }>;
}): string {
    const rows = params.fields
        .filter((f) => f.value !== undefined && f.value !== null && String(f.value).trim() !== '')
        .map(
            (f) => `
                <tr>
                    <td style="padding:8px 12px;border-bottom:1px solid #eef2f0;color:#016B61;font-weight:600;vertical-align:top;white-space:nowrap;">${escapeHtml(f.label)}</td>
                    <td style="padding:8px 12px;border-bottom:1px solid #eef2f0;color:#0f172a;">${escapeHtml(String(f.value))}</td>
                </tr>`,
        )
        .join('');

    return `<!doctype html>
<html><body style="margin:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:620px;margin:24px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 12px rgba(15,23,42,0.06);">
    <div style="background:#016B61;padding:20px 28px;color:#ffffff;">
      <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.85;">Le Bon Resto — Marketing</div>
      <div style="font-size:20px;font-weight:700;margin-top:4px;">${escapeHtml(params.title)}</div>
    </div>
    <div style="padding:16px 8px;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">${rows}</table>
    </div>
    <div style="padding:14px 28px;color:#64748b;font-size:12px;background:#f8fafc;border-top:1px solid #eef2f0;">
      Reçu le ${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' })} — répondez directement à cet email pour contacter la personne.
    </div>
  </div>
</body></html>`;
}

export function renderAckHtml(params: {
    firstName?: string;
    intro: string;
    followUp?: string;
}): string {
    const greeting = params.firstName
        ? `Bonjour ${escapeHtml(params.firstName)},`
        : 'Bonjour,';
    return `<!doctype html>
<html><body style="margin:0;background:#faf7f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:620px;margin:24px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 12px rgba(15,23,42,0.06);">
    <div style="background:linear-gradient(135deg,#016B61 0%,#024a44 100%);padding:28px 32px;color:#ffffff;">
      <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.85;">Le Bon Resto</div>
      <div style="font-size:22px;font-weight:700;margin-top:6px;">Message bien reçu</div>
    </div>
    <div style="padding:28px 32px;color:#0f172a;line-height:1.6;font-size:15px;">
      <p style="margin:0 0 12px;">${greeting}</p>
      <p style="margin:0 0 12px;">${escapeHtml(params.intro)}</p>
      ${params.followUp ? `<p style="margin:0 0 12px;">${escapeHtml(params.followUp)}</p>` : ''}
      <p style="margin:20px 0 8px;">À très vite,<br/><strong>L'équipe Le Bon Resto</strong></p>
    </div>
    <div style="padding:16px 32px;background:#faf7f2;color:#64748b;font-size:12px;border-top:1px solid #eef2f0;">
      Un souci ? Écrivez-nous à <a href="mailto:le.bon.restau@gmail.com" style="color:#016B61;">le.bon.restau@gmail.com</a> ou WhatsApp <a href="https://wa.me/212644440525" style="color:#016B61;">+212 6 44 44 05 25</a>.
    </div>
  </div>
</body></html>`;
}
