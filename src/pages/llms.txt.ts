import type { APIRoute } from 'astro';
import { absoluteUrl, getLlmsSections, llmsHeader, pageLink } from '../utils/llms';

export const GET: APIRoute = async ({ site }) => {
  const fullUrl = absoluteUrl(`${import.meta.env.BASE_URL.replace(/\/$/, '')}/llms-full.txt`, site);
  const sections = (await getLlmsSections()).map(
    ({ label, entries }) => `## ${label}\n\n${entries.map((entry) => pageLink(entry, site)).join('\n')}\n`
  );

  const body = [
    llmsHeader,
    `Each link points to the Markdown source of a documentation page. The complete documentation is available as a single file at ${fullUrl}.\n`,
    ...sections
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
