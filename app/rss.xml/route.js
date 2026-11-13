import { getAllPosts, SITE_URL } from '@/lib/blog';

export const dynamic = 'force-static';

const escape = s => String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export function GET() {
    const posts = getAllPosts();
    const items = posts.map(post => `
    <item>
      <title>${escape(post.title)}</title>
      <link>${post.url}</link>
      <guid isPermaLink="true">${post.url}</guid>
      <description>${escape(post.description)}</description>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
${post.tags.map(tag => `      <category>${escape(tag)}</category>`).join('\n')}
    </item>`).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Nikhil Vishwakarma – Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Notes on building web products: React, Next.js, Node.js, AWS, AI features and search visibility.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${posts[0] ? `    <lastBuildDate>${new Date(`${(posts[0].updated ?? posts[0].date)}T00:00:00Z`).toUTCString()}</lastBuildDate>` : ''}${items}
  </channel>
</rss>
`;

    return new Response(xml, {
        headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
    });
}
