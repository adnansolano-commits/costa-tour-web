'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Anchor, Building2, CarFront, Globe, Menu, Sparkles, X } from 'lucide-react';
import { CostaTourLogo } from '@/components/CostaTourLogo';
import { LOCALE_LABELS, SUPPORTED_LOCALES } from '@/i18n/config';
import type { UIDictionary } from '@/i18n/dictionaries';
import type { AssetVertical, SupportedLocale } from '@/types/catalog';

/**
 * Propiedades del componente de Navegación Global de Costa Tour.
 */
export interface NavbarGlobalProps {
  readonly locale: SupportedLocale;
  readonly dict: UIDictionary['nav'];
}

/**
 * Evento personalizado para sincronizar la selección de vertical entre Navbar,
 * Buscador del Hero y Catálogo Modular sin provocar recargas completas de página.
 */
export const VERTICAL_SELECT_EVENT = 'costatour:select-vertical';

/**
 * Navegación Global Sticky & Mobile Drawer — Costa Tour (PRD.md Fase 2.1)
 *
 * Propósito de negocio y UX:
 * - Integra el logotipo recreado de Costa Tour Viajes (Avión + Ferry CT + lema "VIAJA. DESCUBRE. VIVE.").
 * - Inicia transparente sobre el vídeo del Hero y muta a cristal esmerilado (`glass-mediterranean`)
 *   al superar 24px de scroll.
 */
