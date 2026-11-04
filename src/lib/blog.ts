import { getCollection, type CollectionEntry } from 'astro:content';

export type Articulo = CollectionEntry<'blog'>;

/** Categorías del blog (ids usados en los filtros y en el frontmatter). */
export const categorias = [
  { id: 'kits', label: 'Kits de bienvenida' },
  { id: 'regalos', label: 'Regalos corporativos' },
  { id: 'merch', label: 'Merchandising' },
  { id: 'branding', label: 'Branding en productos' },
  { id: 'calidad', label: 'Calidad y diseño' },
] as const;

export const nombreCategoria = (id: string) => categorias.find((c) => c.id === id)?.label ?? id;

/** Artículos publicados (sin borradores), en el orden definido por `order`. */
export async function articulosPublicados(): Promise<Articulo[]> {
  const todos = await getCollection('blog', ({ data }) => !data.draft);
  return todos.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title, 'es'));
}

/** Tiempo de lectura en minutos, a unas 200 palabras por minuto (mínimo 1). */
export function minutosLectura(a: Articulo): number {
  const palabras = (a.body ?? '').replace(/[#>*_`\-\[\]()]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(palabras / 200));
}

export const urlArticulo = (a: Articulo) => `/blog/${a.id}.html`;
