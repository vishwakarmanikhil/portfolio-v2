import Link from 'next/link';
import classNames from 'classnames';
import archiveStyles from '../archive/style.module.css';
import { getAllPosts, formatDate, SITE_URL } from '@/lib/blog';
import DeveloperCredit from '@/components/homePageSections/DeveloperCredit';

const DESCRIPTION = 'Notes from Nikhil Vishwakarma on building web products: React and Next.js, Node.js, AWS, AI features, and getting websites found on Google and AI assistants.';

export const metadata = {
    title: 'Blog | Nikhil Vishwakarma',
    description: DESCRIPTION,
    alternates: {
        canonical: '/blog',
        types: { 'application/rss+xml': '/rss.xml' },
    },
    openGraph: {
        title: 'Blog | Nikhil Vishwakarma',
        description: DESCRIPTION,
        url: `${SITE_URL}/blog`,
        siteName: 'Nikhil Vishwakarma',
        images: ['https://ik.imagekit.io/vishwakarmanikhil/portfolio-v2/og.png'],
        locale: 'en_US',
        type: 'website',
    },
};

export default function BlogIndex() {
    const posts = getAllPosts();

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': `${SITE_URL}/blog#blog`,
        name: 'Nikhil Vishwakarma – Blog',
        url: `${SITE_URL}/blog`,
        description: DESCRIPTION,
        author: { '@id': `${SITE_URL}/#person` },
        blogPost: posts.map(post => ({
            '@type': 'BlogPosting',
            headline: post.title,
            url: post.url,
            datePublished: post.date,
            ...(post.updated && { dateModified: post.updated }),
        })),
    };

    return (
        <div className={classNames('mx-auto')} style={{ maxWidth: 820 }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

            <section className={classNames(archiveStyles.archive__banner_wrap)}>
                <p className={classNames('text-sm font-medium text-sky-500 mb-5')} data-aos='fade-up' data-aos-delay='100'>Blog</p>
                <h1 className={classNames(archiveStyles.main_heading__txt, 'text-gray-800 dark:text-gray-200 font-bold mb-6')} data-aos='fade-up' data-aos-delay='150'>Notes on building for the web.</h1>
                <p className={classNames('text-base font-medium text-gray-500 dark:text-gray-400 mb-4')} data-aos='fade-up' data-aos-delay='200'>{DESCRIPTION}</p>
                <a href='/rss.xml' className={classNames('inline-flex items-center gap-2 text-sm font-medium text-sky-500 hover:text-sky-600')} data-aos='fade-up' data-aos-delay='250'>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16" /><circle cx="5" cy="19" r="1" /></svg>
                    Subscribe with RSS
                </a>
            </section>

            {posts.length === 0 ? (
                <p className={classNames('pb-40 text-base text-gray-500 dark:text-gray-400')}>The first posts are on their way.</p>
            ) : (
                <ul className={classNames('space-y-6 pb-32')}>
                    {posts.map((post, key) => (
                        <li key={post.slug} data-aos='fade-up' data-aos-delay={`${Math.min(key, 3) * 100}`}>
                            <article className={classNames('group relative rounded-xl border border-gray-200 dark:border-gray-700/80 bg-white/70 dark:bg-gray-800/40 p-6 md:p-8 transition duration-300 hover:-translate-y-1 hover:border-sky-500/70 hover:shadow-xl hover:shadow-sky-500/10')}>
                                <p className={classNames('mb-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400')}>
                                    <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
                                    {post.draft && <span className='ml-2 rounded bg-amber-500/20 px-2 py-0.5 text-amber-600'>Draft</span>}
                                </p>
                                <h2 className={classNames('text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-sky-500 transition-colors')}>
                                    <Link href={`/blog/${post.slug}`} className='after:absolute after:inset-0'>{post.title}</Link>
                                </h2>
                                <p className={classNames('text-base leading-7 text-gray-500 dark:text-gray-400')}>{post.description}</p>
                                {post.tags.length > 0 &&
                                    <ul className={classNames('mt-5 flex flex-wrap gap-2')}>
                                        {post.tags.map(tag => (
                                            <li key={tag} className={classNames('rounded-full bg-gray-100 dark:bg-gray-900/70 px-3 py-1 text-xs font-medium text-sky-600 dark:text-sky-400')}>{tag}</li>
                                        ))}
                                    </ul>}
                            </article>
                        </li>
                    ))}
                </ul>
            )}

            <div className={classNames('pb-5')}>
                <DeveloperCredit />
            </div>
        </div>
    );
}
