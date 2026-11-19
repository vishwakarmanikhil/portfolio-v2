'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { STATUSES, statusLabel, formatDateTime, dateRangePreset } from '@/lib/enquiryOptions';
import { logout } from './actions';

// Admin enquiry list. Filters are sent to POST /admin/api/enquiries (not in the URL)
// and remembered for this browser tab, so they survive opening an enquiry and coming back.

const STORAGE_KEY = 'admin-enquiry-filters';

const statusBadge = {
    NEW: 'bg-sky-500/15 text-sky-600 dark:text-sky-400',
    CONTACTED: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
    IN_DISCUSSION: 'bg-violet-500/15 text-violet-600 dark:text-violet-400',
    WON: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
    LOST: 'bg-gray-500/15 text-gray-600 dark:text-gray-400',
    SPAM: 'bg-red-500/15 text-red-600 dark:text-red-400',
};

const PRESETS = [
    { value: 'today', label: 'Today' },
    { value: 'last7', label: 'Last 7 days' },
    { value: 'month', label: 'This month' },
    { value: 'all', label: 'All time' },
];

const inputClass = 'rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-800 dark:text-gray-200 focus:border-sky-500 focus:outline-none';

function readSaved() {
    try {
        const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? 'null');
        return saved && typeof saved === 'object' ? saved : null;
    } catch {
        return null;
    }
}

function rangeLabel({ from, to }) {
    if (!from && !to) return 'all time';
    if (from && from === to) return from;
    return `${from || 'the start'} to ${to || 'today'}`;
}

async function postJson(url, body) {
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'same-origin',
        cache: 'no-store',
    });
}

