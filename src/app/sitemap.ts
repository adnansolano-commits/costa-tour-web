import type { MetadataRoute } from 'next';
import { MOCK_CATALOG } from '@/data/mockCatalog';
import { SUPPORTED_LOCALES } from '@/i18n/config';
import { buildHreflangAlternates, SITE_BASE_URL } from '@/lib/seo';

/**
 * Generador Dinámico de Sitemap XML Internacional — Costa Tour (PRD.md Fase 2.7)
 *
 * Propósito de SEO Internacional:
 * - Indexa todas las páginas principales localizadas (`/es`, `/en`, `/de`, `/fr`),
 *   todas las fichas de activos del catálogo (`/[lang]/catalogo/[slug]`) y las
 *   páginas legales (`/[lang]/legal/[doc]`).
 * - Incluye el mapa completo de `alternates.languages` (`hreflang`) en cada entrada.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const lastModified = new Date('2026-11-26T12:00:00Z');

  // 1. Rutas principales por idioma
  const homeAlternates = buildHreflangAlternates('');
  for (const locale of SUPPORTED_LOCALES) {
    entries.push({
      url: `${SITE_BASE_URL}/${locale}`,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: homeAlternates.languages,
      },
    });
  }

  // 2. Fichas dinámicas de cada activo del catálogo en los 4 idiomas
  for (const asset of MOCK_CATALOG) {
    const assetAlternates = buildHreflangAlternates(`/catalogo/${asset.slug}`);
    for (const locale of SUPPORTED_LOCALES) {
      entries.push({
        url: `${SITE_BASE_URL}/${locale}/catalogo/${asset.slug}`,
        lastModified,
        changeFrequency: 'daily',
        priority: 0.9,
        alternates: {
          languages: assetAlternates.languages,
        },
      });
    }
  }

  // 3. Páginas legales RGPD en los 4 idiomas
  const legalDocs = [
    'aviso-legal',
    'privacidad',
    'cookies',
    'condiciones-alquiler',
  ] as const;

  for (const doc of legalDocs) {
    const legalAlternates = buildHreflangAlternates(`/legal/${doc}`);
    for (const locale of SUPPORTED_LOCALES) {
      entries.push({
        url: `${SITE_BASE_URL}/${locale}/legal/${doc}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.4,
        alternates: {
          languages: legalAlternates.languages,
        },
      });
    }
  }

  return entries;
}
