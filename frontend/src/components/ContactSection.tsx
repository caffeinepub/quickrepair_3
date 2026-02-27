import { useFadeIn } from '../hooks/useFadeIn';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

const serviceAreas = [
  'Mahipalpur Extension',
  'Mahipalpur Village',
  'Aerocity',
  'Vasant Kunj',
  'Rangpuri',
  'Nagal Dewat',
];

export default function ContactSection() {
  const { ref, isVisible } = useFadeIn();

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-20 px-4 sm:px-6 lg:px-8 fade-in-section ${isVisible ? 'is-visible' : ''}`}
      style={{ backgroundColor: '#0d0d0d' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-4"
            style={{
              background: 'rgba(255,140,66,0.12)',
              color: '#FF8C42',
              border: '1px solid rgba(255,140,66,0.25)',
            }}
          >
            Contact Us
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            Get in{' '}
            <span style={{ color: '#FFD700' }}>Touch</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            We're available 8 AM to 8 PM, every day. Reach out and we'll be at your door in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Cards */}
          <div className="space-y-4">
            {/* Phone */}
            <a
              href="tel:8447978940"
              className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] group"
              style={{
                backgroundColor: '#161616',
                border: '1px solid #252525',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255,140,66,0.15)' }}
              >
                <Phone className="w-6 h-6" style={{ color: '#FF8C42' }} />
              </div>
              <div>
                <div className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Phone</div>
                <div className="text-white font-bold text-lg group-hover:text-brand-orange transition-colors">
                  8447978940
                </div>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:quickrepaironlineservices@gmail.com"
              className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] group"
              style={{
                backgroundColor: '#161616',
                border: '1px solid #252525',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255,215,0,0.12)' }}
              >
                <Mail className="w-6 h-6" style={{ color: '#FFD700' }} />
              </div>
              <div className="min-w-0">
                <div className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Email</div>
                <div className="text-white font-medium text-sm group-hover:text-brand-yellow transition-colors truncate">
                  quickrepaironlineservices@gmail.com
                </div>
              </div>
            </a>

            {/* Working Hours */}
            <div
              className="flex items-center gap-4 p-5 rounded-2xl"
              style={{
                backgroundColor: '#161616',
                border: '1px solid #252525',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(37,211,102,0.12)' }}
              >
                <Clock className="w-6 h-6" style={{ color: '#25D366' }} />
              </div>
              <div>
                <div className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Working Hours</div>
                <div className="text-white font-bold">8:00 AM – 8:00 PM</div>
                <div className="text-gray-500 text-xs">All Days of the Week</div>
              </div>
            </div>
          </div>

          {/* Service Areas */}
          <div
            className="p-6 rounded-2xl"
            style={{
              backgroundColor: '#161616',
              border: '1px solid #252525',
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <MapPin className="w-5 h-5" style={{ color: '#FF8C42' }} />
              <h3 className="text-white font-bold text-lg">Service Areas</h3>
            </div>
            <div className="space-y-2.5">
              {serviceAreas.map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-3 py-2 px-3 rounded-lg"
                  style={{ backgroundColor: '#1e1e1e' }}
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: '#FF8C42' }}
                  />
                  <span className="text-gray-300 text-sm font-medium">{area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div
            className="p-6 rounded-2xl flex flex-col justify-between"
            style={{
              background: 'linear-gradient(135deg, #1a1a1a, #161616)',
              border: '1px solid #252525',
            }}
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-5 h-5" style={{ color: '#25D366' }} />
                <h3 className="text-white font-bold text-lg">Quick Booking</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                The fastest way to book a service is via WhatsApp. Send us a message and our team will respond instantly.
              </p>
              <div
                className="p-4 rounded-xl mb-6"
                style={{
                  background: 'rgba(37,211,102,0.08)',
                  border: '1px solid rgba(37,211,102,0.2)',
                }}
              >
                <div className="text-xs text-gray-500 mb-1">Average response time</div>
                <div className="text-white font-bold text-2xl" style={{ color: '#25D366' }}>
                  &lt; 2 minutes
                </div>
              </div>
            </div>
            <a
              href="https://wa.me/8447978940?text=Hi%2C%20I%20need%20a%20service%20from%20QuickRepair"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(37,211,102,0.35)] active:scale-95"
              style={{
                backgroundColor: '#25D366',
                color: '#fff',
              }}
            >
              <SiWhatsapp className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
