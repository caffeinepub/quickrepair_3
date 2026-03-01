import { useState } from 'react';
import { Star, MessageSquare, Send, Loader2 } from 'lucide-react';
import { useFadeIn } from '../hooks/useFadeIn';
import { useGetAllFeedback, useGetAverageRating, useAddFeedback } from '../hooks/useQueries';

const SAMPLE_REVIEWS = [
  {
    name: 'Rahul Sharma',
    stars: 5,
    message: 'Excellent service! The electrician arrived within 30 minutes and fixed the wiring issue perfectly. Very professional and affordable.',
    timestamp: BigInt(0),
    isSample: true,
  },
  {
    name: 'Priya Mehta',
    stars: 5,
    message: 'Got my AC repaired at a very reasonable price. The technician was knowledgeable and explained everything clearly. Highly recommend QuickRepair!',
    timestamp: BigInt(1),
    isSample: true,
  },
  {
    name: 'Amit Verma',
    stars: 5,
    message: 'Booked a plumber for a pipe leak and he came the same day. Fixed it quickly with no mess. Will definitely use again!',
    timestamp: BigInt(2),
    isSample: true,
  },
];

function StarDisplay({ count, size = 18 }: { count: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          fill={i <= count ? '#FFD700' : 'transparent'}
          stroke={i <= count ? '#FFD700' : '#555'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function StarSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110 active:scale-95 focus:outline-none"
          aria-label={`Rate ${i} star${i > 1 ? 's' : ''}`}
        >
          <Star
            size={28}
            fill={i <= (hovered || value) ? '#FFD700' : 'transparent'}
            stroke={i <= (hovered || value) ? '#FFD700' : '#666'}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewCard({
  name,
  stars,
  message,
  delay = 0,
}: {
  name: string;
  stars: number;
  message: string;
  delay?: number;
}) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1"
      style={{
        backgroundColor: '#161616',
        border: '1px solid rgba(255,215,0,0.1)',
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #FFD700, #FF8C42)',
              color: '#0d0d0d',
            }}
          >
            {initials}
          </div>
          <div>
            <p className="text-white font-semibold text-sm">{name}</p>
            <StarDisplay count={stars} size={14} />
          </div>
        </div>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed">{message}</p>
    </div>
  );
}

export default function FeedbackSection() {
  const { ref, isVisible } = useFadeIn();

  const { data: liveReviews = [], isLoading: reviewsLoading } = useGetAllFeedback();
  const { data: avgRating = 0 } = useGetAverageRating();
  const addFeedback = useAddFeedback();

  const [name, setName] = useState('');
  const [stars, setStars] = useState(0);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const allReviews = [
    ...liveReviews.map((r) => ({ ...r, isSample: false })),
    ...SAMPLE_REVIEWS,
  ];

  const totalCount = allReviews.length;
  const computedAvg =
    liveReviews.length > 0
      ? avgRating
      : SAMPLE_REVIEWS.reduce((s, r) => s + r.stars, 0) / SAMPLE_REVIEWS.length;

  const displayAvg = computedAvg.toFixed(1);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || stars === 0 || !message.trim()) return;

    await addFeedback.mutateAsync({ name: name.trim(), stars, message: message.trim() });
    setName('');
    setStars(0);
    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <section
      id="feedback"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-20 px-4 sm:px-6 lg:px-8 fade-in-section ${isVisible ? 'is-visible' : ''}`}
      style={{ backgroundColor: '#111111' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-4"
            style={{
              background: 'rgba(255,215,0,0.1)',
              color: '#FFD700',
              border: '1px solid rgba(255,215,0,0.2)',
            }}
          >
            Customer Reviews
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            What Our{' '}
            <span style={{ color: '#FFD700' }}>Customers</span> Say
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Real feedback from real customers. We take pride in every repair we do.
          </p>
        </div>

        {/* Aggregate Stats */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 p-6 rounded-2xl mx-auto max-w-md"
          style={{
            backgroundColor: '#161616',
            border: '1px solid rgba(255,215,0,0.15)',
          }}
        >
          <div className="text-center">
            <p
              className="text-5xl font-black"
              style={{ color: '#FFD700' }}
            >
              {displayAvg}
            </p>
            <StarDisplay count={Math.round(computedAvg)} size={20} />
            <p className="text-gray-500 text-xs mt-1">Average Rating</p>
          </div>
          <div
            className="hidden sm:block w-px h-16"
            style={{ backgroundColor: 'rgba(255,215,0,0.15)' }}
          />
          <div className="text-center">
            <p
              className="text-5xl font-black"
              style={{ color: '#FF8C42' }}
            >
              {totalCount}
            </p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <MessageSquare size={14} style={{ color: '#FF8C42' }} />
              <p className="text-gray-500 text-xs">Total Reviews</p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {reviewsLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-5 animate-pulse"
                  style={{
                    backgroundColor: '#161616',
                    border: '1px solid rgba(255,215,0,0.08)',
                    height: '140px',
                  }}
                />
              ))
            : allReviews.map((review, i) => (
                <ReviewCard
                  key={`${review.name}-${i}`}
                  name={review.name}
                  stars={review.stars}
                  message={review.message}
                  delay={i * 60}
                />
              ))}
        </div>

        {/* Submission Form */}
        <div
          className="max-w-2xl mx-auto rounded-2xl p-6 sm:p-8"
          style={{
            backgroundColor: '#161616',
            border: '1px solid rgba(255,140,66,0.2)',
          }}
        >
          <h3 className="text-white font-bold text-xl mb-1">Share Your Experience</h3>
          <p className="text-gray-500 text-sm mb-6">
            Had a repair done? Let others know how it went!
          </p>

          {submitted && (
            <div
              className="mb-5 px-4 py-3 rounded-xl text-sm font-medium"
              style={{
                backgroundColor: 'rgba(37,211,102,0.1)',
                border: '1px solid rgba(37,211,102,0.25)',
                color: '#25D366',
              }}
            >
              ✅ Thank you! Your review has been submitted successfully.
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                required
                className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-600 outline-none transition-all duration-200 focus:ring-2"
                style={{
                  backgroundColor: '#0d0d0d',
                  border: '1px solid rgba(255,255,255,0.1)',
                  // @ts-ignore
                  '--tw-ring-color': 'rgba(255,215,0,0.4)',
                }}
              />
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
                Your Rating
              </label>
              <StarSelector value={stars} onChange={setStars} />
              {stars === 0 && (
                <p className="text-gray-600 text-xs mt-1">Click a star to rate</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
                Your Feedback
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your experience with QuickRepair..."
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-600 outline-none transition-all duration-200 focus:ring-2 resize-none"
                style={{
                  backgroundColor: '#0d0d0d',
                  border: '1px solid rgba(255,255,255,0.1)',
                  // @ts-ignore
                  '--tw-ring-color': 'rgba(255,215,0,0.4)',
                }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={addFeedback.isPending || !name.trim() || stars === 0 || !message.trim()}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{
                background: 'linear-gradient(135deg, #FFD700, #FF8C42)',
                color: '#0d0d0d',
              }}
            >
              {addFeedback.isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  <Send size={16} />
                  Submit Review
                </>
              )}
            </button>

            {addFeedback.isError && (
              <p className="text-red-400 text-xs text-center">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
