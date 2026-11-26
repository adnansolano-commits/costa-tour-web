# PRD.md — Arquitectura Funcional y Técnica de Costa Tour

## 1. Resumen del Proyecto

Portal de reservas multi-vertical de nueva generación para **Costa Tour** (Fuengirola, Málaga, España).
Verticales de alquiler gestionadas desde una sola plataforma unificada:

1. **Vehículos terrestres:** Coches, motos, scooters y vehículos premium.
2. **Alojamientos:** Pisos, apartamentos turísticos y casas/villas.
3. **Flota náutica y experiencias:** Barcos sin licencia, yates con patrón y excursiones marítimas.

---

## 2. Hoja de Ruta por Fases

### FASE 1: Inicialización y Puente Stitch MCP

- Inicializar proyecto Next.js (App Router) + TypeScript + Tailwind CSS.
- Verificar conexión con **Google Stitch MCP** y sincronizar los tokens de `DESIGN.md` en la configuración de Tailwind y variables CSS globales (`globals.css`).
- Configurar arquitectura multi-idioma (`next-intl` o middleware i18n nativo) con rutas localizadas: `/es`, `/en`, `/de`, `/fr`, `/ar` (con soporte completo RTL Right-to-Left y diccionario `src/messages/ar.json`) y detección automática por navegador.
- Crear estructura de datos tipados (`src/types/catalog.ts`) y catálogo mock realista (`src/data/mockCatalog.ts`) con precios en céntimos enteros para validar el Frontend antes de conectar la base de datos.

### FASE 2: Construcción del Frontend, SEO Técnico y RGPD

Extraer y ensamblar componentes puros de React en este orden:

1. **Navegación Global y Conversión Móvil:**
   - Navbar transparente en la parte superior que pasa a _glassmorphism sticky_ al hacer scroll.
   - Enlaces a las 3 verticales, selector de idioma (`ES | EN | DE | FR | AR`) y CTA principal.
   - Menú hamburguesa responsive y botón flotante persistente de WhatsApp.
2. **Sección Hero Inmersiva + Buscador Unificado:**
   - Contenedor con vídeo HD asíncrono en bucle (con poster optimizado y gradiente oscuro de contraste).
   - Propuesta de valor directa + insignia de calificación verificada de Google.
   - **Buscador central estilo Airbnb:** Pestañas por vertical (_Vehículos / Pisos y Casas / Náutica_), selector de fechas (entrada/salida u horas), selector de pasajeros/huéspedes y botón de búsqueda inmediata.
3. **Catálogo Modular (Diseño Bento Box + Filtros):**
   - Sección destacada en cuadrícula asimétrica _Bento Box_ presentando las 3 verticales con acceso rápido.
   - Listado filtrable con tarjetas optimizadas (_lazy loading_): foto principal, precio transparente por tramo, capacidad e iconografía binaria clara (fianza requerida, combustible/limpieza incluida, licencia/patrón, cancelación flexible).
4. **Ficha de Detalle y Flujo de Reserva (UI):**
   - Galería multimedia envolvente con vista ampliada.
   - Calendario interactivo de disponibilidad (conectado inicialmente a fechas simuladas).
   - Calculadora instantánea de precio total + desglose transparente de **retención de fianza**.
   - Extras opcionales (_upselling_: seguro a todo riesgo, entrega en aeropuerto/hotel, equipo snorkel).
   - Flujo de checkout paso a paso con checkboxes obligatorios de **Términos y Condiciones** y **Política de Privacidad (RGPD)**.
5. **Confianza, Narrativa Local y Reseñas:**
   - Sección "Por qué Costa Tour" con foco en operativa real en Fuengirola y soporte multilingüe.
   - Carrusel de reseñas verificadas de Google y sellos de pago seguro 3D Secure.
6. **Cumplimiento RGPD y Footer Local SEO:**
   - Banner de cookies explícito (Aceptar todas / Rechazar no esenciales / Configurar) con persistencia de consentimiento.
   - Footer denso en señales locales NAP (Nombre comercial, dirección exacta en Fuengirola, teléfono, WhatsApp, horarios, mapa interactivo y enlaces legales: Aviso Legal, Privacidad, Cookies, Condiciones de Alquiler).
7. **SEO Técnico Global (Obligatorio en todas las rutas):**
   - `generateMetadata` dinámico por idioma y ficha (Title máximo 60 caracteres, Meta Description máximo 155 caracteres).
   - Etiquetas `canonical`, `alternates.languages` (`hreflang` para ES/EN/DE/FR/AR) y Open Graph completo.
   - Datos estructurados **JSON-LD**: `LocalBusiness` en layout raíz, y esquemas específicos (`AutoRental`, `LodgingBusiness`, `Product` + `Offer`) en las páginas de detalle.
   - Generación dinámica de `sitemap.ts` y `robots.ts`.

### FASE 3: Estabilización y Auditoría Frontend

- Verificar compilación sin errores de TypeScript (`tsc --noEmit`) ni warnings de build.
- Comprobar rendimiento responsive en móvil, tablet y escritorio, _lazy loading_ y CLS = 0.
- Revisar que el cambio de idioma actualiza textos, rutas y metadatos sin romper el diseño.

### FASE 4: PAUSA OBLIGATORIA (Consulta de Backend)

- Al terminar la Fase 3, detener toda generación de código y mostrar exactamente la pregunta de transición para definir el Backend con los datos reales del propietario.

### FASE 5: Backend Blindado, Pagos Stripe y Anti-Overbooking (SOLO tras aprobación)

1. **Base de Datos Relacional (PostgreSQL + Prisma/Drizzle):**
   - Modelos: `User`, `Asset` (discriminado por vertical: `VEHICLE`, `PROPERTY`, `BOAT`), `AssetTranslation`, `Booking`, `Payment`, `SecurityDeposit`, `CalendarBlock`, `IcalFeed`.
2. **Autenticación y Protección Activa:**
   - Login/registro seguro para clientes y panel de administración con JWT en cookies `httpOnly`, `bcrypt` (12+ rondas) y _rate limiting_ en endpoints críticos.
3. **Pasarela de Pago Stripe Antifraude + Fianzas:**
   - Checkout con autenticación reforzada **3D Secure (SCA)** obligatoria en Europa.
   - Gestión de **pre-autorización / retención de fianza** (`capture_method: 'manual'`) desacoplada del cobro del alquiler, con liberación automática o captura parcial por daños desde el panel admin.
   - Verificación criptográfica de webhooks de Stripe.
4. **Motor de Disponibilidad Bidireccional (Anti-Overbooking):**
   - Bloqueo transaccional atómico de fechas al reservar.
   - Importador/exportador **iCal (`.ics`)** para sincronizar automáticamente calendarios de viviendas y vehículos con Airbnb, Booking u otras plataformas externas.
