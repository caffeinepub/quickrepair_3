import React from 'react';
import { MessageCircle, Heart } from 'lucide-react';

const WHATSAPP_NUMBER = '919999999999';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'contact', label: 'Contact' },
  { id: 'faq', label: 'FAQ' },
  { id: 'feedback', label: 'Reviews' },
];

export default function Footer() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%2C%20I%20need%20car%20repair%20service.`;
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'quickrepair');
  const caffeineUrl = `https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-surface-50 border-t border-white/10 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <img
              src="/assets/generated/quickrepair-logo.dim_400x120.png"
              alt="QuickRepair"
              className="h-10 w-auto mb-4"
            />
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Fast, reliable, and affordable car repair service in Mahipalpur, Delhi NCR. Available 7 days a week.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 font-heading">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Book Now */}
          <div>
            <h4 className="text-white font-bold mb-4 font-heading">Book a Service</h4>
            <p className="text-white/60 text-sm mb-4">
              Get a mechanic at your doorstep within 30 minutes.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-black transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C42)' }}
            >
              <MessageCircle size={16} />
              Book on WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/50">
          <p>© {new Date().getFullYear()} QuickRepair. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart size={14} className="text-red-400 fill-red-400" /> using{' '}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
