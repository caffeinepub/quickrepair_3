import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useFadeIn } from '../hooks/useFadeIn';

const faqs = [
  {
    question: 'How quickly can a mechanic reach me?',
    answer: 'Our mechanics typically arrive within 30 minutes of your booking. In peak hours, it may take up to 45 minutes. We always keep you updated via WhatsApp.',
  },
  {
    question: 'What areas do you cover?',
    answer: 'We cover Mahipalpur, Dwarka, Vasant Kunj, Kapashera, Palam, Uttam Nagar, Janakpuri, Rajouri Garden, and surrounding areas in Delhi NCR.',
  },
  {
    question: 'Are your mechanics certified?',
    answer: 'Yes, all our mechanics are background-verified and have 5+ years of professional experience. They are trained to handle all major car brands and models.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept cash, UPI (GPay, PhonePe, Paytm), and all major debit/credit cards. Payment is collected only after the work is completed.',
  },
  {
    question: 'Do you provide a warranty on repairs?',
    answer: 'Yes, we provide a 30-day warranty on all repair work and a 6-month warranty on parts replaced. If the same issue recurs, we fix it for free.',
  },
  {
    question: 'Can you repair all car brands?',
    answer: 'We service all major car brands including Maruti Suzuki, Hyundai, Honda, Toyota, Tata, Mahindra, Ford, Volkswagen, and more.',
  },
  {
    question: 'What if the repair takes longer than expected?',
    answer: 'We always give you an upfront time estimate. If the repair takes longer, we inform you immediately and get your approval before proceeding.',
  },
  {
    question: 'Is there a call-out or inspection fee?',
    answer: 'No, there is no call-out fee. The inspection is free. You only pay for the actual repair work done.',
  },
  {
    question: 'How do I book a service?',
    answer: 'Simply send us a WhatsApp message or call us. Share your car issue and location, and we will dispatch a mechanic to you right away.',
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

function FAQItem({ question, answer, index }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  const { ref, isVisible } = useFadeIn();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`white-card rounded-2xl overflow-hidden transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 pr-4">{question}</span>
        <ChevronDown
          size={20}
          className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          style={{ color: '#FF8C42' }}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-gray-100">
          <p className="text-gray-600 text-sm leading-relaxed pt-4">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  const { ref, isVisible } = useFadeIn();

  return (
    <section id="faq" className="py-20 bg-surface-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-4">
            <span className="text-sm font-medium" style={{ color: '#FFD700' }}>FAQ</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white font-heading mb-4">
            Frequently Asked{' '}
            <span style={{ color: '#FFD700' }}>Questions</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Everything you need to know about our car repair service.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
