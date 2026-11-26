'use client';

import Link from 'next/link';
import { AtSign, Clock, Cookie, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { OPEN_COOKIE_MODAL_EVENT } from '@/components/CookieConsentBanner';
import { CostaTourLogo } from '@/components/CostaTourLogo';
import { COSTA_TOUR_NAP } from '@/lib/seo';
import type { UIDictionary } from '@/i18n/dictionaries';
import type { SupportedLocale } from '@/types/catalog';

export interface FooterLocalSeoProps {
  readonly locale: SupportedLocale;
  readonly footerDict: UIDictionary['footer'];
  readonly navDict: UIDictionary['nav'];
  readonly manageCookiesLabel: string;
}

/**
 * Footer Institucional con Datos Reales Verificados y Logo Oficial — Costa Tour
 *
 * Propósito de negocio y SEO Local:
 * - Recrea el logotipo oficial de Costa Tour Viajes ("VIAJA. DESCUBRE. VIVE.").
 * - Muestra exclusivamente los datos reales de la tarjeta oficial (sin la URL web):
 *   • Teléfonos: +34627710875 / +34952091366
 *   • Correo: Info@costatour.es
 *   • Dirección: Avenida los boliches N°53, 29640, Fuengirola, Malaga. España.
 */
export function FooterLocalSeo({
  locale,
  footerDict,
  manageCookiesLabel,
}: FooterLocalSeoProps) {
  const handleOpenCookiePreferences = () => {
    window.dispatchEvent(new CustomEvent(OPEN_COOKIE_MODAL_EVENT));
  };

  return (
    <footer className="border-t border-white/10 bg-[#0A1628] text-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Columna 1 (5 cols): Logotipo Oficial Recreado + Tarjeta de Datos Reales (SIN la web) */}
          <div className="space-y-6 lg:col-span-5">
            <CostaTourLogo variant="navbar" />

            <p className="text-sm leading-relaxed text-[#94A3B8]">
              {footerDict.brandSummary}
            </p>

            {/* Bloque NAP con los Datos Exactos de la Tarjeta (Sin mostrar URL web) */}
            <div className="rounded-3xl border border-white/15 bg-[#112240] p-6 shadow-xl">
              <p className="text-xs font-extrabold uppercase tracking-wider text-[#F59E0B]">
                {footerDict.napHeading}
              </p>

              <address className="mt-4 space-y-3.5 not-italic text-sm text-[#F8FAFC]">
                {/* Teléfonos: +34627710875 y +34952091366 */}
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#0A1628]">
                    <Phone className="h-4 w-4 fill-current" aria-hidden="true" />
                  </span>
                  <div
                    dir="ltr"
                    className="numeric-tabular flex flex-col text-start font-bold tracking-wide text-[#F8FAFC]"
                  >
                    <a
                      href={`tel:${COSTA_TOUR_NAP.phoneMobileE164}`}
                      className="transition-colors hover:text-[#F59E0B]"
                    >
                      {COSTA_TOUR_NAP.phoneMobileDisplay}
                    </a>
                    <a
                      href={`tel:${COSTA_TOUR_NAP.phoneLandlineE164}`}
                      className="mt-0.5 transition-colors hover:text-[#F59E0B]"
                    >
                      {COSTA_TOUR_NAP.phoneLandlineDisplay}
                    </a>
                  </div>
                </div>

                {/* Email: Info@costatour.es */}
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#0A1628]">
                    <AtSign className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
                  </span>
                  <a
                    href={`mailto:${COSTA_TOUR_NAP.email}`}
                    className="font-bold text-[#F8FAFC] transition-colors hover:text-[#F59E0B]"
                  >
                    {COSTA_TOUR_NAP.email}
                  </a>
                </div>

                {/* Dirección: Avenida los boliches N°53, 29640, Fuengirola, Malaga. España. */}
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#0A1628]">
                    <MapPin className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
                  </span>
                  <div className="font-bold leading-snug text-[#F8FAFC]">
                    <p>Avenida los boliches</p>
                    <p>N°53, 29640,</p>
                    <p>Fuengirola, Malaga.</p>
                    <p>España.</p>
                  </div>
                </div>

                {/* Horario Operativo */}
                <p className="numeric-tabular flex items-start gap-2.5 border-t border-white/10 pt-3 text-xs text-[#94A3B8]">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#F59E0B]" aria-hidden="true" />
                  <span>
                    <strong className="text-[#F8FAFC]">{footerDict.hoursLabel}</strong>{' '}
                    {footerDict.hoursValue}
                  </span>
                </p>
              </address>
            </div>
          </div>

          {/* Columna 2 (3 cols): Enlaces Legales RGPD */}
          <div className="space-y-6 lg:col-span-3">
            <div>
              <h3 className="font-display text-base font-bold text-[#F8FAFC]">
                {footerDict.legalHeading}
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link
                    href={`/${locale}/legal/aviso-legal`}
                    className="flex items-center gap-2 text-[#94A3B8] transition-colors hover:text-[#F59E0B]"
                  >
                    <ShieldCheck className="h-4 w-4 shrink-0 text-[#0EA5E9]" aria-hidden="true" />
                    <span>{footerDict.legalLinks.avisoLegal}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/legal/privacidad`}
                    className="flex items-center gap-2 text-[#94A3B8] transition-colors hover:text-[#F59E0B]"
                  >
                    <ShieldCheck className="h-4 w-4 shrink-0 text-[#0EA5E9]" aria-hidden="true" />
                    <span>{footerDict.legalLinks.privacidad}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/legal/cookies`}
                    className="flex items-center gap-2 text-[#94A3B8] transition-colors hover:text-[#F59E0B]"
                  >
                    <ShieldCheck className="h-4 w-4 shrink-0 text-[#0EA5E9]" aria-hidden="true" />
                    <span>{footerDict.legalLinks.cookies}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/legal/condiciones-alquiler`}
                    className="flex items-center gap-2 text-[#94A3B8] transition-colors hover:text-[#F59E0B]"
                  >
                    <ShieldCheck className="h-4 w-4 shrink-0 text-[#F59E0B]" aria-hidden="true" />
                    <span>{footerDict.legalLinks.condicionesAlquiler}</span>
                  </Link>
                </li>
              </ul>

              <button
                type="button"
                onClick={handleOpenCookiePreferences}
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#112240] px-4 py-2.5 text-xs font-bold text-[#F8FAFC] transition-colors hover:border-[#F59E0B] hover:text-[#F59E0B]"
              >
                <Cookie className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
                <span>{manageCookiesLabel}</span>
              </button>
            </div>
          </div>

          {/* Columna 3 (4 cols): Mapa Interactivo Avenida Los Boliches Nº53, Fuengirola */}
          <div className="lg:col-span-4">
            <div className="overflow-hidden rounded-3xl border border-white/15 bg-[#112240] shadow-xl">
              <iframe
                title={footerDict.mapTitle}
                src="https://www.openstreetmap.org/export/embed.html?bbox=-4.6210%2C36.5475%2C-4.6090%2C36.5565&layer=mapnik&marker=36.5519%2C-4.6149"
                loading="lazy"
                className="h-72 w-full border-0"
              />
              <div className="flex items-center justify-between px-4 py-3 text-xs text-[#94A3B8]">
                <span>Avenida los boliches N°53 · Fuengirola</span>
                <span className="numeric-tabular font-bold text-[#0EA5E9]">
                  29640 Málaga
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Barra Inferior de Copyright */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-[#94A3B8] sm:flex-row">
          <p>{footerDict.copyright}</p>
          <p className="numeric-tabular">
            COSTA TOUR VIAJES · VIAJA. DESCUBRE. VIVE.
          </p>
        </div>
      </div>
    </footer>
  );
}
