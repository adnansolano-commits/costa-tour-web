'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Anchor,
  ArrowUpRight,
  Award,
  Building2,
  CalendarCheck2,
  CarFront,
  Compass,
  Fuel,
  RotateCcw,
  ShieldAlert,
  SlidersHorizontal,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import {
  CATALOG_SEARCH_EVENT,
  type SearchVerticalFilter,
  type UnifiedSearchFilterPayload,
} from '@/components/HeroInmersivo';
import { VERTICAL_SELECT_EVENT } from '@/components/NavbarGlobal';
import { formatBillingUnitLabel, formatCentsToEUR } from '@/i18n/config';
import type { UIDictionary } from '@/i18n/dictionaries';
import type { AssetVertical, CatalogAsset, SupportedLocale } from '@/types/catalog';

/**
 * Criterios de ordenación del catálogo modular.
 */
type CatalogSortOrder = 'FEATURED' | 'PRICE_ASC' | 'PRICE_DESC' | 'RATING_DESC';

export interface CatalogoModularProps {
  readonly locale: SupportedLocale;
  readonly assets: readonly CatalogAsset[];
  readonly dict: UIDictionary['catalog'];
  readonly searchTabsDict: UIDictionary['hero']['searchTabs'];
}

/**
 * Comprueba si un activo tiene fechas bloqueadas dentro del rango [checkIn, checkOut].
 */
function hasDateConflict(
  blockedDates: readonly string[],
  checkIn: string,
  checkOut: string
): boolean {
  if (!checkIn || !checkOut) {
    return false;
  }
  return blockedDates.some((blockedDate) => blockedDate >= checkIn && blockedDate <= checkOut);
}

/**
 * Catálogo Modular (Cuadrícula Asimétrica Bento Box + Listado Filtrable) — Costa Tour (PRD.md Fase 2.3)
 *
 * Propósito de negocio, rendimiento (CLS = 0) y transparencia financiera:
 * - Presenta en primer lugar la cuadrícula asimétrica Bento Box con los 3 activos insignia
 *   (Flota Náutica, Vehículos Terrestres y Alojamientos) y micro-interacciones de 300ms.
 * - Proporciona filtrado reactivo en tiempo real sincronizado con el Buscador del Hero y el Navbar
 *   (por vertical, rango de fechas sin solapamiento, capacidad mínima y orden de precio en céntimos).
 * - Muestra en cada tarjeta la iconografía binaria de 4 puntos clave (Fianza reembolsable en céntimos,
 *   Combustible/Limpieza, Patrón/Seguro y Cancelación flexible 48h).
 */
