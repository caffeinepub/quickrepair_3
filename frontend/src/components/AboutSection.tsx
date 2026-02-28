import React from 'react';
import { Clock, Shield, DollarSign, MapPin } from 'lucide-react';
import { useFadeIn } from '../hooks/useFadeIn';

interface HighlightCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

function HighlightCard({ icon, title, description, index }: HighlightCardProps) {
  const { ref, isVisible } = useFadeIn();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`white-card white-card-hover rounded-2xl p-6 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-black"
        style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C42)' }}
      >
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2 font-heading">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export default function AboutSection() {
  const { ref, isVisible } = useFadeIn();

  const highlights = [
    {
      icon: <Clock size={22} />,
      title: '30-Min Response',
      description: 'Our mechanics reach you within 30 minutes anywhere in Mahipalpur and surrounding areas.',
    },
    {
      icon: <Shield size={22} />,
      title: 'Verified Experts',
      description: 'All our mechanics are background-verified, trained professionals with 5+ years of experience.',
    },
    {
      icon: <DollarSign size={22} />,
      title: 'Fixed Pricing',
      description: 'No hidden charges. Get upfront pricing before we start any work on your vehicle.',
    },
    {
      icon: <MapPin size={22} />,
      title: 'Wide Coverage',
      description: 'Serving Mahipalpur, Dwarka, Vasant Kunj, Kapashera, and all nearby areas.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-4">
            <span className="text-sm font-medium" style={{ color: '#FFD700' }}>Why Choose Us</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white font-heading mb-4">
            Delhi's Most{' '}
            <span style={{ color: '#FFD700' }}>Trusted</span>{' '}
            Car Repair
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            We combine speed, expertise, and transparency to deliver the best car repair experience in Mahipalpur.
          </p>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((h, i) => (
            <HighlightCard key={i} icon={h.icon} title={h.title} description={h.description} index={i} />
          ))}
        </div>

        {/* Company Description */}
        <div
          className={`mt-16 white-card rounded-3xl p-8 md:p-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 font-heading mb-4">
                About QuickRepair
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                QuickRepair was founded with a simple mission: make car repair fast, affordable, and stress-free for everyone in Mahipalpur and Delhi NCR.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our team of certified mechanics comes to your location — whether you're at home, office, or stuck on the road. No need to visit a garage or wait for hours.
              </p>
              <div className="flex flex-wrap gap-3">
                {['ISO Certified', '5-Star Rated', '500+ Customers', 'Since 2019'].map((badge) => (
                  <span
                    key={badge}
                    className="px-3 py-1.5 rounded-full text-xs font-bold text-black"
                    style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C42)' }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '500+', label: 'Happy Customers' },
                { value: '4.9★', label: 'Average Rating' },
                { value: '30 min', label: 'Avg Response Time' },
                { value: '7 Days', label: 'Available Weekly' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100"
                >
                  <div className="text-2xl font-black font-heading mb-1" style={{ color: '#FF8C42' }}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-xs font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
