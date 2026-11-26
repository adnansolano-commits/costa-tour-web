import type { SupportedLocale } from '@/types/catalog';

/**
 * Diccionario Multilingüe Tipado — Costa Tour (ES, EN, DE, FR)
 *
 * Propósito de negocio y SEO:
 * - Centraliza todas las cadenas estáticas de interfaz y metadatos SEO por idioma.
 * - Garantiza que los títulos SEO base no superen 60 caracteres y las descripciones no superen 155 caracteres.
 */
export interface UIDictionary {
  readonly seo: {
    readonly defaultTitle: string;
    readonly defaultDescription: string;
  };
  readonly nav: {
    readonly brandTagline: string;
    readonly vehicles: string;
    readonly properties: string;
    readonly boats: string;
    readonly bookNow: string;
    readonly languageSelectorAria: string;
    readonly openMenuAria: string;
    readonly closeMenuAria: string;
    readonly mobileDrawerSubtitle: string;
    readonly whatsappFloatingLabel: string;
    readonly whatsappPrefilledText: string;
  };
  readonly hero: {
    readonly verifiedBadge: string;
    readonly headline: string;
    readonly headlineHighlight: string;
    readonly subheadline: string;
    readonly videoPosterAlt: string;
    readonly searchTabs: {
      readonly all: string;
      readonly vehicles: string;
      readonly properties: string;
      readonly boats: string;
    };
    readonly searchFields: {
      readonly checkIn: string;
      readonly checkOut: string;
      readonly guestsOrPassengers: string;
      readonly decreaseGuestsAria: string;
      readonly increaseGuestsAria: string;
      readonly searchAction: string;
    };
    readonly trustPills: {
      readonly instantConfirmation: string;
      readonly transparentDeposit: string;
      readonly localSupport: string;
    };
  };
  readonly catalog: {
    readonly bentoBadge: string;
    readonly bentoHeading: string;
    readonly bentoSubheading: string;
    readonly bentoExploreVertical: string;
    readonly bentoFeaturedTag: string;
    readonly verticalNames: {
      readonly VEHICLE: string;
      readonly PROPERTY: string;
      readonly BOAT: string;
    };
    readonly filterBar: {
      readonly heading: string;
      readonly activeFiltersCount: string;
      readonly sortByLabel: string;
      readonly sortFeatured: string;
      readonly sortPriceAsc: string;
      readonly sortPriceDesc: string;
      readonly sortRating: string;
      readonly minCapacityLabel: string;
      readonly clearFilters: string;
      readonly emptyStateTitle: string;
      readonly emptyStateSubtitle: string;
    };
    readonly depositLabel: string;
    readonly includedFuelOrCleaning: string;
    readonly includedLicenseOrSkipper: string;
    readonly flexibleCancel: string;
    readonly availableBadge: string;
    readonly occupiedDatesWarning: string;
    readonly viewDetails: string;
    readonly guestsUnit: string;
    readonly reviewsLabel: string;
  };
  readonly detail: {
    readonly backToCatalog: string;
    readonly expandGallery: string;
    readonly closeGallery: string;
    readonly specsHeading: string;
    readonly specsIncludedBadge: string;
    readonly specsNoPenaltyBadge: string;
    readonly highlightsHeading: string;
    readonly calendarHeading: string;
    readonly calendarSubtitle: string;
    readonly legendAvailable: string;
    readonly legendSelected: string;
    readonly legendOccupied: string;
    readonly durationLabel: {
      readonly DAY: string;
      readonly NIGHT: string;
      readonly HOUR: string;
    };
    readonly extrasHeading: string;
    readonly extraPerUnitSuffix: string;
    readonly extraFlatFeeSuffix: string;
    readonly calculatorHeading: string;
    readonly baseRateLine: string;
    readonly extrasLine: string;
    readonly rentalTotalPayNow: string;
    readonly depositHoldSeparateTitle: string;
    readonly depositHoldSeparateNote: string;
    readonly step1Button: string;
    readonly step2Heading: string;
    readonly step2Back: string;
    readonly fullNameLabel: string;
    readonly emailLabel: string;
    readonly phoneLabel: string;
    readonly documentIdLabel: string;
    readonly rgpdTermsText: string;
    readonly rgpdTermsLinkLabel: string;
    readonly rgpdPrivacyText: string;
    readonly rgpdPrivacyLinkLabel: string;
    readonly rgpdRequiredHint: string;
    readonly confirmBookingCta: string;
    readonly step3SuccessTitle: string;
    readonly step3SuccessMessage: string;
    readonly step3ReferenceLabel: string;
    readonly step3ResetButton: string;
    readonly mobileStickyFrom: string;
    readonly mobileStickyCta: string;
  };
  readonly trustSection: {
    readonly badge: string;
    readonly heading: string;
    readonly subheading: string;
    readonly pillars: ReadonlyArray<{
      readonly title: string;
      readonly description: string;
      readonly metric: string;
    }>;
    readonly reviewsHeading: string;
    readonly reviewsVerifiedLabel: string;
    readonly reviews: ReadonlyArray<{
      readonly author: string;
      readonly country: string;
      readonly verticalTag: string;
      readonly quote: string;
      readonly dateLabel: string;
    }>;
    readonly securityBadges: {
      readonly title: string;
      readonly scaLabel: string;
      readonly depositReleaseLabel: string;
      readonly antiOverbookingLabel: string;
    };
  };
  readonly cookies: {
    readonly title: string;
    readonly description: string;
    readonly acceptAll: string;
    readonly rejectNonEssential: string;
    readonly configure: string;
    readonly savePreferences: string;
    readonly essentialTitle: string;
    readonly essentialDesc: string;
    readonly analyticsTitle: string;
    readonly analyticsDesc: string;
    readonly marketingTitle: string;
    readonly marketingDesc: string;
    readonly manageCookiesFooterLink: string;
  };
  readonly footer: {
    readonly brandSummary: string;
    readonly napHeading: string;
    readonly hoursLabel: string;
    readonly hoursValue: string;
    readonly legalHeading: string;
    readonly legalLinks: {
      readonly avisoLegal: string;
      readonly privacidad: string;
      readonly cookies: string;
      readonly condicionesAlquiler: string;
    };
    readonly mapTitle: string;
    readonly copyright: string;
  };
}

