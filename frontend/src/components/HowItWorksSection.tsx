import { MessageCircle, MapPin, CheckCircle } from 'lucide-react';
import { useFadeIn } from '../hooks/useFadeIn';

const STEPS = [
  {
    number: '1',
    icon: MessageCircle,
    title: 'Book via WhatsApp',
    description: 'Send us a message on WhatsApp with your issue. Takes less than 30 seconds.',
    color: '#FFD700',
  },
  {
    number: '2',
    icon: MapPin,
    title: 'Mechanic Arrives in 10 Min',
    description: 'A verified local mechanic is dispatched immediately to your doorstep.',
    color: '#FF8C42',
  },
  {
    number: '3',
    icon: CheckCircle,
    title: 'Problem Solved',
    description: 'Work done, you pay only after you are satisfied. Cash on delivery.',
    color: '#FFD700',
  },
];

export default function HowItWorksSection() {
  const { ref, isVisible } = useFadeIn(0.1);

  return (
    <section
      id="how-it-works"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-16 px-4 sm:px-6 lg:px-8 fade-in-section ${isVisible ? 'is-visible' : ''}`}
      style={{ backgroundColor: '#0d0d0d' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-4"
            style={{
              background: 'rgba(255,140,66,0.1)',
              color: '#FF8C42',
              border: '1px solid rgba(255,140,66,0.2)',
            }}
          >
            Simple Process
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white">
            How It{' '}
            <span style={{ color: '#FFD700' }}>Works</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative flex md:flex-col items-start md:items-center gap-5 md:gap-0 flex-1">
                {/* Connector line (desktop) */}
                {i < STEPS.length - 1 && (
                  <div
                    className="hidden md:block absolute top-10 left-1/2 w-full h-px"
                    style={{
                      background: 'linear-gradient(90deg, rgba(255,215,0,0.4), rgba(255,140,66,0.2))',
                      zIndex: 0,
                    }}
                  />
                )}
                {/* Connector line (mobile) */}
                {i < STEPS.length - 1 && (
                  <div
                    className="md:hidden absolute left-5 top-16 w-px h-full"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,215,0,0.4), rgba(255,140,66,0.2))',
                      zIndex: 0,
                    }}
                  />
                )}

                {/* Icon circle */}
                <div className="relative z-10 flex-shrink-0 md:mb-5">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      background: `radial-gradient(circle, ${step.color}22 0%, ${step.color}08 100%)`,
                      border: `2px solid ${step.color}40`,
                    }}
                  >
                    <Icon size={32} style={{ color: step.color }} strokeWidth={1.8} />
                  </div>
                  {/* Number badge */}
                  <div
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
                    style={{
                      background: `linear-gradient(135deg, #FFD700, #FF8C42)`,
                      color: '#0d0d0d',
                    }}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Text */}
                <div className="md:text-center md:px-4 relative z-10">
                  <h3 className="text-white font-bold text-base mb-1">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
