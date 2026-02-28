import React from 'react';
import { MessageCircle, Clock } from 'lucide-react';
import { useFadeIn } from '../hooks/useFadeIn';

const WHATSAPP_NUMBER = '919999999999';

interface Service {
  id: number;
  icon: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  popular: boolean;
}

interface ServiceCardProps {
  service: Service;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const { ref, isVisible } = useFadeIn();
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%2C%20I%20want%20to%20book%20${encodeURIComponent(service.name)}%20service.`;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`white-card white-card-hover rounded-2xl p-6 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Popular Badge */}
      {service.popular && (
        <div
          className="inline-flex items-center gap-1 text-xs font-bold text-black px-3 py-1 rounded-full mb-3"
          style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C42)' }}
        >
          ⭐ Most Popular
        </div>
      )}

      {/* Icon */}
      <div className="text-4xl mb-3">{service.icon}</div>

      {/* Name */}
      <h3 className="text-lg font-bold text-gray-900 mb-2 font-heading">{service.name}</h3>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.description}</p>

      {/* Price & Duration */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xl font-black" style={{ color: '#FF8C42' }}>
          {service.price}
        </span>
        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <Clock size={14} />
          <span>{service.duration}</span>
        </div>
      </div>

      {/* Book Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm text-black transition-all hover:scale-105 active:scale-95"
        style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C42)' }}
      >
        <MessageCircle size={16} />
        Book Now
      </a>
    </div>
  );
}
