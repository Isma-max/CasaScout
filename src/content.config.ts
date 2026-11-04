import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Blog: un archivo Markdown por artículo en src/content/blog/.
 * Los artículos con `draft: true` son borradores: no se publican (sin página, sin listado y sin sitemap).
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      /** Título del artículo (h1 y listados). */
      title: z.string(),
      /** Título SEO (etiqueta <title>); idealmente de 60 caracteres o menos, con la marca al final. */
      seoTitle: z.string(),
      /** Descripción para buscadores y para compartir (idealmente entre 120 y 160 caracteres). */
      description: z.string(),
      /** Categoría: define el filtro del blog. */
      category: z.enum(['kits', 'regalos', 'merch', 'branding', 'calidad']),
      /** Imagen del artículo; también es la imagen Open Graph (se recorta a 1200x630). */
      image: image(),
      imageAlt: z.string(),
      /** true: borrador, no se publica. */
      draft: z.boolean().default(false),
      /** true: aparece como artículo destacado en /blog.html (solo uno). */
      featured: z.boolean().default(false),
      /** Orden en los listados (menor primero). */
      order: z.number().default(100),
      /** Fecha de publicación. */
      date: z.coerce.date(),
    }),
});

export const collections = { blog };
