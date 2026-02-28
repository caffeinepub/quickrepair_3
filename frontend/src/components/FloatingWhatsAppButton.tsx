import React from 'react';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '919999999999';

export default function FloatingWhatsAppButton() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%2C%20I%20need%20car%20repair%20service.`;

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Pulse ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: '#FFD700',
          animation: 'pulse-ring 1.5s ease-out infinite',
        }}
      />
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
        style={{
          background: 'linear-gradient(135deg, #FFD700, #FF8C42)',
          animation: 'bounceIn 0.6s ease both',
        }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} className="text-black" />
      </a>
    </div>
  );
}
