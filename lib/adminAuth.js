import crypto from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Single-password admin login.
// ADMIN_PASSWORD is the password; ADMIN_SESSION_SECRET signs the session cookie.
// A session is "<expiry-ms>.<hmac>", stored in an httpOnly cookie for /admin only.

export const SESSION_COOKIE = 'admin_session';
const SESSION_DAYS = 7;

function secret() {
    const value = process.env.ADMIN_SESSION_SECRET;
    if (!value || value.length < 32) throw new Error('ADMIN_SESSION_SECRET must be set (at least 32 characters)');
    return value;
}

const sign = payload => crypto.createHmac('sha256', secret()).update(payload).digest('hex');

function safeEqual(a, b) {
    const ha = crypto.createHash('sha256').update(String(a)).digest();
    const hb = crypto.createHash('sha256').update(String(b)).digest();
    return crypto.timingSafeEqual(ha, hb);
}

export function isPasswordCorrect(password) {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected) return false;
    return safeEqual(password, expected);
}

export function createSessionToken() {
    const expires = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
    return { token: `${expires}.${sign(String(expires))}`, expires: new Date(expires) };
}

function isValidToken(token) {
    if (!token) return false;
    const [expires, signature] = token.split('.');
    if (!expires || !signature || Number(expires) < Date.now()) return false;
    return safeEqual(signature, sign(expires));
}

export async function isAdmin() {
    const store = await cookies();
    return isValidToken(store.get(SESSION_COOKIE)?.value);
}

/** Call at the top of every admin page, route and action. */
export async function requireAdmin() {
    if (!(await isAdmin())) redirect('/admin/login');
}
