import { SiWhatsapp } from 'react-icons/si';

export default function FloatingWhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Pulse rings */}
      <span
        className="absolute inset-0 rounded-full animate-pulse-ring"
        style={{ backgroundColor: 'rgba(37,211,102,0.3)' }}
      />
      <a
        href="https://wa.me/918004774839?text=Hi%2C%20I%20need%20a%20service%20from%20QuickRepair"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_30px_rgba(37,211,102,0.6)] active:scale-95"
        style={{ backgroundColor: '#25D366' }}
        aria-label="Book service on WhatsApp"
        title="Book on WhatsApp"
      >
        <SiWhatsapp className="w-7 h-7 text-white" />
      </a>
    </div>
  );
}
