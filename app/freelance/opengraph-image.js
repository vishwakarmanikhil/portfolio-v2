import { renderOgImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Freelance web and app developer in Mumbai – Nikhil Vishwakarma';

export default function Image() {
    return renderOgImage({
        eyebrow: 'Freelance',
        title: 'Freelance web and app developer in Mumbai',
        description: 'Websites, web apps, mobile apps and SaaS for businesses in any industry, from first idea to launch.',
    });
}
