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
import { SITE_URL, PERSON_ID, BUSINESS_ID, WEBSITE_ID, DEFAULT_OG_IMAGE, jsonLd } from '@/lib/seo';

const lexend = Lexend({ subsets: ['latin'] });

export const viewport = {
  themeColor: '#111827',
}

const DESCRIPTION = 'Senior Software Developer in Mumbai who builds web apps, mobile apps and SaaS end to end with React, Next.js, React Native, Node.js and AWS.';

// Site-wide defaults. Every page overrides title, description, canonical and
// social tags through pageMetadata() in lib/seo.js.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Nikhil Vishwakarma – Senior Software Developer, Mumbai',
    template: '%s | Nikhil Vishwakarma',
  },
  description: DESCRIPTION,
  applicationName: 'Nikhil Vishwakarma',
  authors: [{ name: 'Nikhil Vishwakarma', url: SITE_URL }],
  creator: 'Nikhil Vishwakarma',
  publisher: 'Nikhil Vishwakarma',
  category: 'technology',
  keywords: ['Nikhil Vishwakarma', 'Senior Software Developer', 'Full Stack Developer', 'Mumbai'],
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
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
  openGraph: {
    siteName: 'Nikhil Vishwakarma',
    locale: 'en_IN',
    type: 'website',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@vishwakarmanikhil',
    images: [DEFAULT_OG_IMAGE],
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
  jobTitle: 'Senior Software Developer',
  description: DESCRIPTION,
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
    name: 'Senior Software Developer',
    skills: allSkills.join(', '),
  },
};

// The freelance business (a LocalBusiness subtype), defined once for the whole site.
const business = {
  '@type': 'ProfessionalService',
  '@id': BUSINESS_ID,
  name: 'Nikhil Vishwakarma – Web & App Development',
  url: `${SITE_URL}/freelance`,
  description: 'Freelance web and app development in Mumbai: websites, web apps, mobile apps and SaaS products for businesses in any industry.',
  image: DEFAULT_OG_IMAGE,
  logo: 'https://ik.imagekit.io/vishwakarmanikhil/portfolio-v2/favicon/apple-touch-icon.png',
  email: 'mailto:vnikhil3101@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  areaServed: { '@type': 'Country', name: 'India' },
  founder: { '@id': PERSON_ID },
  knowsAbout: ['Website development', 'Web application development', 'Mobile app development', 'SaaS development', 'Real estate websites', 'Lead management systems', 'SEO and AI search visibility'],
  sameAs: ['https://www.linkedin.com/in/vishwakarmanikhil/', 'https://github.com/vishwakarmanikhil'],
};

const structuredData = jsonLd([
  {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'Nikhil Vishwakarma',
    url: SITE_URL,
    inLanguage: 'en-IN',
    publisher: { '@id': PERSON_ID },
  },
  person,
  business,
]);

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
          dangerouslySetInnerHTML={{ __html: structuredData }}
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
