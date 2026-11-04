// Casa Scout · comportamiento del sitio (JavaScript simple, sin dependencias)

// El correo de destino viene de src/config/site.ts (atributo data-email del formulario).

// Filtros por categoría (Clientes y proyectos, Blog)
document.querySelectorAll('[data-filter-list]').forEach((list) => {
  const section = list.closest('section');
  const chips = section.querySelectorAll('.chip[data-filter]');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const cat = chip.dataset.filter;
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
      list.querySelectorAll('[data-cat]').forEach((item) => {
        item.hidden = !(cat === 'todo' || item.dataset.cat === cat);
      });
    });
  });
});

// Formulario de cotización (Inicio y Contacto).
// Por ahora abre el correo del visitante con el mensaje armado.
// Para enviar a un servicio de formularios o a un backend, reemplazar el mailto de abajo.
document.querySelectorAll('[data-quote-form]').forEach((form) => {
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const data = new FormData(form);
    const nombre = (data.get('nombre') || '').trim();
    if (!nombre) {
      form.querySelector('[name="nombre"]').focus();
      return;
    }
    const body = 'Nombre: ' + nombre +
      '\nCorreo: ' + (data.get('correo') || '') +
      '\nWhatsApp: ' + (data.get('whatsapp') || '') +
      '\n\n' + (data.get('necesidad') || '');
    const subject = 'Solicitud de cotización · ' + nombre;
    window.location.href = 'mailto:' + (form.dataset.email || '') +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
  });
});
