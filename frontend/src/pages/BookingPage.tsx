import { ArrowLeft } from 'lucide-react';

export default function BookingPage() {
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
              📅 Book a Service
            </h1>
            <p className="text-gray-400 text-base max-w-lg mx-auto">
              Fill in the form below and our team will confirm your booking right away.
            </p>
          </div>

          {/* Booking Form Card */}
          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{
              backgroundColor: '#161616',
              border: '1px solid #252525',
              boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
            }}
          >
            <form
              action="https://formsubmit.co/pandeyxkanha@gmail.com"
              method="POST"
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
                <textarea
                  id="bp-address"
                  name="Address"
                  required
                  rows={3}
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

          {/* Back link */}
          <div className="text-center mt-8">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
