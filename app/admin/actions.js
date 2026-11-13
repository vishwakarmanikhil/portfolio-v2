'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getPrisma } from '@/lib/prisma';
import { STATUSES } from '@/lib/enquiryOptions';
import { SESSION_COOKIE, createSessionToken, isPasswordCorrect, requireAdmin } from '@/lib/adminAuth';

export async function login(_previousState, formData) {
    const password = String(formData.get('password') ?? '');
    if (!isPasswordCorrect(password)) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // slow down guessing
        return { error: 'Wrong password.' };
    }
    const { token, expires } = createSessionToken();
    const store = await cookies();
    store.set(SESSION_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/admin',
        expires,
    });
    redirect('/admin');
}

export async function logout() {
    const store = await cookies();
    store.delete({ name: SESSION_COOKIE, path: '/admin' });
    redirect('/admin/login');
}

export async function updateEnquiry(formData) {
    await requireAdmin();
    const id = String(formData.get('id') ?? '');
    const status = String(formData.get('status') ?? '');
    const notes = String(formData.get('notes') ?? '').slice(0, 10000);
    if (!id || !STATUSES.some(s => s.value === status)) return;

    await getPrisma().enquiry.update({
        where: { id },
        data: { status, notes: notes.trim() ? notes : null },
    });
    revalidatePath('/admin');
    revalidatePath(`/admin/enquiries/${id}`);
    redirect(`/admin/enquiries/${id}?saved=1`);
}

export async function deleteEnquiry(formData) {
    await requireAdmin();
    const id = String(formData.get('id') ?? '');
    if (!id) return;
    await getPrisma().enquiry.delete({ where: { id } });
    revalidatePath('/admin');
    redirect('/admin?deleted=1');
}
