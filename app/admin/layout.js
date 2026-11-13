export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Admin | Nikhil Vishwakarma',
    robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }) {
    return <div className='mx-auto max-w-6xl py-12 md:py-16'>{children}</div>;
}
