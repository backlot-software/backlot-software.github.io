import type { APIRoute } from 'astro';
import { getLlmsSections, llmsHeader } from '../utils/llms';
import { entryToMarkdown } from '../utils/markdown';

export const GET: APIRoute = async () => {
  const pages = (await getLlmsSections()).flatMap(({ entries }) => entries.map(entryToMarkdown));
  const body = [llmsHeader, ...pages].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
