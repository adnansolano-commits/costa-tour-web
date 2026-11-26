import type { BillingUnit, SupportedLocale } from '@/types/catalog';

/**
 * Configuración Base de Internacionalización (i18n + RTL) y Formateo Financiero — Costa Tour
 *
 * Propósito de negocio y seguridad:
 * - Define los 5 idiomas oficiales de operación turística en Fuengirola (ES, EN, DE, FR, AR).
 * - Soporta direccionalidad bidireccional (`ltr` y `rtl` para Árabe).
 * - Proporciona conversión determinista de céntimos enteros a moneda formateada (EUR).
 */

export const SUPPORTED_LOCALES: readonly SupportedLocale[] = ['es', 'en', 'de', 'fr', 'ar'] as const;

export const DEFAULT_LOCALE: SupportedLocale = 'es';

export const LOCALE_LABELS: Record<
  SupportedLocale,
  { short: string; nativeName: string; bcp47: string; dir: 'ltr' | 'rtl' }
> = {
  es: { short: 'ES', nativeName: 'Español', bcp47: 'es-ES', dir: 'ltr' },
  en: { short: 'EN', nativeName: 'English', bcp47: 'en-GB', dir: 'ltr' },
  de: { short: 'DE', nativeName: 'Deutsch', bcp47: 'de-DE', dir: 'ltr' },
  fr: { short: 'FR', nativeName: 'Français', bcp47: 'fr-FR', dir: 'ltr' },
  ar: { short: 'AR', nativeName: 'العربية', bcp47: 'ar-AE', dir: 'rtl' },
};

/**
 * Devuelve la dirección de lectura (`ltr` o `rtl`) correspondiente al idioma activo.
 */
export function getLocaleDirection(locale: SupportedLocale): 'ltr' | 'rtl' {
  return LOCALE_LABELS[locale]?.dir ?? 'ltr';
}

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
    throw new Error(
      `Violación de integridad financiera: se esperaba un entero en céntimos y se recibió ${amountInCents}`
    );
  }

  const euros = amountInCents / 100;
  // Para árabe usamos numerales occidentales claros con símbolo EUR para máxima legibilidad bancaria
  const bcp47 = locale === 'ar' ? 'en-IE' : LOCALE_LABELS[locale].bcp47;

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
    DAY: { es: '/ día', en: '/ day', de: '/ Tag', fr: '/ jour', ar: '/ يوم' },
    NIGHT: { es: '/ noche', en: '/ night', de: '/ Nacht', fr: '/ nuit', ar: '/ ليلة' },
    HOUR: { es: '/ hora', en: '/ hour', de: '/ Stunde', fr: '/ heure', ar: '/ ساعة' },
  };
  return labels[unit][locale];
}