export default function EnquiriesDashboard({ today }) {
    const defaults = { q: '', status: '', from: today, to: today };
    const [form, setForm] = useState(defaults);       // what is typed in the filter bar
    const [applied, setApplied] = useState(null);      // filters of the results on screen
    const [page, setPage] = useState(1);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [exporting, setExporting] = useState(false);
    const [error, setError] = useState('');
    const [notice, setNotice] = useState('');
    const requestId = useRef(0);

    const load = useCallback(async (filters, pageNumber = 1) => {
        if (filters.from && filters.to && filters.from > filters.to) {
            setError('"From" date is after "To" date.');
            return;
        }
        const id = ++requestId.current;
        setLoading(true);
        setError('');
        try {
            const res = await postJson('/admin/api/enquiries', { ...filters, page: pageNumber });
            const body = await res.json();
            if (id !== requestId.current) return; // a newer request is on its way
            if (res.status === 401) {
                window.location.href = '/admin/login';
                return;
            }
            if (!res.ok) throw new Error(body.error || 'Could not load enquiries.');
            setData(body);
            setApplied(filters);
            setPage(pageNumber);
            try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(filters)); } catch { /* storage unavailable */ }
        } catch (err) {
            if (id === requestId.current) setError(err.message || 'Could not load enquiries.');
        } finally {
            if (id === requestId.current) setLoading(false);
        }
    }, []);

    // First load: filters saved for this tab, otherwise today's enquiries.
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.has('deleted')) {
            setNotice('Enquiry deleted.');
            window.history.replaceState(null, '', '/admin');
        }
        const initial = { ...defaults, ...(readSaved() ?? {}) };
        setForm(initial);
        load(initial, 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const apply = next => {
        setForm(next);
        load(next, 1);
    };
    const update = (key, value) => setForm(f => ({ ...f, [key]: value }));

    const exportExcel = async () => {
        if (!applied) return;
        setExporting(true);
        setError('');
        try {
            const res = await postJson('/admin/api/export', applied);
            if (res.status === 401) {
                window.location.href = '/admin/login';
                return;
            }
            if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Export failed.');
            const blob = await res.blob();
            const name = /filename="([^"]+)"/.exec(res.headers.get('content-disposition') ?? '')?.[1] ?? 'enquiries.csv';
            const url = URL.createObjectURL(blob);
            const a = Object.assign(document.createElement('a'), { href: url, download: name });
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        } catch (err) {
            setError(err.message || 'Export failed.');
        } finally {
            setExporting(false);
        }
    };

    const counts = data?.counts ?? {};
    const enquiries = data?.enquiries ?? [];

    return (
        <div>
            <div className='mb-8 flex flex-wrap items-center justify-between gap-4'>
                <div>
                    <h1 className='text-3xl font-bold text-gray-800 dark:text-gray-200'>Enquiries</h1>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                        {applied ? <>Showing <strong className='text-gray-700 dark:text-gray-300'>{rangeLabel(applied)}</strong>{applied.status ? ` · ${statusLabel(applied.status)}` : ''}{applied.q ? ` · “${applied.q}”` : ''}</> : 'Submitted through the website’s enquiry form.'}
                    </p>
                </div>
                <form action={logout}>
                    <button className='rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:border-sky-500'>Log out</button>
                </form>
            </div>

            {notice && <p className='mb-6 rounded-lg bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600'>{notice}</p>}

            <ul className='mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6'>
                {STATUSES.map(s => (
                    <li key={s.value}>
                        <button
                            type='button'
                            onClick={() => apply({ ...form, status: form.status === s.value ? '' : s.value })}
                            className={classNames('block w-full rounded-xl border p-4 text-left transition hover:border-sky-500', applied?.status === s.value ? 'border-sky-500 bg-sky-500/5' : 'border-gray-200 dark:border-gray-700')}
                        >
                            <span className='block text-2xl font-bold text-gray-800 dark:text-gray-200'>{counts[s.value] ?? 0}</span>
                            <span className='text-sm text-gray-500 dark:text-gray-400'>{s.label}</span>
                        </button>
                    </li>
                ))}
            </ul>

            <form
                onSubmit={event => { event.preventDefault(); apply(form); }}
                className='mb-6 rounded-xl border border-gray-200 dark:border-gray-700 p-4'
            >
                <div className='mb-4 flex flex-wrap gap-2'>
                    {PRESETS.map(p => {
                        const range = dateRangePreset(p.value);
                        const active = form.from === range.from && form.to === range.to;
                        return (
                            <button
                                key={p.value}
                                type='button'
                                onClick={() => apply({ ...form, ...range })}
                                className={classNames('rounded-full border px-3 py-1 text-xs font-semibold transition', active ? 'border-sky-500 bg-sky-500 text-white' : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-sky-500')}
                            >
                                {p.label}
                            </button>
                        );
                    })}
                </div>
                <div className='flex flex-wrap items-end gap-3'>
                    <label className='flex flex-col gap-1 text-xs font-semibold text-gray-500'>Search
                        <input value={form.q} onChange={e => update('q', e.target.value)} placeholder='Name, mobile, email, message' className={classNames(inputClass, 'w-64')} />
                    </label>
                    <label className='flex flex-col gap-1 text-xs font-semibold text-gray-500'>Status
                        <select value={form.status} onChange={e => update('status', e.target.value)} className={inputClass}>
                            <option value=''>All except spam</option>
                            {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                    </label>
                    <label className='flex flex-col gap-1 text-xs font-semibold text-gray-500'>From
                        <input type='date' value={form.from} max={form.to || undefined} onChange={e => update('from', e.target.value)} className={inputClass} />
                    </label>
                    <label className='flex flex-col gap-1 text-xs font-semibold text-gray-500'>To
                        <input type='date' value={form.to} min={form.from || undefined} onChange={e => update('to', e.target.value)} className={inputClass} />
                    </label>
                    <button type='submit' className='rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600'>Apply</button>
                    <button type='button' onClick={() => apply(defaults)} className='px-2 py-2 text-sm text-gray-500 hover:text-sky-500'>Reset to today</button>
                    <button
                        type='button'
                        onClick={exportExcel}
                        disabled={!applied || exporting || !data?.total}
                        className='ml-auto inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50'
                    >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M5 21h14" /></svg>
                        {exporting ? 'Exporting…' : `Export to Excel (${data?.total ?? 0})`}
                    </button>
                </div>
            </form>

            {error && <p role='alert' className='mb-6 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-500'>{error}</p>}

            <div className={classNames('transition-opacity', loading && 'opacity-50')} aria-busy={loading}>
                {!data && loading ? (
                    <p className='rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-10 text-center text-gray-500 dark:text-gray-400'>Loading enquiries…</p>
                ) : enquiries.length === 0 ? (
                    <p className='rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-10 text-center text-gray-500 dark:text-gray-400'>
                        No enquiries for {applied ? rangeLabel(applied) : 'these filters'}. Try a wider date range.
                    </p>
                ) : (
                    <div className='overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700'>
                        <table className='w-full min-w-[760px] text-left text-sm'>
                            <thead className='bg-gray-50 dark:bg-gray-800 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400'>
                                <tr>
                                    <th className='px-4 py-3'>Received</th>
                                    <th className='px-4 py-3'>Name</th>
                                    <th className='px-4 py-3'>Mobile</th>
                                    <th className='px-4 py-3'>About</th>
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
                                            {e.email && <span className='block text-xs text-gray-500'>{e.email}</span>}
                                        </td>
                                        <td className='whitespace-nowrap px-4 py-3'><a href={`tel:${e.phone}`} className='hover:text-sky-500'>{e.phone}</a></td>
                                        <td className='px-4 py-3 text-gray-500'>{e.topic ?? '—'}</td>
                                        <td className='px-4 py-3'><span className={classNames('whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold', statusBadge[e.status])}>{statusLabel(e.status)}</span></td>
                                        <td className='max-w-xs truncate px-4 py-3 text-gray-500'>{e.message ?? '—'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {data && data.pages > 1 &&
                <nav className='mt-6 flex items-center justify-between text-sm'>
                    {page > 1 ? <button type='button' onClick={() => load(applied, page - 1)} className='text-sky-500'>← Newer</button> : <span />}
                    <span className='text-gray-500'>Page {page} of {data.pages} · {data.total} enquiries</span>
                    {page < data.pages ? <button type='button' onClick={() => load(applied, page + 1)} className='text-sky-500'>Older →</button> : <span />}
                </nav>}
        </div>
    );
}
