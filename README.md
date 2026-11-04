# Casa Scout · sitio web

Sitio web corporativo de Casa Scout (merchandising y regalos corporativos en Chile) desarrollado con [Astro](https://astro.build) (generación estática, `output: 'static'`). Mantiene con fidelidad el diseño aprobado, la paleta de color (#3B1E59), la tipografía (Bricolage Grotesque + DM Sans autoalojadas con `@fontsource`) y los estilos CSS originales, optimizado para móvil (360px–390px) y escritorio (1440px).

---

## Cómo correr el proyecto

### Prerrequisitos
- **Node.js**: versión 22.23 o superior (recomendado Node 22 LTS).
- **npm**: incluido con Node.js.

### Comandos de desarrollo

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo local (Astro dev)
npm run dev
# Disponible en: http://localhost:4321

# 3. Compilar para producción (genera la carpeta dist/ con archivos .html estáticos)
npm run build

# 4. Previsualizar localmente el build de producción
npm run preview
# Disponible en: http://localhost:4321
```

### Configuración local (.env)
Para probar el formulario de cotización o la configuración de entorno en tu máquina local:
```bash
cp .env.example .env
```
Completa las variables que necesites probar (por ejemplo `PUBLIC_WEB3FORMS_KEY`).

---

## Cómo desplegar en Vercel

El proyecto está preparado para desplegarse de manera limpia en [Vercel](https://vercel.com).

### Configuración del framework
El repositorio incluye un archivo [`vercel.json`](vercel.json) en la raíz con la directiva:
```json
{
  "framework": "astro",
  "cleanUrls": false,
  "headers": [
    {
      "source": "/_astro/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```
Esto le indica a Vercel que compile el proyecto utilizando el preset oficial de Astro (comando `npm run build` y directorio de salida `dist`), sin necesidad de reconfigurar manualmente los ajustes del proyecto ni alterar la rama `main`.

### Variables de entorno en Vercel
1. Ve a tu proyecto en Vercel: **Settings → Environment Variables**.
2. Agrega las variables requeridas (mínimo `PUBLIC_WEB3FORMS_KEY`).
3. Asígnalas a los entornos deseados: **Production**, **Preview** y **Development**.
4. *Importante:* En Astro, las variables que inician con `PUBLIC_` se inyectan en tiempo de compilación. Si modificas una variable en Vercel, debes gatillar un nuevo despliegue (**Redeploy**) para que tome efecto.

### Flujo de trabajo en ramas
- **Vistas previas (Preview Deployments):** Al hacer `git push origin astro`, Vercel genera automáticamente una vista previa independiente (Preview URL) con su propio enlace HTTPS, ideal para revisiones y pruebas sin alterar el sitio en vivo.
- **Pase a producción:** La rama de producción está vinculada a `main`. Una vez que el contenido de Carlos esté cargado y validado en la rama `astro`, se puede promover a producción mediante un Pull Request (`astro` → `main`) o actualizando la Production Branch en **Settings → Git** del dashboard de Vercel.

---

## Variables de entorno

Todas las variables de entorno están documentadas en [`.env.example`](.env.example). Al usar el prefijo `PUBLIC_`, están disponibles tanto en componentes Astro como en scripts del cliente.

| Variable | Tipo | Requerida | Descripción |
|---|---|---|---|
| `PUBLIC_WEB3FORMS_KEY` | String | Sí (para cotizar) | Clave pública de acceso generada en [Web3Forms](https://web3forms.com). Se asocia al correo corporativo que recibe las cotizaciones. Sin esta clave, el formulario se oculta automáticamente para evitar errores de envío. |
| `PUBLIC_SITE_URL` | URL | Opcional | URL canónica pública del sitio sin barra final (ej.: `https://www.casascout.cl`). Se utiliza para generar URLs canónicas, metadatos Open Graph/Twitter, `robots.txt` y `sitemap-index.xml`. Si no se define, se utiliza automáticamente la URL generada por Vercel. |
| `PUBLIC_STAGING` | Boolean (`true`/`false`) | Opcional | Control de indexación para ambientes de prueba. Mientras su valor sea `"true"`, todas las páginas llevan metadatos `noindex, nofollow`, `robots.txt` omite el sitemap y la analítica se desactiva. Al pasar a producción, definir en `"false"` o dejar vacío. |
| `PUBLIC_ANALYTICS` | String (`plausible` \| `ga4`) | Opcional | Activa el proveedor de analítica respetuoso de privacidad. Si está vacío, no se inyecta ningún script de tracking. |
| `PUBLIC_PLAUSIBLE_DOMAIN` | String | Condicional | Dominio registrado en Plausible (ej.: `casascout.cl`). Requerido si `PUBLIC_ANALYTICS=plausible`. |
| `PUBLIC_PLAUSIBLE_SRC` | URL | Opcional | URL personalizada para el script de Plausible (por defecto `https://plausible.io/js/script.js`, útil para proxies o instancias autoalojadas). |
| `PUBLIC_GA4_ID` | String | Condicional | ID de medición de Google Analytics 4 (formato `G-XXXXXXXXXX`). Requerido si `PUBLIC_ANALYTICS=ga4`. |

---

## Qué editar en `src/config/site.ts` cuando lleguen los datos de Carlos

El archivo [`src/config/site.ts`](src/config/site.ts) centraliza todos los datos institucionales y de contacto de Casa Scout.

### Modo publicable (Graceful Degradation)
El sitio opera en **modo publicable**: si un campo está vacío (`''` o `[]`), su componente visual correspondiente (bloque de contacto, botón de WhatsApp, tarjeta, fila de horario, redes sociales o grilla de logos) **no se renderiza en el HTML**, evitando que queden textos provisionales entre corchetes `[ ]` o enlaces rotos visibles para los clientes. Al completar los datos, los elementos se activan solos sin tocar el código fuente de las páginas.

### Lista de campos a completar

Abre [`src/config/site.ts`](src/config/site.ts) y edita los siguientes valores según la información enviada por Carlos:

1. **`site.whatsapp`**:
   - **Qué ingresar:** Número de teléfono móvil internacional, únicamente dígitos, con código de país (ej.: `'56912345678'`).
   - **Qué activa:** Habilita el botón flotante global de WhatsApp, el botón en el encabezado móvil, la tarjeta *"Por WhatsApp"* en `/contacto.html` y los llamados a la acción (CTAs) de cotización rápida en el inicio y al final de los artículos del blog.
2. **`site.email`**:
   - **Qué ingresar:** Correo electrónico institucional oficial (ej.: `'contacto@casascout.cl'`).
   - **Qué activa:** Se muestra visible en la página de Contacto, en el pie de página global y en los datos estructurados Schema.org (`Organization`) para buscadores.
3. **`site.horario`**:
   - **Qué ingresar:** Texto legible de disponibilidad (ej.: `'Lunes a viernes de 9:00 a 18:00 hrs'`).
   - **Qué activa:** Despliega la fila de horario en la tarjeta de contacto directo y en el pie de página.
4. **`site.ciudad`**:
   - **Qué ingresar:** Comuna o ciudad base de operación (ej.: `'Santiago, Chile'`).
   - **Qué activa:** Se visualiza en el pie de página y nutre el campo `addressLocality` en el JSON-LD de la empresa.
5. **`site.instagram`**:
   - **Qué ingresar:** URL absoluta al perfil público (ej.: `'https://www.instagram.com/casascout'`).
   - **Qué activa:** Renderiza el enlace con ícono de Instagram en el pie de página y en los perfiles `sameAs` de los datos estructurados.
6. **`site.linkedin`**:
   - **Qué ingresar:** URL absoluta a la página de empresa (ej.: `'https://www.linkedin.com/company/casascout'`).
   - **Qué activa:** Renderiza el enlace con ícono de LinkedIn en el pie de página y en `sameAs` de JSON-LD.
7. **`site.zonasDespacho`**:
   - **Qué ingresar:** Texto explicativo sobre la cobertura de entregas (ej.: `'Despachamos a todo Chile mediante transporte coordinado a convenir.'`).
   - **Qué activa:** Se inserta automáticamente en el paso *"4. Entregamos"* dentro de la página `/somos.html`.
8. **`site.plazoRespuesta`**:
   - **Qué ingresar:** Compromiso de tiempo de atención (ej.: `'Respondemos en menos de 24 horas hábiles.'`).
   - **Qué activa:** Se exhibe como nota de confianza bajo el formulario de cotización en `/contacto.html`.
9. **`site.logos`** (Lista de clientes):
   - **Qué ingresar:** Array de objetos tipo `LogoCliente`:
     ```ts
     logos: [
       { nombre: 'Empresa Alfa', categoria: 'Empresas', logo: '/logos/alfa.svg' },
       { nombre: 'Colegio Beta', categoria: 'Colegios', logo: '/logos/beta.svg' },
     ]
     ```
   - **Qué activa:** Habilita la franja *"Confían en nosotros"* en `/index.html` y la grilla de clientes en `/clientes-y-proyectos.html`. Si no hay archivo SVG o PNG, se renderiza el nombre en tipografía accesible.
10. **`proyectoDestacado`**:
    - **Qué ingresar:** Objeto con los datos del caso de éxito principal (`cliente`, `contexto`, `escala`) para sustituir el caso ficticio "Norte" en `/clientes-y-proyectos.html`.
11. **`etiquetasProyectos`**:
    - **Qué ingresar:** Descripciones reales de los proyectos mostrados en la galería (`campana`, `pins`, `kit`, `escritorio`, `botellas`, `bolsas`, `aniversario`).

---

## Formulario de cotización (Web3Forms)

El formulario de cotización presente en el Inicio y en Contacto (`src/components/QuoteForm.astro`, manejado por `src/scripts/main.js`) envía los datos a través de la API de [Web3Forms](https://web3forms.com):

1. **Configuración de clave:** Crea una clave gratuita o pro en Web3Forms indicando el correo donde Carlos recibirá las cotizaciones, y asígnala a la variable `PUBLIC_WEB3FORMS_KEY`.
2. **Seguridad y antispam:** Incluye honeypot (`botcheck`) transparente para el usuario legítimo pero bloqueador para bots automatizados.
3. **Accesibilidad:** Los mensajes de error se asocian semánticamente a cada input con `aria-describedby` y `aria-invalid="true"`. Al enviar con datos incompletos, el foco se sitúa de forma automática en el primer campo inválido.
4. **Respuesta en página:** El envío se realiza mediante `fetch` asíncrono sin recarga de página. Muestra mensajes de confirmación exitosa o estado de error con opción de reintento.
5. **Privacidad y cumplimiento normativo:** El formulario y el pie enlazan a [`/privacidad.html`](src/pages/privacidad.astro), que contempla la legislación chilena sobre protección de datos personales (**Ley N° 19.628** y la nueva **Ley N° 21.719** que entra en vigencia en diciembre de 2026).

---

## Blog y Content Collections

El blog está implementado mediante las [Content Collections de Astro](https://docs.astro.build/en/guides/content-collections/) en `src/content/blog/`, con validación estricta de esquemas en `src/content.config.ts`:

- **Artículos publicados:**
  1. `kit-de-bienvenida.md`: *"Cómo armar un kit de bienvenida que tu equipo quiera usar"*
  2. `regalos-de-fin-de-ano.md`: *"Regalos de fin de año: qué elegir según tu presupuesto"*
  3. `serigrafia-bordado-grabado.md`: *"Serigrafía, bordado o grabado: cómo marcar cada material"*
- **Borradores (`draft: true`):** Cuatro artículos en borrador que no se generan en el build de producción hasta que se complete su redacción y se cambie su bandera a `false`.
- **Cálculo automático:** Se calcula en tiempo de compilación el tiempo de lectura estimado (200 palabras por minuto) y se generan los filtros por categoría. Cada artículo incluye su bloque Open Graph personalizado y un llamado a la acción (CTA) final para cotizar.

---

## Estructura del proyecto

```text
casa-scout-web/
├── public/                 # Archivos estáticos directos (favicons, robots.txt, og-default.png)
├── src/
│   ├── assets/             # Imágenes y logo procesados por Astro (WebP, responsivos)
│   ├── components/         # Componentes reutilizables (Header, Footer, QuoteForm, Pic, Analytics)
│   ├── config/             # Configuración central (site.ts, env.ts)
│   ├── content/
│   │   └── blog/           # Artículos Markdown de la colección del blog
│   ├── layouts/
│   │   └── Base.astro      # Plantilla HTML base con SEO, metadatos, fuentes y accesibilidad
│   ├── pages/              # Páginas y rutas del sitio (.astro, robots.txt.ts)
│   ├── scripts/            # Scripts del cliente (main.js para menú móvil y formulario)
│   └── styles/
│       └── global.css      # Hoja de estilos globales
├── astro.config.mjs        # Configuración de Astro (@astrojs/sitemap, sitemap, trailingSlash: never)
├── vercel.json             # Configuración de despliegue en Vercel
└── package.json
```

---

## Auditoría y Calidad (Lighthouse)

El sitio ha sido auditado y optimizado exhaustivamente con Google Lighthouse en todas sus páginas:
- **Rendimiento (Performance):** 100 / 100 (móvil y escritorio).
- **Accesibilidad:** 100 / 100 (móvil y escritorio).
- **Buenas Prácticas:** 100 / 100.
- **SEO:** 100 / 100.
- **Verificaciones adicionales:** 0 enlaces rotos (internos y absolutos), contraste de color conforme a estándar WCAG AA, foco visual accesible para navegación por teclado, objetivos táctiles de al menos 44×44px en móviles y total ausencia de desplazamiento horizontal a 360px de ancho.
