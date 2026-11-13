import workExperience from '@/components/homePageSections/workExperience.json';
import projectsList from '@/components/projectsList.json';
import faqList from '@/components/homePageSections/faq.json';
import freelance from '@/components/freelance.json';
import coworkspace from '@/components/projects/coworkspace.json';
import enquiro from '@/components/projects/enquiro.json';
import { getAllPosts } from '@/lib/blog';

export const dynamic = 'force-static';

const SITE_URL = 'https://www.nikhilvishwakarma.com';

// Plain-text (markdown) version of the portfolio for AI agents and crawlers.
// Built from the same JSON the homepage renders, so it never drifts.
function buildMarkdown() {
    const lines = [
        '# Nikhil Vishwakarma',
        '',
        '> Senior Software Developer based in Mumbai, India, with 5+ years of full-stack experience building production web and mobile products across healthcare SaaS, entertainment marketplaces and real estate. Works with React, Next.js, React Native, Node.js, TypeScript, MySQL, PostgreSQL, Redis and AWS, and builds LLM-powered product features. Open to senior software developer roles and can join immediately.',
        '',
        '## Contact',
        '',
        '- Email: vnikhil3101@gmail.com',
        '- LinkedIn: https://www.linkedin.com/in/vishwakarmanikhil/',
        '- GitHub: https://github.com/vishwakarmanikhil',
        `- Portfolio: ${SITE_URL}/`,
        '- Resume (PDF): https://ik.imagekit.io/vishwakarmanikhil/portfolio-v2/Nikhil_Vishwakarma_resume.pdf',
        '',
        '## Experience',
        '',
    ];

    for (const job of workExperience) {
        lines.push(`### ${job.position}, ${job.companyName} (${job.timeLine.start} – ${job.timeLine.end})`, '');
        for (const point of job.jobDescription ?? []) lines.push(`- ${point}`);
        if (job.jobSkills) lines.push('', `Skills: ${job.jobSkills}`);
        lines.push('');
    }

    lines.push('## Selected projects', '');
    const shown = projectsList
        .filter(p => p.projectType === 'featured' || p.projectType === 'normal')
        .sort((a, b) => (a.projectType === b.projectType ? a.projectPriority - b.projectPriority : a.projectType === 'featured' ? -1 : 1));
    for (const p of shown) {
        const link = p.projectLink || p.androidAppStoreLink || p.repositoryLink;
        lines.push(`- **${p.title}**${link ? ` (${link})` : ''}: ${p.description} Technology: ${p.technology}.`);
    }
    lines.push('', `More projects: ${SITE_URL}/archive`, '');

    lines.push('## Freelance web development', '', `Nikhil also takes freelance projects for small businesses: ${SITE_URL}/freelance`, '');
    for (const s of freelance.services) lines.push(`- **${s.title}**: ${s.description}`);
    lines.push('');

    for (const product of [enquiro, coworkspace]) {
        lines.push(`## ${product.name} (product)`, '', `${product.summary} ${product.codeNote} Details: ${SITE_URL}/projects/${product.slug}`, '');
        for (const part of product.parts) lines.push(`- **${part.title}**: ${part.features.join('; ')}`);
        if (product.usedBy?.length) lines.push(`- **Used by**: ${product.usedBy.map(c => c.name).join(', ')}`);
        lines.push('');
    }

    const posts = getAllPosts();
    if (posts.length) {
        lines.push('## Blog posts', '');
        for (const post of posts) lines.push(`- [${post.title}](${post.url}): ${post.description}`);
        lines.push('');
    }

    lines.push('## Frequently asked questions', '');
    for (const item of faqList) lines.push(`### ${item.question}`, '', item.answer, '');

    lines.push('## Education', '', '- Bachelor of Engineering (Information Technology), University of Mumbai – Thakur College of Engineering & Technology, 2021, 7.99 CGPI', '');
    return lines.join('\n');
}

export function GET() {
    return new Response(buildMarkdown(), {
        headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
    });
}
