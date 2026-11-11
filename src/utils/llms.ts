import { getCollection, type CollectionEntry } from 'astro:content';
import { sidebar, siteDescription, siteTitle } from '../config';
import { markdownUrl } from './markdown';

type Entry = CollectionEntry<'docs'>;
type Section = { label: string; entries: Entry[] };

/** Groups docs pages into sections in sidebar order. Pages missing from the sidebar go under "Optional". */
export async function getLlmsSections(): Promise<Section[]> {
  const entries = await getCollection('docs', ({ data, body }) => !data.draft && !!body?.trim());
  const byId = new Map(entries.map((entry) => [entry.id, entry]));
  const take = (id: string) => {
    const entry = byId.get(id);
    byId.delete(id);
    return entry ? [entry] : [];
  };

  const sections: Section[] = [];
  const guides: Section = { label: 'Guides', entries: [] };
  for (const item of sidebar) {
    if (item.items) {
      sections.push({ label: item.label, entries: item.items.flatMap(({ slug }) => take(slug)) });
    } else if (item.link) {
      guides.entries.push(...take(item.link));
    }
  }
  sections.push(guides, { label: 'Optional', entries: [...byId.values()] });
  return sections.filter(({ entries }) => entries.length);
}

export const llmsHeader = `# ${siteTitle}\n\n> ${siteDescription}\n`;

export const absoluteUrl = (path: string, site: URL | undefined) => (site ? new URL(path, site).href : path);

export const pageLink = (entry: Entry, site: URL | undefined) => {
  const link = `- [${entry.data.title}](${absoluteUrl(markdownUrl(entry.id), site)})`;
  return entry.data.description ? `${link}: ${entry.data.description}` : link;
};
