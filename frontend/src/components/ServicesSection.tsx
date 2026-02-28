import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useFadeIn } from '../hooks/useFadeIn';
import ServiceCard from './ServiceCard';

const WHATSAPP_NUMBER = '919999999999';

const services = [
  {
    id: 1,
    icon: '❄️',
    name: 'AC Repair & Service',
    description: 'Complete car AC diagnosis, gas refill, compressor repair, and cooling system service.',
    price: '₹499',
    duration: '1-2 hrs',
    popular: true,
  },
  {
    id: 2,
    icon: '🔧',
    name: 'Engine Service',
    description: 'Full engine check-up, oil change, filter replacement, and performance tuning.',
    price: '₹799',
    duration: '2-3 hrs',
    popular: false,
  },
  {
    id: 3,
    icon: '🔋',
    name: 'Battery Replacement',
    description: 'Quick battery testing, jump-start service, and battery replacement at your location.',
    price: '₹299',
    duration: '30 min',
    popular: false,
  },
  {
    id: 4,
    icon: '🛞',
    name: 'Tyre Change & Puncture',
    description: 'On-the-spot tyre change, puncture repair, and wheel balancing service.',
    price: '₹199',
    duration: '30 min',
    popular: false,
  },
  {
    id: 5,
    icon: '🚗',
    name: 'Full Car Service',
    description: 'Comprehensive car service including all fluids, filters, brakes, and safety check.',
    price: '₹1499',
    duration: '4-5 hrs',
    popular: true,
  },
  {
    id: 6,
    icon: '💡',
    name: 'Electrical Repair',
    description: 'Wiring diagnosis, headlight repair, sensor replacement, and electrical fault fixing.',
    price: '₹399',
    duration: '1-2 hrs',
    popular: false,
  },
];

export default function ServicesSection() {
  const { ref, isVisible } = useFadeIn();
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%2C%20I%20need%20car%20repair%20service.`;

  return (
    <section id="services" className="py-20 bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-4">
            <span className="text-sm font-medium" style={{ color: '#FFD700' }}>Our Services</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white font-heading mb-4">
            What We{' '}
            <span style={{ color: '#FFD700' }}>Fix</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Professional car repair services at your doorstep — fast, reliable, and affordable.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg text-black shadow-lg hover:scale-105 active:scale-95 transition-transform"
            style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C42)' }}
          >
            <MessageCircle size={22} />
            Book Any Service on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
