'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/i18n/config';
import type { SupportedLocale } from '@/types/catalog';

/**
 * Redirección Raíz con Detección Automática de Idioma del Navegador — Costa Tour
 *
 * Propósito de negocio, i18n y compatibilidad CDN (Firebase Hosting):
 * - Detecta automáticamente el idioma preferido del navegador (`navigator.languages`)
 *   entre los 4 idiomas oficiales (`es`, `en`, `de`, `fr`) y redirige sin parpadeo a `/[lang]`.
 * - Permite exportación estática pura (`output: 'export'`) para despliegue instantáneo en CDN.
 */
export default function RootLanguageDetectorPage() {
  const router = useRouter();

  useEffect(() => {
    const browserLanguages =
      typeof navigator !== 'undefined'
        ? navigator.languages ?? [navigator.language]
        : [DEFAULT_LOCALE];

    let targetLocale: SupportedLocale = DEFAULT_LOCALE;

    for (const rawLang of browserLanguages) {
      if (!rawLang) continue;
      const primaryCode = rawLang.split('-')[0].toLowerCase();
      const matched = SUPPORTED_LOCALES.find((loc) => loc === primaryCode);
      if (matched) {
        targetLocale = matched;
        break;
      }
    }

    router.replace(`/${targetLocale}`);
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0A1628] text-[#F8FAFC]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#F59E0B] border-t-transparent" />
        <p className="font-display text-sm font-bold tracking-wider text-[#94A3B8]">
          COSTA TOUR FUENGIROLA
        </p>
      </div>
    </main>
  );
}
