/**
 * Datos pendientes de Casa Scout.
 *
 * Todos están vacíos. Mientras un dato esté vacío, el elemento que lo usa
 * NO se muestra en el sitio (no queda ningún texto entre corchetes).
 * Al completar un valor, el elemento aparece solo.
 */

export type LogoCliente = {
  /** Nombre del cliente (se muestra como texto, o como alt si hay logo). */
  nombre: string;
  /** Agrupa los nombres en la sección "Confían en nosotros" del inicio. */
  categoria: 'Empresas' | 'Corporaciones' | 'Colegios' | 'Instituciones';
  /** Opcional: ruta pública del logo en gris (por ejemplo '/logos/cliente.svg'). */
  logo?: string;
};

export const site = {
  /** Solo dígitos con código de país, sin + ni espacios. Ej.: '56912345678'. Habilita todos los botones de WhatsApp. */
  whatsapp: '',
  /** Correo de contacto. Habilita el formulario de cotización (abre el correo del visitante) y se muestra en pie y contacto. */
  email: '',
  /** Horario de atención. Ej.: 'Lunes a viernes, 9:00 a 18:00'. */
  horario: '',
  /** Ciudad. Ej.: 'Santiago, Chile'. */
  ciudad: '',
  /** URL completa del perfil. Ej.: 'https://www.instagram.com/casascout'. */
  instagram: '',
  /** URL completa del perfil. Ej.: 'https://www.linkedin.com/company/casascout'. */
  linkedin: '',
  /** Zonas de despacho. Ej.: 'Despachamos a todo Chile.' Se agrega al paso "Entregamos" de Somos. */
  zonasDespacho: '',
  /** Plazo de respuesta. Ej.: 'Respondemos en 24 horas hábiles.' Se agrega bajo "Solicitar cotización" en Contacto. */
  plazoRespuesta: '',
  /** Clientes. Vacío: se ocultan "Confían en nosotros" (Inicio) y la grilla de logos (Clientes y proyectos). */
  logos: [] as LogoCliente[],
};

/** Proyecto destacado de Clientes y proyectos. Vacío: se omiten el texto y las filas correspondientes. */
export const proyectoDestacado = {
  contexto: '',
  cliente: '',
  escala: '',
};

/**
 * Etiqueta bajo cada proyecto (cliente o institución). Vacía: no se muestra.
 * La clave "campana" usa además proyectoDestacado.cliente y .escala.
 */
export const etiquetasProyectos: Record<string, string> = {
  campana: '',
  pins: '',
  kit: '',
  escritorio: '',
  botellas: '',
  bolsas: '',
  aniversario: '',
};

/** Enlace de WhatsApp o cadena vacía si no hay número. */
export const waUrl = site.whatsapp ? `https://wa.me/${site.whatsapp.replace(/\D/g, '')}` : '';

/** Datos fijos de la marca (no son pendientes): se usan en metadatos y datos estructurados. */
export const marca = {
  nombre: 'Casa Scout',
  descripcion:
    'Merchandising, regalos corporativos, kits de bienvenida y proyectos personalizados para empresas, colegios e instituciones en Chile.',
  /** Imagen por defecto para compartir en redes (1200x630, en public/). */
  imagen: '/og-default.png',
  imagenAlt: 'Logo de Casa Scout junto a un kit de bienvenida con libreta, botella y pin',
  /** Logo en PNG para datos estructurados (en public/). */
  logo: '/logo-casa-scout.png',
};
