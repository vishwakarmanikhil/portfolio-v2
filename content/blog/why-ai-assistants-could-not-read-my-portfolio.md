---
title: "Why ChatGPT couldn't read my portfolio, and how I fixed it"
description: "An AI search scan gave my Next.js portfolio 17/100 because its HTML had only 8 words of text. Here is what caused it, how I fixed it, and a checklist you can run on your own site."
date: 2026-11-13
tags: ["Next.js", "SEO", "AI search"]
---

My portfolio looked fine in a browser. But when I ran it through an AI search checker, it scored **17 out of 100**. The reason was simple and a little embarrassing: the HTML my server sent contained about **8 words of text**. AI crawlers that don't run JavaScript saw an almost empty page, so they had nothing to read, quote or recommend.

This post explains what went wrong, what I changed, and how you can check your own website in a few minutes.

## Why can't AI assistants read some websites?

Many AI crawlers read only the **raw HTML** a server sends. They don't wait for JavaScript to run. If your text appears only after scripts load, those crawlers see an empty shell.

You can see what they see in two ways:

- Open your site, right-click and choose **View page source**. Search for a sentence from your page. If it isn't there, crawlers can't see it either.
- Or run this in a terminal and count the words:

```bash
curl -s https://www.example.com/ | sed 's/<[^>]*>/ /g' | wc -w
```

If a page full of content comes back with a few dozen words, the content is being built in the browser.

## What was hiding my content?

My site is built with Next.js, which renders pages on the server by default, so this shouldn't have happened. The culprit was a **loading screen**.

The site shows an animated logo for two seconds before the page appears. It was written like this:

```jsx
'use client';

export default function Loader({ children }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 2000);
    }, []);

    return loading ? <Preloader /> : children;
}
```

On the server, `loading` is always `true`, because `useEffect` only runs in the browser. So the server rendered only the preloader, and the real page was added two seconds later by JavaScript. Visitors never noticed. Crawlers never saw my experience, projects or contact details.

## How did I fix it?

I kept the loading animation but changed how it works. The page content is now **always rendered**, and the loader is a full-screen cover drawn **on top of it** for two seconds:

```jsx
export default function Loader({ children }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {children}
            {loading && (
                <div className="fixed inset-0 z-[9999] bg-white dark:bg-gray-800" aria-hidden="true">
                    <Preloader />
                </div>
            )}
        </>
    );
}
```

Visitors see exactly the same thing as before. But the server HTML now contains the whole page: it went from **8 words to over 1,500**.

## What else did the scan find?

Once the text was readable, the other problems were quick to fix:

- **No robots.txt.** Every crawler asks for `/robots.txt` first. In Next.js, an `app/robots.js` file creates it, including a link to the sitemap.
- **Invalid structured data.** My schema.org markup used properties on the wrong types, so strict parsers ignored them. I replaced it with a clean set: `WebSite`, `Person`, `ProfilePage` and `FAQPage`.
- **No main headline.** The page's only `<h1>` was "Hi, my name is". Now my name is the H1, and sections use H2 and H3 in order.
- **No answers to common questions.** I added an FAQ section written the way people ask AI tools, such as "What tech stack does Nikhil work with?", with the answer in the first sentence.
- **Wrong domain in the sitemap.** My domain redirects to the `www` version, but the sitemap and canonical links pointed at the version without `www`. They now match.
- **No plain-text version.** I added an `llms.txt` file: a Markdown summary of the site, generated from the same data the homepage uses, so it never goes out of date.

None of these changed how the site looks. They changed what machines can understand.

## A checklist for your own website

If you want Google and AI assistants such as ChatGPT, Claude and Perplexity to read and recommend your site, check these:

1. **View the page source.** Your main text should be in it, not only in the rendered page.
2. **Open `/robots.txt`.** It should load and include a `Sitemap:` line.
3. **Check your headings.** One `<h1>` that says what the page is about, then `<h2>` and `<h3>` in order.
4. **Validate your structured data** at [validator.schema.org](https://validator.schema.org/). Fix every error, not only the warnings.
5. **Answer real questions on the page.** Use the questions people actually ask as headings, and answer each one in the first sentence below it.
6. **Make your domains agree.** Your sitemap, canonical links and redirects should all use the same version of your domain.
7. **Keep it fresh.** Sitemaps should show real update dates, and pages should be updated when things change.

## The takeaway

A website can look perfect to people and still be invisible to the tools more and more people use to find things. Check what your server actually sends, not only what the browser shows.

If you'd like me to check or fix your website for Google and AI search, take a look at [my freelance services](/freelance) or email me at [vnikhil3101@gmail.com](mailto:vnikhil3101@gmail.com).