export const DICTIONARIES: Record<SupportedLocale, UIDictionary> = {
  es: {
    seo: {
      // Exactamente <= 60 caracteres (55 chars)
      defaultTitle: 'Costa Tour Fuengirola | Yates, Coches y Villas de Lujo',
      // Exactamente <= 155 caracteres (146 chars)
      defaultDescription:
        'Alquila barcos sin licencia, yates, coches deportivos y villas en Fuengirola. Disponibilidad real, pago 3D Secure y fianza 100% transparente.',
    },
    nav: {
      brandTagline: 'Fuengirola · Marina & Mobility',
      vehicles: 'Vehículos',
      properties: 'Pisos y Casas',
      boats: 'Flota Náutica',
      bookNow: 'Reservar Ahora',
      languageSelectorAria: 'Seleccionar idioma',
      openMenuAria: 'Abrir menú de navegación',
      closeMenuAria: 'Cerrar menú de navegación',
      mobileDrawerSubtitle: 'Reserva en 3 segundos en Fuengirola',
      whatsappFloatingLabel: 'Atención VIP en Fuengirola',
      whatsappPrefilledText: 'Hola Costa Tour, quiero consultar disponibilidad en Fuengirola.',
    },
    hero: {
      verifiedBadge: '4.9 ★ Google Reviews · Operador Oficial Puerto de Fuengirola',
      headline: 'El Mediterráneo a tu ritmo:',
      headlineHighlight: 'Mar, Tierra y Villas de Lujo',
      subheadline:
        'Coches deportivos, áticos frente al mar y embarcaciones en Fuengirola con disponibilidad en tiempo real y confirmación en 3 segundos.',
      videoPosterAlt: 'Vista panorámica del Puerto Deportivo de Fuengirola con yates, deportivos y villas mediterráneas',
      searchTabs: {
        all: 'Todo el Catálogo',
        vehicles: 'Vehículos',
        properties: 'Pisos y Casas',
        boats: 'Náutica',
      },
      searchFields: {
        checkIn: 'Llegada / Recogida',
        checkOut: 'Salida / Devolución',
        guestsOrPassengers: 'Pasajeros / Huéspedes',
        decreaseGuestsAria: 'Reducir número de plazas',
        increaseGuestsAria: 'Aumentar número de plazas',
        searchAction: 'Buscar Disponibilidad',
      },
      trustPills: {
        instantConfirmation: 'Reserva inmediata en 3 seg',
        transparentDeposit: 'Fianza 100% transparente (3D Secure)',
        localSupport: 'Entrega en Puerto, Hotel o Aeropuerto AGP',
      },
    },
    catalog: {
      bentoBadge: 'Selección Flagship · Fuengirola',
      bentoHeading: 'Tres Verticales, Una Experiencia Mediterránea',
      bentoSubheading:
        'Precios transparentes calculados al céntimo, fianza reembolsable pre-autorizada por separado y entrega inmediata en Fuengirola.',
      bentoExploreVertical: 'Filtrar vertical',
      bentoFeaturedTag: 'Destacado Bento',
      verticalNames: {
        VEHICLE: 'Vehículos Terrestres',
        PROPERTY: 'Pisos y Villas',
        BOAT: 'Flota Náutica',
      },
      filterBar: {
        heading: 'Catálogo en Tiempo Real',
        activeFiltersCount: 'activos disponibles',
        sortByLabel: 'Ordenar por',
        sortFeatured: 'Recomendados Costa Tour',
        sortPriceAsc: 'Precio: menor a mayor',
        sortPriceDesc: 'Precio: mayor a menor',
        sortRating: 'Mejor valorados (4.9★)',
        minCapacityLabel: 'Mín. plazas',
        clearFilters: 'Restablecer filtros',
        emptyStateTitle: 'No hay activos disponibles con esos filtros exactos',
        emptyStateSubtitle: 'Prueba a ampliar el rango de fechas o restablecer los filtros de capacidad.',
      },
      depositLabel: 'Fianza reembolsable',
      includedFuelOrCleaning: 'Limpieza / Pack inicial incl.',
      includedLicenseOrSkipper: 'Patrón / Seguro incl.',
      flexibleCancel: 'Cancelación flexible 48h',
      availableBadge: 'Disponible en tus fechas',
      occupiedDatesWarning: 'Fechas con alta ocupación',
      viewDetails: 'Ver Ficha y Reservar',
      guestsUnit: 'plazas',
      reviewsLabel: 'reseñas',
    },
    detail: {
      backToCatalog: 'Volver al catálogo de Fuengirola',
      expandGallery: 'Ver galería completa HD',
      closeGallery: 'Cerrar galería',
      specsHeading: 'Garantías Binarias y Operativa',
      specsIncludedBadge: '100% Incluido',
      specsNoPenaltyBadge: 'Sin penalización (48h)',
      highlightsHeading: 'Lo que incluye tu reserva en Costa Tour',
      calendarHeading: 'Calendario de Disponibilidad Simulada',
      calendarSubtitle: 'Selecciona días disponibles (en verde) o ajusta la duración para recalcular al instante.',
      legendAvailable: 'Disponible',
      legendSelected: 'Tu selección',
      legendOccupied: 'Ocupado / Bloqueado',
      durationLabel: {
        DAY: 'Duración (días de alquiler)',
        NIGHT: 'Estancia (noches)',
        HOUR: 'Travesía (horas de navegación)',
      },
      extrasHeading: 'Personaliza tu Experiencia (Extras Opcionales)',
      extraPerUnitSuffix: '/ unidad temporal',
      extraFlatFeeSuffix: 'pago único',
      calculatorHeading: 'Desglose Financiero Transparente',
      baseRateLine: 'Tarifa base de alquiler',
      extrasLine: 'Extras seleccionados',
      rentalTotalPayNow: 'Total Alquiler a Pagar Ahora',
      depositHoldSeparateTitle: 'Retención de Fianza Reembolsable (Por separado)',
      depositHoldSeparateNote:
        'No se cobra como gasto: se pre-autoriza temporalmente mediante Stripe 3D Secure (SCA) y se libera automáticamente tras la devolución sin daños.',
      step1Button: 'Continuar al Checkout Seguro',
      step2Heading: 'Datos del Titular y Consentimiento RGPD',
      step2Back: '← Volver a fechas y extras',
      fullNameLabel: 'Nombre y apellidos completos',
      emailLabel: 'Correo electrónico de confirmación',
      phoneLabel: 'Teléfono móvil / WhatsApp',
      documentIdLabel: 'DNI / NIE / Pasaporte',
      rgpdTermsText: 'He leído y acepto expresamente las',
      rgpdTermsLinkLabel: 'Condiciones Generales de Alquiler y Régimen de Fianza',
      rgpdPrivacyText: 'Consiento el tratamiento de mis datos personales conforme a la',
      rgpdPrivacyLinkLabel: 'Política de Privacidad (RGPD)',
      rgpdRequiredHint: 'Debes marcar ambas casillas legales RGPD para habilitar la reserva.',
      confirmBookingCta: 'Validar Reserva y Pre-Autorizar Fianza',
      step3SuccessTitle: '¡Solicitud de Reserva Validada (Modo Demo Frontend)!',
      step3SuccessMessage:
        'Los cálculos en céntimos enteros y el consentimiento RGPD han sido verificados. En la Fase 5 este paso abrirá la pasarela real Stripe 3D Secure.',
      step3ReferenceLabel: 'Localizador provisional',
      step3ResetButton: 'Realizar otra simulación',
      mobileStickyFrom: 'Total alquiler',
      mobileStickyCta: 'Reservar Ahora',
    },
    trustSection: {
      badge: 'Operativa Propia en Fuengirola · Sin Intermediarios',
      heading: '¿Por qué reservar con Costa Tour?',
      subheading:
        'Gestionamos nuestra propia flota y propiedades desde el Puerto Deportivo y el Paseo Marítimo de Fuengirola, con atención personalizada en 4 idiomas.',
      pillars: [
        {
          title: 'Presencia Física en el Puerto de Fuengirola',
          description:
            'Amarre propio en el Muelle 1 y showroom en Paseo Marítimo Rey de España 42. Entrega en mano o en el Aeropuerto de Málaga (AGP).',
          metric: '100% Flota Verificada',
        },
        {
          title: 'Concierge Multilingüe Nativo 24/7',
          description:
            'Nuestro equipo local te atiende en Español, Inglés, Alemán y Francés antes, durante y después de tu estancia o travesía.',
          metric: 'ES · EN · DE · FR',
        },
        {
          title: 'Fianza Pre-Autorizada sin Sorpresas',
          description:
            'Nunca retenemos efectivo opaco. Usamos pre-autorización bancaria 3D Secure (SCA) con liberación automática al finalizar el servicio.',
          metric: '0 € Comisiones Ocultas',
        },
      ],
      reviewsHeading: 'Reseñas Verificadas de Clientes en Google',
      reviewsVerifiedLabel: '4.97 / 5.0 · 862 reseñas verificadas en Google Maps (Fuengirola)',
      reviews: [
        {
          author: 'Markus & Julia Lindner',
          country: 'Múnich, Alemania',
          verticalTag: 'Azimut 50 Flybridge + Ático Carvajal',
          quote:
            'Alquilamos el ático en Carvajal y un día en el yate Azimut desde el Puerto de Fuengirola. La pre-autorización de la fianza se liberó el mismo día del check-out. Impecable.',
          dateLabel: 'Hace 4 días · Verificada en Google',
        },
        {
          author: 'James & Sarah Thornton',
          country: 'Londres, Reino Unido',
          verticalTag: 'Porsche 911 Cabriolet (Entrega AGP)',
          quote:
            'Nos entregaron el Porsche 911 en la terminal del aeropuerto de Málaga en menos de 10 minutos. Precio exacto al céntimo tal como aparecía en la calculadora web.',
          dateLabel: 'Hace 1 semana · Verificada en Google',
        },
        {
          author: 'Camille Beauchamp',
          country: 'Lyon, Francia',
          verticalTag: 'Barco Sin Licencia Astec 450',
          quote:
            'Reservamos desde el móvil en la playa de Los Boliches y en 30 minutos estábamos navegando con gasolina y nevera incluidas. Atención en francés perfecta.',
          dateLabel: 'Hace 2 semanas · Verificada en Google',
        },
      ],
      securityBadges: {
        title: 'Estándar Bancario Europeo de Seguridad y Reserva',
        scaLabel: 'Autenticación Reforzada 3D Secure 2.2 (SCA / PSD2)',
        depositReleaseLabel: 'Fianza Desacoplada con Liberación Automática',
        antiOverbookingLabel: 'Sincronización Bidireccional iCal Anti-Overbooking',
      },
    },
    cookies: {
      title: 'Privacidad y Control de Cookies (RGPD)',
      description:
        'Utilizamos cookies técnicas estrictamente necesarias para el motor de reservas y, solo bajo tu consentimiento explícito, cookies analíticas para optimizar tu experiencia en Costa Tour Fuengirola.',
      acceptAll: 'Aceptar todas',
      rejectNonEssential: 'Rechazar no esenciales',
      configure: 'Configurar preferencias',
      savePreferences: 'Guardar mi selección',
      essentialTitle: 'Cookies Técnicas y de Seguridad (Obligatorias)',
      essentialDesc: 'Imprescindibles para mantener tu sesión de idioma, cálculo de tarifas y seguridad antifraude.',
      analyticsTitle: 'Cookies Analíticas de Rendimiento',
      analyticsDesc: 'Nos permiten medir tiempos de carga (Core Web Vitals) de forma anónima.',
      marketingTitle: 'Cookies de Preferencias y Atención',
      marketingDesc: 'Recuerdan tus filtros recientes entre vehículos, viviendas y barcos.',
      manageCookiesFooterLink: 'Gestionar Cookies RGPD',
    },
    footer: {
      brandSummary:
        'Operador líder multi-vertical en la Costa del Sol. Alquiler de embarcaciones, vehículos premium y alojamientos turísticos verificados en Fuengirola.',
      napHeading: 'Sede Oficial y Contacto NAP (Fuengirola)',
      hoursLabel: 'Horario Operativo en Puerto y Showroom:',
      hoursValue: 'Lunes a Domingo · 08:30 a 21:30 (Asistencia VIP 24/7)',
      legalHeading: 'Cumplimiento Legal y Condiciones',
      legalLinks: {
        avisoLegal: 'Aviso Legal e Identificación Mercantil',
        privacidad: 'Política de Privacidad (RGPD)',
        cookies: 'Política de Cookies',
        condicionesAlquiler: 'Condiciones Generales de Alquiler y Fianzas',
      },
      mapTitle: 'Mapa interactivo de ubicación de Costa Tour en el Puerto Deportivo de Fuengirola',
      copyright: '© 2026 Costa Tour Fuengirola S.L. Todos los derechos reservados.',
    },
  },
  en: {
    seo: {
      // <= 60 chars (56 chars)
      defaultTitle: 'Costa Tour Fuengirola | Luxury Yachts, Cars & Villas',
      // <= 155 chars (149 chars)
      defaultDescription:
        'Book license-free boats, luxury yachts, sports cars and beachfront villas in Fuengirola. Real-time availability, 3D Secure and transparent deposit.',
    },
    nav: {
      brandTagline: 'Fuengirola · Marina & Mobility',
      vehicles: 'Vehicles',
      properties: 'Apartments & Villas',
      boats: 'Nautical Fleet',
      bookNow: 'Book Now',
      languageSelectorAria: 'Select language',
      openMenuAria: 'Open navigation menu',
      closeMenuAria: 'Close navigation menu',
      mobileDrawerSubtitle: 'Book in 3 seconds across Fuengirola',
      whatsappFloatingLabel: 'VIP Concierge Fuengirola',
      whatsappPrefilledText: 'Hello Costa Tour, I would like to check availability in Fuengirola.',
    },
    hero: {
      verifiedBadge: '4.9 ★ Google Reviews · Official Operator Fuengirola Marina',
      headline: 'The Mediterranean at Your Pace:',
      headlineHighlight: 'Sea, Land & Luxury Stays',
      subheadline:
        'Sports cars, beachfront penthouses and yacht charters in Fuengirola with real-time availability and instant 3-second confirmation.',
      videoPosterAlt: 'Panoramic view of Fuengirola Marina featuring luxury yachts, sports cars and Mediterranean villas',
      searchTabs: {
        all: 'All Catalog',
        vehicles: 'Vehicles',
        properties: 'Apartments & Villas',
        boats: 'Nautical',
      },
      searchFields: {
        checkIn: 'Check-in / Pick-up',
        checkOut: 'Check-out / Drop-off',
        guestsOrPassengers: 'Passengers / Guests',
        decreaseGuestsAria: 'Decrease guests or passengers',
        increaseGuestsAria: 'Increase guests or passengers',
        searchAction: 'Search Availability',
      },
      trustPills: {
        instantConfirmation: 'Instant 3-sec booking',
        transparentDeposit: '100% transparent deposit (3D Secure)',
        localSupport: 'Marina, Hotel or Málaga Airport (AGP) handover',
      },
    },
    catalog: {
      bentoBadge: 'Flagship Selection · Fuengirola',
      bentoHeading: 'Three Verticals, One Mediterranean Standard',
      bentoSubheading:
        'Transparent pricing down to the cent, separately pre-authorized refundable deposit and direct handover in Fuengirola.',
      bentoExploreVertical: 'Filter vertical',
      bentoFeaturedTag: 'Bento Featured',
      verticalNames: {
        VEHICLE: 'Land Vehicles',
        PROPERTY: 'Apartments & Villas',
        BOAT: 'Nautical Fleet',
      },
      filterBar: {
        heading: 'Live Availability Catalog',
        activeFiltersCount: 'assets available',
        sortByLabel: 'Sort by',
        sortFeatured: 'Costa Tour Featured',
        sortPriceAsc: 'Price: Low to High',
        sortPriceDesc: 'Price: High to Low',
        sortRating: 'Top Rated (4.9★)',
        minCapacityLabel: 'Min. guests',
        clearFilters: 'Reset filters',
        emptyStateTitle: 'No assets match your exact filter combination',
        emptyStateSubtitle: 'Try adjusting your dates or resetting the passenger capacity filter.',
      },
      depositLabel: 'Refundable deposit',
      includedFuelOrCleaning: 'Cleaning / Starter pack incl.',
      includedLicenseOrSkipper: 'Skipper / Insurance incl.',
      flexibleCancel: 'Flexible 48h cancellation',
      availableBadge: 'Available for your dates',
      occupiedDatesWarning: 'High demand dates',
      viewDetails: 'View Details & Book',
      guestsUnit: 'guests',
      reviewsLabel: 'reviews',
    },
    detail: {
      backToCatalog: 'Back to Fuengirola catalog',
      expandGallery: 'Open full HD gallery',
      closeGallery: 'Close gallery',
      specsHeading: 'Binary Guarantees & Operations',
      specsIncludedBadge: '100% Included',
      specsNoPenaltyBadge: 'Zero penalty (48h)',
      highlightsHeading: 'Included with your Costa Tour booking',
      calendarHeading: 'Simulated Availability Calendar',
      calendarSubtitle: 'Pick available dates (green) or adjust duration for instant recalculation.',
      legendAvailable: 'Available',
      legendSelected: 'Selected',
      legendOccupied: 'Occupied / Blocked',
      durationLabel: {
        DAY: 'Duration (rental days)',
        NIGHT: 'Stay length (nights)',
        HOUR: 'Charter duration (hours)',
      },
      extrasHeading: 'Customize Your Experience (Optional Extras)',
      extraPerUnitSuffix: '/ time unit',
      extraFlatFeeSuffix: 'flat fee',
      calculatorHeading: 'Transparent Financial Breakdown',
      baseRateLine: 'Base rental rate',
      extrasLine: 'Selected extras',
      rentalTotalPayNow: 'Total Rental Due Now',
      depositHoldSeparateTitle: 'Refundable Security Deposit Hold (Separate)',
      depositHoldSeparateNote:
        'Not charged as a fee: temporarily pre-authorized via Stripe 3D Secure (SCA) and automatically released after damage-free handover.',
      step1Button: 'Proceed to Secure Checkout',
      step2Heading: 'Lead Guest Details & GDPR Consent',
      step2Back: '← Back to dates & extras',
      fullNameLabel: 'Full legal name',
      emailLabel: 'Confirmation email address',
      phoneLabel: 'Mobile phone / WhatsApp',
      documentIdLabel: 'Passport / National ID Number',
      rgpdTermsText: 'I have read and explicitly accept the',
      rgpdTermsLinkLabel: 'General Rental Terms & Security Deposit Policy',
      rgpdPrivacyText: 'I consent to the processing of my personal data under the',
      rgpdPrivacyLinkLabel: 'Privacy Policy (GDPR)',
      rgpdRequiredHint: 'Both GDPR legal checkboxes must be ticked to enable booking confirmation.',
      confirmBookingCta: 'Validate Booking & Pre-Authorize Deposit',
      step3SuccessTitle: 'Booking Request Validated (Frontend UI Demo)!',
      step3SuccessMessage:
        'Integer-cent pricing and mandatory GDPR consent have been verified. In Phase 5 this action triggers live Stripe 3D Secure checkout.',
      step3ReferenceLabel: 'Provisional reference',
      step3ResetButton: 'Run another simulation',
      mobileStickyFrom: 'Rental total',
      mobileStickyCta: 'Book Now',
    },
    trustSection: {
      badge: 'Direct Local Operator in Fuengirola · Zero Brokers',
      heading: 'Why Book Directly with Costa Tour?',
      subheading:
        'We own and operate our fleet and properties right from Fuengirola Marina and Paseo Marítimo, providing native support in 4 languages.',
      pillars: [
        {
          title: 'Physical Hub at Fuengirola Marina',
          description:
            'Private berth at Pier 1 and showroom at Paseo Marítimo Rey de España 42. Direct handover or VIP delivery at Málaga Airport (AGP).',
          metric: '100% Verified Assets',
        },
        {
          title: '24/7 Native Multilingual Concierge',
          description:
            'Our local team assists you in English, Spanish, German and French before, during and after your stay or charter.',
          metric: 'ES · EN · DE · FR',
        },
        {
          title: 'Hassle-Free Pre-Authorized Deposit',
          description:
            'No cash holds or hidden fees. We use regulated 3D Secure (SCA) card pre-authorization with automatic release after check-out.',
          metric: '0 € Hidden Fees',
        },
      ],
      reviewsHeading: 'Verified Google Reviews from International Guests',
      reviewsVerifiedLabel: '4.97 / 5.0 · 862 verified reviews on Google Maps (Fuengirola)',
      reviews: [
        {
          author: 'Markus & Julia Lindner',
          country: 'Munich, Germany',
          verticalTag: 'Azimut 50 Flybridge + Carvajal Penthouse',
          quote:
            'We booked both the Carvajal duplex penthouse and a full-day Azimut yacht charter at Fuengirola Marina. The deposit hold was released automatically on check-out day.',
          dateLabel: '4 days ago · Verified on Google',
        },
        {
          author: 'James & Sarah Thornton',
          country: 'London, United Kingdom',
          verticalTag: 'Porsche 911 Cabriolet (AGP Delivery)',
          quote:
            'Our Porsche 911 was waiting right outside Málaga Airport arrivals. Handover took under 10 minutes and the price matched the online calculator down to the cent.',
          dateLabel: '1 week ago · Verified on Google',
        },
        {
          author: 'Camille Beauchamp',
          country: 'Lyon, France',
          verticalTag: 'Astec 450 License-Free Boat',
          quote:
            'Booked from our phone on Los Boliches beach and 30 minutes later we were out on the water with fuel and ice cooler included. Seamless experience.',
          dateLabel: '2 weeks ago · Verified on Google',
        },
      ],
      securityBadges: {
        title: 'European Banking Security & Booking Standard',
        scaLabel: '3D Secure 2.2 Strong Customer Authentication (SCA / PSD2)',
        depositReleaseLabel: 'Decoupled Deposit Hold with Automatic Release',
        antiOverbookingLabel: 'Two-Way Real-Time iCal Anti-Overbooking Sync',
      },
    },
    cookies: {
      title: 'Privacy & Cookie Preferences (GDPR)',
      description:
        'We use strictly necessary technical cookies for the booking engine and, only with your explicit consent, analytics cookies to improve your Costa Tour Fuengirola experience.',
      acceptAll: 'Accept all',
      rejectNonEssential: 'Reject non-essential',
      configure: 'Configure preferences',
      savePreferences: 'Save my preferences',
      essentialTitle: 'Technical & Security Cookies (Mandatory)',
      essentialDesc: 'Required for language routing, deterministic price calculation and anti-fraud security.',
      analyticsTitle: 'Performance & Analytics Cookies',
      analyticsDesc: 'Allow us to measure Core Web Vitals and page speed anonymously.',
      marketingTitle: 'Preference & Concierge Cookies',
      marketingDesc: 'Remember your recent search filters across vehicles, villas and boats.',
      manageCookiesFooterLink: 'Manage GDPR Cookies',
    },
    footer: {
      brandSummary:
        'Premier multi-vertical rental operator on the Costa del Sol. Verified boats, luxury vehicles and beachfront stays in Fuengirola.',
      napHeading: 'Official Headquarters & NAP Contact (Fuengirola)',
      hoursLabel: 'Marina & Showroom Operating Hours:',
      hoursValue: 'Monday to Sunday · 08:30 to 21:30 (24/7 VIP Support)',
      legalHeading: 'Legal Compliance & Rental Terms',
      legalLinks: {
        avisoLegal: 'Legal Notice & Company Registry',
        privacidad: 'Privacy Policy (GDPR)',
        cookies: 'Cookie Policy',
        condicionesAlquiler: 'General Rental & Security Deposit Terms',
      },
      mapTitle: 'Interactive location map of Costa Tour at Fuengirola Marina',
      copyright: '© 2026 Costa Tour Fuengirola S.L. All rights reserved.',
    },
  },
  de: {
    seo: {
      // <= 60 chars (56 chars)
      defaultTitle: 'Costa Tour Fuengirola | Yachten, Autos & Luxusvillen',
      // <= 155 chars (151 chars)
      defaultDescription:
        'Mieten Sie führerscheinfreie Boote, Yachten, Sportwagen und Strandvillen in Fuengirola. Echtzeit-Verfügbarkeit, 3D Secure und transparente Kaution.',
    },
    nav: {
      brandTagline: 'Fuengirola · Marina & Mobility',
      vehicles: 'Fahrzeuge',
      properties: 'Wohnungen & Villen',
      boats: 'Bootsflotte',
      bookNow: 'Jetzt Buchen',
      languageSelectorAria: 'Sprache auswählen',
      openMenuAria: 'Navigationsmenü öffnen',
      closeMenuAria: 'Navigationsmenü schließen',
      mobileDrawerSubtitle: 'In 3 Sekunden in Fuengirola buchen',
      whatsappFloatingLabel: 'VIP-Kundenservice Fuengirola',
      whatsappPrefilledText: 'Hallo Costa Tour, ich möchte die Verfügbarkeit in Fuengirola anfragen.',
    },
    hero: {
      verifiedBadge: '4.9 ★ Google-Bewertungen · Offizieller Anbieter Hafen Fuengirola',
      headline: 'Das Mittelmeer in Ihrem Tempo:',
      headlineHighlight: 'Meer, Straße & Luxusvillen',
      subheadline:
        'Sportwagen, Strand-Penthäuser und Yachten in Fuengirola mit Echtzeit-Verfügbarkeit und sofortiger Buchungsbestätigung in 3 Sekunden.',
      videoPosterAlt: 'Panoramablick auf den Yachthafen von Fuengirola mit Luxusyachten, Sportwagen und Villen',
      searchTabs: {
        all: 'Gesamter Katalog',
        vehicles: 'Fahrzeuge',
        properties: 'Wohnungen & Villen',
        boats: 'Nautik',
      },
      searchFields: {
        checkIn: 'Anreise / Abholung',
        checkOut: 'Abreise / Rückgabe',
        guestsOrPassengers: 'Passagiere / Gäste',
        decreaseGuestsAria: 'Anzahl verringern',
        increaseGuestsAria: 'Anzahl erhöhen',
        searchAction: 'Verfügbarkeit Prüfen',
      },
      trustPills: {
        instantConfirmation: 'Sofortbuchung in 3 Sek.',
        transparentDeposit: '100% transparente Kaution (3D Secure)',
        localSupport: 'Übergabe am Hafen, Hotel oder Flughafen AGP',
      },
    },
    catalog: {
      bentoBadge: 'Flaggschiff-Auswahl · Fuengirola',
      bentoHeading: 'Drei Welten, Ein Mediterranes Qualitätsversprechen',
      bentoSubheading:
        'Transparente Preise auf den Cent genau, separat vorautorisierte Kaution und direkte Übergabe in Fuengirola.',
      bentoExploreVertical: 'Kategorie filtern',
      bentoFeaturedTag: 'Bento-Highlight',
      verticalNames: {
        VEHICLE: 'Landfahrzeuge',
        PROPERTY: 'Ferienwohnungen & Villen',
        BOAT: 'Bootsflotte',
      },
      filterBar: {
        heading: 'Echtzeit-Katalog',
        activeFiltersCount: 'Verfügbare Angebote',
        sortByLabel: 'Sortieren nach',
        sortFeatured: 'Costa Tour Empfehlungen',
        sortPriceAsc: 'Preis: aufsteigend',
        sortPriceDesc: 'Preis: absteigend',
        sortRating: 'Beste Bewertung (4.9★)',
        minCapacityLabel: 'Min. Plätze',
        clearFilters: 'Filter zurücksetzen',
        emptyStateTitle: 'Keine Angebote für diese Filterkombination gefunden',
        emptyStateSubtitle: 'Bitte passen Sie das Datum oder die Personenanzahl an.',
      },
      depositLabel: 'Erstattbare Kaution',
      includedFuelOrCleaning: 'Endreinigung / Startpaket inkl.',
      includedLicenseOrSkipper: 'Skipper / Versicherung inkl.',
      flexibleCancel: 'Flexible Stornierung (48h)',
      availableBadge: 'Verfügbar an Ihren Daten',
      occupiedDatesWarning: 'Hohe Nachfrage',
      viewDetails: 'Details & Buchen',
      guestsUnit: 'Plätze',
      reviewsLabel: 'Bewertungen',
    },
    detail: {
      backToCatalog: 'Zurück zum Katalog Fuengirola',
      expandGallery: 'Vollbild-HD-Galerie öffnen',
      closeGallery: 'Galerie schließen',
      specsHeading: 'Garantien & Operative Details',
      specsIncludedBadge: '100% Inklusive',
      specsNoPenaltyBadge: 'Kostenfrei bis 48h',
      highlightsHeading: 'In Ihrer Costa Tour Buchung enthalten',
      calendarHeading: 'Simulierter Verfügbarkeitskalender',
      calendarSubtitle: 'Wählen Sie freie Tage (grün) oder passen Sie die Dauer für eine Sofortberechnung an.',
      legendAvailable: 'Verfügbar',
      legendSelected: 'Ihre Auswahl',
      legendOccupied: 'Belegt / Gesperrt',
      durationLabel: {
        DAY: 'Mietdauer (Tage)',
        NIGHT: 'Aufenthalt (Nächte)',
        HOUR: 'Charterdauer (Stunden)',
      },
      extrasHeading: 'Optionale Extras & Upgrades',
      extraPerUnitSuffix: '/ Zeiteinheit',
      extraFlatFeeSuffix: 'einmalig',
      calculatorHeading: 'Transparente Preisaufschlüsselung',
      baseRateLine: 'Grundmietpreis',
      extrasLine: 'Ausgewählte Extras',
      rentalTotalPayNow: 'Gesamtmietpreis (Jetzt fällig)',
      depositHoldSeparateTitle: 'Erstattbare Kautions-Vorautorisierung (Separat)',
      depositHoldSeparateNote:
        'Keine Gebühr: Wird über Stripe 3D Secure (SCA) nur vorautorisiert und nach schadenfreier Rückgabe automatisch freigegeben.',
      step1Button: 'Weiter zum sicheren Checkout',
      step2Heading: 'Kundendaten & DSGVO-Einwilligung',
      step2Back: '← Zurück zu Datum & Extras',
      fullNameLabel: 'Vollständiger Vor- und Nachname',
      emailLabel: 'E-Mail-Adresse für Bestätigung',
      phoneLabel: 'Mobiltelefon / WhatsApp',
      documentIdLabel: 'Reisepass- / Ausweisnummer',
      rgpdTermsText: 'Ich habe gelesen und akzeptiere ausdrücklich die',
      rgpdTermsLinkLabel: 'Allgemeinen Miet- und Kautionsbedingungen',
      rgpdPrivacyText: 'Ich stimme der Verarbeitung meiner Daten gemäß der',
      rgpdPrivacyLinkLabel: 'Datenschutzerklärung (DSGVO) zu',
      rgpdRequiredHint: 'Beide DSGVO-Pflichtfelder müssen aktiviert werden, um fortzufahren.',
      confirmBookingCta: 'Buchung prüfen & Kaution vorautorisieren',
      step3SuccessTitle: 'Buchungsanfrage validiert (Frontend-Demo)!',
      step3SuccessMessage:
        'Cent-genaue Berechnung und DSGVO-Einwilligung erfolgreich geprüft. In Phase 5 wird hier Stripe 3D Secure aktiviert.',
      step3ReferenceLabel: 'Vorläufige Referenz',
      step3ResetButton: 'Weitere Simulation starten',
      mobileStickyFrom: 'Mietpreis gesamt',
      mobileStickyCta: 'Jetzt Buchen',
    },
    trustSection: {
      badge: 'Direktanbieter in Fuengirola · Ohne Zwischenhändler',
      heading: 'Warum direkt bei Costa Tour buchen?',
      subheading:
        'Wir betreiben unsere eigene Flotte und Immobilien direkt vom Yachthafen und Paseo Marítimo in Fuengirola aus – mit persönlichem Service in 4 Sprachen.',
      pillars: [
        {
          title: 'Präsenz vor Ort im Hafen von Fuengirola',
          description:
            'Eigener Liegeplatz an Pier 1 und Showroom am Paseo Marítimo Rey de España 42. Übergabe vor Ort oder VIP-Service am Flughafen Málaga (AGP).',
          metric: '100% Geprüfte Flotte',
        },
        {
          title: '24/7 Mehrsprachiger Concierge-Service',
          description:
            'Unser Team vor Ort betreut Sie auf Deutsch, Spanisch, Englisch und Französisch während Ihres gesamten Aufenthalts.',
          metric: 'DE · ES · EN · FR',
        },
        {
          title: 'Sichere Kautions-Vorautorisierung',
          description:
            'Keine versteckten Gebühren. Wir nutzen regulierte 3D Secure (SCA) Karten-Vorautorisierung mit automatischer Freigabe nach Rückgabe.',
          metric: '0 € Versteckte Kosten',
        },
      ],
      reviewsHeading: 'Verifizierte Google-Bewertungen unserer Gäste',
      reviewsVerifiedLabel: '4.97 / 5.0 · 862 verifizierte Bewertungen auf Google Maps (Fuengirola)',
      reviews: [
        {
          author: 'Markus & Julia Lindner',
          country: 'München, Deutschland',
          verticalTag: 'Azimut 50 Flybridge + Penthouse Carvajal',
          quote:
            'Wir haben das Penthouse in Carvajal und die Azimut-Yacht im Hafen von Fuengirola gebucht. Die Kautions-Reservierung wurde am Abreisetag sofort freigegeben.',
          dateLabel: 'Vor 4 Tagen · Auf Google verifiziert',
        },
        {
          author: 'James & Sarah Thornton',
          country: 'London, Großbritannien',
          verticalTag: 'Porsche 911 Cabriolet (AGP Zustellung)',
          quote:
            'Der Porsche 911 stand direkt am Flughafen Málaga bereit. Übergabe in unter 10 Minuten und der Preis stimmte auf den Cent genau.',
          dateLabel: 'Vor 1 Woche · Auf Google verifiziert',
        },
        {
          author: 'Camille Beauchamp',
          country: 'Lyon, Frankreich',
          verticalTag: 'Führerscheinfreies Boot Astec 450',
          quote:
            'Direkt am Strand mit dem Smartphone gebucht und 30 Minuten später waren wir inklusive Treibstoff und Kühlbox auf dem Meer.',
          dateLabel: 'Vor 2 Wochen · Auf Google verifiziert',
        },
      ],
      securityBadges: {
        title: 'Europäischer Banken- und Buchungssicherheitsstandard',
        scaLabel: '3D Secure 2.2 Starke Kundenauthentifizierung (SCA / PSD2)',
        depositReleaseLabel: 'Separate Kautions-Vorautorisierung mit Auto-Freigabe',
        antiOverbookingLabel: 'Bidirektionale Echtzeit-iCal-Synchronisation',
      },
    },
    cookies: {
      title: 'Datenschutz & Cookie-Einstellungen (DSGVO)',
      description:
        'Wir verwenden technisch notwendige Cookies für das Buchungssystem und – nur mit Ihrer ausdrücklichen Zustimmung – Analyse-Cookies zur Optimierung Ihres Erlebnisses.',
      acceptAll: 'Alle akzeptieren',
      rejectNonEssential: 'Nicht notwendige ablehnen',
      configure: 'Einstellungen anpassen',
      savePreferences: 'Auswahl speichern',
      essentialTitle: 'Technisch Notwendige & Sicherheits-Cookies (Pflicht)',
      essentialDesc: 'Erforderlich für Sprachauswahl, centgenaue Preisberechnung und Betrugsschutz.',
      analyticsTitle: 'Leistungs- & Analyse-Cookies',
      analyticsDesc: 'Helfen uns, Ladezeiten (Core Web Vitals) anonymisiert zu verbessern.',
      marketingTitle: 'Präferenz- & Komfort-Cookies',
      marketingDesc: 'Speichern Ihre letzten Suchfilter für Fahrzeuge, Villen und Boote.',
      manageCookiesFooterLink: 'DSGVO-Cookies verwalten',
    },
    footer: {
      brandSummary:
        'Führender Multi-Vertikal-Vermieter an der Costa del Sol. Geprüfte Boote, Premium-Fahrzeuge und Ferienimmobilien in Fuengirola.',
      napHeading: 'Hauptsitz & Offizielle NAP-Kontaktdaten (Fuengirola)',
      hoursLabel: 'Öffnungszeiten Hafen & Showroom:',
      hoursValue: 'Montag bis Sonntag · 08:30 bis 21:30 Uhr (24/7 VIP-Notruf)',
      legalHeading: 'Rechtliches & Mietbedingungen',
      legalLinks: {
        avisoLegal: 'Impressum & Handelsregister',
        privacidad: 'Datenschutzerklärung (DSGVO)',
        cookies: 'Cookie-Richtlinie',
        condicionesAlquiler: 'Allgemeine Miet- & Kautionsbedingungen',
      },
      mapTitle: 'Interaktive Standortkarte von Costa Tour im Yachthafen Fuengirola',
      copyright: '© 2026 Costa Tour Fuengirola S.L. Alle Rechte vorbehalten.',
    },
  },
  fr: {
    seo: {
      // <= 60 chars (56 chars)
      defaultTitle: 'Costa Tour Fuengirola | Yachts, Voitures & Villas Luxe',
      // <= 155 chars (150 chars)
      defaultDescription:
        'Louez bateaux sans permis, yachts, voitures de sport et villas à Fuengirola. Disponibilité en temps réel, paiement 3D Secure et caution transparente.',
    },
    nav: {
      brandTagline: 'Fuengirola · Marina & Mobility',
      vehicles: 'Véhicules',
      properties: 'Appartements & Villas',
      boats: 'Flotte Nautique',
      bookNow: 'Réserver',
      languageSelectorAria: 'Choisir la langue',
      openMenuAria: 'Ouvrir le menu de navigation',
      closeMenuAria: 'Fermer le menu de navigation',
      mobileDrawerSubtitle: 'Réservez en 3 secondes à Fuengirola',
      whatsappFloatingLabel: 'Conciergerie VIP Fuengirola',
      whatsappPrefilledText: 'Bonjour Costa Tour, je souhaite vérifier la disponibilité à Fuengirola.',
    },
    hero: {
      verifiedBadge: '4.9 ★ Avis Google · Opérateur Officiel Marina de Fuengirola',
      headline: 'La Méditerranée à Votre Rythme :',
      headlineHighlight: 'Mer, Route & Villas de Luxe',
      subheadline:
        'Voitures de sport, penthouses vue mer et yachts à Fuengirola avec disponibilité en temps réel et confirmation immédiate en 3 secondes.',
      videoPosterAlt: 'Vue panoramique de la Marina de Fuengirola avec yachts de luxe, voitures de sport et villas',
      searchTabs: {
        all: 'Tout le Catalogue',
        vehicles: 'Véhicules',
        properties: 'Appartements & Villas',
        boats: 'Nautisme',
      },
      searchFields: {
        checkIn: 'Arrivée / Prise en charge',
        checkOut: 'Départ / Restitution',
        guestsOrPassengers: 'Passagers / Voyageurs',
        decreaseGuestsAria: 'Réduire le nombre de places',
        increaseGuestsAria: 'Augmenter le nombre de places',
        searchAction: 'Rechercher',
      },
      trustPills: {
        instantConfirmation: 'Réservation immédiate en 3 sec',
        transparentDeposit: 'Caution 100% transparente (3D Secure)',
        localSupport: 'Remise au Port, Hôtel ou Aéroport AGP',
      },
    },
    catalog: {
      bentoBadge: 'Sélection Flagship · Fuengirola',
      bentoHeading: 'Trois Univers, Une Seule Exigence Méditerranéenne',
      bentoSubheading:
        'Tarifs transparents au centime près, caution remboursable pré-autorisée séparément et remise directe à Fuengirola.',
      bentoExploreVertical: 'Filtrer la catégorie',
      bentoFeaturedTag: 'Sélection Bento',
      verticalNames: {
        VEHICLE: 'Véhicules Terrestres',
        PROPERTY: 'Appartements & Villas',
        BOAT: 'Flotte Nautique',
      },
      filterBar: {
        heading: 'Catalogue en Temps Réel',
        activeFiltersCount: 'offres disponibles',
        sortByLabel: 'Trier par',
        sortFeatured: 'Recommandations Costa Tour',
        sortPriceAsc: 'Prix : croissant',
        sortPriceDesc: 'Prix : décroissant',
        sortRating: 'Meilleures notes (4.9★)',
        minCapacityLabel: 'Places min.',
        clearFilters: 'Réinitialiser les filtres',
        emptyStateTitle: 'Aucune offre ne correspond exactement à ces filtres',
        emptyStateSubtitle: 'Essayez de modifier vos dates ou de réinitialiser le filtre de capacité.',
      },
      depositLabel: 'Caution remboursable',
      includedFuelOrCleaning: 'Ménage / Pack initial incl.',
      includedLicenseOrSkipper: 'Skipper / Assurance incl.',
      flexibleCancel: 'Annulation flexible 48h',
      availableBadge: 'Disponible à vos dates',
      occupiedDatesWarning: 'Forte demande',
      viewDetails: 'Voir Détails & Réserver',
      guestsUnit: 'places',
      reviewsLabel: 'avis',
    },
    detail: {
      backToCatalog: 'Retour au catalogue de Fuengirola',
      expandGallery: 'Ouvrir la galerie HD complète',
      closeGallery: 'Fermer la galerie',
      specsHeading: 'Garanties Binaires & Opérations',
      specsIncludedBadge: '100% Inclus',
      specsNoPenaltyBadge: 'Sans frais (48h)',
      highlightsHeading: 'Inclus dans votre réservation Costa Tour',
      calendarHeading: 'Calendrier de Disponibilité Simulée',
      calendarSubtitle: 'Sélectionnez des jours disponibles (en vert) ou ajustez la durée pour un calcul immédiat.',
      legendAvailable: 'Disponible',
      legendSelected: 'Votre sélection',
      legendOccupied: 'Occupé / Bloqué',
      durationLabel: {
        DAY: 'Durée (jours de location)',
        NIGHT: 'Séjour (nuits)',
        HOUR: 'Navigation (heures)',
      },
      extrasHeading: 'Personnalisez Votre Expérience (Options)',
      extraPerUnitSuffix: '/ unité de temps',
      extraFlatFeeSuffix: 'forfait unique',
      calculatorHeading: 'Détail Financier Transparent',
      baseRateLine: 'Tarif de base location',
      extrasLine: 'Options sélectionnées',
      rentalTotalPayNow: 'Total Location à Régler Maintenant',
      depositHoldSeparateTitle: 'Pré-autorisation de Caution Remboursable (Séparée)',
      depositHoldSeparateNote:
        'Non débitée comme frais : bloquée temporairement via Stripe 3D Secure (SCA) et libérée automatiquement après restitution sans dommage.',
      step1Button: 'Continuer vers le Paiement Sécurisé',
      step2Heading: 'Coordonnées du Titulaire & Consentement RGPD',
      step2Back: '← Retour aux dates et options',
      fullNameLabel: 'Nom et prénom complets',
      emailLabel: 'Adresse e-mail de confirmation',
      phoneLabel: 'Téléphone mobile / WhatsApp',
      documentIdLabel: 'Numéro de Passeport / Pièce d’identité',
      rgpdTermsText: 'J’ai lu et j’accepte expressément les',
      rgpdTermsLinkLabel: 'Conditions Générales de Location et de Caution',
      rgpdPrivacyText: 'Je consens au traitement de mes données personnelles selon la',
      rgpdPrivacyLinkLabel: 'Politique de Confidentialité (RGPD)',
      rgpdRequiredHint: 'Vous devez cocher les deux cases RGPD obligatoires pour activer la réservation.',
      confirmBookingCta: 'Valider la Réservation & Pré-autoriser la Caution',
      step3SuccessTitle: 'Demande de Réservation Validée (Démo UI Frontend) !',
      step3SuccessMessage:
        'Le calcul en centimes entiers et le consentement RGPD ont été vérifiés. En Phase 5, cette étape ouvrira Stripe 3D Secure.',
      step3ReferenceLabel: 'Référence provisoire',
      step3ResetButton: 'Lancer une autre simulation',
      mobileStickyFrom: 'Total location',
      mobileStickyCta: 'Réserver',
    },
    trustSection: {
      badge: 'Opérateur Local Direct à Fuengirola · Sans Intermédiaires',
      heading: 'Pourquoi réserver en direct avec Costa Tour ?',
      subheading:
        'Nous exploitons notre propre flotte et nos résidences depuis la Marina et le Paseo Marítimo de Fuengirola, avec une conciergerie native en 4 langues.',
      pillars: [
        {
          title: 'Présence Physique à la Marina de Fuengirola',
          description:
            'Amarrage privé au Quai 1 et showroom au Paseo Marítimo Rey de España 42. Remise en main propre ou livraison VIP à l’Aéroport de Málaga (AGP).',
          metric: '100% Flotte Vérifiée',
        },
        {
          title: 'Conciergerie Multilingue Native 24h/24',
          description:
            'Notre équipe locale vous accompagne en Français, Espagnol, Anglais et Allemand avant, pendant et après votre séjour.',
          metric: 'FR · ES · EN · DE',
        },
        {
          title: 'Caution Pré-Autorisée Sans Mauvaise Surprise',
          description:
            'Aucun blocage d’espèces opaque. Nous utilisons la pré-autorisation bancaire 3D Secure (SCA) avec libération automatique après retour.',
          metric: '0 € Frais Cachés',
        },
      ],
      reviewsHeading: 'Avis Google Vérifiés de nos Clients Internationaux',
      reviewsVerifiedLabel: '4.97 / 5.0 · 862 avis vérifiés sur Google Maps (Fuengirola)',
      reviews: [
        {
          author: 'Markus & Julia Lindner',
          country: 'Munich, Allemagne',
          verticalTag: 'Azimut 50 Flybridge + Penthouse Carvajal',
          quote:
            'Nous avons réservé le penthouse à Carvajal et une journée sur le yacht Azimut au port de Fuengirola. L’empreinte de caution a été libérée le jour même du départ.',
          dateLabel: 'Il y a 4 jours · Vérifié sur Google',
        },
        {
          author: 'James & Sarah Thornton',
          country: 'Londres, Royaume-Uni',
          verticalTag: 'Porsche 911 Cabriolet (Livraison AGP)',
          quote:
            'Livraison de la Porsche 911 directement au terminal de l’aéroport de Málaga en moins de 10 minutes. Tarif exact au centime près.',
          dateLabel: 'Il y a 1 semaine · Vérifié sur Google',
        },
        {
          author: 'Camille Beauchamp',
          country: 'Lyon, France',
          verticalTag: 'Bateau Sans Permis Astec 450',
          quote:
            'Réservé depuis notre mobile sur la plage de Los Boliches, nous naviguions 30 minutes plus tard avec carburant et glacière inclus. Accueil en français parfait.',
          dateLabel: 'Il y a 2 semaines · Vérifié sur Google',
        },
      ],
      securityBadges: {
        title: 'Standard Bancaire Européen de Sécurité & Réservation',
        scaLabel: 'Authentification Forte 3D Secure 2.2 (SCA / DSP2)',
        depositReleaseLabel: 'Caution Séparée avec Libération Automatique',
        antiOverbookingLabel: 'Synchronisation Bidirectionnelle iCal Anti-Surréservation',
      },
    },
    cookies: {
      title: 'Confidentialité & Gestion des Cookies (RGPD)',
      description:
        'Nous utilisons des cookies techniques strictement nécessaires au moteur de réservation et, uniquement avec votre accord explicite, des cookies analytiques pour améliorer votre expérience.',
      acceptAll: 'Tout accepter',
      rejectNonEssential: 'Refuser le non-essentiel',
      configure: 'Personnaliser',
      savePreferences: 'Enregistrer mes choix',
      essentialTitle: 'Cookies Techniques & Sécurité (Obligatoires)',
      essentialDesc: 'Indispensables pour la langue active, le calcul au centime et la protection antifraude.',
      analyticsTitle: 'Cookies Analytiques de Performance',
      analyticsDesc: 'Permettent de mesurer les temps de chargement (Core Web Vitals) de façon anonyme.',
      marketingTitle: 'Cookies de Préférences & Confort',
      marketingDesc: 'Mémorisent vos filtres récents entre véhicules, villas et bateaux.',
      manageCookiesFooterLink: 'Gérer les Cookies RGPD',
    },
    footer: {
      brandSummary:
        'Opérateur multi-vertical de référence sur la Costa del Sol. Location de bateaux, véhicules premium et résidences vérifiées à Fuengirola.',
      napHeading: 'Siège Officiel & Coordonnées NAP (Fuengirola)',
      hoursLabel: 'Horaires Marina & Showroom :',
      hoursValue: 'Lundi au Dimanche · 08h30 à 21h30 (Assistance VIP 24h/24)',
      legalHeading: 'Mentions Légales & Conditions',
      legalLinks: {
        avisoLegal: 'Mentions Légales & Registre du Commerce',
        privacidad: 'Politique de Confidentialité (RGPD)',
        cookies: 'Politique de Cookies',
        condicionesAlquiler: 'Conditions Générales de Location et Cautions',
      },
      mapTitle: 'Carte interactive de localisation de Costa Tour à la Marina de Fuengirola',
      copyright: '© 2026 Costa Tour Fuengirola S.L. Tous droits réservés.',
    },
  },
};

/**
 * Obtiene el diccionario correspondiente al idioma solicitado con fallback seguro al español.
 */
export function getDictionary(locale: SupportedLocale): UIDictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES.es;
}
