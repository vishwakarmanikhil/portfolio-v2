'use client';

import { useActionState, useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { submitEnquiry } from '@/app/actions/enquiry';

// Enquiry form in a modal dialog: name and mobile required, email and message optional.
//
//   <EnquiryButton label='Start a project' />
//   <EnquiryButton label='Request a live demo' topic='Enquiro demo' autoOpenHash />
//
// `topic` is saved with the enquiry (not shown as a field). With `autoOpenHash`,
// a link ending in #enquire opens this button's dialog when the page loads.

const inputClass = 'w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-base text-gray-800 dark:text-gray-200 placeholder:text-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30';
const labelClass = 'mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300';

const Field = ({ label, name, optional, error, children }) => (
    <div>
        <label htmlFor={`enquiry-${name}`} className={labelClass}>
            {label}{optional && <span className='ml-1 font-normal text-gray-400'>(optional)</span>}
        </label>
        {children}
        {error && <p id={`enquiry-${name}-error`} className='mt-1 text-sm text-red-500'>{error}</p>}
    </div>
);

function EnquiryFields({ topic, startedAt, onDone, submitLabel }) {
    const pathname = usePathname();
    const [state, formAction, pending] = useActionState(submitEnquiry, null);

    if (state?.ok) {
        return (
            <div role='status' className='py-6 text-center'>
                <div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500'>
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                </div>
                <p className='mb-2 text-xl font-bold text-gray-800 dark:text-gray-200'>Thank you, your enquiry is sent.</p>
                <p className='mb-6 text-base text-gray-600 dark:text-gray-400'>I&apos;ll get back to you soon.</p>
                <button type='button' onClick={onDone} className='rounded-lg border border-sky-500 px-6 py-2.5 text-sm font-semibold text-sky-500 hover:bg-sky-500/10'>Close</button>
            </div>
        );
    }

    const errors = state?.errors ?? {};
    const values = state?.values ?? {};
    const errorProps = name => (errors[name] ? { 'aria-invalid': true, 'aria-describedby': `enquiry-${name}-error` } : {});

    return (
        <form action={formAction} noValidate className='space-y-4'>
            <input type='hidden' name='sourcePage' value={pathname ?? ''} />
            <input type='hidden' name='startedAt' value={startedAt} />
            {topic && <input type='hidden' name='topic' value={topic} />}
            <div aria-hidden='true' className='absolute -left-[9999px] h-px w-px overflow-hidden'>
                <label htmlFor='enquiry-website'>Leave this field empty</label>
                <input id='enquiry-website' type='text' name='website' tabIndex={-1} autoComplete='off' />
            </div>

            <Field label='Name' name='name' error={errors.name}>
                <input id='enquiry-name' name='name' type='text' autoComplete='name' required defaultValue={values.name} className={inputClass} {...errorProps('name')} />
            </Field>
            <Field label='Mobile number' name='phone' error={errors.phone}>
                <input id='enquiry-phone' name='phone' type='tel' inputMode='tel' autoComplete='tel' required placeholder='+91 98765 43210' defaultValue={values.phone} className={inputClass} {...errorProps('phone')} />
            </Field>
            <Field label='Email' name='email' optional error={errors.email}>
                <input id='enquiry-email' name='email' type='email' autoComplete='email' defaultValue={values.email} className={inputClass} {...errorProps('email')} />
            </Field>
            <Field label='Message' name='message' optional error={errors.message}>
                <textarea id='enquiry-message' name='message' rows={4} defaultValue={values.message} placeholder='A few lines about what you need' className={inputClass} {...errorProps('message')} />
            </Field>

            {state?.message && <p role='alert' className='text-sm font-medium text-red-500'>{state.message}</p>}
            <button type='submit' disabled={pending} className='w-full rounded-lg bg-sky-500 px-6 py-3.5 text-sm font-semibold text-white hover:bg-sky-600 disabled:cursor-wait disabled:opacity-60'>
                {pending ? 'Sending…' : submitLabel}
            </button>
            <p className='text-center text-xs text-gray-500 dark:text-gray-400'>Your details are only used to reply to your enquiry.</p>
        </form>
    );
}

export function EnquiryButton({
    label = 'Send an enquiry',
    topic = '',
    title = 'Tell me about your project',
    description = 'Leave your name and mobile number and I’ll get back to you.',
    submitLabel = 'Send enquiry',
    className,
    autoOpenHash = false,
}) {
    const dialogRef = useRef(null);
    const [session, setSession] = useState(0);
    const [startedAt, setStartedAt] = useState('');

    const open = useCallback(() => {
        setSession(s => s + 1); // fresh form every time it opens
        setStartedAt(String(Date.now()));
        dialogRef.current?.showModal();
        document.body.style.overflow = 'hidden';
    }, []);

    const close = useCallback(() => dialogRef.current?.close(), []);

    useEffect(() => {
        const dialog = dialogRef.current;
        const onClose = () => { document.body.style.overflow = ''; };
        dialog?.addEventListener('close', onClose);
        return () => dialog?.removeEventListener('close', onClose);
    }, []);

    useEffect(() => {
        if (!autoOpenHash) return;
        const onHashChange = () => {
            if (window.location.hash === '#enquire' && !dialogRef.current?.open) open();
        };
        window.addEventListener('hashchange', onHashChange);
        const timer = window.location.hash === '#enquire' ? setTimeout(open, 2100) : null; // after the page loader
        return () => {
            window.removeEventListener('hashchange', onHashChange);
            if (timer) clearTimeout(timer);
        };
    }, [autoOpenHash, open]);

    return (
        <>
            <button type='button' onClick={open} className={className}>{label}</button>
            <dialog
                ref={dialogRef}
                aria-labelledby={`enquiry-title-${topic || 'general'}`}
                onClick={event => { if (event.target === event.currentTarget) close(); }}
                className='m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-0 text-left shadow-2xl backdrop:bg-gray-950/70 backdrop:backdrop-blur-sm'
            >
                <div className='relative p-6 md:p-8'>
                    <button type='button' onClick={close} aria-label='Close' className='absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200'>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
                    </button>
                    <h2 id={`enquiry-title-${topic || 'general'}`} className='mb-1 pr-10 text-2xl font-bold text-gray-800 dark:text-gray-200'>{title}</h2>
                    <p className='mb-6 text-sm text-gray-500 dark:text-gray-400'>{description}</p>
                    {session > 0 && <EnquiryFields key={session} topic={topic} startedAt={startedAt} onDone={close} submitLabel={submitLabel} />}
                </div>
            </dialog>
        </>
    );
}

export default EnquiryButton;
