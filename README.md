# Casa Scout · sitio web

Sitio de Casa Scout (merchandising y regalos corporativos, Chile) en su dirección corporativa aprobada. Seis páginas hechas con [Astro](https://astro.build) (salida estática), con el mismo HTML, clases y CSS del diseño aprobado.

## Desarrollo

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/ (somos.html, blog.html, ...)
npm run preview   # sirve dist/
```

Requiere Node 22.23 o superior.

## Estructura

- `src/pages/`: las seis páginas.
- `src/layouts/Base.astro`: layout base (`title`, `description`, `pageClass`), con encabezado, pie, fuentes y JS.
- `src/components/`: `Header`, `Footer`, `WhatsAppButton` y `Pic` (envoltorio de `<Image>`).
- `src/config/site.ts`: datos pendientes (ver abajo).
- `src/styles/global.css`: hoja de estilos única.
- `src/assets/`: logo e imágenes (se procesan a WebP con anchos responsivos).

Las fuentes (Bricolage Grotesque y DM Sans) están autoalojadas con `@fontsource`.

## Datos pendientes y modo publicable

Todos los datos que faltan están en [`src/config/site.ts`](src/config/site.ts) y hoy están **vacíos**: `whatsapp`, `email`, `horario`, `ciudad`, `instagram`, `linkedin`, `zonasDespacho`, `plazoRespuesta`, `logos`, además de `proyectoDestacado` y `etiquetasProyectos`.

Si un dato está vacío, su elemento no se muestra (fila de horario, bloque de redes, grilla de logos, botones de WhatsApp, formulario) y no queda ningún texto entre corchetes. Al completar un valor, el elemento aparece solo.

Ojo: sin `email` no se muestra el formulario de cotización, y sin `whatsapp` no se muestra la tarjeta "Por WhatsApp". Con ambos vacíos, Contacto queda sin forma de contacto; completa al menos uno antes de publicar.

## Estado

- **Aprobado:** dirección visual, estructura de secciones y textos de Somos y Cómo trabajamos. Los textos de Somos están escritos a partir de lo que contó Carlos y deben ser validados por él.
- **Provisional:** imágenes (renders con un cliente ficticio, "Norte") y datos de contacto.

## Pendientes

1. Logos de clientes y fotografías reales (los enviará Carlos).
2. WhatsApp, correo, horario y redes (en `src/config/site.ts`).
3. Proyecto destacado real: cliente, contexto y escala (`proyectoDestacado`).
4. Proyectos reales para la grilla de Clientes y proyectos.
5. Zonas de despacho y plazo de respuesta.
6. Conectar el formulario a un servicio real. Hoy abre el correo del visitante con el mensaje ya armado.
7. Redactar los artículos del blog. Los títulos actuales son propuestas para SEO.
8. Metadatos para compartir en redes (Open Graph), `sitemap.xml` y `robots.txt`.

## Publicación (Vercel)

El proyecto debe usar el preset **Astro**, con comando de build `npm run build` y directorio de salida `dist`.

Las reglas de diseño y lo que no se debe agregar están en [`AGENTS.md`](AGENTS.md). El brief completo está en [`docs/brief.md`](docs/brief.md).
