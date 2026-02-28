import React, { useState } from 'react';
import { Star, Send, User } from 'lucide-react';
import { useFadeIn } from '../hooks/useFadeIn';
import { useGetAllFeedback, useAddFeedback } from '../hooks/useQueries';
import type { FeedbackItem } from '../hooks/useQueries';

interface ReviewCardProps {
  review: FeedbackItem;
  index: number;
}

function ReviewCard({ review, index }: ReviewCardProps) {
  const { ref, isVisible } = useFadeIn();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`white-card white-card-hover rounded-2xl p-6 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < review.stars ? '#FFD700' : 'none'}
            stroke={i < review.stars ? '#FFD700' : '#d1d5db'}
          />
        ))}
      </div>

      {/* Message */}
      <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">"{review.message}"</p>

      {/* Author */}
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-black text-xs font-bold"
          style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C42)' }}
        >
          {review.name[0]?.toUpperCase() || 'U'}
        </div>
        <span className="text-gray-900 font-semibold text-sm">{review.name}</span>
      </div>
    </div>
  );
}

export default function FeedbackSection() {
  const { ref, isVisible } = useFadeIn();
  const { data: feedbackList = [] } = useGetAllFeedback();
  const addFeedback = useAddFeedback();

  const [name, setName] = useState('');
  const [stars, setStars] = useState(5);
  const [message, setMessage] = useState('');
  const [hoverStar, setHoverStar] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    try {
      await addFeedback.mutateAsync({ name: name.trim(), stars, message: message.trim() });
      setSubmitted(true);
      setName('');
      setStars(5);
      setMessage('');
      setTimeout(() => setSubmitted(false), 4000);
    } catch {
      // handle error silently
    }
  };

  const avgRating = feedbackList.length
    ? (feedbackList.reduce((sum, f) => sum + f.stars, 0) / feedbackList.length).toFixed(1)
    : '4.9';

  return (
    <section id="feedback" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-4">
            <span className="text-sm font-medium" style={{ color: '#FFD700' }}>Customer Reviews</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white font-heading mb-4">
            What Our{' '}
            <span style={{ color: '#FFD700' }}>Customers</span>{' '}
            Say
          </h2>
          <p className="text-white/60 text-lg">
            {feedbackList.length > 0
              ? `${feedbackList.length} reviews · ${avgRating} average rating`
              : 'Be the first to share your experience!'}
          </p>
        </div>

        {/* Reviews Grid */}
        {feedbackList.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {feedbackList.slice(0, 6).map((feedback, i) => (
              <ReviewCard key={Number(feedback.id)} review={feedback} index={i} />
            ))}
          </div>
        )}

        {/* Submit Review Form */}
        <div className="max-w-2xl mx-auto">
          <div className="white-card rounded-3xl p-8">
            <h3 className="text-2xl font-black text-gray-900 font-heading mb-2">Share Your Experience</h3>
            <p className="text-gray-500 text-sm mb-6">Your feedback helps us improve our service.</p>

            {submitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🎉</div>
                <p className="text-gray-900 font-bold text-lg">Thank you for your review!</p>
                <p className="text-gray-500 text-sm mt-1">Your feedback has been submitted successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-1.5">Your Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:border-transparent placeholder:text-gray-400"
                      style={{ '--tw-ring-color': '#FFD700' } as React.CSSProperties}
                      required
                    />
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-1.5">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setStars(s)}
                        onMouseEnter={() => setHoverStar(s)}
                        onMouseLeave={() => setHoverStar(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          size={28}
                          fill={(hoverStar || stars) >= s ? '#FFD700' : 'none'}
                          stroke={(hoverStar || stars) >= s ? '#FFD700' : '#d1d5db'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-1.5">Your Review</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your experience..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:border-transparent resize-none placeholder:text-gray-400"
                    style={{ '--tw-ring-color': '#FFD700' } as React.CSSProperties}
                    required
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={addFeedback.isPending}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-black transition-all hover:scale-105 active:scale-95 disabled:opacity-60 disabled:scale-100"
                  style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C42)' }}
                >
                  {addFeedback.isPending ? (
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={16} />
                      Submit Review
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
