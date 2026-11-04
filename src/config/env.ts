/**
 * Variables de entorno del sitio (ver .env.example). Todas se leen en el build.
 */
const flag = (v: unknown) => String(v ?? '').trim().toLowerCase() === 'true';
const text = (v: unknown) => String(v ?? '').trim();

/** Mientras sea true, todas las páginas llevan noindex y la analítica no se carga. */
export const staging = flag(import.meta.env.PUBLIC_STAGING);

/** Analítica activable: "plausible" o "ga4". Vacío: sin analítica. */
const provider = text(import.meta.env.PUBLIC_ANALYTICS).toLowerCase();
const plausibleDomain = text(import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN);
const plausibleSrc = text(import.meta.env.PUBLIC_PLAUSIBLE_SRC) || 'https://plausible.io/js/script.js';
const ga4Id = text(import.meta.env.PUBLIC_GA4_ID);

export const analytics = {
  provider:
    !staging && provider === 'plausible' && plausibleDomain
      ? ('plausible' as const)
      : !staging && provider === 'ga4' && ga4Id
        ? ('ga4' as const)
        : null,
  plausibleDomain,
  plausibleSrc,
  ga4Id,
};
