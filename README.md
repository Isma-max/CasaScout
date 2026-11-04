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

- `src/pages/`: las seis páginas y `privacidad.astro` (política de privacidad).
- `src/layouts/Base.astro`: layout base (`title`, `description`, `pageClass`), con encabezado, pie, fuentes y JS.
- `src/components/`: `Header`, `Footer`, `WhatsAppButton`, `QuoteForm` (formulario de cotización), `Analytics` y `Pic` (envoltorio de `<Image>`).
- `src/config/site.ts`: datos pendientes (ver abajo). `src/config/env.ts`: variables de entorno.
- `src/styles/global.css`: hoja de estilos única.
- `src/assets/`: logo e imágenes (se procesan a WebP con anchos responsivos).

Las fuentes (Bricolage Grotesque y DM Sans) están autoalojadas con `@fontsource`.

## Datos pendientes y modo publicable

Todos los datos que faltan están en [`src/config/site.ts`](src/config/site.ts) y hoy están **vacíos**: `whatsapp`, `email`, `horario`, `ciudad`, `instagram`, `linkedin`, `zonasDespacho`, `plazoRespuesta`, `logos`, además de `proyectoDestacado` y `etiquetasProyectos`.

Si un dato está vacío, su elemento no se muestra (fila de horario, bloque de redes, grilla de logos, botones de WhatsApp) y no queda ningún texto entre corchetes. Al completar un valor, el elemento aparece solo.

Ojo: sin `whatsapp` no se muestra la tarjeta "Por WhatsApp", y sin la clave de Web3Forms (ver abajo) no se muestra el formulario de cotización. Con ambos vacíos, Contacto queda sin forma de contacto; completa al menos uno antes de publicar.

## Estado

- **Aprobado:** dirección visual, estructura de secciones y textos de Somos y Cómo trabajamos. Los textos de Somos están escritos a partir de lo que contó Carlos y deben ser validados por él.
- **Provisional:** imágenes (renders con un cliente ficticio, "Norte") y datos de contacto.

## Pendientes

1. Logos de clientes y fotografías reales (los enviará Carlos).
2. WhatsApp, correo, horario y redes (en `src/config/site.ts`).
3. Proyecto destacado real: cliente, contexto y escala (`proyectoDestacado`).
4. Proyectos reales para la grilla de Clientes y proyectos.
5. Zonas de despacho y plazo de respuesta.
6. Crear la cuenta de Web3Forms con el correo de Casa Scout y cargar la clave (ver abajo).
7. Redactar los artículos del blog. Los títulos actuales son propuestas para SEO.
8. Reemplazar `public/og-default.png` por una imagen con fotos reales, definir `PUBLIC_SITE_URL` y pasar `PUBLIC_STAGING` a `false` al publicar.

## Formulario de cotización (Web3Forms)

El formulario de Inicio y Contacto (`src/components/QuoteForm.astro`, lógica en `src/scripts/main.js`) envía a [Web3Forms](https://web3forms.com):

1. Crea una clave de acceso en Web3Forms con el correo donde Casa Scout recibirá las solicitudes.
2. Defínela en la variable de entorno `PUBLIC_WEB3FORMS_KEY`:
   - En local: copia `.env.example` a `.env` y completa el valor.
   - En Vercel: Settings → Environment Variables (Production y Preview) y vuelve a desplegar. La variable se incorpora en el build.
3. Sin clave, el formulario no se muestra. La clave de Web3Forms es pública por diseño (viaja en el navegador).

Incluye honeypot (`botcheck`), validación accesible (errores asociados a cada campo con `aria-describedby`, `aria-invalid`, foco en el primer error), confirmación en la misma página sin recargar y aviso de error con reintento. Se exige nombre, mensaje, y correo o WhatsApp.

La política de privacidad está en `src/pages/privacidad.astro`, enlazada desde el formulario y el pie. Es un texto breve de partida: conviene que la revise una persona del área legal antes de publicar, y ajustarla si cambian el proveedor del formulario, el uso de analítica o los plazos de conservación.

## SEO, staging y analítica

Variables de entorno (ver `.env.example`; se leen en el build, así que cambiarlas exige redesplegar):

| Variable | Qué hace |
|---|---|
| `PUBLIC_SITE_URL` | URL pública sin barra final. Se usa en canónicas, Open Graph, sitemap y `robots.txt`. Sin valor, usa la URL de Vercel. Defínela al tener dominio propio. |
| `PUBLIC_STAGING` | Mientras sea `true`: todas las páginas llevan `noindex, nofollow`, `robots.txt` no anuncia el sitemap y la analítica no se carga. Poner `false` (o dejar vacío) al publicar. **Sin valor, el sitio es indexable.** |
| `PUBLIC_ANALYTICS` | `plausible` o `ga4`. Vacío: sin analítica. |
| `PUBLIC_PLAUSIBLE_DOMAIN`, `PUBLIC_PLAUSIBLE_SRC` | Plausible: dominio registrado y, opcionalmente, URL del script (por defecto `https://plausible.io/js/script.js`). |
| `PUBLIC_GA4_ID` | GA4: ID de medición (`G-XXXXXXXXXX`). |

- **Open Graph y Twitter:** `Base.astro` agrega los metadatos con la imagen por defecto `public/og-default.png` (1200x630). Para regenerarla o cambiarla: `node scripts/make-social-images.mjs`, o reemplaza el archivo por una imagen propia. Cada página puede pasar su propia `image` al layout.
- **Datos estructurados:** el inicio incluye JSON-LD de `Organization` armado con `src/config/site.ts` (nombre y descripción fijos en `marca`; correo, teléfono, ciudad y redes solo si existen).
- **Sitemap y robots:** `@astrojs/sitemap` genera `sitemap-index.xml` (con las URLs `.html`) y `src/pages/robots.txt.ts` genera `robots.txt`. En staging no se bloquea el rastreo con `Disallow`, para que los buscadores puedan leer el `noindex`.
- **Analítica:** `Analytics.astro` carga Plausible o GA4 según las variables. Eventos: clic en WhatsApp (`WhatsApp Click` / `whatsapp_click`, con la página y la zona) y envío del formulario (`Form Submit` / `form_submit`). En GA4 conviene marcar `form_submit` como evento clave. La política de privacidad cambia sola según la analítica activa.

## Publicación (Vercel)

El proyecto debe usar el preset **Astro**, con comando de build `npm run build` y directorio de salida `dist`, y la variable `PUBLIC_WEB3FORMS_KEY` definida.

Las reglas de diseño y lo que no se debe agregar están en [`AGENTS.md`](AGENTS.md). El brief completo está en [`docs/brief.md`](docs/brief.md).
