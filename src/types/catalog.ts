/**
 * Contratos de Tipos del Catálogo Multi-Vertical — Costa Tour
 *
 * Propósito de negocio y seguridad financiera:
 * - Unifica las 3 verticales de negocio (Vehículos, Alojamientos, Flota Náutica) bajo un
 *   contrato fuertemente tipado sin uso de `any`.
 * - Impone que todos los importes monetarios (`priceCents`, `depositCents`) sean números
 *   enteros en céntimos de euro para eliminar errores de redondeo IEEE 754 en coma flotante.
 */

/** Idiomas soportados oficialmente por la arquitectura i18n de Costa Tour (incluye Árabe RTL) */
export type SupportedLocale = 'es' | 'en' | 'de' | 'fr' | 'ar';

/** Las 3 verticales operativas de Costa Tour en Fuengirola */
export type AssetVertical = 'VEHICLE' | 'PROPERTY' | 'BOAT';

/** Unidad de tarificación según el tipo de activo */
export type BillingUnit = 'DAY' | 'NIGHT' | 'HOUR';

/** Mapa de traducción obligatoria en los 4 idiomas activos */
export type LocalizedString = Record<SupportedLocale, string>;

/** Lista de textos localizados (para highlights o características) */
export type LocalizedStringList = Record<SupportedLocale, readonly string[]>;

/**
 * Iconografía binaria rápida para las tarjetas del catálogo (PRD.md Fase 2.3).
 * Permite al turista entender en 3 segundos las condiciones clave del alquiler.
 */
export interface AssetBinarySpecs {
  /** Indica si requiere pre-autorización / retención de fianza reembolsable */
  readonly depositRequired: boolean;
  /** Combustible lleno/incluido (vehículos/barcos) o limpieza final incluida (viviendas) */
  readonly fuelOrCleaningIncluded: boolean;
  /** Patrón incluido / Sin licencia requerida (barcos) o Seguro básico incluido (vehículos) */
  readonly licenseOrSkipperIncluded: boolean;
  /** Cancelación gratuita hasta 48h antes del check-in */
  readonly flexibleCancellation: boolean;
}

/**
 * Extras opcionales de upselling configurables durante el flujo de reserva (PRD.md Fase 2.4).
 */
export interface AssetExtraOption {
  readonly id: string;
  readonly label: LocalizedString;
  readonly description: LocalizedString;
  /** Precio en céntimos enteros de Euro (ej. 3500 = 35,00 €) */
  readonly priceCents: number;
  readonly chargeMode: 'PER_UNIT' | 'FLAT_FEE';
}

/**
 * Especificaciones técnicas adicionales según la vertical del activo.
 */
export interface AssetTechnicalMetadata {
  /** Transmisión o motorización (ej. "Automático · Híbrido", "2x 300 CV Yamaha", "Fibra 1 Gbps · A/C") */
  readonly propulsionOrAmenity: LocalizedString;
  /** Ubicación exacta de recogida o estancia en Fuengirola */
  readonly pickupOrZone: LocalizedString;
  /** Requisito de licencia o edad mínima */
  readonly requirementBadge: LocalizedString;
}

/**
 * Entidad principal del catálogo de Costa Tour.
 */
export interface CatalogAsset {
  readonly id: string;
  /** Slug amigable para SEO y URLs canonizadas */
  readonly slug: string;
  readonly vertical: AssetVertical;
  /** Define si el activo ocupa una posición destacada en la cuadrícula asimétrica Bento Box */
  readonly featuredInBento: boolean;
  readonly bentoRole?: 'HERO_LARGE' | 'WIDE_HORIZONTAL' | 'TALL_VERTICAL';
  readonly title: LocalizedString;
  readonly subtitle: LocalizedString;
  readonly description: LocalizedString;
  /** Capacidad máxima de pasajeros (vehículos/barcos) o huéspedes (alojamientos) */
  readonly capacity: number;
  /** Tarifa base en céntimos enteros de Euro (ej. 12000 = 120,00 €) */
  readonly priceCents: number;
  readonly billingUnit: BillingUnit;
  /**
   * Importe de la fianza en céntimos enteros de Euro (ej. 50000 = 500,00 €).
   * Se retiene mediante pre-autorización en Fase 5, pero se desglosa con transparencia en UI.
   */
  readonly depositCents: number;
  /** Calificación media verificada (ej. 4.9) */
  readonly rating: number;
  readonly reviewCount: number;
  /** URL de imagen principal optimizada para next/image */
  readonly mainImage: string;
  readonly galleryImages: readonly string[];
  /** Texto alternativo descriptivo por idioma para accesibilidad AA/AAA y SEO Images */
  readonly imageAlt: LocalizedString;
  readonly binarySpecs: AssetBinarySpecs;
  readonly technicalMetadata: AssetTechnicalMetadata;
  readonly highlights: LocalizedStringList;
  readonly extras: readonly AssetExtraOption[];
  /** Fechas bloqueadas en formato ISO YYYY-MM-DD para simulación visual del calendario */
  readonly simulatedBlockedDates: readonly string[];
}
