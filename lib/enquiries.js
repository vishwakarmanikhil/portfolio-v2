import { z } from 'zod';

import { STATUSES, whatsappNumber } from './enquiryOptions';

export { STATUSES, statusLabel, whatsappNumber } from './enquiryOptions';

const optional = max => z.string().trim().max(max).optional().transform(v => (v ? v : undefined));

// Name and mobile are required; email and message are optional.
export const enquirySchema = z.object({
    name: z.string().trim().min(2, 'Please enter your name.').max(120),
    phone: z.string().trim()
        .max(30)
        .refine(v => /^\+?[\d\s()-]+$/.test(v) && v.replace(/\D/g, '').length >= 10 && v.replace(/\D/g, '').length <= 15,
            'Please enter a valid mobile number.'),
    email: optional(200).refine(v => !v || z.string().email().safeParse(v).success, 'Please enter a valid email address.'),
    message: optional(5000),
    topic: optional(80),
    sourcePage: optional(300),
});

/** Builds the Prisma `where` clause from the admin panel's filter values. */
export function buildEnquiryWhere({ status, q, from, to } = {}) {
    const where = {};
    if (status && STATUSES.some(s => s.value === status)) where.status = status;
    else where.status = { not: 'SPAM' };
    if (q) {
        where.OR = ['name', 'phone', 'email', 'message', 'topic'].map(field => ({
            [field]: { contains: q, mode: 'insensitive' },
        }));
    }
    const created = {};
    if (from && /^\d{4}-\d{2}-\d{2}$/.test(from)) created.gte = new Date(`${from}T00:00:00+05:30`);
    if (to && /^\d{4}-\d{2}-\d{2}$/.test(to)) created.lte = new Date(`${to}T23:59:59.999+05:30`);
    if (created.gte || created.lte) where.createdAt = created;
    return where;
}

export function formatDateTime(date) {
    return new Date(date).toLocaleString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata',
    });
}

const escapeHtml = s => String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Emails a new-enquiry alert through Resend. Never throws: a failed email must not lose the enquiry. */
export async function sendEnquiryAlert(enquiry) {
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.ENQUIRY_NOTIFY_EMAIL;
    if (!apiKey || !to) return { sent: false, reason: 'not configured' };

    const rows = [
        ['Name', enquiry.name],
        ['Mobile', enquiry.phone],
        ['Email', enquiry.email],
        ['About', enquiry.topic],
        ['Page', enquiry.sourcePage],
    ].filter(([, v]) => v);

    const siteUrl = 'https://www.nikhilvishwakarma.com';
    const html = `
        <h2 style="font-family:Arial,sans-serif">New enquiry from ${escapeHtml(enquiry.name)}</h2>
        <table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
            ${rows.map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td style="padding:4px 0"><strong>${escapeHtml(v)}</strong></td></tr>`).join('')}
        </table>
        ${enquiry.message ? `<p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap;border-left:3px solid #1BA5E9;padding-left:12px">${escapeHtml(enquiry.message)}</p>` : ''}
        <p style="font-family:Arial,sans-serif;font-size:14px"><a href="${siteUrl}/admin/enquiries/${enquiry.id}">Open in admin panel</a> · <a href="https://wa.me/${whatsappNumber(enquiry.phone)}">WhatsApp ${escapeHtml(enquiry.name)}</a>${enquiry.email ? ` · Reply to this email to answer by email.` : ''}</p>`;

    try {
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                from: process.env.RESEND_FROM || 'Portfolio Enquiries <onboarding@resend.dev>',
                to: [to],
                ...(enquiry.email && { reply_to: enquiry.email }),
                subject: `New enquiry from ${enquiry.name}${enquiry.topic ? ` – ${enquiry.topic}` : ''}`,
                html,
            }),
        });
        if (!res.ok) {
            console.error('Resend error', res.status, await res.text());
            return { sent: false, reason: `Resend ${res.status}` };
        }
        return { sent: true };
    } catch (error) {
        console.error('Resend request failed', error);
        return { sent: false, reason: 'request failed' };
    }
}
