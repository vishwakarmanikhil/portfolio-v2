import Link from 'next/link';
import classNames from 'classnames';
import { getPrisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/adminAuth';
import { buildEnquiryWhere, formatDateTime, PROJECT_TYPES, STATUSES, statusLabel } from '@/lib/enquiries';
import { logout } from './actions';

const PAGE_SIZE = 50;

const statusBadge = {
    NEW: 'bg-sky-500/15 text-sky-600 dark:text-sky-400',
    CONTACTED: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
    IN_DISCUSSION: 'bg-violet-500/15 text-violet-600 dark:text-violet-400',
    WON: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
    LOST: 'bg-gray-500/15 text-gray-600 dark:text-gray-400',
    SPAM: 'bg-red-500/15 text-red-600 dark:text-red-400',
};

const inputClass = 'rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-800 dark:text-gray-200 focus:border-sky-500 focus:outline-none';

export default async function AdminEnquiries({ searchParams }) {
    await requireAdmin();
    const params = await searchParams;
    const filters = {
        status: params.status ?? '',
        projectType: params.projectType ?? '',
        q: (params.q ?? '').trim(),
        from: params.from ?? '',
        to: params.to ?? '',
    };
    const page = Math.max(1, Number(params.page) || 1);
    const where = buildEnquiryWhere(filters);
    const prisma = getPrisma();

    const [enquiries, total, counts] = await Promise.all([
        prisma.enquiry.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE }),
        prisma.enquiry.count({ where }),
        prisma.enquiry.groupBy({ by: ['status'], _count: { _all: true } }),
    ]);
    const countFor = status => counts.find(c => c.status === status)?._count._all ?? 0;

    const query = new URLSearchParams(Object.entries(filters).filter(([, v]) => v)).toString();
    const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const pageLink = p => `/admin?${new URLSearchParams({ ...Object.fromEntries(new URLSearchParams(query)), page: String(p) })}`;

    return (
        <div>
            <div className='mb-8 flex flex-wrap items-center justify-between gap-4'>
                <div>
                    <h1 className='text-3xl font-bold text-gray-800 dark:text-gray-200'>Enquiries</h1>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>Submitted through the website&apos;s enquiry form.</p>
                </div>
                <form action={logout}>
                    <button className='rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:border-sky-500'>Log out</button>
                </form>
            </div>

            {params.deleted && <p className='mb-6 rounded-lg bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600'>Enquiry deleted.</p>}

            <ul className='mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6'>
                {STATUSES.map(s => (
                    <li key={s.value}>
                        <Link href={`/admin?status=${s.value}`} className={classNames('block rounded-xl border p-4 transition hover:border-sky-500', filters.status === s.value ? 'border-sky-500' : 'border-gray-200 dark:border-gray-700')}>
                            <span className='block text-2xl font-bold text-gray-800 dark:text-gray-200'>{countFor(s.value)}</span>
                            <span className='text-sm text-gray-500 dark:text-gray-400'>{s.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>

            <form method='get' className='mb-6 flex flex-wrap items-end gap-3 rounded-xl border border-gray-200 dark:border-gray-700 p-4'>
                <label className='flex flex-col gap-1 text-xs font-semibold text-gray-500'>Search
                    <input name='q' defaultValue={filters.q} placeholder='Name, email, phone, message' className={classNames(inputClass, 'w-64')} />
                </label>
                <label className='flex flex-col gap-1 text-xs font-semibold text-gray-500'>Status
                    <select name='status' defaultValue={filters.status} className={inputClass}>
                        <option value=''>All except spam</option>
                        {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                </label>
                <label className='flex flex-col gap-1 text-xs font-semibold text-gray-500'>Looking for
                    <select name='projectType' defaultValue={filters.projectType} className={inputClass}>
                        <option value=''>All</option>
                        {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </label>
                <label className='flex flex-col gap-1 text-xs font-semibold text-gray-500'>From
                    <input type='date' name='from' defaultValue={filters.from} className={inputClass} />
                </label>
                <label className='flex flex-col gap-1 text-xs font-semibold text-gray-500'>To
                    <input type='date' name='to' defaultValue={filters.to} className={inputClass} />
                </label>
                <button className='rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600'>Apply</button>
                <Link href='/admin' className='px-2 py-2 text-sm text-gray-500 hover:text-sky-500'>Reset</Link>
                <a href={`/admin/export${query ? `?${query}` : ''}`} className='ml-auto inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700'>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M5 21h14" /></svg>
                    Export to Excel ({total})
                </a>
            </form>

            {enquiries.length === 0 ? (
                <p className='rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-10 text-center text-gray-500 dark:text-gray-400'>No enquiries match these filters.</p>
            ) : (
                <div className='overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700'>
                    <table className='w-full min-w-[760px] text-left text-sm'>
                        <thead className='bg-gray-50 dark:bg-gray-800 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400'>
                            <tr>
                                <th className='px-4 py-3'>Received</th>
                                <th className='px-4 py-3'>Name</th>
                                <th className='px-4 py-3'>Looking for</th>
                                <th className='px-4 py-3'>Budget</th>
                                <th className='px-4 py-3'>Status</th>
                                <th className='px-4 py-3'>Message</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300'>
                            {enquiries.map(e => (
                                <tr key={e.id} className='hover:bg-sky-500/5'>
                                    <td className='whitespace-nowrap px-4 py-3 text-gray-500'>{formatDateTime(e.createdAt)}</td>
                                    <td className='px-4 py-3'>
                                        <Link href={`/admin/enquiries/${e.id}`} className='font-semibold text-gray-800 dark:text-gray-200 hover:text-sky-500'>{e.name}</Link>
                                        <span className='block text-xs text-gray-500'>{e.email}</span>
                                    </td>
                                    <td className='px-4 py-3'>{e.projectType}</td>
                                    <td className='px-4 py-3 text-gray-500'>{e.budget ?? '—'}</td>
                                    <td className='px-4 py-3'><span className={classNames('whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold', statusBadge[e.status])}>{statusLabel(e.status)}</span></td>
                                    <td className='max-w-xs truncate px-4 py-3 text-gray-500'>{e.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {pages > 1 &&
                <nav className='mt-6 flex items-center justify-between text-sm'>
                    {page > 1 ? <Link href={pageLink(page - 1)} className='text-sky-500'>← Newer</Link> : <span />}
                    <span className='text-gray-500'>Page {page} of {pages}</span>
                    {page < pages ? <Link href={pageLink(page + 1)} className='text-sky-500'>Older →</Link> : <span />}
                </nav>}
        </div>
    );
}
