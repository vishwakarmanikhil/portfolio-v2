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

const SITE_URL = 'https://www.nikhilvishwakarma.com';
const PAGE_URL = `${SITE_URL}/freelance`;
const EMAIL = 'vnikhil3101@gmail.com';
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent('Website project enquiry')}`;
const DESCRIPTION = 'Freelance web developer in Mumbai building fast, SEO-ready websites and web apps for real estate firms, service businesses, agencies and professionals.';

export const metadata = {
    title: 'Freelance Web Developer in Mumbai | Nikhil Vishwakarma',
    description: DESCRIPTION,
    alternates: {
        canonical: '/freelance',
    },
    openGraph: {
        title: 'Freelance Web Developer in Mumbai | Nikhil Vishwakarma',
        description: DESCRIPTION,
        url: PAGE_URL,
        siteName: 'Nikhil Vishwakarma',
        images: ['https://ik.imagekit.io/vishwakarmanikhil/portfolio-v2/og.png'],
        locale: 'en_US',
        type: 'website',
    },
};

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
                <h1 className={classNames(archiveStyles.main_heading__txt, 'text-gray-800 dark:text-gray-200 font-bold mb-6')} data-aos='fade-up' data-aos-delay='150'>Freelance web developer in Mumbai.</h1>
                <p className={classNames(textClass, 'md:w-2/3 mb-8')} data-aos='fade-up' data-aos-delay='200'>
                    I build fast, SEO-ready websites and web apps for small businesses: real estate firms, service businesses, agencies and professionals. I have 5+ years of experience as a full-stack engineer, and I have delivered projects for {clientProjects.length} clients since 2021.
                </p>
                <div data-aos='fade-up' data-aos-delay='250'>
                    <a href={MAILTO} className={buttonClass} title={`Email ${EMAIL}`}>Email me about your project</a>
                    <a href='#client-work' className={buttonClass} title='See client work'>See client work</a>
                </div>
            </section>

            <section className={classNames(styles.section__style)} id='services'>
                <h2 className={titleClass} data-aos='fade-up'>What can I build for your business?</h2>
                <p className={classNames(textClass, 'mb-10')} data-aos='fade-up'>Websites and web apps that load fast, work well on phones, and help customers find and contact you.</p>
                <ul className={classNames('grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8')}>
                    {freelance.services.map((service, key) => (
                        <li key={`service-${key}`} data-aos='fade-up' data-aos-delay={`${(key % 2) * 100}`}>
                            <h3 className={classNames('text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2')}>{service.title}</h3>
                            <p className={textClass}>{service.description}</p>
                        </li>
                    ))}
                </ul>
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
                <p className={classNames(textClass, 'mb-10')} data-aos='fade-up'>Four steps, with a written scope and price agreed before any work starts.</p>
                <ol className={classNames('grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8')}>
                    {freelance.process.map((step, key) => (
                        <li key={`step-${key}`} data-aos='fade-up' data-aos-delay={`${(key % 2) * 100}`}>
                            <h3 className={classNames('text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2')}><span className='text-sky-500'>{key + 1}.</span> {step.title}</h3>
                            <p className={textClass}>{step.description}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <section className={classNames(styles.section__style)} id='faq'>
                <h2 className={titleClass} data-aos='fade-up'>Questions clients ask</h2>
                <div className={classNames('grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8')}>
                    {freelance.faq.map((item, key) => (
                        <div key={`freelance-faq-${key}`} data-aos='fade-up' data-aos-delay={`${(key % 2) * 100}`}>
                            <h3 className={classNames('text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2')}>{item.question}</h3>
                            <p className={textClass}>{item.answer}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className={classNames(styles.section__style, 'flex flex-col items-center text-center')} id='contact'>
                <h2 className={classNames('text-3xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-5')} data-aos='fade-up'>Have a project in mind?</h2>
                <p className={classNames('text-lg font-medium text-gray-500 dark:text-gray-400 mb-6 md:w-2/3')} data-aos='fade-up' data-aos-delay='100'>Send me a few lines about your business and what you need. I will reply to set up a short call.</p>
                <p className={classNames(textClass, 'mb-8')} data-aos='fade-up' data-aos-delay='150'>Email: <a href={MAILTO} className='text-sky-500 hover:text-sky-600 hover:underline'>{EMAIL}</a></p>
                <a href={MAILTO} className={buttonClass} data-aos='fade-up' data-aos-delay='200' title={`Email ${EMAIL}`}>Start a project</a>
            </section>

            <div className={classNames('pb-5')}>
                <DeveloperCredit />
            </div>
        </div>
    );
};

export default Freelance;
