import { ArrowLeft, ScrollText } from 'lucide-react';

const policies = [
  {
    emoji: '⏱️',
    title: '10 Minute Response — What It Really Means',
    points: [
      'Our goal is to reach your doorstep within 10 minutes of booking confirmation.',
      'This applies to all service areas: Mahipalpur Extension, Mahipalpur Village, Aerocity, Vasant Kunj, Rangpuri, Nagal Dewat.',
      'However, please note: Due to traffic, distance, or unforeseen circumstances, it may take 20–30 minutes in some cases. We\'ll always keep you informed via WhatsApp or call.',
      'We prioritize your time and do our best to reach as quickly as possible.',
    ],
  },
  {
    emoji: '✅',
    title: 'Service Guarantee',
    points: [
      'All mechanics are verified and trained.',
      'If you\'re not satisfied with the service, we\'ll send another mechanic at no extra cost.',
      'Full refund if problem not resolved (terms apply).',
    ],
  },
  {
    emoji: '💰',
    title: 'Pricing Policy',
    points: [
      'Fixed prices — no hidden charges.',
      'Extra charges only if additional work is required (customer will be informed beforehand).',
      'Payment only after work is done (Cash on Delivery).',
    ],
  },
  {
    emoji: '📍',
    title: 'Service Area Limit',
    points: [
      'We currently serve only the areas listed on our website.',
      'If you\'re outside these areas, we may not be able to serve you immediately.',
    ],
  },
  {
    emoji: '⭐',
    title: 'Customer Feedback',
    points: [
      'Your feedback helps us improve.',
      'We may contact you after service to ask about your experience.',
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0d0d0d' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{ backgroundColor: '#0d0d0d', borderColor: '#1e1e1e' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-1">
            <span className="font-black text-xl" style={{ color: '#FFD700' }}>Quick</span>
            <span className="font-black text-xl" style={{ color: '#FF8C42' }}>Repair</span>
          </a>
          <a
            href="/"
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>
        </div>
      </header>

      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5"
              style={{
                background: 'rgba(255,140,66,0.12)',
                border: '1px solid rgba(255,140,66,0.25)',
              }}
            >
              <ScrollText className="w-8 h-8" style={{ color: '#FF8C42' }} />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-white mb-3">
              📜 Terms and Policies
            </h1>
            <p className="text-gray-400 text-base max-w-xl mx-auto">
              Please read these terms carefully before booking a service with QuickRepair.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-6">
            {policies.map((policy, index) => (
              <div
                key={index}
                className="rounded-2xl p-6 sm:p-8"
                style={{
                  backgroundColor: '#161616',
                  border: '1px solid #252525',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                }}
              >
                {/* Section Title */}
                <div className="flex items-start gap-3 mb-5">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{policy.emoji}</span>
                  <h2
                    className="text-lg sm:text-xl font-bold leading-snug"
                    style={{ color: '#FFD700' }}
                  >
                    {policy.title}
                  </h2>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-3">
                  {policy.points.map((point, pIndex) => (
                    <li key={pIndex} className="flex items-start gap-3">
                      <span
                        className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                        style={{ backgroundColor: '#FF8C42' }}
                      />
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                        {point}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div
            className="mt-8 rounded-2xl px-6 py-5 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(255,215,0,0.08), rgba(255,140,66,0.08))',
              border: '1px solid rgba(255,215,0,0.2)',
            }}
          >
            <p className="text-base font-semibold" style={{ color: '#FFD700' }}>
              📌 By booking a service, you agree to these terms and policies.
            </p>
          </div>

          {/* Back to Home Button */}
          <div className="text-center mt-10 mb-6">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base transition-all duration-300 hover:scale-[1.03] active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #FF8C42, #FFD700)',
                color: '#0d0d0d',
                boxShadow: '0 6px 24px rgba(255,140,66,0.4)',
              }}
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </a>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer
        className="border-t py-6 text-center"
        style={{ borderColor: '#1e1e1e', backgroundColor: '#0d0d0d' }}
      >
        <p className="text-gray-600 text-xs">
          © {new Date().getFullYear()} QuickRepair. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
