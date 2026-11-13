import { getPrisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/adminAuth';
import { buildEnquiryWhere, statusLabel } from '@/lib/enquiries';

export const dynamic = 'force-dynamic';

const COLUMNS = [
    ['Received (IST)', e => new Date(e.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })],
    ['Name', e => e.name],
    ['Email', e => e.email],
    ['Phone', e => e.phone],
    ['Company', e => e.company],
    ['Looking for', e => e.projectType],
    ['Budget', e => e.budget],
    ['Status', e => statusLabel(e.status)],
    ['Message', e => e.message],
    ['Notes', e => e.notes],
    ['Page', e => e.sourcePage],
];

// Quote every cell; prefix formula-like values so Excel doesn't run them.
function cell(value) {
    let text = value == null ? '' : String(value);
    if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
    return `"${text.replace(/"/g, '""')}"`;
}

export async function GET(request) {
    if (!(await isAdmin())) return new Response('Not authorised', { status: 401 });

    const params = Object.fromEntries(new URL(request.url).searchParams);
    const enquiries = await getPrisma().enquiry.findMany({
        where: buildEnquiryWhere(params),
        orderBy: { createdAt: 'desc' },
    });

    const lines = [
        COLUMNS.map(([header]) => cell(header)).join(','),
        ...enquiries.map(e => COLUMNS.map(([, get]) => cell(get(e))).join(',')),
    ];
    // UTF-8 BOM so Excel shows ₹ and other characters correctly.
    const csv = `﻿${lines.join('\r\n')}`;
    const date = new Date().toISOString().slice(0, 10);

    return new Response(csv, {
        headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': `attachment; filename="enquiries-${date}.csv"`,
            'Cache-Control': 'no-store',
        },
    });
}
