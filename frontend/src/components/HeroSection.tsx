import React from 'react';
import { Phone, MessageCircle, Star, Clock, Users, ChevronDown } from 'lucide-react';

const WHATSAPP_NUMBER = '919999999999';
const PHONE_NUMBER = '+91-99999-99999';

export default function HeroSection() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%2C%20I%20need%20car%20repair%20service%20in%20Mahipalpur.`;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(/assets/generated/hero-bg.dim_1440x900.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      {/* Particle effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: `${6 + (i % 3) * 4}px`,
              height: `${6 + (i % 3) * 4}px`,
              background: i % 2 === 0 ? '#FFD700' : '#FF8C42',
              left: `${10 + i * 11}%`,
              top: `${20 + (i % 4) * 15}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.4}s`,
              opacity: 0.4,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="hero-animate hero-animate-1 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
          <span className="text-2xl">🔧</span>
          <span className="text-white/90 text-sm font-medium">Mahipalpur's #1 Car Repair Service</span>
          <span className="text-2xl">⭐</span>
        </div>

        {/* Main Headline */}
        <h1 className="hero-animate hero-animate-2 text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-4 font-heading">
          Car Repair in{' '}
          <span
            className="relative inline-block"
            style={{ color: '#FFD700' }}
          >
            Mahipalpur
            <span
              className="absolute bottom-0 left-0 h-1 rounded-full"
              style={{
                background: 'linear-gradient(90deg, #FFD700, #FF8C42)',
                animation: 'underlineWipe 1s ease 0.8s forwards',
                width: '0%',
              }}
            />
          </span>
        </h1>

        {/* Tagline */}
        <p className="hero-animate hero-animate-3 text-lg md:text-2xl text-white/85 mb-3 font-medium">
          Fast • Reliable • Affordable
        </p>
        <p className="hero-animate hero-animate-3 text-base md:text-lg text-white/70 mb-8 max-w-2xl mx-auto">
          Expert mechanics at your doorstep — AC repair, engine service, tyre change & more. Available 7 days a week.
        </p>

        {/* CTA Buttons */}
        <div className="hero-animate hero-animate-4 flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg text-black shadow-lg hover:scale-105 active:scale-95 transition-transform"
            style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C42)' }}
          >
            <MessageCircle size={22} />
            Book on WhatsApp
          </a>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg text-white border-2 border-white/40 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Phone size={22} />
            Call Now
          </a>
        </div>

        {/* Stats Row */}
        <div className="hero-animate hero-animate-5 flex flex-wrap justify-center gap-6 md:gap-10">
          {[
            { icon: <Users size={20} />, value: '500+', label: 'Happy Customers' },
            { icon: <Clock size={20} />, value: '30 min', label: 'Response Time' },
            { icon: <Star size={20} />, value: '4.9★', label: 'Average Rating' },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-2 text-white/90">
              <span style={{ color: '#FFD700' }}>{stat.icon}</span>
              <div className="text-left">
                <div className="font-bold text-lg leading-tight">{stat.value}</div>
                <div className="text-xs text-white/60">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
        <ChevronDown size={32} className="text-white/50" />
      </div>
    </section>
  );
}
