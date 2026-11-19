import { isAdmin } from './adminAuth';
import { adminFilterSchema } from './enquiries';

const json = (body, status = 200) =>
    Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

/**
 * Shared checks for the admin POST APIs: same-origin request, logged-in admin,
 * and a valid JSON body of filters. Returns { filters } or { error: Response }.
 */
export async function readAdminFilters(request) {
    const origin = request.headers.get('origin');
    if (origin && new URL(origin).host !== new URL(request.url).host) {
        return { error: json({ error: 'Cross-site request blocked.' }, 403) };
    }
    if (!(await isAdmin())) {
        return { error: json({ error: 'Your session has ended. Please log in again.' }, 401) };
    }
    let body = {};
    try {
        body = await request.json();
    } catch {
        return { error: json({ error: 'Invalid request body.' }, 400) };
    }
    const parsed = adminFilterSchema.safeParse(body);
    if (!parsed.success) {
        return { error: json({ error: 'Invalid filters.' }, 400) };
    }
    return { filters: parsed.data };
}

export { json };
