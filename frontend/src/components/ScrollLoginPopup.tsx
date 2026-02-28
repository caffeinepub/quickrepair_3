import React from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useScrollTimer } from '../hooks/useScrollTimer';
import { Shield, Zap, Star } from 'lucide-react';

const SCROLL_THRESHOLD_SECONDS = 7;

export default function ScrollLoginPopup() {
  const { login, loginStatus, identity } = useInternetIdentity();
  const { elapsedSeconds } = useScrollTimer();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const shouldShow = !isAuthenticated && elapsedSeconds >= SCROLL_THRESHOLD_SECONDS;

  if (!shouldShow) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md popup-enter">
        <div
          className="rounded-3xl p-8 text-center shadow-2xl border border-white/10"
          style={{ background: 'oklch(14% 0.025 260)' }}
        >
          {/* Icon */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 text-black"
            style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C42)' }}
          >
            <Shield size={28} />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-black text-white font-heading mb-2">
            Join QuickRepair
          </h2>
          <p className="text-white/60 text-sm mb-6">
            Sign in to book services, track repairs, and get exclusive member discounts.
          </p>

          {/* Features */}
          <div className="space-y-3 mb-7 text-left">
            {[
              { icon: <Zap size={16} />, text: 'Priority booking — skip the queue' },
              { icon: <Star size={16} />, text: 'Exclusive member discounts up to 20%' },
              { icon: <Shield size={16} />, text: 'Secure & private — your data is safe' },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-white/80 text-sm">
                <span style={{ color: '#FFD700' }}>{feature.icon}</span>
                <span>{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Login Button */}
          <button
            onClick={() => login()}
            disabled={isLoggingIn}
            className="w-full py-3.5 rounded-xl font-bold text-black text-base transition-all hover:scale-105 active:scale-95 disabled:opacity-60 disabled:scale-100"
            style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C42)' }}
          >
            {isLoggingIn ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Signing in...
              </span>
            ) : (
              'Sign In to Continue'
            )}
          </button>

          <p className="text-white/40 text-xs mt-4">
            Free to join · No credit card required
          </p>
        </div>
      </div>
    </div>
  );
}
