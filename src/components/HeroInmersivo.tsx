'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Image from 'next/image';
import {
  Anchor,
  Building2,
  Calendar,
  CarFront,
  CheckCircle2,
  Compass,
  Minus,
  Plus,
  Search,
  ShieldCheck,
  Star,
  Users,
} from 'lucide-react';
import { VERTICAL_SELECT_EVENT } from '@/components/NavbarGlobal';
import type { UIDictionary } from '@/i18n/dictionaries';
import type { AssetVertical, SupportedLocale } from '@/types/catalog';

/**
 * Filtro de vertical admitido por el buscador unificado (`ALL` o una vertical específica).
 */
export type SearchVerticalFilter = 'ALL' | AssetVertical;

/**
 * Payload emitido por el buscador unificado hacia el catálogo modular.
 */
export interface UnifiedSearchFilterPayload {
  readonly vertical: SearchVerticalFilter;
  readonly checkIn: string;
  readonly checkOut: string;
  readonly guests: number;
}

/**
 * Evento personalizado despachado al ejecutar una búsqueda en el Hero.
 */
export const CATALOG_SEARCH_EVENT = 'costatour:catalog-search';

export interface HeroInmersivoProps {
  readonly locale: SupportedLocale;
  readonly dict: UIDictionary['hero'];
  readonly guestsUnitLabel: string;
}

/**
 * Sección Hero Inmersiva + Buscador Central Estilo Airbnb — Costa Tour (PRD.md Fase 2.2)
 *
 * Propósito de negocio, rendimiento (Core Web Vitals) y UX:
 * - Renderiza un poster de alta definición mediante `next/image` con `priority` para asegurar
 *   LCP óptimo y CLS = 0, superponiendo un vídeo HD en bucle con carga asíncrona (`preload="metadata"`).
 * - Incorpora el Buscador Central Unificado en cristal esmerilado (`glass-mediterranean`) con
 *   pestañas por vertical (Todo / Vehículos / Pisos y Casas / Náutica), fechas con `tabular-nums`
 *   y selector dinámico de pasajeros/huéspedes conectado al catálogo.
 */
