import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import styles from '../../page.module.css';
import archiveStyles from '../../archive/style.module.css';
import project from '@/components/projects/coworkspace.json';
import FaqAccordion from '@/components/FaqAccordion';
import ServiceIcon from '@/components/freelance/ServiceIcon';
import DeveloperCredit from '@/components/homePageSections/DeveloperCredit';

const SITE_URL = 'https://www.nikhilvishwakarma.com';
const PAGE_PATH = `/projects/${project.slug}`;
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const EMAIL = 'vnikhil3101@gmail.com';
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(`${project.name} demo request`)}`;

export const metadata = {
    title: `${project.name} – Platform for Coworking Businesses | Nikhil Vishwakarma`,
    description: project.metaDescription,
    alternates: {
        canonical: PAGE_PATH,
    },
    openGraph: {
        title: project.title,
        description: project.metaDescription,
        url: PAGE_URL,
        siteName: 'Nikhil Vishwakarma',
        images: [`${SITE_URL}${project.image}`],
        locale: 'en_US',
        type: 'website',
    },
};

const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'SoftwareApplication',
            '@id': `${PAGE_URL}#app`,
            name: project.name,
            url: PAGE_URL,
            description: project.summary,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            image: `${SITE_URL}${project.image}`,
            author: { '@id': `${SITE_URL}/#person` },
            featureList: project.parts.flatMap(part => part.features),
        },
        {
            '@type': 'FAQPage',
            '@id': `${PAGE_URL}#faq`,
            url: PAGE_URL,
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
                { '@type': 'ListItem', position: 3, name: project.name, item: PAGE_URL },
            ],
        },
    ],
};

const buttonClass = 'inline-block px-6 py-4 me-2 mb-2 text-sm font-medium text-sky-500 focus:outline-none bg-white rounded-lg border border-sky-500 hover:bg-gray-100 hover:text-sky-600 hover:border-sky-600 focus:z-10 focus:ring-4 focus:ring-transparent dark:bg-transparent hover:dark:bg-sky-900';
const solidButtonClass = 'inline-block px-6 py-4 me-2 mb-2 text-sm font-medium text-white bg-sky-500 rounded-lg border border-sky-500 hover:bg-sky-600 hover:border-sky-600 focus:outline-none';
const titleClass = classNames(styles.section__title, 'text-2xl text-gray-800 dark:text-gray-200 font-bold');
const textClass = 'text-base font-medium text-gray-500 dark:text-gray-400';

const CheckIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-sky-500" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);

