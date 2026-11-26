'use client';

import { useEffect } from 'react';
import type { SupportedLocale } from '@/types/catalog';

/**
 * Sincronizador de Atributos `lang` y `dir` en la etiqueta `<html>` Raíz — Costa Tour
 *
 * Propósito de accesibilidad y diseño espejo RTL:
 * - Actualiza dinámicamente `document.documentElement.lang = locale` y
 *   `document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'` en la etiqueta `<html>`
 *   para que las variantes `rtl:` de Tailwind CSS y los lectores de pantalla actúen sobre todo el DOM.
 */
export function HtmlDirSync({ locale }: { readonly locale: SupportedLocale }) {
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.lang="${locale}";document.documentElement.dir="${dir}";`,
      }}
    />
  );
}
