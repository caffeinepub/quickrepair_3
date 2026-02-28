import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useFadeIn } from '../hooks/useFadeIn';

const WHATSAPP_NUMBER = '919999999999';

interface StepCardProps {
  step: number;
  icon: string;
  title: string;
  description: string;
  index: number;
}

function StepCard({ step, icon, title, description, index }: StepCardProps) {
  const { ref, isVisible } = useFadeIn();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`white-card white-card-hover rounded-2xl p-8 text-center transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Step Number */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-black font-black text-lg mx-auto mb-4"
        style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C42)' }}
      >
        {step}
      </div>

      {/* Icon */}
      <div className="text-4xl mb-4">{icon}</div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 font-heading mb-3">{title}</h3>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export default function HowItWorksSection() {
  const { ref, isVisible } = useFadeIn();
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%2C%20I%20need%20car%20repair%20service.`;

  const steps = [
    {
      icon: '📱',
      title: 'Book Your Service',
      description: 'Send us a WhatsApp message or call us. Tell us your car issue and location in Mahipalpur.',
    },
    {
      icon: '🚗',
      title: 'Mechanic Arrives',
      description: 'Our verified mechanic reaches your location within 30 minutes with all necessary tools.',
    },
    {
      icon: '✅',
      title: 'Problem Solved',
      description: 'Get your car repaired on the spot. Pay only after the work is done to your satisfaction.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-4">
            <span className="text-sm font-medium" style={{ color: '#FFD700' }}>Simple Process</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white font-heading mb-4">
            How It{' '}
            <span style={{ color: '#FFD700' }}>Works</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Getting your car repaired has never been easier. Just 3 simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <StepCard
                key={i}
                step={i + 1}
                icon={step.icon}
                title={step.title}
                description={step.description}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg text-black shadow-lg hover:scale-105 active:scale-95 transition-transform"
            style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C42)' }}
          >
            <MessageCircle size={22} />
            Get Started Now
          </a>
        </div>
      </div>
    </section>
  );
}
