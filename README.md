# Costa Tour — Portal Multi-Vertical de Reservas (Fuengirola)

Plataforma de reservas de alto rendimiento para **Costa Tour** (Fuengirola, Málaga) que unifica tres verticales:
1. **Flota Náutica (`BOAT`):** Yates con patrón y barcos sin licencia.
2. **Vehículos Terrestres (`VEHICLE`):** Deportivos premium, coches y scooters.
3. **Alojamientos (`PROPERTY`):** Áticos en primera línea y villas con piscina climatizada.

---

## Estado de Ejecución de Fases

### ✅ FASE 1: Inicialización y Puente Stitch MCP (Completada)
- **Google Stitch MCP:** Proyecto conectado (`projects/12466182647634513568`) y sistema de diseño generado a partir de `DESIGN.md` (`assetId: 4be7469159e548ad8a098b670661afbf`).
- **Tokens Visuales ("Mediterranean Luxury & High-Velocity"):** Paleta estricta (`#0A1628`, `#112240`, `#F8FAFC`, `#F59E0B`, `#0EA5E9`) y tipografías `Outfit` + `Inter` (`tabular-nums`) sincronizadas en `src/app/globals.css`.
- **Arquitectura Multi-idioma (`i18n`):** Enrutamiento localizado (`/es`, `/en`, `/de`, `/fr`) con detección automática de navegador en `src/middleware.ts`, utilidades deterministas de moneda en `src/i18n/config.ts` y diccionarios tipados en `src/i18n/dictionaries.ts`.
- **Integridad Financiera y Catálogo Mock:** Contratos estrictos sin `any` en `src/types/catalog.ts` y catálogo realista de las 3 verticales en `src/data/mockCatalog.ts` con todos los importes y fianzas expresados en **céntimos enteros de Euro**.

### ✅ FASE 2: Construcción del Frontend, SEO Técnico y RGPD (Completada)
- **✅ Punto 1 — Navegación Global y Conversión Móvil (`src/components/NavbarGlobal.tsx` + `src/components/WhatsAppFloatingButton.tsx`)**
- **✅ Punto 2 — Hero Inmersivo + Buscador Unificado (`src/components/HeroInmersivo.tsx`)**
- **✅ Punto 3 — Catálogo Modular Bento Box + Filtros (`src/components/CatalogoModular.tsx`)**
- **✅ Punto 4 — Ficha de Detalle y Flujo de Reserva UI (`src/app/[lang]/catalogo/[slug]/page.tsx` + `src/components/AssetDetailBookingClient.tsx`)**
- **✅ Punto 5 — Confianza, Narrativa Local y Reseñas (`src/components/ConfianzaResenasSection.tsx`)**
- **✅ Punto 6 — Cumplimiento RGPD y Footer Local SEO (`src/components/CookieConsentBanner.tsx`, `src/components/FooterLocalSeo.tsx`, `src/app/[lang]/legal/[doc]/page.tsx`)**
- **✅ Punto 7 — SEO Técnico Global (`src/lib/seo.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`)**

### ✅ FASE 3: Estabilización y Auditoría Frontend (Completada)
- **Compilación y Tipos:** Verificación estricta `tsc --noEmit` (0 errores, 0 usos de `any`) y build de producción Next.js (`npm run build`) generando estáticamente las 44 rutas localizadas (`/es`, `/en`, `/de`, `/fr`, 24 fichas de catálogo, 16 páginas legales, `sitemap.xml` y `robots.txt`).
- **Core Web Vitals (CLS = 0):** Todas las imágenes emplean `next/image` con contenedor de relación de aspecto fija (`aspect-[16/10]` o `fill` con dimensiones acotadas y atributo `sizes`), carga diferida `loading="lazy"` en catálogo y `priority` en el Hero/ficha principal.
- **Responsive Mobile-First:** Verificada la adaptación en móvil, tablet y escritorio, incluyendo el drawer lateral ergonómico, el botón flotante de WhatsApp desplazado (`bottom-24 lg:bottom-6`) y la barra inferior fija (`sticky bottom bar`) en fichas de detalle.
- **Consistencia Multi-idioma (`ES | EN | DE | FR`):** Cambio de idioma sin pérdida de ruta activa, sincronización del `100 %` de textos desde `src/i18n/dictionaries.ts` y metadatos `hreflang` canónicos.

### ⏸️ FASE 4: PAUSA OBLIGATORIA (Activa — Esperando Definición de Backend del Usuario)
- Barrera Frontend / Backend activa conforme a `.agent/rules/governance.md`.

### ⏳ FASE 5: Backend Blindado, Pagos Stripe y Anti-Overbooking (Pendiente de aprobación)
