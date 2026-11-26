import { CatalogoModular } from '@/components/CatalogoModular';
import { ConfianzaResenasSection } from '@/components/ConfianzaResenasSection';
import { HeroInmersivo } from '@/components/HeroInmersivo';
import { MOCK_CATALOG } from '@/data/mockCatalog';
import { DEFAULT_LOCALE, isValidLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import type { SupportedLocale } from '@/types/catalog';

/**
 * Página Principal Localizada (`/[lang]`) — Fase 2 Completa
 *
 * Propósito de negocio:
 * - Ensambla la experiencia completa de conversión del portal Costa Tour Fuengirola:
 *   1. Hero Inmersivo con Vídeo HD y Buscador Unificado estilo Airbnb.
 *   2. Catálogo Modular con Cuadrícula Asimétrica Bento Box y Filtrado en Tiempo Real.
 *   3. Sección "Por qué Costa Tour", Reseñas Verificadas de Google y Sellos 3D Secure.
 */
export default async function LocalizedHomePage({
  params,
}: {
  readonly params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: SupportedLocale = isValidLocale(lang) ? lang : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <HeroInmersivo
        locale={locale}
        dict={dict.hero}
        guestsUnitLabel={dict.catalog.guestsUnit}
      />

      <CatalogoModular
        locale={locale}
        assets={MOCK_CATALOG}
        dict={dict.catalog}
        searchTabsDict={dict.hero.searchTabs}
      />

      <ConfianzaResenasSection dict={dict.trustSection} />
    </main>
  );
}
