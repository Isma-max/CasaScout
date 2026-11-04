# Instrucciones para agentes (Codex)

Sitio de Casa Scout: merchandising y regalos corporativos en Chile. Este repositorio contiene el diseño **aprobado por el cliente** (dirección corporativa, noviembre 2026), migrado a Astro sin cambiar el HTML, las clases ni el CSS. Trátalo como la referencia visual: el trabajo de aquí en adelante es completar y llevar a producción, no rediseñar.

## Estructura

Sitio en **Astro** (salida estática). El diseño, las clases y el CSS son los mismos del HTML aprobado.

```
src/pages/index.astro                  Inicio
src/pages/somos.astro                  Somos (historia, por qué Casa Scout, cómo trabajamos, valores)
src/pages/que-hacemos.astro            Servicios y productos destacados
src/pages/clientes-y-proyectos.astro   Logos de clientes, proyecto destacado, grilla filtrable
src/pages/blog.astro                   Artículo destacado y lista filtrable (lee la colección de blog)
src/pages/blog/[slug].astro            Una página por artículo publicado (/blog/<slug>.html)
src/content/blog/*.md                  Artículos en Markdown (content collection; `draft: true` = borrador sin publicar)
src/content.config.ts                  Esquema de la colección de blog
src/lib/blog.ts                        Categorías, artículos publicados y tiempo de lectura
src/pages/contacto.astro               WhatsApp + formulario de cotización
src/pages/privacidad.astro             Política de privacidad (enlazada desde el formulario y el pie)
src/layouts/Base.astro                 Layout base: title, description, pageClass; incluye encabezado, pie, fuentes, JS, metadatos Open Graph/Twitter, canónica, noindex en staging y JSON-LD
src/components/                        Header, Footer, WhatsAppButton, QuoteForm, Analytics, Pic (envoltorio de <Image>)
src/config/site.ts                     Datos pendientes (WhatsApp, correo, horario, ciudad, redes, zonas, plazo, logos) y datos fijos de marca
src/config/env.ts                      Variables de entorno (PUBLIC_STAGING, analítica)
src/pages/robots.txt.ts                robots.txt dinámico (el sitemap lo genera @astrojs/sitemap)
src/styles/global.css                  Hoja única: base y tokens en .cv, luego un bloque por página (.pg-*)
src/scripts/main.js                    Filtros por categoría y formulario de cotización (Web3Forms)
src/assets/                            Logo (SVG) e imágenes (WebP); Astro las optimiza con <Image>
public/favicon.svg                     Favicon
docs/                                  Brief del producto y presentación aprobada
```

Las páginas se generan como `somos.html`, `blog.html`, etc. (`build.format: "file"`), igual que el sitio estático original.

Comandos: `npm install`, `npm run dev`, `npm run build` (genera `dist/`), `npm run preview`.

## Modo publicable

Todos los datos pendientes viven en `src/config/site.ts` y están **vacíos**. Si un dato está vacío, el elemento que lo usa no se muestra y no queda ningún texto entre corchetes en el sitio:

- `whatsapp`: botones de WhatsApp (inicio, llamados a la acción, contacto) y enlace del pie.
- `email`: correo en el pie, en Contacto y en la política de privacidad; también se ofrece como alternativa si falla el envío del formulario.
- `PUBLIC_WEB3FORMS_KEY` (variable de entorno, no está en `site.ts`): formulario de cotización (Inicio y Contacto). Sin clave, el formulario no se muestra.
- `horario`, `ciudad`: filas de Contacto, pie y texto del bloque de WhatsApp.
- `instagram`, `linkedin`: bloque "Redes" del pie.
- `zonasDespacho`: frase final del paso "Entregamos" en Somos.
- `plazoRespuesta`: frase en el formulario de Contacto.
- `logos`: sección "Confían en nosotros" del Inicio y grilla de logos de Clientes y proyectos.
- `proyectoDestacado` y `etiquetasProyectos`: contexto, cliente y escala del proyecto destacado, y la etiqueta bajo cada proyecto.

Para agregar un dato nuevo, ocúltalo cuando esté vacío con la misma lógica (no dejes marcadores entre corchetes).

## Sistema visual (no cambiar sin pedirlo)

