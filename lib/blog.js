import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';

// Blog posts are Markdown files in content/blog/<slug>.md with front matter.
// See content/blog/README.md for the fields.

export const SITE_URL = 'https://www.nikhilvishwakarma.com';
const POSTS_DIR = path.join(process.cwd(), 'content', 'blog');
const WORDS_PER_MINUTE = 220;
const SHOW_DRAFTS = process.env.NODE_ENV !== 'production';

function readPostFile(file) {
    const slug = file.replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
    const { data, content } = matter(raw);

    for (const field of ['title', 'description', 'date']) {
        if (!data[field]) throw new Error(`content/blog/${file} is missing "${field}" in its front matter`);
    }

    const toDateString = d => (d instanceof Date ? d.toISOString().slice(0, 10) : String(d));
    const words = content.trim().split(/\s+/).length;

    return {
        slug,
        title: data.title,
        description: data.description,
        date: toDateString(data.date),
        updated: data.updated ? toDateString(data.updated) : null,
        tags: data.tags ?? [],
        draft: data.draft === true,
        readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
        url: `${SITE_URL}/blog/${slug}`,
        content,
    };
}

/** All published posts, newest first (drafts are included only in development). */
export function getAllPosts() {
    if (!fs.existsSync(POSTS_DIR)) return [];
    return fs.readdirSync(POSTS_DIR)
        .filter(file => file.endsWith('.md') && file.toLowerCase() !== 'readme.md')
        .map(readPostFile)
        .filter(post => SHOW_DRAFTS || !post.draft)
        .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug) {
    return getAllPosts().find(post => post.slug === slug) ?? null;
}

/** Renders a post's Markdown to HTML, and returns its H2 headings for the table of contents. */
export async function renderPost(post) {
    const file = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
        .use(rehypePrettyCode, { theme: { light: 'github-light', dark: 'github-dark-dimmed' }, keepBackground: false })
        .use(rehypeStringify)
        .process(post.content);

    const html = String(file);
    const headings = [...html.matchAll(/<h2 id="([^"]+)"><a[^>]*>(.*?)<\/a><\/h2>/g)].map(([, id, text]) => ({
        id,
        text: text.replace(/<[^>]+>/g, ''),
    }));
    return { html, headings };
}

export function formatDate(date) {
    return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
