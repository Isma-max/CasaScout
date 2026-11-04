import type { APIRoute } from 'astro';
import { staging } from '../config/env';

// En staging no se bloquea el rastreo: así los buscadores pueden leer el noindex de cada página.
// (Un Disallow impediría ver el noindex y la URL podría indexarse igual, sin contenido.)
export const GET: APIRoute = ({ site }) => {
  const lines = ['User-agent: *', 'Allow: /'];
  if (!staging && site) lines.push('', `Sitemap: ${new URL('/sitemap-index.xml', site).href}`);
  return new Response(lines.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
