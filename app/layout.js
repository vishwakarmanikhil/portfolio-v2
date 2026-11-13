import './globals.css';
import { Lexend } from 'next/font/google';
import Header from '@/components/header';
import Providers from './providers';
import classNames from 'classnames';
import SocialMenu from '@/components/ContactMenu/SocialMenu';
import EmailManu from '@/components/ContactMenu/EmailManu';
import Loader from './loader';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import workExperience from '@/components/homePageSections/workExperience.json';
import faqList from '@/components/homePageSections/faq.json';

const lexend = Lexend({ subsets: ['latin'] });

export const viewport = {
  themeColor: '#111827',
}

export const metadata = {
  metadataBase: new URL('https://www.nikhilvishwakarma.com'),
  alternates: {
    canonical: '/',
    types: {
      'text/markdown': '/llms.txt',
    },
  },
  title: 'Nikhil Vishwakarma | Full-Stack Engineer',
  description: 'Full-Stack Engineer with 5+ years building production SaaS and healthcare products with React, Next.js, Node.js, TypeScript, AWS and LLM-powered workflows.',
  icons: {
    icon: 'https://ik.imagekit.io/vishwakarmanikhil/portfolio-v2/favicon/favicon-16x16.png',
    shortcut: 'https://ik.imagekit.io/vishwakarmanikhil/portfolio-v2/favicon/favicon-32x32.png',
    apple: 'https://ik.imagekit.io/vishwakarmanikhil/portfolio-v2/favicon/apple-touch-icon.png',
    other: {
      rel: 'mask-icon',
      url: 'https://ik.imagekit.io/vishwakarmanikhil/portfolio-v2/favicon/safari-pinned-tab.svg',
      color: '#1BA5E9',
    },
  },
  manifest: '/site.webmanifest',
  twitter: {
    card: 'summary_large_image',
    title: 'Nikhil Vishwakarma | Full-Stack Engineer',
    description: 'Full-Stack Engineer with 5+ years building production SaaS and healthcare products with React, Next.js, Node.js, TypeScript, AWS and LLM-powered workflows.',
    creator: '@vishwakarmanikhil',
    images: ['https://ik.imagekit.io/vishwakarmanikhil/portfolio-v2/og.png'],
  },
  openGraph: {
    title: 'Nikhil Vishwakarma | Full-Stack Engineer',
    description: 'Full-Stack Engineer with 5+ years building production SaaS and healthcare products with React, Next.js, Node.js, TypeScript, AWS and LLM-powered workflows.',
    url: 'https://www.nikhilvishwakarma.com',
    siteName: 'Nikhil Vishwakarma',
    images: ['https://ik.imagekit.io/vishwakarmanikhil/portfolio-v2/og.png'],
    locale: 'en_US',
    type: 'website',
  },
  other: {
    author: 'Nikhil Vishwakarma',
  },
  verification: {
    google: 'KK0pw48bFRbf5iwW7yHi5JDOEoP_bYxG1SXs1iPff9o'
  }
}

const SITE_URL = 'https://www.nikhilvishwakarma.com';
const PERSON_ID = `${SITE_URL}/#person`;
const currentJob = workExperience[0];

const allSkills = [...new Set(
  workExperience.flatMap(job =>
    job.jobSkills?.split(',').map(s => s.trim()).filter(Boolean) ?? []
  )
)];

// Past and current employers, de-duplicated by name.
const employers = [...new Map(
  workExperience.map(job => [job.companyName, {
    '@type': 'Organization',
    name: job.companyName,
    url: job.companyURL,
  }])
).values()];

const person = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Nikhil Vishwakarma',
  url: SITE_URL,
  image: 'https://ik.imagekit.io/vishwakarmanikhil/portfolio-v2/person.png',
  jobTitle: 'Full-Stack Engineer',
  description: 'Full-Stack Engineer with 5+ years building production SaaS and healthcare products with React, Next.js, Node.js, TypeScript, AWS and LLM-powered workflows.',
  email: 'mailto:vnikhil3101@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://github.com/vishwakarmanikhil',
    'https://www.linkedin.com/in/vishwakarmanikhil/',
    'https://www.facebook.com/profile.php?id=100047871463007',
    'https://www.instagram.com/nikhil_vishwakarma__/',
  ],
  ...(!currentJob.isoEnd && {
    worksFor: {
      '@type': 'Organization',
      name: currentJob.companyName,
      url: currentJob.companyURL,
    },
  }),
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'Thakur College of Engineering & Technology, University of Mumbai',
    },
    ...employers,
  ],
  knowsAbout: allSkills,
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Full-Stack Engineer',
    skills: allSkills.join(', '),
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'Nikhil Vishwakarma',
      url: SITE_URL,
      inLanguage: 'en',
      publisher: { '@id': PERSON_ID },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: 'Nikhil Vishwakarma | Full-Stack Engineer',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: { '@id': PERSON_ID },
    },
    person,
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      url: SITE_URL,
      mainEntity: faqList.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true} className="dark">
      <head>
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WB7QFKFZ');`}
        </Script>
      </head>
      <body suppressHydrationWarning={true} className={classNames(lexend.className, "dark:bg-gray-800")}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WB7QFKFZ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <div className='bg__overlay'></div>
        <Providers>
          <Loader>
            <Header />
            <SocialMenu
              source='sideMenu'
            />
            <main className={classNames('main__wrapper', 'bg-white dark:bg-gray-900')}>
              {children}
            </main>
            <EmailManu />
          </Loader>
        </Providers>
        <GoogleAnalytics gaId="G-MLXN9M48Q2" />
      </body>
    </html>
  )
}
