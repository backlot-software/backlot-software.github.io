import type { CollectionEntry } from 'astro:content';

/** Returns the raw source of a docs page, prefixed with its title, as served by the `.md` routes. */
export const entryToMarkdown = ({ data, body = '' }: CollectionEntry<'docs'>) => `# ${data.title}\n\n${body.trim()}\n`;

/** URL of the Markdown version of a docs page, e.g. `/concepts/actor.md`. */
export const markdownUrl = (id: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${id}.md`;
