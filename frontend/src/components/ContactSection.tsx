import { useFadeIn } from '../hooks/useFadeIn';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
        </div>
      </div>
    </section>
  );
}
