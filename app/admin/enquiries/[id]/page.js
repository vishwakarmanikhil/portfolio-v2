import Link from 'next/link';
import { notFound } from 'next/navigation';
import classNames from 'classnames';
import { getPrisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/adminAuth';
import { formatDateTime, STATUSES, whatsappNumber } from '@/lib/enquiries';
import { updateEnquiry, deleteEnquiry } from '../../actions';

const inputClass = 'w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-800 dark:text-gray-200 focus:border-sky-500 focus:outline-none';

export default async function AdminEnquiry({ params, searchParams }) {
    await requireAdmin();
    const { id } = await params;
    const { saved } = await searchParams;
    const enquiry = await getPrisma().enquiry.findUnique({ where: { id } });
    if (!enquiry) notFound();

    const details = [
        ['Mobile', <span key='phone'>{enquiry.phone} · <a href={`tel:${enquiry.phone}`} className='text-sky-500 hover:underline'>Call</a> · <a href={`https://wa.me/${whatsappNumber(enquiry.phone)}`} target='_blank' rel='noopener' className='text-sky-500 hover:underline'>WhatsApp</a></span>],
        ['Email', enquiry.email && <a key='email' href={`mailto:${enquiry.email}`} className='text-sky-500 hover:underline'>{enquiry.email}</a>],
        ['About', enquiry.topic],
        ['Sent from page', enquiry.sourcePage],
        ['Received', formatDateTime(enquiry.createdAt)],
        ['Last updated', formatDateTime(enquiry.updatedAt)],
    ].filter(([, v]) => v);

    return (
        <div>
            <Link href='/admin' className='text-sm text-sky-500 hover:underline'>← All enquiries</Link>
            <h1 className='mt-4 mb-1 text-3xl font-bold text-gray-800 dark:text-gray-200'>{enquiry.name}</h1>
            <p className='mb-8 text-sm text-gray-500 dark:text-gray-400'>{enquiry.phone}{enquiry.topic ? ` · ${enquiry.topic}` : ''}</p>

            {saved && <p className='mb-6 rounded-lg bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600'>Saved.</p>}

            <div className='grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px]'>
                <div className='space-y-6'>
                    <section className='rounded-xl border border-gray-200 dark:border-gray-700 p-6'>
                        <h2 className='mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500'>Message</h2>
                        <p className='whitespace-pre-wrap text-gray-700 dark:text-gray-300'>{enquiry.message || <span className='text-gray-400'>No message was added.</span>}</p>
                    </section>
                    <section className='rounded-xl border border-gray-200 dark:border-gray-700 p-6'>
                        <h2 className='mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500'>Details</h2>
                        <dl className='grid grid-cols-[140px_minmax(0,1fr)] gap-y-2 text-sm'>
                            {details.map(([label, value]) => (
                                <div key={label} className='contents'>
                                    <dt className='text-gray-500'>{label}</dt>
                                    <dd className='break-words text-gray-800 dark:text-gray-200'>{value}</dd>
                                </div>
                            ))}
                        </dl>
                    </section>
                </div>

                <aside className='space-y-6'>
                    <form action={updateEnquiry} className='space-y-4 rounded-xl border border-gray-200 dark:border-gray-700 p-6'>
                        <input type='hidden' name='id' value={enquiry.id} />
                        <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>Status
                            <select name='status' defaultValue={enquiry.status} className={classNames(inputClass, 'mt-1.5')}>
                                {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                            </select>
                        </label>
                        <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>Notes
                            <textarea name='notes' rows={8} defaultValue={enquiry.notes ?? ''} placeholder='Calls, follow-ups, quotes sent…' className={classNames(inputClass, 'mt-1.5')} />
                        </label>
                        <button className='w-full rounded-lg bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-600'>Save</button>
                    </form>
                    <form action={deleteEnquiry} className='rounded-xl border border-red-500/30 p-6'>
                        <input type='hidden' name='id' value={enquiry.id} />
                        <p className='mb-3 text-sm text-gray-500 dark:text-gray-400'>Delete this enquiry permanently. To keep it but hide it, set the status to Spam instead.</p>
                        <button className='w-full rounded-lg border border-red-500 px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-500/10'>Delete enquiry</button>
                    </form>
                </aside>
            </div>
        </div>
    );
}
