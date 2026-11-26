import type { BillingUnit, SupportedLocale } from '@/types/catalog';

/**
 * Configuración Base de Internacionalización (i18n) y Formateo Financiero — Costa Tour
 *
 * Propósito de negocio y seguridad:
 * - Define los 4 idiomas oficiales de operación turística en Fuengirola (ES, EN, DE, FR).
 * - Proporciona conversión determinista de céntimos enteros a moneda formateada (EUR),
 *   garantizando que ningún cálculo intermedio sufra desviaciones de coma flotante.
 */

export const SUPPORTED_LOCALES: readonly SupportedLocale[] = ['es', 'en', 'de', 'fr'] as const;

export const DEFAULT_LOCALE: SupportedLocale = 'es';

export const LOCALE_LABELS: Record<SupportedLocale, { short: string; nativeName: string; bcp47: string }> = {
  es: { short: 'ES', nativeName: 'Español', bcp47: 'es-ES' },
  en: { short: 'EN', nativeName: 'English', bcp47: 'en-GB' },
  de: { short: 'DE', nativeName: 'Deutsch', bcp47: 'de-DE' },
  fr: { short: 'FR', nativeName: 'Français', bcp47: 'fr-FR' },
};

/**
 * Verifica de forma segura en tiempo de ejecución si un parámetro de ruta es un idioma soportado.
 */
export function isValidLocale(candidate: string): candidate is SupportedLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(candidate);
}

/**
 * Convierte un importe en céntimos enteros (`number` entero) a una cadena formateada en Euros
 * según la convención regional del idioma activo.
 *
 * @param amountInCents Importe en céntimos enteros (ej. 14500 para 145,00 €).
 * @param locale Idioma activo del usuario.
 * @param includeDecimals Si es `false`, oculta `,00` en importes exactos para tarjetas compactas.
 */
export function formatCentsToEUR(
  amountInCents: number,
  locale: SupportedLocale,
  includeDecimals = false
): string {
  if (!Number.isInteger(amountInCents)) {
    throw new Error(`Violación de integridad financiera: se esperaba un entero en céntimos y se recibió ${amountInCents}`);
  }

  const euros = amountInCents / 100;
  const bcp47 = LOCALE_LABELS[locale].bcp47;

  return new Intl.NumberFormat(bcp47, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: includeDecimals ? 2 : euros % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(euros);
}

/**
 * Devuelve la etiqueta localizada de la unidad de facturación (día, noche, hora).
 */
export function formatBillingUnitLabel(unit: BillingUnit, locale: SupportedLocale): string {
  const labels: Record<BillingUnit, Record<SupportedLocale, string>> = {
    DAY: { es: '/ día', en: '/ day', de: '/ Tag', fr: '/ jour' },
    NIGHT: { es: '/ noche', en: '/ night', de: '/ Nacht', fr: '/ nuit' },
    HOUR: { es: '/ hora', en: '/ hour', de: '/ Stunde', fr: '/ heure' },
  };
  return labels[unit][locale];
}
