import React, { useRef, useEffect, useState } from 'react';
import { useCountUp } from '../hooks/useCountUp';

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  emoji: string;
  triggered: boolean;
}

function StatItem({ value, suffix, label, emoji, triggered }: StatItemProps) {
  const count = useCountUp(value, 2000, triggered);

  return (
    <div className="flex flex-col items-center text-center px-4 py-2">
      <span className="text-2xl mb-1">{emoji}</span>
      <div className="text-2xl md:text-3xl font-black font-heading" style={{ color: '#FFD700' }}>
        {count}{suffix}
      </div>
      <div className="text-white/70 text-xs md:text-sm font-medium mt-0.5">{label}</div>
    </div>
  );
}

export default function TrustStatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: 500, suffix: '+', label: 'Happy Customers', emoji: '😊' },
    { value: 30, suffix: ' min', label: 'Response Time', emoji: '⚡' },
    { value: 5, suffix: '★', label: 'Average Rating', emoji: '⭐' },
    { value: 7, suffix: ' days', label: 'Available Weekly', emoji: '📅' },
  ];

  return (
    <div
      ref={ref}
      className="bg-surface-100 border-y border-white/10 py-6"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-x-0 md:divide-x md:divide-white/10">
          {stats.map((stat, i) => (
            <StatItem
              key={i}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              emoji={stat.emoji}
              triggered={triggered}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
