import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/adminAuth';
import LoginForm from './LoginForm';

export default async function AdminLogin() {
    if (await isAdmin()) redirect('/admin');
    return (
        <div className='mx-auto max-w-sm py-16'>
            <h1 className='mb-2 text-3xl font-bold text-gray-800 dark:text-gray-200'>Admin</h1>
            <p className='mb-8 text-sm text-gray-500 dark:text-gray-400'>Log in to see website enquiries.</p>
            <LoginForm />
        </div>
    );
}
