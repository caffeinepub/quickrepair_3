import { useFadeIn } from '../hooks/useFadeIn';
import { Clock, Shield, ThumbsUp, MapPin } from 'lucide-react';

const highlights = [
  {
    icon: Clock,
    title: '10-Minute Response',
    description: 'Our technicians reach your doorstep within 10 minutes of booking — emergency mechanic near me, available 24/7.',
  },
  {
    icon: Shield,
    title: 'Verified Professionals',
    description: 'All our mechanics are background-verified and trained experts. Trusted plumbing service Mahipalpur you can rely on.',
  },
  {
    icon: ThumbsUp,
    title: 'Transparent Pricing',
    description: 'Fixed prices with no hidden charges — from plumber charges in Mahipalpur to AC repair cost Aerocity, what you see is what you pay.',
  },
  {
    icon: MapPin,
    title: 'Local Coverage',
    description: 'Serving Mahipalpur, Aerocity, Vasant Kunj, RK Puram, Rangpuri, Nagal Dewat, and Mahipalpur Extension.',
  },
];

export default function AboutSection() {
  const { ref, isVisible } = useFadeIn();

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-20 px-4 sm:px-6 lg:px-8 fade-in-section ${isVisible ? 'is-visible' : ''}`}
      style={{ backgroundColor: '#111111' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div>
            <span
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-4"
              style={{
                background: 'rgba(255,215,0,0.1)',
                color: '#FFD700',
                border: '1px solid rgba(255,215,0,0.2)',
              }}
            >
              About Us
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Delhi's Fastest{' '}
              <span style={{ color: '#FF8C42' }}>Home Repair</span>{' '}
              Service
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              <strong className="text-white">QuickRepair</strong> was founded with one mission: to make home maintenance Mahipalpur fast, affordable, and stress-free. We are the best plumber in Mahipalpur Delhi, a trusted 24 hour electrician Mahipalpur, and your go-to for urgent AC repair Aerocity.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              We understand that a leaking tap or a faulty switchboard can't wait. That's why our team of skilled professionals — including an affordable electrician near Mahipalpur Extension and a local mechanic for home repairs near Vasant Kunj — is always on standby, ready to reach your doorstep in just <strong className="text-white">10 minutes</strong>.
            </p>
            <p className="text-gray-400 leading-relaxed">
              From plumbing and electrical work to AC repairs and general mechanics — we handle it all with professionalism, transparency, and a smile. No surprise bills, no delays. Serving Mahipalpur, Aerocity, RK Puram, Rangpuri, Nagal Dewat, and beyond.
            </p>

            {/* Working hours badge */}
            <div
              className="inline-flex items-center gap-3 mt-8 px-5 py-3 rounded-xl"
              style={{
                background: 'rgba(255,140,66,0.1)',
                border: '1px solid rgba(255,140,66,0.2)',
              }}
            >
              <Clock className="w-5 h-5" style={{ color: '#FF8C42' }} />
              <div>
                <div className="text-white font-semibold text-sm">Working Hours</div>
                <div className="text-gray-400 text-xs">8:00 AM – 8:00 PM, Every Day</div>
              </div>
            </div>
          </div>

          {/* Right: Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #252525',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,140,66,0.15))',
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: '#FFD700' }} />
                </div>
                <h3 className="text-white font-bold text-sm mb-1">{title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
