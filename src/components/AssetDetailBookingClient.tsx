'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Award,
  Calendar,
  CalendarCheck2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Expand,
  Fuel,
  Lock,
  MapPin,
  Minus,
  Plus,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  X,
} from 'lucide-react';
import { formatBillingUnitLabel, formatCentsToEUR } from '@/i18n/config';
import type { UIDictionary } from '@/i18n/dictionaries';
import type { CatalogAsset, SupportedLocale } from '@/types/catalog';

export interface AssetDetailBookingClientProps {
  readonly locale: SupportedLocale;
  readonly asset: CatalogAsset;
  readonly catalogDict: UIDictionary['catalog'];
  readonly detailDict: UIDictionary['detail'];
}

/**
 * Genera una ventana de 14 fechas ISO consecutivas a partir del 22 de noviembre de 2026
 * para el calendario interactivo de disponibilidad simulada.
 */
function buildCalendarWindow(): readonly string[] {
  const start = new Date('2026-11-22T00:00:00Z');
  const dates: string[] = [];
  for (let i = 0; i < 14; i += 1) {
    const current = new Date(start);
    current.setUTCDate(start.getUTCDate() + i);
    dates.push(current.toISOString().slice(0, 10));
  }
  return dates;
}

/**
 * Ficha de Detalle, Calculadora en Céntimos Enteros y Flujo de Reserva RGPD — Costa Tour (PRD.md Fase 2.4)
 *
 * Propósito de negocio, seguridad financiera y cumplimiento RGPD:
 * - Galería multimedia con vista ampliada (Lightbox HD) y CLS = 0 mediante `next/image`.
 * - Calendario interactivo de disponibilidad simulada que bloquea fechas ocupadas.
 * - Calculadora financiera determinista en céntimos enteros (`number` entero + `tabular-nums`)
 *   que separa estrictamente el importe del alquiler + extras respecto a la retención de fianza.
 * - Flujo de checkout paso a paso con checkboxes RGPD obligatorios desmarcados por defecto
 *   y barra inferior fija (`sticky bottom bar`) en dispositivos móviles.
 */
