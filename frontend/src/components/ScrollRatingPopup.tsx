import React, { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useScrollTimer } from '../hooks/useScrollTimer';
import { useAddFeedback } from '../hooks/useQueries';

const SCROLL_THRESHOLD_SECONDS = 15;
const SESSION_KEY = 'quickrepair_rated';

export default function ScrollRatingPopup() {
  const { identity } = useInternetIdentity();
  const { elapsedSeconds } = useScrollTimer();
  const addFeedback = useAddFeedback();

  const [name, setName] = useState('');
  const [stars, setStars] = useState(5);
  const [message, setMessage] = useState('');
  const [hoverStar, setHoverStar] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const isAuthenticated = !!identity;
  const hasRated = sessionStorage.getItem(SESSION_KEY) === 'true';

  const shouldShow = isAuthenticated && elapsedSeconds >= SCROLL_THRESHOLD_SECONDS && !hasRated && !submitted;

  if (!shouldShow) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    try {
      await addFeedback.mutateAsync({ name: name.trim(), stars, message: message.trim() });
      sessionStorage.setItem(SESSION_KEY, 'true');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md popup-enter">
        <div
          className="rounded-3xl p-8 shadow-2xl border border-white/10"
          style={{ background: 'oklch(14% 0.025 260)' }}
        >
          {/* Title */}
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">⭐</div>
            <h2 className="text-2xl font-black text-white font-heading mb-2">
              Rate Your Experience
            </h2>
            <p className="text-white/60 text-sm">
              How was your experience with QuickRepair? Your feedback helps us improve.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-white/80 text-sm font-semibold mb-1.5">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:border-transparent placeholder:text-white/30"
                style={{ '--tw-ring-color': '#FFD700' } as React.CSSProperties}
                required
              />
            </div>

            {/* Stars */}
            <div>
              <label className="block text-white/80 text-sm font-semibold mb-1.5">Rating</label>
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
                      stroke={(hoverStar || stars) >= s ? '#FFD700' : '#6b7280'}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-white/80 text-sm font-semibold mb-1.5">Your Review</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your experience..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:border-transparent resize-none placeholder:text-white/30"
                style={{ '--tw-ring-color': '#FFD700' } as React.CSSProperties}
                required
              />
            </div>

            {/* Error */}
            {error && <p className="text-red-400 text-sm">{error}</p>}

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
        </div>
      </div>
    </div>
  );
}
