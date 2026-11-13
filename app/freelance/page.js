import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import styles from '../page.module.css';
import archiveStyles from '../archive/style.module.css';
import cardStyles from '@/components/homePageSections/style.module.css';
import freelance from '@/components/freelance.json';
import projectsList from '@/components/projectsList.json';
import { isValidValue } from '@/components/commonFunctions';
import IconAssests from '@/components/svgAssests/IconAssests';
import Color from '@/constants/color';
import DeveloperCredit from '@/components/homePageSections/DeveloperCredit';
import FaqAccordion from '@/components/FaqAccordion';
import EnquiryButton from '@/components/EnquiryForm';
import ServiceIcon from '@/components/freelance/ServiceIcon';

const SITE_URL = 'https://www.nikhilvishwakarma.com';
const PAGE_URL = `${SITE_URL}/freelance`;
const EMAIL = 'vnikhil3101@gmail.com';
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent('Website project enquiry')}`;
const DESCRIPTION = 'Freelance web and app developer in Mumbai. I turn business problems into working products: websites, web apps, mobile apps and SaaS, for any industry.';

export const metadata = {
    title: 'Freelance Web & App Developer in Mumbai | Nikhil Vishwakarma',
    description: DESCRIPTION,
    alternates: {
        canonical: '/freelance',
    },
    openGraph: {
        title: 'Freelance Web & App Developer in Mumbai | Nikhil Vishwakarma',
        description: DESCRIPTION,
        url: PAGE_URL,
        siteName: 'Nikhil Vishwakarma',
        images: ['https://ik.imagekit.io/vishwakarmanikhil/portfolio-v2/og.png'],
        locale: 'en_US',
        type: 'website',
    },
};

const products = [
    {
        slug: 'enquiro',
        name: 'Enquiro',
        tagline: 'For real estate and sales teams',
        blurb: 'All your website enquiries in one admin panel: filters, Excel export, allocation to employees, comments and status updates. Used by all my real estate clients.',
    },
    {
        slug: 'coworkspace',
        name: 'Coworkspace',
        tagline: 'For coworking businesses',
        blurb: 'A public website, a client portal for meeting-room booking, and an admin panel to manage clients and email invoices.',
    },
];

const toDate = d => new Date(d.split('-').reverse().join('-'));

const clientProjects = projectsList
    .filter(p => p.category === 'freelance')
    .sort((a, b) => toDate(b.createdDate) - toDate(a.createdDate));

const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'ProfessionalService',
            '@id': `${PAGE_URL}#service`,
            name: 'Nikhil Vishwakarma – Freelance Web Development',
            url: PAGE_URL,
            description: DESCRIPTION,
            image: 'https://ik.imagekit.io/vishwakarmanikhil/portfolio-v2/person.png',
            email: `mailto:${EMAIL}`,
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Mumbai',
                addressRegion: 'Maharashtra',
                addressCountry: 'IN',
            },
            founder: { '@id': `${SITE_URL}/#person` },
            hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Web development services',
                itemListElement: freelance.services.map(s => ({
                    '@type': 'Offer',
                    itemOffered: { '@type': 'Service', name: s.title, description: s.description },
                })),
            },
        },
        {
            '@type': 'FAQPage',
            '@id': `${PAGE_URL}#faq`,
            url: PAGE_URL,
            mainEntity: freelance.faq.map(item => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
        },
    ],
};

const buttonClass = 'inline-block px-6 py-4 me-2 mb-2 text-sm font-medium text-sky-500 focus:outline-none bg-white rounded-lg border border-sky-500 hover:bg-gray-100 hover:text-sky-600 hover:border-sky-600 focus:z-10 focus:ring-4 focus:ring-transparent dark:bg-transparent hover:dark:bg-sky-900';
const titleClass = classNames(styles.section__title, 'text-2xl text-gray-800 dark:text-gray-200 font-bold');
const textClass = 'text-base font-medium text-gray-500 dark:text-gray-400';