export function AssetDetailBookingClient({
  locale,
  asset,
  catalogDict,
  detailDict,
}: AssetDetailBookingClientProps) {
  const calendarDates = useMemo(() => buildCalendarWindow(), []);

  // Primera fecha disponible por defecto
  const firstAvailableDate = useMemo(
    () =>
      calendarDates.find((iso) => !asset.simulatedBlockedDates.includes(iso)) ??
      calendarDates[0],
    [calendarDates, asset.simulatedBlockedDates]
  );

  const [selectedStartDate, setSelectedStartDate] = useState<string>(firstAvailableDate);
  const [durationUnits, setDurationUnits] = useState<number>(
    asset.billingUnit === 'HOUR' ? 4 : 3
  );
  const [selectedExtraIds, setSelectedExtraIds] = useState<readonly string[]>([]);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  // Estado del Flujo de Checkout Paso a Paso (1: Configuración, 2: Datos + RGPD, 3: Confirmación Demo)
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [documentId, setDocumentId] = useState<string>('');

  // REGLA CRÍTICA RGPD: Checkboxes obligatorios SIEMPRE desmarcados por defecto (`false`)
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState<boolean>(false);

  const allImages = useMemo(
    () =>
      asset.galleryImages.length > 0 ? asset.galleryImages : [asset.mainImage],
    [asset.galleryImages, asset.mainImage]
  );

  // Navegación por teclado en el Lightbox HD
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (event.key === 'ArrowRight') {
        setActiveGalleryIndex((prev) => (prev + 1) % allImages.length);
      } else if (event.key === 'ArrowLeft') {
        setActiveGalleryIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, allImages.length]);

  /**
   * Cálculo determinista en CÉNTIMOS ENTEROS (Governance Sección 3).
   * Ninguna operación utiliza decimales en coma flotante.
   */
  const financialBreakdown = useMemo(() => {
    const baseSubtotalCents: number = asset.priceCents * durationUnits;

    const extrasSubtotalCents: number = asset.extras.reduce((sumCents, extra) => {
      if (!selectedExtraIds.includes(extra.id)) {
        return sumCents;
      }
      const extraChargeCents =
        extra.chargeMode === 'PER_UNIT'
          ? extra.priceCents * durationUnits
          : extra.priceCents;
      return sumCents + extraChargeCents;
    }, 0);

    const totalRentalPayNowCents: number = baseSubtotalCents + extrasSubtotalCents;
    const separateDepositHoldCents: number = asset.depositCents;

    return {
      baseSubtotalCents,
      extrasSubtotalCents,
      totalRentalPayNowCents,
      separateDepositHoldCents,
    };
  }, [asset.priceCents, asset.extras, asset.depositCents, durationUnits, selectedExtraIds]);

  const toggleExtraSelection = (extraId: string) => {
    setSelectedExtraIds((prev) =>
      prev.includes(extraId)
        ? prev.filter((id) => id !== extraId)
        : [...prev, extraId]
    );
  };

  /**
   * Calcula las fechas que quedan marcadas como seleccionadas en el calendario interactivo.
   */
  const selectedRangeDates = useMemo(() => {
    if (asset.billingUnit === 'HOUR') {
      return [selectedStartDate];
    }
    const startIdx = calendarDates.indexOf(selectedStartDate);
    if (startIdx === -1) return [selectedStartDate];
    return calendarDates.slice(startIdx, startIdx + durationUnits);
  }, [calendarDates, selectedStartDate, durationUnits, asset.billingUnit]);

  const isRgpdAndFormValid =
    acceptedTerms &&
    acceptedPrivacy &&
    fullName.trim().length >= 3 &&
    email.includes('@') &&
    phone.trim().length >= 6 &&
    documentId.trim().length >= 5;

  const handleCheckoutSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isRgpdAndFormValid) return;
    setCheckoutStep(3);
  };

  const scrollToBookingPanel = () => {
    const panel = document.getElementById('panel-reserva');
    if (panel) {
      panel.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-32 lg:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Enlace Superior de Retorno al Catálogo */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/${locale}#catalogo`}
            className="inline-flex items-center gap-2 rounded-full border border-[#0F172A]/10 bg-white px-4 py-2 text-xs font-bold text-[#0F172A] shadow-sm transition-colors hover:border-[#0A1628] hover:bg-[#0A1628] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />
            <span>{detailDict.backToCatalog}</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#475569]">
            <span className="rounded-full bg-[#0A1628] px-3 py-1 font-bold text-[#0EA5E9]">
              {catalogDict.verticalNames[asset.vertical]}
            </span>
            <span className="numeric-tabular inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 font-bold text-[#0F172A] shadow-sm">
              <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" aria-hidden="true" />
              <span>{asset.rating.toFixed(2)}</span>
              <span className="text-[#475569]">
                ({asset.reviewCount} {catalogDict.reviewsLabel})
              </span>
            </span>
          </div>
        </div>

        {/* Cabecera del Activo (`<h1>` único de la página de detalle) */}
        <div className="mb-8">
          <h1 className="heading-section font-display font-extrabold text-[#0F172A]">
            {asset.title[locale]}
          </h1>
          <p className="mt-2 flex flex-wrap items-center gap-2 text-sm font-medium text-[#475569] sm:text-base">
            <MapPin className="h-4 w-4 shrink-0 text-[#0EA5E9]" aria-hidden="true" />
            <span>{asset.technicalMetadata.pickupOrZone[locale]}</span>
            <span>·</span>
            <span className="font-semibold text-[#0F172A]">
              {asset.technicalMetadata.propulsionOrAmenity[locale]}
            </span>
          </p>
        </div>

        {/* ===================================================================
            1. GALERÍA MULTIMEDIA ENVOLVENTE CON VISTA AMPLIADA (CLS = 0)
           =================================================================== */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Imagen Principal Activa */}
          <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-[#0A1628] shadow-lg lg:col-span-8">
            <Image
              src={allImages[activeGalleryIndex]}
              alt={asset.imageAlt[locale]}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            />

            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="glass-mediterranean absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold text-[#F8FAFC] shadow-xl transition-transform duration-300 hover:scale-105"
            >
              <Expand className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />
              <span>{detailDict.expandGallery}</span>
            </button>
          </div>

          {/* Miniaturas Interactivas */}
          <div className="grid grid-cols-3 gap-3 lg:col-span-4 lg:grid-cols-1 lg:grid-rows-3">
            {allImages.map((imgUrl, idx) => {
              const isSelected = idx === activeGalleryIndex;
              return (
                <button
                  key={`${asset.id}-thumb-${idx}`}
                  type="button"
                  onClick={() => setActiveGalleryIndex(idx)}
                  className={`relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#0A1628] transition-all duration-300 ${
                    isSelected
                      ? 'ring-4 ring-[#F59E0B] ring-offset-2'
                      : 'opacity-75 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={imgUrl}
                    alt={`${asset.imageAlt[locale]} (${idx + 1})`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 33vw, 25vw"
                    className="object-cover object-center"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* ===================================================================
            2. CUERPO DIVIDIDO: ESPECIFICACIONES + CALENDARIO vs CALCULADORA
           =================================================================== */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Columna Izquierda (7 cols): Descripción, Garantías Binarias, Calendario y Extras */}
          <div className="space-y-10 lg:col-span-7">
            {/* Descripción Editorial y Highlights */}
            <div className="rounded-3xl border border-[#0F172A]/[0.08] bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-wrap items-center gap-3 border-b border-[#0F172A]/10 pb-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0A1628] px-3.5 py-1.5 text-xs font-bold text-[#F59E0B]">
                  <Users className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="numeric-tabular">
                    {asset.capacity} {catalogDict.guestsUnit}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0EA5E9]/10 px-3.5 py-1.5 text-xs font-bold text-[#0F172A]">
                  <Award className="h-3.5 w-3.5 text-[#0EA5E9]" aria-hidden="true" />
                  <span>{asset.technicalMetadata.requirementBadge[locale]}</span>
                </span>
              </div>

              <p className="mt-5 text-base leading-relaxed text-[#475569]">
                {asset.description[locale]}
              </p>

              {/* Highlights de la Ficha */}
              <h2 className="mt-8 font-display text-lg font-bold text-[#0F172A]">
                {detailDict.highlightsHeading}
              </h2>
              <ul className="mt-4 space-y-3">
                {asset.highlights[locale].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm font-medium text-[#0F172A]"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#10B981]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Garantías Binarias de la Ficha */}
              <h3 className="mt-8 font-display text-base font-bold text-[#0F172A]">
                {detailDict.specsHeading}
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-2xl bg-[#F8FAFC] p-4">
                  <ShieldAlert className="h-5 w-5 text-[#F59E0B]" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold text-[#475569]">
                      {catalogDict.depositLabel}
                    </p>
                    <p className="numeric-tabular text-sm font-extrabold text-[#0F172A]">
                      {formatCentsToEUR(asset.depositCents, locale)} (3D Secure)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-[#F8FAFC] p-4">
                  <Fuel className="h-5 w-5 text-[#10B981]" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold text-[#475569]">
                      {catalogDict.includedFuelOrCleaning}
                    </p>
                    <p className="text-sm font-bold text-[#0F172A]">
                      {detailDict.specsIncludedBadge}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-[#F8FAFC] p-4">
                  <Award className="h-5 w-5 text-[#0EA5E9]" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold text-[#475569]">
                      {catalogDict.includedLicenseOrSkipper}
                    </p>
                    <p className="text-sm font-bold text-[#0F172A]">
                      {asset.technicalMetadata.requirementBadge[locale]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-[#F8FAFC] p-4">
                  <CalendarCheck2 className="h-5 w-5 text-[#10B981]" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold text-[#475569]">
                      {catalogDict.flexibleCancel}
                    </p>
                    <p className="text-sm font-bold text-[#0F172A]">
                      {detailDict.specsNoPenaltyBadge}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CALENDARIO INTERACTIVO DE DISPONIBILIDAD SIMULADA */}
            <div className="rounded-3xl border border-[#0F172A]/[0.08] bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-xl font-bold text-[#0F172A]">
                    {detailDict.calendarHeading}
                  </h2>
                  <p className="mt-1 text-sm text-[#475569]">
                    {detailDict.calendarSubtitle}
                  </p>
                </div>

                {/* Leyenda Semántica (DESIGN.md Sección 2: #10B981, #F59E0B, #EF4444) */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                  <span className="inline-flex items-center gap-1.5 text-[#10B981]">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
                    <span>{detailDict.legendAvailable}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[#D97706]">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
                    <span>{detailDict.legendSelected}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[#EF4444]">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
                    <span>{detailDict.legendOccupied}</span>
                  </span>
                </div>
              </div>

              {/* Cuadrícula de Días del Calendario */}
              <div className="numeric-tabular mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4 md:grid-cols-7">
                {calendarDates.map((isoDate) => {
                  const isBlocked = asset.simulatedBlockedDates.includes(isoDate);
                  const isSelected = selectedRangeDates.includes(isoDate);
                  const dayNum = isoDate.slice(8, 10);
                  const monthNum = isoDate.slice(5, 7);

                  return (
                    <button
                      key={isoDate}
                      type="button"
                      disabled={isBlocked}
                      onClick={() => setSelectedStartDate(isoDate)}
                      className={`flex flex-col items-center justify-center rounded-2xl border p-3 text-center transition-all duration-200 ${
                        isBlocked
                          ? 'cursor-not-allowed border-[#EF4444]/30 bg-[#EF4444]/10 text-[#EF4444] line-through opacity-70'
                          : isSelected
                          ? 'border-[#F59E0B] bg-[#0A1628] text-[#F59E0B] shadow-md'
                          : 'border-[#10B981]/30 bg-[#10B981]/5 text-[#0F172A] hover:border-[#10B981] hover:bg-[#10B981]/15'
                      }`}
                    >
                      <span className="text-[11px] font-semibold uppercase opacity-75">
                        {dayNum}/{monthNum}
                      </span>
                      <span className="mt-1 text-xs font-extrabold">
                        {isBlocked
                          ? '✕'
                          : formatCentsToEUR(asset.priceCents, locale)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selector de Duración (Días / Noches / Horas) */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#F8FAFC] p-4">
                <div className="flex items-center gap-2.5">
                  <Calendar className="h-5 w-5 text-[#0EA5E9]" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#475569]">
                      {detailDict.durationLabel[asset.billingUnit]}
                    </p>
                    <p className="numeric-tabular text-sm font-extrabold text-[#0F172A]">
                      {selectedStartDate} · ({durationUnits}{' '}
                      {formatBillingUnitLabel(asset.billingUnit, locale).replace('/', '').trim()})
                    </p>
                  </div>
                </div>

                <div className="numeric-tabular flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDurationUnits((prev) => Math.max(1, prev - 1))}
                    disabled={durationUnits <= 1}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#0F172A]/15 bg-white text-[#0F172A] transition-colors hover:border-[#0A1628] disabled:opacity-40"
                  >
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <span className="min-w-[2.5rem] text-center text-base font-extrabold text-[#0F172A]">
                    {durationUnits}
                  </span>
                  <button
                    type="button"
                    onClick={() => setDurationUnits((prev) => Math.min(14, prev + 1))}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#0F172A]/15 bg-white text-[#0F172A] transition-colors hover:border-[#0A1628]"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* EXTRAS OPCIONALES (UPSELLING EN CÉNTIMOS ENTEROS) */}
            <div className="rounded-3xl border border-[#0F172A]/[0.08] bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-display text-xl font-bold text-[#0F172A]">
                {detailDict.extrasHeading}
              </h2>

              <div className="mt-5 space-y-3">
                {asset.extras.map((extra) => {
                  const isChecked = selectedExtraIds.includes(extra.id);
                  return (
                    <label
                      key={extra.id}
                      className={`flex cursor-pointer items-start justify-between gap-4 rounded-2xl border p-4 transition-all duration-200 ${
                        isChecked
                          ? 'border-[#F59E0B] bg-[#F59E0B]/10 shadow-sm'
                          : 'border-[#0F172A]/10 bg-[#F8FAFC] hover:border-[#0F172A]/25'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleExtraSelection(extra.id)}
                          className="mt-1 h-4 w-4 rounded border-[#0F172A]/30 accent-[#F59E0B]"
                        />
                        <div>
                          <p className="text-sm font-bold text-[#0F172A]">
                            {extra.label[locale]}
                          </p>
                          <p className="mt-0.5 text-xs text-[#475569]">
                            {extra.description[locale]}
                          </p>
                        </div>
                      </div>

                      <div className="numeric-tabular shrink-0 text-right">
                        <span className="text-sm font-extrabold text-[#0F172A]">
                          +{formatCentsToEUR(extra.priceCents, locale)}
                        </span>
                        <span className="block text-[11px] font-medium text-[#475569]">
                          {extra.chargeMode === 'PER_UNIT'
                            ? detailDict.extraPerUnitSuffix
                            : detailDict.extraFlatFeeSuffix}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* =================================================================
              Columna Derecha (5 cols): CALCULADORA EN CÉNTIMOS + CHECKOUT RGPD
             ================================================================= */}
          <div id="panel-reserva" className="lg:col-span-5">
            <div className="sticky top-24 rounded-3xl border border-white/15 bg-[#0A1628] p-6 text-[#F8FAFC] shadow-2xl sm:p-8">
              {/* Encabezado de Tarifa Unitaria */}
              <div className="numeric-tabular flex items-baseline justify-between border-b border-white/10 pb-5">
                <div>
                  <span className="text-3xl font-extrabold text-[#F59E0B]">
                    {formatCentsToEUR(asset.priceCents, locale)}
                  </span>
                  <span className="ml-1.5 text-sm font-medium text-[#94A3B8]">
                    {formatBillingUnitLabel(asset.billingUnit, locale)}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#10B981]/20 px-3 py-1 text-xs font-bold text-[#10B981]">
                  <span>●</span>
                  <span>{detailDict.legendAvailable}</span>
                </span>
              </div>

              {/* DESGLOSE FINANCIERO DETERMINISTA EN CÉNTIMOS ENTEROS */}
              <div className="numeric-tabular mt-6 space-y-3 text-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-[#0EA5E9]">
                  {detailDict.calculatorHeading}
                </p>

                {/* Línea 1: Tarifa Base × Unidades */}
                <div className="flex items-center justify-between text-[#F8FAFC]">
                  <span className="text-[#94A3B8]">
                    {detailDict.baseRateLine} ({formatCentsToEUR(asset.priceCents, locale)} ×{' '}
                    {durationUnits})
                  </span>
                  <span className="font-semibold">
                    {formatCentsToEUR(financialBreakdown.baseSubtotalCents, locale, true)}
                  </span>
                </div>

                {/* Línea 2: Extras Opcionales */}
                <div className="flex items-center justify-between text-[#F8FAFC]">
                  <span className="text-[#94A3B8]">
                    {detailDict.extrasLine} ({selectedExtraIds.length})
                  </span>
                  <span className="font-semibold">
                    {formatCentsToEUR(financialBreakdown.extrasSubtotalCents, locale, true)}
                  </span>
                </div>

                {/* TOTAL ALQUILER A PAGAR AHORA */}
                <div className="flex items-baseline justify-between border-t border-white/15 pt-4">
                  <span className="text-base font-bold text-[#F8FAFC]">
                    {detailDict.rentalTotalPayNow}
                  </span>
                  <span className="text-2xl font-extrabold text-[#F59E0B]">
                    {formatCentsToEUR(financialBreakdown.totalRentalPayNowCents, locale, true)}
                  </span>
                </div>

                {/* RETENCIÓN DE FIANZA POR SEPARADO (PRD.md Fase 2.4 / DESIGN.md) */}
                <div className="mt-4 rounded-2xl border border-[#F59E0B]/35 bg-[#112240] p-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs font-bold text-[#F59E0B]">
                      <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>{detailDict.depositHoldSeparateTitle}</span>
                    </span>
                    <span className="text-base font-extrabold text-[#F8FAFC]">
                      {formatCentsToEUR(
                        financialBreakdown.separateDepositHoldCents,
                        locale,
                        true
                      )}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#94A3B8]">
                    {detailDict.depositHoldSeparateNote}
                  </p>
                </div>
              </div>

              {/* =============================================================
                  FLUJO DE CHECKOUT PASO A PASO (UI)
                 ============================================================= */}
              {checkoutStep === 1 && (
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep(2)}
                    className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-2xl bg-[#F59E0B] px-6 py-3.5 text-sm font-extrabold text-[#0A1628] shadow-xl shadow-[#F59E0B]/25 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#D97706]"
                  >
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    <span>{detailDict.step1Button}</span>
                  </button>
                </div>
              )}

              {checkoutStep === 2 && (
                <form onSubmit={handleCheckoutSubmit} className="mt-6 space-y-4 border-t border-white/15 pt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-base font-bold text-[#F8FAFC]">
                      {detailDict.step2Heading}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setCheckoutStep(1)}
                      className="text-xs font-semibold text-[#0EA5E9] hover:underline"
                    >
                      {detailDict.step2Back}
                    </button>
                  </div>

                  {/* Inputs del Titular */}
                  <div>
                    <label
                      htmlFor="checkout-fullname"
                      className="block text-xs font-semibold text-[#94A3B8]"
                    >
                      {detailDict.fullNameLabel} *
                    </label>
                    <input
                      id="checkout-fullname"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej. Carlos Mendoza"
                      className="mt-1 w-full rounded-xl border border-white/15 bg-[#112240] px-3.5 py-2.5 text-sm text-[#F8FAFC] placeholder-[#94A3B8]/50 focus:border-[#F59E0B] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="checkout-email"
                        className="block text-xs font-semibold text-[#94A3B8]"
                      >
                        {detailDict.emailLabel} *
                      </label>
                      <input
                        id="checkout-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="cliente@email.com"
                        className="mt-1 w-full rounded-xl border border-white/15 bg-[#112240] px-3.5 py-2.5 text-sm text-[#F8FAFC] placeholder-[#94A3B8]/50 focus:border-[#F59E0B] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="checkout-phone"
                        className="block text-xs font-semibold text-[#94A3B8]"
                      >
                        {detailDict.phoneLabel} *
                      </label>
                      <input
                        id="checkout-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+34 600 000 000"
                        className="numeric-tabular mt-1 w-full rounded-xl border border-white/15 bg-[#112240] px-3.5 py-2.5 text-sm text-[#F8FAFC] placeholder-[#94A3B8]/50 focus:border-[#F59E0B] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="checkout-doc"
                      className="block text-xs font-semibold text-[#94A3B8]"
                    >
                      {detailDict.documentIdLabel} *
                    </label>
                    <input
                      id="checkout-doc"
                      type="text"
                      required
                      value={documentId}
                      onChange={(e) => setDocumentId(e.target.value)}
                      placeholder="12345678Z / Passport"
                      className="numeric-tabular mt-1 w-full rounded-xl border border-white/15 bg-[#112240] px-3.5 py-2.5 text-sm text-[#F8FAFC] placeholder-[#94A3B8]/50 focus:border-[#F59E0B] focus:outline-none"
                    />
                  </div>

                  {/* CHECKBOXES OBLIGATORIOS RGPD (Desmarcados por defecto) */}
                  <div className="space-y-3 rounded-2xl border border-white/10 bg-[#112240]/90 p-4 text-xs">
                    <label className="flex cursor-pointer items-start gap-2.5">
                      <input
                        type="checkbox"
                        required
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded accent-[#F59E0B]"
                      />
                      <span className="leading-relaxed text-[#F8FAFC]">
                        {detailDict.rgpdTermsText}{' '}
                        <Link
                          href={`/${locale}/legal/condiciones-alquiler`}
                          target="_blank"
                          className="font-bold text-[#F59E0B] underline hover:text-[#D97706]"
                        >
                          {detailDict.rgpdTermsLinkLabel}
                        </Link>
                        . *
                      </span>
                    </label>

                    <label className="flex cursor-pointer items-start gap-2.5">
                      <input
                        type="checkbox"
                        required
                        checked={acceptedPrivacy}
                        onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded accent-[#F59E0B]"
                      />
                      <span className="leading-relaxed text-[#F8FAFC]">
                        {detailDict.rgpdPrivacyText}{' '}
                        <Link
                          href={`/${locale}/legal/privacidad`}
                          target="_blank"
                          className="font-bold text-[#0EA5E9] underline hover:text-[#38BDF8]"
                        >
                          {detailDict.rgpdPrivacyLinkLabel}
                        </Link>
                        . *
                      </span>
                    </label>

                    {(!acceptedTerms || !acceptedPrivacy) && (
                      <p className="text-[11px] font-medium text-[#F59E0B]">
                        * {detailDict.rgpdRequiredHint}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={!isRgpdAndFormValid}
                    className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-2xl bg-[#F59E0B] px-6 py-3.5 text-sm font-extrabold text-[#0A1628] shadow-xl shadow-[#F59E0B]/25 transition-all duration-300 hover:bg-[#D97706] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Lock className="h-4 w-4" aria-hidden="true" />
                    <span>{detailDict.confirmBookingCta}</span>
                  </button>
                </form>
              )}

              {checkoutStep === 3 && (
                <div className="mt-6 rounded-2xl border border-[#10B981]/40 bg-[#10B981]/15 p-5 text-center">
                  <CheckCircle2
                    className="mx-auto h-10 w-10 text-[#10B981]"
                    aria-hidden="true"
                  />
                  <h3 className="mt-3 font-display text-lg font-bold text-[#F8FAFC]">
                    {detailDict.step3SuccessTitle}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#94A3B8]">
                    {detailDict.step3SuccessMessage}
                  </p>
                  <p className="numeric-tabular mt-4 inline-block rounded-full bg-[#0A1628] px-4 py-1.5 text-xs font-bold text-[#F59E0B]">
                    {detailDict.step3ReferenceLabel}: CT-FG-
                    {asset.id.slice(0, 6).toUpperCase()}-2026
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setCheckoutStep(1);
                      setAcceptedTerms(false);
                      setAcceptedPrivacy(false);
                    }}
                    className="mt-4 block w-full rounded-xl border border-white/20 bg-[#112240] py-2.5 text-xs font-bold text-[#F8FAFC] hover:border-[#F59E0B]"
                  >
                    {detailDict.step3ResetButton}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          3. BARRA INFERIOR FIJA EN MÓVIL (STICKY BOTTOM BAR — DESIGN.md Sección 5)
         ===================================================================== */}
      <div className="glass-mediterranean fixed inset-x-0 bottom-0 z-40 flex items-center justify-between px-4 py-3.5 shadow-2xl lg:hidden">
        <div className="numeric-tabular">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
            {detailDict.mobileStickyFrom} · {catalogDict.depositLabel}:{' '}
            {formatCentsToEUR(asset.depositCents, locale)}
          </p>
          <p className="text-xl font-extrabold text-[#F59E0B]">
            {formatCentsToEUR(financialBreakdown.totalRentalPayNowCents, locale, true)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (checkoutStep === 1) {
              setCheckoutStep(2);
            }
            scrollToBookingPanel();
          }}
          className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl bg-[#F59E0B] px-5 py-3 text-sm font-extrabold text-[#0A1628] shadow-lg shadow-[#F59E0B]/25 active:scale-95"
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          <span>{detailDict.mobileStickyCta}</span>
        </button>
      </div>

      {/* =====================================================================
          4. MODAL LIGHTBOX HD DE GALERÍA AMPLIADA
         ===================================================================== */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={asset.title[locale]}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1628]/95 p-4 backdrop-blur-md"
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            aria-label={detailDict.closeGallery}
            className="absolute top-6 right-6 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#112240] text-[#F8FAFC] hover:border-[#F59E0B] hover:text-[#F59E0B]"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() =>
              setActiveGalleryIndex(
                (prev) => (prev - 1 + allImages.length) % allImages.length
              )
            }
            aria-label="Previous image"
            className="absolute left-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#112240]/90 text-[#F8FAFC] hover:border-[#F59E0B] sm:left-8"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="relative aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/15 bg-[#0A1628] shadow-2xl">
            <Image
              src={allImages[activeGalleryIndex]}
              alt={asset.imageAlt[locale]}
              fill
              sizes="95vw"
              className="object-cover object-center"
            />
          </div>

          <button
            type="button"
            onClick={() =>
              setActiveGalleryIndex((prev) => (prev + 1) % allImages.length)
            }
            aria-label="Next image"
            className="absolute right-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#112240]/90 text-[#F8FAFC] hover:border-[#F59E0B] sm:right-8"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
