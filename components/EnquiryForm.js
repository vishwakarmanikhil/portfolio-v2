'use client';

import { useActionState, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { submitEnquiry } from '@/app/actions/enquiry';
import { PROJECT_TYPES, BUDGETS } from '@/lib/enquiryOptions';

const inputClass = 'w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-3 text-base text-gray-800 dark:text-gray-200 placeholder:text-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30';
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

/**
 * Public enquiry form. `defaultProjectType` preselects the "What do you need?" option
 * (e.g. "Enquiro demo" on the Enquiro page).
 */
export default function EnquiryForm({ defaultProjectType = '', submitLabel = 'Send enquiry' }) {
    const pathname = usePathname();
    const [state, formAction, pending] = useActionState(submitEnquiry, null);
    const [startedAt, setStartedAt] = useState('');

    useEffect(() => {
        setStartedAt(String(Date.now()));
    }, []);

    if (state?.ok) {
        return (
            <div role='status' className={classNames('rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-8 text-center')}>
                <p className={classNames('mb-2 text-2xl font-bold text-gray-800 dark:text-gray-200')}>Thank you, your enquiry is sent.</p>
                <p className={classNames('text-base text-gray-600 dark:text-gray-400')}>I&apos;ll read it and reply to you by email soon.</p>
            </div>
        );
    }

    const errors = state?.errors ?? {};
    const values = state?.values ?? {};
    const errorProps = name => (errors[name] ? { 'aria-invalid': true, 'aria-describedby': `enquiry-${name}-error` } : {});

    return (
        <form action={formAction} noValidate className={classNames('grid grid-cols-1 gap-5 md:grid-cols-2 text-left')}>
            <input type='hidden' name='sourcePage' value={pathname ?? ''} />
            <input type='hidden' name='startedAt' value={startedAt} />
            <div aria-hidden='true' className='absolute -left-[9999px] h-px w-px overflow-hidden'>
                <label htmlFor='enquiry-website'>Leave this field empty</label>
                <input id='enquiry-website' type='text' name='website' tabIndex={-1} autoComplete='off' />
            </div>

            <Field label='Your name' name='name' error={errors.name}>
                <input id='enquiry-name' name='name' type='text' autoComplete='name' required defaultValue={values.name} className={inputClass} {...errorProps('name')} />
            </Field>
            <Field label='Email' name='email' error={errors.email}>
                <input id='enquiry-email' name='email' type='email' autoComplete='email' required defaultValue={values.email} className={inputClass} {...errorProps('email')} />
            </Field>
            <Field label='Phone or WhatsApp' name='phone' optional error={errors.phone}>
                <input id='enquiry-phone' name='phone' type='tel' autoComplete='tel' defaultValue={values.phone} className={inputClass} {...errorProps('phone')} />
            </Field>
            <Field label='Company' name='company' optional error={errors.company}>
                <input id='enquiry-company' name='company' type='text' autoComplete='organization' defaultValue={values.company} className={inputClass} {...errorProps('company')} />
            </Field>
            <Field label='What do you need?' name='projectType' error={errors.projectType}>
                <select id='enquiry-projectType' name='projectType' required defaultValue={values.projectType || defaultProjectType} className={inputClass} {...errorProps('projectType')}>
                    <option value='' disabled>Choose one</option>
                    {PROJECT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
            </Field>
            <Field label='Budget' name='budget' optional error={errors.budget}>
                <select id='enquiry-budget' name='budget' defaultValue={values.budget ?? ''} className={inputClass}>
                    <option value=''>Prefer not to say</option>
                    {BUDGETS.map(budget => <option key={budget} value={budget}>{budget}</option>)}
                </select>
            </Field>
            <div className='md:col-span-2'>
                <Field label='Tell me about your project' name='message' error={errors.message}>
                    <textarea id='enquiry-message' name='message' rows={5} required defaultValue={values.message} placeholder='What are you building, who is it for, and when do you need it?' className={inputClass} {...errorProps('message')} />
                </Field>
            </div>

            <div className='md:col-span-2 flex flex-col items-start gap-3'>
                {state?.message && <p role='alert' className='text-sm font-medium text-red-500'>{state.message}</p>}
                <button type='submit' disabled={pending} className={classNames('rounded-lg bg-sky-500 px-8 py-4 text-sm font-semibold text-white hover:bg-sky-600 disabled:cursor-wait disabled:opacity-60')}>
                    {pending ? 'Sending…' : submitLabel}
                </button>
                <p className='text-xs text-gray-500 dark:text-gray-400'>Your details are only used to reply to your enquiry.</p>
            </div>
        </form>
    );
}