const Freelance = () => {
    return (
        <div className={classNames('mx-auto')} style={{ maxWidth: 1000 }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <section className={classNames(archiveStyles.archive__banner_wrap)}>
                <p className={classNames('text-sm font-medium text-sky-500 mb-5')} data-aos='fade-up' data-aos-delay='100'>Freelance</p>
                <h1 className={classNames(archiveStyles.main_heading__txt, 'text-gray-800 dark:text-gray-200 font-bold mb-6')} data-aos='fade-up' data-aos-delay='150'>Freelance web and app developer in Mumbai.</h1>
                <p className={classNames(textClass, 'md:w-2/3 mb-8')} data-aos='fade-up' data-aos-delay='200'>
                    I turn business problems into working products: websites, web apps, mobile apps and SaaS, for any industry. I have 5+ years of experience building products end to end as a full-stack developer, and I have delivered projects for {clientProjects.length} clients since 2021.
                </p>
                <div data-aos='fade-up' data-aos-delay='250'>
                    <EnquiryButton label='Tell me about your project' className={buttonClass} />
                    <a href='#client-work' className={buttonClass} title='See client work'>See client work</a>
                </div>
            </section>

            <section className={classNames(styles.section__style)} id='services'>
                <h2 className={titleClass} data-aos='fade-up'>What can I build for your business?</h2>
                <p className={classNames(textClass, 'mb-10')} data-aos='fade-up'>{freelance.servicesIntro}</p>
                <ul className={classNames('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5')}>
                    {freelance.services.map((service, key) => (
                        <li key={`service-${key}`} data-aos='fade-up' data-aos-delay={`${(key % 3) * 100}`}>
                            <div className={classNames('group relative h-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700/80 bg-white/70 dark:bg-gray-800/40 p-6 transition duration-300 hover:-translate-y-1 hover:border-sky-500/70 hover:shadow-xl hover:shadow-sky-500/10')}>
                                <span aria-hidden="true" className={classNames('absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-sky-500/0 via-sky-500 to-sky-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100')} />
                                <div className={classNames('mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-sky-500/10 text-sky-500 ring-1 ring-sky-500/20 transition-colors duration-300 group-hover:bg-sky-500 group-hover:text-white')}>
                                    <ServiceIcon name={service.icon} />
                                </div>
                                <h3 className={classNames('text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2')}>{service.title}</h3>
                                <p className={classNames('text-sm leading-6 font-medium text-gray-500 dark:text-gray-400')}>{service.description}</p>
                                {service.tags?.length > 0 &&
                                    <ul className={classNames('mt-5 flex flex-wrap gap-2')}>
                                        {service.tags.map(tag => (
                                            <li key={`${service.icon}-${tag}`} className={classNames('rounded-full bg-gray-100 dark:bg-gray-900/70 px-3 py-1 text-xs font-medium text-sky-600 dark:text-sky-400')}>{tag}</li>
                                        ))}
                                    </ul>}
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <section className={classNames('pb-10')} id='products'>
                <div className={classNames('relative overflow-hidden rounded-2xl border border-sky-500/40 bg-gradient-to-br from-sky-500/10 via-transparent to-sky-500/5 p-8 md:p-10')} data-aos='fade-up'>
                    <p className={classNames('inline-block text-xs font-semibold uppercase tracking-widest text-sky-500 border border-sky-500 rounded-full px-3 py-1 mb-4')}>Ready-made products</p>
                    <h2 className={classNames('text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-3')}>Need it working sooner? Start from a ready product.</h2>
                    <p className={classNames(textClass, 'md:w-3/4 mb-8')}>These are complete systems I have built and can set up for your business with your branding and data. Both come with a live demo.</p>
                    <ul className={classNames('grid grid-cols-1 md:grid-cols-2 gap-5')}>
                        {products.map(product => (
                            <li key={product.slug}>
                                <Link href={`/projects/${product.slug}`} className={classNames('group flex h-full flex-col rounded-xl border border-gray-200 dark:border-gray-700/80 bg-white/80 dark:bg-gray-900/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-sky-500/70 hover:shadow-xl hover:shadow-sky-500/10')}>
                                    <span className={classNames('text-xs font-semibold uppercase tracking-widest text-sky-500 mb-2')}>{product.tagline}</span>
                                    <span className={classNames('text-xl font-bold text-gray-800 dark:text-gray-200 mb-2')}>{product.name}</span>
                                    <span className={classNames('text-sm leading-6 font-medium text-gray-500 dark:text-gray-400 mb-5')}>{product.blurb}</span>
                                    <span className={classNames('mt-auto text-sm font-semibold text-sky-500 group-hover:text-sky-600')}>See {product.name} and request a demo →</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className={classNames(styles.section__style)} id='client-work'>
                <h2 className={titleClass} data-aos='fade-up'>Which businesses have I worked with?</h2>
                <p className={classNames(textClass)} data-aos='fade-up'>These are websites and apps I built for freelance clients. For my full-time work, see <Link href='/#work' className='text-sky-500 hover:text-sky-600 hover:underline'>my main projects</Link>, or browse <Link href='/archive' className='text-sky-500 hover:text-sky-600 hover:underline'>every project in the archive</Link>.</p>
                <ul className={classNames(cardStyles.other_project__list)}>
                    {clientProjects.map((data, key) => (
                        <li key={`client-project-${data.key}`} className={classNames(cardStyles.other_project__item, 'p-5 md:p-7 bg-slate-700 dark:bg-slate-700 rounded-md')} data-aos='fade-up' data-aos-delay={`${(key % 3) * 100}`}>
                            <div className='flex flex-row items-center justify-between mb-5'>
                                <p className={classNames('text-xs font-medium text-sky-400')}>{data.companyName || 'Client project'} · {data.createdDate.split('-')[2]}</p>
                                {isValidValue(data.projectLink) &&
                                    <a href={data.projectLink} title={`${data.title} live site`} target='_blank' rel='noopener' className={classNames('z-10')}><IconAssests.LinkOutlineIcon height='22' width='22' filledColor={Color.iconDark} /></a>}
                            </div>
                            <h3 className={classNames(cardStyles.opi_title__txt, 'block text-xl font-bold text-gray-100 dark:text-gray-300 mb-4')}>
                                {isValidValue(data.projectLink)
                                    ? <a href={data.projectLink} target='_blank' rel='noopener' className={classNames(cardStyles.opi_redirect__link)}>{data.title}</a>
                                    : <span>{data.title}</span>}
                            </h3>
                            <p className={classNames('text-sm font-normal text-gray-300 dark:text-gray-400')}>{data.description}</p>
                            {isValidValue(data.technology) &&
                                <p className={classNames('text-xs font-light text-gray-400 mt-5')}>{data.technology.split(',').map(t => t.trim()).join(' · ')}</p>}
                        </li>
                    ))}
                </ul>
            </section>

            <section className={classNames(styles.section__style)} id='process'>
                <h2 className={titleClass} data-aos='fade-up'>How does a project work?</h2>
                <p className={classNames(textClass, 'mb-14')} data-aos='fade-up'>Four steps, with a written scope and price agreed before any work starts.</p>
                <div className={classNames('relative')}>
                    <div aria-hidden="true" className={classNames('hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-sky-500/20 via-sky-500/70 to-sky-500/20')} />
                    <ol className={classNames('relative grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6')}>
                        {freelance.process.map((step, key) => (
                            <li key={`step-${key}`} className={classNames('relative flex gap-5 md:flex-col md:items-center md:text-center')} data-aos='fade-up' data-aos-delay={`${key * 150}`}>
                                {key < freelance.process.length - 1 &&
                                    <span aria-hidden="true" className={classNames('md:hidden absolute left-7 top-14 -bottom-10 w-0.5 -translate-x-1/2 bg-sky-500/40')} />}
                                <div className={classNames('relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-sky-500 bg-white dark:bg-gray-900 text-lg font-bold text-sky-500 shadow-lg shadow-sky-500/20')}>
                                    {String(key + 1).padStart(2, '0')}
                                </div>
                                <div className={classNames('md:mt-6 md:px-2')}>
                                    <p className={classNames('text-xs font-semibold uppercase tracking-widest text-sky-500 mb-1')}>Step {key + 1}</p>
                                    <h3 className={classNames('text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2')}>{step.title}</h3>
                                    <p className={classNames('text-sm leading-6 font-medium text-gray-500 dark:text-gray-400')}>{step.description}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className={classNames(styles.section__style)} id='faq'>
                <h2 className={titleClass} data-aos='fade-up'>Questions clients ask</h2>
                <FaqAccordion items={freelance.faq} idPrefix='client-faq' />
            </section>

            <section className={classNames(styles.section__style, 'flex flex-col items-center text-center')} id='contact'>
                <h2 className={classNames('text-3xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-5')} data-aos='fade-up'>Have a project in mind?</h2>
                <p className={classNames('text-lg font-medium text-gray-500 dark:text-gray-400 mb-6 md:w-2/3')} data-aos='fade-up' data-aos-delay='100'>Send me a few lines about your business and what you need. I will reply to set up a short call.</p>
                <EnquiryButton
                    label='Start a project'
                    submitLabel='Send my enquiry'
                    autoOpenHash
                    className={classNames('relative z-10 rounded-lg bg-sky-500 px-8 py-4 text-base font-semibold text-white hover:bg-sky-600')}
                />
                <p className={classNames(textClass, 'mt-8')}>Prefer email? Write to <a href={MAILTO} className='text-sky-500 hover:text-sky-600 hover:underline'>{EMAIL}</a></p>
            </section>

            <div className={classNames('pb-5')}>
                <DeveloperCredit />
            </div>
        </div>
    );
};

export default Freelance;
