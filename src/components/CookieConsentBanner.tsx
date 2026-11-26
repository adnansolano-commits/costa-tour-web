'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import type { UIDictionary } from '@/i18n/dictionaries';
import type { SupportedLocale } from '@/types/catalog';

/**
 * Clave de almacenamiento persistente del consentimiento RGPD en navegador.
 */
const COOKIE_CONSENT_STORAGE_KEY = 'costatour_cookie_consent_v1';

/**
 * Evento global para permitir que el usuario reabra el panel de cookies desde el Footer.
 */
export const OPEN_COOKIE_MODAL_EVENT = 'costatour:open-cookie-settings';

export interface CookieConsentPreferences {
  readonly essential: true;
  readonly analytics: boolean;
  readonly marketing: boolean;
  readonly updatedAtIso: string;
}

export interface CookieConsentBannerProps {
  readonly locale: SupportedLocale;
  readonly dict: UIDictionary['cookies'];
  readonly cookiePolicyLabel: string;
}

/**
 * Banner de Cookies Explícito RGPD — Costa Tour (PRD.md Fase 2.6)
 *
 * Propósito legal (RGPD / LSSI-CE) y seguridad:
 * - No activa ninguna cookie analítica ni de preferencias por defecto (`false`).
 * - Ofrece las 3 acciones exigidas por la AEPD en el mismo nivel visual:
 *   1. Aceptar todas
 *   2. Rechazar no esenciales
 *   3. Configurar preferencias granulares
 * - Persiste la elección firmada con timestamp ISO en `localStorage` y permite
 *   revocarla o modificarla en cualquier momento desde el enlace del Footer.
 */
export function CookieConsentBanner({
  locale,
  dict,
  cookiePolicyLabel,
}: CookieConsentBannerProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isConfiguring, setIsConfiguring] = useState<boolean>(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState<boolean>(false);
  const [marketingEnabled, setMarketingEnabled] = useState<boolean>(false);

  useEffect(() => {
    try {
      const storedRaw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
      if (!storedRaw) {
        setIsVisible(true);
      } else {
        const parsed = JSON.parse(storedRaw) as Partial<CookieConsentPreferences>;
        setAnalyticsEnabled(Boolean(parsed.analytics));
        setMarketingEnabled(Boolean(parsed.marketing));
      }
    } catch {
      setIsVisible(true);
    }

    const handleReopenSettings = () => {
      setIsVisible(true);
      setIsConfiguring(true);
    };

    window.addEventListener(OPEN_COOKIE_MODAL_EVENT, handleReopenSettings);
    return () => window.removeEventListener(OPEN_COOKIE_MODAL_EVENT, handleReopenSettings);
  }, []);

  const persistConsent = (analytics: boolean, marketing: boolean) => {
    const payload: CookieConsentPreferences = {
      essential: true,
      analytics,
      marketing,
      updatedAtIso: new Date().toISOString(),
    };

    try {
      window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignorar si el navegador bloquea storage en modo privado estricto
    }

    setAnalyticsEnabled(analytics);
    setMarketingEnabled(marketing);
    setIsConfiguring(false);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-label={dict.title}
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-4xl rounded-3xl border border-white/15 bg-[#0A1628]/95 p-5 text-[#F8FAFC] shadow-2xl backdrop-blur-xl sm:p-6"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#F59E0B]">
            <Cookie className="h-4 w-4" aria-hidden="true" />
            <span>{dict.title}</span>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-[#94A3B8] sm:text-sm">
            {dict.description}{' '}
            <Link
              href={`/${locale}/legal/cookies`}
              className="font-semibold text-[#0EA5E9] underline hover:text-[#F59E0B]"
            >
              {cookiePolicyLabel}
            </Link>
            .
          </p>
        </div>

        {/* Botones de Primer Nivel RGPD: Aceptar todas / Rechazar no esenciales / Configurar */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setIsConfiguring((prev) => !prev)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-[#112240] px-3.5 py-2.5 text-xs font-bold text-[#F8FAFC] transition-colors hover:border-[#0EA5E9]"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#0EA5E9]" aria-hidden="true" />
            <span>{dict.configure}</span>
          </button>

          <button
            type="button"
            onClick={() => persistConsent(false, false)}
            className="rounded-xl border border-white/20 bg-transparent px-4 py-2.5 text-xs font-bold text-[#F8FAFC] transition-colors hover:bg-white/10"
          >
            {dict.rejectNonEssential}
          </button>

          <button
            type="button"
            onClick={() => persistConsent(true, true)}
            className="rounded-xl bg-[#F59E0B] px-4 py-2.5 text-xs font-extrabold text-[#0A1628] shadow-lg shadow-[#F59E0B]/25 transition-colors hover:bg-[#D97706]"
          >
            {dict.acceptAll}
          </button>
        </div>
      </div>

      {/* Panel Granular Desplegable de Configuración de Cookies */}
      {isConfiguring && (
        <div className="mt-5 border-t border-white/10 pt-5">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {/* 1. Técnicas / Necesarias (Siempre activas) */}
            <div className="rounded-2xl border border-[#10B981]/30 bg-[#112240] p-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-[#10B981]">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  <span>{dict.essentialTitle}</span>
                </span>
                <input
                  type="checkbox"
                  checked
                  disabled
                  aria-label={dict.essentialTitle}
                  className="h-4 w-4 accent-[#10B981]"
                />
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-[#94A3B8]">
                {dict.essentialDesc}
              </p>
            </div>

            {/* 2. Analíticas (Opt-in explícito) */}
            <label className="cursor-pointer rounded-2xl border border-white/10 bg-[#112240] p-4 transition-colors hover:border-white/25">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#F8FAFC]">
                  {dict.analyticsTitle}
                </span>
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="h-4 w-4 accent-[#F59E0B]"
                />
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-[#94A3B8]">
                {dict.analyticsDesc}
              </p>
            </label>

            {/* 3. Preferencias (Opt-in explícito) */}
            <label className="cursor-pointer rounded-2xl border border-white/10 bg-[#112240] p-4 transition-colors hover:border-white/25">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#F8FAFC]">
                  {dict.marketingTitle}
                </span>
                <input
                  type="checkbox"
                  checked={marketingEnabled}
                  onChange={(e) => setMarketingEnabled(e.target.checked)}
                  className="h-4 w-4 accent-[#F59E0B]"
                />
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-[#94A3B8]">
                {dict.marketingDesc}
              </p>
            </label>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => persistConsent(analyticsEnabled, marketingEnabled)}
              className="rounded-xl bg-[#0EA5E9] px-5 py-2 text-xs font-extrabold text-[#0A1628] transition-colors hover:bg-[#38BDF8]"
            >
              {dict.savePreferences}
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
