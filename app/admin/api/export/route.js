import { getPrisma } from '@/lib/prisma';
import { buildEnquiryWhere, statusLabel } from '@/lib/enquiries';
import { readAdminFilters } from '@/lib/adminApi';

export const dynamic = 'force-dynamic';

const COLUMNS = [
    ['Received (IST)', e => new Date(e.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })],
    ['Name', e => e.name],
    ['Mobile', e => e.phone],
    ['Email', e => e.email],
    ['About', e => e.topic],
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

/**
 * POST /admin/api/export
 * Body: the same filters as /admin/api/enquiries. Returns every matching enquiry as CSV (opens in Excel).
 */
export async function POST(request) {
    const { filters, error } = await readAdminFilters(request);
    if (error) return error;

    const enquiries = await getPrisma().enquiry.findMany({
        where: buildEnquiryWhere(filters),
        orderBy: { createdAt: 'desc' },
    });

    const lines = [
        COLUMNS.map(([header]) => cell(header)).join(','),
        ...enquiries.map(e => COLUMNS.map(([, get]) => cell(get(e))).join(',')),
    ];
    // UTF-8 BOM so Excel shows ₹ and other characters correctly.
    const csv = `﻿${lines.join('\r\n')}`;
    const range = filters.from || filters.to ? `${filters.from || 'start'}-to-${filters.to || 'today'}` : 'all-time';

    return new Response(csv, {
        headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': `attachment; filename="enquiries-${range}.csv"`,
            'Cache-Control': 'no-store',
        },
    });
}
