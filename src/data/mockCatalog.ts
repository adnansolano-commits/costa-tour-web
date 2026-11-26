import type { CatalogAsset } from '@/types/catalog';

/**
 * Catálogo Mock Realista Multi-Vertical — Costa Tour Fuengirola (ES, EN, DE, FR, AR)
 *
 * Propósito de negocio y validación:
 * - Modela activos reales de las 3 verticales (Flota Náutica, Vehículos Terrestres, Alojamientos)
 *   operando en Fuengirola en los 5 idiomas oficiales (incluyendo Árabe RTL).
 * - Cumple estrictamente la regla de gobernanza: TODOS los precios (`priceCents`) y fianzas
 *   (`depositCents`) están expresados en céntimos enteros de Euro (ej. 45000 = 450,00 €).
 */
export const MOCK_CATALOG: readonly CatalogAsset[] = [
  // ============================================================================
  // VERTICAL 1: FLOTA NÁUTICA (BOAT)
  // ============================================================================
  {
    id: 'boat-azimut-50-fuengirola',
    slug: 'yate-azimut-50-flybridge-puerto-fuengirola',
    vertical: 'BOAT',
    featuredInBento: true,
    bentoRole: 'HERO_LARGE',
    title: {
      es: 'Azimut 50 Flybridge · Yate con Patrón',
      en: 'Azimut 50 Flybridge · Crewed Motor Yacht',
      de: 'Azimut 50 Flybridge · Motoryacht mit Skipper',
      fr: 'Azimut 50 Flybridge · Yacht avec Skipper',
      ar: 'يخت أزيموت 50 فلاي بريدج · مع قبطان خاص',
    },
    subtitle: {
      es: 'Puerto Deportivo de Fuengirola · Amarre VIP Muelle 1',
      en: 'Fuengirola Marina · VIP Berth Pier 1',
      de: 'Yachthafen Fuengirola · VIP-Liegeplatz Pier 1',
      fr: 'Marina de Fuengirola · Amarrage VIP Quai 1',
      ar: 'مرسى فوينخيرولا الترفيهي · رصيف كبار الشخصيات رقم 1',
    },
    description: {
      es: 'Navega por la costa de Fuengirola y Marbella en nuestro buque insignia de 16 metros. Incluye capitán profesional, cava de bienvenida, paddle surf y combustible a velocidad de crucero.',
      en: 'Cruise the Fuengirola and Marbella coastline aboard our 16-meter flagship yacht. Includes professional captain, welcome cava, stand-up paddleboards and cruising fuel.',
      de: 'Erleben Sie die Küste von Fuengirola und Marbella auf unserer 16-Meter-Flaggschiff-Yacht. Inklusive Kapitän, Begrüßungscava, Stand-Up-Paddleboards und Treibstoff.',
      fr: 'Naviguez le long de la côte de Fuengirola et Marbella à bord de notre yacht amiral de 16 mètres. Capitaine professionnel, cava de bienvenue, paddle et carburant inclus.',
      ar: 'أبحر على طول ساحل فوينخيرولا وماربيا على متن يختنا الفاخر بطول 16 متراً. يشمل قبطاناً محترفاً، مشروبات ترحيبية، ألواح تجديف والوقود.',
    },
    capacity: 12,
    priceCents: 22000, // 220,00 € / hora
    billingUnit: 'HOUR',
    depositCents: 60000, // 600,00 € fianza pre-autorizada
    rating: 4.98,
    reviewCount: 84,
    mainImage: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1400&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&w=1200&q=80',
    ],
    imageAlt: {
      es: 'Yate de lujo Azimut 50 Flybridge navegando frente a la costa de Fuengirola',
      en: 'Luxury Azimut 50 Flybridge yacht cruising off the coast of Fuengirola',
      de: 'Luxusyacht Azimut 50 Flybridge vor der Küste von Fuengirola',
      fr: 'Yacht de luxe Azimut 50 Flybridge naviguant au large de Fuengirola',
      ar: 'يخت فاخر أزيموت 50 يبحر قبالة ساحل فوينخيرولا',
    },
    binarySpecs: {
      depositRequired: true,
      fuelOrCleaningIncluded: true,
      licenseOrSkipperIncluded: true,
      flexibleCancellation: true,
    },
    technicalMetadata: {
      propulsionOrAmenity: {
        es: '2x 670 CV Volvo Penta · Flybridge Solárium',
        en: '2x 670 HP Volvo Penta · Sunbridge Deck',
        de: '2x 670 PS Volvo Penta · Sonnendeck Flybridge',
        fr: '2x 670 CV Volvo Penta · Pont Flybridge Solarium',
        ar: 'محركان فولفو بنتا 670 حصان · سطح تشميس علوي',
      },
      pickupOrZone: {
        es: 'Puerto Deportivo Fuengirola · Pantalán Central',
        en: 'Fuengirola Marina · Central Pier',
        de: 'Hafen Fuengirola · Zentralsteg',
        fr: 'Port de Plaisance de Fuengirola · Quai Central',
        ar: 'ميناء فوينخيرولا الترفيهي · الرصيف المركزي',
      },
      requirementBadge: {
        es: 'Patrón Profesional Incluido',
        en: 'Professional Skipper Included',
        de: 'Professioneller Skipper Inklusive',
        fr: 'Skipper Professionnel Inclus',
        ar: 'يشمل قبطاناً محترفاً',
      },
    },
    highlights: {
      es: ['Avistamiento de delfines frecuente', 'Bebidas, snacks y toallas VIP incluidas', 'Equipo de sonido Fusion Bluetooth'],
      en: ['Frequent dolphin sighting route', 'VIP drinks, snacks and towels included', 'Fusion Bluetooth marine sound system'],
      de: ['Häufige Delfinsichtungen auf der Route', 'VIP-Getränke, Snacks und Handtücher inklusive', 'Fusion Bluetooth-Soundsystem'],
      fr: ['Observation fréquente des dauphins', 'Boissons VIP, snacks et serviettes inclus', 'Système audio marin Fusion Bluetooth'],
      ar: ['مسار بحري لمشاهدة الدلافين', 'مشروبات ووجبات خفيفة ومناشف فاخرة مشمولة', 'نظام صوتي بحري بلوتوث'],
    },
    extras: [
      {
        id: 'extra-seabob',
        label: {
          es: 'Propulsor acuático Seabob F5S',
          en: 'Seabob F5S Water Scooter',
          de: 'Seabob F5S Unterwasserscooter',
          fr: 'Propulseur aquatique Seabob F5S',
          ar: 'سكوتر مائي للغوص Seabob F5S',
        },
        description: {
          es: 'Batería completa para inmersión deportiva durante la travesía',
          en: 'Full battery charge for underwater cruising during your charter',
          de: 'Volle Akkuladung für Tauchspaß während des Törns',
          fr: 'Batterie complète pour plongée sportive pendant la sortie',
          ar: 'بطارية مشحونة بالكامل للسباحة والغوص الرياضي خلال الرحلة',
        },
        priceCents: 9500, // 95,00 €
        chargeMode: 'FLAT_FEE',
      },
      {
        id: 'extra-catering-mediterraneo',
        label: {
          es: 'Catering Sushi & Gourmet a bordo',
          en: 'Onboard Sushi & Gourmet Tasting Menu',
          de: 'Sushi & Gourmet-Feinkostplatten an Bord',
          fr: 'Traiteur Sushi & Gourmet à bord',
          ar: 'ضيافة سوشي ومأكولات فاخرة على متن اليخت',
        },
        description: {
          es: 'Bandeja gourmet recién preparada servida en cubierta',
          en: 'Freshly prepared gourmet platter served on deck',
          de: 'Frisch zubereitete Gourmetplatte an Deck serviert',
          fr: 'Plateau gourmet fraîchement préparé servi sur le pont',
          ar: 'تشكيلة سوشي ومقبلات طازجة تقدم على سطح اليخت',
        },
        priceCents: 14000, // 140,00 €
        chargeMode: 'FLAT_FEE',
      },
    ],
    simulatedBlockedDates: ['2026-11-24', '2026-11-28', '2026-12-05'],
  },
  {
    id: 'boat-astec-450-sin-licencia',
    slug: 'barco-sin-licencia-astec-450-fuengirola',
    vertical: 'BOAT',
    featuredInBento: false,
    title: {
      es: 'Astec 450 Comfort · Barco Sin Licencia',
      en: 'Astec 450 Comfort · License-Free Boat',
      de: 'Astec 450 Comfort · Führerscheinfreies Boot',
      fr: 'Astec 450 Comfort · Bateau Sans Permis',
      ar: 'قارب أستيك 450 كومفورت · بدون رخصة قيادة',
    },
    subtitle: {
      es: 'Sé tu propio capitán desde los 18 años · Combustible incluido',
      en: 'Be your own captain (18+) · Fuel included',
      de: 'Seien Sie Ihr eigener Kapitän (ab 18 J.) · Treibstoff inklusive',
      fr: 'Soyez votre propre capitaine dès 18 ans · Carburant inclus',
      ar: 'كن قبطان نفسك (18+ سنة) · الوقود مشمول بالكامل',
    },
    description: {
      es: 'Embarcación estable y segura de 4.5 metros con toldo bimini, solárium en proa, nevera portátil y escalera de baño. No requiere titulación náutica; te damos formación práctica de 10 minutos antes de zarpar.',
      en: 'Stable and safe 4.5m boat featuring bimini sunshade, bow sunbed, cooler box and swim ladder. No boating license required; includes a 10-minute practical briefing before departure.',
      de: 'Stabiles und sicheres 4,5-Meter-Boot mit Bimini-Sonnendach, Bug-Sonnenliege, Kühlbox und Badeleiter. Kein Bootsführerschein erforderlich; inklusive 10-minütiger Einweisung.',
      fr: 'Bateau stable et sécurisé de 4,5m avec taud de soleil bimini, bain de soleil avant, glacière et échelle de bain. Aucun permis requis ; briefing pratique de 10 minutes inclus.',
      ar: 'قارب آمن ومستقر بطول 4.5 متر مزود بمظلة شمسية، سرير تشميس أمامي، صندوق تبريد وسلم سباحة. لا يتطلب رخصة بحرية؛ نقدم لك تدريباً عملياً لمدة 10 دقائق قبل الإبحار.',
    },
    capacity: 5,
    priceCents: 7500, // 75,00 € / hora
    billingUnit: 'HOUR',
    depositCents: 20000, // 200,00 € fianza
    rating: 4.91,
    reviewCount: 215,
    mainImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    ],
    imageAlt: {
      es: 'Lancha sin licencia Astec 450 con solárium en aguas cristalinas de Fuengirola',
      en: 'Astec 450 license-free boat with sunbed in clear waters of Fuengirola',
      de: 'Führerscheinfreies Boot Astec 450 mit Sonnenliege vor Fuengirola',
      fr: 'Bateau sans permis Astec 450 avec bain de soleil à Fuengirola',
      ar: 'قارب بدون رخصة أستيك 450 في مياه فوينخيرولا الصافية',
    },
    binarySpecs: {
      depositRequired: true,
      fuelOrCleaningIncluded: true,
      licenseOrSkipperIncluded: true,
      flexibleCancellation: true,
    },
    technicalMetadata: {
      propulsionOrAmenity: {
        es: 'Motor 15 CV 4 Tiempos · Toldo Bimini + Bluetooth',
        en: '15 HP 4-Stroke Engine · Bimini Top + Bluetooth',
        de: '15 PS 4-Takt-Motor · Bimini-Verdeck + Bluetooth',
        fr: 'Moteur 15 CV 4 Temps · Taud Bimini + Bluetooth',
        ar: 'محرك 15 حصان · مظلة شمسية + سماعات بلوتوث',
      },
      pickupOrZone: {
        es: 'Puerto Deportivo Fuengirola · Dársena Náutica',
        en: 'Fuengirola Marina · Nautical Dock',
        de: 'Yachthafen Fuengirola · Bootssteg',
        fr: 'Port de Fuengirola · Darse Nautique',
        ar: 'مرسى فوينخيرولا · الرصيف البحري',
      },
      requirementBadge: {
        es: 'Sin Licencia · +18 Años (DNI/Pasaporte)',
        en: 'No License Needed · 18+ ID Required',
        de: 'Führerscheinfrei · Ab 18 Jahren',
        fr: 'Sans Permis · +18 Ans (Pièce d’identité)',
        ar: 'بدون رخصة · +18 سنة (بطاقة هوية/جواز سفر)',
      },
    },
    highlights: {
      es: ['Gasolina 100% incluida en el precio', 'Seguro marítimo a todo riesgo con franquicia limitada', 'Nevera con hielo de cortesía'],
      en: ['100% fuel included in hourly rate', 'Comprehensive marine insurance included', 'Complimentary cooler with ice'],
      de: ['100% Treibstoff im Preis enthalten', 'Vollkasko-Seeversicherung inklusive', 'Kostenlose Kühlbox mit Eis'],
      fr: ['Carburant 100% inclus dans le tarif', 'Assurance maritime tous risques incluse', 'Glacière avec glaçons offerte'],
      ar: ['الوقود مشمول بنسبة 100% في السعر', 'تأمين بحري شامل', 'صندوق تبريد مع ثلج مجاني'],
    },
    extras: [
      {
        id: 'extra-snorkel-pack',
        label: {
          es: 'Pack 4 Kits de Snorkel Profesionales',
          en: '4x Pro Snorkeling Gear Pack',
          de: '4er-Set Profi-Schnorchelausrüstung',
          fr: 'Pack 4 Kits Snorkeling Professionnels',
          ar: 'مجموعة 4 أطقم غطس سنوركل احترافية',
        },
        description: {
          es: 'Máscaras panorámicas higienizadas y tubos con válvula seca',
          en: 'Sanitized panoramic masks and dry-top snorkels',
          de: 'Desinfizierte Panoramamasken und Trockenschnorchel',
          fr: 'Masques panoramiques désinfectés et tubas à soupape',
          ar: 'أقنعة بانورامية معقمة وأنابيب تنفس بصمام جاف',
        },
        priceCents: 2000, // 20,00 €
        chargeMode: 'FLAT_FEE',
      },
    ],
    simulatedBlockedDates: ['2026-11-22'],
  },

  // ============================================================================
  // VERTICAL 2: VEHÍCULOS TERRESTRES (VEHICLE)
  // ============================================================================
  {
    id: 'vehicle-porsche-911-cabrio',
    slug: 'alquiler-porsche-911-carrera-cabriolet-fuengirola',
    vertical: 'VEHICLE',
    featuredInBento: true,
    bentoRole: 'WIDE_HORIZONTAL',
    title: {
      es: 'Porsche 911 Carrera Cabriolet (992)',
      en: 'Porsche 911 Carrera Cabriolet (992)',
      de: 'Porsche 911 Carrera Cabriolet (992)',
      fr: 'Porsche 911 Carrera Cabriolet (992)',
      ar: 'بورش 911 كاريرا كابريوليه (992) مكشوفة',
    },
    subtitle: {
      es: 'Entrega inmediata en Fuengirola o Aeropuerto de Málaga (AGP)',
      en: 'Instant delivery in Fuengirola or Málaga Airport (AGP)',
      de: 'Sofortige Übergabe in Fuengirola oder Flughafen Málaga (AGP)',
      fr: 'Livraison immédiate à Fuengirola ou Aéroport de Málaga (AGP)',
      ar: 'تسليم فوري في فوينخيرولا أو مطار ملقة الدولي (AGP)',
    },
    description: {
      es: 'Recorre la carretera de la Costa del Sol a cielo abierto con 385 CV de ingeniería alemana. Incluye 250 km diarios, seguro premium y asistencia VIP 24/7.',
      en: 'Drive the Costa del Sol coastal highway open-top with 385 HP of German engineering. Includes 250 km/day, premium coverage and 24/7 VIP roadside support.',
      de: 'Genießen Sie die Küstenstraße der Costa del Sol offen mit 385 PS deutscher Ingenieurskunst. Inklusive 250 km/Tag, Premium-Versicherung und 24/7 VIP-Service.',
      fr: 'Parcourez la route côtière de la Costa del Sol cheveux au vent avec 385 ch. Inclut 250 km/jour, assurance premium et assistance VIP 24h/24.',
      ar: 'استمتع بالقيادة على ساحل كوستا ديل سول بقوة 385 حصاناً. يشمل السعر 250 كم يومياً، تأميناً شاملاً ودعماً لكبار الشخصيات على مدار الساعة.',
    },
    capacity: 4,
    priceCents: 49000, // 490,00 € / día
    billingUnit: 'DAY',
    depositCents: 150000, // 1.500,00 € fianza pre-autorizada
    rating: 4.96,
    reviewCount: 62,
    mainImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
    ],
    imageAlt: {
      es: 'Porsche 911 Carrera Cabriolet deportivo aparcado frente al mar en Fuengirola',
      en: 'Porsche 911 Carrera Cabriolet sports car parked by the sea in Fuengirola',
      de: 'Porsche 911 Carrera Cabriolet Sportwagen am Meer in Fuengirola',
      fr: 'Porsche 911 Carrera Cabriolet garée face à la mer à Fuengirola',
      ar: 'سيارة بورش 911 كاريرا كابريوليه الرياضية أمام البحر في فوينخيرولا',
    },
    binarySpecs: {
      depositRequired: true,
      fuelOrCleaningIncluded: true,
      licenseOrSkipperIncluded: true,
      flexibleCancellation: true,
    },
    technicalMetadata: {
      propulsionOrAmenity: {
        es: 'Automático PDK 8v · 385 CV · Apple CarPlay',
        en: '8-Speed PDK Automatic · 385 HP · Apple CarPlay',
        de: '8-Gang PDK Automatik · 385 PS · Apple CarPlay',
        fr: 'Boîte Auto PDK 8v · 385 CV · Apple CarPlay',
        ar: 'ناقل حركة أوتوماتيكي PDK · 385 حصان · Apple CarPlay',
      },
      pickupOrZone: {
        es: 'Avenida los boliches N°53, 29640 Fuengirola',
        en: 'Avenida los boliches N°53, 29640 Fuengirola',
        de: 'Avenida los boliches N°53, 29640 Fuengirola',
        fr: 'Avenida los boliches N°53, 29640 Fuengirola',
        ar: 'Avenida los boliches N°53, 29640 فوينخيرولا',
      },
      requirementBadge: {
        es: '+25 Años · Carnet B (Mín. 3 años)',
        en: '25+ Years · Valid Driving License (3+ yrs)',
        de: 'Ab 25 J. · Führerschein Klasse B (min. 3 J.)',
        fr: '+25 Ans · Permis B (Min. 3 ans)',
        ar: '+25 سنة · رخصة قيادة سارية (3 سنوات على الأقل)',
      },
    },
    highlights: {
      es: ['Entrega depósito lleno + higienización con ozono', 'Escape deportivo Porsche (PSE) y paquete Sport Chrono', 'Segundo conductor adicional sin coste'],
      en: ['Full tank handover + ozone sanitization', 'Porsche Sports Exhaust (PSE) & Sport Chrono package', 'Free additional second driver'],
      de: ['Übergabe mit vollem Tank + Ozon-Desinfektion', 'Porsche Sportabgasanlage (PSE) & Sport Chrono Paket', 'Zweiter Fahrer kostenlos inklusive'],
      fr: ['Remise plein fait + désinfection à l’ozone', 'Échappement sport Porsche (PSE) & Pack Sport Chrono', 'Deuxième conducteur gratuit'],
      ar: ['تسليم بخزان وقود ممتلئ وتعقيم كامل', 'نظام عادم بورش الرياضي وحزمة سبورت كرونو', 'سائق إضافي ثانٍ مجاناً'],
    },
    extras: [
      {
        id: 'extra-airport-delivery',
        label: {
          es: 'Entrega y Recogida VIP en Aeropuerto Málaga (AGP)',
          en: 'VIP Meet & Greet Delivery at Málaga Airport (AGP)',
          de: 'VIP-Zustellung & Abholung am Flughafen Málaga (AGP)',
          fr: 'Livraison & Reprise VIP à l’Aéroport de Málaga (AGP)',
          ar: 'تسليم واستلام VIP في مطار ملقة الدولي (AGP)',
        },
        description: {
          es: 'Un agente te espera en la terminal de llegadas con las llaves en mano',
          en: 'Our concierge awaits at the arrivals terminal with keys in hand',
          de: 'Unser Concierge erwartet Sie direkt am Ankunftsterminal',
          fr: 'Notre agent vous attend au terminal des arrivées avec les clés',
          ar: 'مندوبنا ينتظرك في صالة الوصول بالمطار لتسليمك المفاتيح مباشرة',
        },
        priceCents: 6500, // 65,00 €
        chargeMode: 'FLAT_FEE',
      },
      {
        id: 'extra-full-insurance-zero-excess',
        label: {
          es: 'Reducción de Franquicia Premium',
          en: 'Premium Excess Reduction',
          de: 'Premium-Selbstbeteiligungsreduzierung',
          fr: 'Réduction de Franchise Premium',
          ar: 'تخفيض التحمل التأميني المميز',
        },
        description: {
          es: 'Reduce la responsabilidad por daños de carrocería y llantas al 50%',
          en: 'Reduces bodywork and rim liability by 50%',
          de: 'Reduziert die Haftung für Karosserie- und Felgenschäden um 50%',
          fr: 'Réduit de 50% la franchise carrosserie et jantes',
          ar: 'يخفض نسبة المسؤولية عن أضرار الهيكل والإطارات بنسبة 50%',
        },
        priceCents: 4500, // 45,00 € / día
        chargeMode: 'PER_UNIT',
      },
    ],
    simulatedBlockedDates: ['2026-11-26', '2026-11-27'],
  },
  {
    id: 'vehicle-vespa-primavera-125',
    slug: 'alquiler-scooter-vespa-primavera-125-fuengirola',
    vertical: 'VEHICLE',
    featuredInBento: false,
    title: {
      es: 'Vespa Primavera 125 ABS · Edición Mediterránea',
      en: 'Vespa Primavera 125 ABS · Mediterranean Edition',
      de: 'Vespa Primavera 125 ABS · Mediterrane Edition',
      fr: 'Vespa Primavera 125 ABS · Édition Méditerranée',
      ar: 'سكوتر فيسبا بريمافيرا 125 ABS · الإصدار المتوسطي',
    },
    subtitle: {
      es: 'Movilidad ágil sin atascos · 2 Cascos y baúl incluidos',
      en: 'Effortless coastal mobility · 2 Helmets & top case included',
      de: 'Mühelose Küstenmobilität · 2 Helme & Topcase inklusive',
      fr: 'Mobilité côtière agile · 2 Casques et top-case inclus',
      ar: 'تنقل سريع على الساحل · يشمل خوذتين وصندوق خلفي',
    },
    description: {
      es: 'La forma más auténtica y rápida de moverte entre Los Boliches, Carvajal y Mijas Pueblo. Conducible con carnet de coche B (+3 años) o licencia A1.',
      en: 'The fastest and most iconic way to move between Los Boliches, Carvajal and Mijas Pueblo. Valid with standard car license B (3+ years) or A1 motorcycle license.',
      de: 'Der schnellste und stilvollste Weg zwischen Los Boliches, Carvajal und Mijas Pueblo. Fahrbar mit PKW-Führerschein B (ab 3 J., in Spanien) oder A1.',
      fr: 'Le moyen le plus élégant et rapide de circuler entre Los Boliches, Carvajal et Mijas Pueblo. Accessible avec permis B (+3 ans) ou A1.',
      ar: 'أسرع وأجمل وسيلة للتنقل بين لوس بوليتشيس وكارفاخال وميخاس. يمكن قيادتها برخصة سيارة عادية B (أكثر من 3 سنوات) أو رخصة دراجة A1.',
    },
    capacity: 2,
    priceCents: 4200, // 42,00 € / día
    billingUnit: 'DAY',
    depositCents: 15000, // 150,00 € fianza
    rating: 4.94,
    reviewCount: 310,
    mainImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=85',
    ],
    imageAlt: {
      es: 'Scooter clásica junto al paseo marítimo de Fuengirola al atardecer',
      en: 'Classic scooter parked along Fuengirola promenade at sunset',
      de: 'Klassischer Roller an der Strandpromenade von Fuengirola',
      fr: 'Scooter classique sur la promenade maritime de Fuengirola',
      ar: 'سكوتر فيسبا كلاسيكي على كورنيش فوينخيرولا البحري',
    },
    binarySpecs: {
      depositRequired: true,
      fuelOrCleaningIncluded: true,
      licenseOrSkipperIncluded: true,
      flexibleCancellation: true,
    },
    technicalMetadata: {
      propulsionOrAmenity: {
        es: 'Automática 125cc i-get · Frenos ABS · Puerto USB',
        en: '125cc i-get Automatic · ABS Brakes · USB Port',
        de: '125ccm i-get Automatik · ABS-Bremsen · USB-Anschluss',
        fr: 'Automatique 125cc i-get · Freins ABS · Port USB',
        ar: 'أوتوماتيك 125 سي سي · فرامل ABS · منفذ شحن USB',
      },
      pickupOrZone: {
        es: 'Oficina Central · Avenida los boliches N°53, Fuengirola',
        en: 'Central Office · Avenida los boliches N°53, Fuengirola',
        de: 'Zentrale · Avenida los boliches N°53, Fuengirola',
        fr: 'Agence Centrale · Avenida los boliches N°53, Fuengirola',
        ar: 'المكتب الرئيسي · Avenida los boliches N°53, فوينخيرولا',
      },
      requirementBadge: {
        es: 'Carnet B (+3 años) o A1/A2/A',
        en: 'Car License B (3+ yrs) or A1/A2/A',
        de: 'Führerschein B (3+ J.) oder A1/A2/A',
        fr: 'Permis B (+3 ans) ou A1/A2/A',
        ar: 'رخصة قيادة B (+3 سنوات) أو A1/A2/A',
      },
    },
    highlights: {
      es: ['Kilometraje ilimitado en toda la provincia de Málaga', '2 cascos jet homologados y candado antirrobo', 'Soporte universal para smartphone con carga USB'],
      en: ['Unlimited mileage across Málaga province', '2 approved jet helmets and anti-theft lock', 'Universal smartphone mount with USB charging'],
      de: ['Unbegrenzte Kilometer in der gesamten Provinz Málaga', '2 zugelassene Jethelme und Diebstahlschutz', 'Smartphone-Halterung mit USB-Ladeanschluss'],
      fr: ['Kilométrage illimité dans toute la province de Málaga', '2 casques jet homologués et antivol inclus', 'Support smartphone universel avec charge USB'],
      ar: ['كيلومترات غير محدودة في جميع أنحاء مقاطعة ملقة', 'خوذتان معتمدتان وقفل حماية ضد السرقة', 'حامل هاتف ذكي مع منفذ شحن USB'],
    },
    extras: [
      {
        id: 'extra-hotel-scooter-dropoff',
        label: {
          es: 'Entrega en tu Hotel o Apartamento en Fuengirola',
          en: 'Direct Delivery to your Fuengirola Hotel/Apartment',
          de: 'Zustellung direkt zu Ihrem Hotel in Fuengirola',
          fr: 'Livraison directe à votre Hôtel ou Appartement à Fuengirola',
          ar: 'توصيل مباشر إلى فندقك أو شقتك في فوينخيرولا',
        },
        description: {
          es: 'Recibe la Vespa en la puerta de tu alojamiento a las 09:30h',
          en: 'Receive the Vespa right at your accommodation door at 09:30 AM',
          de: 'Erhalten Sie die Vespa um 09:30 Uhr direkt vor Ihrer Unterkunft',
          fr: 'Recevez la Vespa devant votre hébergement dès 09h30',
          ar: 'استلم السكوتر عند باب مكان إقامتك الساعة 09:30 صباحاً',
        },
        priceCents: 1800, // 18,00 €
        chargeMode: 'FLAT_FEE',
      },
    ],
    simulatedBlockedDates: [],
  },

  // ============================================================================
  // VERTICAL 3: ALOJAMIENTOS (PROPERTY)
  // ============================================================================
  {
    id: 'property-atico-skyline-carvajal',
    slug: 'atico-duplex-piscina-privada-carvajal-fuengirola',
    vertical: 'PROPERTY',
    featuredInBento: true,
    bentoRole: 'TALL_VERTICAL',
    title: {
      es: 'Ático Dúplex Infinity · Primera Línea Carvajal',
      en: 'Infinity Duplex Penthouse · Carvajal Beachfront',
      de: 'Infinity Duplex-Penthouse · Erste Strandlinie Carvajal',
      fr: 'Penthouse Duplex Infinity · Front de Mer Carvajal',
      ar: 'بنتهاوس دوبلكس إنفينيتي · إطلالة مباشرة على شاطئ كارفاخال',
    },
    subtitle: {
      es: '3 Dormitorios En-Suite · Jacuzzi Climatizado en Terraza 180°',
      en: '3 En-Suite Bedrooms · Heated Jacuzzi on 180° Sea-View Terrace',
      de: '3 Schlafzimmer mit Bad · Beheizter Whirlpool auf 180°-Meerblick-Terrasse',
      fr: '3 Chambres En-Suite · Jacuzzi Chauffé sur Terrasse Vue Mer 180°',
      ar: '3 غرف نوم بحمامات خاصة · جاكوزي مدفأ على تراس بإطلالة بحرية 180 درجة',
    },
    description: {
      es: 'Exclusivo ático frente a la playa de Carvajal con vistas panorámicas al Mediterráneo. Domótica integral, garaje privado para 2 plazas, fibra simétrica 1 Gbps y limpieza ecológica certificada incluida.',
      en: 'Exclusive beachfront penthouse at Carvajal beach with panoramic Mediterranean views. Full smart-home automation, private 2-car garage, 1 Gbps fiber Wi-Fi and certified eco-cleaning included.',
      de: 'Exklusives Strand-Penthouse am Carvajal-Strand mit Panoramablick auf das Mittelmeer. Smart-Home-Steuerung, private Doppelgarage, 1 Gbit/s Glasfaser-WLAN und Endreinigung inklusive.',
      fr: 'Penthouse exclusif face à la plage de Carvajal avec vue panoramique sur la Méditerranée. Domotique intégrale, garage privé 2 places, fibre 1 Gbps et ménage écologique inclus.',
      ar: 'بنتهاوس حصري مقابل شاطئ كارفاخال مع إطلالات بانورامية على البحر الأبيض المتوسط. نظام منزل ذكي متكامل، مرآب خاص لسيارتين، إنترنت فايبر 1 جيجابت وتنظيف شامل مشمول.',
    },
    capacity: 6,
    priceCents: 34000, // 340,00 € / noche
    billingUnit: 'NIGHT',
    depositCents: 50000, // 500,00 € fianza reembolsable
    rating: 4.99,
    reviewCount: 118,
    mainImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    ],
    imageAlt: {
      es: 'Terraza de ático de lujo con vistas al mar Mediterráneo en Carvajal, Fuengirola',
      en: 'Luxury penthouse terrace overlooking the Mediterranean Sea in Carvajal, Fuengirola',
      de: 'Luxus-Penthouse-Terrasse mit Blick auf das Mittelmeer in Carvajal, Fuengirola',
      fr: 'Terrasse de penthouse de luxe avec vue sur la mer Méditerranée à Carvajal, Fuengirola',
      ar: 'تراس بنتهاوس فاخر يطل على البحر الأبيض المتوسط في كارفاخال، فوينخيرولا',
    },
    binarySpecs: {
      depositRequired: true,
      fuelOrCleaningIncluded: true,
      licenseOrSkipperIncluded: true,
      flexibleCancellation: true,
    },
    technicalMetadata: {
      propulsionOrAmenity: {
        es: '210 m² · Jacuzzi Privado · Fibra 1 Gbps · Parking',
        en: '210 sqm · Private Jacuzzi · 1 Gbps Fiber · Parking',
        de: '210 m² · Privater Whirlpool · 1 Gbit/s WLAN · Parkplatz',
        fr: '210 m² · Jacuzzi Privé · Fibre 1 Gbps · Parking',
        ar: '210 متر مربع · جاكوزي خاص · فايبر 1 جيجابت · موقف خاص',
      },
      pickupOrZone: {
        es: 'Paseo Marítimo Rey de España · Zona Carvajal, Fuengirola',
        en: 'Paseo Marítimo Rey de España · Carvajal Area, Fuengirola',
        de: 'Paseo Marítimo Rey de España · Carvajal, Fuengirola',
        fr: 'Paseo Marítimo Rey de España · Quartier Carvajal, Fuengirola',
        ar: 'كورنيش الملك إسبانيا · منطقة كارفاخال، فوينخيرولا',
      },
      requirementBadge: {
        es: 'Licencia Turística VFT/MA/48921 · Check-in 24h',
        en: 'Official Tourist License VFT/MA/48921 · 24h Self Check-in',
        de: 'Offizielle Touristenlizenz VFT/MA/48921 · 24h Check-in',
        fr: 'Licence Touristique VFT/MA/48921 · Arrivée Autonome 24h',
        ar: 'رخصة سياحية رسمية VFT/MA/48921 · تسجيل دخول 24 ساعة',
      },
    },
    highlights: {
      es: ['Limpieza final y ropa de cama de algodón egipcio incluida', 'Acceso directo a la playa de Carvajal a 30 metros', 'Sincronización anti-overbooking verificada en tiempo real'],
      en: ['Final cleaning and Egyptian cotton linens included', 'Direct beach access to Carvajal just 30 meters away', 'Real-time verified anti-overbooking calendar sync'],
      de: ['Endreinigung und Bettwäsche aus ägyptischer Baumwolle inklusive', 'Direkter Strandzugang in Carvajal (nur 30 Meter)', 'Verifizierte Echtzeit-Kalendersynchronisation ohne Überbuchung'],
      fr: ['Ménage final et linge en coton égyptien inclus', 'Accès direct à la plage de Carvajal à 30 mètres', 'Synchronisation calendrier anti-surréservation en temps réel'],
      ar: ['يشمل التنظيف النهائي ومفارش قطنية فاخرة', 'وصول مباشر إلى شاطئ كارفاخال على بعد 30 متراً فقط', 'مزامنة فورية للتقويم لمنع الحجز المزدوج'],
    },
    extras: [
      {
        id: 'extra-fridge-stocking',
        label: {
          es: 'Nevera Llena Gourmet a la Llegada',
          en: 'Gourmet Pre-Stocked Fridge on Arrival',
          de: 'Gourmet-Kühlschrankfüllung bei Ankunft',
          fr: 'Réfrigérateur Gourmet Rempli à l’Arrivée',
          ar: 'تجهيز الثلاجة بمأكولات ومشروبات فاخرة قبل الوصول',
        },
        description: {
          es: 'Fruta fresca local, bebidas premium, quesos y desayuno completo',
          en: 'Local fresh fruit, premium drinks, artisanal cheeses and full breakfast',
          de: 'Frisches Obst, Premium-Getränke, Käse und komplettes Frühstück',
          fr: 'Fruits frais locaux, boissons premium, fromages et petit-déjeuner',
          ar: 'فواكه طازجة محلية، عصائر ومشروبات فاخرة، أجبان وإفطار متكامل',
        },
        priceCents: 11000, // 110,00 €
        chargeMode: 'FLAT_FEE',
      },
      {
        id: 'extra-late-checkout',
        label: {
          es: 'Late Check-out Garantizado (hasta las 18:00h)',
          en: 'Guaranteed Late Check-out (until 6:00 PM)',
          de: 'Garantierter Late Check-out (bis 18:00 Uhr)',
          fr: 'Départ Tardif Garanti (jusqu’à 18h00)',
          ar: 'تسجيل مغادرة متأخر مضمون (حتى الساعة 18:00)',
        },
        description: {
          es: 'Disfruta del último día completo de playa y jacuzzi sin prisas',
          en: 'Enjoy your final beach and jacuzzi day without rushing',
          de: 'Genießen Sie Ihren letzten Strandtag entspannt bis zum Abend',
          fr: 'Profitez pleinement de votre dernière journée plage et jacuzzi',
          ar: 'استمتع بيومك الأخير على الشاطئ والجاكوزي دون استعجال',
        },
        priceCents: 8500, // 85,00 €
        chargeMode: 'FLAT_FEE',
      },
    ],
    simulatedBlockedDates: ['2026-11-29', '2026-11-30', '2026-12-01'],
  },
  {
    id: 'property-villa-blanca-torreblanca',
    slug: 'villa-mediterranea-piscina-climatizada-torreblanca-fuengirola',
    vertical: 'PROPERTY',
    featuredInBento: false,
    title: {
      es: 'Villa Blanca Horizon · Piscina Infinity Climatizada',
      en: 'Villa Blanca Horizon · Heated Infinity Pool',
      de: 'Villa Blanca Horizon · Beheizter Infinity-Pool',
      fr: 'Villa Blanca Horizon · Piscine à Débordement Chauffée',
      ar: 'فيلا بلانكا هورايزن · مسبح إنفينيتي خاص مدفأ',
    },
    subtitle: {
      es: '4 Dormitorios · Barbacoa Exterior y Jardín Privado en Torreblanca',
      en: '4 Bedrooms · Outdoor BBQ & Private Garden in Torreblanca',
      de: '4 Schlafzimmer · Außengrill & Privater Garten in Torreblanca',
      fr: '4 Chambres · Barbecue Extérieur & Jardin Privé à Torreblanca',
      ar: '4 غرف نوم · حديقة خاصة ومنطقة شواء في توريبلانكا',
    },
    description: {
      es: 'Villa independiente de arquitectura contemporánea situada en las colinas de Torreblanca (Fuengirola). Privacidad absoluta, piscina desbordante climatizada a 28°C todo el año y vistas al mar.',
      en: 'Contemporary detached villa perched in the hills of Torreblanca (Fuengirola). Total privacy, infinity pool heated to 28°C year-round and sweeping sea views.',
      de: 'Moderne freistehende Villa in den Hügeln von Torreblanca (Fuengirola). Absolute Privatsphäre, ganzjährig auf 28°C beheizter Infinity-Pool und Meerblick.',
      fr: 'Villa contemporaine indépendante située sur les hauteurs de Torreblanca (Fuengirola). Intimité absolue, piscine à débordement chauffée à 28°C toute l’année et vue mer.',
      ar: 'فيلا مستقلة بتصميم عصري في تلال توريبلانكا (فوينخيرولا). خصوصية تامة، مسبح إنفينيتي مدفأ على درجة 28 مئوية طوال العام وإطلالة بانورامية على البحر.',
    },
    capacity: 8,
    priceCents: 48000, // 480,00 € / noche
    billingUnit: 'NIGHT',
    depositCents: 80000, // 800,00 € fianza
    rating: 4.97,
    reviewCount: 73,
    mainImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    ],
    imageAlt: {
      es: 'Villa moderna con piscina infinity iluminada y vistas a la bahía de Fuengirola',
      en: 'Modern villa with illuminated infinity pool overlooking Fuengirola bay',
      de: 'Moderne Villa mit beleuchtetem Infinity-Pool und Blick auf die Bucht von Fuengirola',
      fr: 'Villa moderne avec piscine à débordement éclairée surplombant la baie de Fuengirola',
      ar: 'فيلا حديثة مع مسبح إنفينيتي مضاء وإطلالة على خليج فوينخيرولا',
    },
    binarySpecs: {
      depositRequired: true,
      fuelOrCleaningIncluded: true,
      licenseOrSkipperIncluded: true,
      flexibleCancellation: true,
    },
    technicalMetadata: {
      propulsionOrAmenity: {
        es: '380 m² · Piscina Climatizada · Cargador Wallbox EV',
        en: '380 sqm · Heated Pool · EV Wallbox Charger',
        de: '380 m² · Beheizter Pool · E-Auto Wallbox',
        fr: '380 m² · Piscine Chauffée · Borne Recharge VE',
        ar: '380 متر مربع · مسبح مدفأ · شاحن سيارات كهربائية',
      },
      pickupOrZone: {
        es: 'Colinas de Torreblanca del Sol, Fuengirola',
        en: 'Torreblanca del Sol Hills, Fuengirola',
        de: 'Torreblanca del Sol, Fuengirola',
        fr: 'Collines de Torreblanca del Sol, Fuengirola',
        ar: 'تلال توريبلانكا ديل سول، فوينخيرولا',
      },
      requirementBadge: {
        es: 'Licencia VFT/MA/51209 · Ideal Familias',
        en: 'License VFT/MA/51209 · Family Friendly',
        de: 'Lizenz VFT/MA/51209 · Familienfreundlich',
        fr: 'Licence VFT/MA/51209 · Idéal Familles',
        ar: 'ترخيص VFT/MA/51209 · مثالية للعائلات',
      },
    },
    highlights: {
      es: ['Piscina climatizada y mantenimiento de jardín incluidos', 'Cargador rápido para vehículos eléctricos en garaje', 'Descuento del 15% al combinar con coche o barco Costa Tour'],
      en: ['Heated pool & garden maintenance included', 'Fast EV charger inside private garage', '15% bundle discount when booking a Costa Tour car or boat'],
      de: ['Poolheizung & Gartenpflege im Preis inbegriffen', 'Schnellladestation für Elektroautos in der Garage', '15% Kombirabatt bei Buchung eines Costa Tour Autos oder Bootes'],
      fr: ['Chauffage piscine et entretien jardin inclus', 'Borne de recharge rapide véhicule électrique au garage', '15% de remise combinée avec voiture ou bateau Costa Tour'],
      ar: ['تدفئة المسبح وصيانة الحديقة مشمولة', 'شاحن سريع للسيارات الكهربائية داخل المرآب الخاص', 'خصم 15% عند الجمع مع حجز سيارة أو يخت من كوستا تور'],
    },
    extras: [
      {
        id: 'extra-private-chef',
        label: {
          es: 'Cena Privada con Chef Mediterráneo en la Villa',
          en: 'Private Mediterranean Chef Dinner at the Villa',
          de: 'Privates Abendessen mit Mittelmeer-Koch in der Villa',
          fr: 'Dîner Privé avec Chef Méditerranéen à la Villa',
          ar: 'عشاء خاص مع طاهٍ متوسطي داخل الفيلا',
        },
        description: {
          es: 'Menú degustación de marisco y pescado local para hasta 8 comensales',
          en: 'Local seafood tasting menu and traditional rice for up to 8 guests',
          de: 'Verkostungsmenü mit lokalen Meeresfrüchten für bis zu 8 Gäste',
          fr: 'Menu dégustation poissons locaux et riz marin jusqu’à 8 convives',
          ar: 'قائمة تذوق مأكولات بحرية طازجة وأطباق أندلسية لغاية 8 ضيوف',
        },
        priceCents: 32000, // 320,00 €
        chargeMode: 'FLAT_FEE',
      },
    ],
    simulatedBlockedDates: ['2026-12-10', '2026-12-11', '2026-12-12'],
  },
] as const;

/**
 * Filtra los activos destacados para la cuadrícula asimétrica Bento Box.
 */
export function getBentoFeaturedAssets(): readonly CatalogAsset[] {
  return MOCK_CATALOG.filter((asset) => asset.featuredInBento);
}

/**
 * Busca un activo por su slug amigable de URL.
 */
export function getAssetBySlug(slug: string): CatalogAsset | undefined {
  return MOCK_CATALOG.find((asset) => asset.slug === slug);
}
