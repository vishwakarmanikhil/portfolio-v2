import { getAllPosts } from '@/lib/blog';

export default function sitemap() {
    const posts = getAllPosts();
    return [
        {
            url: 'https://www.nikhilvishwakarma.com/',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: 'https://www.nikhilvishwakarma.com/freelance',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: 'https://www.nikhilvishwakarma.com/projects/enquiro',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://www.nikhilvishwakarma.com/projects/coworkspace',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://www.nikhilvishwakarma.com/archive',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://www.nikhilvishwakarma.com/blog',
            lastModified: posts[0] ? new Date(posts[0].updated ?? posts[0].date) : new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        ...posts.map(post => ({
            url: post.url,
            lastModified: new Date(post.updated ?? post.date),
            changeFrequency: 'monthly',
            priority: 0.7,
        })),
    ]
}