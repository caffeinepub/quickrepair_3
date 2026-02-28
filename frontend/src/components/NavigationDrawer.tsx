import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';

interface NavigationDrawerProps {
  isOpen: boolean;
  activeSection: string;
  onNavClick: (sectionId: string) => void;
}

const navItems = [
  { id: 'home', label: 'Home', emoji: '🏠' },
  { id: 'services', label: 'Services', emoji: '🔧' },
  { id: 'about', label: 'About', emoji: '⭐' },
  { id: 'how-it-works', label: 'How It Works', emoji: '📋' },
  { id: 'contact', label: 'Contact', emoji: '📞' },
  { id: 'faq', label: 'FAQ', emoji: '❓' },
  { id: 'feedback', label: 'Reviews', emoji: '💬' },
];

const WHATSAPP_NUMBER = '919999999999';
const PHONE_NUMBER = '+91-99999-99999';

export default function NavigationDrawer({ isOpen, activeSection, onNavClick }: NavigationDrawerProps) {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%2C%20I%20need%20car%20repair%20service.`;

  return (
    <div
      className={`fixed top-0 right-0 h-full w-72 z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{ background: 'oklch(14% 0.025 260)' }}
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <img
          src="/assets/generated/quickrepair-logo.dim_400x120.png"
          alt="QuickRepair"
          className="h-8 w-auto"
        />
      </div>

      {/* Nav Items */}
      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavClick(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-all ${
              activeSection === item.id
                ? 'text-black'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
            style={
              activeSection === item.id
                ? { background: 'linear-gradient(135deg, #FFD700, #FF8C42)', color: '#000' }
                : {}
            }
          >
            <span className="text-xl">{item.emoji}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Divider */}
      <div className="mx-4 border-t border-white/10 my-2" />

      {/* Become a Mechanic */}
      <div className="px-4 py-2">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=I%20want%20to%20become%20a%20mechanic%20partner.`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all font-medium"
        >
          <span className="text-xl">🔩</span>
          <span>Become a Mechanic</span>
        </a>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%2C%20I%20need%20car%20repair%20service.`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-black mb-3"
          style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C42)' }}
        >
          <MessageCircle size={18} />
          Book on WhatsApp
        </a>
        <div className="flex items-center justify-center gap-2 text-white/50 text-sm">
          <Phone size={14} />
          <span>{PHONE_NUMBER}</span>
        </div>
      </div>
    </div>
  );
}
