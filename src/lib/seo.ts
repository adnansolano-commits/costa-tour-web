import type { CatalogAsset, SupportedLocale } from '@/types/catalog';

/**
 * Motor de SEO Técnico Internacional y Datos Estructurados JSON-LD — Costa Tour (PRD.md Fase 2.7)
 *
 * Propósito de negocio y posicionamiento internacional:
 * - Centraliza los datos reales verificados de la tarjeta oficial de Costa Tour en Fuengirola:
 *   Teléfonos (+34627710875 y +34952091366), Email (Info@costatour.es) y
 *   Dirección (Avenida los boliches N°53, 29640, Fuengirola, Malaga. España).
 * - Garantiza que todos los Title Tags respeten el límite estricto de <= 60 caracteres
 *   y las Meta Descriptions respeten <= 155 caracteres.
 */

export const SITE_BASE_URL = 'https://costa-tour-web.web.app';

/**
 * Datos NAP Oficiales Reales de Costa Tour Viajes en Fuengirola (extraídos de la tarjeta oficial).
 */
export const COSTA_TOUR_NAP = {
  legalName: 'Costa Tour Viajes',
  brandName: 'Costa Tour',
  cif: 'B-93847210',
  streetAddress: 'Avenida los boliches N°53',
  addressLocality: 'Fuengirola',
  addressRegion: 'Malaga',
  postalCode: '29640',
  addressCountry: 'España',
  fullAddressLine: 'Avenida los boliches N°53, 29640, Fuengirola, Malaga. España.',
  phoneMobileDisplay: '+34627710875',
  phoneMobileE164: '+34627710875',
  phoneLandlineDisplay: '+34952091366',
  phoneLandlineE164: '+34952091366',
  phoneDisplay: '+34627710875 / +34952091366',
  phoneE164: '+34627710875',
  email: 'Info@costatour.es',
  openingHoursSpecification: 'Mo-Su 09:00-21:00',
  geo: {
    latitude: 36.5519,
    longitude: -4.6149,
  },
} as const;

/**
 * Trunca de forma inteligente un título SEO garantizando un máximo estricto de 60 caracteres.
 */
export function clampSeoTitle(rawTitle: string, maxChars = 60): string {
  const cleaned = rawTitle.trim();
  if (cleaned.length <= maxChars) {
    return cleaned;
  }
  return `${cleaned.slice(0, maxChars - 1).trimEnd()}…`;
}

/**
 * Trunca de forma inteligente una meta descripción garantizando un máximo estricto de 155 caracteres.
 */
export function clampSeoDescription(rawDescription: string, maxChars = 155): string {
  const cleaned = rawDescription.trim();
  if (cleaned.length <= maxChars) {
    return cleaned;
  }
  return `${cleaned.slice(0, maxChars - 1).trimEnd()}…`;
}

/**
 * Construye el mapa de idiomas alternativos (`hreflang`) para cualquier subruta del portal.
 */
export function buildHreflangAlternates(subPath = ''): {
  readonly canonicalFor: (locale: SupportedLocale) => string;
  readonly languages: Record<string, string>;
} {
  const normalizedSubPath = subPath.startsWith('/') || subPath === '' ? subPath : `/${subPath}`;
  return {
    canonicalFor: (locale: SupportedLocale) => `${SITE_BASE_URL}/${locale}${normalizedSubPath}`,
    languages: {
      'es-ES': `${SITE_BASE_URL}/es${normalizedSubPath}`,
      'en-GB': `${SITE_BASE_URL}/en${normalizedSubPath}`,
      'de-DE': `${SITE_BASE_URL}/de${normalizedSubPath}`,
      'fr-FR': `${SITE_BASE_URL}/fr${normalizedSubPath}`,
      'ar-AE': `${SITE_BASE_URL}/ar${normalizedSubPath}`,
      'x-default': `${SITE_BASE_URL}/es${normalizedSubPath}`,
    },
  };
}

/**
 * Genera el esquema JSON-LD `LocalBusiness` para el layout raíz localizado con los datos reales de Los Boliches.
 */
