// Client-safe lists for the enquiry form and admin panel.

export const STATUSES = [
    { value: 'NEW', label: 'New' },
    { value: 'CONTACTED', label: 'Contacted' },
    { value: 'IN_DISCUSSION', label: 'In discussion' },
    { value: 'WON', label: 'Won' },
    { value: 'LOST', label: 'Lost' },
    { value: 'SPAM', label: 'Spam' },
];

export const statusLabel = value => STATUSES.find(s => s.value === value)?.label ?? value;

/** Digits for a wa.me link; 10-digit numbers are treated as Indian (+91). */
export function whatsappNumber(phone) {
    const digits = String(phone ?? '').replace(/\D/g, '');
    return digits.length === 10 ? `91${digits}` : digits;
}

const TIME_ZONE = 'Asia/Kolkata';

export function formatDateTime(date) {
    return new Date(date).toLocaleString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: TIME_ZONE,
    });
}

/** A date as YYYY-MM-DD in Indian time (default: today). */
export function istDate(date = new Date()) {
    return new Date(date).toLocaleDateString('en-CA', { timeZone: TIME_ZONE });
}

/** Quick date ranges for the admin filters, as { from, to } in YYYY-MM-DD (IST). */
export function dateRangePreset(preset, now = new Date()) {
    const today = istDate(now);
    const daysAgo = n => istDate(new Date(now.getTime() - n * 24 * 60 * 60 * 1000));
    switch (preset) {
        case 'today': return { from: today, to: today };
        case 'last7': return { from: daysAgo(6), to: today };
        case 'month': return { from: `${today.slice(0, 8)}01`, to: today };
        case 'all': return { from: '', to: '' };
        default: return { from: today, to: today };
    }
}
