import { SiWhatsapp } from 'react-icons/si';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  name: string;
  price: string;
  icon: LucideIcon;
  description: string;
  whatsappMessage: string;
  delay?: number;
}

export default function ServiceCard({
  name,
  price,
  icon: Icon,
  description,
  whatsappMessage,
  delay = 0,
}: ServiceCardProps) {
  return (
    <a
      href={`https://wa.me/8447978940?text=${encodeURIComponent(whatsappMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="service-card block rounded-2xl p-6 cursor-pointer group"
      style={{
        backgroundColor: '#161616',
        border: '1px solid #252525',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
        style={{
          background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,140,66,0.15))',
          border: '1px solid rgba(255,140,66,0.2)',
        }}
      >
        <Icon className="w-7 h-7" style={{ color: '#FF8C42' }} />
      </div>

      {/* Content */}
      <h3 className="text-white font-bold text-lg mb-1 group-hover:text-brand-yellow transition-colors duration-200">
        {name}
      </h3>
      <p className="text-gray-500 text-sm mb-4 leading-relaxed">{description}</p>

      {/* Price & CTA */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-600 uppercase tracking-wider">Starting at</span>
          <div
            className="text-2xl font-black"
            style={{ color: '#FFD700' }}
          >
            ₹{price}
          </div>
        </div>
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 group-hover:scale-105"
          style={{
            backgroundColor: '#25D366',
            color: '#fff',
          }}
        >
          <SiWhatsapp className="w-4 h-4" />
          Book
        </div>
      </div>
    </a>
  );
}
