import { renderOgImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Project archive – Nikhil Vishwakarma';

export default function Image() {
    return renderOgImage({
        eyebrow: 'Projects',
        title: 'Project archive: websites, apps and SaaS',
        description: 'Client websites, web apps, mobile apps, SaaS products and personal projects since 2020.',
    });
}
