import classNames from 'classnames';

// Illustration of Enquiro's two main screens, drawn with sample data.
// It is labelled as an illustration on the page; replace with real
// screenshots when available.

const rows = [
    { name: 'Rahul Sharma', phone: '98XXXXXX21', need: 'Residential plot, 2,000 sq ft', owner: 'Amit', status: 'New', date: '12 Nov' },
    { name: 'Priya Desai', phone: '97XXXXXX08', need: 'Farmhouse plot', owner: 'Sneha', status: 'Contacted', date: '12 Nov' },
    { name: 'Vikram Patil', phone: '99XXXXXX54', need: 'Investment plot', owner: 'Amit', status: 'Site visit', date: '11 Nov' },
    { name: 'Anjali Mehta', phone: '90XXXXXX36', need: '2 BHK flat', owner: 'Rohan', status: 'Follow-up', date: '10 Nov' },
    { name: 'Sameer Khan', phone: '88XXXXXX90', need: 'Weekend-home plot', owner: 'Sneha', status: 'Closed', date: '09 Nov' },
];

const statusClass = {
    'New': 'bg-sky-500/15 text-sky-600 dark:text-sky-400',
    'Contacted': 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
    'Site visit': 'bg-violet-500/15 text-violet-600 dark:text-violet-400',
    'Follow-up': 'bg-orange-500/15 text-orange-600 dark:text-orange-400',
    'Closed': 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
};

const Status = ({ value }) => (
    <span className={classNames('inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold', statusClass[value])}>{value}</span>
);

const Chip = ({ children }) => (
    <span className={classNames('inline-flex items-center gap-1 whitespace-nowrap rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2.5 py-1 text-xs font-medium text-gray-600 dark:text-gray-300')}>
        {children}
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
    </span>
);

const Frame = ({ label, children }) => (
    <div className={classNames('overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 shadow-2xl shadow-sky-500/10')}>
        <div className={classNames('flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-4 py-3')} aria-hidden="true">
            <span className='h-3 w-3 rounded-full bg-red-400' /><span className='h-3 w-3 rounded-full bg-yellow-400' /><span className='h-3 w-3 rounded-full bg-green-400' />
            <span className='ml-3 truncate rounded bg-white dark:bg-gray-900 px-3 py-0.5 text-xs text-gray-500 dark:text-gray-400'>{label}</span>
        </div>
        {children}
    </div>
);

const EnquiroPreview = () => (
    <figure className={classNames('mb-10')} data-aos='zoom-in'>
        <div className={classNames('grid grid-cols-1 lg:grid-cols-5 gap-5')} aria-hidden="true">
            {/* Admin view: all enquiries, filters, export */}
            <div className={classNames('lg:col-span-3')}>
                <Frame label='Enquiro · All enquiries (admin)'>
                    <div className={classNames('p-4')}>
                        <div className={classNames('mb-3 flex flex-wrap items-center justify-between gap-2')}>
                            <p className={classNames('text-sm font-bold text-gray-800 dark:text-gray-200')}>All enquiries <span className='font-medium text-gray-400'>· 128</span></p>
                            <span className={classNames('inline-flex items-center gap-1.5 rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white')}>
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12M7 10l5 5 5-5M5 21h14" /></svg>
                                Export to Excel
                            </span>
                        </div>
                        <div className={classNames('mb-3 flex flex-wrap gap-2')}>
                            <Chip>Date: This month</Chip>
                            <Chip>Status: All</Chip>
                            <Chip>Assigned to: All</Chip>
                        </div>
                        <div className={classNames('overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900')}>
                            <table className={classNames('w-full min-w-[520px] text-left text-xs')}>
                                <thead className={classNames('bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400')}>
                                    <tr>
                                        <th className='px-3 py-2 font-semibold'>Name</th>
                                        <th className='px-3 py-2 font-semibold'>Requirement</th>
                                        <th className='px-3 py-2 font-semibold'>Assigned to</th>
                                        <th className='px-3 py-2 font-semibold'>Status</th>
                                        <th className='px-3 py-2 font-semibold'>Date</th>
                                    </tr>
                                </thead>
                                <tbody className={classNames('divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300')}>
                                    {rows.map((row, key) => (
                                        <tr key={row.name} className={classNames(key === 1 && 'bg-sky-500/5')}>
                                            <td className='px-3 py-2'><span className='block font-semibold'>{row.name}</span><span className='text-gray-400'>{row.phone}</span></td>
                                            <td className='px-3 py-2'>{row.need}</td>
                                            <td className='px-3 py-2'>{row.owner}</td>
                                            <td className='px-3 py-2'><Status value={row.status} /></td>
                                            <td className='px-3 py-2 whitespace-nowrap text-gray-400'>{row.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Frame>
            </div>

            {/* Employee view: one allocated enquiry with comments and status */}
            <div className={classNames('lg:col-span-2')}>
                <Frame label='Enquiro · My enquiries (employee)'>
                    <div className={classNames('p-4')}>
                        <div className={classNames('mb-3 flex items-start justify-between gap-3')}>
                            <div>
                                <p className={classNames('text-sm font-bold text-gray-800 dark:text-gray-200')}>Priya Desai</p>
                                <p className={classNames('text-xs text-gray-500 dark:text-gray-400')}>Farmhouse plot · Allocated to Sneha</p>
                            </div>
                            <span className={classNames('inline-flex items-center gap-1 rounded-md border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400')}>
                                Contacted
                                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                            </span>
                        </div>
                        <p className={classNames('mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400')}>Comments</p>
                        <ul className={classNames('space-y-2')}>
                            <li className={classNames('rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-3')}>
                                <p className={classNames('text-xs text-gray-700 dark:text-gray-300')}>Called, interested in a 1-acre plot. Will share the brochure on WhatsApp.</p>
                                <p className={classNames('mt-1 text-[11px] text-gray-400')}>Sneha · 12 Nov, 11:20 am</p>
                            </li>
                            <li className={classNames('rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-3')}>
                                <p className={classNames('text-xs text-gray-700 dark:text-gray-300')}>Wants a site visit on Sunday with family.</p>
                                <p className={classNames('mt-1 text-[11px] text-gray-400')}>Sneha · 12 Nov, 4:05 pm</p>
                            </li>
                        </ul>
                        <div className={classNames('mt-3 flex items-center gap-2')}>
                            <span className={classNames('flex-1 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-xs text-gray-400')}>Add a comment…</span>
                            <span className={classNames('rounded-md bg-sky-500 px-3 py-2 text-xs font-semibold text-white')}>Save</span>
                        </div>
                    </div>
                </Frame>
            </div>
        </div>
        <figcaption className={classNames('mt-4 text-center text-sm text-gray-500 dark:text-gray-400')}>
            Illustration with sample data: the admin view of all enquiries, and an employee&apos;s view of an enquiry allocated to them. The real interface is shown in the live demo.
        </figcaption>
    </figure>
);

export default EnquiroPreview;