- Fondo blanco `#FFFFFF`; superficie `#F5F4F7`; fondo de foto `#E9E8EC`; líneas `#E4E2E8`.
- Texto: tinta `#1F1D24`, cuerpo `#4A4752`, secundario `#6B6772`.
- Morado de marca `#3B1E59` (hover `#2C1645`), usado como color **secundario**: botones, enlaces, detalles. Nunca como fondo de secciones.
- Tipografía: Bricolage Grotesque 400 para títulos y DM Sans 400 y 600 para texto, botones y navegación. Títulos en 400 con tracking negativo. Autoalojada con `@fontsource` (subconjunto latin), sin Google Fonts.
- Grilla de 12 columnas, margen lateral 5vw, gutter 24px. En celular (≤820px) 6 columnas.
- Botones rectos: morado sólido, o "ghost" con borde de tinta.
- Mucho espacio en blanco: separaciones de 160 a 200px entre secciones en escritorio, ~104px en celular.
- Todos los tokens están como variables CSS en `.cv` al inicio de `src/styles/global.css`.

## Blog (content collection)

- Cada artículo es un `.md` en `src/content/blog/` con `title`, `seoTitle` (60 caracteres o menos, con la marca al final), `description` (120 a 160 caracteres), `category` (`kits`, `regalos`, `merch`, `branding`, `calidad`), `image` e `imageAlt` (también es la imagen Open Graph, recortada a 1200x630), `order`, `date` y, opcionalmente, `featured`.
- `draft: true` = borrador: no genera página, no aparece en el blog ni en el inicio, y no entra al sitemap. Para publicarlo, redacta el cuerpo y cambia `draft` a `false`.
- El tiempo de lectura se calcula solo (unas 200 palabras por minuto). Los filtros del blog muestran solo las categorías con artículos publicados.
- Cada artículo termina con un llamado a cotizar (lo agrega la página, no el Markdown).
- Estilo editorial: español de Chile, tuteo, tono experto y concreto, entre 800 y 1.200 palabras. Sin cifras, clientes ni casos inventados; si un dato no está confirmado, no se escribe.
- Los enlaces internos son absolutos (`/somos.html`) porque los artículos viven en `/blog/`.

## SEO, staging y analítica

- `PUBLIC_STAGING=true` pone `noindex, nofollow` en todas las páginas y desactiva la analítica. No quites el `noindex` en staging ni bloquees el rastreo con `Disallow` (impediría leerlo). Al publicar, `PUBLIC_STAGING=false`.
- Las URLs son `.html` (`build.format: "file"`): canónicas y sitemap deben usar esas mismas URLs.
- Los metadatos salen de `Base.astro` y los datos de marca de `marca` en `site.ts`. El JSON-LD de Organization solo incluye datos que existan (sin campos vacíos).
- Analítica: Plausible o GA4 por variable de entorno (ver `.env.example`). Los eventos (`WhatsApp Click`, `Form Submit`) están en `src/scripts/main.js`. Si cambias la analítica, revisa el texto de `privacidad.astro`.

## Formulario de cotización

`QuoteForm.astro` + `src/scripts/main.js`, conectado a Web3Forms con la clave en `PUBLIC_WEB3FORMS_KEY` (ver `.env.example`). Mantén: honeypot `botcheck`, errores por campo asociados con `aria-describedby` y `aria-invalid`, foco en el primer error, confirmación en la misma página sin recargar, aviso de error con reintento, y el enlace a `privacidad.html`. Los avisos de error usan `#B3261E` (única excepción a la paleta, por contraste AA).

## Lo que NO se agrega

- Mascota, objetos 3D decorativos, ilustraciones, fondos de color, degradados, recursos gráficos que no aporten a lo comercial.
- Catálogo extenso: el sitio muestra una **selección** de productos y proyectos.
- Clientes, logos, cifras o testimonios inventados. Mientras no haya datos reales, el dato queda vacío en `src/config/site.ts` y el elemento no se muestra.

## Contenido provisional

- Las imágenes de `src/assets/img/` son renders hechos para la propuesta. "Norte" es un cliente ficticio. Deben reemplazarse por fotos reales manteniendo los nombres de archivo o actualizando los imports. Las fotos deben ser sobrias, sobre fondo claro y con buena luz. Se usan con `<Image>` de Astro (vía `Pic.astro`): WebP y anchos responsivos.
- Los datos que faltan están en `src/config/site.ts` (ver "Modo publicable"). Siguen visibles las leyendas "Render provisional" y la nota legal del pie sobre los renders; quitarlas al cambiar las imágenes por fotos reales.

## Calidad mínima

- Contraste AA, áreas táctiles de 44px como mínimo, foco visible.
- Probar siempre en 1440px y 390px de ancho.
- Respetar `prefers-reduced-motion` (ya está en la base).
- Textos en español de Chile, tuteo, frases cortas y concretas.
