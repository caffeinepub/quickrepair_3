import React from 'react';
import { Phone, Mail, Clock, MapPin, MessageCircle } from 'lucide-react';
import { useFadeIn } from '../hooks/useFadeIn';

const WHATSAPP_NUMBER = '919999999999';
const PHONE_NUMBER = '+91-99999-99999';
const EMAIL = 'quickrepair@gmail.com';

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
  index: number;
}

function ContactCard({ icon, title, value, href, index }: ContactCardProps) {
  const { ref, isVisible } = useFadeIn();

  const inner = (
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
      <div className="text-gray-500 text-sm font-medium mb-1">{title}</div>
      <div className="text-gray-900 font-bold text-lg">{value}</div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return inner;
}

export default function ContactSection() {
  const { ref, isVisible } = useFadeIn();
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%2C%20I%20need%20car%20repair%20service.`;

  const serviceAreas = [
    'Mahipalpur', 'Dwarka', 'Vasant Kunj', 'Kapashera',
    'Palam', 'Uttam Nagar', 'Janakpuri', 'Rajouri Garden',
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-4">
            <span className="text-sm font-medium" style={{ color: '#FFD700' }}>Get In Touch</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white font-heading mb-4">
            Contact{' '}
            <span style={{ color: '#FFD700' }}>Us</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Available 7 days a week. Reach out via WhatsApp, phone, or email.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <ContactCard
            icon={<Phone size={22} />}
            title="Phone"
            value={PHONE_NUMBER}
            href={`tel:${PHONE_NUMBER}`}
            index={0}
          />
          <ContactCard
            icon={<Mail size={22} />}
            title="Email"
            value={EMAIL}
            href={`mailto:${EMAIL}`}
            index={1}
          />
          <ContactCard
            icon={<Clock size={22} />}
            title="Working Hours"
            value="Mon–Sun: 8 AM – 10 PM"
            index={2}
          />
        </div>

        {/* Service Areas + WhatsApp Panel */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Service Areas */}
          <div className="white-card rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-black"
                style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C42)' }}
              >
                <MapPin size={18} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 font-heading">Service Areas</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200"
                >
                  📍 {area}
                </span>
              ))}
            </div>
          </div>

          {/* WhatsApp Panel */}
          <div
            className="rounded-2xl p-8 flex flex-col justify-center items-center text-center"
            style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FF8C42 100%)' }}
          >
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-2xl font-black text-black font-heading mb-2">Book Instantly</h3>
            <p className="text-black/70 mb-6">
              Send us a WhatsApp message and get a mechanic at your door within 30 minutes.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-black/80 transition-all hover:scale-105"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
