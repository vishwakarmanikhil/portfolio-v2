'use server';

import crypto from 'node:crypto';
import { headers } from 'next/headers';
import { getPrisma } from '@/lib/prisma';
import { enquirySchema, sendEnquiryAlert } from '@/lib/enquiries';

const MAX_PER_WINDOW = 3;
const WINDOW_MINUTES = 10;
const MIN_FILL_SECONDS = 3;

function hashIp(ip) {
    const salt = process.env.ADMIN_SESSION_SECRET || 'enquiry-salt';
    return crypto.createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 32);
}

/**
 * Handles the public enquiry form (used with React's useActionState).
 * Returns { ok: true } on success, or { ok: false, errors, message, values } to show in the form.
 */
export async function submitEnquiry(_previousState, formData) {
    const values = Object.fromEntries(
        ['name', 'email', 'phone', 'company', 'projectType', 'budget', 'message', 'sourcePage']
            .map(key => [key, String(formData.get(key) ?? '')]),
    );

    // Spam traps: a hidden field real people leave empty, and a minimum time to fill the form.
    // Bots get a normal-looking success so they don't adapt.
    const honeypot = String(formData.get('website') ?? '');
    const startedAt = Number(formData.get('startedAt') ?? 0);
    if (honeypot || (startedAt && Date.now() - startedAt < MIN_FILL_SECONDS * 1000)) {
        return { ok: true };
    }

    const parsed = enquirySchema.safeParse(values);
    if (!parsed.success) {
        const errors = {};
        for (const issue of parsed.error.issues) errors[issue.path[0]] ??= issue.message;
        return { ok: false, errors, message: 'Please check the highlighted fields.', values };
    }

    const requestHeaders = await headers();
    const ip = (requestHeaders.get('x-forwarded-for') ?? '').split(',')[0].trim() || requestHeaders.get('x-real-ip') || 'unknown';
    const ipHash = hashIp(ip);
    const userAgent = (requestHeaders.get('user-agent') ?? '').slice(0, 300);

    try {
        const prisma = getPrisma();
        const recent = await prisma.enquiry.count({
            where: { ipHash, createdAt: { gte: new Date(Date.now() - WINDOW_MINUTES * 60 * 1000) } },
        });
        if (recent >= MAX_PER_WINDOW) {
            return { ok: false, message: 'You have sent several enquiries in the last few minutes. Please wait a little, or email me directly.', values };
        }

        const enquiry = await prisma.enquiry.create({
            data: { ...parsed.data, ipHash, userAgent },
        });
        await sendEnquiryAlert(enquiry);
        return { ok: true };
    } catch (error) {
        console.error('Saving enquiry failed', error);
        return { ok: false, message: 'Sorry, something went wrong on my side. Please email me at vnikhil3101@gmail.com.', values };
    }
}
