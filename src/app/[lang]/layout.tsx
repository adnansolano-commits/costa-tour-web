import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { CookieConsentBanner } from '@/components/CookieConsentBanner';
import { FooterLocalSeo } from '@/components/FooterLocalSeo';
import { NavbarGlobal } from '@/components/NavbarGlobal';
import { WhatsAppFloatingButton } from '@/components/WhatsAppFloatingButton';
import {
  DEFAULT_LOCALE,
  getLocaleDirection,
  isValidLocale,
  LOCALE_LABELS,
  SUPPORTED_LOCALES,
} from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import {
  buildHreflangAlternates,
  buildLocalBusinessJsonLd,
  clampSeoDescription,
  clampSeoTitle,
  COSTA_TOUR_NAP,
} from '@/lib/seo';
import type { SupportedLocale } from '@/types/catalog';

/**
 * Layout Localizado por Idioma (`/[lang]`) — Costa Tour (PRD.md Fase 2.6 y 2.7)
 *
 * Propósito de negocio, cumplimiento RGPD y SEO Técnico Internacional:
 * - Genera estáticamente las rutas para los 4 idiomas oficiales (`/es`, `/en`, `/de`, `/fr`).
 * - Inyecta metadatos dinámicos con Title <= 60 caracteres, Meta Description <= 155 caracteres,
 *   etiquetas `canonical`, `alternates.languages` (`hreflang`) y Open Graph completo.
 * - Inyecta el esquema JSON-LD `LocalBusiness` de Costa Tour Fuengirola en el layout raíz.
 * - Integra de forma global `NavbarGlobal`, `FooterLocalSeo`, `CookieConsentBanner` y `WhatsAppFloatingButton`.
 */
export function generateStaticParams(): Array<{ lang: SupportedLocale }> {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  readonly params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: SupportedLocale = isValidLocale(lang) ? lang : DEFAULT_LOCALE;
  const dict = getDictionary(locale);
  const alternates = buildHreflangAlternates('');
  const title = clampSeoTitle(dict.seo.defaultTitle);
  const description = clampSeoDescription(dict.seo.defaultDescription);
  const canonicalUrl = alternates.canonicalFor(locale);

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
          url: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1400&q=85',
          width: 1400,
          height: 900,
          alt: dict.hero.videoPosterAlt,
        },
      ],
    },
  };
}

export default async function LocalizedLayout({
  children,
  params,
}: {
  readonly children: ReactNode;
  readonly params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: SupportedLocale = isValidLocale(lang) ? lang : DEFAULT_LOCALE;
  const dict = getDictionary(locale);
  const localBusinessJsonLd = buildLocalBusinessJsonLd(locale);
  const direction = getLocaleDirection(locale);

  return (
    <div
      dir={direction}
      lang={locale}
      data-locale={locale}
      className="flex min-h-screen flex-col bg-[#F8FAFC] text-[#0F172A]"
    >
      {/* Datos Estructurados JSON-LD LocalBusiness en el Layout Raíz (PRD.md Fase 2.7) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      <NavbarGlobal locale={locale} dict={dict.nav} />
      <div className="flex-1">{children}</div>
      <FooterLocalSeo
        locale={locale}
        footerDict={dict.footer}
        navDict={dict.nav}
        manageCookiesLabel={dict.cookies.manageCookiesFooterLink}
      />
      <CookieConsentBanner
        locale={locale}
        dict={dict.cookies}
        cookiePolicyLabel={dict.footer.legalLinks.cookies}
      />
      <WhatsAppFloatingButton
        label={dict.nav.whatsappFloatingLabel}
        prefilledText={dict.nav.whatsappPrefilledText}
      />
    </div>
  );
}
