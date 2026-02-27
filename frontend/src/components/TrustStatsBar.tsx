import { Users, Clock, Star } from 'lucide-react';
import { useFadeIn } from '../hooks/useFadeIn';

const STATS = [
  {
    icon: Users,
    value: '500+',
    label: 'Happy Customers',
    color: '#FFD700',
  },
  {
    icon: Clock,
    value: '10-Min',
    label: 'Response Time',
    color: '#FF8C42',
  },
  {
    icon: Star,
    value: '5★',
    label: 'Rated Service',
    color: '#FFD700',
  },
];

export default function TrustStatsBar() {
  const { ref, isVisible } = useFadeIn(0.1);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-5 px-4 fade-in-section ${isVisible ? 'is-visible' : ''}`}
      style={{
        background: 'linear-gradient(90deg, rgba(255,215,0,0.06) 0%, rgba(255,140,66,0.06) 100%)',
        borderTop: '1px solid rgba(255,215,0,0.1)',
        borderBottom: '1px solid rgba(255,215,0,0.1)',
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0"
                  style={{ backgroundColor: `${stat.color}18` }}
                >
                  <Icon size={20} style={{ color: stat.color }} strokeWidth={2} />
                </div>
                <div>
                  <p className="font-black text-xl leading-none" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5">{stat.label}</p>
                </div>
                {i < STATS.length - 1 && (
                  <div
                    className="hidden sm:block w-px h-8 ml-6"
                    style={{ backgroundColor: 'rgba(255,215,0,0.15)' }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
