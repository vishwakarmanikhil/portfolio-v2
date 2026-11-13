// Shared SEO helpers: one place that builds every page's <head> tags, so
// titles, descriptions, canonical URLs and social tags stay consistent.

export const SITE_URL = 'https://www.nikhilvishwakarma.com';
export const SITE_NAME = 'Nikhil Vishwakarma';
export const DEFAULT_OG_IMAGE = 'https://ik.imagekit.io/vishwakarmanikhil/portfolio-v2/og.png';
export const PERSON_ID = `${SITE_URL}/#person`;
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const TITLE_SUFFIX = ` | ${SITE_NAME}`;
const MAX_TITLE = 60;

export const absoluteUrl = path => (path === '/' ? SITE_URL : `${SITE_URL}${path}`);

/** The page title as it will appear in search results (suffix added only if it fits). */
export function fullTitle(title) {
    return title.length + TITLE_SUFFIX.length <= MAX_TITLE ? `${title}${TITLE_SUFFIX}` : title;
}

/**
 * Metadata for a page.
 * - `title`: the page's own title; " | Nikhil Vishwakarma" is added when it fits in 60 characters.
 * - `image`: social image URL; pass `null` when the page has its own opengraph-image file.
 */
export function pageMetadata({ title, description, path, keywords = [], image = DEFAULT_OG_IMAGE, type = 'website', openGraph = {}, robots }) {
    const shownTitle = fullTitle(title);
    const images = image ? [{ url: image, width: 1200, height: 630, alt: shownTitle }] : undefined;
    return {
        title: { absolute: shownTitle },
        description,
        keywords,
        alternates: {
            canonical: path,
            types: {
                'application/rss+xml': '/rss.xml',
                'text/markdown': '/llms.txt',
            },
        },
        openGraph: {
            title: shownTitle,
            description,
            url: absoluteUrl(path),
            siteName: SITE_NAME,
            locale: 'en_IN',
            type,
            ...(images && { images }),
            ...openGraph,
        },
        twitter: {
            card: 'summary_large_image',
            title: shownTitle,
            description,
            ...(images && { images: images.map(i => i.url) }),
        },
        ...(robots && { robots }),
    };
}

/** BreadcrumbList structured data from [name, path] pairs (Home is added first). */
export function breadcrumbs(...items) {
    return {
        '@type': 'BreadcrumbList',
        itemListElement: [['Home', '/'], ...items].map(([name, path], index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name,
            item: absoluteUrl(path),
        })),
    };
}

/** FAQPage structured data from [{ question, answer }]. */
export function faqPage(path, items) {
    return {
        '@type': 'FAQPage',
        '@id': `${absoluteUrl(path)}#faq`,
        url: absoluteUrl(path),
        mainEntity: items.map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
    };
}

export const jsonLd = graph => JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
