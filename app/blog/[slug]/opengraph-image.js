import { getAllPosts, getPost } from '@/lib/blog';
import { renderOgImage, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Blog post by Nikhil Vishwakarma';

export function generateStaticParams() {
    return getAllPosts().map(post => ({ slug: post.slug }));
}

export default async function Image({ params }) {
    const { slug } = await params;
    const post = getPost(slug);
    return renderOgImage({
        eyebrow: post?.tags?.[0] ? `Blog · ${post.tags[0]}` : 'Blog',
        title: post?.title ?? 'Blog',
        description: post?.description,
    });
}