export function HeroInmersivo({ locale, dict, guestsUnitLabel }: HeroInmersivoProps) {
  const [selectedVertical, setSelectedVertical] = useState<SearchVerticalFilter>('ALL');
  const [checkInDate, setCheckInDate] = useState<string>('2026-12-02');
  const [checkOutDate, setCheckOutDate] = useState<string>('2026-12-06');
  const [guestsCount, setGuestsCount] = useState<number>(4);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);

  // Capacidad máxima dinámica según la vertical seleccionada (Barcos: 12, Viviendas: 8, Vehículos: 5)
  const maxCapacityForVertical: Record<SearchVerticalFilter, number> = {
    ALL: 12,
    BOAT: 12,
    PROPERTY: 8,
    VEHICLE: 5,
  };

  const currentMaxGuests = maxCapacityForVertical[selectedVertical];

  // Escucha los clics en las 3 verticales desde la barra de navegación superior
  useEffect(() => {
    const handleNavbarVerticalSelect = (event: Event) => {
      const customEvent = event as CustomEvent<{ vertical: AssetVertical }>;
      if (customEvent.detail?.vertical) {
        const nextVertical = customEvent.detail.vertical;
        setSelectedVertical(nextVertical);
        setGuestsCount((prev) => Math.min(prev, maxCapacityForVertical[nextVertical]));
      }
    };

    window.addEventListener(VERTICAL_SELECT_EVENT, handleNavbarVerticalSelect);
    return () => window.removeEventListener(VERTICAL_SELECT_EVENT, handleNavbarVerticalSelect);
  }, []);

  /**
   * Cambia la pestaña de vertical activa y ajusta el límite máximo de pasajeros/huéspedes.
   */
  const handleTabChange = (vertical: SearchVerticalFilter) => {
    setSelectedVertical(vertical);
    const maxAllowed = maxCapacityForVertical[vertical];
    if (guestsCount > maxAllowed) {
      setGuestsCount(maxAllowed);
    }
  };

  /**
   * Garantiza la coherencia temporal: la fecha de salida nunca puede ser anterior a la de entrada.
   */
  const handleCheckInChange = (nextCheckIn: string) => {
    setCheckInDate(nextCheckIn);
    if (checkOutDate && nextCheckIn > checkOutDate) {
      setCheckOutDate(nextCheckIn);
    }
  };

  /**
   * Ejecuta la búsqueda: sincroniza parámetros en la URL, despacha el evento al catálogo
   * y desplaza suavemente el viewport hacia la sección `#catalogo`.
   */
  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: UnifiedSearchFilterPayload = {
      vertical: selectedVertical,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: guestsCount,
    };

    // Actualiza la URL con parámetros legibles para compartir búsquedas sin recargar
    const searchParams = new URLSearchParams();
    if (selectedVertical !== 'ALL') {
      searchParams.set('vertical', selectedVertical);
    }
    searchParams.set('checkIn', checkInDate);
    searchParams.set('checkOut', checkOutDate);
    searchParams.set('guests', String(guestsCount));

    const newUrl = `/${locale}?${searchParams.toString()}#catalogo`;
    window.history.replaceState(null, '', newUrl);

    window.dispatchEvent(
      new CustomEvent<UnifiedSearchFilterPayload>(CATALOG_SEARCH_EVENT, {
        detail: payload,
      })
    );

    const catalogElement = document.getElementById('catalogo');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tabs: ReadonlyArray<{
    readonly id: SearchVerticalFilter;
    readonly label: string;
    readonly icon: typeof Compass;
  }> = [
    { id: 'ALL', label: dict.searchTabs.all, icon: Compass },
    { id: 'VEHICLE', label: dict.searchTabs.vehicles, icon: CarFront },
    { id: 'PROPERTY', label: dict.searchTabs.properties, icon: Building2 },
    { id: 'BOAT', label: dict.searchTabs.boats, icon: Anchor },
  ];

  return (
    <section
      aria-label="Hero Costa Tour Fuengirola"
      className="relative flex min-h-[92vh] w-full items-center justify-center overflow-hidden bg-[#0A1628] pt-28 pb-16 sm:pt-32 sm:pb-24"
    >
      {/* Capa Multimedia Asíncrona: Poster next/image (CLS = 0) + Vídeo HD en bucle */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1920&q=85"
          alt={dict.videoPosterAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onCanPlay={() => setIsVideoReady(true)}
          poster="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1920&q=85"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            isVideoReady ? 'opacity-65' : 'opacity-0'
          }`}
        >
          {/* Fuente de vídeo HD costero/náutico libre de derechos con fallback automático al poster */}
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-yachts-in-a-marina-41521-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Gradiente Oscuro Mediterráneo para garantizar contraste AA/AAA (DESIGN.md Sección 2) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/85 via-[#0A1628]/70 to-[#0A1628]"
        />
      </div>

      {/* Contenedor Principal (Máximo 1440px / max-w-7xl) */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Insignia de Calificación Verificada de Google */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-[#112240]/90 px-4 py-2 text-xs font-semibold text-[#F8FAFC] shadow-lg backdrop-blur-md sm:text-sm">
            <span className="flex items-center gap-1 text-[#F59E0B]">
              <Star className="h-4 w-4 fill-[#F59E0B]" aria-hidden="true" />
              <Star className="h-4 w-4 fill-[#F59E0B]" aria-hidden="true" />
              <Star className="h-4 w-4 fill-[#F59E0B]" aria-hidden="true" />
              <Star className="h-4 w-4 fill-[#F59E0B]" aria-hidden="true" />
              <Star className="h-4 w-4 fill-[#F59E0B]" aria-hidden="true" />
            </span>
            <span className="text-[#0EA5E9]">·</span>
            <span>{dict.verifiedBadge}</span>
          </div>

          {/* H1 Único de la Página con escala fluida clamp(2.5rem, 5vw, 4.5rem) */}
          <h1 className="heading-hero mt-6 font-display font-extrabold text-[#F8FAFC]">
            {dict.headline}{' '}
            <span className="bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#0EA5E9] bg-clip-text text-transparent">
              {dict.headlineHighlight}
            </span>
          </h1>

          {/* Subtítulo Persuasivo */}
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#94A3B8] sm:text-lg">
            {dict.subheadline}
          </p>
        </div>

        {/* BUSCADOR CENTRAL UNIFICADO ESTILO AIRBNB (Glassmorphism) */}
        <div
          id="buscador"
          className="glass-mediterranean mx-auto mt-10 max-w-5xl rounded-3xl p-4 shadow-2xl shadow-black/50 sm:mt-12 sm:p-6"
        >
          {/* Pestañas de Selección de Vertical */}
          <div
            role="tablist"
            aria-label="Booking Verticals"
            className="flex flex-wrap items-center justify-center gap-2 border-b border-white/10 pb-4 sm:justify-start"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = selectedVertical === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold transition-all duration-300 ease-out sm:text-sm ${
                    isSelected
                      ? 'bg-[#F59E0B] text-[#0A1628] shadow-lg shadow-[#F59E0B]/25'
                      : 'bg-[#112240]/80 text-[#F8FAFC] hover:bg-white/10 hover:text-[#F59E0B]'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${isSelected ? 'text-[#0A1628]' : 'text-[#0EA5E9]'}`}
                    aria-hidden="true"
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Formulario de Búsqueda: Fechas, Pasajeros/Huéspedes y CTA */}
          <form
            onSubmit={handleSearchSubmit}
            className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:items-center"
          >
            {/* Campo 1: Fecha de Llegada / Recogida */}
            <div className="flex flex-col rounded-2xl border border-white/10 bg-[#112240]/90 px-4 py-3 transition-colors focus-within:border-[#F59E0B] lg:col-span-3">
              <label
                htmlFor="hero-checkin-date"
                className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]"
              >
                <Calendar className="h-3.5 w-3.5 text-[#0EA5E9]" aria-hidden="true" />
                <span>{dict.searchFields.checkIn}</span>
              </label>
              <input
                id="hero-checkin-date"
                type="date"
                value={checkInDate}
                min="2026-11-21"
                onChange={(e) => handleCheckInChange(e.target.value)}
                className="numeric-tabular mt-1 w-full bg-transparent text-sm font-semibold text-[#F8FAFC] focus:outline-none [color-scheme:dark]"
                required
              />
            </div>

            {/* Campo 2: Fecha de Salida / Devolución */}
            <div className="flex flex-col rounded-2xl border border-white/10 bg-[#112240]/90 px-4 py-3 transition-colors focus-within:border-[#F59E0B] lg:col-span-3">
              <label
                htmlFor="hero-checkout-date"
                className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]"
              >
                <Calendar className="h-3.5 w-3.5 text-[#0EA5E9]" aria-hidden="true" />
                <span>{dict.searchFields.checkOut}</span>
              </label>
              <input
                id="hero-checkout-date"
                type="date"
                value={checkOutDate}
                min={checkInDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="numeric-tabular mt-1 w-full bg-transparent text-sm font-semibold text-[#F8FAFC] focus:outline-none [color-scheme:dark]"
                required
              />
            </div>

            {/* Campo 3: Contador de Pasajeros / Huéspedes con tabular-nums */}
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#112240]/90 px-4 py-2.5 lg:col-span-3">
              <div>
                <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                  <Users className="h-3.5 w-3.5 text-[#0EA5E9]" aria-hidden="true" />
                  <span>{dict.searchFields.guestsOrPassengers}</span>
                </span>
                <p className="numeric-tabular mt-0.5 text-sm font-bold text-[#F8FAFC]">
                  {guestsCount} {guestsUnitLabel}
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setGuestsCount((prev) => Math.max(1, prev - 1))}
                  disabled={guestsCount <= 1}
                  aria-label={dict.searchFields.decreaseGuestsAria}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/15 bg-[#0A1628] text-[#F8FAFC] transition-colors hover:border-[#F59E0B] hover:text-[#F59E0B] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setGuestsCount((prev) => Math.min(currentMaxGuests, prev + 1))}
                  disabled={guestsCount >= currentMaxGuests}
                  aria-label={dict.searchFields.increaseGuestsAria}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/15 bg-[#0A1628] text-[#F8FAFC] transition-colors hover:border-[#F59E0B] hover:text-[#F59E0B] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Campo 4: Botón de Búsqueda Inmediata Conectado al Catálogo */}
            <div className="sm:col-span-2 lg:col-span-3">
              <button
                type="submit"
                className="flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-2xl bg-[#F59E0B] px-6 py-3.5 text-sm font-extrabold text-[#0A1628] shadow-xl shadow-[#F59E0B]/25 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#D97706] active:translate-y-0"
              >
                <Search className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
                <span>{dict.searchFields.searchAction}</span>
              </button>
            </div>
          </form>

          {/* Píldoras de Confianza Rápida y Solvencia Operativa */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-white/10 pt-3.5 text-xs font-medium text-[#94A3B8]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
              <span>{dict.trustPills.instantConfirmation}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />
              <span>{dict.trustPills.transparentDeposit}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#0EA5E9]" aria-hidden="true" />
              <span>{dict.trustPills.localSupport}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
