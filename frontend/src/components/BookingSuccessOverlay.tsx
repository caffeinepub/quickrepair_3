import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

interface BookingSuccessOverlayProps {
  visible: boolean;
  onClose: () => void;
}

export default function BookingSuccessOverlay({ visible, onClose }: BookingSuccessOverlayProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (visible) {
      // Auto-dismiss after 2.8 seconds (within the 2–3 second requirement)
      timerRef.current = setTimeout(() => {
        onClose();
      }, 2800);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible, onClose]);

  if (!visible) return null;

  // SVG circle params
  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  const overlay = (
    <div
      className="booking-success-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Booking confirmed"
    >
      <div className="booking-success-card" onClick={(e) => e.stopPropagation()}>
        {/* Animated SVG circle + checkmark */}
        <div className="booking-success-icon-wrap">
          <svg
            width="130"
            height="130"
            viewBox="0 0 130 130"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="booking-success-svg"
          >
            {/* Background circle (subtle) */}
            <circle cx="65" cy="65" r="60" fill="rgba(34,197,94,0.10)" />
            {/* Animated stroke circle */}
            <circle
              cx="65"
              cy="65"
              r={radius}
              stroke="#22c55e"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              transform="rotate(-90 65 65)"
              className="booking-success-circle"
            />
            {/* Animated checkmark */}
            <polyline
              points="38,67 56,85 92,46"
              stroke="#ffffff"
              strokeWidth="6.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="booking-success-check"
            />
          </svg>
        </div>

        {/* Success text */}
        <div className="booking-success-text-wrap">
          <p className="booking-success-title">Booking Confirmed!</p>
          <p className="booking-success-subtitle">We'll call you soon.</p>
          <p className="booking-success-hint">हमारी team जल्द ही आपसे संपर्क करेगी।</p>
        </div>

        {/* Tap to dismiss hint */}
        <button className="booking-success-dismiss" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );

  return ReactDOM.createPortal(overlay, document.body);
}
