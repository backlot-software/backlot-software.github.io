import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { entryToMarkdown } from '../utils/markdown';

// Serves every docs page as Markdown, e.g. `/concepts/actor/` at `/concepts/actor.md`.
export const getStaticPaths = (async () => {
  const entries = await getCollection('docs', ({ data }) => !data.draft);
  return entries.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ entry: CollectionEntry<'docs'> }> = ({ props }) =>
  new Response(entryToMarkdown(props.entry), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
  });
