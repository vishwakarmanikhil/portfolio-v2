import { renderOgImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Blog by Nikhil Vishwakarma';

export default function Image() {
    return renderOgImage({
        eyebrow: 'Blog',
        title: 'Notes on building websites, apps and SaaS',
        description: 'Practical guides for businesses and developers: lead generation, web apps, pricing, Next.js and AI search.',
    });
}
