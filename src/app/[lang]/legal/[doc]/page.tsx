import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { DEFAULT_LOCALE, isValidLocale, SUPPORTED_LOCALES } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import {
  buildHreflangAlternates,
  clampSeoDescription,
  clampSeoTitle,
  COSTA_TOUR_NAP,
} from '@/lib/seo';
import type { SupportedLocale } from '@/types/catalog';

/**
 * Slugs de los 4 documentos legales obligatorios de Costa Tour (PRD.md Fase 2.6).
 */
export type LegalDocumentSlug =
  | 'aviso-legal'
  | 'privacidad'
  | 'cookies'
  | 'condiciones-alquiler';

const LEGAL_SLUGS: readonly LegalDocumentSlug[] = [
  'aviso-legal',
  'privacidad',
  'cookies',
  'condiciones-alquiler',
] as const;

interface LegalDocumentContent {
  readonly title: string;
  readonly summary: string;
  readonly sections: ReadonlyArray<{
    readonly heading: string;
    readonly body: string;
  }>;
}

const LEGAL_DOCUMENTS: Record<
  LegalDocumentSlug,
  Record<SupportedLocale, LegalDocumentContent>
> = {
  'aviso-legal': {
    es: {
      title: 'Aviso Legal e Identificación Mercantil',
      summary: 'Información general obligatoria conforme a la Ley 34/2002 (LSSI-CE).',
      sections: [
        {
          heading: '1. Titularidad del Portal',
          body: `Titular: ${COSTA_TOUR_NAP.legalName} con CIF ${COSTA_TOUR_NAP.cif}. Domicilio social en ${COSTA_TOUR_NAP.streetAddress}, ${COSTA_TOUR_NAP.postalCode} ${COSTA_TOUR_NAP.addressLocality} (${COSTA_TOUR_NAP.addressRegion}, España). Correo de contacto: ${COSTA_TOUR_NAP.email} y teléfono ${COSTA_TOUR_NAP.phoneDisplay}.`,
        },
        {
          heading: '2. Objeto y Ámbito Operativo',
          body: 'Costa Tour gestiona el alquiler de embarcaciones recreativas, vehículos terrestres y alojamientos turísticos verificados en Fuengirola y la Costa del Sol.',
        },
      ],
    },
    en: {
      title: 'Legal Notice & Company Registry',
      summary: 'Mandatory corporate disclosure under Spanish Law 34/2002 (LSSI-CE).',
      sections: [
        {
          heading: '1. Corporate Ownership',
          body: `Owner: ${COSTA_TOUR_NAP.legalName} (Tax ID ${COSTA_TOUR_NAP.cif}), registered at ${COSTA_TOUR_NAP.streetAddress}, ${COSTA_TOUR_NAP.postalCode} ${COSTA_TOUR_NAP.addressLocality} (${COSTA_TOUR_NAP.addressRegion}, Spain). Contact: ${COSTA_TOUR_NAP.email} · ${COSTA_TOUR_NAP.phoneDisplay}.`,
        },
        {
          heading: '2. Scope of Operations',
          body: 'Costa Tour directly operates recreational boat charters, premium vehicle rentals and licensed holiday properties in Fuengirola.',
        },
      ],
    },
    de: {
      title: 'Impressum & Handelsregisterangaben',
      summary: 'Pflichtangaben gemäß dem spanischen Gesetz 34/2002 (LSSI-CE).',
      sections: [
        {
          heading: '1. Betreiberangaben',
          body: `Betreiber: ${COSTA_TOUR_NAP.legalName} (Steuernummer ${COSTA_TOUR_NAP.cif}), ${COSTA_TOUR_NAP.streetAddress}, ${COSTA_TOUR_NAP.postalCode} ${COSTA_TOUR_NAP.addressLocality} (${COSTA_TOUR_NAP.addressRegion}, Spanien). Kontakt: ${COSTA_TOUR_NAP.email} · ${COSTA_TOUR_NAP.phoneDisplay}.`,
        },
        {
          heading: '2. Geschäftstätigkeit',
          body: 'Direktvermietung von Sportbooten, Yachten, Fahrzeugen und lizenzierten Ferienunterkünften in Fuengirola.',
        },
      ],
    },
    fr: {
      title: 'Mentions Légales & Registre du Commerce',
      summary: 'Informations légales obligatoires conformément à la Loi 34/2002 (LSSI-CE).',
      sections: [
        {
          heading: '1. Éditeur du Portail',
          body: `Titulaire : ${COSTA_TOUR_NAP.legalName} (CIF ${COSTA_TOUR_NAP.cif}), domiciliée à ${COSTA_TOUR_NAP.streetAddress}, ${COSTA_TOUR_NAP.postalCode} ${COSTA_TOUR_NAP.addressLocality} (${COSTA_TOUR_NAP.addressRegion}, Espagne). Contact : ${COSTA_TOUR_NAP.email} · ${COSTA_TOUR_NAP.phoneDisplay}.`,
        },
        {
          heading: '2. Activité Opérationnelle',
          body: 'Exploitation directe de bateaux de plaisance, véhicules de tourisme et résidences de vacances à Fuengirola.',
        },
      ],
    },
    ar: {
      title: 'الإشعار القانوني والسجل التجاري',
      summary: 'معلومات قانونية إلزامية وفقاً للقانون الإسباني 34/2002 (LSSI-CE).',
      sections: [
        {
          heading: '1. ملكية البوابة الإلكترونية',
          body: `المالك: ${COSTA_TOUR_NAP.legalName} (الرقم الضريبي ${COSTA_TOUR_NAP.cif})، العنوان: ${COSTA_TOUR_NAP.streetAddress}, ${COSTA_TOUR_NAP.postalCode} ${COSTA_TOUR_NAP.addressLocality} (${COSTA_TOUR_NAP.addressRegion}, إسبانيا). البريد الإلكتروني: ${COSTA_TOUR_NAP.email} · الهاتف: ${COSTA_TOUR_NAP.phoneDisplay}.`,
        },
        {
          heading: '2. نطاق النشاط',
          body: 'تدير كوستا تور تأجير القوارب واليخوت الترفيهية، المركبات البرية، والشقق والفيلات السياحية المرخصة في فوينخيرولا.',
        },
      ],
    },
  },
  privacidad: {
    es: {
      title: 'Política de Privacidad y Protección de Datos (RGPD)',
      summary: 'Tratamiento transparente conforme al Reglamento (UE) 2016/679 (RGPD).',
      sections: [
        {
          heading: '1. Responsable y Finalidad',
          body: `${COSTA_TOUR_NAP.legalName} trata los datos proporcionados en el flujo de reserva exclusivamente para formalizar el contrato de alquiler, gestionar la pre-autorización de fianza mediante Stripe 3D Secure y cumplir las obligaciones de registro de viajeros.`,
        },
        {
          heading: '2. Seguridad Financiera (Cero Almacenamiento de Tarjetas)',
          body: 'Costa Tour nunca almacena números de tarjeta de crédito ni códigos CVV en bases de datos propias. Toda transacción se tokeniza directamente en Stripe bajo estándar PCI-DSS Nivel 1.',
        },
      ],
    },
    en: {
      title: 'Privacy Policy & GDPR Data Protection',
      summary: 'Personal data processing under EU Regulation 2016/679 (GDPR).',
      sections: [
        {
          heading: '1. Data Controller & Purpose',
          body: `${COSTA_TOUR_NAP.legalName} processes booking data solely to execute your rental agreement, manage 3D Secure deposit holds via Stripe, and comply with Spanish hospitality and maritime registration laws.`,
        },
        {
          heading: '2. Zero Card Storage Policy',
          body: 'Costa Tour never stores raw credit card numbers or CVV codes locally. All payment operations are tokenized directly by Stripe (PCI-DSS Level 1).',
        },
      ],
    },
    de: {
      title: 'Datenschutzerklärung (DSGVO)',
      summary: 'Verarbeitung personenbezogener Daten gemäß EU-Verordnung 2016/679 (DSGVO).',
      sections: [
        {
          heading: '1. Verantwortlicher & Verwendungszweck',
          body: `${COSTA_TOUR_NAP.legalName} verarbeitet Ihre Buchungsdaten ausschließlich zur Durchführung des Mietvertrags, zur Kautions-Vorautorisierung über Stripe 3D Secure und zur Erfüllung gesetzlicher Meldepflichten.`,
        },
        {
          heading: '2. Keine lokale Speicherung von Kreditkartendaten',
          body: 'Kreditkartennummern oder CVV-Codes werden niemals lokal gespeichert. Alle Zahlungen erfolgen tokenisiert über Stripe (PCI-DSS Level 1).',
        },
      ],
    },
    fr: {
      title: 'Politique de Confidentialité (RGPD)',
      summary: 'Protection des données personnelles selon le Règlement (UE) 2016/679 (RGPD).',
      sections: [
        {
          heading: '1. Responsable du Traitement',
          body: `${COSTA_TOUR_NAP.legalName} traite vos données uniquement pour l’exécution du contrat de location, la pré-autorisation de caution via Stripe 3D Secure et les obligations légales d’enregistrement.`,
        },
        {
          heading: '2. Politique Zéro Stockage Bancaire',
          body: 'Costa Tour ne stocke jamais les numéros de carte bancaire ou CVV. Toutes les transactions sont chiffrées et tokenisées par Stripe (PCI-DSS Niveau 1).',
        },
      ],
    },
    ar: {
      title: 'سياسة الخصوصية وحماية البيانات (RGPD)',
      summary: 'معالجة البيانات الشخصية وفقاً للائحة الاتحاد الأوروبي 2016/679 (GDPR).',
      sections: [
        {
          heading: '1. المسؤول عن البيانات والغرض منها',
          body: `تعالج ${COSTA_TOUR_NAP.legalName} بيانات الحجز حصرياً لتنفيذ عقد الإيجار، وإدارة التفويض المسبق للتأمين عبر Stripe 3D Secure والامتثال لقوانين تسجيل المسافرين في إسبانيا.`,
        },
        {
          heading: '2. سياسة عدم تخزين البطاقات البنكية',
          body: 'لا تقوم كوستا تور أبداً بتخزين أرقام بطاقات الائتمان أو رموز CVV محلياً. تتم جميع المعاملات عبر رموز مشفرة مباشرة لدى Stripe (معيار PCI-DSS المستوى 1).',
        },
      ],
    },
  },
  cookies: {
    es: {
      title: 'Política de Cookies',
      summary: 'Detalle de cookies técnicas, analíticas y de preferencias en Costa Tour.',
      sections: [
        {
          heading: '1. Cookies Técnicas Estrictamente Necesarias',
          body: 'Permiten recordar el idioma seleccionado (/es, /en, /de, /fr), conservar el estado de tu consentimiento RGPD (costatour_cookie_consent_v1) y garantizar la seguridad durante el checkout.',
        },
        {
          heading: '2. Cookies Opcionales y Revocación',
          body: 'Las cookies analíticas y de preferencias permanecen desactivadas por defecto y solo se activan si pulsas "Aceptar todas" o las habilitas en el panel de configuración.',
        },
      ],
    },
    en: {
      title: 'Cookie Policy',
      summary: 'Overview of technical, analytics and preference cookies on Costa Tour.',
      sections: [
        {
          heading: '1. Strictly Necessary Technical Cookies',
          body: 'Used to maintain your active language route (/es, /en, /de, /fr), store your GDPR consent state (costatour_cookie_consent_v1) and protect checkout integrity.',
        },
        {
          heading: '2. Optional Cookies & Revocation',
          body: 'Analytics and preference cookies are disabled by default and only run upon explicit opt-in. You may modify your choice anytime via the footer button.',
        },
      ],
    },
    de: {
      title: 'Cookie-Richtlinie',
      summary: 'Übersicht über technische, analytische und Präferenz-Cookies bei Costa Tour.',
      sections: [
        {
          heading: '1. Technisch Notwendige Cookies',
          body: 'Speichern Ihre Sprachauswahl (/es, /en, /de, /fr), Ihren DSGVO-Einwilligungsstatus (costatour_cookie_consent_v1) und schützen den Checkout.',
        },
        {
          heading: '2. Optionale Cookies & Widerruf',
          body: 'Analyse- und Komfort-Cookies sind standardmäßig deaktiviert und können jederzeit über den Footer angepasst werden.',
        },
      ],
    },
    fr: {
      title: 'Politique de Cookies',
      summary: 'Détail des cookies techniques, analytiques et de préférences sur Costa Tour.',
      sections: [
        {
          heading: '1. Cookies Techniques Strictement Nécessaires',
          body: 'Mémorisent votre langue active (/es, /en, /de, /fr, /ar), votre choix RGPD (costatour_cookie_consent_v1) et sécurisent le processus de réservation.',
        },
        {
          heading: '2. Cookies Optionnels & Révocation',
          body: 'Les cookies non essentiels sont désactivés par défaut et modifiables à tout moment depuis le pied de page.',
        },
      ],
    },
    ar: {
      title: 'سياسة ملفات تعريف الارتباط (Cookies)',
      summary: 'تفاصيل ملفات تعريف الارتباط التقنية والتحليلية في كوستا تور.',
      sections: [
        {
          heading: '1. ملفات تعريف الارتباط التقنية الضرورية',
          body: 'تُستخدم لحفظ مسار اللغة النشط (/es, /en, /de, /fr, /ar) وحالة موافقتك القانونية (costatour_cookie_consent_v1) وحماية عملية الدفع والحجز.',
        },
        {
          heading: '2. ملفات تعريف الارتباط الاختيارية وإلغاء الموافقة',
          body: 'تظل ملفات التحليل والتفضيلات معطلة افتراضياً ولا تعمل إلا بموافقتك الصريحة، ويمكنك تعديل خياراتك في أي وقت من أسفل الصفحة.',
        },
      ],
    },
  },
  'condiciones-alquiler': {
    es: {
      title: 'Condiciones Generales de Alquiler y Régimen de Fianzas',
      summary: 'Normativa transparente de reserva, cancelación flexible 48h y pre-autorización de fianzas.',
      sections: [
        {
          heading: '1. Cálculo Determinista y Transparencia de Precios',
          body: 'Todos los precios mostrados incluyen IVA, seguro obligatorio y los elementos indicados en la ficha binaria (combustible en barcos sin licencia, limpieza final en viviendas o kilometraje base en vehículos).',
        },
        {
          heading: '2. Pre-Autorización y Liberación Automática de Fianza',
          body: 'La fianza reembolsable no se cobra como gasto: se bloquea temporalmente mediante pre-autorización bancaria 3D Secure (SCA) y se libera automáticamente tras verificar la devolución del vehículo, barco o vivienda sin daños.',
        },
      ],
    },
    en: {
      title: 'General Rental Terms & Security Deposit Policy',
      summary: 'Transparent rules covering bookings, 48h flexible cancellation and deposit holds.',
      sections: [
        {
          heading: '1. All-Inclusive Transparent Pricing',
          body: 'All displayed rates include VAT, mandatory insurance and the binary inclusions specified on each listing (fuel on license-free boats, final cleaning on properties or daily mileage on vehicles).',
        },
        {
          heading: '2. Security Deposit Pre-Authorization & Auto-Release',
          body: 'Security deposits are pre-authorized separately via 3D Secure (SCA) and automatically released upon damage-free inspection at check-out.',
        },
      ],
    },
    de: {
      title: 'Allgemeine Miet- & Kautionsbedingungen',
      summary: 'Transparente Regelungen zu Buchung, 48h-Stornierung und Kautions-Vorautorisierung.',
      sections: [
        {
          heading: '1. Transparente Komplettpreise',
          body: 'Alle ausgewiesenen Preise verstehen sich inklusive MwSt., Pflichtversicherung und den in der Angebotskarte genannten Leistungen.',
        },
        {
          heading: '2. Kautions-Vorautorisierung & Automatische Freigabe',
          body: 'Die Kaution wird separat per 3D Secure (SCA) auf Ihrer Karte reserviert und nach schadenfreier Rückgabe automatisch freigegeben.',
        },
      ],
    },
    fr: {
      title: 'Conditions Générales de Location et Régime des Cautions',
      summary: 'Règles transparentes de réservation, annulation 48h et pré-autorisation de caution.',
      sections: [
        {
          heading: '1. Tarification Transparente Tout Compris',
          body: 'Tous les prix affichés incluent la TVA, l’assurance obligatoire et les prestations indiquées sur la fiche de chaque actif.',
        },
        {
          heading: '2. Pré-Autorisation et Libération Automatique de la Caution',
          body: 'La caution est bloquée séparément par empreinte bancaire 3D Secure (SCA) et libérée automatiquement après restitution sans dommage.',
        },
      ],
    },
    ar: {
      title: 'الشروط العامة للإيجار وسياسة التأمين المسترد',
      summary: 'قواعد شفافة للحجز والإلغاء المرن حتى 48 ساعة والتفويض المسبق للتأمين.',
      sections: [
        {
          heading: '1. تسعير شفاف وشامل',
          body: 'جميع الأسعار المعروضة تشمل ضريبة القيمة المضافة والتأمين الإلزامي والمزايا المحددة في بطاقة كل عرض (الوقود في القوارب بدون رخصة، التنظيف النهائي في العقارات أو الكيلومترات اليومية في المركبات).',
        },
        {
          heading: '2. التفويض المسبق والإفراج التلقائي عن التأمين المسترد',
          body: 'لا يتم خصم التأمين المسترد كرسوم، بل يتم حجزه مؤقتاً بتفويض بنكي 3D Secure (SCA) ويُفرج عنه تلقائياً فور فحص المركبة أو القارب أو العقار عند التسليم دون أضرار.',
        },
      ],
    },
  },
};

