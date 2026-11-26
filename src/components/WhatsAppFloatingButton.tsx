'use client';

import { MessageCircle } from 'lucide-react';

/**
 * Propiedades del botón flotante persistente de WhatsApp.
 */
export interface WhatsAppFloatingButtonProps {
  readonly label: string;
  readonly prefilledText: string;
  readonly phoneNumber?: string;
}

/**
 * Botón Flotante Persistente de WhatsApp — Costa Tour (DESIGN.md Sección 5 / PRD.md Fase 2.1)
 *
 * Propósito de negocio y conversión móvil:
 * - Conecta directamente con el número móvil oficial de la tarjeta de Costa Tour (+34627710875).
 * - En pantallas móviles se eleva a `bottom-24` (`lg:bottom-6`) para garantizar que nunca
 *   tape la barra inferior fija (`sticky bottom bar`) de reserva en páginas de detalle.
 */
export function WhatsAppFloatingButton({
  label,
  prefilledText,
  phoneNumber = '34627710875',
}: WhatsAppFloatingButtonProps) {
  const encodedMessage = encodeURIComponent(prefilledText);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <div className="fixed bottom-24 right-5 z-40 sm:right-6 lg:bottom-6">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="group flex items-center gap-3 rounded-full border border-white/20 bg-[#10B981] p-3.5 text-[#0A1628] shadow-2xl shadow-[#10B981]/30 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#059669] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-offset-2 focus:ring-offset-[#0A1628] sm:px-5 sm:py-3.5"
      >
        <span className="relative flex h-6 w-6 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-35" />
          <MessageCircle className="relative h-6 w-6 fill-current" aria-hidden="true" />
        </span>
        <span className="hidden text-sm font-bold tracking-tight sm:inline">
          {label}
        </span>
      </a>
    </div>
  );
}
