# Instrucciones para agentes (Codex)

Sitio de Casa Scout: merchandising y regalos corporativos en Chile. Este repositorio contiene el diseño **aprobado por el cliente** (dirección corporativa, noviembre 2026), migrado a Astro sin cambiar el HTML, las clases ni el CSS. Trátalo como la referencia visual: el trabajo de aquí en adelante es completar y llevar a producción, no rediseñar.

## Estructura

Sitio en **Astro** (salida estática). El diseño, las clases y el CSS son los mismos del HTML aprobado.

```
src/pages/index.astro                  Inicio
src/pages/somos.astro                  Somos (historia, por qué Casa Scout, cómo trabajamos, valores)
src/pages/que-hacemos.astro            Servicios y productos destacados
src/pages/clientes-y-proyectos.astro   Logos de clientes, proyecto destacado, grilla filtrable
src/pages/blog.astro                   Artículo destacado y lista filtrable (temas pensados para SEO)
src/pages/contacto.astro               WhatsApp + formulario de cotización
src/layouts/Base.astro                 Layout base: title, description, pageClass; incluye encabezado, pie, fuentes y JS
src/components/                        Header, Footer, WhatsAppButton, Pic (envoltorio de <Image>)
src/config/site.ts                     Datos pendientes (WhatsApp, correo, horario, ciudad, redes, zonas, plazo, logos)
src/styles/global.css                  Hoja única: base y tokens en .cv, luego un bloque por página (.pg-*)
src/scripts/main.js                    Filtros por categoría y envío del formulario
src/assets/                            Logo (SVG) e imágenes (WebP); Astro las optimiza con <Image>
public/favicon.svg                     Favicon
docs/                                  Brief del producto y presentación aprobada
```

Las páginas se generan como `somos.html`, `blog.html`, etc. (`build.format: "file"`), igual que el sitio estático original.

Comandos: `npm install`, `npm run dev`, `npm run build` (genera `dist/`), `npm run preview`.

## Modo publicable

Todos los datos pendientes viven en `src/config/site.ts` y están **vacíos**. Si un dato está vacío, el elemento que lo usa no se muestra y no queda ningún texto entre corchetes en el sitio:

- `whatsapp`: botones de WhatsApp (inicio, llamados a la acción, contacto) y enlace del pie.
- `email`: formulario de cotización (Inicio y Contacto), correo en el pie y en Contacto.
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
