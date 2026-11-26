import type { CatalogAsset, SupportedLocale } from '@/types/catalog';

/**
 * Motor de SEO Técnico Internacional y Datos Estructurados JSON-LD — Costa Tour (PRD.md Fase 2.7)
 *
 * Propósito de negocio y posicionamiento internacional:
 * - Garantiza que todos los Title Tags respeten el límite estricto de <= 60 caracteres
 *   y las Meta Descriptions respeten <= 155 caracteres para evitar truncamientos en SERPs.
 * - Genera grafos JSON-LD validados por Schema.org: `LocalBusiness` en el layout raíz
 *   y `@graph` específico por vertical (`AutoRental`, `LodgingBusiness`, `Product` + `Offer`)
 *   en cada ficha de detalle del catálogo.
 */

export const SITE_BASE_URL = 'https://costatour.es';

/**
 * Datos NAP Oficiales de Costa Tour en Fuengirola (Name, Address, Phone).
 */
export const COSTA_TOUR_NAP = {
  legalName: 'Costa Tour Fuengirola S.L.',
  brandName: 'Costa Tour Fuengirola',
  cif: 'B-93847210',
  streetAddress: 'Paseo Marítimo Rey de España 42 & Puerto Deportivo Muelle 1',
  addressLocality: 'Fuengirola',
  addressRegion: 'Málaga',
  postalCode: '29640',
  addressCountry: 'ES',
  phoneDisplay: '+34 952 000 111',
  phoneE164: '+34952000111',
  email: 'reservas@costatour.es',
  openingHoursSpecification: 'Mo-Su 08:30-21:30',
  geo: {
    latitude: 36.5414,
    longitude: -4.6203,
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
 *
 * @param subPath Ruta interna sin prefijo de idioma (ej. `""` o `"/catalogo/slug"`).
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
      'x-default': `${SITE_BASE_URL}/es${normalizedSubPath}`,
    },
  };
}

/**
 * Genera el esquema JSON-LD `LocalBusiness` para el layout raíz localizado.
 */
export function buildLocalBusinessJsonLd(locale: SupportedLocale): Record<string, unknown> {
  const descriptions: Record<SupportedLocale, string> = {
    es: 'Portal oficial de alquiler de yates, barcos sin licencia, vehículos deportivos y villas de lujo en Fuengirola.',
    en: 'Official rental portal for luxury yachts, license-free boats, sports cars and beachfront villas in Fuengirola.',
    de: 'Offizielles Buchungsportal für Luxusyachten, führerscheinfreie Boote, Sportwagen und Strandvillen in Fuengirola.',
    fr: 'Portail officiel de location de yachts, bateaux sans permis, voitures de sport et villas de luxe à Fuengirola.',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_BASE_URL}/#localbusiness`,
    name: COSTA_TOUR_NAP.brandName,
    legalName: COSTA_TOUR_NAP.legalName,
    description: descriptions[locale],
    url: `${SITE_BASE_URL}/${locale}`,
    telephone: COSTA_TOUR_NAP.phoneE164,
    email: COSTA_TOUR_NAP.email,
    priceRange: '€€€',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1400&q=85',
    address: {
      '@type': 'PostalAddress',
      streetAddress: COSTA_TOUR_NAP.streetAddress,
      addressLocality: COSTA_TOUR_NAP.addressLocality,
      addressRegion: COSTA_TOUR_NAP.addressRegion,
      postalCode: COSTA_TOUR_NAP.postalCode,
      addressCountry: COSTA_TOUR_NAP.addressCountry,
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
    availableLanguage: ['Spanish', 'English', 'German', 'French'],
  };
}

/**
 * Genera el grafo JSON-LD específico por ficha de detalle:
 * Combina el esquema sectorial (`AutoRental` o `LodgingBusiness`) con `Product` y `Offer`,
 * convirtiendo el precio desde céntimos enteros al formato decimal ISO exigido por Schema.org.
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
          streetAddress: asset.technicalMetadata.pickupOrZone[locale],
          addressLocality: COSTA_TOUR_NAP.addressLocality,
          addressRegion: COSTA_TOUR_NAP.addressRegion,
          postalCode: COSTA_TOUR_NAP.postalCode,
          addressCountry: COSTA_TOUR_NAP.addressCountry,
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
