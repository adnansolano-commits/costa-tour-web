/**
 * Recreación Vectorial SVG del Logotipo Oficial — COSTA TOUR VIAJES ("VIAJA. DESCUBRE. VIVE.")
 *
 * Propósito de diseño e identidad visual:
 * - Recrea fielmente en SVG escalable de alta precisión el logotipo original de la tarjeta:
 *   1. Arco orbital dinámico en azul real y estela dorada (`#F59E0B`).
 *   2. Avión comercial ascendiendo en diagonal hacia la derecha con cola y fuselaje inferior dorados.
 *   3. Catamarán / Ferry rápido rojo y blanco con las siglas "CT" y franjas blancas navegando sobre olas.
 *   4. Tipografía "COSTA TOUR", filetes dorados "— VIAJES —" y lema "VIAJA. DESCUBRE. VIVE.".
 */
export interface CostaTourLogoProps {
  readonly variant?: 'navbar' | 'footer' | 'stacked';
  readonly className?: string;
}

export function CostaTourLogo({
  variant = 'navbar',
  className = '',
}: CostaTourLogoProps) {
  const isStacked = variant === 'stacked' || variant === 'footer';

  return (
    <div
      className={`inline-flex items-center ${
        isStacked ? 'flex-col text-center gap-2' : 'flex-row gap-3'
      } ${className}`}
    >
      {/* Emblema Vectorial: Arco Orbital + Avión Ascendente + Ferry Rojo "CT" */}
      <div
        className={`relative shrink-0 ${
          isStacked ? 'h-24 w-24' : 'h-14 w-14 sm:h-16 sm:w-16'
        }`}
      >
        <svg
          viewBox="0 0 160 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full drop-shadow-md"
          role="img"
          aria-label="Costa Tour Viajes Logo"
        >
          {/* 1. Arco Orbital Superior Azul y Estela Inferior Dorada */}
          <path
            d="M 42 78 C 34 40, 72 12, 114 24"
            stroke="#0284C7"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 56 64 C 24 80, 26 122, 58 136"
            stroke="#F59E0B"
            strokeWidth="5.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 60 66 C 32 82, 34 120, 66 136"
            stroke="#0284C7"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* 2. Avión Comercial Ascendiendo hacia la Derecha */}
          {/* Ala derecha (trasera en perspectiva) */}
          <path
            d="M 92 48 L 128 60 L 131 55 L 126 58 L 98 44 Z"
            fill="#0F172A"
          />
          {/* Estabilizador vertical (Cola Dorada) */}
          <path
            d="M 55 52 L 46 35 L 55 34 L 68 48 Z"
            fill="#F59E0B"
          />
          {/* Estabilizador horizontal trasero */}
          <path
            d="M 54 55 L 40 53 L 45 50 L 60 52 Z"
            fill="#1E293B"
          />
          {/* Fuselaje Inferior Dorado/Azul */}
          <path
            d="M 56 56 C 78 46, 108 30, 128 20 C 133 18, 136 22, 130 27 C 110 40, 82 54, 58 62 Z"
            fill="#F59E0B"
          />
          {/* Fuselaje Superior Blanco */}
          <path
            d="M 55 53 C 76 42, 106 24, 125 15 C 132 12, 136 16, 131 21 C 112 33, 82 49, 57 58 Z"
            fill="#FFFFFF"
          />
          {/* Cabina de mando (Cockpit) */}
          <path
            d="M 121 17 C 125 15, 129 16, 130 18 C 127 20, 123 20, 120 19 Z"
            fill="#0F172A"
          />
          {/* Ventanillas del avión */}
          <line
            x1="78"
            y1="43"
            x2="112"
            y2="24"
            stroke="#0F172A"
            strokeWidth="1.8"
            strokeDasharray="2 3"
          />
          {/* Ala izquierda (principal en primer plano) */}
          <path
            d="M 84 44 L 30 28 L 25 21 L 33 25 L 94 39 Z"
            fill="#1E293B"
          />
          <path
            d="M 84 44 L 32 30 L 92 41 Z"
            fill="#94A3B8"
          />
          {/* Motores (Turbinas con aro dorado) */}
          <g>
            <ellipse cx="75" cy="43" rx="6" ry="5" fill="#0F172A" />
            <ellipse cx="77" cy="43" rx="3.5" ry="3.2" fill="#E2E8F0" stroke="#F59E0B" strokeWidth="1.5" />
            <ellipse cx="108" cy="54" rx="5.5" ry="4.5" fill="#0F172A" />
            <ellipse cx="110" cy="54" rx="3" ry="2.8" fill="#E2E8F0" stroke="#F59E0B" strokeWidth="1.5" />
          </g>

          {/* 3. Catamarán / Ferry Rápido Rojo y Blanco "CT" */}
          {/* Antena / Mástil superior */}
          <path d="M 89 65 L 91 74 M 86 69 L 93 69" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* Puente de mando superior blanco */}
          <path
            d="M 73 80 L 77 73 L 98 73 L 103 80 Z"
            fill="#FFFFFF"
          />
          {/* Ventanas del puente superior */}
          <path
            d="M 78 75 L 96 75 L 99 78.5 L 76 78.5 Z"
            fill="#0F172A"
          />
          {/* Cubierta intermedia blanca */}
          <path
            d="M 60 89 L 64 80 L 112 80 L 122 89 Z"
            fill="#F8FAFC"
          />
          {/* Ventanas panorámicas de la cubierta intermedia */}
          <path
            d="M 65 83 L 82 83 L 82 86.5 L 63 86.5 Z"
            fill="#0F172A"
          />
          <path
            d="M 86 83 L 114 83 L 118 86.5 L 86 86.5 Z"
            fill="#0F172A"
          />

          {/* Casco Rojo del Ferry / Catamarán */}
          <path
            d="M 55 89 L 136 89 C 139 89, 141 92, 138 96 L 126 112 L 108 112 L 103 105 L 52 104 L 55 89 Z"
            fill="#DC2626"
          />
          {/* Sombra interior proa catamarán */}
          <path
            d="M 105 112 L 114 103 L 124 112 Z"
            fill="#7F1D1D"
          />
          {/* Franjas dinámicas blancas en la proa del casco rojo */}
          <path
            d="M 88 91 C 98 91, 104 97, 94 106 L 101 106 C 111 97, 106 91, 95 91 Z"
            fill="#FFFFFF"
          />
          <path
            d="M 103 91 C 111 91, 115 98, 106 109 L 113 109 C 121 98, 118 91, 109 91 Z"
            fill="#FFFFFF"
          />
          {/* Línea blanca fina en proa superior */}
          <path
            d="M 118 92 L 136 92"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Siglas "CT" en blanco sobre el casco rojo */}
          <text
            x="63"
            y="102"
            fill="#FFFFFF"
            fontFamily="system-ui, sans-serif"
            fontWeight="900"
            fontSize="13"
            letterSpacing="-0.5"
          >
            CT
          </text>

          {/* 4. Olas Marinas Blancas y Azules bajo el Catamarán */}
          <path
            d="M 46 105 C 56 102, 66 110, 78 108 C 90 106, 100 115, 114 113 C 126 111, 134 115, 142 112"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 52 112 C 66 117, 84 112, 102 118 C 116 122, 128 117, 138 119"
            stroke="#38BDF8"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Bloque Tipográfico Oficial: COSTA TOUR / — VIAJES — / VIAJA. DESCUBRE. VIVE. */}
      <div className={`flex flex-col ${isStacked ? 'items-center' : 'items-start'}`}>
        <div className="font-display text-lg font-black leading-none tracking-tight sm:text-2xl">
          <span className="text-[#F8FAFC]">COSTA </span>
          <span className="text-[#0EA5E9]">TOUR</span>
        </div>

        {/* Subtítulo — V I A J E S — con filetes dorados */}
        <div className="mt-1 flex items-center gap-2">
          <span className="h-[2px] w-4 rounded-full bg-[#F59E0B] sm:w-6" />
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.28em] text-[#38BDF8] sm:text-[11px]">
            VIAJES
          </span>
          <span className="h-[2px] w-4 rounded-full bg-[#F59E0B] sm:w-6" />
        </div>

        {/* Lema: VIAJA. DESCUBRE. VIVE. */}
        <div className="mt-0.5 flex items-center gap-1 text-[8.5px] font-extrabold uppercase tracking-[0.14em] sm:text-[9.5px]">
          <span className="text-[#0EA5E9]">VIAJA.</span>
          <span className="text-[#CBD5E1]">DESCUBRE.</span>
          <span className="text-[#F59E0B]">VIVE.</span>
        </div>
      </div>
    </div>
  );
}
