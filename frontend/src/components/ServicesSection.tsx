import { useRef } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import ServiceCard from './ServiceCard';
import { Droplets, Zap, Wind, AirVent, Wrench } from 'lucide-react';

const services = [
  {
    name: 'Plumber',
    price: '499',
    icon: Droplets,
    description: 'Pipe repairs, leakage fixes, tap installation, and all plumbing needs.',
  },
  {
    name: 'Electrician',
    price: '299',
    icon: Zap,
    description: 'Wiring, switch repairs, electrical faults, and power-related issues.',
  },
  {
    name: 'Fan / Cooler Repair',
    price: '199',
    icon: Wind,
    description: 'Fan servicing, cooler maintenance, motor repairs, and more.',
  },
  {
    name: 'AC Repair',
    price: '479',
    icon: AirVent,
    description: 'AC servicing, gas refilling, cooling issues, and full AC maintenance.',
  },
  {
    name: 'Mechanic (General)',
    price: '399',
    icon: Wrench,
    description: 'General mechanical repairs, appliance fixes, and home maintenance.',
  },
];

export default function ServicesSection() {
  const { ref, isVisible } = useFadeIn();

  return (
    <section
      id="services"
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
            Our Services
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            What We{' '}
            <span style={{ color: '#FFD700' }}>Fix</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Professional repair services at your doorstep. Transparent pricing, no hidden charges.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <ServiceCard
              key={service.name}
              {...service}
              delay={index * 80}
            />
          ))}
        </div>

        {/* Bottom CTA — scroll to booking form */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm mb-4">
            Ready to book? Fill in our quick online form below.
          </p>
          <button
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              border: '1px solid rgba(255,215,0,0.3)',
              color: '#FFD700',
              backgroundColor: 'rgba(255,215,0,0.06)',
            }}
          >
            Book a Service Now ↓
          </button>
        </div>
      </div>
    </section>
  );
}
