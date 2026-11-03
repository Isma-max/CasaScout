# Instrucciones para agentes (Codex)

Sitio de Casa Scout: merchandising y regalos corporativos en Chile. Este repositorio contiene el diseño **aprobado por el cliente** (dirección corporativa, noviembre 2026), exportado como HTML, CSS y JavaScript simple. Trátalo como la referencia visual: el trabajo de aquí en adelante es completar y llevar a producción, no rediseñar.

## Estructura

```
index.html                  Inicio
somos.html                  Somos (historia, por qué Casa Scout, cómo trabajamos, valores)
que-hacemos.html            Servicios y productos destacados
clientes-y-proyectos.html   Logos de clientes, proyecto destacado, grilla filtrable
blog.html                   Artículo destacado y lista filtrable (temas pensados para SEO)
contacto.html               WhatsApp + formulario de cotización
css/styles.css              Hoja única: base y tokens en .cv, luego un bloque por página (.pg-*)
js/main.js                  Filtros por categoría y envío del formulario
assets/                     Logo (SVG) y renders provisionales (WebP)
docs/                       Brief del producto y presentación aprobada
```

El encabezado y el pie se repiten en cada página (marcados con `<!-- header -->` y `<!-- footer -->`). Si cambias uno, cámbialo en las seis páginas, o pasa el sitio a un generador estático (ver "Próximos pasos").

## Sistema visual (no cambiar sin pedirlo)

- Fondo blanco `#FFFFFF`; superficie `#F5F4F7`; fondo de foto `#E9E8EC`; líneas `#E4E2E8`.
- Texto: tinta `#1F1D24`, cuerpo `#4A4752`, secundario `#6B6772`.
- Morado de marca `#3B1E59` (hover `#2C1645`), usado como color **secundario**: botones, enlaces, detalles. Nunca como fondo de secciones.
- Tipografía (Google Fonts): Bricolage Grotesque 400 para títulos y DM Sans 400 y 600 para texto, botones y navegación. Títulos en 400 con tracking negativo.
- Grilla de 12 columnas, margen lateral 5vw, gutter 24px. En celular (≤820px) 6 columnas.
- Botones rectos: morado sólido, o "ghost" con borde de tinta.
- Mucho espacio en blanco: separaciones de 160 a 200px entre secciones en escritorio, ~104px en celular.
- Todos los tokens están como variables CSS en `.cv` al inicio de `css/styles.css`.

## Lo que NO se agrega

- Mascota, objetos 3D decorativos, ilustraciones, fondos de color, degradados, recursos gráficos que no aporten a lo comercial.
- Catálogo extenso: el sitio muestra una **selección** de productos y proyectos.
- Clientes, logos, cifras o testimonios inventados. Mientras no haya datos reales, queda el marcador `[Pendiente]` o `[Logo cliente]`.

## Contenido provisional

- Las imágenes de `assets/img/` son renders hechos para la propuesta. "Norte" es un cliente ficticio. Deben reemplazarse por fotos reales manteniendo los nombres de archivo o actualizando las rutas. Las fotos deben ser sobrias, sobre fondo claro y con buena luz.
- Busca `[Pendiente`, `[número]`, `[correo]`, `[Correo de contacto]`, `[Cliente]`, `[Empresa]`, `[Colegio]`, `[Institución]`, `[Corporación]`, `[Cantidad]`, `[Instagram]` y `[LinkedIn]` para ver lo que falta.

## Calidad mínima

- Contraste AA, áreas táctiles de 44px como mínimo, foco visible.
- Probar siempre en 1440px y 390px de ancho.
- Respetar `prefers-reduced-motion` (ya está en la base).
- Textos en español de Chile, tuteo, frases cortas y concretas.
