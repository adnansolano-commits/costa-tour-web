'use client';

import Link from 'next/link';
import { Clock, Compass, Cookie, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { OPEN_COOKIE_MODAL_EVENT } from '@/components/CookieConsentBanner';
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
 * Footer Institucional Denso en Señales Locales NAP (Fuengirola) — Costa Tour (PRD.md Fase 2.6)
 *
 * Propósito de SEO Local y Cumplimiento Legal:
 * - Expone con marcaje semántico `<address>` los datos NAP exactos (Name, Address, Phone)
 *   de Costa Tour en el Puerto Deportivo y Paseo Marítimo de Fuengirola.
 * - Incluye mapa interactivo embebido con `loading="lazy"` centrado en el Puerto de Fuengirola.
 * - Enlaza a las 4 páginas legales obligatorias (Aviso Legal, Privacidad RGPD, Cookies y
 *   Condiciones de Alquiler/Fianza) más un disparador para reabrir el panel de cookies.
 */
export function FooterLocalSeo({
  locale,
  footerDict,
  navDict,
  manageCookiesLabel,
}: FooterLocalSeoProps) {
  const handleOpenCookiePreferences = () => {
    window.dispatchEvent(new CustomEvent(OPEN_COOKIE_MODAL_EVENT));
  };

  return (
    <footer className="border-t border-white/10 bg-[#0A1628] text-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Columna 1 (4 cols): Identidad de Marca + NAP Estructurado Fuengirola */}
          <div className="space-y-5 lg:col-span-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F59E0B] text-[#0A1628]">
                <Compass className="h-6 w-6 stroke-[2.2]" aria-hidden="true" />
              </div>
              <div>
                <p className="font-display text-xl font-extrabold tracking-tight text-[#F8FAFC]">
                  COSTA <span className="text-[#F59E0B]">TOUR</span>
                </p>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#0EA5E9]">
                  {navDict.brandTagline}
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-[#94A3B8]">
              {footerDict.brandSummary}
            </p>

            {/* Bloque NAP (Name, Address, Phone) para SEO Local en Fuengirola */}
            <div className="rounded-2xl border border-white/10 bg-[#112240] p-4">
              <p className="text-xs font-extrabold uppercase tracking-wider text-[#F59E0B]">
                {footerDict.napHeading}
              </p>

              <address className="mt-3 space-y-2.5 not-italic text-xs text-[#F8FAFC] sm:text-sm">
                <p className="font-bold text-[#F8FAFC]">
                  {COSTA_TOUR_NAP.legalName} ({COSTA_TOUR_NAP.cif})
                </p>
                <p className="flex items-start gap-2 text-[#94A3B8]">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0EA5E9]" aria-hidden="true" />
                  <span>
                    {COSTA_TOUR_NAP.streetAddress}, {COSTA_TOUR_NAP.postalCode}{' '}
                    {COSTA_TOUR_NAP.addressLocality} ({COSTA_TOUR_NAP.addressRegion})
                  </span>
                </p>
                <p className="numeric-tabular flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-[#10B981]" aria-hidden="true" />
                  <a
                    href={`tel:${COSTA_TOUR_NAP.phoneE164}`}
                    className="font-semibold hover:text-[#F59E0B]"
                  >
                    {COSTA_TOUR_NAP.phoneDisplay}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-[#0EA5E9]" aria-hidden="true" />
                  <a
                    href={`mailto:${COSTA_TOUR_NAP.email}`}
                    className="hover:text-[#F59E0B]"
                  >
                    {COSTA_TOUR_NAP.email}
                  </a>
                </p>
                <p className="numeric-tabular flex items-start gap-2 border-t border-white/10 pt-2 text-xs text-[#94A3B8]">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#F59E0B]" aria-hidden="true" />
                  <span>
                    <strong className="text-[#F8FAFC]">{footerDict.hoursLabel}</strong>{' '}
                    {footerDict.hoursValue}
                  </span>
                </p>
              </address>
            </div>
          </div>

          {/* Columna 2 (4 cols): Enlaces Legales RGPD + Verticales */}
          <div className="space-y-6 lg:col-span-4">
            <div>
              <h3 className="font-display text-base font-bold text-[#F8FAFC]">
                {footerDict.legalHeading}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <Link
                    href={`/${locale}/legal/aviso-legal`}
                    className="flex items-center gap-2 text-[#94A3B8] transition-colors hover:text-[#F59E0B]"
                  >
                    <ShieldCheck className="h-4 w-4 text-[#0EA5E9]" aria-hidden="true" />
                    <span>{footerDict.legalLinks.avisoLegal}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/legal/privacidad`}
                    className="flex items-center gap-2 text-[#94A3B8] transition-colors hover:text-[#F59E0B]"
                  >
                    <ShieldCheck className="h-4 w-4 text-[#0EA5E9]" aria-hidden="true" />
                    <span>{footerDict.legalLinks.privacidad}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/legal/cookies`}
                    className="flex items-center gap-2 text-[#94A3B8] transition-colors hover:text-[#F59E0B]"
                  >
                    <ShieldCheck className="h-4 w-4 text-[#0EA5E9]" aria-hidden="true" />
                    <span>{footerDict.legalLinks.cookies}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/legal/condiciones-alquiler`}
                    className="flex items-center gap-2 text-[#94A3B8] transition-colors hover:text-[#F59E0B]"
                  >
                    <ShieldCheck className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />
                    <span>{footerDict.legalLinks.condicionesAlquiler}</span>
                  </Link>
                </li>
              </ul>

              <button
                type="button"
                onClick={handleOpenCookiePreferences}
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#112240] px-4 py-2 text-xs font-bold text-[#F8FAFC] transition-colors hover:border-[#F59E0B] hover:text-[#F59E0B]"
              >
                <Cookie className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
                <span>{manageCookiesLabel}</span>
              </button>
            </div>
          </div>

          {/* Columna 3 (4 cols): Mapa Interactivo Puerto Deportivo de Fuengirola */}
          <div className="lg:col-span-4">
            <div className="overflow-hidden rounded-3xl border border-white/15 bg-[#112240] shadow-xl">
              <iframe
                title={footerDict.mapTitle}
                src="https://www.openstreetmap.org/export/embed.html?bbox=-4.6285%2C36.5365%2C-4.6115%2C36.5465&layer=mapnik&marker=36.5414%2C-4.6203"
                loading="lazy"
                className="h-64 w-full border-0"
              />
              <div className="flex items-center justify-between px-4 py-3 text-xs text-[#94A3B8]">
                <span>Puerto Deportivo Fuengirola · Muelle 1</span>
                <span className="numeric-tabular font-bold text-[#0EA5E9]">
                  36.5414° N, 4.6203° W
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Barra Inferior de Copyright */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-[#94A3B8] sm:flex-row">
          <p>{footerDict.copyright}</p>
          <p className="numeric-tabular">
            PCI-DSS Ready · Stripe 3D Secure (SCA) · RGPD / LSSI-CE Compliant
          </p>
        </div>
      </div>
    </footer>
  );
}
