import type { MetadataRoute } from 'next';
import { SITE_BASE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

/**
 * Directivas de Rastreo `robots.txt` — Costa Tour (PRD.md Fase 2.7)
 *
 * Propósito de SEO Técnico:
 * - Autoriza el rastreo completo de las rutas públicas localizadas (`/es`, `/en`, `/de`, `/fr`).
 * - Bloquea rutas privadas de API (`/api/`) y enlaza el sitemap canónico.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${SITE_BASE_URL}/sitemap.xml`,
    host: SITE_BASE_URL,
  };
}
