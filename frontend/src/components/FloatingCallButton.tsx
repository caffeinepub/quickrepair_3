import React from 'react';
import { Phone } from 'lucide-react';

const PHONE_NUMBER = '+91-99999-99999';

export default function FloatingCallButton() {
  return (
    <a
      href={`tel:${PHONE_NUMBER}`}
      className="fixed bottom-24 right-4 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
      style={{
        background: 'linear-gradient(135deg, #FF8C42, #FF6B35)',
        animation: 'bounceIn 0.6s ease 0.3s both',
      }}
      aria-label="Call Us Now"
    >
      <Phone size={20} className="text-white" />
    </a>
  );
}
