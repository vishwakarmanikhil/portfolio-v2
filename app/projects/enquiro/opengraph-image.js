import project from '@/components/projects/enquiro.json';
import { renderOgImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Enquiro – lead management software by Nikhil Vishwakarma';

export default function Image() {
    return renderOgImage({
        eyebrow: 'Product',
        title: 'Enquiro: lead management for businesses that get enquiries online',
        description: project.metaDescription,
    });
}
