// Casa Scout · comportamiento del sitio (JavaScript simple, sin dependencias)

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

// Formulario de cotización (Inicio y Contacto) → Web3Forms.
// La clave llega por data-key (variable de entorno PUBLIC_WEB3FORMS_KEY, ver QuoteForm.astro).
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const TIMEOUT_MS = 15000;

document.querySelectorAll('[data-quote-form]').forEach((form) => {
  const fields = form.querySelector('[data-fields]');
  const failBox = form.querySelector('[data-fail]');
  const okBox = form.querySelector('[data-ok]');
  const button = form.querySelector('button[type="submit"]');
  const buttonLabel = button.textContent;
  const input = (name) => form.querySelector(`[name="${name}"]`);

  const errBox = (el) => form.querySelector(`#${el.id}-err`);
  const setError = (el, msg) => {
    const box = errBox(el);
    box.textContent = msg;
    box.hidden = false;
    el.setAttribute('aria-invalid', 'true');
  };
  const clearError = (el) => {
    const box = errBox(el);
    box.textContent = '';
    box.hidden = true;
    el.removeAttribute('aria-invalid');
  };
  // El aviso tiene role="alert": los lectores de pantalla lo anuncian al aparecer.
  const showFail = (msg, fallbackEmail) => {
    failBox.textContent = msg;
    if (fallbackEmail) {
      failBox.append(' También puedes escribirnos a ');
      const a = document.createElement('a');
      a.href = `mailto:${fallbackEmail}`;
      a.textContent = fallbackEmail;
      failBox.append(a, '.');
    }
    failBox.hidden = false;
  };
  const hideFail = () => {
    failBox.hidden = true;
    failBox.textContent = '';
  };

  const nombre = input('nombre');
  const correo = input('correo');
  const whatsapp = input('whatsapp');
  const necesidad = input('necesidad');
  // En orden de aparición en el formulario
  const all = [nombre, correo, whatsapp, necesidad];

  // Limpia el error de un campo apenas la persona lo corrige.
  all.forEach((el) => el.addEventListener('input', () => clearError(el)));
  correo.addEventListener('input', () => clearError(whatsapp));
  whatsapp.addEventListener('input', () => clearError(correo));

  // Marca los campos con error y devuelve la lista (en orden de aparición).
  function validate() {
    all.forEach(clearError);

    if (!nombre.value.trim()) setError(nombre, 'Escribe tu nombre.');

    const mail = correo.value.trim();
    const wa = whatsapp.value.trim();
    if (mail && !correo.checkValidity()) {
      setError(correo, 'Revisa el correo: parece incompleto.');
    }
    if (wa && wa.replace(/\D/g, '').length < 8) {
      setError(whatsapp, 'Revisa el número de WhatsApp.');
    }
    if (!mail && !wa) {
      const msg = 'Déjanos un correo o un WhatsApp para poder responderte.';
      setError(correo, msg);
      setError(whatsapp, msg);
    }

    if (!necesidad.value.trim()) setError(necesidad, 'Cuéntanos qué necesitas.');

    return all.filter((el) => el.getAttribute('aria-invalid') === 'true');
  }

  const showOk = () => {
    fields.hidden = true;
    okBox.hidden = false;
    okBox.focus();
  };

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    if (button.disabled) return;
    hideFail();

    const invalid = validate();
    if (invalid.length) {
      showFail('Revisa los campos marcados para poder enviar tu solicitud.');
      invalid[0].focus();
      return;
    }

    // Honeypot: si un bot lo marcó, simulamos éxito sin enviar nada.
    if (input('botcheck').checked) {
      showOk();
      return;
    }

    const payload = {
      access_key: form.dataset.key,
      subject: `Solicitud de cotización · ${nombre.value.trim()}`,
      from_name: 'Casa Scout · Sitio web',
      botcheck: '',
      nombre: nombre.value.trim(),
      correo: correo.value.trim(),
      whatsapp: whatsapp.value.trim(),
      necesidad: necesidad.value.trim(),
      pagina: window.location.pathname,
    };
    // Web3Forms usa "email" como remitente y Reply-To
    if (payload.correo) payload.email = payload.correo;

    button.disabled = true;
    button.textContent = 'Enviando…';
    form.setAttribute('aria-busy', 'true');

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    let failed = false;
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.message || `HTTP ${res.status}`);
      showOk();
    } catch (err) {
      failed = true;
      showFail(
        'No pudimos enviar tu solicitud. Revisa tu conexión e inténtalo de nuevo en unos minutos.',
        form.dataset.fallbackEmail,
      );
    } finally {
      clearTimeout(timer);
      button.disabled = false;
      button.textContent = buttonLabel;
      form.removeAttribute('aria-busy');
      // Un botón deshabilitado pierde el foco: lo devolvemos al botón para poder reintentar.
      if (failed) button.focus();
    }
  });

  // "Enviar otra solicitud": vuelve al formulario vacío.
  form.querySelector('[data-again]').addEventListener('click', () => {
    form.reset();
    all.forEach(clearError);
    hideFail();
    okBox.hidden = true;
    fields.hidden = false;
    nombre.focus();
  });
});
