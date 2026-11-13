import { getAllPosts } from '@/lib/blog';
import { absoluteUrl, DEFAULT_OG_IMAGE } from '@/lib/seo';

// /sitemap.xml – every public page, with images so Google can index the
// social images. Blog posts use their real published/updated dates; other
// pages use the deploy date. /admin is deliberately left out.
export default function sitemap() {
    const posts = getAllPosts();
    const deployed = new Date();
    const latestPost = posts[0] ? new Date(posts[0].updated ?? posts[0].date) : deployed;

    const page = (path, { priority, changeFrequency = 'monthly', lastModified = deployed, images = [] }) => ({
        url: absoluteUrl(path),
        lastModified,
        changeFrequency,
        priority,
        ...(images.length && { images }),
    });

    return [
        page('/', { priority: 1, images: [DEFAULT_OG_IMAGE] }),
        page('/freelance', { priority: 0.9, images: [absoluteUrl('/freelance/opengraph-image')] }),
        page('/projects/enquiro', { priority: 0.8, images: [absoluteUrl('/projects/enquiro/opengraph-image')] }),
        page('/projects/coworkspace', { priority: 0.8, images: [absoluteUrl('/projects/coworkspace/website-home.png')] }),
        page('/blog', { priority: 0.8, changeFrequency: 'weekly', lastModified: latestPost, images: [absoluteUrl('/blog/opengraph-image')] }),
        ...posts.map(post => page(`/blog/${post.slug}`, {
            priority: 0.7,
            lastModified: new Date(post.updated ?? post.date),
            images: [`${post.url}/opengraph-image`],
        })),
        page('/archive', { priority: 0.6, images: [absoluteUrl('/archive/opengraph-image')] }),
    ];
}
