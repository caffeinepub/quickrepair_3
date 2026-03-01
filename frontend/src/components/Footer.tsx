import { Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'quickrepair');

  return (
    <footer
      className="py-10 px-4 sm:px-6 lg:px-8 border-t"
      style={{ backgroundColor: '#0a0a0a', borderColor: '#1e1e1e' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          {/* Logo */}
          <div className="flex items-center gap-1">
            <span className="font-display text-2xl font-black" style={{ color: '#FFD700' }}>Quick</span>
            <span className="font-display text-2xl font-black" style={{ color: '#FF8C42' }}>Repair</span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {['home', 'services', 'about', 'contact'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-gray-500 hover:text-gray-300 text-sm capitalize transition-colors duration-200"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </nav>

          {/* Book Online link */}
          <button
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: '#FF8C42', color: '#fff' }}
          >
            📅 Book Online
          </button>
        </div>

        {/* Divider */}
        <div className="border-t mb-6" style={{ borderColor: '#1e1e1e' }} />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>
            © {year}{' '}
            <span style={{ color: '#FFD700' }}>QuickRepair</span>. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Built with{' '}
            <Heart className="w-3 h-3 inline" style={{ color: '#FF8C42' }} />{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors"
              style={{ color: '#FF8C42' }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
