# Casa Scout · sitio web

Sitio de Casa Scout (merchandising y regalos corporativos, Chile) en su dirección corporativa aprobada. Son seis páginas en HTML, CSS y JavaScript simple, sin dependencias ni paso de compilación.

## Verlo en local

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

También se puede abrir `index.html` directamente en el navegador.

## Estado

- **Aprobado:** dirección visual, estructura de secciones y textos de Somos y Cómo trabajamos. Los textos de Somos están escritos a partir de lo que contó Carlos y deben ser validados por él.
- **Provisional:** imágenes (renders con un cliente ficticio, "Norte") y datos de contacto.

## Pendientes

1. Logos de clientes y fotografías reales (los enviará Carlos).
2. Número de WhatsApp (`https://wa.me/[número]`), correo de contacto (también en `CONTACT_EMAIL`, en `js/main.js`), horario y redes sociales.
3. Proyecto destacado real: cliente, contexto y escala.
4. Proyectos reales para la grilla de Clientes y proyectos.
5. Zonas de despacho y plazo de respuesta.
6. Conectar el formulario a un servicio real. Hoy abre el correo del visitante con el mensaje ya armado.
7. Redactar los artículos del blog. Los títulos actuales son propuestas para SEO.

## Próximos pasos sugeridos

- Pasar el sitio a un generador estático (por ejemplo, Astro) para tener el encabezado y el pie en un solo lugar y el blog en Markdown, conservando el mismo HTML y CSS.
- Agregar metadatos para compartir en redes (Open Graph), `sitemap.xml` y `robots.txt`.
- Optimizar las fotos reales en WebP o AVIF, con anchos responsivos.

Las reglas de diseño y lo que no se debe agregar están en [`AGENTS.md`](AGENTS.md). El brief completo está en [`docs/brief.md`](docs/brief.md).
