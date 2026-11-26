# DESIGN.md — Sistema de Diseño Costa Tour (Google Stitch MCP)

## 1. Dirección Estética ("Mediterranean Luxury & High-Velocity")

- **Concepto:** Portal de reservas multi-vertical contemporáneo, inmersivo y de alto contraste. Debe transmitir solvencia, exclusividad mediterránea y rapidez de reserva en 3 segundos.
- **Qué evitar:** Plantillas genéricas de agencia, carruseles lentos con bordes duros, bloques infinitos de texto plano o estética corporativa anticuada.
- **Firma visual:** Espacios amplios, tarjetas con profundidad sutil, efecto cristal esmerilado (_glassmorphism_) en la barra de navegación y el buscador del Hero, cuadrícula asimétrica tipo _Bento Box_ y micro-interacciones suaves al interactuar.

## 2. Paleta Cromática Estricta

- **Base Oscura Principal (Hero, Navbar Scrolled, Footer):** `#0A1628` (Azul Noche Mediterráneo)
- **Superficie Oscura Elevada (Tarjetas Dark / Modales):** `#112240` (Pizarra Náutica)
- **Lienzo Claro Principal (Catálogo y lectura):** `#F8FAFC` (Blanco Costa)
- **Superficie de Tarjeta Clara:** `#FFFFFF` con borde sutil `rgba(15, 23, 42, 0.08)`
- **Acento de Conversión (CTAs principales, botón Reservar, filtros activos):** `#F59E0B` (Ámbar Solar) | Hover: `#D97706`
- **Acento Secundario (Etiquetas náuticas, badges de disponibilidad):** `#0EA5E9` (Cian Mediterráneo)
- **Tipografía sobre claro:** `#0F172A` (Principal) | `#475569` (Secundaria)
- **Tipografía sobre oscuro:** `#F8FAFC` (Principal) | `#94A3B8` (Secundaria)
- **Estados semánticos:** Éxito/Disponible `#10B981` | Alerta/Fianza `#F59E0B` | Error/Ocupado `#EF4444`

## 3. Tipografía y Jerarquía

- **Titulares y Display (`font-display`):** `Outfit` (pesos 600, 700, 800; tracking ajustado `-0.03em`).
- **Interfaz, cuerpo y precios (`font-sans`):** `Inter` (pesos 400, 500, 600).
- **Regla numérica:** Aplicar `tabular-nums` en todos los precios, fechas, contadores de pasajeros y desgloses de fianza para evitar saltos visuales.
- **Escala responsive:**
  - `H1 Hero`: `clamp(2.5rem, 5vw, 4.5rem)` | line-height `1.05`
  - `H2 Sección`: `clamp(1.75rem, 3vw, 2.75rem)` | line-height `1.15`
  - `Cuerpo`: `1rem` (16px) | line-height `1.6`

## 4. Geometría, Espaciado y Efectos

- **Sistema de cuadrícula:** Base 8px, contenedor máximo `1440px` (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`).
- **Radios de borde:** Tarjetas grandes y Bento `rounded-3xl` (`24px`); inputs y tarjetas estándar `rounded-2xl` (`16px`); botones y pills `rounded-full` o `rounded-xl`.
- **Glassmorphism:** `backdrop-blur-md bg-[#0A1628]/75 border border-white/15` para navbar _sticky_ y barra de búsqueda flotante sobre vídeo.
- **Micro-interacciones:** Transiciones de `300ms ease-out`, zoom suave en imagen de tarjeta (`group-hover:scale-105`), elevación sutil de sombra al pasar el cursor.

## 5. Patrones Mobile-First Obligatorios

- Diseñar pensando en el turista reservando con una sola mano desde el móvil en Fuengirola.
- Menú superior compacto con _drawer_ lateral limpio en móvil.
- Botón flotante persistente de **WhatsApp** en esquina inferior derecha (sin tapar botones de reserva).
- En páginas de detalle de vehículo, vivienda o barco: barra inferior fija (_sticky bottom bar_) con precio por día/hora y botón directo **Reservar**.
