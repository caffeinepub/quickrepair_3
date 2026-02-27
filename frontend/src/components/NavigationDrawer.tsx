import { useScrollSpy } from '../hooks/useScrollSpy';
import { SiWhatsapp } from 'react-icons/si';
import { Home, Wrench, Info, Phone, ChevronRight } from 'lucide-react';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'services', label: 'Services', icon: Wrench },
  { id: 'about', label: 'About', icon: Info },
  { id: 'contact', label: 'Contact', icon: Phone },
];

export default function NavigationDrawer({ isOpen, onClose }: NavigationDrawerProps) {
  const activeSection = useScrollSpy(['home', 'services', 'about', 'contact']);

  const handleNavClick = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    onClose();
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-72 z-50 flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{ backgroundColor: '#161616', borderLeft: '1px solid #252525' }}
    >
      {/* Drawer Header */}
      <div
        className="flex items-center justify-between px-6 py-5 border-b"
        style={{ borderColor: '#252525' }}
      >
        <div className="flex items-center gap-1">
          <span className="font-display text-xl font-black" style={{ color: '#FFD700' }}>Quick</span>
          <span className="font-display text-xl font-black" style={{ color: '#FF8C42' }}>Repair</span>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
          aria-label="Close menu"
        >
          ✕
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                isActive
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
              style={isActive ? {
                background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,140,66,0.15))',
                borderLeft: '3px solid #FF8C42',
              } : {}}
            >
              <Icon
                className="w-5 h-5 flex-shrink-0"
                style={{ color: isActive ? '#FF8C42' : undefined }}
              />
              <span className="font-medium text-sm">{label}</span>
              {isActive && (
                <ChevronRight className="w-4 h-4 ml-auto" style={{ color: '#FF8C42' }} />
              )}
            </button>
          );
        })}

        {/* Become a Mechanic */}
        <div className="pt-4">
          <a
            href="https://wa.me/8447978940?text=Hi%2C%20I%20want%20to%20become%20a%20mechanic%20at%20QuickRepair"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #FFD700, #FF8C42)',
              color: '#0d0d0d',
            }}
          >
            <SiWhatsapp className="w-5 h-5" />
            <span>Become a Mechanic</span>
          </a>
        </div>
      </nav>

      {/* Drawer Footer */}
      <div className="px-6 py-4 border-t" style={{ borderColor: '#252525' }}>
        <p className="text-xs text-gray-500 text-center">
          📞 <a href="tel:8447978940" className="hover:text-gray-300 transition-colors">8447978940</a>
        </p>
        <p className="text-xs text-gray-600 text-center mt-1">8 AM – 8 PM, All Days</p>
      </div>
    </div>
  );
}