export function CatalogoModular({
  locale,
  assets,
  dict,
  searchTabsDict,
}: CatalogoModularProps) {
  const [activeVertical, setActiveVertical] = useState<SearchVerticalFilter>('ALL');
  const [checkInFilter, setCheckInFilter] = useState<string>('');
  const [checkOutFilter, setCheckOutFilter] = useState<string>('');
  const [minGuests, setMinGuests] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<CatalogSortOrder>('FEATURED');

  // Escucha eventos desde el Navbar (clic en una vertical) y desde el Buscador del Hero
  useEffect(() => {
    const handleNavbarVertical = (event: Event) => {
      const customEvent = event as CustomEvent<{ vertical: AssetVertical }>;
      if (customEvent.detail?.vertical) {
        setActiveVertical(customEvent.detail.vertical);
      }
    };

    const handleHeroSearch = (event: Event) => {
      const customEvent = event as CustomEvent<UnifiedSearchFilterPayload>;
      if (customEvent.detail) {
        setActiveVertical(customEvent.detail.vertical);
        setCheckInFilter(customEvent.detail.checkIn);
        setCheckOutFilter(customEvent.detail.checkOut);
        setMinGuests(customEvent.detail.guests);
      }
    };

    window.addEventListener(VERTICAL_SELECT_EVENT, handleNavbarVertical);
    window.addEventListener(CATALOG_SEARCH_EVENT, handleHeroSearch);

    return () => {
      window.removeEventListener(VERTICAL_SELECT_EVENT, handleNavbarVertical);
      window.removeEventListener(CATALOG_SEARCH_EVENT, handleHeroSearch);
    };
  }, []);

  /**
   * Activos insignia para la cuadrícula asimétrica Bento Box (1 por cada vertical).
   */
  const bentoAssets = useMemo(
    () => assets.filter((asset) => asset.featuredInBento),
    [assets]
  );

  /**
   * Lista filtrada y ordenada determinísticamente en tiempo real.
   */
  const filteredAssets = useMemo(() => {
    const matching = assets.filter((asset) => {
      if (activeVertical !== 'ALL' && asset.vertical !== activeVertical) {
        return false;
      }
      if (asset.capacity < minGuests) {
        return false;
      }
      if (
        checkInFilter &&
        checkOutFilter &&
        hasDateConflict(asset.simulatedBlockedDates, checkInFilter, checkOutFilter)
      ) {
        return false;
      }
      return true;
    });

    return [...matching].sort((a, b) => {
      if (sortOrder === 'PRICE_ASC') {
        return a.priceCents - b.priceCents;
      }
      if (sortOrder === 'PRICE_DESC') {
        return b.priceCents - a.priceCents;
      }
      if (sortOrder === 'RATING_DESC') {
        return b.rating - a.rating;
      }
      // FEATURED: prioriza los destacados Bento manteniendo orden estable
      return Number(b.featuredInBento) - Number(a.featuredInBento);
    });
  }, [assets, activeVertical, minGuests, checkInFilter, checkOutFilter, sortOrder]);

  const handleResetFilters = () => {
    setActiveVertical('ALL');
    setCheckInFilter('');
    setCheckOutFilter('');
    setMinGuests(1);
    setSortOrder('FEATURED');
  };

  const getVerticalIcon = (vertical: AssetVertical) => {
    if (vertical === 'BOAT') return Anchor;
    if (vertical === 'VEHICLE') return CarFront;
    return Building2;
  };

  return (
    <section
      id="catalogo"
      aria-labelledby="catalog-bento-heading"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      {/* =====================================================================
          1. CABECERA Y CUADRÍCULA ASIMÉTRICA BENTO BOX (3 VERTICALES)
         ===================================================================== */}
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#0A1628] px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-[#F59E0B]">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{dict.bentoBadge}</span>
          </span>
          <h2
            id="catalog-bento-heading"
            className="heading-section mt-4 font-display font-extrabold text-[#0F172A]"
          >
            {dict.bentoHeading}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#475569]">
            {dict.bentoSubheading}
          </p>
        </div>

        {/* Acceso Rápido por Vertical */}
        <div className="flex flex-wrap items-center gap-2">
          {(['BOAT', 'VEHICLE', 'PROPERTY'] as const).map((vertical) => {
            const Icon = getVerticalIcon(vertical);
            const isSelected = activeVertical === vertical;
            return (
              <button
                key={vertical}
                type="button"
                onClick={() =>
                  setActiveVertical((prev) => (prev === vertical ? 'ALL' : vertical))
                }
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition-all duration-300 ease-out ${
                  isSelected
                    ? 'border-[#F59E0B] bg-[#0A1628] text-[#F59E0B] shadow-md'
                    : 'border-[#0F172A]/10 bg-white text-[#0F172A] hover:border-[#0A1628] hover:bg-[#0A1628] hover:text-white'
                }`}
              >
                <Icon className="h-3.5 w-3.5 text-[#0EA5E9]" aria-hidden="true" />
                <span>{dict.verticalNames[vertical]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cuadrícula Asimétrica Bento Box (DESIGN.md Sección 1 y 4: rounded-3xl = 24px) */}
      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:grid-rows-2">
        {bentoAssets.map((asset) => {
          const Icon = getVerticalIcon(asset.vertical);
          const isHeroLarge = asset.bentoRole === 'HERO_LARGE';
          const spanClasses = isHeroLarge
            ? 'lg:col-span-7 lg:row-span-2 min-h-[420px] sm:min-h-[520px]'
            : 'lg:col-span-5 lg:row-span-1 min-h-[250px]';

          return (
            <article
              key={`bento-${asset.id}`}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#0A1628] p-6 text-[#F8FAFC] shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl sm:p-8 ${spanClasses}`}
            >
              {/* Imagen optimizada con next/image, fill y zoom suave group-hover:scale-105 */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={asset.mainImage}
                  alt={asset.imageAlt[locale]}
                  fill
                  loading="lazy"
                  sizes={
                    isHeroLarge
                      ? '(max-width: 1024px) 100vw, 58vw'
                      : '(max-width: 1024px) 100vw, 42vw'
                  }
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/60 to-[#0A1628]/20"
                />
              </div>

              {/* Barra Superior de la Tarjeta Bento */}
              <div className="relative z-10 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#0A1628]/80 px-3.5 py-1.5 text-xs font-bold text-[#0EA5E9] backdrop-blur-md">
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{dict.verticalNames[asset.vertical]}</span>
                </span>

                <button
                  type="button"
                  onClick={() => setActiveVertical(asset.vertical)}
                  className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-[#F8FAFC] backdrop-blur-md transition-colors hover:bg-[#F59E0B] hover:text-[#0A1628]"
                >
                  <span>{dict.bentoExploreVertical}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>

              {/* Contenido Inferior Bento: Título, Precio Tabular y CTA a Ficha */}
              <div className="relative z-10 mt-auto pt-12">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#F59E0B]">
                  <Star className="h-3.5 w-3.5 fill-[#F59E0B]" aria-hidden="true" />
                  <span className="numeric-tabular">{asset.rating.toFixed(2)}</span>
                  <span className="text-[#94A3B8]">
                    ({asset.reviewCount} {dict.reviewsLabel})
                  </span>
                </div>

                <h3
                  className={`mt-1.5 font-display font-extrabold text-[#F8FAFC] ${
                    isHeroLarge ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
                  }`}
                >
                  {asset.title[locale]}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-[#94A3B8]">
                  {asset.subtitle[locale]}
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-4">
                  <div className="numeric-tabular">
                    <span className="text-2xl font-extrabold text-[#F59E0B]">
                      {formatCentsToEUR(asset.priceCents, locale)}
                    </span>
                    <span className="ml-1 text-xs text-[#94A3B8]">
                      {formatBillingUnitLabel(asset.billingUnit, locale)}
                    </span>
                    <p className="text-[11px] text-[#94A3B8]">
                      {dict.depositLabel}: {formatCentsToEUR(asset.depositCents, locale)}
                    </p>
                  </div>

                  <Link
                    href={`/${locale}/catalogo/${asset.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-[#F59E0B] px-4 py-2 text-xs font-extrabold text-[#0A1628] shadow-lg shadow-[#F59E0B]/25 transition-all duration-300 ease-out hover:bg-[#D97706]"
                  >
                    <span>{dict.viewDetails}</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* =====================================================================
          2. BARRA DE FILTRADO EN TIEMPO REAL Y ORDENACIÓN FINANCIERA
         ===================================================================== */}
      <div className="mt-16 rounded-3xl border border-[#0F172A]/10 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          {/* Pestañas de Vertical */}
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { id: 'ALL', label: searchTabsDict.all, icon: Compass },
                { id: 'VEHICLE', label: searchTabsDict.vehicles, icon: CarFront },
                { id: 'PROPERTY', label: searchTabsDict.properties, icon: Building2 },
                { id: 'BOAT', label: searchTabsDict.boats, icon: Anchor },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              const isActive = activeVertical === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveVertical(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all duration-300 ease-out sm:text-sm ${
                    isActive
                      ? 'bg-[#0A1628] text-[#F59E0B] shadow-md'
                      : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#0A1628]/5 hover:text-[#0F172A]'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${isActive ? 'text-[#F59E0B]' : 'text-[#0EA5E9]'}`}
                    aria-hidden="true"
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Controles de Capacidad Mínima, Orden de Precio y Reset */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Filtro de Capacidad Mínima */}
            <div className="flex items-center gap-2 rounded-2xl border border-[#0F172A]/10 bg-[#F8FAFC] px-3.5 py-2">
              <Users className="h-4 w-4 text-[#0EA5E9]" aria-hidden="true" />
              <label
                htmlFor="catalog-min-guests"
                className="text-xs font-semibold text-[#475569]"
              >
                {dict.filterBar.minCapacityLabel}:
              </label>
              <select
                id="catalog-min-guests"
                value={minGuests}
                onChange={(e) => setMinGuests(Number(e.target.value))}
                className="numeric-tabular bg-transparent text-xs font-bold text-[#0F172A] focus:outline-none"
              >
                {[1, 2, 4, 5, 6, 8, 12].map((num) => (
                  <option key={num} value={num}>
                    {num}+ {dict.guestsUnit}
                  </option>
                ))}
              </select>
            </div>

            {/* Selector de Ordenación */}
            <div className="flex items-center gap-2 rounded-2xl border border-[#0F172A]/10 bg-[#F8FAFC] px-3.5 py-2">
              <SlidersHorizontal className="h-4 w-4 text-[#0EA5E9]" aria-hidden="true" />
              <label
                htmlFor="catalog-sort-order"
                className="text-xs font-semibold text-[#475569]"
              >
                {dict.filterBar.sortByLabel}:
              </label>
              <select
                id="catalog-sort-order"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as CatalogSortOrder)}
                className="bg-transparent text-xs font-bold text-[#0F172A] focus:outline-none"
              >
                <option value="FEATURED">{dict.filterBar.sortFeatured}</option>
                <option value="PRICE_ASC">{dict.filterBar.sortPriceAsc}</option>
                <option value="PRICE_DESC">{dict.filterBar.sortPriceDesc}</option>
                <option value="RATING_DESC">{dict.filterBar.sortRating}</option>
              </select>
            </div>

            {/* Botón Restablecer Filtros */}
            {(activeVertical !== 'ALL' ||
              minGuests > 1 ||
              checkInFilter !== '' ||
              sortOrder !== 'FEATURED') && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 rounded-2xl border border-[#F59E0B]/40 bg-[#F59E0B]/10 px-3.5 py-2 text-xs font-bold text-[#0A1628] transition-colors hover:bg-[#F59E0B] hover:text-[#0A1628]"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{dict.filterBar.clearFilters}</span>
              </button>
            )}
          </div>
        </div>

        {/* Resumen de Resultados Activos */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#0F172A]/5 pt-3 text-xs text-[#475569]">
          <p className="numeric-tabular font-semibold">
            <span className="font-bold text-[#0F172A]">{filteredAssets.length}</span>{' '}
            {dict.filterBar.activeFiltersCount}
            {checkInFilter && checkOutFilter ? (
              <span className="ml-2 rounded-full bg-[#10B981]/15 px-2.5 py-0.5 font-bold text-[#10B981]">
                {checkInFilter} → {checkOutFilter}
              </span>
            ) : null}
          </p>
        </div>
      </div>

      {/* =====================================================================
          3. LISTADO DE TARJETAS MODULARES CON LAZY LOADING E ICONOGRAFÍA BINARIA
         ===================================================================== */}
      {filteredAssets.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-[#0F172A]/10 bg-white p-12 text-center shadow-sm">
          <p className="font-display text-xl font-bold text-[#0F172A]">
            {dict.filterBar.emptyStateTitle}
          </p>
          <p className="mt-2 text-sm text-[#475569]">
            {dict.filterBar.emptyStateSubtitle}
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F59E0B] px-6 py-3 text-sm font-bold text-[#0A1628] transition-colors hover:bg-[#D97706]"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span>{dict.filterBar.clearFilters}</span>
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredAssets.map((asset) => {
            const VerticalIcon = getVerticalIcon(asset.vertical);

            return (
              <article
                key={asset.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#0F172A]/[0.08] bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div>
                  {/* Contenedor de Imagen con Aspect-Ratio Fijo (16:10) para CLS = 0 */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A1628]">
                    <Image
                      src={asset.mainImage}
                      alt={asset.imageAlt[locale]}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                    />

                    {/* Badges Superiores sobre la Imagen */}
                    <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0A1628]/85 px-3 py-1 text-xs font-bold text-[#0EA5E9] backdrop-blur-md">
                        <VerticalIcon className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{dict.verticalNames[asset.vertical]}</span>
                      </span>

                      <span className="inline-flex items-center gap-1 rounded-full bg-[#10B981] px-2.5 py-1 text-[11px] font-extrabold text-[#0A1628] shadow-sm">
                        <span>●</span>
                        <span>{dict.availableBadge}</span>
                      </span>
                    </div>

                    {/* Badge Inferior de Capacidad y Valoración */}
                    <div className="numeric-tabular absolute inset-x-3 bottom-3 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0A1628]/85 px-3 py-1 text-xs font-semibold text-[#F8FAFC] backdrop-blur-md">
                        <Users className="h-3.5 w-3.5 text-[#0EA5E9]" aria-hidden="true" />
                        <span>
                          {asset.capacity} {dict.guestsUnit}
                        </span>
                      </span>

                      <span className="inline-flex items-center gap-1 rounded-full bg-[#0A1628]/85 px-2.5 py-1 text-xs font-bold text-[#F59E0B] backdrop-blur-md">
                        <Star className="h-3.5 w-3.5 fill-[#F59E0B]" aria-hidden="true" />
                        <span>{asset.rating.toFixed(2)}</span>
                      </span>
                    </div>
                  </div>

                  {/* Cuerpo de la Tarjeta */}
                  <div className="p-6">
                    <p className="text-xs font-semibold text-[#0EA5E9]">
                      {asset.technicalMetadata.requirementBadge[locale]}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-bold text-[#0F172A] group-hover:text-[#0A1628]">
                      <Link
                        href={`/${locale}/catalogo/${asset.slug}`}
                        className="focus:outline-none"
                      >
                        {asset.title[locale]}
                      </Link>
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-sm text-[#475569]">
                      {asset.subtitle[locale]}
                    </p>

                    {/* ICONOGRAFÍA BINARIA CLARA (4 Indicadores Clave — PRD.md Fase 2.3) */}
                    <div className="mt-5 grid grid-cols-2 gap-2.5 rounded-2xl bg-[#F8FAFC] p-3.5 text-xs">
                      {/* 1. Fianza Reembolsable */}
                      <div className="flex items-start gap-2">
                        <ShieldAlert
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#F59E0B]"
                          aria-hidden="true"
                        />
                        <div>
                          <span className="block font-semibold text-[#0F172A]">
                            {dict.depositLabel}
                          </span>
                          <span className="numeric-tabular font-bold text-[#D97706]">
                            {formatCentsToEUR(asset.depositCents, locale)}
                          </span>
                        </div>
                      </div>

                      {/* 2. Combustible / Limpieza Incluida */}
                      <div className="flex items-start gap-2">
                        <Fuel
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#10B981]"
                          aria-hidden="true"
                        />
                        <span className="font-medium text-[#475569]">
                          {asset.binarySpecs.fuelOrCleaningIncluded
                            ? dict.includedFuelOrCleaning
                            : '—'}
                        </span>
                      </div>

                      {/* 3. Licencia / Patrón / Seguro */}
                      <div className="flex items-start gap-2">
                        <Award
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#0EA5E9]"
                          aria-hidden="true"
                        />
                        <span className="font-medium text-[#475569]">
                          {asset.binarySpecs.licenseOrSkipperIncluded
                            ? dict.includedLicenseOrSkipper
                            : '—'}
                        </span>
                      </div>

                      {/* 4. Cancelación Flexible 48h */}
                      <div className="flex items-start gap-2">
                        <CalendarCheck2
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#10B981]"
                          aria-hidden="true"
                        />
                        <span className="font-medium text-[#475569]">
                          {asset.binarySpecs.flexibleCancellation
                            ? dict.flexibleCancel
                            : '—'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pie de Tarjeta: Precio en Céntimos Enteros (tabular-nums) y Botón Reservar */}
                <div className="flex items-center justify-between border-t border-[#0F172A]/[0.08] bg-[#F8FAFC]/60 px-6 py-4">
                  <div className="numeric-tabular">
                    <span className="text-2xl font-extrabold text-[#0F172A]">
                      {formatCentsToEUR(asset.priceCents, locale)}
                    </span>
                    <span className="ml-1 text-xs font-semibold text-[#475569]">
                      {formatBillingUnitLabel(asset.billingUnit, locale)}
                    </span>
                  </div>

                  <Link
                    href={`/${locale}/catalogo/${asset.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#F59E0B] px-4 py-2.5 text-xs font-extrabold text-[#0A1628] shadow-md shadow-[#F59E0B]/20 transition-all duration-300 ease-out hover:bg-[#D97706]"
                  >
                    <span>{dict.viewDetails}</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
