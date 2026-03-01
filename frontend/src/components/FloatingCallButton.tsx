import { Phone } from 'lucide-react';

export default function FloatingCallButton() {
  return (
    <div className="fixed bottom-24 right-6 z-50">
      <a
        href="tel:+918004774839"
        className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, #FF8C42, #FFD700)',
          boxShadow: '0 4px 20px rgba(255,140,66,0.5)',
        }}
        aria-label="Call QuickRepair now"
        title="Call Now: +91 8004774839"
      >
        <Phone className="w-6 h-6 text-white" strokeWidth={2.5} />
      </a>
      <span
        className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-bold whitespace-nowrap px-2 py-0.5 rounded-full pointer-events-none"
        style={{
          backgroundColor: 'rgba(255,140,66,0.15)',
          color: '#FF8C42',
          border: '1px solid rgba(255,140,66,0.3)',
        }}
      >
        Call Now
      </span>
    </div>
  );
}
