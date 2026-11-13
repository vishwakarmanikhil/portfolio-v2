export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/admin',
        },
        sitemap: 'https://www.nikhilvishwakarma.com/sitemap.xml',
        host: 'https://www.nikhilvishwakarma.com',
    }
}
