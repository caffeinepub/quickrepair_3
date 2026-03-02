import { useEffect, useState } from 'react';
import { Clock, MapPin, Star } from 'lucide-react';

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0d0d0d' }}
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/generated/hero-bg.dim_1440x900.png)',
        }}
      />
      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.75) 50%, rgba(13,13,13,0.88) 100%)',
        }}
      />

      {/* Decorative glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FF8C42, transparent)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{
            background: 'rgba(255,140,66,0.15)',
            border: '1px solid rgba(255,140,66,0.4)',
            color: '#FF8C42',
            transitionDelay: '0ms',
          }}
        >
          <Clock className="w-4 h-4" />
          <span>10-Minute Response Guaranteed</span>
        </div>

        {/* Main heading */}
        <h1
          className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '150ms' }}
        >
          <span style={{ color: '#FFD700' }}>Quick</span>
          <span style={{ color: '#FF8C42' }}>Repair</span>
        </h1>

        {/* Tagline */}
        <p
          className={`text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-3 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '250ms' }}
        >
          10 Minute Service at Your Doorstep
        </p>

        <p
          className={`text-base sm:text-lg text-gray-400 mb-8 max-w-xl mx-auto transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '350ms' }}
        >
          Professional home repair services in Mahipalpur, Delhi. Fast, reliable, and affordable.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '450ms' }}
        >
          <button
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #FF8C42, #FFD700)',
              color: '#0d0d0d',
              boxShadow: '0 8px 30px rgba(255,140,66,0.4)',
            }}
          >
            Book Online Now
          </button>

          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              border: '2px solid rgba(255,215,0,0.5)',
              color: '#FFD700',
              backgroundColor: 'rgba(255,215,0,0.08)',
            }}
          >
            View Services
          </a>
        </div>

        {/* Stats */}
        <div
          className={`flex flex-wrap justify-center gap-6 sm:gap-10 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '550ms' }}
        >
          {[
            { icon: Clock, value: '10 Min', label: 'Response Time' },
            { icon: Star, value: '5 Services', label: 'Available' },
            { icon: MapPin, value: '6 Areas', label: 'Covered' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-2 text-center">
              <Icon className="w-5 h-5" style={{ color: '#FF8C42' }} />
              <div className="text-left">
                <div className="text-white font-bold text-sm">{value}</div>
                <div className="text-gray-500 text-xs">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '700ms' }}
      >
        <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
        <div
          className="w-0.5 h-8 rounded-full"
          style={{
            background: 'linear-gradient(to bottom, #FF8C42, transparent)',
            animation: 'pulse 2s infinite',
          }}
        />
      </div>
    </section>
  );
}
