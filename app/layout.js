import './globals.css';
import { Lexend } from 'next/font/google';
import Header from '@/components/header';
import Providers from './providers';
import classNames from 'classnames';
import { AOSInit } from '@/components/AOSInit';
import SocialMenu from '@/components/ContactMenu/SocialMenu';
import EmailManu from '@/components/ContactMenu/EmailManu';
import Loader from './loader';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import workExperience from '@/components/homePageSections/workExperience.json';

const lexend = Lexend({ subsets: ['latin'] });

export const viewport = {
  themeColor: '#111827',
}

export const metadata = {
  metadataBase: new URL('https://nikhilvishwakarma.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  title: 'Nikhil Vishwakarma | Software Developer',
  description: 'Experienced software engineer dedicated to building, researching, and getting things done.',
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
    title: 'Nikhil Vishwakarma | Software Developer',
    description: 'Experienced software engineer dedicated to building, researching, and getting things done.',
    creator: '@vishwakarmanikhil',
    images: ['https://ik.imagekit.io/vishwakarmanikhil/portfolio-v2/og.png'],
  },
  openGraph: {
    title: 'Nikhil Vishwakarma | Software Developer',
    description: 'Experienced software engineer dedicated to building, researching, and getting things done.',
    url: 'https://nikhilvishwakarma.com',
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

const currentJob = workExperience[0];

const allSkills = [...new Set(
  workExperience.flatMap(job =>
    job.jobSkills?.split(',').map(s => s.trim()).filter(Boolean) ?? []
  )
)];

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Nikhil Vishwakarma',
  url: 'https://nikhilvishwakarma.com',
  image: 'https://ik.imagekit.io/vishwakarmanikhil/portfolio-v2/person.png',
  jobTitle: currentJob.position,
  description: 'Experienced software engineer dedicated to building, researching, and getting things done.',
  email: 'vnikhil3101@gmail.com',
  sameAs: [
    'https://github.com/vishwakarmanikhil',
    'https://www.linkedin.com/in/vishwakarmanikhil/',
    'https://www.facebook.com/profile.php?id=100047871463007',
    'https://www.instagram.com/nikhil_vishwakarma__/',
  ],
  worksFor: {
    '@type': 'Organization',
    name: currentJob.companyName,
    url: currentJob.companyURL,
  },
  knowsAbout: allSkills,
  hasOccupation: workExperience.map(job => ({
    '@type': 'Role',
    roleName: job.position,
    startDate: job.isoStart,
    ...(job.isoEnd && { endDate: job.isoEnd }),
    hasOccupation: {
      '@type': 'Occupation',
      name: job.position,
      occupationLocation: {
        '@type': 'Organization',
        name: job.companyName,
        url: job.companyURL,
      },
    },
  })),
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <div className='bg__overlay'></div>
        <AOSInit />
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