export function NavbarGlobal({ locale, dict }: NavbarGlobalProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const buildLocalizedPath = (targetLocale: SupportedLocale): string => {
    if (!pathname) {
      return `/${targetLocale}`;
    }
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) {
      return `/${targetLocale}`;
    }
    const firstSegment = segments[0];
    const isFirstSegmentLocale = (SUPPORTED_LOCALES as readonly string[]).includes(firstSegment);
    if (isFirstSegmentLocale) {
      segments[0] = targetLocale;
      return `/${segments.join('/')}`;
    }
    return `/${targetLocale}/${segments.join('/')}`;
  };

  const handleSelectVertical = (vertical: AssetVertical) => {
    setIsMobileMenuOpen(false);
    window.dispatchEvent(
      new CustomEvent<{ vertical: AssetVertical }>(VERTICAL_SELECT_EVENT, {
        detail: { vertical },
      })
    );
  };

  const navItems: ReadonlyArray<{
    readonly vertical: AssetVertical;
    readonly label: string;
    readonly href: string;
    readonly icon: typeof CarFront;
  }> = [
    {
      vertical: 'VEHICLE',
      label: dict.vehicles,
      href: `/${locale}#catalogo`,
      icon: CarFront,
    },
    {
      vertical: 'PROPERTY',
      label: dict.properties,
      href: `/${locale}#catalogo`,
      icon: Building2,
    },
    {
      vertical: 'BOAT',
      label: dict.boats,
      href: `/${locale}#catalogo`,
      icon: Anchor,
    },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out ${
          isScrolled
            ? 'glass-mediterranean py-2.5 shadow-2xl shadow-[#0A1628]/50'
            : 'border-b border-transparent bg-gradient-to-b from-[#0A1628]/90 to-transparent py-4'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logotipo Recreado Oficial Costa Tour Viajes */}
          <Link
            href={`/${locale}`}
            className="group flex items-center focus:outline-none"
          >
            <CostaTourLogo
              variant="navbar"
              className="transition-transform duration-300 ease-out group-hover:scale-[1.02]"
            />
          </Link>

          {/* Enlaces Desktop a las 3 Verticales */}
          <nav
            aria-label="Primary Navigation"
            className="hidden items-center gap-1 rounded-full border border-white/10 bg-[#112240]/70 p-1.5 backdrop-blur-md lg:flex"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.vertical}
                  href={item.href}
                  onClick={() => handleSelectVertical(item.vertical)}
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[#F8FAFC] transition-all duration-300 ease-out hover:bg-white/10 hover:text-[#F59E0B]"
                >
                  <Icon className="h-4 w-4 text-[#0EA5E9]" aria-hidden="true" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Selector de Idioma (ES | EN | DE | FR) + CTA Principal */}
          <div className="hidden items-center gap-4 md:flex">
            <div
              role="group"
              aria-label={dict.languageSelectorAria}
              className="flex items-center gap-1 rounded-full border border-white/15 bg-[#112240]/80 p-1 text-xs font-semibold"
            >
              <Globe className="ml-2 mr-1 h-3.5 w-3.5 text-[#0EA5E9]" aria-hidden="true" />
              {SUPPORTED_LOCALES.map((langCode) => {
                const isActive = langCode === locale;
                return (
                  <Link
                    key={langCode}
                    href={buildLocalizedPath(langCode)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`rounded-full px-2.5 py-1 transition-all duration-300 ease-out ${
                      isActive
                        ? 'bg-[#F59E0B] text-[#0A1628] shadow-sm'
                        : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                    }`}
                  >
                    {LOCALE_LABELS[langCode].short}
                  </Link>
                );
              })}
            </div>

            <a
              href={`/${locale}#buscador`}
              className="inline-flex items-center gap-2 rounded-full bg-[#F59E0B] px-5 py-2.5 text-sm font-bold text-[#0A1628] shadow-lg shadow-[#F59E0B]/25 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#D97706] active:translate-y-0"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span>{dict.bookNow}</span>
            </a>
          </div>

          {/* Botón Menú Hamburguesa (Mobile-First) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={dict.openMenuAria}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-[#112240]/90 text-[#F8FAFC] transition-colors duration-300 hover:border-[#F59E0B] hover:text-[#F59E0B] lg:hidden"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Drawer Lateral Mobile-First */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 flex justify-end lg:hidden"
        >
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
            className="fixed inset-0 bg-[#0A1628]/80 backdrop-blur-sm transition-opacity"
          />

          <div className="relative z-10 flex h-full w-full max-w-sm flex-col justify-between border-l border-white/15 bg-[#0A1628] p-6 text-[#F8FAFC] shadow-2xl">
            <div>
              {/* Cabecera del Drawer con el Logo Oficial */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <CostaTourLogo variant="navbar" />

                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label={dict.closeMenuAria}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-[#112240] text-[#F8FAFC] hover:text-[#F59E0B]"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {/* Enlaces Táctiles a las 3 Verticales */}
              <nav className="mt-6 flex flex-col gap-3">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.vertical}
                      href={item.href}
                      onClick={() => handleSelectVertical(item.vertical)}
                      className="flex min-h-[54px] items-center justify-between rounded-2xl border border-white/10 bg-[#112240] px-4 py-3.5 text-base font-semibold text-[#F8FAFC] transition-all duration-300 hover:border-[#F59E0B] hover:text-[#F59E0B]"
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-[#0EA5E9]" aria-hidden="true" />
                        <span>{item.label}</span>
                      </span>
                      <span className="text-xs font-medium text-[#94A3B8]">→</span>
                    </a>
                  );
                })}
              </nav>

              {/* Selector de Idioma en Móvil */}
              <div className="mt-8">
                <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                  <Globe className="h-4 w-4 text-[#0EA5E9]" aria-hidden="true" />
                  <span>{dict.languageSelectorAria}</span>
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {SUPPORTED_LOCALES.map((langCode) => {
                    const isActive = langCode === locale;
                    return (
                      <Link
                        key={langCode}
                        href={buildLocalizedPath(langCode)}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex min-h-[44px] items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition-all ${
                          isActive
                            ? 'border-[#F59E0B] bg-[#F59E0B] text-[#0A1628]'
                            : 'border-white/10 bg-[#112240] text-[#F8FAFC] hover:border-white/30'
                        }`}
                      >
                        <span>{LOCALE_LABELS[langCode].short}</span>
                        <span className="text-xs opacity-80">
                          · {LOCALE_LABELS[langCode].nativeName}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CTA Inferior de Reserva en Drawer Móvil */}
            <div className="border-t border-white/10 pt-5">
              <a
                href={`/${locale}#buscador`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-[#F59E0B] px-6 py-3.5 text-base font-bold text-[#0A1628] shadow-lg shadow-[#F59E0B]/25 transition-colors hover:bg-[#D97706]"
              >
                <Sparkles className="h-5 w-5" aria-hidden="true" />
                <span>{dict.bookNow}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
