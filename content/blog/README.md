# Writing a blog post

Each post is one Markdown file in this folder. The file name becomes the URL:
`content/blog/my-first-post.md` → `https://www.nikhilvishwakarma.com/blog/my-first-post`

Use lowercase words separated by hyphens for the file name, and don't rename a file after it is published (the URL would change).

## Front matter

Every post starts with this block:

```md
---
title: "Your post title"
seoTitle: "Shorter title for Google"   # optional: use when the title is over 60 characters
description: "One or two sentences (under 160 characters) that answer what the post is about. Shown in Google, on the blog list, in link previews and on the share image."
date: 2026-11-20
updated: 2026-12-02   # optional: set this when you make a real update
tags: ["Next.js", "SEO"]
draft: true            # optional: drafts show in `npm run dev` but are not published
---
```

`title`, `description` and `date` are required; the build fails without them.

## Writing tips

- Start with the answer. The first paragraph should say what the reader will learn or get.
- Use `##` for sections and `###` for sub-sections. Every `##` heading appears in the "On this page" list.
- Make headings the questions people search for, e.g. "Why can't ChatGPT read my website?"
- Code blocks get syntax highlighting: put the language after the opening backticks, e.g. ```` ```js ````.
- Link to your own pages where it helps: `/freelance`, `/projects/enquiro`, other posts.
- Set `updated` when you make a meaningful change; search engines and AI tools use it to judge freshness.

## Publishing

1. Write the post with `draft: true` and check it with `npm run dev` at `/blog`.
2. Remove `draft: true` (or set it to `false`).
3. Commit and deploy. The post is added to the blog list, the sitemap, the RSS feed (`/rss.xml`) and `llms.txt` automatically.
