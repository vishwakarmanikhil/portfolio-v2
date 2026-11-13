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
