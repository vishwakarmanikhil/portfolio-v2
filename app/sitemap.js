export default function sitemap() {
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
            url: 'https://www.nikhilvishwakarma.com/archive',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        }
    ]
}