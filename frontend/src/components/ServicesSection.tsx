import { useRef } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import ServiceCard from './ServiceCard';
import { Droplets, Zap, Wind, AirVent, Wrench, Loader2 } from 'lucide-react';
import { useGetAllServices } from '../hooks/useQueries';

// Fallback services shown when backend has no services yet
const FALLBACK_SERVICES = [
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

// Map icon emoji/text to a Lucide icon component
function getIconComponent(iconStr: string) {
  const lower = iconStr.toLowerCase();
  if (lower.includes('drop') || lower.includes('water') || lower.includes('plumb') || iconStr === '🚿' || iconStr === '💧') return Droplets;
  if (lower.includes('zap') || lower.includes('elec') || iconStr === '⚡') return Zap;
  if (lower.includes('wind') || lower.includes('fan') || lower.includes('cool') || iconStr === '💨') return Wind;
  if (lower.includes('ac') || lower.includes('air') || iconStr === '❄️') return AirVent;
  return Wrench;
}

export default function ServicesSection() {
  const { ref, isVisible } = useFadeIn();
  const { data: backendServices, isLoading } = useGetAllServices();

  // Use backend services if available, otherwise fall back to hardcoded
  const hasBackendServices = backendServices && backendServices.length > 0;

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

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#FF8C42' }} />
          </div>
        )}

        {/* Services Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {hasBackendServices
              ? backendServices.map((service, index) => (
                  <ServiceCard
                    key={service.id.toString()}
                    name={service.name}
                    price={service.startingPrice.toString()}
                    icon={getIconComponent(service.icon)}
                    description={service.description}
                    delay={index * 80}
                  />
                ))
              : FALLBACK_SERVICES.map((service, index) => (
                  <ServiceCard
                    key={service.name}
                    {...service}
                    delay={index * 80}
                  />
                ))}
          </div>
        )}
      </div>
    </section>
  );
}
