import { ArrowLeft, Calendar, MapPin, Phone, Wrench, Clock, Loader2, LogIn } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetBookingsForCaller } from '../hooks/useQueries';
import type { Booking } from '../backend';

function formatDate(timestampNs: bigint): string {
  // Backend returns nanoseconds, convert to milliseconds
  const ms = Number(timestampNs) / 1_000_000;
  const date = new Date(ms);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function formatTime(timestampNs: bigint): string {
  const ms = Number(timestampNs) / 1_000_000;
  const date = new Date(ms);
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function BookingCard({ booking }: { booking: Booking }) {
  return (
    <div
      className="rounded-2xl p-5 sm:p-6 space-y-4"
      style={{
        backgroundColor: '#161616',
        border: '1px solid #252525',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
      }}
    >
      {/* Date & Time */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 flex-shrink-0" style={{ color: '#FF8C42' }} />
          <span className="text-sm font-semibold text-white">
            {formatDate(booking.bookingTime)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 flex-shrink-0" style={{ color: '#FFD700' }} />
          <span className="text-sm text-gray-400">
            {formatTime(booking.bookingTime)}
          </span>
        </div>
      </div>

      <div
        className="border-t"
        style={{ borderColor: '#252525' }}
      />

      {/* Details */}
      <div className="space-y-3">
        {/* Service */}
        <div className="flex items-start gap-3">
          <Wrench className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#FF8C42' }} />
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Service ID</p>
            <p className="text-sm text-white font-medium">#{String(booking.serviceId)}</p>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#FF8C42' }} />
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Service Address</p>
            <p className="text-sm text-white">{booking.address}</p>
          </div>
        </div>

        {/* Mobile Number */}
        <div className="flex items-start gap-3">
          <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#FF8C42' }} />
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Mobile Number</p>
            <p className="text-sm text-white">{booking.mobileNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingHistoryPage() {
  const { identity, login, loginStatus, isInitializing } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const { data: bookings, isLoading } = useGetBookingsForCaller(isAuthenticated);

  // Sort bookings newest first
  const sortedBookings = bookings
    ? [...bookings].sort((a, b) => Number(b.bookingTime) - Number(a.bookingTime))
    : [];

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
              My Account
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-white mb-3">
              📋 Booking History
            </h1>
            <p className="text-gray-400 text-base max-w-lg mx-auto">
              Apni saari purani bookings yahan dekh sakte hain.
            </p>
          </div>

          {/* Not Authenticated */}
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
                Booking history dekhne ke liye pehle sign in karein.
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

          {/* Initializing */}
          {isInitializing && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#FF8C42' }} />
            </div>
          )}

          {/* Authenticated — Loading */}
          {isAuthenticated && isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#FF8C42' }} />
            </div>
          )}

          {/* Authenticated — Bookings */}
          {isAuthenticated && !isLoading && (
            <>
              {sortedBookings.length === 0 ? (
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
                    style={{ background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.2)' }}
                  >
                    <Calendar className="w-7 h-7" style={{ color: '#FFD700' }} />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">Koi Booking Nahi Mili</h2>
                  <p className="text-gray-400 text-sm mb-6">
                    Abhi tak aapne koi booking nahi ki hai. Pehli booking karein!
                  </p>
                  <a
                    href="/booking"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-95"
                    style={{
                      backgroundColor: '#ff8c42',
                      color: '#fff',
                      boxShadow: '0 6px 24px rgba(255,140,66,0.4)',
                    }}
                  >
                    📅 Book a Service
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500 mb-2">
                    Total {sortedBookings.length} booking{sortedBookings.length !== 1 ? 's' : ''} mili
                  </p>
                  {sortedBookings.map((booking) => (
                    <BookingCard key={String(booking.bookingId)} booking={booking} />
                  ))}
                </div>
              )}
            </>
          )}

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
