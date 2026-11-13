import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import styles from '@/app/page.module.css';
import archiveStyles from '@/app/archive/style.module.css';
import FaqAccordion from '@/components/FaqAccordion';
import ServiceIcon from '@/components/freelance/ServiceIcon';
import DeveloperCredit from '@/components/homePageSections/DeveloperCredit';
import EnquiryForm from '@/components/EnquiryForm';

// Shared layout for product showcase pages (/projects/<slug>).
// All text comes from components/projects/<slug>.json; the page passes in a
// `preview` (screenshot or illustration) to show under the hero.

export const SITE_URL = 'https://www.nikhilvishwakarma.com';
const EMAIL = 'vnikhil3101@gmail.com';

const pageUrl = project => `${SITE_URL}/projects/${project.slug}`;
const mailto = project => `mailto:${EMAIL}?subject=${encodeURIComponent(`${project.name} demo request`)}`;

export function productMetadata(project) {
    const image = project.image ? `${SITE_URL}${project.image}` : 'https://ik.imagekit.io/vishwakarmanikhil/portfolio-v2/og.png';
    return {
        title: `${project.metaTitle} | Nikhil Vishwakarma`,
        description: project.metaDescription,
        alternates: { canonical: `/projects/${project.slug}` },
        openGraph: {
            title: project.title,
            description: project.metaDescription,
            url: pageUrl(project),
            siteName: 'Nikhil Vishwakarma',
            images: [image],
            locale: 'en_US',
            type: 'website',
        },
    };
}

function structuredData(project) {
    const url = pageUrl(project);
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'SoftwareApplication',
                '@id': `${url}#app`,
                name: project.name,
                url,
                description: project.summary,
                applicationCategory: 'BusinessApplication',
                operatingSystem: 'Web',
                ...(project.image && { image: `${SITE_URL}${project.image}` }),
                author: { '@id': `${SITE_URL}/#person` },
                featureList: project.parts.flatMap(part => part.features),
            },
            {
                '@type': 'FAQPage',
                '@id': `${url}#faq`,
                url,
                mainEntity: project.faq.map(item => ({
                    '@type': 'Question',
                    name: item.question,
                    acceptedAnswer: { '@type': 'Answer', text: item.answer },
                })),
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
                    { '@type': 'ListItem', position: 2, name: 'Freelance', item: `${SITE_URL}/freelance` },
                    { '@type': 'ListItem', position: 3, name: project.name, item: url },
                ],
            },
        ],
    };
}

const buttonClass = 'inline-block px-6 py-4 me-2 mb-2 text-sm font-medium text-sky-500 focus:outline-none bg-white rounded-lg border border-sky-500 hover:bg-gray-100 hover:text-sky-600 hover:border-sky-600 focus:z-10 focus:ring-4 focus:ring-transparent dark:bg-transparent hover:dark:bg-sky-900';
const solidButtonClass = 'inline-block px-6 py-4 me-2 mb-2 text-sm font-medium text-white bg-sky-500 rounded-lg border border-sky-500 hover:bg-sky-600 hover:border-sky-600 focus:outline-none';
const titleClass = classNames(styles.section__title, 'text-2xl text-gray-800 dark:text-gray-200 font-bold');
const textClass = 'text-base font-medium text-gray-500 dark:text-gray-400';
const cardClass = 'group h-full rounded-xl border border-gray-200 dark:border-gray-700/80 bg-white/70 dark:bg-gray-800/40 p-6 transition duration-300 hover:-translate-y-1 hover:border-sky-500/70 hover:shadow-xl hover:shadow-sky-500/10';

export const CheckIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-sky-500" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);

const LockIcon = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
);