const CoworkspaceProject = () => {
    return (
        <div className={classNames('mx-auto')} style={{ maxWidth: 1000 }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <section className={classNames(archiveStyles.archive__banner_wrap)}>
                <nav aria-label="Breadcrumb" className={classNames('text-sm font-medium text-gray-500 dark:text-gray-400 mb-6')} data-aos='fade-up' data-aos-delay='100'>
                    <Link href='/' className='hover:text-sky-500'>Home</Link>
                    <span className='mx-2'>/</span>
                    <Link href='/freelance' className='hover:text-sky-500'>Freelance</Link>
                    <span className='mx-2'>/</span>
                    <span className='text-sky-500'>{project.name}</span>
                </nav>
                <p className={classNames('inline-block text-xs font-semibold uppercase tracking-widest text-sky-500 border border-sky-500 rounded-full px-3 py-1 mb-5')} data-aos='fade-up' data-aos-delay='120'>Product · Ready to customize</p>
                <h1 className={classNames(archiveStyles.main_heading__txt, 'text-gray-800 dark:text-gray-200 font-bold mb-6')} data-aos='fade-up' data-aos-delay='150'>{project.title}.</h1>
                <p className={classNames(textClass, 'md:w-3/4 mb-8')} data-aos='fade-up' data-aos-delay='200'>{project.summary}</p>
                <div data-aos='fade-up' data-aos-delay='250'>
                    <a href={MAILTO} className={solidButtonClass} title={`Email ${EMAIL} to request a demo`}>Request a live demo</a>
                    <a href={project.websiteUrl} target='_blank' rel='noopener' className={buttonClass} title='Open the Coworkspace public website'>View the public website</a>
                </div>
                <p className={classNames('mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400')} data-aos='fade-up' data-aos-delay='300'>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
                    {project.codeNote}
                </p>
            </section>

            <figure className={classNames('mb-10')} data-aos='zoom-in'>
                <div className={classNames('overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-2xl shadow-sky-500/10')}>
                    <div className={classNames('flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-4 py-3')} aria-hidden="true">
                        <span className='h-3 w-3 rounded-full bg-red-400' /><span className='h-3 w-3 rounded-full bg-yellow-400' /><span className='h-3 w-3 rounded-full bg-green-400' />
                        <span className='ml-3 truncate rounded bg-white dark:bg-gray-900 px-3 py-0.5 text-xs text-gray-500 dark:text-gray-400'>coworkspace.nikhilvishwakarma.com</span>
                    </div>
                    <Image src={project.image} alt={project.imageAlt} width={1440} height={900} sizes='(max-width: 1000px) 100vw, 1000px' className='h-auto w-full' priority />
                </div>
                <figcaption className={classNames('mt-3 text-center text-sm text-gray-500 dark:text-gray-400')}>The public website. The client portal and admin panel are shown in the live demo.</figcaption>
            </figure>

            <section className={classNames(styles.section__style)} id='features'>
                <h2 className={titleClass} data-aos='fade-up'>What does Coworkspace include?</h2>
                <p className={classNames(textClass, 'mb-10')} data-aos='fade-up'>Three connected parts that cover the whole business, from the first enquiry to the invoice.</p>
                <ul className={classNames('grid grid-cols-1 lg:grid-cols-3 gap-5')}>
                    {project.parts.map((part, key) => (
                        <li key={`part-${key}`} data-aos='fade-up' data-aos-delay={`${key * 100}`}>
                            <div className={classNames('group h-full rounded-xl border border-gray-200 dark:border-gray-700/80 bg-white/70 dark:bg-gray-800/40 p-6 transition duration-300 hover:-translate-y-1 hover:border-sky-500/70 hover:shadow-xl hover:shadow-sky-500/10')}>
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
                <p className={classNames(textClass, 'mb-8')} data-aos='fade-up'>Coworkspace is built for businesses that rent desks, offices or meeting rooms and want one system for enquiries, bookings and billing.</p>
                <ul className={classNames('space-y-3')}>
                    {project.audience.map(item => (
                        <li key={item} className={classNames('flex gap-3 text-base font-medium text-gray-600 dark:text-gray-300')} data-aos='fade-up'><CheckIcon />{item}</li>
                    ))}
                </ul>
            </section>

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
                <h2 className={titleClass} data-aos='fade-up'>Questions about Coworkspace</h2>
                <FaqAccordion items={project.faq} idPrefix='coworkspace-faq' />
            </section>

            <section className={classNames(styles.section__style, 'flex flex-col items-center text-center')} id='contact'>
                <h2 className={classNames('text-3xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-5')} data-aos='fade-up'>Want to see it running?</h2>
                <p className={classNames('text-lg font-medium text-gray-500 dark:text-gray-400 mb-6 md:w-2/3')} data-aos='fade-up' data-aos-delay='100'>Email me and I will set up a live demo of the website, client portal and admin panel.</p>
                <p className={classNames(textClass, 'mb-8')} data-aos='fade-up' data-aos-delay='150'>Email: <a href={MAILTO} className='text-sky-500 hover:text-sky-600 hover:underline'>{EMAIL}</a></p>
                <div data-aos='fade-up' data-aos-delay='200'>
                    <a href={MAILTO} className={solidButtonClass} title={`Email ${EMAIL} to request a demo`}>Request a live demo</a>
                    <Link href='/freelance' className={buttonClass}>See my other freelance work</Link>
                </div>
            </section>

            <div className={classNames('pb-5')}>
                <DeveloperCredit />
            </div>
        </div>
    );
};

export default CoworkspaceProject;