function isValidLegalSlug(slug: string): slug is LegalDocumentSlug {
  return (LEGAL_SLUGS as readonly string[]).includes(slug);
}

export function generateStaticParams(): Array<{ lang: SupportedLocale; doc: LegalDocumentSlug }> {
  const params: Array<{ lang: SupportedLocale; doc: LegalDocumentSlug }> = [];
  for (const lang of SUPPORTED_LOCALES) {
    for (const doc of LEGAL_SLUGS) {
      params.push({ lang, doc });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  readonly params: Promise<{ lang: string; doc: string }>;
}): Promise<Metadata> {
  const { lang, doc } = await params;
  const locale: SupportedLocale = isValidLocale(lang) ? lang : DEFAULT_LOCALE;
  if (!isValidLegalSlug(doc)) {
    return {};
  }

  const content = LEGAL_DOCUMENTS[doc][locale];
  const alternates = buildHreflangAlternates(`/legal/${doc}`);

  return {
    title: clampSeoTitle(`${content.title} | Costa Tour`),
    description: clampSeoDescription(content.summary),
    alternates: {
      canonical: alternates.canonicalFor(locale),
      languages: alternates.languages,
    },
  };
}

export default async function LegalDocumentPage({
  params,
}: {
  readonly params: Promise<{ lang: string; doc: string }>;
}) {
  const { lang, doc } = await params;
  const locale: SupportedLocale = isValidLocale(lang) ? lang : DEFAULT_LOCALE;
  if (!isValidLegalSlug(doc)) {
    notFound();
  }

  const content = LEGAL_DOCUMENTS[doc][locale];
  const dict = getDictionary(locale);

  return (
    <main className="min-h-screen bg-[#F8FAFC] pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 rounded-full border border-[#0F172A]/10 bg-white px-4 py-2 text-xs font-bold text-[#0F172A] shadow-sm transition-colors hover:bg-[#0A1628] hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />
          <span>{dict.detail.backToCatalog}</span>
        </Link>

        <article className="mt-8 rounded-3xl border border-[#0F172A]/10 bg-white p-8 shadow-sm sm:p-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#0A1628] px-3.5 py-1.5 text-xs font-bold text-[#0EA5E9]">
            <ShieldCheck className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />
            <span>{COSTA_TOUR_NAP.legalName}</span>
          </div>

          <h1 className="heading-section mt-4 font-display font-extrabold text-[#0F172A]">
            {content.title}
          </h1>
          <p className="mt-2 text-base font-medium text-[#475569]">{content.summary}</p>

          <div className="mt-8 space-y-8 border-t border-[#0F172A]/10 pt-8">
            {content.sections.map((sec) => (
              <section key={sec.heading}>
                <h2 className="font-display text-xl font-bold text-[#0F172A]">
                  {sec.heading}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#475569] sm:text-base">
                  {sec.body}
                </p>
              </section>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
