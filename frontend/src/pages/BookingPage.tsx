import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, LogIn, Loader2 } from 'lucide-react';
import BookingSuccessOverlay from '../components/BookingSuccessOverlay';
import { playSuccessSound } from '../utils/playSuccessSound';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIpLocation } from '../hooks/useIpLocation';

export default function BookingPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
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

    if (!termsAccepted) {
      return;
    }

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
    setTermsAccepted(false);
    setAddress('');
    if (formRef.current) formRef.current.reset();
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0d0d0d' }}>
      {/* Simple Header */}
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
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
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
            <h1 className="font-display text-3xl sm:text-4xl font-black text-white mb-3">
              Book a Service
            </h1>
            <p className="text-gray-400 text-base max-w-lg mx-auto">
              Fill in the form below and our team will confirm your booking right away.
            </p>
          </div>

          {/* Initializing */}
          {isInitializing && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#FF8C42' }} />
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
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(255,140,66,0.12)', border: '1px solid rgba(255,140,66,0.25)' }}
              >
                <LogIn className="w-7 h-7" style={{ color: '#FF8C42' }} />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Sign In Required</h2>
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
                {isLoggingIn ? 'Signing in…' : 'Sign In'}
              </button>
            </div>
          )}

          {/* Authenticated — Booking Form Card */}
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
                action="https://formsubmit.co/pandeyxkanha@gmail.com"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Hidden fields */}
                <input type="hidden" name="_subject" value="🔧 New Booking from QuickRepair" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                <input
                  type="hidden"
                  name="_next"
                  value="https://quickrepair-84g.caffeine.xyz/thankyou.html"
                />
                {/* Honeypot */}
                <input type="text" name="_honey" style={{ display: 'none' }} />
                {/* Hidden location fields */}
                <input
                  type="hidden"
                  id="bp-latitude"
                  name="latitude"
                  value={location?.latitude ?? ''}
                />
                <input
                  type="hidden"
                  id="bp-longitude"
                  name="longitude"
                  value={location?.longitude ?? ''}
                />

                {/* Full Name */}
                <div>
                  <label
                    htmlFor="bp-fullName"
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: '#e0e0e0' }}
                  >
                    Full Name <span style={{ color: '#FF8C42' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="bp-fullName"
                    name="Full Name"
                    required
                    placeholder="Enter your full name"
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

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="bp-phone"
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: '#e0e0e0' }}
                  >
                    Phone Number <span style={{ color: '#FF8C42' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    id="bp-phone"
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
                    htmlFor="bp-email"
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: '#e0e0e0' }}
                  >
                    Email <span className="text-gray-600 font-normal">(optional)</span>
                  </label>
                  <input
                    type="email"
                    id="bp-email"
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
                    htmlFor="bp-service"
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: '#e0e0e0' }}
                  >
                    Service <span style={{ color: '#FF8C42' }}>*</span>
                  </label>
                  <select
                    id="bp-service"
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
                    htmlFor="bp-address"
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
                    id="bp-address"
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
                    htmlFor="bp-problem"
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: '#e0e0e0' }}
                  >
                    Problem Description{' '}
                    <span className="text-gray-600 font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="bp-problem"
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
                    htmlFor="bp-preferredTime"
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: '#e0e0e0' }}
                  >
                    Preferred Time
                  </label>
                  <select
                    id="bp-preferredTime"
                    name="Preferred Time"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 appearance-none cursor-pointer"
                    style={{
                      backgroundColor: '#1e1e1e',
                      border: '1px solid #2e2e2e',
                      color: '#fff',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#FF8C42')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#2e2e2e')}
                  >
                    <option value="ASAP">ASAP</option>
                    <option value="Within 10 minutes">Within 10 minutes</option>
                    <option value="Within 15 MINUTES">Within 15 MINUTES</option>
                    <option value="Within 30 minutes">Within 30 minutes</option>
                    <option value="Within 1 hour">Within 1 hour</option>
                    <option value="Today">Today</option>
                  </select>
                </div>

                {/* Terms & Policies Checkbox */}
                <div
                  className="rounded-xl p-4"
                  style={{
                    backgroundColor: '#1a1a1a',
                    border: `1px solid ${termsAccepted ? 'rgba(255,140,66,0.4)' : '#2e2e2e'}`,
                  }}
                >
                  {/* Checkbox Row */}
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <div className="flex-shrink-0 mt-0.5">
                      <input
                        type="checkbox"
                        id="terms-checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        required
                        className="sr-only"
                      />
                      {/* Custom checkbox */}
                      <div
                        onClick={() => setTermsAccepted(!termsAccepted)}
                        className="w-5 h-5 rounded flex items-center justify-center transition-all duration-200 cursor-pointer"
                        style={{
                          backgroundColor: termsAccepted ? '#FF8C42' : 'transparent',
                          border: `2px solid ${termsAccepted ? '#FF8C42' : '#555'}`,
                        }}
                      >
                        {termsAccepted && (
                          <svg
                            width="12"
                            height="9"
                            viewBox="0 0 12 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 4L4.5 7.5L11 1"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm leading-relaxed">
                      <span style={{ color: '#e0e0e0' }}>✅ I agree to the</span>
                      <span style={{ color: '#e0e0e0' }}>Terms and Policies</span>
                      <a
                        href="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold transition-all duration-200 hover:underline"
                        style={{ color: '#FF8C42' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Read Terms &amp; Policies ↗
                      </a>
                    </div>
                  </label>

                  {/* Disclaimer */}
                  <p className="mt-2.5 text-xs leading-relaxed" style={{ color: '#666', paddingLeft: '32px' }}>
                    By clicking Confirm Booking, you accept our Terms and Policies.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!termsAccepted}
                  className="w-full py-4 rounded-xl font-bold text-base transition-all duration-300 hover:scale-[1.02] active:scale-95 mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{
                    backgroundColor: '#ff8c42',
                    color: '#fff',
                    boxShadow: termsAccepted ? '0 6px 24px rgba(255,140,66,0.4)' : 'none',
                  }}
                >
                  Confirm Booking
                </button>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* GPay-style booking success overlay */}
      <BookingSuccessOverlay visible={showSuccess} onClose={handleOverlayClose} />
    </div>
  );
}
