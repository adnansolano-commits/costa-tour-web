import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AssetDetailBookingClient } from '@/components/AssetDetailBookingClient';
import { getAssetBySlug, MOCK_CATALOG } from '@/data/mockCatalog';
import { DEFAULT_LOCALE, isValidLocale, LOCALE_LABELS, SUPPORTED_LOCALES } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import {
  buildAssetDetailJsonLd,
  buildHreflangAlternates,
  clampSeoDescription,
  clampSeoTitle,
  COSTA_TOUR_NAP,
} from '@/lib/seo';
import type { SupportedLocale } from '@/types/catalog';

/**
 * Ruta Dinámica de Ficha de Detalle (`/[lang]/catalogo/[slug]`) — Costa Tour (PRD.md Fase 2.4 y 2.7)
 *
 * Propósito de negocio y SEO Internacional:
 * - Pre-renderiza estáticamente todas las combinaciones de idioma y activo del catálogo.
 * - Garantiza Title <= 60 caracteres y Meta Description <= 155 caracteres mediante `clampSeoTitle`
 *   y `clampSeoDescription`, junto con `canonical`, `hreflang` completo y Open Graph.
 * - Inyecta datos estructurados JSON-LD (`AutoRental` / `LodgingBusiness` / `BoatTrip` + `Product` + `Offer`).
 */
export function generateStaticParams(): Array<{ lang: SupportedLocale; slug: string }> {
  const params: Array<{ lang: SupportedLocale; slug: string }> = [];
  for (const lang of SUPPORTED_LOCALES) {
    for (const asset of MOCK_CATALOG) {
      params.push({ lang, slug: asset.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  readonly params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale: SupportedLocale = isValidLocale(lang) ? lang : DEFAULT_LOCALE;
  const asset = getAssetBySlug(slug);

  if (!asset) {
    return {};
  }

  const alternates = buildHreflangAlternates(`/catalogo/${asset.slug}`);
  const canonicalUrl = alternates.canonicalFor(locale);
  const title = clampSeoTitle(`${asset.title[locale]} | Costa Tour`);
  const description = clampSeoDescription(asset.description[locale]);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates.languages,
    },
    openGraph: {
      type: 'website',
      locale: LOCALE_LABELS[locale].bcp47.replace('-', '_'),
      url: canonicalUrl,
      siteName: COSTA_TOUR_NAP.brandName,
      title,
      description,
      images: [
        {
          url: asset.mainImage,
          width: 1400,
          height: 900,
          alt: asset.imageAlt[locale],
        },
      ],
    },
  };
}

export default async function AssetDetailPage({
  params,
}: {
  readonly params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale: SupportedLocale = isValidLocale(lang) ? lang : DEFAULT_LOCALE;
  const asset = getAssetBySlug(slug);

  if (!asset) {
    notFound();
  }

  const dict = getDictionary(locale);
  const assetJsonLd = buildAssetDetailJsonLd(asset, locale);

  return (
    <main>
      {/* Datos Estructurados JSON-LD Específicos por Vertical + Product + Offer (PRD.md Fase 2.7) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(assetJsonLd) }}
      />

      <AssetDetailBookingClient
        locale={locale}
        asset={asset}
        catalogDict={dict.catalog}
        detailDict={dict.detail}
      />
    </main>
  );
}
