// Client-safe lists for the enquiry form and admin panel.
// Options shown in the enquiry form. Edit these lists to change the form.
export const PROJECT_TYPES = [
    'Website',
    'Web app',
    'Mobile app',
    'SaaS product',
    'Enquiro demo',
    'Coworkspace demo',
    'Job opportunity',
    'Something else',
];

export const BUDGETS = [
    'Not sure yet',
    'Under ₹50,000',
    '₹50,000 – ₹1,50,000',
    '₹1,50,000 – ₹5,00,000',
    'Above ₹5,00,000',
];

export const STATUSES = [
    { value: 'NEW', label: 'New' },
    { value: 'CONTACTED', label: 'Contacted' },
    { value: 'IN_DISCUSSION', label: 'In discussion' },
    { value: 'WON', label: 'Won' },
    { value: 'LOST', label: 'Lost' },
    { value: 'SPAM', label: 'Spam' },
];

export const statusLabel = value => STATUSES.find(s => s.value === value)?.label ?? value;
