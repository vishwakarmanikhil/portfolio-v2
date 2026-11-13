'use client';

import { useActionState } from 'react';
import { login } from '../actions';

export default function LoginForm() {
    const [state, formAction, pending] = useActionState(login, null);
    return (
        <form action={formAction} className='space-y-4'>
            <div>
                <label htmlFor='admin-password' className='mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300'>Password</label>
                <input
                    id='admin-password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    required
                    autoFocus
                    className='w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-3 text-gray-800 dark:text-gray-200 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30'
                />
            </div>
            {state?.error && <p role='alert' className='text-sm font-medium text-red-500'>{state.error}</p>}
            <button type='submit' disabled={pending} className='w-full rounded-lg bg-sky-500 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-600 disabled:opacity-60'>
                {pending ? 'Checking…' : 'Log in'}
            </button>
        </form>
    );
}
