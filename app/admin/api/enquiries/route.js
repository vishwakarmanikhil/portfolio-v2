import { getPrisma } from '@/lib/prisma';
import { buildEnquiryWhere } from '@/lib/enquiries';
import { readAdminFilters, json } from '@/lib/adminApi';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 50;

/**
 * POST /admin/api/enquiries
 * Body: { q, status, from, to, page } (dates are YYYY-MM-DD in IST; empty = no limit)
 * Returns: { enquiries, total, page, pages, counts: { NEW: n, ... } }
 * Counts cover the same search and date range, across all statuses.
 */
export async function POST(request) {
    const { filters, error } = await readAdminFilters(request);
    if (error) return error;

    const prisma = getPrisma();
    const where = buildEnquiryWhere(filters);
    const [enquiries, total, grouped] = await Promise.all([
        prisma.enquiry.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip: (filters.page - 1) * PAGE_SIZE,
            take: PAGE_SIZE,
            select: { id: true, name: true, phone: true, email: true, topic: true, message: true, status: true, createdAt: true },
        }),
        prisma.enquiry.count({ where }),
        prisma.enquiry.groupBy({
            by: ['status'],
            where: buildEnquiryWhere(filters, { withStatus: false }),
            _count: { _all: true },
        }),
    ]);

    return json({
        enquiries,
        total,
        page: filters.page,
        pages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
        counts: Object.fromEntries(grouped.map(g => [g.status, g._count._all])),
    });
}
