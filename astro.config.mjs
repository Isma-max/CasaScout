import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

const env = { ...loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), ''), ...process.env };

// URL pública del sitio (canónicas, Open Graph, sitemap y robots.txt).
// Defínela con PUBLIC_SITE_URL cuando haya dominio propio. En vistas previas de Vercel se usa su URL.
const site =
  env.PUBLIC_SITE_URL ||
  (env.VERCEL_ENV === 'preview' && env.VERCEL_URL ? `https://${env.VERCEL_URL}` : 'https://casa-scout-henna.vercel.app');

// build.format "file" genera somos.html, blog.html, etc.: las URLs son las mismas del sitio estático original.
export default defineConfig({
  site,
  build: { format: 'file' },
  trailingSlash: 'never',
  // Con build.format "file" las páginas se sirven como /blog.html: el sitemap debe listar esas mismas URLs.
  integrations: [
    sitemap({
      serialize(item) {
        const url = new URL(item.url);
        if (url.pathname !== '/' && !url.pathname.endsWith('.html')) url.pathname += '.html';
        return { ...item, url: url.href };
      },
    }),
  ],
});