const ProductPage = ({ project, preview }) => {
    const MAILTO = mailto(project);
    const gridCols = project.parts.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2';

    return (
        <div className={classNames('mx-auto')} style={{ maxWidth: 1000 }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(project)) }}
            />

            <section className={classNames(archiveStyles.archive__banner_wrap)}>
                <nav aria-label="Breadcrumb" className={classNames('text-sm font-medium text-gray-500 dark:text-gray-400 mb-6')} data-aos='fade-up' data-aos-delay='100'>
                    <Link href='/' className='hover:text-sky-500'>Home</Link>
                    <span className='mx-2'>/</span>
                    <Link href='/freelance' className='hover:text-sky-500'>Freelance</Link>
                    <span className='mx-2'>/</span>
                    <span className='text-sky-500'>{project.name}</span>
                </nav>
                <p className={classNames('inline-block text-xs font-semibold uppercase tracking-widest text-sky-500 border border-sky-500 rounded-full px-3 py-1 mb-5')} data-aos='fade-up' data-aos-delay='120'>{project.badge}</p>
                <h1 className={classNames(archiveStyles.main_heading__txt, 'text-gray-800 dark:text-gray-200 font-bold mb-6')} data-aos='fade-up' data-aos-delay='150'>{project.title}.</h1>
                <p className={classNames(textClass, 'md:w-3/4 mb-8')} data-aos='fade-up' data-aos-delay='200'>{project.summary}</p>
                <div data-aos='fade-up' data-aos-delay='250'>
                    <a href='#contact' className={solidButtonClass} title='Go to the demo request form'>Request a live demo</a>
                    {project.websiteUrl &&
                        <a href={project.websiteUrl} target='_blank' rel='noopener' className={buttonClass} title={`Open the ${project.name} public website`}>View the public website</a>}
                </div>
                <p className={classNames('mt-4 flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400')} data-aos='fade-up' data-aos-delay='300'>
                    <LockIcon />
                    {project.codeNote}
                </p>
            </section>

            {preview}

            {project.usedBy?.length > 0 &&
                <section className={classNames(styles.section__style)} id='used-by'>
                    <h2 className={titleClass} data-aos='fade-up'>Who uses {project.name} today?</h2>
                    <p className={classNames(textClass, 'mb-8')} data-aos='fade-up'>{project.usedByIntro}</p>
                    <ul className={classNames('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4')}>
                        {project.usedBy.map((client, key) => (
                            <li key={client.name} data-aos='fade-up' data-aos-delay={`${(key % 3) * 100}`}>
                                <a href={client.url} target='_blank' rel='noopener' className={classNames('flex h-full items-center justify-between gap-3 rounded-xl border border-gray-200 dark:border-gray-700/80 bg-white/70 dark:bg-gray-800/40 px-5 py-4 transition hover:border-sky-500/70')}>
                                    <span>
                                        <span className={classNames('block text-base font-semibold text-gray-800 dark:text-gray-200')}>{client.name}</span>
                                        <span className={classNames('block text-sm text-gray-500 dark:text-gray-400')}>{client.note}</span>
                                    </span>
                                    <span className={classNames('text-sky-500')} aria-hidden="true">↗</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>}

            <section className={classNames(styles.section__style)} id='features'>
                <h2 className={titleClass} data-aos='fade-up'>What does {project.name} include?</h2>
                <p className={classNames(textClass, 'mb-10')} data-aos='fade-up'>{project.partsIntro}</p>
                <ul className={classNames('grid grid-cols-1 md:grid-cols-2 gap-5', gridCols)}>
                    {project.parts.map((part, key) => (
                        <li key={`part-${key}`} data-aos='fade-up' data-aos-delay={`${(key % 3) * 100}`}>
                            <div className={classNames(cardClass)}>
                                <div className={classNames('mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-sky-500/10 text-sky-500 ring-1 ring-sky-500/20 transition-colors duration-300 group-hover:bg-sky-500 group-hover:text-white')}>
                                    <ServiceIcon name={part.icon} />
                                </div>
                                <h3 className={classNames('text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1')}>{part.title}</h3>
                                <p className={classNames('text-sm font-medium text-gray-500 dark:text-gray-400 mb-4')}>{part.description}</p>
                                <ul className={classNames('space-y-2')}>
                                    {part.features.map(feature => (
                                        <li key={feature} className={classNames('flex gap-2 text-sm leading-6 text-gray-600 dark:text-gray-300')}><CheckIcon />{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <section className={classNames(styles.section__style)} id='who-is-it-for'>
                <h2 className={titleClass} data-aos='fade-up'>Who is it for?</h2>
                <p className={classNames(textClass, 'mb-8')} data-aos='fade-up'>{project.audienceIntro}</p>
                <ul className={classNames('space-y-3')}>
                    {project.audience.map(item => (
                        <li key={item} className={classNames('flex gap-3 text-base font-medium text-gray-600 dark:text-gray-300')} data-aos='fade-up'><CheckIcon />{item}</li>
                    ))}
                </ul>
            </section>

            {project.techStack?.length > 0 &&
                <section className={classNames(styles.section__style)} id='tech'>
                    <h2 className={titleClass} data-aos='fade-up'>How is it built?</h2>
                    <p className={classNames(textClass, 'mb-8')} data-aos='fade-up'>{project.techIntro}</p>
                    <ul className={classNames('flex flex-wrap gap-3')} data-aos='fade-up'>
                        {project.techStack.map(tech => (
                            <li key={tech} className={classNames('rounded-full border border-sky-500/40 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-600 dark:text-sky-400')}>{tech}</li>
                        ))}
                    </ul>
                </section>}

            <section className={classNames(styles.section__style)} id='demo'>
                <h2 className={titleClass} data-aos='fade-up'>How does a demo work?</h2>
                <p className={classNames(textClass, 'mb-14')} data-aos='fade-up'>{project.codeNote}</p>
                <div className={classNames('relative')}>
                    <div aria-hidden="true" className={classNames('hidden md:block absolute top-7 left-[16.6%] right-[16.6%] h-0.5 bg-gradient-to-r from-sky-500/20 via-sky-500/70 to-sky-500/20')} />
                    <ol className={classNames('relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6')}>
                        {project.demoSteps.map((step, key) => (
                            <li key={`demo-step-${key}`} className={classNames('relative flex gap-5 md:flex-col md:items-center md:text-center')} data-aos='fade-up' data-aos-delay={`${key * 150}`}>
                                {key < project.demoSteps.length - 1 &&
                                    <span aria-hidden="true" className={classNames('md:hidden absolute left-7 top-14 -bottom-10 w-0.5 -translate-x-1/2 bg-sky-500/40')} />}
                                <div className={classNames('relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-sky-500 bg-white dark:bg-gray-900 text-lg font-bold text-sky-500 shadow-lg shadow-sky-500/20')}>
                                    {String(key + 1).padStart(2, '0')}
                                </div>
                                <div className={classNames('md:mt-6 md:px-2')}>
                                    <h3 className={classNames('text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2')}>{step.title}</h3>
                                    <p className={classNames('text-sm leading-6 font-medium text-gray-500 dark:text-gray-400')}>{step.description}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className={classNames(styles.section__style)} id='faq'>
                <h2 className={titleClass} data-aos='fade-up'>Questions about {project.name}</h2>
                <FaqAccordion items={project.faq} idPrefix={`${project.slug}-faq`} />
            </section>

            <section className={classNames(styles.section__style, 'flex flex-col items-center text-center')} id='contact'>
                <h2 className={classNames('text-3xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-5')} data-aos='fade-up'>Want to see it running?</h2>
                <p className={classNames('text-lg font-medium text-gray-500 dark:text-gray-400 mb-6 md:w-2/3')} data-aos='fade-up' data-aos-delay='100'>{project.demoCta}</p>
                <div className={classNames('w-full max-w-3xl rounded-2xl border border-gray-200 dark:border-gray-700/80 bg-white/70 dark:bg-gray-800/40 p-6 md:p-10')}>
                    <EnquiryForm defaultProjectType={`${project.name} demo`} submitLabel='Request a live demo' />
                </div>
                <p className={classNames(textClass, 'mt-8')}>Prefer email? Write to <a href={MAILTO} className='text-sky-500 hover:text-sky-600 hover:underline'>{EMAIL}</a> · <Link href='/freelance' className='text-sky-500 hover:underline'>See my other freelance work</Link></p>
            </section>

            <div className={classNames('pb-5')}>
                <DeveloperCredit />
            </div>
        </div>
    );
};

export default ProductPage;
