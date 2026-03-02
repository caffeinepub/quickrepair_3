import { useRef, useState, useEffect } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import BookingSuccessOverlay from './BookingSuccessOverlay';
import { playSuccessSound } from '../utils/playSuccessSound';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIpLocation } from '../hooks/useIpLocation';
import { LogIn, Loader2 } from 'lucide-react';

export default function BookingFormSection() {
  const { ref, isVisible } = useFadeIn();
  const [showSuccess, setShowSuccess] = useState(false);
  const [address, setAddress] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const { identity, login, loginStatus, isInitializing } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const { status: locationStatus, statusMessage, location } = useIpLocation();

  // Auto-fill address from IP location only if address field is empty
  useEffect(() => {
    if (locationStatus === 'success' && location && address === '') {
      const parts = [location.city, location.region, location.country_name].filter(Boolean);
      const autoAddress = parts.join(', ');
      if (autoAddress) setAddress(autoAddress);
    }
  }, [locationStatus, location]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Submit form data to FormSubmit via fetch (fire-and-forget)
    const formData = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    }).catch(() => {
      // Silently ignore network errors — confirmation still shown
    });

    // Show GPay-style success overlay and play sound
    playSuccessSound();
    setShowSuccess(true);
  };

  const handleOverlayClose = () => {
    setShowSuccess(false);
    setAddress('');
    if (formRef.current) formRef.current.reset();
  };

  return (
    <section
      id="booking"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-20 px-4 sm:px-6 lg:px-8 fade-in-section ${isVisible ? 'is-visible' : ''}`}
      style={{ backgroundColor: '#111111' }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span
            className="inline-block text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-4"
            style={{
              background: 'rgba(255,140,66,0.12)',
              color: '#FF8C42',
              border: '1px solid rgba(255,140,66,0.25)',
            }}
          >
            Online Booking
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white mb-3">
            Book Online Instantly
          </h2>
          <p className="text-gray-400 text-base max-w-lg mx-auto">
            Fill in the form below and our team will confirm your booking right away.
          </p>
        </div>

        {/* Initializing */}
        {isInitializing && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-7 h-7 animate-spin" style={{ color: '#FF8C42' }} />
          </div>
        )}

        {/* Not Authenticated — Sign In Prompt */}
        {!isInitializing && !isAuthenticated && (
          <div
            className="rounded-2xl p-8 text-center"
            style={{
              backgroundColor: '#161616',
              border: '1px solid #252525',
              boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
            }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: 'rgba(255,140,66,0.12)', border: '1px solid rgba(255,140,66,0.25)' }}
            >
              <LogIn className="w-6 h-6" style={{ color: '#FF8C42' }} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Sign In Required</h3>
            <p className="text-gray-400 text-sm mb-6">
              Booking karne ke liye pehle sign in karein.
            </p>
            <button
              onClick={login}
              disabled={isLoggingIn}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-60"
              style={{
                backgroundColor: '#ff8c42',
                color: '#fff',
                boxShadow: '0 6px 24px rgba(255,140,66,0.4)',
              }}
            >
              {isLoggingIn ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LogIn className="w-4 h-4" />
              )}
              {isLoggingIn ? 'Signing in…' : 'Sign In to Book'}
            </button>
          </div>
        )}

        {/* Authenticated — Booking Form */}
        {!isInitializing && isAuthenticated && (
          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{
              backgroundColor: '#161616',
              border: '1px solid #252525',
              boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
            }}
          >
            <form
              ref={formRef}
              action="https://formsubmit.co/amitpanday96149@gmail.com"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Hidden fields */}
              <input type="hidden" name="_subject" value="🔧 New Booking from QuickRepair" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://quickrepair-84g.caffeine.xyz/thankyou.html" />
              {/* Honeypot */}
              <input type="text" name="_honey" style={{ display: 'none' }} />
              {/* Hidden location fields */}
              <input
                type="hidden"
                id="latitude"
                name="latitude"
                value={location?.latitude ?? ''}
              />
              <input
                type="hidden"
                id="longitude"
                name="longitude"
                value={location?.longitude ?? ''}
              />

              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: '#e0e0e0' }}
                >
                  Full Name <span style={{ color: '#FF8C42' }}>*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="Full Name"
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2"
                  style={{
                    backgroundColor: '#1e1e1e',
                    border: '1px solid #2e2e2e',
                    color: '#fff',
                    caretColor: '#FF8C42',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#FF8C42')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#2e2e2e')}
                />
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: '#e0e0e0' }}
                >
                  Phone Number <span style={{ color: '#FF8C42' }}>*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="Phone Number"
                  required
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{
                    backgroundColor: '#1e1e1e',
                    border: '1px solid #2e2e2e',
                    color: '#fff',
                    caretColor: '#FF8C42',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#FF8C42')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#2e2e2e')}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: '#e0e0e0' }}
                >
                  Email <span className="text-gray-600 font-normal">(optional)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="Email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{
                    backgroundColor: '#1e1e1e',
                    border: '1px solid #2e2e2e',
                    color: '#fff',
                    caretColor: '#FF8C42',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#FF8C42')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#2e2e2e')}
                />
              </div>

              {/* Service */}
              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: '#e0e0e0' }}
                >
                  Service <span style={{ color: '#FF8C42' }}>*</span>
                </label>
                <select
                  id="service"
                  name="Service"
                  required
                  defaultValue=""
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 appearance-none cursor-pointer"
                  style={{
                    backgroundColor: '#1e1e1e',
                    border: '1px solid #2e2e2e',
                    color: '#fff',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#FF8C42')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#2e2e2e')}
                >
                  <option value="" disabled style={{ color: '#666' }}>
                    Select a service
                  </option>
                  <option value="Plumber ₹499">Plumber ₹499</option>
                  <option value="Electrician ₹299">Electrician ₹299</option>
                  <option value="Fan/Cooler ₹199">Fan/Cooler ₹199</option>
                  <option value="AC Repair ₹499">AC Repair ₹499</option>
                  <option value="Mechanic ₹349">Mechanic ₹349</option>
                </select>
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: '#e0e0e0' }}
                >
                  Address <span style={{ color: '#FF8C42' }}>*</span>
                </label>
                {/* Location status message */}
                <p
                  className="text-xs mb-1.5"
                  style={{
                    color:
                      locationStatus === 'success'
                        ? '#4ade80'
                        : locationStatus === 'error'
                        ? '#f87171'
                        : '#9ca3af',
                  }}
                >
                  {statusMessage}
                </p>
                <textarea
                  id="address"
                  name="Address"
                  required
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your full address"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                  style={{
                    backgroundColor: '#1e1e1e',
                    border: '1px solid #2e2e2e',
                    color: '#fff',
                    caretColor: '#FF8C42',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#FF8C42')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#2e2e2e')}
                />
              </div>

              {/* Problem Description */}
              <div>
                <label
                  htmlFor="problem"
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: '#e0e0e0' }}
                >
                  Problem Description{' '}
                  <span className="text-gray-600 font-normal">(optional)</span>
                </label>
                <textarea
                  id="problem"
                  name="Problem Description"
                  rows={3}
                  placeholder="Describe the issue briefly"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                  style={{
                    backgroundColor: '#1e1e1e',
                    border: '1px solid #2e2e2e',
                    color: '#fff',
                    caretColor: '#FF8C42',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#FF8C42')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#2e2e2e')}
                />
              </div>

              {/* Preferred Time */}
              <div>
                <label
                  htmlFor="preferredTime"
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: '#e0e0e0' }}
                >
                  Preferred Time
                </label>
                <select
                  id="preferredTime"
                  name="Preferred Time"
                  defaultValue="Within 30 minutes"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 appearance-none cursor-pointer"
                  style={{
                    backgroundColor: '#1e1e1e',
                    border: '1px solid #2e2e2e',
                    color: '#fff',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#FF8C42')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#2e2e2e')}
                >
                  <option value="Within 30 minutes">Within 30 minutes</option>
                  <option value="Within 1 hour">Within 1 hour</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl font-bold text-base transition-all duration-300 hover:scale-[1.02] active:scale-95 mt-2"
                style={{
                  backgroundColor: '#ff8c42',
                  color: '#fff',
                  boxShadow: '0 6px 24px rgba(255,140,66,0.4)',
                }}
              >
                Confirm Booking
              </button>
            </form>
          </div>
        )}
      </div>

      {/* GPay-style booking success overlay */}
      <BookingSuccessOverlay visible={showSuccess} onClose={handleOverlayClose} />
    </section>
  );
}
