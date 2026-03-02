import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useFadeIn } from '../hooks/useFadeIn';

const FAQS = [
  {
    question: 'How quickly will the mechanic arrive?',
    answer:
      'Our mechanics typically arrive within 10 minutes of booking. We have a network of verified local professionals stationed across Mahipalpur, Aerocity, Vasant Kunj, RK Puram, and nearby areas to ensure the fastest possible response — whether it\'s an emergency plumber near me or a 24 hour electrician Mahipalpur.',
  },
  {
    question: 'How do I book a service?',
    answer:
      'Booking is simple — just tap the "Book on WhatsApp" button, send us a message describing your issue, and we will dispatch the nearest available mechanic immediately. Need a same day plumber Mahipalpur Extension or urgent AC repair Aerocity? We\'re ready. No app download or registration required.',
  },
  {
    question: 'What are the service charges?',
    answer:
      'Our charges are transparent and fixed: Plumber ₹499 (plumber charges in Mahipalpur), Electrician ₹299 (electrician rates near me), Fan/Cooler Repair ₹199 (fan repair price), AC Repair ₹479 (AC repair cost Aerocity), and General Mechanic ₹399 (mechanic service charges). There are no hidden charges — you only pay after the work is done.',
  },
  {
    question: 'My tap is leaking — can you fix it today?',
    answer:
      'Absolutely! Leaking tap repair Mahipalpur is one of our most common requests. We also handle low water pressure solution, pipe bursts, and drainage issues. Our plumber will arrive within 10 minutes and fix it on the spot.',
  },
  {
    question: 'My AC is not cooling — what should I do?',
    answer:
      'If your AC is not cooling Aerocity or anywhere in our service area, call us immediately. We handle AC gas refill Rangpuri, general servicing, and all cooling issues. Our 24 hour AC repair service Aerocity ensures you\'re never left in the heat.',
  },
  {
    question: 'My switchboard is not working — is it an emergency?',
    answer:
      'Yes, a switch board not working or circuit breaker tripping can be a safety hazard. Our 24 hour electrician Mahipalpur is available for such electrical emergencies. We also handle all electrical repair RK Puram and nearby areas.',
  },
  {
    question: 'My fan or cooler is not working properly — can you help?',
    answer:
      'Yes! Fan not working properly or cooler not throwing cool air are common issues we fix daily. We offer fan repair Mahipalpur Village, cooler repair Nagal Dewat, and all related services at affordable fan repair prices.',
  },
  {
    question: 'Do you accept cash on delivery (COD)?',
    answer:
      'Yes! We operate on a "Pay After Work" model. You pay only after the repair is completed and you are fully satisfied. We accept cash on delivery — no advance payment required.',
  },
  {
    question: 'Are your mechanics verified and trustworthy?',
    answer:
      'Absolutely. All our mechanics are background-checked, ID-verified, and trained professionals. We take safety seriously — every technician carries a verified ID card and is registered with QuickRepair before being dispatched.',
  },
  {
    question: 'Which areas do you serve?',
    answer:
      'We currently serve Mahipalpur, Mahipalpur Extension, Mahipalpur Village, Aerocity, Vasant Kunj, RK Puram, Rangpuri, and Nagal Dewat. We are expanding rapidly — contact us on WhatsApp to check availability in your area.',
  },
  {
    question: 'What are your working hours?',
    answer:
      'Our regular service hours are 8:00 AM to 8:00 PM, 7 days a week. For emergencies (water leaks, electrical faults, AC not cooling, etc.), we are available 24×7. Just message us on WhatsApp anytime.',
  },
  {
    question: 'What if I am not satisfied with the repair?',
    answer:
      'Customer satisfaction is our top priority. If you are not happy with the work, we will send another technician at no extra charge to fix the issue. We stand behind every repair we do.',
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: '#161616',
        border: isOpen ? '1px solid rgba(255,215,0,0.25)' : '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200"
        style={{ color: isOpen ? '#FFD700' : '#f0f0f0' }}
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-sm sm:text-base leading-snug">{question}</span>
        <ChevronDown
          size={20}
          className="flex-shrink-0 transition-transform duration-300"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            color: isOpen ? '#FFD700' : '#666',
          }}
        />
      </button>
      <div
        style={{
          maxHeight: isOpen ? '400px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.35s ease',
        }}
      >
        <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const { ref, isVisible } = useFadeIn(0.1);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <section
      id="faq"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-20 px-4 sm:px-6 lg:px-8 fade-in-section ${isVisible ? 'is-visible' : ''}`}
      style={{ backgroundColor: '#0d0d0d' }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-4"
            style={{
              background: 'rgba(255,215,0,0.1)',
              color: '#FFD700',
              border: '1px solid rgba(255,215,0,0.2)',
            }}
          >
            FAQ
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            Frequently Asked{' '}
            <span style={{ color: '#FFD700' }}>Questions</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Everything you need to know about QuickRepair services in Mahipalpur, Aerocity &amp; nearby areas.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-10 p-6 rounded-2xl text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255,215,0,0.07), rgba(255,140,66,0.07))',
            border: '1px solid rgba(255,215,0,0.15)',
          }}
        >
          <p className="text-white font-semibold mb-1">Still have questions?</p>
          <p className="text-gray-400 text-sm mb-4">
            Chat with us on WhatsApp — we reply in under 2 minutes.
          </p>
          <a
            href="https://wa.me/8447978940?text=Hi%2C%20I%20have%20a%20question%20about%20QuickRepair"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #FFD700, #FF8C42)',
              color: '#0d0d0d',
            }}
          >
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
