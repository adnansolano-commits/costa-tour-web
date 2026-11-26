import {
  CheckCircle2,
  Globe2,
  LockKeyhole,
  MapPin,
  RefreshCw,
  ShieldCheck,
  Star,
} from 'lucide-react';
import type { UIDictionary } from '@/i18n/dictionaries';

export interface ConfianzaResenasSectionProps {
  readonly dict: UIDictionary['trustSection'];
}

/**
 * Sección "Por qué Costa Tour", Reseñas Verificadas de Google y Sellos 3D Secure — (PRD.md Fase 2.5)
 *
 * Propósito de negocio y conversión:
 * - Refuerza la autoridad local en Fuengirola (Puerto Deportivo Muelle 1 y Paseo Marítimo 42)
 *   y el soporte multilingüe nativo (ES, EN, DE, FR).
 * - Presenta prueba social verificada de clientes internacionales en las 3 verticales.
 * - Exhibe los sellos de seguridad bancaria europea: 3D Secure 2.2 (SCA), pre-autorización de
 *   fianza desacoplada y motor bidireccional iCal anti-overbooking.
 */
export function ConfianzaResenasSection({ dict }: ConfianzaResenasSectionProps) {
  const pillarIcons = [MapPin, Globe2, ShieldCheck] as const;

  return (
    <section
      aria-labelledby="trust-section-heading"
      className="bg-[#0A1628] py-20 text-[#F8FAFC] sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ===================================================================
            1. PILARES "POR QUÉ COSTA TOUR" (OPERATIVA REAL EN FUENGIROLA)
           =================================================================== */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#112240] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#0EA5E9]">
            <ShieldCheck className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />
            <span>{dict.badge}</span>
          </span>

          <h2
            id="trust-section-heading"
            className="heading-section mt-4 font-display font-extrabold text-[#F8FAFC]"
          >
            {dict.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#94A3B8] sm:text-lg">
            {dict.subheading}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {dict.pillars.map((pillar, index) => {
            const Icon = pillarIcons[index] ?? ShieldCheck;
            return (
              <article
                key={pillar.title}
                className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#112240] p-7 shadow-xl transition-transform duration-300 ease-out hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F59E0B]/15 text-[#F59E0B]">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="numeric-tabular rounded-full border border-[#0EA5E9]/30 bg-[#0EA5E9]/10 px-3 py-1 text-xs font-extrabold text-[#0EA5E9]">
                      {pillar.metric}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-xl font-bold text-[#F8FAFC]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#94A3B8]">
                    {pillar.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* ===================================================================
            2. RESEÑAS VERIFICADAS DE GOOGLE (PRUEBA SOCIAL MULTILINGÜE)
           =================================================================== */}
        <div className="mt-20">
          <div className="flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
            <div>
              <h3 className="font-display text-2xl font-extrabold text-[#F8FAFC] sm:text-3xl">
                {dict.reviewsHeading}
              </h3>
              <p className="numeric-tabular mt-1.5 flex items-center gap-2 text-sm font-semibold text-[#0EA5E9]">
                <CheckCircle2 className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
                <span>{dict.reviewsVerifiedLabel}</span>
              </p>
            </div>

            <div className="flex items-center gap-1 rounded-full border border-white/15 bg-[#112240] px-4 py-2 text-sm font-bold text-[#F59E0B]">
              <Star className="h-4 w-4 fill-[#F59E0B]" aria-hidden="true" />
              <Star className="h-4 w-4 fill-[#F59E0B]" aria-hidden="true" />
              <Star className="h-4 w-4 fill-[#F59E0B]" aria-hidden="true" />
              <Star className="h-4 w-4 fill-[#F59E0B]" aria-hidden="true" />
              <Star className="h-4 w-4 fill-[#F59E0B]" aria-hidden="true" />
              <span className="numeric-tabular ms-1.5 text-[#F8FAFC]">4.97 ★</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {dict.reviews.map((review) => (
              <blockquote
                key={review.author}
                className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#112240]/80 p-6 shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-0.5 text-[#F59E0B]">
                      <Star className="h-3.5 w-3.5 fill-[#F59E0B]" aria-hidden="true" />
                      <Star className="h-3.5 w-3.5 fill-[#F59E0B]" aria-hidden="true" />
                      <Star className="h-3.5 w-3.5 fill-[#F59E0B]" aria-hidden="true" />
                      <Star className="h-3.5 w-3.5 fill-[#F59E0B]" aria-hidden="true" />
                      <Star className="h-3.5 w-3.5 fill-[#F59E0B]" aria-hidden="true" />
                    </span>
                    <span className="rounded-full bg-[#0EA5E9]/15 px-3 py-1 text-[11px] font-bold text-[#0EA5E9]">
                      {review.verticalTag}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-[#F8FAFC]">
                    “{review.quote}”
                  </p>
                </div>

                <footer className="mt-6 border-t border-white/10 pt-4">
                  <p className="font-display text-sm font-bold text-[#F8FAFC]">
                    {review.author}
                  </p>
                  <p className="mt-0.5 text-xs text-[#94A3B8]">
                    {review.country} · {review.dateLabel}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>

        {/* ===================================================================
            3. SELLOS VISUALES DE PAGO PROTEGIDO 3D SECURE (SCA) Y ANTI-OVERBOOKING
           =================================================================== */}
        <div className="mt-14 rounded-3xl border border-[#F59E0B]/30 bg-gradient-to-r from-[#112240] via-[#112240]/95 to-[#0A1628] p-6 shadow-2xl sm:p-8">
          <p className="text-center text-xs font-extrabold uppercase tracking-widest text-[#F59E0B]">
            {dict.securityBadges.title}
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-[#0A1628]/70 p-4">
              <LockKeyhole className="h-6 w-6 shrink-0 text-[#10B981]" aria-hidden="true" />
              <span className="text-xs font-bold leading-snug text-[#F8FAFC] sm:text-sm">
                {dict.securityBadges.scaLabel}
              </span>
            </div>

            <div className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-[#0A1628]/70 p-4">
              <ShieldCheck className="h-6 w-6 shrink-0 text-[#F59E0B]" aria-hidden="true" />
              <span className="text-xs font-bold leading-snug text-[#F8FAFC] sm:text-sm">
                {dict.securityBadges.depositReleaseLabel}
              </span>
            </div>

            <div className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-[#0A1628]/70 p-4">
              <RefreshCw className="h-6 w-6 shrink-0 text-[#0EA5E9]" aria-hidden="true" />
              <span className="text-xs font-bold leading-snug text-[#F8FAFC] sm:text-sm">
                {dict.securityBadges.antiOverbookingLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
