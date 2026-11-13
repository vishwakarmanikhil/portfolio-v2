import Link from 'next/link';
import { notFound } from 'next/navigation';
import classNames from 'classnames';
import { getAllPosts, getPost, renderPost, formatDate, SITE_URL } from '@/lib/blog';
import DeveloperCredit from '@/components/homePageSections/DeveloperCredit';

export const dynamicParams = false;

export function generateStaticParams() {
    return getAllPosts().map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) return {};
    return {
        title: `${post.title} | Nikhil Vishwakarma`,
        description: post.description,
        keywords: post.tags,
        alternates: {
            canonical: `/blog/${post.slug}`,
            types: { 'application/rss+xml': '/rss.xml' },
        },
        openGraph: {
            title: post.title,
            description: post.description,
            url: post.url,
            siteName: 'Nikhil Vishwakarma',
            images: ['https://ik.imagekit.io/vishwakarmanikhil/portfolio-v2/og.png'],
            locale: 'en_US',
            type: 'article',
            publishedTime: post.date,
            ...(post.updated && { modifiedTime: post.updated }),
            authors: ['Nikhil Vishwakarma'],
            tags: post.tags,
        },
        ...(post.draft && { robots: { index: false, follow: false } }),
    };
}

export default async function BlogPost({ params }) {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) notFound();

    const { html, headings } = await renderPost(post);
    const posts = getAllPosts();
    const index = posts.findIndex(p => p.slug === post.slug);
    const newer = posts[index - 1];
    const older = posts[index + 1];

    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'BlogPosting',
                '@id': `${post.url}#post`,
                headline: post.title,
                description: post.description,
                url: post.url,
                mainEntityOfPage: post.url,
                datePublished: post.date,
                dateModified: post.updated ?? post.date,
                keywords: post.tags.join(', '),
                wordCount: post.content.trim().split(/\s+/).length,
                author: { '@id': `${SITE_URL}/#person` },
                publisher: { '@id': `${SITE_URL}/#person` },
                isPartOf: { '@id': `${SITE_URL}/blog#blog` },
                image: 'https://ik.imagekit.io/vishwakarmanikhil/portfolio-v2/og.png',
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
                    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
                    { '@type': 'ListItem', position: 3, name: post.title, item: post.url },
                ],
            },
        ],
    };

    return (
        <div className={classNames('mx-auto pt-16 md:pt-24')} style={{ maxWidth: 1080 }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

            <nav aria-label="Breadcrumb" className={classNames('text-sm font-medium text-gray-500 dark:text-gray-400 mb-8')}>
                <Link href='/' className='hover:text-sky-500'>Home</Link>
                <span className='mx-2'>/</span>
                <Link href='/blog' className='hover:text-sky-500'>Blog</Link>
            </nav>

            <header className={classNames('max-w-3xl mb-10')}>
                <h1 className={classNames('text-3xl md:text-5xl font-bold leading-tight text-gray-800 dark:text-gray-200 mb-5')}>{post.title}</h1>
                <p className={classNames('text-lg leading-8 text-gray-500 dark:text-gray-400 mb-5')}>{post.description}</p>
                <p className={classNames('text-sm font-medium text-gray-500 dark:text-gray-400')}>
                    By <Link href='/#about' className='text-sky-500 hover:underline'>Nikhil Vishwakarma</Link>
                    {' · '}<time dateTime={post.date}>{formatDate(post.date)}</time>
                    {post.updated && <>{' · '}Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time></>}
                    {' · '}{post.readingMinutes} min read
                    {post.draft && <span className='ml-2 rounded bg-amber-500/20 px-2 py-0.5 text-amber-600'>Draft – not published</span>}
                </p>
                {post.tags.length > 0 &&
                    <ul className={classNames('mt-4 flex flex-wrap gap-2')}>
                        {post.tags.map(tag => (
                            <li key={tag} className={classNames('rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-xs font-medium text-sky-600 dark:text-sky-400')}>{tag}</li>
                        ))}
                    </ul>}
            </header>

            <div className={classNames('grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_220px]')}>
                <article
                    className={classNames('blog-prose prose prose-lg max-w-3xl dark:prose-invert prose-headings:scroll-mt-28 prose-a:text-sky-600 dark:prose-a:text-sky-400 prose-img:rounded-xl')}
                    dangerouslySetInnerHTML={{ __html: html }}
                />

                {headings.length > 1 &&
                    <aside className={classNames('hidden lg:block')}>
                        <nav aria-label="On this page" className={classNames('sticky top-28')}>
                            <p className={classNames('mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400')}>On this page</p>
                            <ul className={classNames('space-y-2 border-l border-gray-200 dark:border-gray-700')}>
                                {headings.map(h => (
                                    <li key={h.id}><a href={`#${h.id}`} className={classNames('-ml-px block border-l border-transparent pl-4 text-sm text-gray-500 dark:text-gray-400 hover:border-sky-500 hover:text-sky-500')}>{h.text}</a></li>
                                ))}
                            </ul>
                        </nav>
                    </aside>}
            </div>

            <section className={classNames('max-w-3xl mt-16 rounded-2xl border border-sky-500/40 bg-gradient-to-br from-sky-500/10 via-transparent to-sky-500/5 p-6 md:p-8')}>
                <p className={classNames('text-lg font-bold text-gray-800 dark:text-gray-200 mb-2')}>Written by Nikhil Vishwakarma</p>
                <p className={classNames('text-base leading-7 text-gray-500 dark:text-gray-400 mb-5')}>Senior Software Developer in Mumbai with 5+ years of full-stack experience in React, Next.js, Node.js and AWS. I am open to senior software developer roles, and I build websites and web apps for businesses.</p>
                <div className={classNames('flex flex-wrap gap-3')}>
                    <Link href='/' className={classNames('rounded-lg bg-sky-500 px-5 py-3 text-sm font-medium text-white hover:bg-sky-600')}>About me and my work</Link>
                    <Link href='/freelance' className={classNames('rounded-lg border border-sky-500 px-5 py-3 text-sm font-medium text-sky-500 hover:bg-sky-500/10')}>Hire me for a project</Link>
                </div>
            </section>

            {(newer || older) &&
                <nav aria-label="More posts" className={classNames('max-w-3xl mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4')}>
                    {older ? (
                        <Link href={`/blog/${older.slug}`} className={classNames('rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:border-sky-500/70')}>
                            <span className='block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1'>← Older</span>
                            <span className='block font-semibold text-gray-800 dark:text-gray-200'>{older.title}</span>
                        </Link>
                    ) : <span />}
                    {newer &&
                        <Link href={`/blog/${newer.slug}`} className={classNames('rounded-xl border border-gray-200 dark:border-gray-700 p-5 text-right hover:border-sky-500/70')}>
                            <span className='block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1'>Newer →</span>
                            <span className='block font-semibold text-gray-800 dark:text-gray-200'>{newer.title}</span>
                        </Link>}
                </nav>}

            <p className={classNames('max-w-3xl mt-10 mb-24')}>
                <Link href='/blog' className={classNames('text-sm font-medium text-sky-500 hover:underline')}>← All posts</Link>
            </p>

            <div className={classNames('pb-5')}>
                <DeveloperCredit />
            </div>
        </div>
    );
}