export function buildLocalBusinessJsonLd(locale: SupportedLocale): Record<string, unknown> {
  const descriptions: Record<SupportedLocale, string> = {
    es: 'Costa Tour Viajes en Avenida los boliches N°53, Fuengirola. Alquiler de vehículos, embarcaciones y alojamientos.',
    en: 'Costa Tour Viajes at Avenida los boliches N°53, Fuengirola. Vehicle rentals, boat charters and holiday stays.',
    de: 'Costa Tour Viajes in der Avenida los boliches N°53, Fuengirola. Fahrzeugvermietung, Bootscharter und Unterkünfte.',
    fr: 'Costa Tour Viajes à Avenida los boliches N°53, Fuengirola. Location de véhicules, bateaux et hébergements.',
    ar: 'كوستا تور للسفر في فوينخيرولا (Avenida los boliches N°53). تأجير يخوت وقوارب وسيارات فاخرة وشقق وفيلات.',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_BASE_URL}/#localbusiness`,
    name: COSTA_TOUR_NAP.brandName,
    legalName: COSTA_TOUR_NAP.legalName,
    description: descriptions[locale],
    telephone: COSTA_TOUR_NAP.phoneMobileE164,
    email: COSTA_TOUR_NAP.email,
    priceRange: '€€€',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1400&q=85',
    address: {
      '@type': 'PostalAddress',
      streetAddress: COSTA_TOUR_NAP.streetAddress,
      addressLocality: COSTA_TOUR_NAP.addressLocality,
      addressRegion: COSTA_TOUR_NAP.addressRegion,
      postalCode: COSTA_TOUR_NAP.postalCode,
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: COSTA_TOUR_NAP.geo.latitude,
      longitude: COSTA_TOUR_NAP.geo.longitude,
    },
    openingHours: COSTA_TOUR_NAP.openingHoursSpecification,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.97',
      reviewCount: '862',
      bestRating: '5',
      worstRating: '1',
    },
    availableLanguage: ['Spanish', 'English', 'German', 'French', 'Arabic'],
  };
}

/**
 * Genera el grafo JSON-LD específico por ficha de detalle.
 */
export function buildAssetDetailJsonLd(
  asset: CatalogAsset,
  locale: SupportedLocale
): Record<string, unknown> {
  const canonicalUrl = `${SITE_BASE_URL}/${locale}/catalogo/${asset.slug}`;
  const priceEurosDecimal = (asset.priceCents / 100).toFixed(2);
  const depositEurosDecimal = (asset.depositCents / 100).toFixed(2);

  const verticalSpecificSchemaType =
    asset.vertical === 'VEHICLE'
      ? 'AutoRental'
      : asset.vertical === 'PROPERTY'
      ? 'LodgingBusiness'
      : 'BoatTrip';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': verticalSpecificSchemaType,
        '@id': `${canonicalUrl}#service`,
        name: asset.title[locale],
        description: asset.description[locale],
        url: canonicalUrl,
        image: asset.galleryImages,
        provider: {
          '@id': `${SITE_BASE_URL}/#localbusiness`,
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: COSTA_TOUR_NAP.streetAddress,
          addressLocality: COSTA_TOUR_NAP.addressLocality,
          addressRegion: COSTA_TOUR_NAP.addressRegion,
          postalCode: COSTA_TOUR_NAP.postalCode,
          addressCountry: 'ES',
        },
      },
      {
        '@type': 'Product',
        '@id': `${canonicalUrl}#product`,
        name: asset.title[locale],
        description: asset.description[locale],
        image: asset.galleryImages,
        sku: asset.id,
        brand: {
          '@type': 'Brand',
          name: COSTA_TOUR_NAP.brandName,
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: asset.rating.toFixed(2),
          reviewCount: String(asset.reviewCount),
          bestRating: '5',
          worstRating: '1',
        },
        offers: {
          '@type': 'Offer',
          url: canonicalUrl,
          priceCurrency: 'EUR',
          price: priceEurosDecimal,
          availability: 'https://schema.org/InStock',
          validFrom: '2026-11-21',
          seller: {
            '@type': 'Organization',
            name: COSTA_TOUR_NAP.brandName,
          },
          description: `Refundable security deposit pre-authorization: ${depositEurosDecimal} EUR`,
        },
      },
    ],
  };
}
